import { Component, OnInit } from "@angular/core";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { SingleDataSet, Color, Label } from "ng2-charts";

@Component({
  selector: "app-thongke",
  templateUrl: "./thongke.component.html",
  styleUrls: ["./thongke.component.css"],
})
export class ThongkeComponent implements OnInit {
  //Bar chart
  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: "bottom",
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            lineWidth: 0,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  public barChartLabels: Label[] = [
    "Toeic",
    "Ielts",
    "Trẻ em",
    "Cấp 1",
    "Cấp 2",
    "Cấp 3",
  ];
  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartColor: Array<any> = [
    {
      backgroundColor: [
        "#86c7f3",
        "#4e73df",
        "#1cc88a",
        "#36b9cc",
        "#f6c23e",
        "#858796",
        "#e83e8c",
      ],
    },
  ];
  public barChartData: ChartDataSets[] = [
    { data: [6, 5, 8, 1, 5, 7], label: "Các khóa học" },
  ];
  //Line Chart
  public lineChartData: ChartDataSets[] = [
    { data: [10, 20, 35, 40, 56, 48, 40], label: "Doanh thu tháng" },
  ];
  public lineChartLabels: Label[] = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
  ];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            lineWidth: 0,
          },
          type: "time",
          time: {
            unit: "month",
          },
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    {
      borderColor: "#4e73df",
      backgroundColor: "#f6f8fd",
    },
  ];
  public lineChartLegend = true;
  public lineChartType = "line";
  public lineChartPlugins = [];
  //Pie Chart
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public pieChartLabels: Label[] = [
    ["Download", "Sales"],
    ["In", "Store", "Sales"],
    "Mail Sales",
    "Toeic",
    "Ielts",
  ];
  public pieChartData: SingleDataSet = [6, 5, 8, 1, 7];
  public pieChartType: ChartType = "pie";
  public pieChartLegend = true;
  public pieChartPlugins = [];
  constructor() {}

  ngOnInit(): void {}
}
