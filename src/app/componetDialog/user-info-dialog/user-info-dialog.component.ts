// 使用者資訊對話框組件
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

export interface UserInfoData {
  userName: string;
  userId: string;
  userEmail: string;
  userDepartment: string;
  userGrade: string;
}

@Component({
  selector: 'app-user-info-dialog',
  templateUrl: './user-info-dialog.component.html',
  styleUrls: ['./user-info-dialog.component.scss']
})
export class UserInfoDialogComponent {
  
  userData: UserInfoData;

  constructor(
    public dialogRef: MatDialogRef<UserInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfoData,
    private router: Router
  ) {
    this.userData = data;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  logout(): void {
    this.dialogRef.close();
    this.router.navigate(['/loginPage']);
  }
}
