import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AuthorServiceService } from "../app/service_auth/author-service.service";
import { ChartsModule } from "ng2-charts";
import { AppComponent } from "./app.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { AppRoutingModule } from "./app-routing.module";
import { DasboardComponent } from "./dasboard/dasboard.component";
import { LoginComponent } from "./Login/Login.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { KhoahocComponent } from "./khoahoc/khoahoc.component";
import { LophocphanComponent } from "./lophocphan/lophocphan.component";
import { LophocComponent } from "./lophoc/lophoc.component";
import { GiangvienComponent } from "./giangvien/giangvien.component";
import { PhonghocComponent } from "./phonghoc/phonghoc.component";
import { ThoikhoabieuComponent } from "./thoikhoabieu/thoikhoabieu.component";
import { ThongkeComponent } from "./thongke/thongke.component";
import { CackhoahocComponent } from "./ctthongke/cackhoahoc/cackhoahoc.component";
import { DoanhthuComponent } from "./ctthongke/doanhthu/doanhthu.component";
import { NgxPaginationModule } from "ngx-pagination";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { HocviendangkyComponent } from "./ctthongke/hocviendangky/hocviendangky.component";
import { HocvienthanhtoanComponent } from "./ctthongke/hocvienthanhtoan/hocvienthanhtoan.component";
import { DoanhthudangkyComponent } from "./ctthongke/doanhthudangky/doanhthudangky.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DasboardComponent,
    LoginComponent,
    KhoahocComponent,
    LophocphanComponent,
    LophocComponent,
    GiangvienComponent,
    PhonghocComponent,
    ThoikhoabieuComponent,
    ThongkeComponent,
    CackhoahocComponent,
    DoanhthuComponent,
    HocviendangkyComponent,
    HocvienthanhtoanComponent,
    DoanhthudangkyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
