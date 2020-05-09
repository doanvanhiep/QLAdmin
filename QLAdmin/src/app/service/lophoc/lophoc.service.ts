import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LophocService {

  constructor(private http: HttpClient) { }
  getListLopHocByID(IDLopHocPhan) {
    return this.http.get<any>(`${environment.apiUrl}/lophoc/danhsach/${IDLopHocPhan}`)
      .pipe(map(res => {
        return res;
      }));
  }
  themLopHoc(IDLopHocPhan,data)
  {
    return this.http.post<any>(`${environment.apiUrl}/lophoc/them/`,{IDLopHocPhan,data})
      .pipe(map(res => {
        return res;
      }));
  }
  suaLopHoc(IDLopHoc,data)
  {
    return this.http.put<any>(`${environment.apiUrl}/lophoc/sua/${IDLopHoc}`,{data})
      .pipe(map(res => {
        return res;
      }));
  }
  xoaLopHoc(IDLopHoc)
  {
    return this.http.delete<any>(`${environment.apiUrl}/lophoc/xoa/${IDLopHoc}`)
      .pipe(map(res => {
        return res;
      }));
  }
}