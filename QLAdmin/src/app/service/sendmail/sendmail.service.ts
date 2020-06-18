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
    const fd = new FormData();
    fd.append('subject', subject);
    fd.append('content', content);
    fd.append('file', file);
    fd.append('maillist', maillist);
    return this.http.post<any>(`${environment.apisendmail}`, fd)
      .pipe(map(res => {
        return res;
      }));
  }


}
