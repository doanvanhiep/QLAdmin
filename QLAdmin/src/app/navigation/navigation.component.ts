import { Component, OnInit } from '@angular/core';
import { Login_serviceService } from '../service_auth/login_service.service'
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  TenTaiKhoan: string;
  constructor(
    private loginService: Login_serviceService) {
    this.TenTaiKhoan = loginService.getTenTaiKhoan();
  }

  ngOnInit(): void {
  }
  logout() {
    this.loginService.logout();
  }
}
