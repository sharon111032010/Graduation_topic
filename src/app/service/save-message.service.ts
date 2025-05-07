import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResult, IMessageLog } from '../interface/Imessage';

@Injectable({
  providedIn: 'root'
})
export class SaveMessageService {

  constructor(
    private http: HttpClient
  ) { }

  private baseUrl = 'https://localhost:7000'; // 後端 API 的基本 URL
  // 儲存訊息的 API

  saveMessageApi(messageLog:IMessageLog): Observable<IApiResult<any>> {
    const url = this.baseUrl + '/api/Chat/addMessageRecord';
    return this.http.post<any>(url, messageLog );
  }
  /*
  {
  "messageId": 0,
  "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "messageType": 0,
  "messageText": "string",
  "createdTime": "2025-05-07T04:28:54.764Z",
  "menuId": 0
}
  */ 
}
