import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatTestLocalService {

  constructor(
    private http :HttpClient
  ) { }
  baseUrl = 'http://10.25.1.248:5002/';

  getChatTest(ChatTestReq: ChatTestReq) :Observable<ChatTestRes> {
    const url = this.baseUrl + 'Chat_test';
    return this.http.post<ChatTestRes>(url, ChatTestReq);
  }
}
interface ChatTestReq {
  msg: string;
}
interface ChatTestRes { 
  answer: string;
}