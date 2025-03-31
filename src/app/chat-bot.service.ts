import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IChatBar } from './interface/IchatBar';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatBotService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://163.17.136.69:5680';


  // async chatBotResponse(chatBotRequest: IChatBar): Promise<string> {
  //   const url = this.baseUrl + '/Chat_test_API';
  //   return await lastValueFrom(this.http.post<string>(url, chatBotRequest));
  // }
  chatBotResponse(chatBotRequest: IChatBar): Observable<string> {
    const url = this.baseUrl + '/Chat_test_API';
    return this.http.post<string>(url, chatBotRequest);
}
}
