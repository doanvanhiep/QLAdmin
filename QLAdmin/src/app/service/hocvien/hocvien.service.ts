import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HocvienService {
  constructor(private http: HttpClient) { }
  getListHocVien() {
    return this.http.get<any>(`${environment.apiUrl}/hocvien/danhsach`)
      .pipe(map(res => {
        return res;
      }));
  }
  getListHocVienByIDLopHoc(IDLopHoc) {
    return this.http.get<any>(`${environment.apiUrl}/hocvien/danhsachbyidlophoc/${IDLopHoc}`)
      .pipe(map(res => {
        return res;
      }));
  }
  themHocVien( IDLopHoc,TenHocVien, Email, SoDienThoai,SoTien,NguoiThem)
  {
    return this.http.post<any>(`${environment.apiUrl}/hocvien/them`,{ IDLopHoc,TenHocVien, Email, SoDienThoai,SoTien,NguoiThem})
    .pipe(map(res => {
      return res;
    }));
  }
  xoaHocVien( IDHocVien,IDLopHoc)
  {
    return this.http.delete<any>(`${environment.apiUrl}/hocvien/xoa/${IDHocVien}/${IDLopHoc}`)
    .pipe(map(res => {
      return res;
    }));
  }
  suaHocVien(IDHocVien,IDLopHoc,TenHocVien, SoDienThoai, Email,IDLopHocCu)
    {
        return this.http.put<any>(`${environment.apiUrl}/hocvien/sua`,{IDHocVien,IDLopHoc,TenHocVien, SoDienThoai, Email,IDLopHocCu})
        .pipe(map(res=>{
            return res;
        }));
    }
    suaTrangThaiThanhToan(IDHocVien,IDLopHoc,TrangThaiThanhToan)
    {
      return this.http.put<any>(`${environment.apiUrl}/hocvien/suatrangthaithanhtoan`,{IDHocVien,IDLopHoc,TrangThaiThanhToan})
        .pipe(map(res=>{
            return res;
        }));
    }
    suaTrangThai(IDHocVien,IDLopHoc,TrangThai)
    {
      return this.http.put<any>(`${environment.apiUrl}/hocvien/suatrangthai`,{IDHocVien,IDLopHoc,TrangThai})
        .pipe(map(res=>{
            return res;
        }));
    }
    getThongKeDangKiHocVien(BatDau,KetThuc)
    {
      return this.http.get<any>(`${environment.apiUrl}/hocvien/getthongkedangkihocvien/${BatDau}/${KetThuc}`)
      .pipe(map(res=>{
          return res;
      }));
    }
    getThongKeHinhThucThanhToanHocVien(BatDau,KetThuc)
    {
      return this.http.get<any>(`${environment.apiUrl}/hocvien/getthongkehinhthucthanhtoanhocvien/${BatDau}/${KetThuc}`)
      .pipe(map(res=>{
          return res;
      }));
    }
    getThongKeDoanhThuTheoHinhThucThanhToan(BatDau,KetThuc)
    {
      return this.http.get<any>(`${environment.apiUrl}/hocvien/getthongkedoanhthutheohinhthucthanhtoan/${BatDau}/${KetThuc}`)
      .pipe(map(res=>{
          return res;
      }));
    }
} 
