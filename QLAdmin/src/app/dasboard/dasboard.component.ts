import { Component, OnInit } from "@angular/core";
// Service
import { DynamicScriptLoaderServiceService } from "../../app/dynamic-script-loader-service.service";
import { DasboardService } from "../service/dasboard/dasboard.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: "app-dasboard",
  templateUrl: "./dasboard.component.html",
  styleUrls: ["./dasboard.component.css"],
})
export class DasboardComponent implements OnInit {
  constructor(
    private dynamicScriptLoader: DynamicScriptLoaderServiceService,
    private dasboardService: DasboardService
  ) {
    TrangThai: new FormControl(false);
  }

  ngOnInit() {
    // Just call your load scripts function with scripts you want to load
    this.loadScripts();
  }
<<<<<<< Updated upstream
=======
  createSendMailForm() {
    this.sendMailForm = this.formBuilder.group({
      TieuDe: "",
      NoiDung: "",
      File: "",
    });
    this.fileSelected = null;
    this.hasFile = false;
    document.getElementById("btnDinhKem").innerText = "Đính kèm";
  }
  getListLienHe() {
    this.dasboardService
      .getListLienHe()
      .pipe()
      .subscribe((res) => {
        if (this.trangthaikichhoat == -1) {
          this.listLienHe = res.result.data;
        } else {
          let TrangThai = this.trangthaikichhoat;
          this.listLienHe = res.result.data.filter(
            (lh) => lh.TrangThai == TrangThai
          );
        }
      });
  }
  changeTrangThai(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id.value.split("-")[1];
    let TrangThai = target.checked ? 1 : 0;
    let NguoiSua = this.loginService.getTenTaiKhoan();
    this.dasboardService
      .suaTrangThaiLienHe(+idAttr, TrangThai, NguoiSua)
      .pipe()
      .subscribe((res) => {
        //console.log(res);
      });
  }
  TrangThaiKichHoat(event) {
    this.trangthaikichhoat = event.target.value;
    this.getListLienHe();
  }
  SendMail(userMail) {
    this.mailList = [userMail];
    this.createSendMailForm();
  }
  get fSendMail() {
    return this.sendMailForm.controls;
  }
  sendMail() {
    let TieuDe = this.fSendMail.TieuDe.value.trim();
    let NoiDung = this.fSendMail.NoiDung.value.trim();
    if (!TieuDe) {
      this.toast.error("Vui lòng nhập tiêu đề!", "Thông báo");
      return;
    }
    if (!NoiDung) {
      this.toast.error("Vui lòng nhập nội dung!", "Thông báo");
      return;
    }
    this.sendMailService
      .sendMail(
        this.fSendMail.TieuDe.value,
        this.fSendMail.NoiDung.value,
        this.fileSelected,
        this.mailList
      )
      .pipe()
      .subscribe((res) => {
        if (res.result.error === true) {
          alert(res.result.message);
          return;
        }
        this.toast.success("Đã gửi mail thành công!", "Thông báo");
      });
    this.closebutton1.nativeElement.click();
  }
  onSelectedFile(event) {
    this.fileSelected = <File>event.target.files;
    if (event.target.files.length > 0) {
      let filename = "";
      for (let i = 0; i < event.target.files.length - 1; i++) {
        filename += this.fileSelected[i].name + " - ";
      }
      filename += this.fileSelected[event.target.files.length - 1].name;
      document.getElementById("nameoffile").innerText = filename;
      return;
    }
    document.getElementById("nameoffile").innerText =
      "Không có tệp nào được chọn";
    this.fileSelected = null;
  }
  changeDinhKem(event) {
    if (!this.hasFile) {
      this.hasFile = !this.hasFile;
      event.target.innerText = "Hủy đính kèm";
    } else {
      this.hasFile = !this.hasFile;
      event.target.innerText = "Đính kèm";
      this.fileSelected = null;
      document.getElementById("nameoffile").innerText =
        "Không có tệp nào được chọn";
    }
  }
  checkRoute() {
    this.parentRouter = this.checkrouteService.getParentRouter();
    this.activatedRoute.parent.url.subscribe((urlPath) => {
      const url = urlPath[urlPath.length - 1].path;
      if (this.parentRouter != url) this.router.navigate([this.parentRouter]);
    });
  }
>>>>>>> Stashed changes
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
  // checkValue(a: any, n: number) {
  //   this.dasboardService.test()
  //   .pipe()
  //   .subscribe(data=>{
  //     console.log(data);
  //   });
  //   console.log(a.target.id, n);
  //   console.log(a, n);
  // }

  checkValue(values: any) {
    alert(values.currentTarget.checked);
  }
}
