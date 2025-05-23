import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateMenuRes, IgetMenuDataReq, IGetMenuRes } from '../@InterfaceAPI/IMenu';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateMenuService {

  constructor(
    private http:HttpClient
  ) { }

  private baseUrl = 'http://163.17.136.69:5680';

  createMenuAPI(createMenuAPI :ICreateMenuRes):Observable<any>{
    const url = this.baseUrl+'/api/' //未完
    return this.http.post(url,createMenuAPI);
  }

  getMentAPI(getMentAPI : IGetMenuRes):Observable<any>{
    const url = this.baseUrl+'/api/' //未完
    return this.http.post(url, getMentAPI);
  }

}
