import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DanhsachlophocService {

  constructor(private http: HttpClient) { }
  danhsachlophoc() {
    return this.http.get<any>(`${environment.apiUrl}/lophoc/danhsachlophoc`)
      .pipe(map(res => {
        return res;
      }));
  }
}
