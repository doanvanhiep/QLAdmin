import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {AuthorServiceService} from '../app/service_auth/author-service.service';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from './app-routing.module';
import { DasboardComponent } from './dasboard/dasboard.component';
import { LoginComponent } from './Login/Login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { KhoahocComponent } from './khoahoc/khoahoc.component';
import { LophocphanComponent } from './lophocphan/lophocphan.component';
import { LophocComponent } from './lophoc/lophoc.component';
import { GiangvienComponent } from './giangvien/giangvien.component';
import { PhonghocComponent } from './phonghoc/phonghoc.component';
import { ThoikhoabieuComponent } from './thoikhoabieu/thoikhoabieu.component';
import { DatePipe } from '@angular/common';
import { DanhsachlophocComponent } from './danhsachlophoc/danhsachlophoc.component';
import { HocvienComponent } from './hocvien/hocvien.component';
import { NotFoundComponentComponent } from './NotFoundComponent/NotFoundComponent.component';
import { QuantrivienComponent } from './quantrivien/quantrivien.component';
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
      DanhsachlophocComponent,
      HocvienComponent,
      NotFoundComponentComponent,
      QuantrivienComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule
   ],
   providers: [
      DatePipe
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
