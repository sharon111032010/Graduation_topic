import { Component, Injectable } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ForgetPasswordService } from '../service/forget-password.service';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout'; // 引入 FlexLayoutModule
import { FogotCheckFailedDialogComponent } from '../componetDialog/fogot-check-failed-dialog/fogot-check-failed-dialog.component';
import { InfoDialogComponent } from '../componetDialog/info-dialog/info-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, FlexLayoutModule,
    ReactiveFormsModule,
  ],
})

export class ForgetPasswordComponent {
  token: string | null = null;
  form = new FormGroup({
    newPassword: new FormControl("", Validators.required),
    Email: new FormControl("", Validators.required),
  });

  constructor(
    private forgetPasswordService: ForgetPasswordService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,//用於開啟對話框 (MatDialog)
    private router: Router,//用於頁面跳轉
  ) { }


  //在載入頁面時，取得 token
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'] || null;
      console.log(this.token);
    });
  }

  onSubmit() {
    // 檢查表單是否 無效
    if (!this.form.valid || !this.token) {

      this.dialog.open(InfoDialogComponent, {
        width: '300px',  // 設定寬度
        height: '200px', // 設定高度
        maxWidth: '80vw', // 限制最大寬度（可選）
        maxHeight: '80vh', // 限制最大高度（可選）
        data: { message: '表單無效', title: '錯誤' } // 傳遞的字串); 
      })
      this.form.markAllAsTouched();
      return;
    }

    // 取得表單資料
    const forgetPasswordForm = {
      newPassword: this.form.value.newPassword!,
      email: this.form.value.Email!,
      token: this.token
    };

    this.forgetPasswordService.resetPassword(forgetPasswordForm).subscribe({
      next: (result) => {
        if (result.isSuccess) {
          this.dialog.open(InfoDialogComponent, {
            width: '300px',  // 設定寬度
            height: '200px', // 設定高度
            maxWidth: '30vw', // 限制最大寬度（可選）
            maxHeight: '20vh', // 限制最大高度（可選）
            data: { message: '即將為您跳轉頁面'+result.message, title: '密碼重設成功' } // 傳遞的字串); 
          })
          this.router.navigate(['/index']);//跳轉頁面 
          
        } else {
          // 顯示錯誤對話框
          this.dialog.open(InfoDialogComponent, {
            width: '300px',  // 設定寬度
            height: '200px', // 設定高度
            maxWidth: '30vw', // 限制最大寬度（可選）
            maxHeight: '20vh', // 限制最大高度（可選）
            data: { message: '密碼重設失敗'+result.message, title: '錯誤' } // 傳遞的字串); 
          })
        }
      },

      error: (error) => {
        console.error("API 請求錯誤：", error);
      }
    });
  }

}

