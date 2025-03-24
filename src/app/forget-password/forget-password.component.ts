import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiResult } from '../interface/userAccount';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ForgetPasswordService } from '../forget-password.service';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
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
  ) { }


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'] || null;
      console.log(this.token);
    });
  }

  onSubmit() {
    // 檢查表單是否 無效
    if (!this.form.valid || !this.token) {
      alert("表單無效");
      this.form.markAllAsTouched();
      return;
    }

    // 取得表單資料
    const forgetPasswordForm = {
      newPassword: this.form.value.newPassword!,
      email: this.form.value.Email!,
      token: this.token
    };

    console.log('即將送出的資料:', forgetPasswordForm);
    this.forgetPasswordService.resetPassword(forgetPasswordForm).subscribe({
      next: (result) => {
        if (result.isSuccess) {
          alert("密碼重設成功");
        } else {
          alert("密碼重設失敗：" + result.message);
        }
      },
      error: (error) => {
        console.error("API 請求錯誤：", error);
      }
    });
  }

}

