import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginFailedDialogComponent } from '../componetDialog/login-failed-dialog/login-failed-dialog.component';
import { LoginSuccessfulDialogComponent } from '../componetDialog/login-successful-dialog/login-successful-dialog.component';
import { MenuService } from '../@service/menu.service';
import { LoginSystemService } from '../@service/login-system.service';
import { ILoginReq } from '../@InterfaceAPI/ILoginSystem';
import { GetIdService } from '../service/get-id.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatIconModule, ReactiveFormsModule,RouterModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

  Form: FormGroup = this.formBuilder.group({
    // username: ['', Validators.required],
    account: ['', Validators.required],
    password: ['', Validators.required]
  });

  loginForm: FormGroup = this.formBuilder.group({
    // username: ['', Validators.required],
    stuId: ['', Validators.required],
    password: ['', Validators.required]
  });


  // 或者，使用驚嘆號符號告訴 TypeScript 這個屬性會在後面初始化
  // loginForm!: FormGroup;

  loading = false;
  submitted = false;
  menus: any[] = []; // 假設有一個菜單數組
  userId = ""; // 假設有一個用戶ID

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,//用於呼叫API
    public dialog: MatDialog,//用於開啟對話框 (MatDialog)
    private loginService: LoginSystemService, // 用於呼叫登入API
    public getIdService:GetIdService
  ) {

    // this.menuService.getMentAPI(); // 初始化時隱藏菜單

  }


  ngOnInit(): void {
    // 如果使用驚嘆號方法，可以在這裡初始化
    // this.loginForm = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   password: ['', Validators.required]
    // });
  }

  visterLoginAPI(){
    // const url = this.baseUrl + '/api/VisitorLogin' // 沒填完 !!
    this.loginService.visterRegisterAPI().subscribe({
      next: (res) => {
        if(res.isSuccess){
          const account = res.data;
          this.loginService.LoginAPI({acccount:account,password:"12345678"}).subscribe({
            next: (result) => {
              if (result.isSuccess) {
                this.dialog.open(LoginSuccessfulDialogComponent, {}).afterClosed().subscribe(() => {
                  this.getIdService.setUser(result.data);
                  this.router.navigate(['/chatPage'], {
                    state: result.data
                  });
                });
              } else {
                // this.dialog.open(LoginFailedDialogComponent, {});
                console.error('訪客登入失敗:', res.message);
              }
            },
            error: () => {
              // this.dialog.open(LoginFailedDialogComponent, {});
              //可以改別的錯誤匡
              console.error('訪客登入失敗:', res.message);
            }
          });
        } else {
          console.error('訪客註冊失敗:', res.message);
        }
      },
      error: (err) => {
        console.error('API 請求錯誤:', err);
      }
    });
  }

  loginApiOnClick() {
    this.submitted = true;
    const form = this.Form.getRawValue();
    console.log(this.Form)
    console.log(form);
    this.loginService.LoginAPI(form).subscribe({
      next: (result) => {
        if (result.isSuccess) {
          this.dialog.open(LoginSuccessfulDialogComponent, {}).afterClosed().subscribe(() => {
            this.getIdService.setUser(result.data);
            this.router.navigate(['/chatPage'], {
              state: result.data
            });
          });
        } else {
          this.dialog.open(LoginFailedDialogComponent, {});
        }
      },
      error: () => {
        this.dialog.open(LoginFailedDialogComponent, {});
        //可以改別的錯誤匡
      }
    });

    this.loading = true;

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    //copy
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // 標記欄位錯誤
      this.dialog.open(LoginFailedDialogComponent, {}); // 顯示錯誤對話框
      return;
    }

    // 此
    if (this.loginForm.invalid) {
      this.dialog.open(LoginFailedDialogComponent, {}); // 顯示錯誤對話框
      return;
    }
    //取得值
    const loginform = this.loginForm.getRawValue();
    //呼叫api
    this.userService.loginApi(loginform).subscribe({
      next: (result) => {
        if (!result.isSuccess) {
          this.dialog.open(LoginFailedDialogComponent, {});
          return;
        }
        //存入jwt
        localStorage.setItem('jwt', result.token);

        this.dialog.open(LoginSuccessfulDialogComponent, {}).afterClosed().subscribe(() => {
          this.router.navigate(['/chatPage']);
        });
      },
      error: () => {
        this.dialog.open(LoginFailedDialogComponent, {});
      }
    })

    this.loading = true;

    // 在此處理登入邏輯
    // 以下為模擬登入過程
    // setTimeout(() => {
    //   // 登入成功，轉導至首頁
    //   this.router.navigate(['/dashboard']);
    //   this.loading = false;
    // }, 1500);
  }

  loginWithResgister() {
    this.loading = true;
    this.router.navigate(['/chatPage']);
    this.loading = false;
  }
}
