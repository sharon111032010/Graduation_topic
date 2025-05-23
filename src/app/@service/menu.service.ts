import { Injectable } from '@angular/core';
import { ICreateMenuRes ,IGetMenuRes } from '../@InterfaceAPI/IMenu';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IApiReq } from '../@InterfaceAPI/IReqTemplate';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private http:HttpClient
  ) { }

  private baseUrl = 'http://163.17.136.69:5680';

  createMenuAPI(createMenuAPI :ICreateMenuRes):Observable<IApiReq<any>>{
    const url = this.baseUrl+'/api/' //未完
    return this.http.post<any>(url,createMenuAPI);
  }

  getMentAPI(getMentAPI : IGetMenuRes):Observable<IApiReq<any>>{
    const url = this.baseUrl+'/api/' //未完
    return this.http.post<any>(url, getMentAPI);
  }
}
