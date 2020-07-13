import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class KhoahocService {
 
    constructor(
        private http:HttpClient
    ) { }
    getListKhoaHoc(){
        return this.http.get<any>(`${environment.apiUrl}/khoahoc/danhsach`)
        .pipe(map(res=>{
            return res;
        }));
    }
    
    themKhoaHoc(TenKhoaHoc,GhiChu)
    {
        return this.http.post<any>(`${environment.apiUrl}/khoahoc/them`,{TenKhoaHoc,GhiChu})
        .pipe(map(res=>{
            return res;
        }));
    }
    suaKhoaHoc(IDKhoaHoc,TenKhoaHoc,GhiChu)
    {
        return this.http.put<any>(`${environment.apiUrl}/khoahoc/sua/${IDKhoaHoc}`,{TenKhoaHoc,GhiChu})
        .pipe(map(res=>{
            return res;
        }));
    }
    xoaKhoaHoc(IDKhoaHoc)
    {
        return this.http.delete<any>(`${environment.apiUrl}/khoahoc/xoa/${IDKhoaHoc}`)
        .pipe(map(res=>{
            return res;
        }));
    }
    getKhoaHocByID(IDKhoaHoc)
    {
        return this.http.get<any>(`${environment.apiUrl}/khoahoc/getkhoahocbyid/${IDKhoaHoc}`)
        .pipe(map(res=>{
            return res;
        }));
    }
    getAllKhoaHocKichHoat()
    {
        return this.http.get<any>(`${environment.apiUrl}/khoahoc/getallkhoahockichhoat`)
        .pipe(map(res=>{
            return res;
        }));
    }
    suaTrangThaiKhoaHoc(IDKhoaHoc,TrangThai)
    {
        return this.http.put<any>(`${environment.apiUrl}/khoahoc/suatrangthai`,{IDKhoaHoc,TrangThai})
        .pipe(map(res=>{
            return res;
        }));
    }
}
