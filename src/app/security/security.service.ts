import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../login/User';
import { SecurityModel } from './SecurityModel';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private apiUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}
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
  public getUserDetails(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}userdetails`);
  }
  public clearSecurityModel() {
    this.securityModel = {
     access_Token:'',
     refresh_Token:''
    };
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
          } else {
            this.clearSecurityModel();
          }
        })
      );
  }
}
