import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SendmailService {

  constructor(private http: HttpClient) { }
  sendMail(subject,content,file,maillist) {
    let fd = new FormData();
    fd.append('subject', subject);
    fd.append('content', content);
    if(file!=null)
    for(let i=0;i<file.length;i++){
      fd.append('file', file[i],file[i].name);
    }
    fd.append('maillist', maillist);
    return this.http.post<any>(`${environment.apisendmail}`, fd)
      .pipe(map(res => {
        return res;
      }));
  }


}
