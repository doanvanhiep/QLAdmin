import { Component, OnInit, ViewChild } from '@angular/core';
import { HocvienService } from '../service/hocvien/hocvien.service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { DynamicScriptLoaderServiceService } from '../../app/dynamic-script-loader-service.service';
import { KhoahocService } from '../service/khoahoc/khoahoc.service';
import { LophocphanService } from '../service/lophocphan/lophocphan.service';
import { LophocService } from '../service/lophoc/lophoc.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CheckrouteService } from '../service/checkroute/checkroute.service';
import { SendmailService } from '../service/sendmail/sendmail.service';
import { Login_serviceService } from '../service_auth/login_service.service';
@Component({
    selector: 'app-hocvien',
    templateUrl: './hocvien.component.html',
    styleUrls: ['./hocvien.component.css']
})
export class HocvienComponent implements OnInit {
    @ViewChild('closebutton') closebutton;
    @ViewChild('closebutton1') closebutton1;
    @ViewChild('closebuttonDelete') closebuttondelete;
    idLopHocTemp: any = -1;
    allhocvien: any = true;
    hasFile: any = false;
    fileSelected: File = null;
    idHocVien: any = -1;
    idLopHoc: any = -1;
    idLopHocPhan: any;
    idKhoaHoc: any;
    listKhoaHoc: any;
    listLopHocPhan: any;
    listLopHoc: any;
    isGiangVien: boolean = false;
    listHocVien: any;
    btnedit: any = false;
    hocvienForm: FormGroup;
    sendMailForm: FormGroup;
    HocPhiLopHoc: any;
    hocvienByID: any;
    parentRouter: any = "admin";
    trangthaithanhtoan: any = "-1";
    phuongthuc: any = "tatca";
    trangthaikichhoat: any = 'tatcakichhoat';
    mailList:any=[];
    constructor(
        private loginService: Login_serviceService,
        private sendMailService: SendmailService,
        private checkrouteService: CheckrouteService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private lophocService: LophocService,
        private lophocphanService: LophocphanService,
        private khoahocService: KhoahocService,
        private formBuilder: FormBuilder,
        private hocvienService: HocvienService,
        private dynamicScriptLoader: DynamicScriptLoaderServiceService,) {
        this.checkRoute();
        this.listHocVien = window.history.state.DSHV;
        if (!this.listHocVien) {
            if (this.isGiangVien) {
                this.router.navigate(['gv/danhsachlophoc']);
            }
            this.getListHocVien();
        }
        else {
            this.idLopHoc = +window.history.state.IDLopHoc;
            this.idLopHocPhan = +window.history.state.IDLopHocPhan;
            this.idKhoaHoc = +window.history.state.IDKhoaHoc;
        }
    }

