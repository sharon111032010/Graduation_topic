import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';

@Component({
  selector: 'app-fogot-check-failed-dialog',
  templateUrl: './fogot-check-failed-dialog.component.html',
  styleUrls: ['./fogot-check-failed-dialog.component.scss']
})
export class FogotCheckFailedDialogComponent {
  //  打開錯誤對話框  
  constructor(
    public dialog: MatDialog,
   ) { }
  open_forgot_password_dialog() {
    const dialogRef = this.dialog.open(ForgotPasswordDialogComponent, {
      width: '35vw',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
