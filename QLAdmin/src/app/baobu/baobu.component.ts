import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicScriptLoaderServiceService } from "../../app/dynamic-script-loader-service.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GiangvienService } from '../service/giangvien/giangvien.service'
import { DanhsachlophocService } from '../service/danhsachlophoc/danhsachlophoc.service';
import { CheckrouteService } from "../service/checkroute/checkroute.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { BaobuService } from "../service/baobu/baobu.service";
import { LophocService } from "../service/lophoc/lophoc.service";
@Component({
  selector: 'app-baobu',
  templateUrl: './baobu.component.html',
  styleUrls: ['./baobu.component.css']
})
export class BaobuComponent implements OnInit {
  parentRouter: any;
  btnedit: any = false;
  trangthaikichhoat: any = -1;
  baobuForm: FormGroup;
  listBaoBu: any;
  IDBaoBu: any = -1;
  baobuByID: any;
  selectedLopHoc: any = -1;
  selectedGiangVien: any = -1;
  listGVFilter: any;
  listLHFilter: any;
  listPhong: any;

  //
  listGiangVien: any;
  listLopHoc: any;
  thus: { [key: string]: string } = {
    "Thứ 2": "Thứ 2",
    "Thứ 3": "Thứ 3",
    "Thứ 4": "Thứ 4",
    "Thứ 5": "Thứ 5",
    "Thứ 6": "Thứ 6",
    "Thứ 7": "Thứ 7",
  };
  cas: { [key: string]: string } = {
    "Ca 1": "Ca 1",
    "Ca 2": "Ca 2",
    "Ca 3": "Ca 3",
    "Ca 4": "Ca 4",
    "Ca 5": "Ca 5",
  };

  @ViewChild("closebutton") closebutton;
  @ViewChild("closebuttonDelete") closebuttondelete;
  constructor(
    private lophocService: LophocService,
    private baobuSerice: BaobuService,
    private checkrouteService: CheckrouteService,
    private dslhService: DanhsachlophocService,
    private giangvienService: GiangvienService,
    private dynamicScriptLoader: DynamicScriptLoaderServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastrService,
  ) {
    this.parentRouter = this.checkrouteService.getParentRouter();
    if (this.parentRouter != "admin") this.router.navigate([this.parentRouter]);
  }

  ngOnInit() {
    this.getListBaoBu();
    this.getListGiangVienForm();
    this.getListGVFilter();
    this.getListLHFilter(-1);
    this.createForm();
    this.loadScripts();
  }

  createForm() {
    this.btnedit = false;
    this.baobuForm = this.formBuilder.group({
      HoTen: "",
      NgayBu: "",
      Lop: "",
      Ca: "",
      Thu: "",
      Phong: "",
      GhiChu: "",
    });
  }
  editForm(baobuByID) {
    this.baobuForm = this.formBuilder.group({
      HoTen: baobuByID.IDGiangVien,
      NgayBu: baobuByID.NgayBu,
      Lop: baobuByID.IDLopHoc,
      Ca: baobuByID.CaHoc,
      Thu: baobuByID.Thu,
      Phong: baobuByID.IDPhongHoc,
      GhiChu: baobuByID.GhiChu,
    });
  }
  get f() {
    return this.baobuForm.controls;
  }
  getListBaoBu() {
    this.listBaoBu = null;
    this.baobuSerice.getListBaoBu()
      .pipe()
      .subscribe(res => {
        if (res.result.error) {
          alert(res.result.message);
        }
        if (this.trangthaikichhoat == -1) {
          this.listBaoBu = res.result.data;
        } else {
          let TrangThai = this.trangthaikichhoat;
          this.listBaoBu = res.result.data.filter(
            (gv) => gv.TrangThai == TrangThai
          );
        }
        this.filterBaoBu();
      });
  }
  filterBaoBu() {
    if (this.selectedLopHoc != -1 && this.selectedGiangVien != -1) {
      this.listBaoBu = this.listBaoBu.filter(
        (ex) => ex.IDGiangVien == this.selectedGiangVien && ex.IDLopHoc == this.selectedLopHoc
      );
      return;
    }
    if (this.selectedLopHoc != -1) {
      this.listBaoBu = this.listBaoBu.filter(
        (ex) => ex.IDLopHoc == this.selectedLopHoc
      );
      return;
    }
    if (this.selectedGiangVien != -1) {
      this.listBaoBu = this.listBaoBu.filter(
        (ex) => ex.IDGiangVien == this.selectedGiangVien
      );
      return;
    }
  }
  getListGVFilter() {
    this.listGVFilter = null;
    this.giangvienService.getListGiangVien()
      .pipe()
      .subscribe(res => {
        if (res.result.error === true) {
          alert(res.result.message);
          return;
        }
        this.listGVFilter = res.result.data.filter(gv => gv.TrangThai == 1);
      });
  }
  getListLHFilter(IDGiangVien) {
    if (IDGiangVien == -1) {
      this.dslhService.danhsachlophoc()
        .pipe()
        .subscribe(res => {
          if (res.result.error === true) {
            alert(res.result.message);
            return;
          }
          this.listLHFilter = res.result.data.filter(gv => gv.TrangThai == 1);
        });
    }
    else {
      this.dslhService.danhsachlophocbyidgiangvien(IDGiangVien)
        .pipe()
        .subscribe(res => {
          if (res.result.error === true) {
            alert(res.result.message);
            return;
          }
          this.listLHFilter = res.result.data.filter(gv => gv.TrangThai == 1);
        });
    }
  }
  getListPhong(CaHoc, Thu, NgayBu) {
    this.listPhong = null;
    this.f.Phong.setValue("");
    this.lophocService.getPHBB(CaHoc, Thu, NgayBu)
      .pipe()
      .subscribe(res => {
        if (res.result.error === true) {
          alert(res.result.message);
          return;
        }
        this.listPhong = res.result.data
        
      });
  }
  changeIDGiangVien() {
    this.selectedLopHoc = -1;
    this.getListLHFilter(this.selectedGiangVien);
    this.getListBaoBu();
  }

