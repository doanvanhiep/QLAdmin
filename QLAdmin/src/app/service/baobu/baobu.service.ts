import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BaobuService {

  constructor(private http: HttpClient,) { }
  getListBaoBu() {
    return this.http.get<any>(`${environment.apiUrl}/baobu/danhsach`)
      .pipe(map(res => {
        return res;
      }));
  }
  themBaoBu(IDGiangVien, IDLopHoc, IDPhongHoc, CaHoc, Thu, NgayBu, GhiChu) {
    return this.http.post<any>(`${environment.apiUrl}/baobu/them`, { IDGiangVien, IDLopHoc, IDPhongHoc, CaHoc, Thu, NgayBu, GhiChu })
      .pipe(map(res => {
        return res;
      }));
  }
  suaBaoBu(IDBaoBu, IDLopHoc, IDPhongHoc, CaHoc, Thu, NgayBu, GhiChu) {
    return this.http.put<any>(`${environment.apiUrl}/baobu/sua/${IDBaoBu}`, { IDBaoBu, IDLopHoc, IDPhongHoc, CaHoc, Thu, NgayBu, GhiChu })
      .pipe(map(res => {
        return res;
      }));
  }
  suaTrangThaiBaoBu(IDBaoBu, TrangThai) {
    return this.http.put<any>(`${environment.apiUrl}/baobu/suatrangthai`, { IDBaoBu, TrangThai })
      .pipe(map(res => {
        return res;
      }));
  }
  xoaBaoBu(IDBaoBu) {
    return this.http.delete<any>(`${environment.apiUrl}/baobu/xoa/${IDBaoBu}`)
      .pipe(map(res => {
        return res;
      }));
  }
}
