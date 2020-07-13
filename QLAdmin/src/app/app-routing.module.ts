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
import { DanhsachlophocComponent } from "./danhsachlophoc/danhsachlophoc.component";
import { HocvienComponent } from "./hocvien/hocvien.component";
import { QuantrivienComponent } from "./quantrivien/quantrivien.component";
import { NotFoundComponentComponent } from "./NotFoundComponent/NotFoundComponent.component";
import { ThongtincanhanComponent } from "./thongtincanhan/thongtincanhan.component";
import { ThongkeComponent } from "./thongke/thongke.component";
import { BaonghiComponent } from "./baonghi/baonghi.component";
import { BaobuComponent } from "./baobu/baobu.component";
const routes: Routes = [
  { path: "", redirectTo: "dangnhap", pathMatch: "full" },
  { path: "dangnhap", component: LoginComponent },
  {
    path: "admin",
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
        path: "danhsachlophoc",
        component: DanhsachlophocComponent,
      },
      {
        path: "hocvien",
        component: HocvienComponent,
      },
      {
        path: "quantrivien",
        component: QuantrivienComponent,
      },
      {
        path: "thongtincanhan",
        component: ThongtincanhanComponent,
      },
      {
        path: "thongke",
        component: ThongkeComponent,
      },
      {
        path: "baonghi",
        component: BaonghiComponent,
      },
      {
        path: "baobu",
        component: BaobuComponent,
      },
    ],
    canActivate: [AuthGuardService],
  },
  {
    path: "gv",
    component: NavigationComponent,
    children: [
      {
        path: "",
        redirectTo: "thoikhoabieu",
        pathMatch: "full",
      },
      {
        path: "thoikhoabieu",
        component: ThoikhoabieuComponent,
      },
      {
        path: "danhsachlophoc",
        component: DanhsachlophocComponent,
      },
      {
        path: "hocvien",
        component: HocvienComponent,
      },
      {
        path: "thongtincanhan",
        component: ThongtincanhanComponent,
      },
    ],
    canActivate: [AuthGuardService],
  },
  {
    path: "nv",
    component: NavigationComponent,
    children: [
      {
        path: "",
        component: DasboardComponent,
      },
      {
        path: "danhsachlophoc",
        component: DanhsachlophocComponent,
      },
      {
        path: "hocvien",
        component: HocvienComponent,
      },
      {
        path: "thongtincanhan",
        component: ThongtincanhanComponent,
      },
    ],
    canActivate: [AuthGuardService],
  },
  { path: "404", component: NotFoundComponentComponent },
  { path: "**", redirectTo: "/404" },
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
