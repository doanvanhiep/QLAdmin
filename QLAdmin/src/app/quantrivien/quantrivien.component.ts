import { Component, OnInit, ViewChild } from '@angular/core';
import { QuantrivienService } from '../service/quantrivien/quantrivien.service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { UploadimageService } from '../service/upload/uploadimage.service';
import { DynamicScriptLoaderServiceService } from '../../app/dynamic-script-loader-service.service';
import { CheckrouteService } from '../service/checkroute/checkroute.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-quantrivien',
  templateUrl: './quantrivien.component.html',
  styleUrls: ['./quantrivien.component.css']
})
export class QuantrivienComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  @ViewChild('closebuttonDelete') closebuttondelete;
  listQuanTriVien: any = [];
  btnedit: any = false;
  quantrivienForm: FormGroup;
  quantrivienByID: any;
  fileSelected: File = null;
  IDQuanTriVien: any;
  parentRouter: any;
  trangthaikichhoat: any = -1;
  constructor(
    private checkrouteService: CheckrouteService,
    private router: Router,
    private formBuilder: FormBuilder,
    private dynamicScriptLoader: DynamicScriptLoaderServiceService,
    private quantrivienService: QuantrivienService,
    private uploadimage: UploadimageService) {
    this.parentRouter = this.checkrouteService.getParentRouter();
    if (this.parentRouter != "admin")
      this.router.navigate([this.parentRouter]);
  }

  ngOnInit() {
    this.loadScripts();
    this.createForm();
    this.getListQuanTriVien();
  }
  createForm() {
    this.btnedit = false;
    this.quantrivienForm = this.formBuilder.group({
      HoTen: "",
      DiaChi: "",
      SoDienThoai: "",
      Email: "",
      HinhAnh: "",
      GhiChu: ""
    });
    document.getElementById('nameoffile').innerHTML = "Không có tệp nào được chọn";
  }
  editForm(quantrivienByID) {
    this.btnedit = true;
    this.quantrivienForm = this.formBuilder.group({
      HoTen: quantrivienByID.HoTen,
      DiaChi: quantrivienByID.DiaChi,
      SoDienThoai: quantrivienByID.SoDienThoai,
      Email: quantrivienByID.Email,
      HinhAnh: quantrivienByID.HinhAnh,
      GhiChu: quantrivienByID.GhiChu
    });
    document.getElementById('nameoffile').innerHTML = quantrivienByID.HinhAnh;
  }
  get f() { return this.quantrivienForm.controls; }
  getListQuanTriVien() {
    this.quantrivienService.getListQuanTriVien()
      .pipe()
      .subscribe(res => {
        if (res.result.error === true) {
          alert(res.result.message);
          return;
        }
        if (this.trangthaikichhoat == -1) {
          this.listQuanTriVien = res.result.data;
        }
        else {
          let TrangThai = this.trangthaikichhoat;
          this.listQuanTriVien = res.result.data.filter(qtv => qtv.TrangThai == TrangThai);
        }
      });
  }
  them() {
    if (!this.checkForm() || !this.checkFileHinh()) {
      return;
    }
    this.uploadimage.uploadimage(this.fileSelected)
      .pipe()
      .subscribe(res => {
        this.quantrivienService.themQuanTriVien(
          this.f.HoTen.value, this.f.DiaChi.value,
          this.f.SoDienThoai.value, this.f.Email.value,
          res.id, this.f.GhiChu.value)
          .pipe()
          .subscribe(res => {
            if (res.TrangThai.error === true) {
              alert(res.TrangThai.message);
              return;
            }
            alert("Thêm thành công");
            this.getListQuanTriVien();
          });
        this.closebutton.nativeElement.click();
      });
  }
  sua() {
    if (!this.checkForm()) {
      return;
    }
    var idImg = document.getElementById('nameoffile').textContent;
    if (idImg === this.quantrivienByID.HinhAnh) {
      this.quantrivienService.suaQuanTriVien(this.quantrivienByID.IDQuanTri,
        this.f.HoTen.value, this.f.DiaChi.value,
        this.f.SoDienThoai.value, this.f.Email.value,
        idImg, this.f.GhiChu.value)
        .pipe()
        .subscribe(res => {
          if (res.TrangThai.error === true) {
            alert(res.TrangThai.message);
            return;
          }
          alert("Sửa thành công");
          this.getListQuanTriVien();
          this.closebutton.nativeElement.click();
        });
    }
    else {
      this.uploadimage.uploadimage(this.fileSelected)
        .pipe()
        .subscribe(res => {
          this.quantrivienService.suaQuanTriVien(this.quantrivienByID.IDQuanTri,
            this.f.HoTen.value, this.f.DiaChi.value,
            this.f.SoDienThoai.value, this.f.Email.value,
            res.id, this.f.GhiChu.value)
            .pipe()
            .subscribe(res => {
              if (res.TrangThai.error === true) {
                alert(res.TrangThai.message);
                return;
              }
              alert("Sửa thành công");
              this.getListQuanTriVien();
              this.closebutton.nativeElement.click();
            });
        });
    }
  }
  checkForm() {
    if (this.f.HoTen.value == "") {
      alert("Vui lòng nhập họ và tên của giảng viên")
      return false;
    }
    if (this.f.SoDienThoai.value == "") {
      alert("Vui lòng nhập số điện thoại")
      return false;
    }
    if (!this.f.SoDienThoai.value.match(/(0)+([0-9]{9})\b/g)) {
      alert("Vui lòng nhập số điện thoại đúng định dạng");
      return false;
    }
    if (this.f.Email.value == "") {
      alert("Vui lòng nhập email")
      return false;
    }
    if (!this.f.Email.value.match(/[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9A-Z](?:[a-z0-9A-Z]*[a-z0-9A-Z])?\.)+[a-z0-9A-Z](?:[a-z0-9A-Z]*[a-z0-9A-Z])?/)) {
      alert("Vui lòng nhập mail đúng định dạng");
      return false;
    }
    return true;
  }
  checkFileHinh() {
    if (this.fileSelected == null) {
      alert("Vui lòng chọn hình ảnh")
      return false;
    }
    return true;
  }
  xoa() {
    this.quantrivienService.xoaQuanTriVien(this.IDQuanTriVien)
      .pipe()
      .subscribe(res => {
        if (res.TrangThai.error === true) {
          alert(res.TrangThai.message);
          return;
        }
        alert("Xóa thành công");
        this.getListQuanTriVien();
      })
    this.closebuttondelete.nativeElement.click();
  }
  xoaQuanTriVien(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id.value;
    this.IDQuanTriVien = +idAttr;
  }
  suaQuanTriVien(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id.value;
    this.getQuanTriVienByID(+idAttr);
    this.editForm(this.quantrivienByID);
  }
  getQuanTriVienByID(idQuanTriVien) {
    this.quantrivienByID = this.listQuanTriVien.filter(item => item.IDQuanTri === +idQuanTriVien)[0];
  }
  changeTrangThai(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id.value.split("-")[1];
    this.getQuanTriVienByID(idAttr);
    let TrangThai = target.checked ? 1 : 0;
    this.quantrivienService.suaTrangThaiQuanTri(+idAttr, TrangThai)
      .pipe()
      .subscribe(res => {
        //console.log(res);
      });
  }
  TrangThaiKichHoat(event) {
    this.trangthaikichhoat = event.target.value;
    this.getListQuanTriVien();
  }
  onSelectedFile(event) {
    this.fileSelected = <File>event.target.files[0];
    if (this.fileSelected.name) {
      document.getElementById('nameoffile').innerHTML = this.fileSelected.name;
      return;
    }
    document.getElementById('nameoffile').innerHTML = "Không có tệp nào được chọn";
    this.fileSelected = null;
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
