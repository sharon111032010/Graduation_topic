import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResult } from '../@interface/IUserInfo';

@Injectable({
  providedIn: 'root'
})
export class UserInofService {

  constructor(
    private http :HttpClient
  ) { }

  private baseUrl = 'https://localhost:7000'; // 後端 API 的基本 URL

  getUserInfo(Interface:any):Observable<IApiResult<any>>{
    const url =this.baseUrl+'/';
    return this.http.post<any>(url,Interface)
  }

}
