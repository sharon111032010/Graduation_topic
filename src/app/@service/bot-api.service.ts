import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChatBorData, IChatBorReq, IChatBorTitleData } from '../@interface/IchatBor';
import { Observable } from 'rxjs';
import { IApiRes } from '../@interface/userAccount';

@Injectable({
  providedIn: 'root'
})
export class BotAPIService {

  baseUrl = "http://10.25.1.180:5002";
  constructor(private http: HttpClient) { }
  chatBot(chatMessage:IChatBorReq): Observable<IChatBorData> {
    const url = this.baseUrl + "/Chat_test";
    return this.http.post<any>(url, chatMessage);
  }
  chatTitle(chatMessage:IChatBorReq): Observable<IChatBorTitleData> {
    const url = this.baseUrl + "/Chat_Title";
    return this.http.post<any>(url, chatMessage);
  }
}
