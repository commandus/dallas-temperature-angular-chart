import { Component, OnInit } from '@angular/core';
import { SensorPlotComponent } from '../sensor-plot/sensor-plot.component';
import { NgApexchartsModule } from 'ng-apexcharts';

// https://apexcharts.com/angular-chart-demos/line-charts/basic/
// https://apexcharts.com/docs/angular-charts/

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SensorPlotComponent, NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  ev : EventSource = new EventSource("http://localhost:1234/event");

  constructor() {
    this.ev.onmessage = function(e) {
      const d = e.data;
      console.log(new Date(), d);
    }
  }

  ngOnInit(): void {
  }

  sendTest() : void {

  }
}
