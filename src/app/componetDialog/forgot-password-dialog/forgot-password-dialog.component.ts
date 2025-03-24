import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { zipAll } from 'rxjs';
import { FogotCheckDialogComponent } from '../fogot-check-dialog/fogot-check-dialog.component';
import { FogotCheckFailedDialogComponent } from '../fogot-check-failed-dialog/fogot-check-failed-dialog.component';
import { UserService } from '../../user.service';
import { ForgetPasswordService } from 'src/app/forget-password.service';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.scss']
})
export class ForgotPasswordDialogComponent {
  constructor(public dialog: MatDialog,
    private userService: UserService,
    private forgetPasswordService: ForgetPasswordService
  ) { }

  forgot_group = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    account: new FormControl("", Validators.required)
  })

  onForgetPassword() {
    const form = this.forgot_group.getRawValue();
    console.log(form);
    this.forgetPasswordService.requestPasswordReset(form).subscribe(result => {
      if (!result.isSuccess) {
        this.forgot_group.markAllAsTouched();  // 標記所有欄位為 touched，顯示錯誤
        this.dialog.open(FogotCheckFailedDialogComponent, {
          disableClose: false,  // 保留原對話框

          // 打開 forgot-password再次打開 forgot-check-dialog

        }

      ); // 打開錯誤對話框
      } else {
        this.dialog.open(FogotCheckDialogComponent, {
          disableClose: false,  // 保留原對話框
        });
      }




    });

  }
  sant_change_email() {
    if (this.forgot_group.valid) {
      const info = {
        ...this.forgot_group.getRawValue()
      };



      // 打開新的對話框，保持原對話框開啟
      this.dialog.open(FogotCheckDialogComponent, {});

      // 顯示學號和郵件信息
      // alert(`學號: ${info.forgot_stuId}\n郵件: ${info.forgot_email}`);
    } else {
      this.forgot_group.markAllAsTouched();  // 標記所有欄位為 touched，顯示錯誤
      this.dialog.open(FogotCheckFailedDialogComponent, {}); // 打開錯誤對話框
    }
  }
}
