import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDeleteRes, ILoginRes, IRegisterRes } from '../@InterfaceAPI/ILoginSystem';
import { Observable } from 'rxjs';
import { IApiReq } from '../@InterfaceAPI/IReqTemplate';

@Injectable({
  providedIn: 'root'
})
export class LoginSystemService {

  constructor(
    private http:HttpClient
  ) { }

  private baseUrl = 'https://localhost:7000';

  LoginAPI(loginInterface : ILoginRes):Observable<IApiReq<any>>{
    const url = this.baseUrl + '/api/Login' // 沒填完!!
    return this.http.post<any>(url,loginInterface);
  }

  RegisterAPI(RegisterInterFace : IRegisterRes):Observable<IApiReq<any>>{
    const url = this.baseUrl + '/api/register' // 沒填完!!
    return this.http.post<any>(url,RegisterInterFace);
  }

  DeleteAPI(DeleteInterFace : IDeleteRes):Observable<IApiReq<any>>{
    const url = this.baseUrl + '/api/DeleteAccount/DeleteAccount' // 沒填完 !!
    return this.http.post<any>(url,DeleteInterFace);
  }

}
