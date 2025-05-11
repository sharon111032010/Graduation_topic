import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [MatButtonModule,MatInputModule,MatIconModule,ReactiveFormsModule,],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  
  // 或者，使用驚嘆號符號告訴 TypeScript 這個屬性會在後面初始化
  // loginForm!: FormGroup;
  
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    // 如果使用驚嘆號方法，可以在這裡初始化
    // this.loginForm = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   password: ['', Validators.required]
    // });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    
    // 在此處理登入邏輯
    // 以下為模擬登入過程
    setTimeout(() => {
      // 登入成功，轉導至首頁
      this.router.navigate(['/dashboard']);
      this.loading = false;
    }, 1500);
  }

  loginWithGoogle() {
    this.loading = true;
    
    // 在此處理 Google 登入邏輯
    // 以下為模擬 Google 登入過程
    setTimeout(() => {
      // 登入成功，轉導至首頁
      this.router.navigate(['/dashboard']);
      this.loading = false;
    }, 1500);
  }
}
