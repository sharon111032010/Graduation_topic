import { Component } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
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

  selected = "";

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private userService: UserService
  ) { }

  form = new FormGroup({
    account: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    department: new FormControl<number | null>(null, Validators.required),
    stuId: new FormControl<number | null>(null, Validators.required)
  });

  onSubmit() {
    const registerForm = this.form.getRawValue();

    this.userService.registerApi(registerForm).subscribe(result => {
      // 失敗
      if (!result.isSuccess) {
        return;
      } else {
        const dialogRef = this.dialog.open(RegisterSuccessfulDialogComponent);
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
          this.to_login();
        });
        this.to_login();
      }
      // 成功
      // this.dialog.close();
    });
  }

  onclick_register_btn() {
    if (this.form.valid) {  // 確保表單有效
      const info = {
        ...this.form.getRawValue()
      };

      console.log(info);
      console.log(info.department);
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
