import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UploadElectricUserComponent } from './upload-electric-user/upload-electric-user.component';
import { AddBillComponent } from './add-bill/add-bill.component';
import { NgChartsModule } from 'ng2-charts';
import { AuthInterceptorInterceptor } from './interceptors/auth-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    UserComponent,
    SpinnerComponent,
    ResetPasswordComponent,
    UploadElectricUserComponent,
    AddBillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true
  },{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
