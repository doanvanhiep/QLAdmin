import { Component, OnInit } from '@angular/core';
import { Login_serviceService } from '../service_auth/login_service.service'
import { CheckrouteService } from '../service/checkroute/checkroute.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  quyen: any;
  TenTaiKhoan: string;
  constructor(
    private checkrouteService: CheckrouteService,
    private loginService: Login_serviceService) {
  }

  ngOnInit(): void {
    // this.loginService.getTenTaiKhoan()
    //   .pipe()
    //   .subscribe(res => { 
    //     this.TenTaiKhoan = res;
    //   });
    this.TenTaiKhoan=this.loginService.getTenTaiKhoan();
    this.quyen = this.checkrouteService.getParentRouter();
  }
  logout() {
    this.loginService.logout();
  }
}
