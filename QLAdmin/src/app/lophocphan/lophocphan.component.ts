import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedataService } from '../service/sharedata/sharedata.service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { KhoahocService } from '../service/khoahoc/khoahoc.service';
import { from } from 'rxjs';
import { LophocphanService } from '../service/lophocphan/lophocphan.service';
import { DynamicScriptLoaderServiceService } from '../../app/dynamic-script-loader-service.service';
import { UploadimageService } from '../service/upload/uploadimage.service';
@Component({
    selector: 'app-lophocphan',
    templateUrl: './lophocphan.component.html',
    styleUrls: ['./lophocphan.component.css']
})
export class LophocphanComponent implements OnInit {
    @ViewChild('closebutton') closebutton;
    @ViewChild('closebuttonDelete') closebuttondelete;
    khoahoc: any;
    btnedit: boolean = true;
    lophocphanForm: FormGroup;
    listLopHocPhan: any;
    IDKhoaHoc: any;
    fileSelected: File = null;
    lophocphanByID:any;
    IDLopHocPhan:any;
    constructor(
        private dynamicScriptLoader: DynamicScriptLoaderServiceService,
        private share: SharedataService,
        private router: Router,
        private khoahocService: KhoahocService,
        private formBuilder: FormBuilder,
        private lophocphanservice: LophocphanService,
        private uploadimage: UploadimageService
    ) { }

    ngOnInit() {
        this.IDKhoaHoc = localStorage.getItem("idKhoaHoc");
        if (!this.IDKhoaHoc) {
            this.router.navigate(['nv/khoahoc']);
            return;
        }

        this.getDataKhoaHoc();
        if (this.khoahoc == null) {
            this.khoahocService.getKhoaHocByID(this.IDKhoaHoc)
                .pipe()
                .subscribe(res => {
                    if (res.result.error === true) {
                        alert(res.result.message);
                        return;
                    }
                    this.khoahoc = res.result.data[0];
                });
        }
        this.createForm();
        this.getListLopHocPhan(this.IDKhoaHoc);
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
                this.listLopHocPhan = res.result.data;
            });
    }
    get f() { return this.lophocphanForm.controls; }
    them() {
        this.uploadimage.uploadimage(this.fileSelected)
            .pipe() 
            .subscribe(res => {
                this.lophocphanservice.themLopHocPhan(
                    this.IDKhoaHoc, this.f.MaLopHocPhan.value, this.f.TenLopHocPhan.value,
                    +this.f.HocPhi.value, +this.f.SoBuoi.value, +this.f.SiSo.value,
                    this.f.MoTa.value, res.id, this.f.GhiChu.value)
                    .pipe()
                    .subscribe(res => {
                        if (res.TrangThai.error === true) {
                            alert(res.TrangThai.message);
                            return;
                        }
                        alert("Thêm thành công");
                        this.getListLopHocPhan(this.IDKhoaHoc);
                    });
                this.closebutton.nativeElement.click();
            });
    }
    sua() {
        var idImg=document.getElementById('nameoffile').textContent;
        if(idImg===this.lophocphanByID.HinhAnh)
        {
            this.lophocphanservice.suaLopHocPhan(
                this.lophocphanByID.IDLopHocPhan, this.f.MaLopHocPhan.value, this.f.TenLopHocPhan.value,
                +this.f.HocPhi.value, +this.f.SoBuoi.value, +this.f.SiSo.value,
                this.f.MoTa.value, idImg, this.f.GhiChu.value)
                .pipe()
                .subscribe(res => {
                    if (res.TrangThai.error === true) {
                        alert(res.TrangThai.message);
                        return;
                    }
                    alert("Sửa thành công");
                    this.getListLopHocPhan(this.IDKhoaHoc);
                    this.closebutton.nativeElement.click();
                });
        }
        else{
            this.uploadimage.uploadimage(this.fileSelected)
            .pipe()
            .subscribe(res => {
                this.lophocphanservice.suaLopHocPhan(
                    this.lophocphanByID.IDLopHocPhan, this.f.MaLopHocPhan.value, this.f.TenLopHocPhan.value,
                    +this.f.HocPhi.value, +this.f.SoBuoi.value, +this.f.SiSo.value,
                    this.f.MoTa.value, res.id, this.f.GhiChu.value)
                    .pipe()
                    .subscribe(res => {
                        if (res.TrangThai.error === true) {
                            alert(res.TrangThai.message);
                            return;
                        }
                        alert("Sửa thành công");
                        this.getListLopHocPhan(this.IDKhoaHoc);
                    });
                this.closebutton.nativeElement.click();
            });
        }
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
        this.IDLopHocPhan=+idAttr;
    }
    suaLopHocPhan(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id.value;
        this.getLopHocPhanByID(+idAttr);
        this.editForm(this.lophocphanByID);
    }
    getLopHocPhanByID(idLopHocPhan)
    {
        this.lophocphanByID=this.listLopHocPhan.filter(item=>item.IDLopHocPhan===+idLopHocPhan)[0];
    }
    dbClick(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id.value;
        this.shareData(+idAttr);
        this.router.navigate(['admin/lophoc']);
    }
    shareData(IDLopHocPhan)
    {
        this.share.shareDataLopHocPhan(IDLopHocPhan,this.listLopHocPhan.filter(item=>item.IDLopHocPhan===IDLopHocPhan)[0]);
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
