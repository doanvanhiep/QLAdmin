import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import{AuthorServiceService} from '../app/service_auth/author-service.service';
import { Login_serviceService } from '../app/service_auth/login_service.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  isLoggedIn: boolean = false;
  constructor(
    private router: Router,
    private loginService: Login_serviceService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.loginService.isLogin) {
      return true;
    } else {
      // alert('Please log in')
      this.router.navigate(['/dangnhap']);
      return false;
    }
  }
}
