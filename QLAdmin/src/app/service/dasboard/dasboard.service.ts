import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DasboardService {

constructor(private http: HttpClient) { }
  getListLienHe()
  {
    return this.http.get<any>(`${environment.apiUrl}/lienhe/danhsach`)
    .pipe(map(res => {
      return res;
    }));
  }
  suaTrangThaiLienHe(IDLienHe,TrangThai,NguoiSua)
  {
    return this.http.put<any>(`${environment.apiUrl}/lienhe/suatrangthai`,{IDLienHe,TrangThai,NguoiSua})
    .pipe(map(res => {
      return res;
    }));
  }
}
