import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDeleteRes, ILoginRes, IRegisterRes } from '../@InterfaceAPI/ILoginSystem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginSystemService {

  constructor(
    private http:HttpClient
  ) { }

  private baseUrl = 'https://localhost:7000';

  LoginAPI(loginInterface : ILoginRes):Observable<any>{
    const url = this.baseUrl + '/api/' // 沒填完!!
    return this.http.post<any>(url,loginInterface);
  }

  RegisterAPI(RegisterInterFace : IRegisterRes):Observable<any>{
    const url = this.baseUrl + '/api/' // 沒填完!!
    return this.http.post(url,RegisterInterFace);
  }

  DeleteAPI(DeleteInterFace : IDeleteRes):Observable<any>{
    const url = this.baseUrl + '/api' // 沒填完 !!
    return this.http.post(url,DeleteInterFace);
  }

}
