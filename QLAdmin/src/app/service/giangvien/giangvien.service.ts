import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GiangvienService {

  constructor(private http: HttpClient) { }
  getListGiangVien() {
    return this.http.get<any>(`${environment.apiUrl}/giangvien/danhsach`)
      .pipe(map(res => {
        return res;
      }));
  }
  themGiangVien(HoTen, DiaChi, SoDienThoai, Email,MoTa,HinhAnh,GhiChu) {
    return this.http.post<any>(`${environment.apiUrl}/giangvien/them`,{HoTen, DiaChi, SoDienThoai, Email,MoTa,HinhAnh,GhiChu})
      .pipe(map(res => {
        return res;
      }));
  }
  suaGiangVien(IDGiangVien,HoTen, DiaChi, SoDienThoai, Email,MoTa,HinhAnh,GhiChu) {
    return this.http.put<any>(`${environment.apiUrl}/giangvien/sua/${IDGiangVien}`,{HoTen, DiaChi, SoDienThoai, Email,MoTa,HinhAnh,GhiChu})
      .pipe(map(res => {
        return res;
      }));
  }
  xoaGiangVien(IDGiangVien) {
    return this.http.delete<any>(`${environment.apiUrl}/giangvien/xoa/${IDGiangVien}`)
      .pipe(map(res => {
        return res;
      }));
  }
}
