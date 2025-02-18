import { Injectable } from '@angular/core';
//使用return of 
import { Observable, of } from 'rxjs';
//發送http請發
import { HttpClient } from '@angular/common/http';
//匯入interface
import { IApiRes, IApiResult, IApiResultToken, ICreateUserReq, IForgetPasswordUserForm, ILoginUserForm, IRegisterUserForm, IUpdateUserRes, IUser, IUserItem, userDBResult } from './interface/userAccount';

//設定為可注入 使其它元件可以使用(全域)
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://localhost:7000'; // 後端 API 的基本 URL

  //注入 HttpClient 來發送 HTTP 請求
  constructor(private http: HttpClient) {}

  //funName (傳入值)：{api回傳的資料回傳}
  //登入api
  loginApi(loginForm: ILoginUserForm): Observable<IApiResultToken<IUser>> {
    const url = this.baseUrl + '/api/dapper/loginApi';
    return this.http.post<IApiResultToken<IUser>>(url, loginForm);
  }

  //註冊api
  registerApi(registerForm: IRegisterUserForm): Observable<IApiResult<IUser>> {
    const url = this.baseUrl + '/api/Dapper/RegisterApi';
    return this.http.post<IApiResult<IUser>>(url, registerForm);
  }

  //取得所有使用者資料api
  GetAllApi(): Observable<IApiResult<userDBResult>> {
    const url = this.baseUrl + '/api/dapper/GetAll';
    return this.http.get<IApiResult<userDBResult>>(url);
  }

  //使用帳號取得使用者資料api
  GetUserInforApi(account :string): Observable<IUserItem> {
    const url = this.baseUrl + '/api/dapper/GetUserInfo';
    return this.http.post<IUserItem>(url,account);
  }

  //忘記密碼api
  forgetPasswordApi(forgetPasswordForm: IForgetPasswordUserForm): Observable<IApiResult<"">> {
    const url = this.baseUrl + '/api/Dapper/ForgetPasswordApi';
    //return this.http.post<IApiResult<"">>(url, forgetPasswordForm);
    //return of ({  isSuccess: true, message: 'sant email successful', data: "" })
    return of ({  isSuccess: false, message: 'sant email successful', data: "" })
  }

  //更新使用者資料api 
  //!未完成C#API
  updateUserInfoApi(updateUserForm: IUpdateUserRes): Observable<IApiResult<IUser>>{
    const url = this.baseUrl + '/api/Dapper/UpdateUserInfo';
    return this.http.post<IApiResult<IUser>>(url, updateUserForm);
  }

}
