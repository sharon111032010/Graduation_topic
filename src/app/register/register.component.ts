import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule,FormGroup} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  selected="";

  form= new FormGroup({
    account: new FormControl(""),
    password:new FormControl(""),
    email:new FormControl(""),
    phone :new FormControl(""),
    name :new FormControl(""),
    major:new FormControl("")
  })
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  onclick_register_btn(){
    const info = {
      ...this.form.getRawValue()
    }

    // console.log(info.account,info.password,info.email,info.major);
    console.log(info);
    console.log(info.major);
    alert("");
  }
}
