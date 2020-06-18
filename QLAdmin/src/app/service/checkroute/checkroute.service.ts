import { Injectable } from '@angular/core';
import { Login_serviceService } from '../../service_auth/login_service.service';
@Injectable({
  providedIn: 'root'
})
export class CheckrouteService {
  constructor(
    private loginService: Login_serviceService
  ) { }
  getParentRouter() {
    let res = this.loginService.getQuyen();

    if (+res == 2) {
      return "gv";
    }
    else {
      if (+res == 1) {
        return "nv";
      }
      else {
        return "admin"
      }
    }
    // this.loginService.getQuyen().pipe().subscribe(quyen=>{
    //   if ( quyen== 2) {
    //     return "gv";
    //   }
    //   else {
    //     if (quyen == 1) {
    //       return "nv";
    //     }
    //     else {
    //       return "admin"
    //     }
    //   }
    // });

  }
  getIsGiangVien() {
    let quyen = +this.loginService.getQuyen();
    if (quyen == 2) {
      return true;
    }
    else {
      return false;
    }
  }
}
