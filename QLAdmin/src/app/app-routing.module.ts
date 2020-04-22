import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { LoginComponent } from './Login/Login.component';
import { AuthGuardService } from './auth-guard.service';

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
