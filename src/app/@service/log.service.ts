import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGetMsgRes, ISaveMsgRes } from '../@InterfaceAPI/IMsg';
import { Observable } from 'rxjs';
import { IApiRes } from '../@InterfaceAPI/IReqTemplate';
import { IGetMenuRes } from '../@InterfaceAPI/IMenu';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'https://localhost:7000';

  saveLogAPI(saveMsgRes:ISaveMsgRes):Observable<IApiRes<any>>{
    const url = this.baseUrl + '/api'; // 未完
    return this.http.post<any>(url,saveMsgRes);
  }

  getLogAPI(getMesgRes:IGetMenuRes):Observable<IApiRes<any>>{
    const url = this.baseUrl + '/api';
    return this.http.post<any>(url ,getMesgRes);
  }
}