  changeIDLopHoc() {
    this.getListBaoBu();
  }
  ThemBaoBu() {
    this.baobuForm.enable();
    this.createForm();
  }
  suaBaoBu(event) {
    this.f.HoTen.disable();
    this.btnedit = true;
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id.value;
    this.IDBaoBu = +idAttr;
    this.getBaoBuByID(this.IDBaoBu);
    this.getListPhong(this.baobuByID.CaHoc, this.baobuByID.Thu, this.baobuByID.NgayBu);
    this.getListLopHocForm(this.baobuByID.IDGiangVien);
    this.editForm(this.baobuByID);
  }
  xoaBaoBu(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id.value;
    this.IDBaoBu = +idAttr;
  }
  getBaoBuByID(idBaoBu) {
    this.baobuByID = this.listBaoBu.filter(
      (item) => item.IDBaoBu === +idBaoBu
    )[0];
  }
  checkThongTin() {
    if (this.f.HoTen.value == "") {
      this.toast.error("Vui lòng chọn giảng viên!", "Thông báo");
      return false;
    }
    if (this.f.Lop.value == "") {
      this.toast.error("Vui lòng chọn lớp!", "Thông báo");
      return false;
    }
    if (this.f.Thu.value == "") {
      this.toast.error("Vui lòng chọn thứ!", "Thông báo");
      return false;
    }
    if (this.f.Ca.value == "") {
      this.toast.error("Vui lòng chọn ca!", "Thông báo");
      return false;
    }
    if (this.f.Phong.value == "") {
      this.toast.error("Vui lòng chọn phòng!", "Thông báo");
      return false;
    }
    return true;
  }
  checkNgay() {
    if (this.f.NgayBu.value == "") {
      this.toast.error("Vui lòng chọn ngày bù!", "Thông báo");
      return false;
    }
    return true;
  }
  checkThuNgayTrung(Thu, Ngay) {
    let dateas = new Date(Ngay);
    let thu1 = dateas.getDay() + 1;

    if ("Thứ " + thu1 != Thu) {
      this.toast.error("Ngày bù là Thứ " + thu1 + " không khớp với " + Thu + ". Vui lòng xem lại", "Thông báo");
      return false;
    }
    return true;
  }
  ChangeNgayBu(event) {
    if (this.f.Thu.value != "") {
      if (!this.checkThuNgayTrung(this.f.Thu.value, event.target.value)) {
        this.listPhong = null;
        return;
      }
    }
    if (this.f.Ca.value != "" && this.f.Thu.value != "")
      this.getListPhong(this.f.Ca.value, this.f.Thu.value, event.target.value)
  }
  ChangeThuBu(event) {
    if (this.f.NgayBu.value != "") {
      if (!this.checkThuNgayTrung(event.target.value, this.f.NgayBu.value)) {
        this.listPhong = null;
        return;
      }
    }
    if (this.f.Ca.value != "" && this.f.NgayBu.value != "")
      this.getListPhong(this.f.Ca.value, event.target.value, this.f.NgayBu.value)
  }
  ChangeCaBu(event) {
    if (this.f.NgayBu.value != "" && this.f.Thu.value != "")
      this.getListPhong(event.target.value, this.f.Thu.value, this.f.NgayBu.value)
  }
  them() {
    if (!this.checkThongTin()) {
      return;
    }
    if (!this.checkNgay()) {
      return;
    }
    if (!this.checkThuNgayTrung(this.f.Thu.value, this.f.NgayBu.value)) {
      return;
    }
    this.lophocService.checkGiangVienBaoBu(this.f.HoTen.value, this.f.Ca.value, this.f.Thu.value, this.f.NgayBu.value)
      .pipe()
      .subscribe(res => {
        if (res.result.error === true) {
          alert(res.result.message);
          return;
        }
        if (res.result.data.length > 0) {
          let loptemp=res.result.data[0].TenLopHocPhan +" ("+res.result.data[0].TenLopHocPhan+")."
          this.toast.error("Giảng viên này đã có lớp học "+loptemp,"Thông báo");
          return;
        }
        this.baobuSerice.themBaoBu(this.f.HoTen.value, this.f.Lop.value, this.f.Phong.value,
          this.f.Ca.value, this.f.Thu.value, this.f.NgayBu.value, this.f.GhiChu.value)
          .pipe()
          .subscribe(res => {
            if (res.result.error === true) {
              alert(res.result.message);
              return;
            }
            this.toast.success("Đã thêm thành công");
            this.closebutton.nativeElement.click();
            this.getListBaoBu();
          })
      })
  }
  sua() {
    if (!this.checkThongTin()) {
      return;
    }
    if (!this.checkNgay()) {
      return;
    }
    if (!this.checkThuNgayTrung(this.f.Thu.value, this.f.NgayBu.value)) {
      return;
    }
    this.baobuSerice.suaBaoBu(this.IDBaoBu, this.f.Lop.value, this.f.Phong.value,
      this.f.Ca.value, this.f.Thu.value, this.f.NgayBu.value, this.f.GhiChu.value)
      .pipe()
      .subscribe(res => {
        if (res.result.error === true) {
          alert(res.result.message);
          return;
        }
        this.toast.success("Đã sửa thành công");
        this.closebutton.nativeElement.click();
        this.getListBaoBu();
      });
  }
  xoa() {
    console.log(this.IDBaoBu)
    this.baobuSerice.xoaBaoBu(+this.IDBaoBu)
      .pipe()
      .subscribe(res => {
        if (res.result.error === true) {
          alert(res.result.message);
          return;
        }
        this.toast.success("Đã xóa thành công");
        this.getListBaoBu();
        this.closebuttondelete.nativeElement.click();
      })
  }

