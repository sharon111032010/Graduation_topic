import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiRes } from 'src/app/@interface/userAccount';
import { IUserId, IUserInfoData } from 'src/app/@InterfaceAPI/IUserInfo';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor() { }

  private baseUrl = 'https://localhost:7000/';
  http = inject(HttpClient);

  public getUserInfo(userId: IUserId): Observable<IApiRes<IUserInfoData>> {
    const url = this.baseUrl + "api/userInfo";
    return this.http.post<any>(url, userId );
  }
}
