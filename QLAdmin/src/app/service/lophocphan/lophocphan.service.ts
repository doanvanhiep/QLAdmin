import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class LophocphanService {

    constructor(private http: HttpClient) { }
    getListLopHocPhan(IDKhoaHoc){
        return this.http.get<any>(`${environment.apiUrl}/lophocphan/danhsachbyidkhoahoc/${IDKhoaHoc}`)
        .pipe(map(res=>{
            return res;
        }));
    }
    themLopHocPhan(IDKhoaHoc,MaLopHocPhan,TenLopHocPhan,HocPhi,SoBuoi,SiSo,MoTa,HinhAnh,GhiChu)
    {
        return this.http.post<any>(`${environment.apiUrl}/lophocphan/them`,{IDKhoaHoc,MaLopHocPhan,TenLopHocPhan,HocPhi,SoBuoi,SiSo,MoTa,HinhAnh,GhiChu})
        .pipe(map(res=>{
            return res;
        }));
    }
    suaLopHocPhan(IDLopHocPhan,MaLopHocPhan,TenLopHocPhan,HocPhi,SoBuoi,SiSo,MoTa,HinhAnh,GhiChu)
    {
        return this.http.put<any>(`${environment.apiUrl}/lophocphan/sua/${IDLopHocPhan}`,{MaLopHocPhan,TenLopHocPhan,HocPhi,SoBuoi,SiSo,MoTa,HinhAnh,GhiChu})
        .pipe(map(res=>{
            return res;
        }));
    }
    xoaLopHocPhan(IDLopHocPhan)
    {
        return this.http.delete<any>(`${environment.apiUrl}/lophocphan/xoa/${IDLopHocPhan}`)
        .pipe(map(res=>{
            return res;
        }));
    }
    getLopHocPhanByID(IDLopHocPhan){
        return this.http.get<any>(`${environment.apiUrl}/lophocphan/getlophocphanbyid/${IDLopHocPhan}`)
        .pipe(map(res=>{
            return res;
        }));
    }
}
