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

} 
