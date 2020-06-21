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
    selectedLopHocPhan:any=-1;
    listLopHocPhan:any=[];
    btnedit: any = false;
    lophocForm: FormGroup;
    lophocphan: any;
    IDLopHocPhan: any=-1;
    listLopHoc: any;
    createCahoc: any = false;
    sobuoihocs: any;
    thus: { [key: string]: string } = { "Thứ 2": 'Thứ 2', 'Thứ 3': 'Thứ 3', 'Thứ 4': 'Thứ 4', 'Thứ 5': 'Thứ 5', 'Thứ 6': 'Thứ 6', 'Thứ 7': 'Thứ 7' };
    cas: { [key: string]: string } = { 'Ca 1': 'Ca 1', 'Ca 2': 'Ca 2', 'Ca 3': 'Ca 3', 'Ca 4': 'Ca 4', 'Ca 5': 'Ca 5' };
    giangviens: any;
    phonghocs: any;
    lophocByID: any;
    IDLopHoc: any;
    trangthaikichhoat: any = -1;
    constructor(
        private phonghocService: PhonghocService,
        private giangvienService: GiangvienService,
        private lophocservice: LophocService,
        private lophocphanservice: LophocphanService,
        private share: SharedataService,
        private router: Router,
        private dynamicScriptLoader: DynamicScriptLoaderServiceService,
        private formBuilder: FormBuilder,) { }

    ngOnInit() {
        this.getDataLopHocPhan();
        if (this.lophocphan != null) {
            this.IDLopHocPhan=this.lophocphan.IDLopHocPhan;
            this.selectedLopHocPhan=this.IDLopHocPhan;
        }
        this.getListLopHocPhan();
        if(this.IDLopHocPhan!=-1)
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
            SoBuoiHoc: { value: 0, disabled: true },
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
        if (this.f.SoBuoiHoc.value <= 0) {
            alert("Vui lòng thêm ca học. Ít nhất là 1 ca");
            return;
        }
        if (!this.checkThongTinCaHoc()) {
            return;
        }
        if (this.f.SoBuoiHoc.value > 0) {
            var tempCaHoc = this.t.at(this.f.SoBuoiHoc.value - 1);
            this.lophocservice.checkPhongHocGiangVien(this.f.NgayKhaiGiang.value, this.f.NgayBeGiang.value,
                +tempCaHoc.value.phong, +tempCaHoc.value.giangvien, tempCaHoc.value.ca, tempCaHoc.value.thu)
                .pipe()
                .subscribe(res => {
                    if (res.result.error) {
                        alert(res.result.message);
                        return;
                    }
                    else {
                        if (res.result.statusGV) {
                            alert("Hiện tại với " + tempCaHoc.value.thu + " và " + tempCaHoc.value.ca + " thì giảng viên đã dạy lớp khác.")
                            return;
                        }
                        if (res.result.statusPH) {
                            alert("Hiện tại với " + tempCaHoc.value.thu + " và " + tempCaHoc.value.ca + " thì phòng học có lớp khác.")
                            return;
                        }
                    }

                    this.t.enable();
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
                });
        }
    }
    sua() {
        this.lophocservice.suaLopHoc(this.lophocByID.IDLopHoc, JSON.stringify(this.lophocForm.value, null, 4))
            .pipe()
            .subscribe(res => {
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
    getPhongHocByID(idLopHoc) {
        this.lophocByID = this.listLopHoc.filter(item => item.IDLopHoc === +idLopHoc)[0];
    }
    xoaLopHoc(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id.value;
        this.IDLopHoc = +idAttr;
    }
    xoa() {
        this.lophocservice.xoaLopHoc(this.IDLopHoc)
            .pipe()
            .subscribe(res => {
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
                if(this.trangthaikichhoat==-1)
                {
                    this.listLopHoc = res.result.data;
                }
                else
                {
                    let TrangThai=this.trangthaikichhoat;
                    this.listLopHoc = res.result.data.filter(lh=>lh.TrangThai==TrangThai);
                }
            });
    }
    getListLopHocPhan()
    {
        this.lophocphanservice.getAllLopHocPhanKichHoat()
        .pipe()
        .subscribe(res=>{
            this.listLopHocPhan = res.result.data;
            if(this.IDLopHocPhan==-1 && this.listLopHocPhan.length>0)
            {
                this.lophocphan=this.listLopHocPhan[0];
                this.IDLopHocPhan=this.lophocphan.IDLopHocPhan;
                this.selectedLopHocPhan=this.IDLopHocPhan;
                this.changeIDLopHocPhan(this.IDLopHocPhan);
            }
        });
    }
    getDataLopHocPhan() {
        this.lophocphan = this.share.receiveDataLopHocPhan();
    }
    removeCaHoc(index) {
        this.t.removeAt(index);
        this.f.SoBuoiHoc.setValue(+this.f.SoBuoiHoc.value - 1);
        if (+this.f.SoBuoiHoc.value === index && index != 0) {
            this.t.at(index - 1).enable();
        }
    }
    isFullThongTinCaHoc(FormAt) {
        if (!FormAt.value.thu || !FormAt.value.ca || !FormAt.value.phong || !FormAt.value.giangvien) {
            alert("Vui lòng điền đầy đủ thông tin cho buổi học");
            return false;
        }
        return true;
    }
    isTrungCaHocVaThu(FormAt) {
        for (let i = 0; i < this.f.SoBuoiHoc.value - 1; i++) {
            var tempCaHoc = this.t.at(i)
            if (tempCaHoc.value.ca == FormAt.value.ca && tempCaHoc.value.thu == FormAt.value.thu) {
                alert("Vui lòng kiểm tra lại. Một lớp không thể có 2 ca học trùng nhau!");
                return true;
            }
        }
        return false;
    }
    isFullNgayKhaiGiangNgayBeGiang() {
        if (this.f.NgayKhaiGiang.value == "") {
            alert("Vui lòng nhập ngày khai giảng");
            return false;
        }
        if (this.f.NgayBeGiang.value == "") {
            alert("Vui lòng nhập ngày bế giảng");
            return false;
        }
        if (this.f.NgayKhaiGiang.value >= this.f.NgayBeGiang.value) {
            alert("Ngày khai giảng không thể sau ngày bế giảng hoặc trùng ngày bế giảng");
            return false;
        }
        return true;
    }
    checkThongTinCaHoc() {
        if (this.f.SoBuoiHoc.value > 0) {
            var tempCaHoc = this.t.at(this.f.SoBuoiHoc.value - 1);
            if (!this.isFullThongTinCaHoc(tempCaHoc)) {
                return false;
            }
            if (this.isTrungCaHocVaThu(tempCaHoc)) {
                return false;
            }
            if (!this.isFullNgayKhaiGiangNgayBeGiang()) {
                return false;
            }
        }
        return true;
    }
    createNewCaHoc() {
        if (!this.checkThongTinCaHoc()) {
            return;
        }
        if (this.f.SoBuoiHoc.value > 0) {
            var tempCaHoc = this.t.at(this.f.SoBuoiHoc.value - 1);
            this.lophocservice.checkPhongHocGiangVien(this.f.NgayKhaiGiang.value, this.f.NgayBeGiang.value,
                +tempCaHoc.value.phong, +tempCaHoc.value.giangvien, tempCaHoc.value.ca, tempCaHoc.value.thu)
                .pipe()
                .subscribe(res => {
                    if (res.result.error) {
                        alert(res.result.message);
                        return;
                    }
                    else {
                        if (res.result.statusGV) {
                            alert("Hiện tại với " + tempCaHoc.value.thu + " và " + tempCaHoc.value.ca + " thì giảng viên đã dạy lớp khác.")
                            return;
                        }
                        if (res.result.statusPH) {
                            alert("Hiện tại với " + tempCaHoc.value.thu + " và " + tempCaHoc.value.ca + " thì phòng học có lớp khác.")
                            return;
                        }
                    }
                    this.f.SoBuoiHoc.setValue(+this.f.SoBuoiHoc.value + 1);
                    var sobuoihoc = +this.f.SoBuoiHoc.value;
                    this.addForm(sobuoihoc);
                    this.sobuoihocs = Array.from(Array(sobuoihoc).keys());
                    this.createCahoc = true;
                });
        }
        else {
            this.f.SoBuoiHoc.setValue(+this.f.SoBuoiHoc.value + 1);
            var sobuoihoc = +this.f.SoBuoiHoc.value;
            this.addForm(sobuoihoc);
            this.sobuoihocs = Array.from(Array(sobuoihoc).keys());
            this.createCahoc = true;
        }
    }
    addForm(sobuoihoc) {
        if (this.t.length < sobuoihoc) {
            for (let i = this.t.length; i < sobuoihoc; i++) {
                this.t.push(this.formBuilder.group({
                    idTTLH: '',
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
        if (sobuoihoc > 1) {
            this.t.at(sobuoihoc - 2).disable();
        }
    }
    modifyForm(cahocs) {
        cahocs.forEach(cahoc => {
            this.t.push(this.formBuilder.group({
                idTTLH: cahoc.IDThongTinLopHoc,
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
    TrangThaiKichHoat(event) {
        this.trangthaikichhoat = event.target.value;
        this.getListLopHocByIDLopHocPhan(this.IDLopHocPhan);
    }
    changeTrangThai(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id.value.split("-")[1];
        let TrangThai = target.checked ? 1 : 0;
        this.lophocservice.suaTrangThaiLopHoc(+idAttr,TrangThai)
        .pipe()
        .subscribe(res => {
                //console.log(res);
        });
    }
    changeIDLopHocPhan(IDLopHocPhan)
    {
        this.IDLopHocPhan=IDLopHocPhan;
        this.getListLopHocByIDLopHocPhan(this.IDLopHocPhan);
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
