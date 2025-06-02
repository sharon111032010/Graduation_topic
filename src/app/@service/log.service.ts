import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGetMsgReq, ISaveMsgReq } from '../@InterfaceAPI/IMsg';
import { Observable } from 'rxjs';
import { IApiRes } from '../@InterfaceAPI/IReqTemplate';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'https://localhost:7000';

  saveLogAPI(saveMsgReq:ISaveMsgReq):Observable<IApiRes<any>>{
    const url = this.baseUrl + '/api/saveLog'; // 未完
    return this.http.post<any>(url,saveMsgReq);
  }

  getLogAPI(getMesgReq:IGetMsgReq):Observable<IApiRes<any>>{
    const url = this.baseUrl + '/api/getLog'; // 未完
    return this.http.post<any>(url ,getMesgReq);
  }
}
