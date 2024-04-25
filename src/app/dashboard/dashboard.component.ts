import { ChangeDetectorRef, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SensorPlotComponent } from '../sensor-plot/sensor-plot.component';
import { NgApexchartsModule } from 'ng-apexcharts';

// https://apexcharts.com/angular-chart-demos/line-charts/basic/
// https://apexcharts.com/docs/angular-charts/

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
  imports: [SensorPlotComponent, NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  ev : EventSource = new EventSource("http://localhost:1234/event");
  sensors: SensorItem[] = [];
  @ViewChildren(SensorPlotComponent) plots! : QueryList<SensorPlotComponent>;

  public put(mt: SensorMacNTemperature): boolean {
    let r = false;
    this.sensors.forEach(s => {
      if (s.m == mt.m) {
        r = true;
      }
    });
    if (!r) {
      const si = new SensorItem;
      si.i = this.sensors.length;
      si.m = mt.m;
      this.sensors.push(si);
      this.changeDetectorRef.detectChanges();
    }
    this.plots.forEach(v => {
      v.append(mt.t);
      console.log(v);
    });
    return r;
  }

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) {
    const that = this;
    this.ev.onmessage = function(e) {
      const mt = new SensorMacNTemperature;
      const v = e.data.split(',');

      for (var i = 0; i < v.length; i++) {
        const pair = v[i].split('=');
        if (pair.length == 2) {
          if(pair[0] == 'm') {
            mt.m = BigInt(pair[1]);
          }
          if(pair[0] == 't') {
            console.log(pair[1]);
            mt.t = Number.parseFloat(pair[1]);
          }
        }
      }
      that.put(mt);
    }
    
  }

  ngOnInit(): void {
  }

  sendTest() : void {

  }
}
