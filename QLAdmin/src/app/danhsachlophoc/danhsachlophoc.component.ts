import { Component, OnInit } from '@angular/core';
import { DanhsachlophocService } from "../service/danhsachlophoc/danhsachlophoc.service";
import { DynamicScriptLoaderServiceService } from '../../app/dynamic-script-loader-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CheckrouteService } from '../service/checkroute/checkroute.service';
import {GiangvienService} from '../service/giangvien/giangvien.service';
@Component({
  selector: 'app-danhsachlophoc',
  templateUrl: './danhsachlophoc.component.html',
  styleUrls: ['./danhsachlophoc.component.css']
})
export class DanhsachlophocComponent implements OnInit {
  idGiangVien:any=-1;
  isGiangVien: boolean = false;
  parentRouter: any = "admin";
  ListLopHoc: any;
  trangthai: any = "-1";
  phuongthuc: any = "tatca";
  constructor(
    private giangvienService:GiangvienService,
    private checkrouteService: CheckrouteService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dynamicScriptLoader: DynamicScriptLoaderServiceService,
    private dsLopHocService: DanhsachlophocService,
  ) {
    this.checkRoute();
  }

  ngOnInit() {
    if (this.isGiangVien) {
      this.giangvienService.getGiangVienByTenTaiKhoan()
        .pipe()
        .subscribe(res=>{
            if(res.result.error)
            {
                alert("Hiện tại không thể truy cập danh sách lớp học.Liên hệ quản trị để được xử lý");
                return;
            }
            else
            {
                this.idGiangVien=res.result.data[0].IDGiangVien;
                this.getDSLopHocByIDGiangVien(this.idGiangVien);
            }
        });
    }
    else {
      this.getDSLopHoc();
    }
    this.loadScripts();
  }
  checkRoute() {
    this.parentRouter = this.checkrouteService.getParentRouter();
    this.isGiangVien = this.checkrouteService.getIsGiangVien();
    this.activatedRoute.parent.url.subscribe((urlPath) => {
      const url = urlPath[urlPath.length - 1].path;
      if (this.parentRouter != url)
        this.router.navigate([this.parentRouter]);
    })
  }

  getDsHocVien(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id.value;
    let lophoc = this.ListLopHoc.filter(lh => lh.IDLopHoc == idAttr)[0];
    if(this.isGiangVien &&lophoc.HV.length <= 0)
    {
      return;
    }
    this.router.navigate([this.parentRouter + '/hocvien'],
    { state: { IDLopHoc: idAttr, DSHV: lophoc.HV, IDLopHocPhan: lophoc.LHP.IDLopHocPhan, IDKhoaHoc: lophoc.LHP.IDKhoaHoc } });
    return;
    // if (lophoc.HV.length <= 0) {
    //   alert("Lớp học chưa có học viên nên không thể xem được.");
    // }
    // else {
    //   this.router.navigate([this.parentRouter + '/hocvien'],
    //     { state: { IDLopHoc: idAttr, DSHV: lophoc.HV, IDLopHocPhan: lophoc.LHP.IDLopHocPhan, IDKhoaHoc: lophoc.LHP.IDKhoaHoc } });
    // }
  }
  getDSLopHoc() {
    this.dsLopHocService.danhsachlophoc()
      .pipe()
      .subscribe(res => {
        this.ListLopHoc = res.result.data.filter(function (lh) {
          lh.HV = lh.HV.filter(function (hv) {
            if (hv.TrangThai == 1) {
              return true;
            }
            else {
              return false;
            }
          });
          return true;
        });
        this.loadLopHoc(this.trangthai, this.phuongthuc);
      });
  }
  getDSLopHocByIDGiangVien(IDGiangVien) {
    this.dsLopHocService.danhsachlophocbyidgiangvien(IDGiangVien)
      .pipe()
      .subscribe(res => {
        this.ListLopHoc = res.result.data.filter(function (lh) {
          lh.HV = lh.HV.filter(function (hv) {
            if (hv.TrangThai == 1) {
              return true;
            }
            else {
              return false;
            }
          });
          return true;
        });
        this.loadLopHoc(this.trangthai, this.phuongthuc);
      });
  }
  trangthaithanhtoan(event) {
    this.trangthai = event.target.value;
    this.getDSLopHoc();
  }
  phuongthucthanhtoan(event) {
    this.phuongthuc = event.target.value;
    this.getDSLopHoc();
  }
  loadLopHoc(trangthai, phuongthuc) {
    if (!(trangthai === "-1" && phuongthuc === "tatca")) {
      let tempTrangThai = -1 === +trangthai ? true : false;
      let tempPhuongThuc = "tatca" === phuongthuc ? true : false;
      this.ListLopHoc = this.ListLopHoc.filter(function (lh) {
        lh.HV = lh.HV.filter(function (hv) {
          if ((hv.TrangThaiThanhToan === +trangthai || tempTrangThai) && (hv.HinhThucThanhToan === phuongthuc || tempPhuongThuc)) {
            return true;
          }
          else {
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

}
