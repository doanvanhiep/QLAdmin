import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedataService } from '../service/sharedata/sharedata.service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { KhoahocService } from '../service/khoahoc/khoahoc.service';
import { LophocphanService } from '../service/lophocphan/lophocphan.service';
import { DynamicScriptLoaderServiceService } from '../../app/dynamic-script-loader-service.service';
import { UploadimageService } from '../service/upload/uploadimage.service';
import { CheckrouteService } from '../service/checkroute/checkroute.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";    
@Component({
    selector: 'app-lophocphan',
    templateUrl: './lophocphan.component.html',
    styleUrls: ['./lophocphan.component.css']
})
export class LophocphanComponent implements OnInit {
    @ViewChild('closebutton') closebutton;
    @ViewChild('closebuttonDelete') closebuttondelete;
    idFile: any = -1;
    trangthaikichhoat: any = -1;
    khoahoc: any;
    btnedit: boolean = true;
    lophocphanForm: FormGroup;
    listLopHocPhan: any;
    IDKhoaHoc: any = -1;
    fileSelected: File = null;
    lophocphanByID: any;
    IDLopHocPhan: any;
    selectedKhoaHoc: any = -1;
    listKhoaHoc: any = [];
    parentRouter: any;
    constructor(
        private spinner: NgxSpinnerService,
        private checkrouteService: CheckrouteService,
        private dynamicScriptLoader: DynamicScriptLoaderServiceService,
        private share: SharedataService,
        private router: Router,
        private khoahocService: KhoahocService,
        private formBuilder: FormBuilder,
        private lophocphanservice: LophocphanService,
        private uploadimage: UploadimageService,
        private toast: ToastrService
    ) {
        this.parentRouter = this.checkrouteService.getParentRouter();
        if (this.parentRouter != "admin")
            this.router.navigate([this.parentRouter]);
    }

