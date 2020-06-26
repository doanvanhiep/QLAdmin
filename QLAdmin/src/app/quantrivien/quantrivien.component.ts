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
        this.listQuanTriVien = res.result.data;
      });
  }
  them() {
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
