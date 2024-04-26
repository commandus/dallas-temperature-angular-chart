import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SensorPlotComponent } from '../sensor-plot/sensor-plot.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// https://apexcharts.com/angular-chart-demos/line-charts/basic/
// https://apexcharts.com/docs/angular-charts/

//const SSE = "http://localhost:1234";
const SSE = "/sse";

class SensorMacNTemperature {
  m = 0n;
  t = 0.0;
};

class SensorItem {
  m = 0n;
  i = 0;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SensorPlotComponent, NgApexchartsModule, MatButtonModule, MatIconModule, MatTooltipModule, HttpClientModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  ev : EventSource = new EventSource(SSE + "/event");
  sensors: SensorItem[] = [];
  @ViewChildren(SensorPlotComponent) plots! : QueryList<SensorPlotComponent>;

  public put(mt: SensorMacNTemperature): boolean {
    let r = false;
    for (let i = 0; i < this.sensors.length; i++) {
      if (this.sensors[i].m == mt.m) {
        r = true;
        break;
      }
    }
    if (!r) {
      const si = new SensorItem;
      si.i = this.sensors.length;
      si.m = mt.m;
      this.sensors.push(si);
      this.changeDetectorRef.detectChanges();
    }

    this.plots.forEach(v => {
      if (v.sensor == mt.m)
        v.append(mt.t);
    });
    return r;
  }

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private http: HttpClient
  ) {
    const that = this;
    this.ev.onmessage = function(e) {
      const mt = new SensorMacNTemperature;
      let valid = 0;
      const v = e.data.split(',');
      for (var i = 0; i < v.length; i++) {
        const pair = v[i].split('=');
        if (pair.length == 2) {
          if(pair[0] == 'm') {
            mt.m = BigInt(pair[1]);
            valid |= 1;
          }
          if(pair[0] == 't') {
            mt.t = Number.parseFloat(pair[1]);
            valid |= 2;
          }
        }
      }
      if (valid == 3)
        that.put(mt);
    }
    
  }

  sendTest() : void {
    const t = (20.0 + Math.random() * 10).toFixed(1);
    this.http.get(SSE + '/send?m=1&t=' + t, {responseType: 'text'}).subscribe(v => {
      console.log(v);
  }) 
  }

  plotClosed(m: bigint) {
    let c = -1;
    for(let i = 0; i < this.sensors.length; i++) {
      if (this.sensors[i].m == m) {
        c = i;
        break;
      }
    }
    if (c >= 0) {
      this.sensors.splice(c, 1);
      this.changeDetectorRef.detectChanges();
    }

  }
}
