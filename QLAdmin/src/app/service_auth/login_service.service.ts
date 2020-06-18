import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class Login_serviceService {
  private TenTaiKhoan: string = '';
  isLogin: boolean;
  private Quyen: any = -1;
  constructor(private http: HttpClient) {
    if (!localStorage.getItem('token')) {
      this.isLogin = false;
      this.TenTaiKhoan = "";
      this.Quyen = -1;
    }
    else {
      this.TenTaiKhoan=localStorage.getItem('TenTaiKhoan');
      this.Quyen=localStorage.getItem('Quyen');
      this.isLogin = true;
    }
  }
  getQuyenTenTaiKhoan() {
    return this.http.get<any>(`${environment.apiUrl}/taikhoan/getquyentaikhoan/${localStorage.getItem('token')}`,)
      .pipe(map(res => {
        if (res.result.error == false) {
          this.TenTaiKhoan = res.result.data.tentaikhoan;
          this.Quyen = res.result.data.quyen;
          return res.result.data;
        }
        return res.result.message;
      }));
  }
  getTenTaiKhoan() {
    if(this.TenTaiKhoan!='')
    return this.TenTaiKhoan;
    // return this.http.get<any>(`${environment.apiUrl}/taikhoan/getquyentaikhoan/${localStorage.getItem('token')}`)
    //   .pipe(map(res => {
    //     if (res.result.error == false) {
    //       this.TenTaiKhoan = res.result.data.tentaikhoan;
    //       this.Quyen = res.result.data.quyen;
    //       return res.result.data.tentaikhoan;
    //     }
    //     return res.result.message;
    //   }));
    //this.getQuyenTenTaiKhoan();
  }
  getQuyen() {
    if(this.Quyen!=-1)
    return this.Quyen;
    // return this.http.get<any>(`${environment.apiUrl}/taikhoan/getquyentaikhoan/${localStorage.getItem('token')}`)
    //   .pipe(map(res => {
    //     if (res.result.error == false) {
    //       this.TenTaiKhoan = res.result.data.tentaikhoan;
    //       this.Quyen = res.result.data.quyen;
    //       return res.result.data.quyen;
    //     }
    //     return res.result.message;
    //   }));
    //this.getQuyenTenTaiKhoan();
  }
  login(TenTaiKhoan: string, MatKhau: string) {
    return this.http.post<any>(`${environment.apiUrl}/taikhoan/dangnhap`, { TenTaiKhoan, MatKhau })
      .pipe(map(res => {
        if (res.TrangThai.error == false) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', res.TrangThai.data.token);
          localStorage.setItem('TenTaiKhoan', res.TrangThai.data.datas.TenTaiKhoan);
          localStorage.setItem('Quyen', res.TrangThai.data.datas.Quyen);
          // this.TenTaiKhoan = res.TrangThai.data.datas.TenTaiKhoan;
          // this.Quyen = res.TrangThai.data.datas.Quyen;
          return res.TrangThai.data.datas.Quyen;
        }
        return res.TrangThai.message;
      }));
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('TenTaiKhoan');
    localStorage.removeItem('Quyen');
  }
}
