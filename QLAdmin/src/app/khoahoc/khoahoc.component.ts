import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { DynamicScriptLoaderServiceService } from '../../app/dynamic-script-loader-service.service';
import { KhoahocService } from '../service/khoahoc/khoahoc.service';
import { Router } from '@angular/router';
import { SharedataService } from '../service/sharedata/sharedata.service';
import { CheckrouteService } from '../service/checkroute/checkroute.service';
@Component({
    selector: 'app-khoahoc',
    templateUrl: './khoahoc.component.html',
    styleUrls: ['./khoahoc.component.css']
})
export class KhoahocComponent implements OnInit {
    @ViewChild('closebutton') closebutton;
    @ViewChild('closebuttonDelete') closebuttondelete;
    khoahocForm: FormGroup;
    listKhoaHoc: any;
    khoahocByID: any;
    btnedit: any = false;
    IDKhoaHoc: number;
    trangthaikichhoat: any = -1;
    parentRouter: any;
    constructor(
        private checkrouteService: CheckrouteService,
        private share: SharedataService,
        private router: Router,
        private dynamicScriptLoader: DynamicScriptLoaderServiceService,
        private formBuilder: FormBuilder,
        private khoahocService: KhoahocService
    ) {
        this.parentRouter = this.checkrouteService.getParentRouter();
        if (this.parentRouter != "admin")
            this.router.navigate([this.parentRouter]);
    }

    ngOnInit() {
        this.loadScripts();
        this.createForm();
        this.getListKhoaHoc();
    }
    createForm() {
        this.btnedit = false;
        this.khoahocForm = this.formBuilder.group({
            TenKhoaHoc: "",
            GhiChu: ""
        });
    }
    editForm(tenkhoahoc, ghichu) {
        this.btnedit = true;
        this.khoahocForm = this.formBuilder.group({
            TenKhoaHoc: tenkhoahoc,
            GhiChu: ghichu
        });
    }
    get f() { return this.khoahocForm.controls; }
    them() {
        if(!this.checkForm())
        {
            return;
        }
        this.khoahocService.themKhoaHoc(this.f.TenKhoaHoc.value, this.f.GhiChu.value)
            .pipe()
            .subscribe(res => {
                if (res.TrangThai.error === true) {
                    alert(res.TrangThai.message);
                    return;
                }
                alert("Thêm thành công");
                this.getListKhoaHoc();
            });
        this.closebutton.nativeElement.click();
    }
    sua() {
        if(!this.checkForm())
        {
            return;
        }
        this.khoahocService.suaKhoaHoc(this.khoahocByID.IDKhoaHoc, this.f.TenKhoaHoc.value, this.f.GhiChu.value)
            .pipe()
            .subscribe(res => {
                if (res.TrangThai.error === true) {
                    alert(res.TrangThai.message);
                    return;
                }
                alert("Sửa thành công");
                this.getListKhoaHoc();
            })
        this.closebutton.nativeElement.click();
    }
    checkForm()
    {
        if(this.f.TenKhoaHoc.value=="")
        {
            alert("Vui lòng nhập tên khóa học");
            return false;
        }
        return true;
    }
    xoa() {
        this.khoahocService.xoaKhoaHoc(this.IDKhoaHoc)
            .pipe()
            .subscribe(res => {
                if (res.TrangThai.error === true) {
                    alert(res.TrangThai.message);
                    return;
                }
                alert("Xóa thành công");
                this.getListKhoaHoc();
            })
        this.closebuttondelete.nativeElement.click();
    }
    changeStatus(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id.value;
        alert(idAttr);
    }
    getListKhoaHoc() {
        this.khoahocService.getListKhoaHoc()
            .pipe()
            .subscribe(res => {
                if (res.result.error === true) {
                    alert(res.result.message);
                    return;
                }
                if (this.trangthaikichhoat == -1) {
                    this.listKhoaHoc = res.result.data;
                }
                else {
                    let TrangThai = this.trangthaikichhoat;
                    this.listKhoaHoc = res.result.data.filter(lh => lh.TrangThai == TrangThai);
                }
            });
    }
    dbClick(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id.value;
        this.shareData(+idAttr);
        this.router.navigate(['admin/lophocphan']);
    }
    suaKhoaHoc(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id.value;
        this.getKhoaHocByID(+idAttr);
        this.editForm(this.khoahocByID.TenKhoaHoc, this.khoahocByID.GhiChu);
    }
    xoaKhoaHoc(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id.value;
        this.IDKhoaHoc = +idAttr;
    }
    getKhoaHocByID(idKhoaHoc) {
        this.khoahocByID = this.listKhoaHoc.filter(item => item.IDKhoaHoc == +idKhoaHoc)[0];
    }

    shareData(IDKhoaHoc) {
        this.share.shareDataKhoaHoc(IDKhoaHoc, this.listKhoaHoc.filter(item => item.IDKhoaHoc === IDKhoaHoc)[0]);
    }
    changeTrangThai(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id.value.split("-")[1];
        let TrangThai = target.checked ? 1 : 0;
        this.khoahocService.suaTrangThaiKhoaHoc(+idAttr, TrangThai)
            .pipe()
            .subscribe(res => {
                //console.log(res);
            });
    }
    TrangThaiKichHoat(event) {
        this.trangthaikichhoat = event.target.value;
        this.getListKhoaHoc();
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
