import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class Login_serviceService {
  private TenTaiKhoan: string;
  isLogin: boolean;
  constructor(private http: HttpClient) {
    if (!localStorage.getItem('token')) {
      this.isLogin = false;
      this.TenTaiKhoan = "";
    }
    else {
      this.isLogin = true;
      this.TenTaiKhoan = localStorage.getItem('TenTaiKhoan');
    }
  }
  getTenTaiKhoan() {
    return this.TenTaiKhoan;
  }
  login(TenTaiKhoan: string, MatKhau: string) {
    return this.http.post<any>(`${environment.apiUrl}/taikhoan/dangnhap`, { TenTaiKhoan, MatKhau })
      .pipe(map(res => {
        if (res.TrangThai.error == false) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', res.TrangThai.data.token);
          localStorage.setItem('TenTaiKhoan', res.TrangThai.data.datas.TenTaiKhoan);
          return res.TrangThai.data.datas.Quyen;
        }
        return res.TrangThai.message;
      }));
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('TenTaiKhoan');
  }
}
