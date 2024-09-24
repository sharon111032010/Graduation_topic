import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';


// import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isClass:boolean=false;
  isNull:boolean=false;
  form = new FormGroup({
    account: new FormControl(),
    password: new FormControl()
  });

  constructor(private router:Router,public dialog: MatDialog) { } // <-- 注入router:Router 

  onclick_login_btn(){
    const params = {
      ...this.form.getRawValue()
    }

    if(params.account=="1111032010" &&params.password=="123"){
      alert("ok");
      this.isClass=false;
      console.log(this.isClass);
      this.to_index();
      this.router.navigate(['/index']);
    
    }else{
      // alert("the username or the password is incorrect");
      alert("帳號或密碼錯誤");
      this.isClass=true;
      console.log(this.isClass);
    }

    console.log(params);
  }

  open_forgot_password_dialog(){

    const dialogRef = this.dialog.open(ForgotPasswordDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }



  to_index(){
    this.router.navigate(['/index']);
  }
}
