import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IChatBor } from '../@interface/IchatBor';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://163.17.136.69:5680';

  chatBotResponse(chatBotRequest: IChatBor): Observable<any> {
    const url = this.baseUrl + '/Chat_test_API';
    return this.http.post<any>(url, chatBotRequest, {
      responseType: 'text' as 'json' // <-- 這行很重要
    });
  }
}
