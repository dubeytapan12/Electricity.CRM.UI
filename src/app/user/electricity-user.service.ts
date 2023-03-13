import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Biller } from '../add-bill/biller';
import { BillGroup } from '../dashboard/bill-group';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ElectricityUserService {

  private apiUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  public saveBill(billUser:Biller) {
    return this.httpClient
    .post<any>(
      `${this.apiUrl}ElectricityBillers/save-bill`,
      billUser
    );
  }
  public SaveUser(userForm: User, connectionType: string) {
    
    return this.httpClient
      .post<any>(
        `${this.apiUrl}ElectricityUser/users/connectionType/${connectionType}`,
        userForm
      );
  }
  public GetGroupedBill(): Observable<BillGroup>
  {
    return this.httpClient
      .get<BillGroup>( `${this.apiUrl}ElectricityBillers/get-bill-grouping`);
  }
  public GetUsers(connectionType:string): Observable<User[]>
  {
    //ElectricityUser/users/connectionType/2332
   return this.httpClient
      .get<User[]>( `${this.apiUrl}ElectricityUser/users/connectionType/${connectionType}`);
  }
// Returns an observable
upload(file:any): Observable<any> {
  // Create form data
  const formData = new FormData();
  // Store form name as "file" with file data
  formData.append('file', file, file.name);
  // Make http post request over api
  // with formData as req
  return this.httpClient.post(`${this.apiUrl}FileUpload/${ localStorage.getItem("ElectricityUser")}`, formData);
}
}