  getListGiangVienForm() {
    this.listGiangVien = null;
    this.giangvienService.getListGiangVien()
      .pipe()
      .subscribe(res => {
        if (res.result.error === true) {
          alert(res.result.message);
          return;
        }
        this.listGiangVien = res.result.data.filter(gv => gv.TrangThai == 1);
      });
  }
  changeIDGiangVienForm(IDGiangVien) {
    this.listLopHoc = null;
    this.f.Lop.setValue("");
    this.getListLopHocForm(IDGiangVien);
  }
  getListLopHocForm(IDGiangVien) {
    this.dslhService.danhsachlophocbyidgiangvien(IDGiangVien)
      .pipe()
      .subscribe(res => {
        if (res.result.error === true) {
          alert(res.result.message);
          return;
        }
        this.listLopHoc = res.result.data.filter(lh => lh.TrangThai == 1);
      });
  }
  changeTrangThai(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id.value.split("-")[1];
    this.getBaoBuByID(idAttr);
    let TrangThai = target.checked ? 1 : 0;
    this.baobuSerice
      .suaTrangThaiBaoBu(+idAttr, TrangThai)
      .pipe()
      .subscribe((res) => {
        //console.log(res);
      });
  }
  TrangThaiKichHoat(event) {
    this.trangthaikichhoat = event.target.value;
    this.getListBaoBu();
  }
  //load script
  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
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
                  .then((data) => { })
                  .catch((error) => console.log(error));
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }

}
