<<<<<<< HEAD
import { Component, OnInit } from "@angular/core";
import { DanhsachlophocService } from "../service/danhsachlophoc/danhsachlophoc.service";
import { DynamicScriptLoaderServiceService } from "../../app/dynamic-script-loader-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import { CheckrouteService } from "../service/checkroute/checkroute.service";
import { GiangvienService } from "../service/giangvien/giangvien.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-danhsachlophoc",
  templateUrl: "./danhsachlophoc.component.html",
  styleUrls: ["./danhsachlophoc.component.css"],
=======
import { Component, OnInit } from '@angular/core';
import { DanhsachlophocService } from "../service/danhsachlophoc/danhsachlophoc.service";
import { DynamicScriptLoaderServiceService } from '../../app/dynamic-script-loader-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CheckrouteService } from '../service/checkroute/checkroute.service';
import { GiangvienService } from '../service/giangvien/giangvien.service';
import { ToastrService } from "ngx-toastr";    
@Component({
  selector: 'app-danhsachlophoc',
  templateUrl: './danhsachlophoc.component.html',
  styleUrls: ['./danhsachlophoc.component.css']
>>>>>>> master
})
export class DanhsachlophocComponent implements OnInit {
  idGiangVien: any = -1;
  isGiangVien: boolean = false;
  parentRouter: any = "admin";
  ListLopHoc: any;
  trangthaithanhtoan: any = "-1";
  phuongthuc: any = "tatca";
<<<<<<< HEAD
  trangthaikichhoat: any = "tatcakichhoat";
=======
  trangthaikichhoat: any = 'tatcakichhoat';
>>>>>>> master
  constructor(
    private giangvienService: GiangvienService,
    private checkrouteService: CheckrouteService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dynamicScriptLoader: DynamicScriptLoaderServiceService,
    private dsLopHocService: DanhsachlophocService,
    private toast: ToastrService
  ) {
    this.checkRoute();
  }

