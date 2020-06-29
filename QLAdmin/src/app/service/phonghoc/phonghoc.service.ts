import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PhonghocService {

  constructor(private http: HttpClient) { }
  getListPhongHoc() {
    return this.http.get<any>(`${environment.apiUrl}/phonghoc/danhsach`)
      .pipe(map(res => {
        return res;
      }));
  }
  themPhongHoc(TenPhong,SoChoNgoi,GhiChu)
  {
    return this.http.post<any>(`${environment.apiUrl}/phonghoc/them`,{TenPhong,SoChoNgoi,GhiChu})
      .pipe(map(res => {
        return res;
      }));
  }
  suaPhongHoc(IDPhongHoc,TenPhong,SoChoNgoi,GhiChu)
  {
    return this.http.put<any>(`${environment.apiUrl}/phonghoc/sua/${IDPhongHoc}`,{TenPhong,SoChoNgoi,GhiChu})
      .pipe(map(res => {
        return res;
      }));
  }
  suaTrangThai(IDPhongHoc,TrangThai)
  {
    return this.http.put<any>(`${environment.apiUrl}/phonghoc/suatrangthai`,{IDPhongHoc,TrangThai})
      .pipe(map(res => {
        return res;
      }));
  }
  xoaPhongHoc(IDPhongHoc) {
    return this.http.delete<any>(`${environment.apiUrl}/phonghoc/xoa/${IDPhongHoc}`)
      .pipe(map(res => {
        return res;
      }));
  }
}
