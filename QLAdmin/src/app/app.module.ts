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
@NgModule({
   declarations: [
      AppComponent,
      NavigationComponent,
      DasboardComponent,
      LoginComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule
   ],
   providers: [ 
      { provide: HTTP_INTERCEPTORS, useClass: AuthorServiceService, multi: true }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
