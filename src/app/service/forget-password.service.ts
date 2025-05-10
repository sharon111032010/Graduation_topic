import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IsendEmaiReq, IApiResult, IresetPasswordReq } from '../@interface/Iforget-password';

@Injectable({
  providedIn: 'root'
})

export class ForgetPasswordService {
  private baseUrl = 'https://localhost:7000';

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'accept': '*/*'
  });

  requestPasswordReset(sendEmailForm: IsendEmaiReq): Observable<IApiResult<string>> {
    const requestBody = JSON.stringify({
      email: sendEmailForm.email,
      account: sendEmailForm.account
    });

    const url = this.baseUrl + '/api/Email/forgetPassword_send';
    return this.http.post<IApiResult<string>>(url, sendEmailForm, { headers: this.headers });
  }

  resetPassword(resetPasswordForm: IresetPasswordReq): Observable<IApiResult<string>> {
    const url = this.baseUrl + '/api/Email/resetPassword';
    return this.http.post<IApiResult<string>>(url, resetPasswordForm
      //{headers: { Authorization: `Bearer ${token}` }}
    );
  }
}