    ngOnInit() {
        this.getDataKhoaHoc();
        if (this.khoahoc != null) {
            this.IDKhoaHoc = this.khoahoc.IDKhoaHoc;
            this.selectedKhoaHoc = this.IDKhoaHoc;
        }
        this.getListKhoaHoc();
        if (this.IDKhoaHoc != -1)
            this.getListLopHocPhan(this.IDKhoaHoc);
        this.createForm();
        this.loadScripts();
    }
    createForm() {
        this.btnedit = false;
        this.lophocphanForm = this.formBuilder.group({
            MaLopHocPhan: "",
            TenLopHocPhan: "",
            SoBuoi: "",
            HocPhi: "",
            SiSo: "",
            MoTa: "",
            HinhAnh: "",
            GhiChu: ""
        });
        document.getElementById('nameoffile').innerHTML = "Không có tệp nào được chọn";
    }
    editForm(lophocphanByID) {
        this.btnedit = true;
        this.lophocphanForm = this.formBuilder.group({
            MaLopHocPhan: lophocphanByID.MaLopHocPhan,
            TenLopHocPhan: lophocphanByID.TenLopHocPhan,
            SoBuoi: lophocphanByID.SoBuoi,
            HocPhi: lophocphanByID.HocPhi,
            SiSo: lophocphanByID.SiSo,
            MoTa: lophocphanByID.MoTa,
            HinhAnh: lophocphanByID.HinhAnh,
            GhiChu: lophocphanByID.GhiChu
        });
        document.getElementById('nameoffile').innerHTML = lophocphanByID.HinhAnh;
    }
    getDataKhoaHoc() {
        this.khoahoc = this.share.receiveDataKhoaHoc();
    }
    getListLopHocPhan(IDKhoaHoc) {
        this.lophocphanservice.getListLopHocPhan(IDKhoaHoc)
            .pipe()
            .subscribe(res => {
                if (this.trangthaikichhoat == -1) {
                    this.listLopHocPhan = res.result.data;
                }
                else {
                    let TrangThai = this.trangthaikichhoat;
                    this.listLopHocPhan = res.result.data.filter(lh => lh.TrangThai == TrangThai);
                }
            });
    }
    get f() { return this.lophocphanForm.controls; }
    them() {
        if (!this.checkForm() || !this.checkFileHinh()) {
            return;
        }
        this.spinner.show();
        this.uploadimage.uploadimage(this.fileSelected)
            .pipe()
            .subscribe(res => {
                this.lophocphanservice.themLopHocPhan(
                    this.IDKhoaHoc, this.f.MaLopHocPhan.value, this.f.TenLopHocPhan.value,
                    +this.f.HocPhi.value, +this.f.SoBuoi.value, +this.f.SiSo.value,
                    this.f.MoTa.value, res.id, this.f.GhiChu.value)
                    .pipe()
                    .subscribe(res => {
                        this.spinner.hide();
                        if (res.TrangThai.error === true) {
                            alert(res.TrangThai.message);
                            return;
                        }
                        // alert("Thêm thành công");
                        this.closebutton.nativeElement.click();
                        this.getListLopHocPhan(this.IDKhoaHoc);
                    });
            });
    }
    sua() {
        if (!this.checkForm()) {
            return;
        }
        this.spinner.show();
        var idImg = document.getElementById('nameoffile').textContent;
        if (idImg === this.lophocphanByID.HinhAnh) {
            this.lophocphanservice.suaLopHocPhan(
                this.lophocphanByID.IDLopHocPhan, this.f.MaLopHocPhan.value, this.f.TenLopHocPhan.value,
                +this.f.HocPhi.value, +this.f.SoBuoi.value, +this.f.SiSo.value,
                this.f.MoTa.value, idImg, this.f.GhiChu.value)
                .pipe()
                .subscribe(res => {
                    this.spinner.hide();
                    if (res.TrangThai.error === true) {
                        alert(res.TrangThai.message);
                        return;
                    }
                    this.getListLopHocPhan(this.IDKhoaHoc);
                    this.closebutton.nativeElement.click();
                });
        }
        else {
            this.uploadimage.uploadimage(this.fileSelected)
                .pipe()
                .subscribe(res => {
                    this.lophocphanservice.suaLopHocPhan(
                        this.lophocphanByID.IDLopHocPhan, this.f.MaLopHocPhan.value, this.f.TenLopHocPhan.value,
                        +this.f.HocPhi.value, +this.f.SoBuoi.value, +this.f.SiSo.value,
                        this.f.MoTa.value, res.id, this.f.GhiChu.value)
                        .pipe()
                        .subscribe(res => {
                            this.spinner.hide();
                            if (res.TrangThai.error === true) {
                                alert(res.TrangThai.message);
                                return;
                            }
                            this.closebutton.nativeElement.click();
                            this.getListLopHocPhan(this.IDKhoaHoc);
                        });
                });
        }
    }
    checkForm() {
        if (this.f.MaLopHocPhan.value == "") {
            alert("Vui lòng nhập mã lớp học phần")
            return false;
        }
        if (this.f.TenLopHocPhan.value == "") {
            alert("Vui lòng nhập tên lớp học phần")
            return false;
        }
        if (this.f.SoBuoi.value == "" || this.f.SoBuoi.value == null) {
            alert("Vui lòng nhập số buổi")
            return false;
        }
        if (this.f.HocPhi.value == "" || this.f.HocPhi.value == null) {
            alert("Vui lòng nhập học phí")
            return false;
        }
        if (this.f.SiSo.value == "" || this.f.SiSo.value == null) {
            alert("Vui lòng nhập sỉ số")
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
        this.lophocphanservice.xoaLopHocPhan(this.IDLopHocPhan)
            .pipe()
            .subscribe(res => {
                if (res.TrangThai.error === true) {
                    alert(res.TrangThai.message);
                    return;
                }
                alert("Xóa thành công");
                this.getListLopHocPhan(this.IDKhoaHoc);
            })
        this.closebuttondelete.nativeElement.click();
    }
    xoaLopHocPhan(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id.value;
        this.IDLopHocPhan = +idAttr;
    }
    suaLopHocPhan(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id.value;
        this.getLopHocPhanByID(+idAttr);
        this.editForm(this.lophocphanByID);
    }
    getLopHocPhanByID(idLopHocPhan) {
        this.lophocphanByID = this.listLopHocPhan.filter(item => item.IDLopHocPhan === +idLopHocPhan)[0];
    }
    dbClick(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id.value;
        this.shareData(+idAttr);
        this.router.navigate(['admin/lophoc']);
    }
    shareData(IDLopHocPhan) {
        this.share.shareDataLopHocPhan(IDLopHocPhan, this.listLopHocPhan.filter(item => item.IDLopHocPhan === IDLopHocPhan)[0]);
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
    TrangThaiKichHoat(event) {
        this.trangthaikichhoat = event.target.value;
        this.getListLopHocPhan(this.IDKhoaHoc);
    }
    changeTrangThai(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id.value.split("-")[1];
        let TrangThai = target.checked ? 1 : 0;
        this.lophocphanservice.suaTrangThaiLopHocPhan(+idAttr, TrangThai)
            .pipe()
            .subscribe(res => {
                //console.log(res);
            });
    }
    changeIDKhoaHoc(IDKhoaHoc) {
        this.IDKhoaHoc = IDKhoaHoc;
        this.getListLopHocPhan(this.IDKhoaHoc);
    }
    getListKhoaHoc() {
        this.khoahocService.getAllKhoaHocKichHoat()
            .pipe()
            .subscribe(res => {
                this.listKhoaHoc = res.result.data;
                if (this.IDKhoaHoc == -1 && this.listKhoaHoc.length > 0) {
                    this.khoahoc = this.listKhoaHoc[0];
                    this.IDKhoaHoc = this.khoahoc.IDKhoaHoc;
                    this.selectedKhoaHoc = this.IDKhoaHoc;
                    this.changeIDKhoaHoc(this.IDKhoaHoc);
                }
            });
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
