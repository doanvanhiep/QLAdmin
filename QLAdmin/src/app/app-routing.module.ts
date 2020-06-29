import { NgModule } from "@angular/core";
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { NavigationComponent } from "./navigation/navigation.component";
import { DasboardComponent } from "./dasboard/dasboard.component";
import { LoginComponent } from "./Login/Login.component";
import { AuthGuardService } from "./auth-guard.service";
import { KhoahocComponent } from "./khoahoc/khoahoc.component";
import { LophocphanComponent } from "./lophocphan/lophocphan.component";
import { LophocComponent } from "./lophoc/lophoc.component";
import { GiangvienComponent } from "./giangvien/giangvien.component";
import { PhonghocComponent } from "./phonghoc/phonghoc.component";
import { ThoikhoabieuComponent } from "./thoikhoabieu/thoikhoabieu.component";
import { ThongkeComponent } from "./thongke/thongke.component";
import { CackhoahocComponent } from "./ctthongke/cackhoahoc/cackhoahoc.component";
import { DoanhthuComponent } from "./ctthongke/doanhthu/doanhthu.component";
import { DoanhthudangkyComponent } from "./ctthongke/doanhthudangky/doanhthudangky.component";
import { HocvienthanhtoanComponent } from "./ctthongke/hocvienthanhtoan/hocvienthanhtoan.component";
import { HocviendangkyComponent } from "./ctthongke/hocviendangky/hocviendangky.component";
const routes: Routes = [
  { path: "", redirectTo: "dangnhap", pathMatch: "full" },
  { path: "dangnhap", component: LoginComponent },
  {
    path: "nv",
    component: NavigationComponent,
    children: [
      {
        path: "",
        component: DasboardComponent,
      },
      {
        path: "khoahoc",
        component: KhoahocComponent,
      },
      {
        path: "lophocphan",
        component: LophocphanComponent,
      },
      {
        path: "lophoc",
        component: LophocComponent,
      },
      {
        path: "giangvien",
        component: GiangvienComponent,
      },
      {
        path: "phonghoc",
        component: PhonghocComponent,
      },
      {
        path: "thoikhoabieu",
        component: ThoikhoabieuComponent,
      },
      {
        path: "thongke",
        component: ThongkeComponent,
      },
      {
        path: "thongke/doanhthudangky",
        component: DoanhthudangkyComponent,
      },
      {
        path: "thongke/hocvienthanhtoan",
        component: HocvienthanhtoanComponent,
      },
      {
        path: "thongke/hocviendangky",
        component: HocviendangkyComponent,
      },
    ],
    canActivate: [AuthGuardService],
  },
];
@NgModule({
  // declarations: [],
  imports: [
    // CommonModule
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
