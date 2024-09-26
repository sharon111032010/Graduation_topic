import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Component } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './register/register.component';
import {MatIconModule} from '@angular/material/icon';

import {MatSelectModule} from '@angular/material/select';

import { ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { ForgotPasswordDialogComponent } from './componetDialog/forgot-password-dialog/forgot-password-dialog.component';//formGroup會用到
import { MatDialogModule} from '@angular/material/dialog';
import { LoginDialogComponent } from './componetDialog/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './componetDialog/register-dialog/register-dialog.component';
import { RegisterFailedDialogComponent } from './componetDialog/register-failed-dialog/register-failed-dialog.component';
import { RegisterSuccessfulDialogComponent } from './componetDialog/register-successful-dialog/register-successful-dialog.component';
import { LoginSuccessfulDialogComponent } from './componetDialog/login-successful-dialog/login-successful-dialog.component';
import { LoginFailedDialogComponent } from './componetDialog/login-failed-dialog/login-failed-dialog.component';
import { FogotCheckDialogComponent } from './componetDialog/fogot-check-dialog/fogot-check-dialog.component';
import { FogotCheckFailedDialogComponent } from './componetDialog/fogot-check-failed-dialog/fogot-check-failed-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    ForgotPasswordDialogComponent,
    LoginDialogComponent,
    RegisterDialogComponent,
    RegisterFailedDialogComponent,
    RegisterSuccessfulDialogComponent,
    LoginSuccessfulDialogComponent,
    LoginFailedDialogComponent,
    FogotCheckDialogComponent,
    FogotCheckFailedDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatSelectModule,
    MatIconModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
