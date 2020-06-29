import { Component, OnInit, ViewChild } from "@angular/core";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { SingleDataSet, Color, Label } from "ng2-charts";
import { FormBuilder, FormControl } from "@angular/forms";
import { HocvienService } from "../service/hocvien/hocvien.service";
import { KhoahocService } from "../service/khoahoc/khoahoc.service";
import { PhonghocService } from "../service/phonghoc/phonghoc.service";
import { GiangvienService } from "../service/giangvien/giangvien.service";
import { QuantrivienService } from "../service/quantrivien/quantrivien.service";
import { DynamicScriptLoaderServiceService } from '../../app/dynamic-script-loader-service.service';
@Component({
  selector: "app-thongke",
  templateUrl: "./thongke.component.html",
  styleUrls: ["./thongke.component.css"],
})
export class ThongkeComponent implements OnInit {
  tongsoquantrivien: any = 0;
  tongsogiangvien: any = 0;
  tongsokhoahoc: any = 0;
  tongsophonghoc: any = 0;
  tongthanhtoan: any = 0;
  tongdangky: any = 0;
  tongdoanhthu: any = 0;
  monthStart: any = 0;
  yearStart: any = 0;
  monthEnd: any = 0;
  yearEnd: any = 0;
  BatDau: any = "2020-06-01 00:00:00";
  KetThuc: any = "2020-06-01 00:00:00";
  //Pie Chart
  //Học viên đăng ký
  public hvdkOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  //Label
  public hvdkLabels: Label[] = ["Đăng ký online", "Đăng ký tại trung tâm"];
  //Data số lượng, vị trí tương ứng với labels
  public hvdkData: SingleDataSet = [1, 1];
  public hvdkType: ChartType = "pie";
  public hvdkLegend = true;
  public hvdkPlugins = [];

  //Học viên thanh toán
  public hvttOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  //Label
  public hvttLabels: Label[] = ["Thanh toán online", "Thanh toán tại trung tâm"];
  //Data số lượng, vị trí tương ứng với labels
  public hvttData: SingleDataSet = [1, 1];
  public hvttType: ChartType = "pie";
  public hvttLegend = true;
  public hvttPlugins = [];

  //Doanh thu dang ki
  public dtdkOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  //Label
  public dtdkLabels: Label[] = ["Doanh thu đăng ký online", "Doanh thu đăng ký tại trung tâm"];
  //Data số lượng, vị trí tương ứng với labels
  public dtdkData: SingleDataSet = [1, 1];
  public dtdkType: ChartType = "pie";
  public dtdkLegend = true;
  public dtdkPlugins = [];

  ngOnInit(): void { }
  //Form filter
  filterForm1: any;
  filterForm2: any;
  filterForm3: any;
  constructor(
    private dynamicScriptLoader: DynamicScriptLoaderServiceService,
    private hocvienService: HocvienService,
    private khoahocService: KhoahocService,
    private phonghocService: PhonghocService,
    private quantrivienService: QuantrivienService,
    private giangvienService: GiangvienService,
    private fb: FormBuilder
  ) {
    this.loadDataBanDau();
    this.createForm(this.monthStart, this.yearStart, this.monthEnd, this.yearEnd);
    this.getBatDauKetThuc(this.monthStart, this.yearStart, this.monthEnd, this.yearEnd)
    this.loadScripts();
  }

