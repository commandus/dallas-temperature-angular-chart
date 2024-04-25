import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgApexchartsModule } from "ng-apexcharts";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

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
  imports: [NgApexchartsModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './sensor-plot.component.html',
  styleUrl: './sensor-plot.component.scss'
})
export class SensorPlotComponent implements OnInit {
  @ViewChild(ChartComponent) chart!: ChartComponent;
  @Input() sensor = 0n;
  @Output() closed = new EventEmitter<bigint>();

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
          data: []
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

  rm() : void {
    this.closed.emit(this.sensor);
  }

  public append(t: number) : void {
    this.chart.appendData([{ data: [{ x: new Date().getTime(), y: t}]}]);
  }
 
}
