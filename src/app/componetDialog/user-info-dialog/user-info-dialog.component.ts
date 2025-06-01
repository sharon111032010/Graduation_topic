import { Component } from '@angular/core';
import { InfoDialogComponent } from '../info-dialog/info-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeleteAccountService } from 'src/app/@service/delete-account.service';

@Component({
  selector: 'app-user-info-dialog',
  templateUrl: './user-info-dialog.component.html',
  styleUrls: ['./user-info-dialog.component.scss']
})
export class UserInfoDialogComponent {


  myForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public DelteDialogService: DeleteAccountService // 用於關閉對話框
  ) {
    this.myForm = fb.group({
      userName: ['', Validators.required],
      userPassword: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    const fromData = this.myForm.getRawValue();
    if (this.myForm.valid) {
      console.log('送出的表單資料:', this.myForm.value);
      this.DelteDialogService.deleteAccountAPI(fromData).subscribe({
        next: (response) => {
          alert('帳號刪除成功！');
          console.log('帳號刪除成功:', response);
          // 在這裡可以處理成功刪除帳號後的邏輯
        },
        error: (error) => {
          console.error('帳號刪除失敗:', error);
          // 在這裡可以處理刪除帳號失敗的情況
        }
      }); // 關閉對話框
      alert('表單已提交！');

      // 可以在這裡用 HttpClient 發送 API 請求
      // this.http.post('http://api.url', this.myForm.value).subscribe(...)
    } else {
      console.log('表單驗證失敗');
    }
  }
}
