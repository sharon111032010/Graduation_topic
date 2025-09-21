import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiRes } from 'src/app/@InterfaceAPI/IReqTemplate';

@Injectable({
  providedIn: 'root'
})
export class TrafficLogBackService {

  constructor() { }
  http = inject(HttpClient);
  private baseUrl = 'https://localhost:7000';
  
  getCount() :Observable<IApiRes<any>>{
    const url = this.baseUrl + '/api/getCount'; // 未完
    return this.http.get<any>(url);
  }
}
