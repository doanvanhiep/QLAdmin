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
    if (this.loginService.getQuyen() == 2) {
      return "gv";
    }
    else {
      if (this.loginService.getQuyen() == 1) {
        return "nv";
      }
      else {
        return "admin"
      }
    }
  }
  getIsGiangVien() {
    if (this.loginService.getQuyen() == 2) {
      return true;
    }
    else {
      return false;
    }
  }
}
