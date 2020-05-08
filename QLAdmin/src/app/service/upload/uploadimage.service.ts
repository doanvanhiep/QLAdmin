import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class UploadimageService {

    constructor(private http: HttpClient) { }
    uploadimage(file)
    {
        const fd=new FormData();
        fd.append('file',file);
        return this.http.post<any>(`${environment.apiuploadimage}`,fd)
        .pipe(map(res=>{
            return res;
        }));
    }

}
