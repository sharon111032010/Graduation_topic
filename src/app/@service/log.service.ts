import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGetMsgRes, ISaveMsgRes } from '../@InterfaceAPI/IMsg';
import { Observable } from 'rxjs';
import { IApiReq } from '../@InterfaceAPI/IReqTemplate';
import { IGetMenuRes } from '../@InterfaceAPI/IMenu';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://163.17.136.69:5680';

  saveLogAPI(saveMsgRes:ISaveMsgRes):Observable<IApiReq<any>>{
    const url = this.baseUrl + '/api'; // 未完
    return this.http.post<any>(url,saveMsgRes);
  }

  getLogAPI(getMesgRes:IGetMenuRes):Observable<IApiReq<any>>{
    const url = this.baseUrl + '/api';
    return this.http.post<any>(url ,getMesgRes);
  }
}
