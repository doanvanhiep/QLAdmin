import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicScriptLoaderServiceService } from '../../app/dynamic-script-loader-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CheckrouteService } from '../service/checkroute/checkroute.service';
import { GiangvienService } from '../service/giangvien/giangvien.service';
import { QuantrivienService } from '../service/quantrivien/quantrivien.service';
import { Login_serviceService } from '../service_auth/login_service.service'
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { UploadimageService } from '../service/upload/uploadimage.service';
@Component({
   selector: 'app-thongtincanhan',
   templateUrl: './thongtincanhan.component.html',
   styleUrls: ['./thongtincanhan.component.css']
})
export class ThongtincanhanComponent implements OnInit {
   @ViewChild('fileInput') fileInput;
   @ViewChild('closebutton') closebutton;
   disableButton: any = false;
   fileSelected: File = null;
   thongtincanhanForm: FormGroup;
   doimatkhauForm: FormGroup;
   isGiangVien: any = false;
   parentRouter: any = "admin";
   thongtincanhan: any = null;
   serviceSelect: any;
   TenTaiKhoan: any;
   imgURL: any = " ";
   newIDFile: any = -1;
   checkFake: any = true;
   constructor(
      private formBuilder: FormBuilder,
      private loginService: Login_serviceService,
      private quantrivienService: QuantrivienService,
      private giangvienService: GiangvienService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private checkrouteService: CheckrouteService,
      private dynamicScriptLoader: DynamicScriptLoaderServiceService,
      private uploadimage: UploadimageService) {
      this.checkRoute();
   }

   ngOnInit() {
      if (this.isGiangVien)
         this.serviceSelect = this.giangvienService;
      else
         this.serviceSelect = this.quantrivienService;
      this.TenTaiKhoan = this.loginService.getTenTaiKhoan();
      this.getThongTin();
      this.createForm(this.thongtincanhan);
      this.createDoiMatKhauForm();
      this.loadScripts();
   }
   createForm(thongtincanhan) {
      this.thongtincanhanForm = this.formBuilder.group({
         HoTen: thongtincanhan == null ? "" : thongtincanhan.HoTen,
         SoDienThoai: thongtincanhan == null ? "" : thongtincanhan.SoDienThoai,
         Email: thongtincanhan == null ? "" : thongtincanhan.Email,
         DiaChi: thongtincanhan == null ? "" : thongtincanhan.DiaChi
      });
      let img = this.thongtincanhan ? thongtincanhan.HinhAnh : '1Pgd3rbBMeKd9TKCBbf5C2hn005-cbD1c';
      this.imgURL = "https://drive.google.com/uc?id=" + img;
   }
   createDoiMatKhauForm() {
      this.doimatkhauForm = this.formBuilder.group({
         MatKhauCu: "",
         MatKhauMoi: "",
         MatKhauMoiXacNhan: ""
      });
   }
   getThongTin() {
      this.serviceSelect.getThongTinByTenTaiKhoan(this.TenTaiKhoan)
         .pipe()
         .subscribe(res => {
            this.thongtincanhan = res.result.data[0];
            this.createForm(this.thongtincanhan);
            this.imgURL = "https://drive.google.com/uc?id=" + this.thongtincanhan.HinhAnh;
         })
   }
   onClickFileInputButton(): void {
      this.fileInput.nativeElement.click();
   }

   onChangeFileInput(event): void {
      if (!<File>event.target.files[0]) {
         return;
      }
      this.fileSelected = <File>event.target.files[0];
      this.disableButton = true;
      this.uploadimage.uploadimage(this.fileSelected)
         .pipe()
         .subscribe(res => {
            this.newIDFile = res.id;
            this.disableButton = false;
         });
      var reader = new FileReader();
      reader.readAsDataURL(this.fileSelected);
      reader.onload = (_event) => {
         this.imgURL = reader.result;
      }

   }
   get f() { return this.thongtincanhanForm.controls; }
   CapNhap() {
      if (this.newIDFile == -1) {
         this.newIDFile = this.thongtincanhan.HinhAnh;
      }
      this.serviceSelect.suaThongTinCaNhan(this.thongtincanhan.TenTaiKhoan, this.f.HoTen.value, this.f.DiaChi.value, this.f.SoDienThoai.value, this.f.Email.value, this.newIDFile)
         .pipe()
         .subscribe(res => {
            if (res.TrangThai.error === true) {
               alert(res.TrangThai.message);
               return;
            }
            alert("Sửa thành công");
         });
      this.newIDFile = -1;
   }
   DoiMatKhau() {
      this.createDoiMatKhauForm();
   }
   get fDoiMatKhau() { return this.doimatkhauForm.controls; }
   doiMK() {
      let resCondition = this.checkConditionPassword(this.fDoiMatKhau.MatKhauCu.value, this.fDoiMatKhau.MatKhauMoi.value, this.fDoiMatKhau.MatKhauMoiXacNhan.value);
      if (!resCondition) {
         return;
      }
      this.loginService.changePassword(this.thongtincanhan.TenTaiKhoan, this.fDoiMatKhau.MatKhauCu.value, this.fDoiMatKhau.MatKhauMoi.value)
         .pipe()
         .subscribe(res => {
            alert(res.TrangThai.message);
            if(res.TrangThai.error)
            {
               return;
            }
            this.loginService.logout();
            window.location.reload();
         })
      this.closebutton.nativeElement.click();
   }
   checkConditionPassword(MatKhauCu, MatKhauMoi, MatKhauMoiXacNhan) {
      if (MatKhauCu == '') {
         alert("Vui lòng nhập mật khẩu cũ");
         return false;
      }
      if (MatKhauMoi == '') {
         alert("Vui lòng nhập mật khẩu mới");
         return false;
      }
      if (MatKhauMoiXacNhan == '') {
         alert("Vui lòng nhập xác nhận mật khẩu mới");
         return false;
      }
      if (MatKhauMoi.length < 8) {
         alert("Vui lòng nhập mật khẩu mới có chiều dài lớn hơn 8");
         return false;
      }
      if (MatKhauMoi != MatKhauMoiXacNhan) {
         alert("Mật khẩu xác nhận không trùng với mật khẩu mới");
         return false;
      }
      return true;
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
   //load script
   private loadScripts() {
      this.dynamicScriptLoader.load('sbadmin2minjs').then(data => {
      }).catch(error => console.log(error));
   }
}
