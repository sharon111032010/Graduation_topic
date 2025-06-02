import { Injectable } from '@angular/core';
import { ICreateMenuReq ,IGetMenuReq } from '../@InterfaceAPI/IMenu';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IApiRes } from '../@InterfaceAPI/IReqTemplate';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private http:HttpClient
  ) { }

  private baseUrl = 'https://localhost:7000';
  createMenuAPI(createMenuAPI :ICreateMenuReq):Observable<IApiRes<any>>{
    const url = this.baseUrl+'/api/createMenu/createMenu' //未完
    return this.http.post<any>(url,createMenuAPI);
  }

  getMentAPI(getMentAPI : IGetMenuReq):Observable<IApiRes<any>>{
    const url = this.baseUrl+'/api/createMenu/getMenuList' //未完
    return this.http.post<any>(url, getMentAPI);
  }
}
