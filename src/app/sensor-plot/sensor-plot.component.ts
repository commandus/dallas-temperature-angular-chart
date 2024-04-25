import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgApexchartsModule } from "ng-apexcharts";
import { MatButtonModule } from "@angular/material/button";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-sensor-plot',
  standalone: true,
  imports: [NgApexchartsModule, MatButtonModule],
  templateUrl: './sensor-plot.component.html',
  styleUrl: './sensor-plot.component.scss'
})
export class SensorPlotComponent implements OnInit {
  @ViewChild(ChartComponent) chart!: ChartComponent;
  @Input() sensor = 0n;

  public chartOptions: ChartOptions = {
    series: [{
        name: "Температура",
        data: []
      }
    ],
    chart: {
      height: 350,
      type: "line"
    },
    title: {
      text: "Датчик"
    },
    xaxis: {
      type: "datetime"
    }
  };

  constructor() {
  }

  ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: "Температура датчика " + (this.sensor ? this.sensor : " без номера"),
          data: [
          ]
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      title: {
        text: "Датчик " + (this.sensor ? this.sensor : " без номера")
      },
      xaxis: {
        type: "datetime"
      }
    };
  }

  apd() : void {
    console.log(this.chart);
    this.chart.appendSeries(
      [{
        name: "Температура датчика " + (this.sensor ? this.sensor : " без номера"),
        data: []
      }
      ]
    , true);
  }

  public append(t: number) : void {
    console.log(this.chart);
    this.chart.appendSeries([
      {
        name: '1',
        data: [{ x: new Date().getTime(), y: t}]
      }
    ], true);
  }
 
}
