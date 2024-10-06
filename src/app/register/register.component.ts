import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterFailedDialogComponent } from '../componetDialog/register-failed-dialog/register-failed-dialog.component';
import { RegisterSuccessfulDialogComponent } from '../componetDialog/register-successful-dialog/register-successful-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  selected = "";

  constructor(public dialog: MatDialog, private router: Router) { }

  form = new FormGroup({
    account: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    major: new FormControl("", Validators.required)
  });

  onclick_register_btn() {
    if (this.form.valid) {  // 確保表單有效
      const info = {
        ...this.form.getRawValue()
      };

      console.log(info);
      console.log(info.major);

      const dialogRef = this.dialog.open(RegisterSuccessfulDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        this.to_login();
      });

    } else {
      this.form.markAllAsTouched();
      const dialogRef = this.dialog.open(RegisterFailedDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }
  to_login() {
    this.router.navigate(['/login']);
  }
}
