import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBillComponent } from './add-bill/add-bill.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuardGuard } from './guard/auth-guard.guard';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { UploadElectricUserComponent } from './upload-electric-user/upload-electric-user.component';
import { UploadPPTWordComponent } from './upload-pptword/upload-pptword.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "forgot-password/:name/:token",
    component: ResetPasswordComponent,
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
  },
  {
    path: "Home",
    component: HomeComponent,
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: "",
        component: DashboardComponent,
        canActivateChild: [AuthGuardGuard],
      },
      {
        path: "user",
        component: UserComponent,
        canActivateChild: [AuthGuardGuard],
      },
      {
        path: "user-upload",
        component: UploadElectricUserComponent,
        canActivateChild: [AuthGuardGuard],
      },
      {
        path: "upload-ppt-word",
        component: UploadPPTWordComponent,
        canActivateChild: [AuthGuardGuard],
      },
      {
        path: "add-bill",
        component: AddBillComponent,
        canActivateChild: [AuthGuardGuard],
      },
    ],
  },
  {
    path: "**",
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
