import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ThoikhoabieuService {

constructor(private http: HttpClient) { }
getThoiKhoaBieu(IDGiangVien,NgayDauTuan,NgayCuoiTuan) {
  return this.http.get<any>(`${environment.apiUrl}/thongtinlophoc/thoikhoabieu/${IDGiangVien}/${NgayDauTuan}/${NgayCuoiTuan}`)
    .pipe(map(res => {
      return res;
    }));
}
} 
