import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { zipAll } from 'rxjs';
import { FogotCheckDialogComponent } from '../fogot-check-dialog/fogot-check-dialog.component';
import { FogotCheckFailedDialogComponent } from '../fogot-check-failed-dialog/fogot-check-failed-dialog.component';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.scss']
})
export class ForgotPasswordDialogComponent {
  constructor(public dialog: MatDialog) { }
  forgot_group = new FormGroup({
    forgot_stuId: new FormControl("", Validators.required),
    forgot_email: new FormControl("", [Validators.required, Validators.email])
  })
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
