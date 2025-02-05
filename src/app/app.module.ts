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
import { MatDialogModule} from '@angular/material/dialog';
import { RegisterFailedDialogComponent } from './componetDialog/register-failed-dialog/register-failed-dialog.component';
import { RegisterSuccessfulDialogComponent } from './componetDialog/register-successful-dialog/register-successful-dialog.component';
import { LoginSuccessfulDialogComponent } from './componetDialog/login-successful-dialog/login-successful-dialog.component';
import { LoginFailedDialogComponent } from './componetDialog/login-failed-dialog/login-failed-dialog.component';
import { FogotCheckDialogComponent } from './componetDialog/fogot-check-dialog/fogot-check-dialog.component';
import { FogotCheckFailedDialogComponent } from './componetDialog/fogot-check-failed-dialog/fogot-check-failed-dialog.component';
import { UserInfoDialogComponent } from './componetDialog/user-info-dialog/user-info-dialog.component';
import { ForgotPasswordDialogComponent } from './componetDialog/forgot-password-dialog/forgot-password-dialog.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
// import { UserInterfaceComponent } from './interface/user-interface/user-interface.component';


@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        IndexComponent,
        RegisterFailedDialogComponent,
        RegisterSuccessfulDialogComponent,
        LoginSuccessfulDialogComponent,
        LoginFailedDialogComponent,
        FogotCheckDialogComponent,
        FogotCheckFailedDialogComponent,
        UserInfoDialogComponent,
        ForgotPasswordDialogComponent
        // UserInterfaceComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        FlexLayoutModule,
        MatSelectModule,
        MatIconModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatDialogModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
