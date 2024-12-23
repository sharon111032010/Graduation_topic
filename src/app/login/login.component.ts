import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordDialogComponent } from '../componetDialog/forgot-password-dialog/forgot-password-dialog.component';
// import { LoginDialogComponent } from '../componetDialog/login-dialog/login-dialog.component';
import { LoginFailedDialogComponent } from '../componetDialog/login-failed-dialog/login-failed-dialog.component';
import { LoginSuccessfulDialogComponent } from '../componetDialog/login-successful-dialog/login-successful-dialog.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isClass: boolean = false;
  isNull: boolean = false;

  // 表單控制項，加入 Validators.required 確保必填
  form = new FormGroup({
    account: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private router: Router,
    public dialog: MatDialog,
    private userService: UserService
  ) { }


  onSubmit() {
    const loginForm = this.form.getRawValue();

    this.userService.loginApi(loginForm).subscribe(result => {
      // 失敗
      if (!result.isSuccess) {
        alert(result.msg);
        return;
      } else {
        this.to_index();
      }
      // 成功
      // this.dialog.close();
    });
  }

  getAll() {
    this.userService.GetAllApi().subscribe(result => {
      console.log(result);
    });
  }

  onclick_login_btn() {
    // 先檢查表單是否有效
    if (this.form.valid) {
      // 表單有效時取得表單資料
      const params = {
        ...this.form.getRawValue()
      };

      // 驗證帳號和密碼是否正確
      if (params.account == "1111032010" && params.password == "123") {
        const dialogRef = this.dialog.open(LoginSuccessfulDialogComponent, {});
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
          this.to_index();  // 導向首頁
        });

        this.isClass = false;  // 驗證通過，隱藏錯誤
      } else {
        const dialogRef = this.dialog.open(LoginFailedDialogComponent, {});
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
        // alert("slf")
        this.isClass = true;  // 驗證失敗，顯示錯誤
      }

      console.log(params);
    } else {
      // 表單無效時，標記所有欄位為 touched 以便顯示驗證錯誤
      const dialogRef = this.dialog.open(LoginFailedDialogComponent, {});
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
      this.form.markAllAsTouched();
      console.log("請填寫所有必填欄位");
    }
  }

  open_forgot_password_dialog() {
    const dialogRef = this.dialog.open(ForgotPasswordDialogComponent, {
      width: '35vw',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  to_index() {
    this.router.navigate(['/index']);
  }
}
function onclick_login_btn() {
  throw new Error('Function not implemented.');
}

