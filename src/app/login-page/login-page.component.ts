import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FormControl, FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginFailedDialogComponent } from '../componetDialog/login-failed-dialog/login-failed-dialog.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [MatButtonModule,MatInputModule,MatIconModule,ReactiveFormsModule,CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    // username: ['', Validators.required],
    stdId: ['', Validators.required],
    password: ['', Validators.required]
  });
  
  form = new FormGroup({
    stuId: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  // 或者，使用驚嘆號符號告訴 TypeScript 這個屬性會在後面初始化
  // loginForm!: FormGroup;
  
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService ,//用於呼叫API
    public dialog: MatDialog,//用於開啟對話框 (MatDialog)
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
    //copy
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // 標記欄位錯誤
      this.dialog.open(LoginFailedDialogComponent, {}); // 顯示錯誤對話框
      return;
    }
    // 此
    if (this.loginForm.invalid) {
      this.dialog.open(LoginFailedDialogComponent, {}); // 顯示錯誤對話框
      return;
    }
    //取得值
    const loginform = this.form.getRawValue();
    //呼叫api
    this.userService.loginApi(loginform).subscribe({
      next :(result) =>{
        if(!result.isSuccess){
          this.dialog.open(LoginFailedDialogComponent,{});
          return;
        }
        //存入jwt
        localStorage.setItem('jwt',result.token);

        this.dialog.open(LoginFailedDialogComponent,{}).afterClosed().subscribe(()=>{
          this.router.navigate(['/chatPage']);
        });
      },
      error:()=>{
        this.dialog.open(LoginFailedDialogComponent,{});
      }
    })

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
