import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IApiRes, IApiResult, ICreateUserReq, ILoginUserForm, IUpdateUserRes, IUser, IUserItem, userDBResult } from './interface/userAccount';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:7000'; // 後端 API 的基本 URL

  constructor(private http: HttpClient) {}


  loginApi(loginForm: ILoginUserForm): Observable<IApiResult<IUser>> {
    const url = this.baseUrl + '/api/dapper/login';
    return this.http.post<IApiResult<IUser>>(url, loginForm);
  }

  GetAllApi(): Observable<IApiResult<userDBResult>> {
    const url = this.baseUrl + '/api/dapper/GetAll';
    return this.http.get<IApiResult<userDBResult>>(url);
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

  /*
  // 其他使用者管理功能（例如：取得使用者列表）
  getUserList() {
    // return this.http.get<IApiRes<IUserItem[]>>(this.baseUrl + '/users');
    return of({
      status: 'success',
      data: [
        { id: 1, name: 'User One', department: 'CS', email: 'user1@example.com' },
        { id: 2, name: 'User Two', department: 'IT', email: 'user2@example.com' }
      ],
      message: 'Fetched user list (mock)'
    });
  }

  // 更新指定使用者
  updateUser(userId: number, params: ICreateUserReq) {
    // return this.http.put<IApiRes<IUpdateUserRes>>(
    //   this.baseUrl + `/users/${userId}`,
    //   params
    // );
    return of({
      status: 'success',
      data: { userId, ...params },
      message: 'User updated successfully (mock)'
    });
  }

  // 刪除使用者
  deleteUser(userId: number) {
    // return this.http.delete(this.baseUrl + `/users/${userId}`);
    return of({
      status: 'success',
      message: `User with ID ${userId} deleted successfully (mock)`
    });
  }
    */
}
