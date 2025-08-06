import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiRes } from '../@InterfaceAPI/IReqTemplate';

@Injectable({
  providedIn: 'root'
})
export class GetUUidService {


  constructor(
  ) { }
  http=inject(HttpClient);
  private baseUrl = 'https://localhost:7000/';
  public getMenuId() :Observable<IApiRes<any>>{
    const url =this.baseUrl+"getMenuId"
    return this.http.post<any>(url,null);
  }

}
