import { Component, OnInit } from '@angular/core';
import { Login_serviceService } from '../service_auth/login_service.service'
import { CheckrouteService } from '../service/checkroute/checkroute.service';
import { GiangvienService } from '../service/giangvien/giangvien.service';
import { QuantrivienService } from '../service/quantrivien/quantrivien.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  serviceSelect:any;
  quyen: any;
  TenTaiKhoan: string;
  HinhAnh:any="1Pgd3rbBMeKd9TKCBbf5C2hn005-cbD1c";
  constructor(  
    private quantrivienService:QuantrivienService,
    private giangvienService: GiangvienService,
    private checkrouteService: CheckrouteService,
    private loginService: Login_serviceService) {
  }

  ngOnInit(): void {
    if(this.checkrouteService.getIsGiangVien())
    this.serviceSelect=this.giangvienService;
    else
    this.serviceSelect=this.quantrivienService;
    // this.loginService.getTenTaiKhoan()
    //   .pipe()
    //   .subscribe(res => { 
    //     this.TenTaiKhoan = res;
    //   });
    this.TenTaiKhoan=this.loginService.getTenTaiKhoan();
    this.serviceSelect.getThongTinByTenTaiKhoan(this.TenTaiKhoan)
      .pipe()
      .subscribe(res=>{
        this.HinhAnh=res.result.data[0].HinhAnh;
      })
    this.quyen = this.checkrouteService.getParentRouter();
  }
  logout() {
    this.loginService.logout();
  }
}