  createForm(monthStart, yearStart, monthEnd, yearEnd) {
    this.filterForm1 = this.fb.group({
      monthStart: new FormControl(monthStart),
      yearStart: new FormControl(yearStart),
      monthEnd: new FormControl(monthEnd),
      yearEnd: new FormControl(yearEnd),
    });
    this.filterForm2 = this.fb.group({
      monthStart: new FormControl(monthStart),
      yearStart: new FormControl(yearStart),
      monthEnd: new FormControl(monthEnd),
      yearEnd: new FormControl(yearEnd),
    });
    this.filterForm3 = this.fb.group({
      monthStart: new FormControl(monthStart),
      yearStart: new FormControl(yearStart),
      monthEnd: new FormControl(monthEnd),
      yearEnd: new FormControl(yearEnd),
    });
  }
  loadDataBanDau() {
    let date_ob = new Date();
    this.monthStart = this.monthEnd = date_ob.getMonth() + 1
    this.yearStart = this.yearEnd = date_ob.getFullYear();
    this.getBatDauKetThuc(this.monthStart, this.yearStart, this.monthEnd, this.yearEnd);
    this.getHocVienDangKy(this.BatDau, this.KetThuc);
    this.getHocVienHinhThucThanhToan(this.BatDau, this.KetThuc);
    this.getHocVienDoanhThuThanhToan(this.BatDau, this.KetThuc);
    this.getDataTong();
  }
  //getDuLieu
  getDataTong() {
    this.khoahocService.getAllKhoaHocKichHoat()
      .pipe()
      .subscribe(res => {
        this.tongsokhoahoc = res.result.data.length;
      })
    this.giangvienService.getListGiangVien()
      .pipe()
      .subscribe(res => {
        this.tongsogiangvien = res.result.data.length;
      })
    this.phonghocService.getListPhongHoc()
      .pipe()
      .subscribe(res => {
        this.tongsophonghoc = res.result.data.filter(ph => ph.TrangThai == 1).length;
      })
      this.quantrivienService.getListQuanTriVien()
      .pipe()
      .subscribe(res => {
        this.tongsoquantrivien = res.result.data.filter(qtv => qtv.TrangThai == 1).length;
      })
  }
  getBatDauKetThuc(monthStart, yearStart, monthEnd, yearEnd) {
    this.BatDau = yearStart + "-" + ("0" + monthStart).slice(-2) + "-01 00:00:00"
    let day = 30;
    if (monthEnd == 1 || monthEnd == 3 || monthEnd == 5 || monthEnd == 7 || monthEnd == 8 || monthEnd == 10 || monthEnd == 12) {
      day = 31;
    }
    else {
      if (monthEnd == 2) {
        if (this.checkNamNhuan(+yearEnd)) {
          day = 29
        }
        else {
          day = 28;
        }
      }
    }
    this.KetThuc = yearEnd + "-" + ("0" + monthEnd).slice(-2) + "-" + day + " 00:00:00"
  }
  checkNamNhuan(year) {
    {
      if (year % 100 == 0) {
        if (year % 400 == 0) {
          return true;
        }
        else {
          return false;
        }
      }
      else if (year % 4 == 0) {
        return true;
      }
      else {
        return false;
      }
    }
  }
  getDate(f) {
    this.monthStart = f.monthStart.value;
    this.yearStart = f.yearStart.value;
    this.monthEnd = f.monthEnd.value;
    this.yearEnd = f.yearEnd.value;
  }
  validateNgay(monthStart, yearStart, monthEnd, yearEnd) {
    if (yearEnd > yearStart) {
      return true;
    }
    if (yearEnd < yearStart) {
      alert("Vui lòng xem lại. Ngày đến không thể sau ngày từ");
      return false;
    }
    if (monthEnd >= monthStart) {
      return true;
    }
    alert("Vui lòng xem lại. Ngày đến không thể sau ngày từ");
    return false;

  }
  get f1() { return this.filterForm1.controls; }
  filter1() {
    this.getDate(this.f1);
    if (!this.validateNgay(this.monthStart, this.yearStart, this.monthEnd, this.yearEnd)) {
      return;
    }
    this.getBatDauKetThuc(this.monthStart, this.yearStart, this.monthEnd, this.yearEnd);
    this.getHocVienDangKy(this.BatDau, this.KetThuc);
  }
  get f2() { return this.filterForm2.controls; }
  filter2() {
    this.getDate(this.f2);
    if (!this.validateNgay(this.monthStart, this.yearStart, this.monthEnd, this.yearEnd)) {
      return;
    }
    this.getBatDauKetThuc(this.monthStart, this.yearStart, this.monthEnd, this.yearEnd);
    this.getHocVienHinhThucThanhToan(this.BatDau, this.KetThuc);
  }
  get f3() { return this.filterForm3.controls; }
  filter3() {
    this.getDate(this.f3);
    if (!this.validateNgay(this.monthStart, this.yearStart, this.monthEnd, this.yearEnd)) {
      return;
    }
    this.getBatDauKetThuc(this.monthStart, this.yearStart, this.monthEnd, this.yearEnd);
    this.getHocVienDoanhThuThanhToan(this.BatDau, this.KetThuc);
  }
  getHocVienDangKy(BatDau, KetThuc) {
    this.hocvienService.getThongKeDangKiHocVien(BatDau, KetThuc)
      .pipe()
      .subscribe(res => {
        if (res.TrangThai.error) {
          alert(res.TrangThai.message);
          return;
        }
        this.tongdangky = res.TrangThai.Tong;
        this.hvdkData = [+res.TrangThai.Online, +res.TrangThai.TrungTam];
      });
  }
  getHocVienHinhThucThanhToan(BatDau, KetThuc) {
    this.hocvienService.getThongKeHinhThucThanhToanHocVien(BatDau, KetThuc)
      .pipe()
      .subscribe(res => {
        if (res.TrangThai.error) {
          alert(res.TrangThai.message);
          return;
        }
        this.tongthanhtoan = res.TrangThai.Tong;
        this.hvttData = [+res.TrangThai.Momo, +res.TrangThai.TrungTam];
      });
  }
  getHocVienDoanhThuThanhToan(BatDau, KetThuc) {
    this.hocvienService.getThongKeDoanhThuTheoHinhThucThanhToan(BatDau, KetThuc)
      .pipe()
      .subscribe(res => {
        if (res.TrangThai.error) {
          alert(res.TrangThai.message);
          return;
        }
        this.tongdoanhthu = res.TrangThai.Tong;
        this.dtdkData = [+res.TrangThai.Momo, +res.TrangThai.TrungTam];
      });
  }
  //load script
  private loadScripts() {
    this.dynamicScriptLoader.load('sbadmin2minjs').then(data => {
    }).catch(error => console.log(error));
  }
}