    ngOnInit() {
        this.createSendMailForm();
        this.createForm();
        this.loadScripts();
        if (!this.isGiangVien) {
            if (this.idLopHoc != -1) {
                this.allhocvien = true;
            }
            else {
                this.allhocvien = false;
            }
        } else {
            this.allhocvien = false;
        }
    }
    createSendMailForm() {
        this.sendMailForm = this.formBuilder.group({
            TieuDe: "",
            NoiDung: "",
            File: "",
        });
        this.fileSelected = null;
        this.hasFile = false;
        document.getElementById('btnDinhKem').innerText = "Đính kèm";
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
    changeAllHocVien() {
        this.allhocvien = false;
        this.getListHocVien();
    }
    TrangThaiThanhToan(event) {
        this.trangthaithanhtoan = event.target.value;
        this.getListHocVien();
    }
    PhuongThucThanhToan(event) {
        this.phuongthuc = event.target.value;
        this.getListHocVien();
    }
    TrangThaiKichHoat(event) {
        this.trangthaikichhoat = event.target.value;
        this.getListHocVien();
    }
    changeIDKhoaHoc(IDKhoaHoc) {
        this.HocPhiLopHoc = "";
        this.f.TenLopHoc.setValue("");
        this.f.LopHoc.setValue("");
        this.listLopHoc = null;
        this.getListLopHocPhan(IDKhoaHoc);
    }
    changeIDLopHocPhan(IDLopHocPhan) {
        this.f.LopHoc.setValue("");
        this.HocPhiLopHoc = this.listLopHocPhan.filter(lhp => lhp.IDLopHocPhan == IDLopHocPhan)[0].HocPhi;
        this.getListLopHoc(IDLopHocPhan);
    }
    getHocVienByIDHocVien(IDHocVien) {
        this.hocvienByID = this.listHocVien.filter(hv => hv.IDHocVien == +IDHocVien)[0];
        this.idHocVien = this.hocvienByID.IDHocVien;
        this.idLopHoc = this.hocvienByID.IDLopHoc;
    }
    changeTrangThaiThanhToan(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id.value.split("-")[1];
        this.getHocVienByIDHocVien(idAttr);
        let TrangThaiThanhToan = target.checked ? 1 : 0;
        this.hocvienService.suaTrangThaiThanhToan(this.idHocVien, this.idLopHoc, TrangThaiThanhToan)
            .pipe()
            .subscribe(res => {
                //console.log(res);
            });
    }
    changeTrangThai(event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id.value.split("-")[1];
        this.getHocVienByIDHocVien(idAttr);
        let TrangThai = target.checked ? 1 : 0;
        this.hocvienService.suaTrangThai(this.idHocVien, this.idLopHoc, TrangThai)
            .pipe()
            .subscribe(res => {
                //console.log(res);
            });
    }
    getListHocVien() {
        this.hocvienService.getListHocVien()
            .pipe()
            .subscribe(res => {
                if (res.result.error === true) {
                    alert(res.result.message); 
                    return;
                }
                let ttkh = this.trangthaikichhoat;
                this.listHocVien = res.result.data.filter(hv => {
                    if (ttkh == "tatcakichhoat")
                        return true;
                    if (hv.TrangThai == 1 && ttkh == "kichhoat")
                        return true;
                    if (hv.TrangThai == 0 && ttkh == "chuakichhoat")
                        return true;
                    return false;
                });
                this.loadLopHoc(this.trangthaithanhtoan, this.phuongthuc);
            });
    }
    loadLopHoc(trangthaithanhtoan, phuongthuc) {
        if (!(trangthaithanhtoan === "-1" && phuongthuc === "tatca")) {
            let tempTrangThaiThanhToan = -1 === +trangthaithanhtoan ? true : false;
            let tempPhuongThuc = "tatca" === phuongthuc ? true : false;
            this.listHocVien = this.listHocVien.filter(function (hv) {
                if ((hv.TrangThaiThanhToan === +trangthaithanhtoan || tempTrangThaiThanhToan) && (hv.HinhThucThanhToan === phuongthuc || tempPhuongThuc)) {
                    return true;
                }
                else {
                    return false;
                }
            });
        }
    }
    getListHocVienByIDLopHoc() {
        this.hocvienService.getListHocVienByIDLopHoc(this.idLopHoc)
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
    onSelectedFile(event) {
        this.fileSelected = <File>event.target.files;
        if (event.target.files.length > 0) {
            let filename = "";
            for (let i = 0; i < event.target.files.length - 1; i++) {
                filename += this.fileSelected[i].name + " - ";
            }
            filename += this.fileSelected[event.target.files.length - 1].name;
            document.getElementById('nameoffile').innerText = filename;
            return;
        }
        document.getElementById('nameoffile').innerText = "Không có tệp nào được chọn";
        this.fileSelected = null;
    }
    changeDinhKem(event) {
        if (!this.hasFile) {
            this.hasFile = !this.hasFile;
            event.target.innerText = "Hủy đính kèm";
        }
        else {
            this.hasFile = !this.hasFile;
            event.target.innerText = "Đính kèm";
            this.fileSelected = null;
            document.getElementById('nameoffile').innerText = "Không có tệp nào được chọn";
        }
    }
    get fSendMail() { return this.sendMailForm.controls; }
    sendMail() {
        if(this.mailList.length<=0)
        {
            alert("Không thể gửi mail vì danh sách học viên hiện tại trống");
            this.closebutton1.nativeElement.click();
            return;
        }
        this.sendMailService.sendMail(this.fSendMail.TieuDe.value, this.fSendMail.NoiDung.value, this.fileSelected, this.mailList)
            .pipe()
            .subscribe(res => {
                if (res.result.error === true) {
                    alert(res.result.message);
                    return;
                }
                alert("Đã gửi mail thành công");
            });
        this.closebutton1.nativeElement.click();
    }

    guiMailLop() {
        this.mailList=[];
        if(this.listHocVien.length>0)
        {
            for(let i =0;i<this.listHocVien.length;i++)
            {
                this.mailList.push(this.listHocVien[i].Email);
            }
        }
        else
        {
            alert("Hiện tại danh sách học viên trống");
            this.closebutton1.nativeElement.click();
            return;
        }
        this.createSendMailForm();
        this.hasFile = false;
    }
    guiMailCaNhan(event) {
        this.createSendMailForm();
        this.hasFile = false;
        var target = event.target || event.srcElement || event.currentTarget;
        var idAttr = target.attributes.id.value;
        this.mailList=[this.listHocVien.filter(hv=>hv.IDHocVien==+idAttr)[0].Email];
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
    get f() { return this.hocvienForm.controls; }
    them() {
        if(!this.checkForm())
        {
            return;
        }
        this.hocvienService.themHocVien(this.f.LopHoc.value, this.f.TenHocVien.value,
            this.f.Email.value, this.f.SoDienThoai.value, this.HocPhiLopHoc,
            this.loginService.getTenTaiKhoan())
            .pipe()
            .subscribe(res => {
                if (res.TrangThai.error === true) {
                    alert(res.TrangThai.message);
                    return;
                }
                alert("Thêm thành công");
                if (this.idLopHoc == -1)
                    this.getListHocVien();
                else
                    this.getListHocVienByIDLopHoc();
            });
        this.closebutton.nativeElement.click();
    }
    sua() {
        if(!this.checkForm())
        {
            return;
        }
        this.hocvienService.suaHocVien(+this.idHocVien, +this.f.LopHoc.value, this.f.TenHocVien.value
            , this.f.SoDienThoai.value, this.f.Email.value, +this.idLopHocTemp)
            .pipe()
            .subscribe(res => {
                if (res.TrangThai.error === true) {
                    alert(res.TrangThai.message);
                    return;
                }
                alert("Sửa thành công");
                if (this.idLopHoc == -1)
                    this.getListHocVien();
                else
                    this.getListHocVienByIDLopHoc();
            });
        this.closebutton.nativeElement.click();
    }
    checkForm()
    {
        if(this.f.TenHocVien.value=="")
		{
			alert("Vui lòng nhập tên của học viên")
			return false;
		}
		if(this.f.SoDienThoai.value=="")
		{
			alert("Vui lòng nhập số điện thoại")
			return false;
		}
        if(!this.f.SoDienThoai.value.match(/(0)+([0-9]{9})\b/g))
        {
            alert("Vui lòng nhập số điện thoại đúng định dạng");
            return false;
        }
		if(this.f.Email.value=="")
		{
			alert("Vui lòng nhập email")
			return false;
		}
		if (!this.f.Email.value.match(/[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9A-Z](?:[a-z0-9A-Z]*[a-z0-9A-Z])?\.)+[a-z0-9A-Z](?:[a-z0-9A-Z]*[a-z0-9A-Z])?/)) {
            alert("Vui lòng nhập mail đúng định dạng");
            return false;
        }
        if(this.f.KhoaHoc.value=="")
        {
            alert("Vui lòng chọn khóa học");
            return false;
        }
        if(this.f.TenLopHoc.value=="")
        {
            alert("Vui lòng chọn tên lớp học");
            return false;
        }
        if(this.f.LopHoc.value=="")
        {
            alert("Vui lòng chọn lớp học");
            return false;
        }
		return true;
    }
    xoa() {
        this.hocvienService.xoaHocVien(this.idHocVien, this.idLopHocTemp)
            .pipe()
            .subscribe(res => {
                if (res.TrangThai.error === true) {
                    alert(res.TrangThai.message);
                    return;
                }
                alert("Xóa thành công");
                if (this.idLopHoc == -1)
                    this.getListHocVien();
                else
                    this.getListHocVienByIDLopHoc();
            });
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
        this.idHocVien = +idAttr;
        this.idLopHocTemp = this.listHocVien.filter(hv => hv.IDHocVien == this.idHocVien)[0].IDLopHoc;
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
        this.idHocVien = +idAttr;
        this.idLopHocTemp = this.listHocVien.filter(hv => hv.IDHocVien == this.idHocVien)[0].IDLopHoc;
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
