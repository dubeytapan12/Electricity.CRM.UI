import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../login/User';
import { SecurityModel } from './SecurityModel';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ResetUser } from '../resetUser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private apiUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient,private router: Router) {}
  private _securityModel: SecurityModel = new SecurityModel();
  get securityModel() {
    return this._securityModel;
  }
  set securityModel(value: SecurityModel) {
    this._securityModel = value;
  }
  public logout() {
    this.clearSecurityModel();
    sessionStorage.removeItem("ElectricityBearerToken");
    sessionStorage.removeItem("ElectricityRefreshToken");
  }
  public IsValidUser(username: string | null, token: string | null): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
          "Content-Type": "application/json"
      })
    };
    return this.httpClient.get<any>(`${this.apiUrl}Users/valid-user/${username}/${token}`,
    httpOptions);
  }
  public getUserDetails(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}userdetails`);
  }
  public clearSecurityModel() {
    this.securityModel = {
     access_Token:'',
     refresh_Token:''
    };
    localStorage.removeItem("ElectricityUser");
    sessionStorage.removeItem("ElectricityBearerToken");
    sessionStorage.removeItem("ElectricityRefreshToken");
  }

  public ResetPassword(resetItem:ResetUser)  {
return this.httpClient.post(`${this.apiUrl}Users/reset-password`,resetItem);
  }
public RefreshToken() : any {
  if(sessionStorage.getItem('ElectricityBearerToken')){
  var refreshToken = { 'access_Token': sessionStorage.getItem('ElectricityBearerToken')?.toString(),'refresh_Token': sessionStorage.getItem('ElectricityRefreshToken')?.toString()};
  return this.httpClient.post(`${this.apiUrl}Users/refresh`,refreshToken).pipe(
    tap((result) => {
      this.clearSecurityModel();
      Object.assign(this.securityModel, result);
      //Now check if Authenticated is true store token in sessionStorage
      if (this.securityModel.access_Token && this.securityModel.refresh_Token) {
        sessionStorage.setItem(
          "ElectricityBearerToken",
          this.securityModel.access_Token
        );
        sessionStorage.setItem(
          "ElectricityRefreshToken",
          this.securityModel.refresh_Token
        );
      } else {
        this.clearSecurityModel();
      }
    })
  );
  }
  else {
    this.router.navigate([""]);
    return of(null);
  }
}
  public ForgotPassword(userName: string) {
    return this.httpClient.get(`${this.apiUrl}Users/forgot-password/${userName}`)
  }
  public Login(userForm: User): Observable<SecurityModel> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.httpClient
      .post<SecurityModel>(
        `${this.apiUrl}Users/authenticate`,
        userForm,
        httpOptions
      )
      .pipe(
        tap((result) => {
          this.clearSecurityModel();
          Object.assign(this.securityModel, result);
          //Now check if Authenticated is true store token in sessionStorage
          if (this.securityModel.access_Token && this.securityModel.refresh_Token) {
            sessionStorage.setItem(
              "ElectricityBearerToken",
              this.securityModel.access_Token
            );
            sessionStorage.setItem(
              "ElectricityRefreshToken",
              this.securityModel.refresh_Token
            );
            localStorage.setItem("ElectricityUser",userForm.userName);
          } else {
            this.clearSecurityModel();
          }
        })
      );
  }
}
