import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { SingleDataSet, Color, Label } from "ng2-charts";
import { FormBuilder, FormControl } from "@angular/forms";
@Component({
  selector: "app-thongke",
  templateUrl: "./thongke.component.html",
  styleUrls: ["./thongke.component.css"],
})
export class ThongkeComponent implements OnInit {
  //Pie Chart
  //Học viên đăng ký
  public hvdkOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  //Label
  public hvdkLabels: Label[] = ["Đăng kí online", "Đăng kí tại trung tâm"];
  //Data số lượng, vị trí tương ứng với labels
  public hvdkData: SingleDataSet = [7, 3];
  public hvdkType: ChartType = "pie";
  public hvdkLegend = true;
  public hvdkPlugins = [];

  //Học viên thanh toán
  public hvttOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  //Label
  public hvttLabels: Label[] = ["Đăng kí online", "Đăng kí tại trung tâm"];
  //Data số lượng, vị trí tương ứng với labels
  public hvttData: SingleDataSet = [6, 5];
  public hvttType: ChartType = "pie";
  public hvttLegend = true;
  public hvttPlugins = [];

  //Doanh thu dang ki
  public dtdkOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  //Label
  public dtdkLabels: Label[] = ["Đăng kí online", "Đăng kí tại trung tâm"];
  //Data số lượng, vị trí tương ứng với labels
  public dtdkData: SingleDataSet = [16, 5];
  public dtdkType: ChartType = "pie";
  public dtdkLegend = true;
  public dtdkPlugins = [];

  ngOnInit(): void {}

  //Form filter

  filterForm1: any;
  filterForm2: any;
  filterForm3: any;
  constructor(private fb: FormBuilder) {
    this.filterForm1 = this.fb.group({
      monthStart: new FormControl(""),
      yearStart: new FormControl(""),
      monthEnd: new FormControl(""),
      yearEnd: new FormControl(""),
    });
    this.filterForm2 = this.fb.group({
      monthStart: new FormControl(""),
      yearStart: new FormControl(""),
      monthEnd: new FormControl(""),
      yearEnd: new FormControl(""),
    });
    this.filterForm3 = this.fb.group({
      monthStart: new FormControl(""),
      yearStart: new FormControl(""),
      monthEnd: new FormControl(""),
      yearEnd: new FormControl(""),
    });
  }

  filter1() {}
  filter2() {
    alert(this.filterForm3.value);
  }
  filter3() {
    alert(this.filterForm3.value);
  }
}
