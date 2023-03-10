import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
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
    children: [
      {
        path: "",
        component: DashboardComponent,
      },
      {
        path: "user",
        component: UserComponent
        ,
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
