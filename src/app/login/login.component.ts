import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router:Router) { } // <-- 注入router:Router 

  onclick_login_btn(){
    const params = {
      ...this.form.getRawValue()
    }

    if(params.account=="123" &&params.password=="123"){
      alert("ok");
      this.isClass=false;
      console.log(this.isClass);
      this.to_index();
      this.router.navigate(['/index']);
    
    }else{
      alert("the username or the password is incorrect");
      this.isClass=true;
      console.log(this.isClass);
    }

    console.log(params);
  }

  to_index(){
    this.router.navigate(['/index']);
  }
}
