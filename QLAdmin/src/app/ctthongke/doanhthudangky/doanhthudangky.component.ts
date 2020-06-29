import { Component, OnInit } from "@angular/core";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { SingleDataSet, Color, Label } from "ng2-charts";
import { FormBuilder, FormControl } from "@angular/forms";
@Component({
  selector: "app-doanhthudangky",
  templateUrl: "./doanhthudangky.component.html",
  styleUrls: ["./doanhthudangky.component.css"],
})
export class DoanhthudangkyComponent implements OnInit {
  //Form filter
  filterForm: any;
  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      monthStart: new FormControl(""),
      yearStart: new FormControl(""),
      monthEnd: new FormControl(""),
      yearEnd: new FormControl(""),
    });
  }

  ngOnInit(): void {}

  //Filter function
  filter() {
    alert(this.filterForm.value);
  }

  //Chart
  public dtdkOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  //Label
  public dtdkLabels: Label[] = [
    "Doanh thu thanh toán qua Momo",
    "Doanh thu thanh toán tại trung tâm",
  ];
  //Data số lượng, vị trí tương ứng với labels
  public dtdkData: SingleDataSet = [6, 5];
  public dtdkType: ChartType = "pie";
  public dtdkLegend = true;
  public dtdkPlugins = [];
}
