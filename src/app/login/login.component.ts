import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordDialogComponent } from '../componetDialog/forgot-password-dialog/forgot-password-dialog.component';
import { LoginFailedDialogComponent } from '../componetDialog/login-failed-dialog/login-failed-dialog.component';
import { LoginSuccessfulDialogComponent } from '../componetDialog/login-successful-dialog/login-successful-dialog.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  // ✅ 加入表單驗證 Validators.required皆為必填
  form = new FormGroup({
    stuId: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,//用於頁面跳轉
    public dialog: MatDialog,//用於開啟對話框 (MatDialog)
    private userService: UserService //用於呼叫API
  ) {}

  // ✅ 登入方法
  onSubmit() {
    //檢查表單是否效
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // 標記欄位錯誤
      this.dialog.open(LoginFailedDialogComponent, {}); // 顯示錯誤對話框
      return;
    }

    //取得表單的原始值，getRawValue() 會回傳物件 { stuId: 值, password: 值 }
    const loginForm = this.form.getRawValue();

    this.userService.loginApi(loginForm).subscribe({
      /*
      這是 RxJS Observable 的 subscribe 方法的用法。
      當 this.userService.loginApi(loginForm) 發送 API 請求時，它會回傳一個 Observable，需要用 subscribe 來接收結果。這個 subscribe 內部接受 三種事件的回應處理：
        next: (資料) => { ... } → 當有新資料時執行
        error: (錯誤) => { ... } → 當發生錯誤時執行
        complete: () => { ... } → 當 Observable 完全結束時執行
      */
      next: (result) => {
        //登入失敗  
        if (!result.isSuccess) {
          this.dialog.open(LoginFailedDialogComponent, {}); // 顯示登入失敗對話框
          return;
        }

        // ✅ 存入 JWT
        localStorage.setItem('jwt', result.token); 

        // ✅ 顯示登入成功對話框，關閉後跳轉
        const dialogRef = this.dialog.open(LoginSuccessfulDialogComponent, {});
        dialogRef.afterClosed().subscribe(() => {
          this.to_index();
        });
      },
      //api錯誤
      error: () => {
        this.dialog.open(LoginFailedDialogComponent, {});
      }
    });
  }


  // ✅ 確保 JWT 存入後才跳轉
  to_index() {
    // 若有 JWT，跳轉至首頁
    if (localStorage.getItem('jwt')) {
      this.router.navigate(['/index']);
    } else {
      this.dialog.open(LoginFailedDialogComponent, {}); // 若沒 JWT，顯示錯誤
    }
  }

  // ✅ 忘記密碼對話框
  open_forgot_password_dialog() {
    const dialogRef = this.dialog.open(ForgotPasswordDialogComponent, {
      width: '35vw',
      //無法點擊外部關閉
      disableClose: true
    });

    //對話框關閉時，執行console.log 印出回傳結果
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}






