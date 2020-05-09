import { Component, OnInit, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DynamicScriptLoaderServiceService } from '../../app/dynamic-script-loader-service.service';
import { SharedataService } from '../service/sharedata/sharedata.service';
import { LophocService } from '../service/lophoc/lophoc.service';
import { LophocphanService } from '../service/lophocphan/lophocphan.service';
import { Router } from '@angular/router';
import { GiangvienService } from '../service/giangvien/giangvien.service';
import { PhonghocService } from '../service/phonghoc/phonghoc.service';
@Component({
    selector: 'app-lophoc',
    templateUrl: './lophoc.component.html',
    styleUrls: ['./lophoc.component.css']
})
export class LophocComponent implements OnInit {
    @ViewChild('closebutton') closebutton;
    @ViewChild('closebuttonDelete') closebuttondelete;
    btnedit: any = false;
    lophocForm: FormGroup;
    lophocphan: any;
    IDLopHocPhan: any;
    listLopHoc: any;
    createCahoc: any = false;
    sobuoihocs: any;
    thus: { [key: string]: string } = { "Thứ 2": 'Thứ 2', 'Thứ 3': 'Thứ 3', 'Thứ 4': 'Thứ 4', 'Thứ 5': 'Thứ 5', 'Thứ 6': 'Thứ 6', 'Thứ 7': 'Thứ 7' };
    cas: { [key: string]: string } = { 'Ca 1': 'Ca 1', 'Ca 2': 'Ca 2', 'Ca 3': 'Ca 3', 'Ca 4': 'Ca 4', 'Ca 5': 'Ca 5' };
    giangviens: any;
    phonghocs: any;
    lophocByID:any;
    IDLopHoc:any;
    constructor(
        private phonghocService: PhonghocService,
        private giangvienService: GiangvienService,
        private lophocservice: LophocService,
        private lophocphanservice: LophocphanService,
        private share: SharedataService,
        private router: Router,
        private dynamicScriptLoader: DynamicScriptLoaderServiceService,
        private formBuilder: FormBuilder, ) { }

    ngOnInit() {
        this.IDLopHocPhan = localStorage.getItem("idLopHocPhan");
        if (!this.IDLopHocPhan) {
            this.router.navigate(['nv/lophocphan']);
            return;
        }
        this.getDataLopHocPhan();
        if (this.lophocphan == null) {
            this.lophocphanservice.getLopHocPhanByID(this.IDLopHocPhan)
                .pipe()
                .subscribe(res => {
                    if (res.result.error === true) {
                        alert(res.result.message);
                        return;
                    }
                    this.lophocphan = res.result.data[0];
                });
        }
        this.getListLopHocByIDLopHocPhan(this.IDLopHocPhan);
        this.loadScripts();
        this.createForm()
        //
        this.getDanhSachGiangVien();
        this.getDanhSachPhongHoc();
    }
    createForm() {
        this.btnedit = false;
        this.createCahoc = false;
        this.lophocForm = this.formBuilder.group({
            MaLopHoc: "",
            SoBuoiHoc: "",
            NgayKhaiGiang: "",
            NgayBeGiang: "",
            GhiChu: "",
            buoihocs: new FormArray([])
        });
    }
    editForm(lophocByID) {
        this.createCahoc = true;
        this.btnedit = true;
        this.lophocForm = this.formBuilder.group({
            MaLopHoc: lophocByID.MaLopHoc,
            SoBuoiHoc: lophocByID.TTLH.length,
            NgayKhaiGiang: formatDate(lophocByID.NgayKhaiGiang, 'yyyy-MM-dd', 'en'),
            NgayBeGiang: formatDate(lophocByID.NgayBeGiang, 'yyyy-MM-dd', 'en'),
            GhiChu: lophocByID.GhiChu,
            buoihocs: new FormArray([])
        });
        this.modifyForm(lophocByID.TTLH);
    }
    get f() { return this.lophocForm.controls; }
    get t() { return this.f.buoihocs as FormArray; }
    them() {
        this.lophocservice.themLopHoc(this.IDLopHocPhan, JSON.stringify(this.lophocForm.value, null, 4))
            .pipe()
            .subscribe(res => {
                if (res.TrangThai.error === true) {
                    alert(res.TrangThai.message);
                    return;
                }
                alert("Thêm thành công");
                this.getListLopHocByIDLopHocPhan(this.IDLopHocPhan);
                this.closebutton.nativeElement.click();
            });
    }
    sua() {
        this.lophocservice.suaLopHoc(this.lophocByID.IDLopHoc, JSON.stringify(this.lophocForm.value, null, 4))
            .pipe()
            .subscribe(res => {
                console.log(res);
                if (res.TrangThai.error === true) {
                    alert(res.TrangThai.message);
                    return;
                }
                alert("Sửa thành công");
                this.getListLopHocByIDLopHocPhan(this.IDLopHocPhan);
                this.closebutton.nativeElement.click();
            });
    }
    suaLopHoc(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id.value;
        this.getPhongHocByID(+idAttr);
        this.editForm(this.lophocByID);
    }
    getPhongHocByID(idLopHoc)
    {
        this.lophocByID = this.listLopHoc.filter(item => item.IDLopHoc === +idLopHoc)[0];
        console.log(this.lophocByID);
    }
    xoaLopHoc(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id.value;
        this.IDLopHoc=+idAttr;
    }
    xoa(){
        this.lophocservice.xoaLopHoc(this.IDLopHoc)
            .pipe()
            .subscribe(res => {
                console.log(res);
                if (res.TrangThai.error === true) {
                    alert(res.TrangThai.message);
                    return;
                }
                alert("Xóa thành công");
                this.getListLopHocByIDLopHocPhan(this.IDLopHocPhan);
                this.closebuttondelete.nativeElement.click();
            });
    }
    getListLopHocByIDLopHocPhan(IDLopHocPhan) {
        this.lophocservice.getListLopHocByID(IDLopHocPhan)
            .pipe()
            .subscribe(res => {
                this.listLopHoc = res.result.data;
            });
    }
    getDataLopHocPhan() {
        this.lophocphan = this.share.receiveDataLopHocPhan();
    }
    createCaHoc() {
        var sobuoihoc = +this.f.SoBuoiHoc.value;
        this.addForm(sobuoihoc);
        this.sobuoihocs = Array.from(Array(sobuoihoc).keys());
        this.createCahoc = true;
    }
    addForm(sobuoihoc) {
        if (this.t.length < sobuoihoc) {
            for (let i = this.t.length; i < sobuoihoc; i++) {
                this.t.push(this.formBuilder.group({
                    idTTLH:'',
                    thu: '',
                    ca: '',
                    phong: '',
                    giangvien: '',
                }));
            }
        } else {
            for (let i = this.t.length; i >= sobuoihoc; i--) {
                this.t.removeAt(i);
            }
        }
    }
    modifyForm(cahocs)
    {
        cahocs.forEach(cahoc => {
            this.t.push(this.formBuilder.group({
                idTTLH:cahoc.IDThongTinLopHoc,
                thu: cahoc.Thu,
                ca: cahoc.CaHoc,
                phong: cahoc.IDPhongHoc,
                giangvien: cahoc.IDGiangVien,
            }));
        });
    }
    getDanhSachGiangVien() {
        this.giangvienService.getListGiangVien()
            .pipe()
            .subscribe(res => {
                this.giangviens = res.result.data;
            })
    }
    getDanhSachPhongHoc() {
        this.phonghocService.getListPhongHoc()
            .pipe()
            .subscribe(res => {
                this.phonghocs = res.result.data;
            })
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
