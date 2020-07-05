import { Component, OnInit, ViewChild } from '@angular/core';
import { GiangvienService } from '../service/giangvien/giangvien.service';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { UploadimageService } from '../service/upload/uploadimage.service';
import { DynamicScriptLoaderServiceService } from '../../app/dynamic-script-loader-service.service';
import { CheckrouteService } from '../service/checkroute/checkroute.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
	selector: 'app-giangvien',
	templateUrl: './giangvien.component.html',
	styleUrls: ['./giangvien.component.css']
})
export class GiangvienComponent implements OnInit {
	@ViewChild('closebutton') closebutton;
	@ViewChild('closebuttonDelete') closebuttondelete;
	listGiangVien: any;
	btnedit: any = false;
	giangvienForm: FormGroup;
	giangvienByID: any;
	fileSelected: File = null;
	IDGiangVien: any;
	parentRouter: any;
	trangthaikichhoat: any = -1;
	constructor(
		private spinner: NgxSpinnerService,
		private checkrouteService: CheckrouteService,
		private router: Router,
		private formBuilder: FormBuilder,
		private dynamicScriptLoader: DynamicScriptLoaderServiceService,
		private giangvienService: GiangvienService,
		private uploadimage: UploadimageService
	) {
		this.parentRouter = this.checkrouteService.getParentRouter();
		if (this.parentRouter != "admin")
			this.router.navigate([this.parentRouter]);
	}

	ngOnInit() {
		this.loadScripts();
		this.createForm();
		this.getListGiangVien();
	}
	createForm() {
		this.btnedit = false;
		this.giangvienForm = this.formBuilder.group({
			HoTen: "",
			DiaChi: "",
			SoDienThoai: "",
			Email: "",
			MoTa: "",
			HinhAnh: "",
			GhiChu: ""
		});
		document.getElementById('nameoffile').innerHTML = "Không có tệp nào được chọn";
	}
	editForm(giangvienByID) {
		this.btnedit = true;
		this.giangvienForm = this.formBuilder.group({
			HoTen: giangvienByID.HoTen,
			DiaChi: giangvienByID.DiaChi,
			SoDienThoai: giangvienByID.SoDienThoai,
			Email: giangvienByID.Email,
			MoTa: giangvienByID.MoTa,
			HinhAnh: giangvienByID.HinhAnh,
			GhiChu: giangvienByID.GhiChu
		});
		document.getElementById('nameoffile').innerHTML = giangvienByID.HinhAnh;
	}
	get f() { return this.giangvienForm.controls; }
	getListGiangVien() {
		this.giangvienService.getListAllGiangVien()
			.pipe()
			.subscribe(res => {
				if (res.result.error === true) {
					alert(res.result.message);
					return;
				}
				if (this.trangthaikichhoat == -1) {
					this.listGiangVien = res.result.data;
				}
				else {
					let TrangThai = this.trangthaikichhoat;
					this.listGiangVien = res.result.data.filter(gv => gv.TrangThai == TrangThai);
				}
			});
	}
	checkForm() 
	{
		if(this.f.HoTen.value=="")
		{
			alert("Vui lòng nhập họ và tên của giảng viên")
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
		return true;
	}
	checkFileHinh()
	{
		if(this.fileSelected==null)
		{
			alert("Vui lòng chọn hình ảnh")
			return false;
		}
		return true;
	}
	them() {
		if(!this.checkForm() || !this.checkFileHinh())
		{
			return;
		}
        this.spinner.show();
		this.uploadimage.uploadimage(this.fileSelected)
			.pipe()
			.subscribe(res => {
				this.giangvienService.themGiangVien(
					this.f.HoTen.value, this.f.DiaChi.value,
					this.f.SoDienThoai.value, this.f.Email.value,
					this.f.MoTa.value, res.id, this.f.GhiChu.value)
					.pipe()
					.subscribe(res => {
						this.spinner.hide();
						if (res.TrangThai.error === true) {
							alert(res.TrangThai.message);
							return;
						}
						this.getListGiangVien();
					});
				this.closebutton.nativeElement.click();
			});
	}
	sua() {
		if(!this.checkForm())
		{
			return;
		}
        this.spinner.show();
		var idImg = document.getElementById('nameoffile').textContent;
		if (idImg === this.giangvienByID.HinhAnh) {
			this.giangvienService.suaGiangVien(this.giangvienByID.IDGiangVien,
				this.f.HoTen.value, this.f.DiaChi.value,
				this.f.SoDienThoai.value, this.f.Email.value,
				this.f.MoTa.value, idImg, this.f.GhiChu.value)
				.pipe()
				.subscribe(res => {
					this.spinner.hide();
					if (res.TrangThai.error === true) {
						alert(res.TrangThai.message);
						return;
					}
					this.getListGiangVien();
					this.closebutton.nativeElement.click();
				});
		}
		else {
			this.uploadimage.uploadimage(this.fileSelected)
				.pipe()
				.subscribe(res => {
					this.giangvienService.suaGiangVien(this.giangvienByID.IDGiangVien,
						this.f.HoTen.value, this.f.DiaChi.value,
						this.f.SoDienThoai.value, this.f.Email.value,
						this.f.MoTa.value, res.id, this.f.GhiChu.value)
						.pipe()
						.subscribe(res => {
							this.spinner.hide();
							if (res.TrangThai.error === true) {
								alert(res.TrangThai.message);
								return;
							}
							this.getListGiangVien();
							this.closebutton.nativeElement.click();
						});
				});
		}
	}
	xoa() {
		this.giangvienService.xoaGiangVien(this.IDGiangVien)
			.pipe()
			.subscribe(res => {
				if (res.TrangThai.error === true) {
					alert(res.TrangThai.message);
					return;
				}
				alert("Xóa thành công");
				this.getListGiangVien();
			})
		this.closebuttondelete.nativeElement.click();
	}
	xoaGiangVien(event) {
		var target = event.target || event.srcElement || event.currentTarget;
		var idAttr = target.attributes.id.value;
		this.IDGiangVien = +idAttr;
	}
	suaGiangVien(event) {
		var target = event.target || event.srcElement || event.currentTarget;
		var idAttr = target.attributes.id.value;
		this.getGiangVienByID(+idAttr);
		this.editForm(this.giangvienByID);
	}
	getGiangVienByID(idGiangVien) {
		this.giangvienByID = this.listGiangVien.filter(item => item.IDGiangVien === +idGiangVien)[0];
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
	changeTrangThai(event) {
		var target = event.target || event.srcElement || event.currentTarget;
		var idAttr = target.attributes.id.value.split("-")[1];
		this.getGiangVienByID(idAttr);
		let TrangThai = target.checked ? 1 : 0;
		this.giangvienService.suaTrangThaiGiangVien(+idAttr, TrangThai)
		    .pipe()
		    .subscribe(res => {
		        //console.log(res);
		    });
	}
	TrangThaiKichHoat(event) {
		this.trangthaikichhoat = event.target.value;
		this.getListGiangVien();
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
