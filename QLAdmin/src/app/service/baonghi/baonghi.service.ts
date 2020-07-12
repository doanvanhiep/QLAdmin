import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BaonghiService {

  constructor(private http: HttpClient,) { }
  getListBaoNghi() {
    return this.http.get<any>(`${environment.apiUrl}/baonghi/danhsach`)
      .pipe(map(res => {
        return res;
      }));
  }
  themBaoNghi(IDGiangVien,IDLopHoc,IDPhongHoc,IDThongTinLopHoc,NgayNghi, GhiChu) {
    return this.http.post<any>(`${environment.apiUrl}/baonghi/them`, { IDGiangVien,IDLopHoc,IDPhongHoc,IDThongTinLopHoc,NgayNghi, GhiChu })
      .pipe(map(res => {
        return res;
      }));
  }
  suaBaoNghi(IDBaoNghi, IDLopHoc, IDPhongHoc, IDThongTinLopHoc, NgayNghi, GhiChu) {
    return this.http.put<any>(`${environment.apiUrl}/baonghi/sua/${IDBaoNghi}`, { IDLopHoc, IDPhongHoc, IDThongTinLopHoc, NgayNghi, GhiChu })
      .pipe(map(res => {
        return res;
      }));
  }
  suaTrangThaiBaoNghi(IDBaoNghi,TrangThai)
  {
    return this.http.put<any>(`${environment.apiUrl}/baonghi/suatrangthai`, { IDBaoNghi,TrangThai })
      .pipe(map(res => {
        return res;
      }));
  }
  xoaBaoNghi(IDBaoNghi) {
    return this.http.delete<any>(`${environment.apiUrl}/baonghi/xoa/${IDBaoNghi}`)
      .pipe(map(res => {
        return res;
      }));
  } 
}
