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
    const url = this.baseUrl + '/api/getCount'; 
    return this.http.get<any>(url);
  }

  //未知問題收集
  getNuneQA():Observable<IApiRes<any>>{
    const url = this.baseUrl + '/api/getCategoriesIdMsg?categoryId=20'; 
    return this.http.get<any>(url);
  }
  getFaqCategory():Observable<IApiRes<any>>{
    const url = this.baseUrl + '/api/Categories'; 
    return this.http.post<any>(url,null);
  }

  getHistory():Observable<IApiRes<any>>{
    const url = this.baseUrl + '/daily-login'; 
    return this.http.get<any>(url);
  }
}
