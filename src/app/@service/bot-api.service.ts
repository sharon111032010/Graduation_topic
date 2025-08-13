import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IChatBorData, IChatBorReq, IChatBorTitleData } from '../@interface/IchatBor';
import { Observable } from 'rxjs';
import { IApiRes, IApiResult } from '../@interface/userAccount';

@Injectable({
  providedIn: 'root'
})
export class BotAPIService {

  // baseUrl = "http://10.25.1.144:5002";
  // baseUrl="http://10.6.0.7:5002";
  baseUrl = "http://192.168.53.10:5002";

  constructor() { }
  http = inject(HttpClient);

  chatBot(chatMessage:IChatBorReq): Observable<IApiResult<IChatBorData>> {
    const url = this.baseUrl + "/Chat_test";

    const headers = new HttpHeaders({
      'Connection': 'close',  // 👈 加這行
      'Content-Type': 'application/json'
    });

    return this.http.post<IApiResult<IChatBorData>>(url, chatMessage, { headers });
  }
  chatTitle(chatMessage:IChatBorReq): Observable<IApiResult<IChatBorTitleData>> {
    const url = this.baseUrl + "/Chat_Title";
    return this.http.post<IApiResult<IChatBorTitleData>>(url, chatMessage);
  }


}
