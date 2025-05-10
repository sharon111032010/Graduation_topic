import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { IndexComponent } from './index/index.component';

import { authGuard } from './auth.guard'; // ✅ 引入 authGuard
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ChatPageComponent } from './chat-page/chat-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'chatPage', component: ChatPageComponent},
  { 
    path: 'index', 
    component: IndexComponent,
    canActivate: [authGuard] // ✅ 這裡加入 authGuard，只有登入的人才能進入
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // ✅ 預設導向登入頁面
  { path: '**', redirectTo: '/login' } // ✅ 其他未定義路由，全部跳轉到登入
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