  ngOnInit() {
    if (this.isGiangVien) {
<<<<<<< HEAD
      this.giangvienService
        .getGiangVienByTenTaiKhoan()
        .pipe()
        .subscribe((res) => {
          if (res.result.error) {
            this.toast.show(
              "Hiện tại không thể truy cập danh sách lớp học.Liên hệ quản trị để được xử lý!",
              "Thông báo"
            );
            return;
          } else {
=======
      this.giangvienService.getGiangVienByTenTaiKhoan()
        .pipe()
        .subscribe(res => {
          if (res.result.error) {
            this.toast.show("Hiện tại không thể truy cập danh sách lớp học.Liên hệ quản trị để được xử lý!", "Thông báo");
            return;
          }
          else {
>>>>>>> master
            this.idGiangVien = res.result.data[0].IDGiangVien;
            this.getDSLopHocByIDGiangVien(this.idGiangVien);
          }
        });
<<<<<<< HEAD
    } else {
=======
    }
    else {
>>>>>>> master
      this.getDSLopHoc();
    }
    this.loadScripts();
  }
  checkRoute() {
    this.parentRouter = this.checkrouteService.getParentRouter();
    this.isGiangVien = this.checkrouteService.getIsGiangVien();
    this.activatedRoute.parent.url.subscribe((urlPath) => {
      const url = urlPath[urlPath.length - 1].path;
<<<<<<< HEAD
      if (this.parentRouter != url) this.router.navigate([this.parentRouter]);
    });
=======
      if (this.parentRouter != url)
        this.router.navigate([this.parentRouter]);
    })
>>>>>>> master
  }

  getDsHocVien(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id.value;
<<<<<<< HEAD
    let lophoc = this.ListLopHoc.filter((lh) => lh.IDLopHoc == idAttr)[0];
    if (this.isGiangVien && lophoc.HV.length <= 0) {
      return;
    }
    this.router.navigate([this.parentRouter + "/hocvien"], {
      state: {
        IDLopHoc: idAttr,
        DSHV: lophoc.HV,
        IDLopHocPhan: lophoc.LHP.IDLopHocPhan,
        IDKhoaHoc: lophoc.LHP.IDKhoaHoc,
      },
    });
    return;
  }
  getDSLopHoc() {
    this.dsLopHocService
      .danhsachlophoc()
      .pipe()
      .subscribe((res) => {
        let ttkh = this.trangthaikichhoat;
        this.ListLopHoc = res.result.data.filter(function (lh) {
          lh.HV = lh.HV.filter(function (hv) {
            if (ttkh == "tatcakichhoat") {
              lh.TongTien += +hv.SoTien;
              return true;
            }
            if (hv.TrangThai == 1 && ttkh == "kichhoat") {
              lh.TongTien += +hv.SoTien;
              return true;
            }
            if (hv.TrangThai == 0 && ttkh == "chuakichhoat") {
              lh.TongTien += +hv.SoTien;
=======
    let lophoc = this.ListLopHoc.filter(lh => lh.IDLopHoc == idAttr)[0];
    if (this.isGiangVien && lophoc.HV.length <= 0) {
      return;
    }
    this.router.navigate([this.parentRouter + '/hocvien'],
      { state: { IDLopHoc: idAttr, DSHV: lophoc.HV, IDLopHocPhan: lophoc.LHP.IDLopHocPhan, IDKhoaHoc: lophoc.LHP.IDKhoaHoc } });
    return;
  }
  getDSLopHoc() {
    this.dsLopHocService.danhsachlophoc()
      .pipe()
      .subscribe(res => {
        let ttkh = this.trangthaikichhoat;
        this.ListLopHoc = res.result.data.filter(function (lh) {
          lh.HV = lh.HV.filter(function (hv) {
            if (ttkh == "tatcakichhoat")
            {
              lh.TongTien += +hv.SoTien
              return true;
            }
            if (hv.TrangThai == 1 && ttkh == "kichhoat")
            {
              lh.TongTien += +hv.SoTien
              return true;
            }
            if (hv.TrangThai == 0 && ttkh == "chuakichhoat")
            {
              lh.TongTien += +hv.SoTien
>>>>>>> master
              return true;
            }
            return false;
          });
          return true;
        });
        this.loadLopHoc(this.trangthaithanhtoan, this.phuongthuc);
      });
  }
  getDSLopHocByIDGiangVien(IDGiangVien) {
<<<<<<< HEAD
    this.dsLopHocService
      .danhsachlophocbyidgiangvien(IDGiangVien)
      .pipe()
      .subscribe((res) => {
        this.ListLopHoc = res.result.data.filter(function (lh) {
          lh.HV = lh.HV.filter(function (hv) {
            if (hv.TrangThai == 1) return true;
=======
    this.dsLopHocService.danhsachlophocbyidgiangvien(IDGiangVien)
      .pipe()
      .subscribe(res => {
        this.ListLopHoc = res.result.data.filter(function (lh) {
          lh.HV = lh.HV.filter(function (hv) {
            if (hv.TrangThai == 1)
              return true;
>>>>>>> master
            return false;
          });
          return true;
        });
        this.loadLopHoc(this.trangthaithanhtoan, this.phuongthuc);
      });
  }
  ReloadDS() {
    if (this.isGiangVien) {
      this.getDSLopHocByIDGiangVien(this.idGiangVien);
<<<<<<< HEAD
    } else {
=======
    }
    else {
>>>>>>> master
      this.getDSLopHoc();
    }
  }
  TrangThaiThanhToan(event) {
    this.trangthaithanhtoan = event.target.value;
    this.ReloadDS();
  }
  PhuongThucThanhToan(event) {
    this.phuongthuc = event.target.value;
    this.ReloadDS();
  }
  TrangThaiKichHoat(event) {
    this.trangthaikichhoat = event.target.value;
    this.ReloadDS();
  }
  loadLopHoc(trangthaithanhtoan, phuongthuc) {
    if (!(trangthaithanhtoan === "-1" && phuongthuc === "tatca")) {
      let tempTrangThaiThanhToan = -1 === +trangthaithanhtoan ? true : false;
      let tempPhuongThuc = "tatca" === phuongthuc ? true : false;
<<<<<<< HEAD
      let a = 0;
      this.ListLopHoc = this.ListLopHoc.filter(function (lh) {
        a = 0;
        lh.HV = lh.HV.filter(function (hv) {
          if (
            (hv.TrangThaiThanhToan === +trangthaithanhtoan ||
              tempTrangThaiThanhToan) &&
            (hv.HinhThucThanhToan === phuongthuc || tempPhuongThuc)
          ) {
            return true;
          } else {
            lh.TongTien -= +hv.SoTien;
=======
      let a=0;
      this.ListLopHoc = this.ListLopHoc.filter(function (lh) {
        a=0;
        lh.HV = lh.HV.filter(function (hv) {
          if ((hv.TrangThaiThanhToan === +trangthaithanhtoan || tempTrangThaiThanhToan) && (hv.HinhThucThanhToan === phuongthuc || tempPhuongThuc)) {
            return true;
          }
          else {
            lh.TongTien -= +hv.SoTien
>>>>>>> master
            return false;
          }
        });
        return true;
      });
    }
  }
  //load script
  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
<<<<<<< HEAD
    this.dynamicScriptLoader
      .load("jquerydataTablesminjs")
      .then((data) => {
        // You can load multiple scripts by just providing the key as argument into load method of the service
        this.dynamicScriptLoader
          .load("dataTablesbootstrap4minjs")
          .then((data) => {
            // You can load multiple scripts by just providing the key as argument into load method of the service
            this.dynamicScriptLoader
              .load("datatablesdemojs")
              .then((data) => {
                this.dynamicScriptLoader
                  .load("sbadmin2minjs")
                  .then((data) => {})
                  .catch((error) => console.log(error));
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }
=======
    this.dynamicScriptLoader.load('jquerydataTablesminjs').then(data => {
      // You can load multiple scripts by just providing the key as argument into load method of the service
      this.dynamicScriptLoader.load('dataTablesbootstrap4minjs').then(data => {
        // You can load multiple scripts by just providing the key as argument into load method of the service
        this.dynamicScriptLoader.load('datatablesdemojs').then(data => {
          this.dynamicScriptLoader.load('sbadmin2minjs').then(data => {
          }).catch(error => console.log(error));
        }).catch(error => console.log(error));
      }).catch(error => console.log(error));
    }).catch(error => console.log(error));
  }

>>>>>>> master
}
