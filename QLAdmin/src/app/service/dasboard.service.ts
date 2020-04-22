import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DasboardService {

constructor(private http: HttpClient) { }
  test()
  {
    return this.http.get<any>(`${environment.apiUrl}/taikhoan/danhsach`)
    .pipe(map(res => {
      return res;
    }));
  }
}
