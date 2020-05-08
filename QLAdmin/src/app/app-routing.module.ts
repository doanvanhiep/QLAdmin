import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { LoginComponent } from './Login/Login.component';
import { AuthGuardService } from './auth-guard.service';
import { KhoahocComponent } from './khoahoc/khoahoc.component';
import { LophocphanComponent } from './lophocphan/lophocphan.component';
import { LophocComponent } from './lophoc/lophoc.component';
import { GiangvienComponent } from './giangvien/giangvien.component';
import { PhonghocComponent } from './phonghoc/phonghoc.component';

const routes: Routes = [
  {path:'',redirectTo:'dangnhap',pathMatch:'full'},
  {path:'dangnhap',component: LoginComponent},
  {
    path: 'nv',
    component: NavigationComponent,
    children: [
      {
        path: '',
        component: DasboardComponent
      },
      {
        path: 'khoahoc',
        component: KhoahocComponent
      },
      {
        path: 'lophocphan',
        component: LophocphanComponent
      },
      {
        path: 'lophoc',
        component: LophocComponent
      },
      {
        path: 'giangvien',
        component: GiangvienComponent
      },
      {
        path: 'phonghoc',
        component: PhonghocComponent
      }
    ],
    canActivate: [AuthGuardService]
  }
];
@NgModule({
  // declarations: [],
  imports: [
    // CommonModule
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
