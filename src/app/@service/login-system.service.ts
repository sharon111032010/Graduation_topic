import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDeleteReq, ILoginDataRes, ILoginReq, IRegisterReq } from '../@InterfaceAPI/ILoginSystem';
import { Observable } from 'rxjs';
import { IApiRes } from '../@InterfaceAPI/IReqTemplate';

@Injectable({
  providedIn: 'root'
})
export class LoginSystemService {

  constructor(
  ) { }
  http = inject(HttpClient);

  private baseUrl = 'https://localhost:7000';

  LoginAPI(loginInterface : ILoginReq):Observable<IApiRes<any>>{
    const url = this.baseUrl + '/api/Login' // 沒填完!!
    return this.http.post<any>(url,loginInterface);
  }

  RegisterAPI(RegisterInterFace : IRegisterReq):Observable<IApiRes<any>>{
    const url = this.baseUrl + '/api/register' // 沒填完!!
    return this.http.post<any>(url,RegisterInterFace);
  }

  DeleteAPI(DeleteInterFace : IDeleteReq):Observable<IApiRes<any>>{
    const url = this.baseUrl + '/api/DeleteAccount/DeleteAccount' // 沒填完 !!
    return this.http.post<any>(url,DeleteInterFace);
  }

}
