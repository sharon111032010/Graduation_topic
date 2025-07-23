import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChatBorData, IChatBorReq, IChatBorTitleData } from '../@interface/IchatBor';
import { Observable } from 'rxjs';
import { IApiRes, IApiResult } from '../@interface/userAccount';

@Injectable({
  providedIn: 'root'
})
export class BotAPIService {

  //baseUrl = "http://10.25.1.180:5002";
  baseUrl = "http://192.168.53.10:5002";
  constructor(private http: HttpClient) { }
  chatBot(chatMessage:IChatBorReq): Observable<IApiResult<IChatBorData>> {
    const url = this.baseUrl + "/Chat_test";
    return this.http.post<IApiResult<IChatBorData>>(url, chatMessage);
  }
  chatTitle(chatMessage:IChatBorReq): Observable<IApiResult<IChatBorTitleData>> {
    const url = this.baseUrl + "/Chat_Title";
    return this.http.post<IApiResult<IChatBorTitleData>>(url, chatMessage);
  }
}
