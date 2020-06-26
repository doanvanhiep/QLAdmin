import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class QuantrivienService {

  constructor(
    private http: HttpClient,
  ) { }
  getThongTinByTenTaiKhoan(TenTaiKhoan)
  {
    return this.http.get<any>(`${environment.apiUrl}/quantri/getthongtinbytentaikhoan/${TenTaiKhoan}`)
    .pipe(map(res => {
      return res;
    }));
  }
  getListQuanTriVien() {
    return this.http.get<any>(`${environment.apiUrl}/quantri/danhsach`)
      .pipe(map(res => {
        return res;
      })); 
  }
  themQuanTriVien(HoTen, DiaChi, SoDienThoai, Email, HinhAnh, GhiChu) {
    return this.http.post<any>(`${environment.apiUrl}/quantri/them`, { HoTen, DiaChi, SoDienThoai, Email, HinhAnh, GhiChu })
      .pipe(map(res => {
        return res;
      }));
  }
  suaQuanTriVien(IDQuanTri, HoTen, DiaChi, SoDienThoai, Email, HinhAnh, GhiChu) {
    return this.http.put<any>(`${environment.apiUrl}/quantri/sua`, { IDQuanTri,HoTen, DiaChi, SoDienThoai, Email, HinhAnh, GhiChu })
      .pipe(map(res => {
        return res;
      }));
  }
  xoaQuanTriVien(IDQuanTri) {
    return this.http.delete<any>(`${environment.apiUrl}/quantri/xoa/${IDQuanTri}`)
      .pipe(map(res => {
        return res;
      }));
  }
  suaThongTinCaNhan(TenTaiKhoan,HoTen, DiaChi, SoDienThoai, Email, HinhAnh)
  {
    return this.http.put<any>(`${environment.apiUrl}/quantri/suathongtincanhan`, { TenTaiKhoan,HoTen, DiaChi, SoDienThoai, Email, HinhAnh })
      .pipe(map(res => {
        return res;
      }));
  }
}
