import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IDeleteAccountReq } from '../@InterfaceAPI/IDeleteAccoutn';
import { IApiRes } from '../@InterfaceAPI/IReqTemplate';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteAccountService {

  constructor(
  ) { }
  http=inject(HttpClient);

  private baseUrl = 'https://localhost:7000';

  deleteAccountAPI(deleteAccountReq:IDeleteAccountReq): Observable<IApiRes<any>> {
    const url = `${this.baseUrl}/api/DeleteAccount/DeleteAccount`;
    return this.http.post<any>(url, deleteAccountReq) ;
  }
}
