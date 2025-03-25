import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './info-dialog.component.html',
  styleUrl: './info-dialog.component.scss'
})
export class InfoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string ,title:string} // 接收主頁面傳入的字串
  ) {}

}
