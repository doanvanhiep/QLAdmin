import { Component, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { DynamicScriptLoaderServiceService } from "../../app/dynamic-script-loader-service.service";
import { PhonghocService } from "../service/phonghoc/phonghoc.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-phonghoc",
  templateUrl: "./phonghoc.component.html",
  styleUrls: ["./phonghoc.component.css"],
})
export class PhonghocComponent implements OnInit {
  @ViewChild("closebutton") closebutton;
  @ViewChild("closebuttonDelete") closebuttondelete;
  btnedit: any = false;
  phonghocForm: FormGroup;
  listPhongHoc: any;
  phonghocByID: any;
  IDPhongHoc: any;
  constructor(
    private formBuilder: FormBuilder,
    private dynamicScriptLoader: DynamicScriptLoaderServiceService,
    private phonghocService: PhonghocService,
    private toast: ToastrService
  ) {}

  ngOnInit() {
    this.loadScripts();
    this.createForm();
    this.getListPhongHoc();
  }
  createForm() {
    this.btnedit = false;
    this.phonghocForm = this.formBuilder.group({
      TenPhong: new FormControl("", Validators.required),
      SoChoNgoi: new FormControl("", Validators.required),
      GhiChu: "",
      TrangThai: new FormControl("false"),
    });
  }
  editForm(phonghocByID) {
    this.btnedit = true;
    this.phonghocForm = this.formBuilder.group({
      TenPhong: phonghocByID.TenPhong,
      SoChoNgoi: phonghocByID.SoChoNgoi,
      GhiChu: phonghocByID.GhiChu,
    });
  }
  get f() {
    return this.phonghocForm.controls;
  }
  getListPhongHoc() {
    this.phonghocService
      .getListPhongHoc()
      .pipe()
      .subscribe((res) => {
        if (res.result.error === true) {
          alert(res.result.message);
          return;
        }
        this.listPhongHoc = res.result.data;
      });
  }
  them() {
    this.phonghocService
      .themPhongHoc(
        this.f.TenPhong.value,
        this.f.SoChoNgoi.value,
        this.f.GhiChu.value
      )
      .pipe()
      .subscribe((res) => {
        if (res.TrangThai.error === true) {
          alert(res.TrangThai.message);
          return;
        }
        this.toast.success("some messenge", "title", {
          timeOut: 3000,
          progressBar: false,
        });

        this.getListPhongHoc();
      });
    this.closebutton.nativeElement.click();
  }
  sua() {
    this.phonghocService
      .suaPhongHoc(
        this.phonghocByID.IDPhongHoc,
        this.f.TenPhong.value,
        this.f.SoChoNgoi.value,
        this.f.GhiChu.value
      )
      .pipe()
      .subscribe((res) => {
        if (res.TrangThai.error === true) {
          alert(res.TrangThai.message);
          return;
        }
        alert("Sửa thành công");
        this.getListPhongHoc();
      });
    this.closebutton.nativeElement.click();
  }
  xoa() {
    this.phonghocService
      .xoaPhongHoc(this.IDPhongHoc)
      .pipe()
      .subscribe((res) => {
        if (res.TrangThai.error === true) {
          alert(res.TrangThai.message);
          return;
        }
        this.toast.success("Đã xóa", "Thông báo", {
          timeOut: 3000,
          progressBar: false,
        });
        this.getListPhongHoc();
      });
    this.closebuttondelete.nativeElement.click();
  }
  suaPhongHoc(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id.value;
    this.getPhongHocByID(+idAttr);
    this.editForm(this.phonghocByID);
  }
  getPhongHocByID(idPhongHoc) {
    this.phonghocByID = this.listPhongHoc.filter(
      (item) => item.IDPhongHoc === +idPhongHoc
    )[0];
  }
  xoaPhongHoc(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id.value;
    this.IDPhongHoc = +idAttr;
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
                  .then((data) => {})
                  .catch((error) => console.log(error));
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }
  FieldsChange(values: any) {
    console.log(values.currentTarget.checked);
  }
  checkValue(value: any) {
    alert(value.currentTarget.checked);
  }
}
