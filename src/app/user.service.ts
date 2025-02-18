import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IApiRes, IApiResult, IApiResultToken, ICreateUserReq, IForgetPasswordUserForm, ILoginUserForm, IRegisterUserForm, IUpdateUserRes, IUser, IUserItem, userDBResult } from './interface/userAccount';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://localhost:7000'; // 後端 API 的基本 URL

  constructor(private http: HttpClient) {}

/*
  loginApi(loginForm: ILoginUserForm): Observable<IApiResult<IUser>> {
    //const url = this.baseUrl + '/api/dapper/login';
    const url = this.baseUrl + '/api/dapper/loginApi';
    return this.http.post<IApiResult<IUser>>(url, loginForm);
  }
    */
  loginApi(loginForm: ILoginUserForm): Observable<IApiResultToken<IUser>> {
    //const url = this.baseUrl + '/api/dapper/login';
    const url = this.baseUrl + '/api/dapper/loginApi';
    return this.http.post<IApiResultToken<IUser>>(url, loginForm);
  }

  registerApi(registerForm: IRegisterUserForm): Observable<IApiResult<IUser>> {
    const url = this.baseUrl + '/api/Dapper/RegisterApi';
    return this.http.post<IApiResult<IUser>>(url, registerForm);
  }
  forgetPasswordApi(forgetPasswordForm: IForgetPasswordUserForm): Observable<IApiResult<"">> {
    const url = this.baseUrl + '/api/Dapper/ForgetPasswordApi';
    //return this.http.post<IApiResult<"">>(url, forgetPasswordForm);
    //return of ({  isSuccess: true, message: 'sant email successful', data: "" })
    return of ({  isSuccess: false, message: 'sant email successful', data: "" })
  }

  GetAllApi(): Observable<IApiResult<userDBResult>> {
    const url = this.baseUrl + '/api/dapper/GetAll';
    return this.http.get<IApiResult<userDBResult>>(url);
  }
  

  GetUserInforApi(account :string): Observable<IUserItem> {
    const url = this.baseUrl + '/api/dapper/GetUserInfo';
    return this.http.post<IUserItem>(url,account);
  }

  
  // 註冊新使用者
  register(params: {
    name: string;
    department: string;
    studentID: string;
    password: string;
    email: string;
    phoneNumber: string;
  }) {
    // return this.http.post<IApiRes<{ userId: string }>>(
    //   this.baseUrl + '/register',
    //   params
    // );
    return of({
      status: 'success',
      data: { userId: 'mock_user_id' },
      message: 'User registered successfully (mock)'
    });
  }

  // 登入
  login(params: { studentID: string; password: string }) {
    // return this.http.post<IApiRes<{ token: string }>>(
    //   this.baseUrl + '/login',
    //   params
    // );
    return of({
      status: 'success',
      data: { token: 'mock_token' },
      message: 'Login successful (mock)'
    });
  }

}
