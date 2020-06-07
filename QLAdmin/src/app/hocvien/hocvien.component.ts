import { Component, OnInit, ViewChild } from '@angular/core';
import { HocvienService } from '../service/hocvien/hocvien.service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { DynamicScriptLoaderServiceService } from '../../app/dynamic-script-loader-service.service';
import { KhoahocService } from '../service/khoahoc/khoahoc.service';
import { LophocphanService } from '../service/lophocphan/lophocphan.service';
import { LophocService } from '../service/lophoc/lophoc.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CheckrouteService } from '../service/checkroute/checkroute.service';
@Component({
    selector: 'app-hocvien',
    templateUrl: './hocvien.component.html',
    styleUrls: ['./hocvien.component.css']
})
export class HocvienComponent implements OnInit {
    @ViewChild('closebutton') closebutton;
    @ViewChild('closebuttonDelete') closebuttondelete;
    idLopHocPhan: any;
    idKhoaHoc: any;
    listKhoaHoc: any;
    listLopHocPhan: any;
    listLopHoc: any;
    isGiangVien: boolean = false;
    listHocVien: any;
    btnedit: any = false;
    hocvienForm: FormGroup;
    HocPhiLopHoc: any;
    hocvienByID: any;
    parentRouter: any = "admin";
    constructor(
        private checkrouteService: CheckrouteService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private lophocService: LophocService,
        private lophocphanService: LophocphanService,
        private khoahocService: KhoahocService,
        private formBuilder: FormBuilder,
        private hocvienService: HocvienService,
        private dynamicScriptLoader: DynamicScriptLoaderServiceService, ) {
        this.checkRoute();
        this.listHocVien = window.history.state.DSHV;
        if (!this.listHocVien) {
            if (this.isGiangVien) {
                this.router.navigate(['gv/danhsachlophoc']);
            }
            this.getListHocVien();
        }
        else {
            this.idLopHocPhan = +window.history.state.IDLopHocPhan;
            this.idKhoaHoc = +window.history.state.IDKhoaHoc;
        }
    }

    ngOnInit() {
        this.createForm();
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

    createForm() {
        this.btnedit = false;
        this.hocvienForm = this.formBuilder.group({
            TenHocVien: "",
            SoDienThoai: "",
            Email: "",
            KhoaHoc: "",
            TenLopHoc: "",
            LopHoc: "",
            HocPhi: { value: "", disabled: true }
        });
    }
    editForm(HocvienByID) {
        this.hocvienForm = this.formBuilder.group({
            TenHocVien: HocvienByID.TenHocVien,
            SoDienThoai: HocvienByID.SoDienThoai,
            Email: HocvienByID.Email,
            KhoaHoc: this.idKhoaHoc,
            TenLopHoc: this.idLopHocPhan,
            LopHoc: HocvienByID.IDLopHoc,
            HocPhi: HocvienByID.SoTien
        });
    }
    changeIDKhoaHoc(IDKhoaHoc) {
        this.HocPhiLopHoc = "";
        this.listLopHoc = null;
        this.getListLopHocPhan(IDKhoaHoc);
    }
    changeIDLopHocPhan(IDLopHocPhan) {
        this.HocPhiLopHoc = this.listLopHocPhan.filter(lhp => lhp.IDLopHocPhan == IDLopHocPhan)[0].HocPhi;
        this.getListLopHoc(IDLopHocPhan);
    }
    getListHocVien() {
        this.hocvienService.getListHocVien()
            .pipe()
            .subscribe(res => {
                if (res.result.error === true) {
                    alert(res.result.message);
                    return;
                }
                this.listHocVien = res.result.data;
            });
    }
    getListKhoaHoc() {
        this.khoahocService.getListKhoaHoc()
            .pipe()
            .subscribe(res => {
                if (res.result.error === true) {
                    alert(res.result.message);
                    return;
                }
                this.listKhoaHoc = res.result.data;
            });
    }
    getListLopHocPhan(IDLopHocPhan) {
        this.lophocphanService.getListLopHocPhan(IDLopHocPhan)
            .pipe()
            .subscribe(res => {
                if (res.result.error === true) {
                    alert(res.result.message);
                    return;
                }
                this.listLopHocPhan = res.result.data;
            });
    }
    getListLopHoc(IDLopHoc) {
        this.lophocService.getListLopHocByID(IDLopHoc)
            .pipe()
            .subscribe(res => {
                if (res.result.error === true) {
                    alert(res.result.message);
                    return;
                }
                this.listLopHoc = res.result.data;
            });
    }
    guiMailLop() {
        alert("Gửi mail lớp");
    }
    guiMailCaNhan(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id.value;
        alert(idAttr);
        alert("Gửi mail cá nhân");
    }
    get f() { return this.hocvienForm.controls; }
    them() {
        this.closebutton.nativeElement.click();
    }
    sua() {
        this.closebutton.nativeElement.click();
    }
    xoa() {
        this.closebuttondelete.nativeElement.click();
    }
    xemHocVien(event) {
        this.btnedit = "xem";
        this.hocvienForm.disable();
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id.value;
        this.xemsuahocvien(idAttr);
    }
    suaHocVien(event) {
        this.hocvienForm.enable();
        this.f.HocPhi.disable();
        this.f.KhoaHoc.disable();
        this.f.TenLopHoc.disable();
        this.btnedit = true;
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id.value;
        this.xemsuahocvien(idAttr);
    }
    xemsuahocvien(IDHocVien) {
        this.hocvienByID = this.listHocVien.filter(hv => hv.IDHocVien == IDHocVien)[0];
        if (!this.idLopHocPhan) {
            this.idLopHocPhan = this.hocvienByID.IDLopHocPhan;
            this.idKhoaHoc = this.hocvienByID.IDKhoaHoc;
        }
        this.getListKhoaHoc();
        this.getListLopHocPhan(this.idKhoaHoc);
        this.getListLopHoc(this.idLopHocPhan);
        this.editForm(this.hocvienByID);
    }
    themHocVien() {
        this.hocvienForm.enable();
        this.f.HocPhi.disable();
        this.createForm();
        this.getListKhoaHoc();
        this.listLopHocPhan = null;
        this.listLopHoc = null;
    }
    xoaHocVien(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id.value;
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
