import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterFailedDialogComponent } from '../componetDialog/register-failed-dialog/register-failed-dialog.component';
import { RegisterSuccessfulDialogComponent } from '../componetDialog/register-successful-dialog/register-successful-dialog.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  constructor(
    public dialog: MatDialog,
    private router: Router,
    private userService: UserService
  ) { }

  // 表單 FormGroup validators.required=必填 
  form = new FormGroup({
    account: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    department: new FormControl<number | null>(null, Validators.required),//<number|null>可選填
    stuId: new FormControl<number | null>(null, Validators.required)
  });

  /** 送出表單 */
  onSubmit() {
    // 檢查表單是否 無效
    if (!this.form.valid) {
      //標記所有欄位為已觸碰
      this.form.markAllAsTouched();
      // 顯示註冊失敗對話框
      this.dialog.open(RegisterFailedDialogComponent);
      return;
    }

    // 取得表單資料
    const registerForm = this.form.getRawValue();

    // 呼叫後端 API 註冊
    this.userService.registerApi(registerForm).subscribe(result => {
      //如果失敗，顯示註冊失敗對話框
      if (!result.isSuccess) {
        this.dialog.open(RegisterFailedDialogComponent);
        return;
      }

      // 成功後顯示對話框，
      const dialogRef = this.dialog.open(RegisterSuccessfulDialogComponent);
      // 關閉後跳轉到登入頁面
      dialogRef.afterClosed().subscribe(() => {
        this.to_login();
      });
    });
  }

  /** 跳轉到登入頁面 */
  to_login() {
    this.router.navigate(['/login']);
  }
}
