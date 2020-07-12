import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicScriptLoaderServiceService } from "../../app/dynamic-script-loader-service.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GiangvienService } from '../service/giangvien/giangvien.service'
import { DanhsachlophocService } from '../service/danhsachlophoc/danhsachlophoc.service';
import { CheckrouteService } from "../service/checkroute/checkroute.service";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { BaonghiService } from "../service/baonghi/baonghi.service";
@Component({
  selector: 'app-baonghi',
  templateUrl: './baonghi.component.html',
  styleUrls: ['./baonghi.component.css']
})
export class BaonghiComponent implements OnInit {
  btnedit: any = false;
  trangthaikichhoat: any = -1;
  baonghiForm: FormGroup;
  selectedLopHoc: any = -1;
  selectedGiangVien: any = -1;
  parentRouter: any;
  listBaoNghi: any;
  IDBaoNghi:any=-1;
  baonghiByID:any;
  //
  listGiangVien: any;
  listLopHoc: any;
  listBuoi: any;
  @ViewChild("closebutton") closebutton;
  @ViewChild("closebuttonDelete") closebuttondelete;
  constructor(
    private baonghiSerice: BaonghiService,
    private checkrouteService: CheckrouteService,
    private dslhService: DanhsachlophocService,
    private giangvienService: GiangvienService,
    private dynamicScriptLoader: DynamicScriptLoaderServiceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastrService,
  ) {
    this.parentRouter = this.checkrouteService.getParentRouter();
    if (this.parentRouter != "admin") this.router.navigate([this.parentRouter]);
  }

  ngOnInit() {
    this.getListBaoNghi();
    this.getListGiangVienForm();
    this.createForm();
    this.loadScripts();
  }
  createForm() {
    this.btnedit = false;
    this.baonghiForm = this.formBuilder.group({
      HoTen: "",
      NgayNghi: "",
      Lop: "",
      Buoi: "",
      GhiChu: "",
    });
  }
  editForm(baonghiByID) {
    console.log(baonghiByID);
    this.btnedit = true;
    this.baonghiForm = this.formBuilder.group({
      HoTen: baonghiByID.IDGiangVien,
      NgayNghi: baonghiByID.NgayNghi,
      Lop: baonghiByID.IDLopHoc,
      Buoi: baonghiByID.IDThongTinLopHoc,
      GhiChu: baonghiByID.GhiChu,
    });
  }
  get f() {
    return this.baonghiForm.controls;
  }
  them() {
    console.log(this.listBuoi)
    let IDPhongHoc=this.listBuoi.filter(b=>b.IDThongTinLopHoc==this.f.Buoi.value)[0].IDPhongHoc;
    this.baonghiSerice.themBaoNghi(this.f.HoTen.value,this.f.Lop.value,IDPhongHoc,
      this.f.Buoi.value,this.f.NgayNghi.value,this.f.GhiChu.value)
      .pipe()
      .subscribe(res=>{
        if (res.result.error === true) {
          alert(res.result.message);
          return;
        }
        this.toast.success("Đã thêm thành công");
        this.closebutton.nativeElement.click();
        this.getListBaoNghi();
      })
  }
  sua() {

  }
  xoa() {
    this.baonghiSerice.xoaBaoNghi(this.IDBaoNghi)
    .pipe()
    .subscribe(res=>{
      if (res.result.error === true) {
        alert(res.result.message);
        return;
      }
      this.toast.success("Đã xóa thành công");
      this.getListBaoNghi();
      this.closebuttondelete.nativeElement.click();
    })
  }
  suaBaoNghi(event)
  {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id.value;
    this.getBaoNghiByID(idAttr);
    this.getListLopHocForm(this.baonghiByID.IDGiangVien);
    this.editForm(this.baonghiByID);
  }
  xoaBaoNghi(event)
  {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id.value;
    this.IDBaoNghi = +idAttr;
  }
  ThemBaoNghi() {
    this.createForm();
  }
  changeIDLopHocForm(IDLopHoc) {
    this.listBuoi=null;
    this.f.Buoi.setValue("");
    this.listBuoi = this.listLopHoc.filter(lh => lh.IDLopHoc == IDLopHoc)[0].TTLH;
  }
  changeIDGiangVienForm(IDGiangVien) {
    this.listLopHoc = null;
    this.listBuoi=null;
    this.f.Lop.setValue("");
    this.f.Buoi.setValue("");
    this.getListLopHocForm(IDGiangVien);
  }
  getListLopHocForm(IDGiangVien) {
    this.dslhService.danhsachlophocbyidgiangvien(IDGiangVien)
      .pipe()
      .subscribe(res => {
        if (res.result.error === true) {
          alert(res.result.message);
          return;
        }
        this.listLopHoc = res.result.data.filter(lh=>lh.TrangThai==1);
      });
  }

  changeIDGiangVien(IDGiangVien) {
    // alert(IDGiangVien)
  }
  changeIDLopHoc(IDLopHoc) {

  }
  getListGiangVienForm() {
    this.listGiangVien = null;
    this.giangvienService.getListGiangVien()
      .pipe()
      .subscribe(res => {
        if (res.result.error === true) {
          alert(res.result.message);
          return;
        }
        this.listGiangVien = res.result.data.filter(gv=>gv.TrangThai==1);
      });
  }
  getListBaoNghi() {
    this.listBaoNghi = null;
    this.baonghiSerice.getListBaoNghi()
      .pipe()
      .subscribe(res => {
        if (res.result.error) {
          alert(res.result.message);
        }
        this.listBaoNghi = res.result.data;
        console.log(this.listBaoNghi)
      });
  }
  TrangThaiKichHoat(event) {
    this.trangthaikichhoat = event.target.value;
    //this.getListGiangVien();
  }
  changeTrangThai(event){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id.value.split("-")[1];
    this.getBaoNghiByID(idAttr);
    let TrangThai = target.checked ? 1 : 0;
    this.baonghiSerice
      .suaTrangThaiBaoNghi(+idAttr, TrangThai)
      .pipe()
      .subscribe((res) => {
        //console.log(res);
      });
  }
  getBaoNghiByID(idBaoNghi) {
    this.baonghiByID = this.listBaoNghi.filter(
      (item) => item.IDBaoNghi === +idBaoNghi
    )[0];
  }
  //load script
  private loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader
      .load("jquerydataTablesminjs")
      .then((data) => {
        // You can load multiple scripts by just providing the key as argument into load method of the service
        this.dynamicScriptLoader
          .load("dataTablesbootstrap4minjs")
          .then((data) => {
            // You can load multiple scripts by just providing the key as argument into load method of the service
            this.dynamicScriptLoader
              .load("datatablesdemojs")
              .then((data) => {
                this.dynamicScriptLoader
                  .load("sbadmin2minjs")
                  .then((data) => { })
                  .catch((error) => console.log(error));
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }
}
