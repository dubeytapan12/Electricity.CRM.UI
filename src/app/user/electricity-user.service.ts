import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Biller } from '../add-bill/biller';
import { BillGroup } from '../dashboard/bill-group';
import { ElectricityUser } from '../dashboard/electricity-user';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ElectricityUserService {

  private apiUrl: string = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
}
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
  public GetElectricityUserByType(connectionType: string): Observable<ElectricityUser[]>
  {
    return this.httpClient
      .get<ElectricityUser[]>( `${this.apiUrl}ElectricityUser/users/connectionType/${connectionType}`);
  }
  public GetGroupedBill(): Observable<BillGroup>
  {
    return this.httpClient
      .get<BillGroup>( `${this.apiUrl}ElectricityBillers/get-bill-grouping`);
  }
  updateUser(user: User,connectionType: string): Observable < User > {
    return this.httpClient.put < User > (`${this.apiUrl}ElectricityUser/users/connectionType/${connectionType}`,user);
}

removeUser(id: number,connectionType: string) {
  return this.httpClient.delete <User> (`${this.apiUrl}ElectricityUser/users/connectionType/${connectionType}/id/${id}`);
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
uploadPPTWorld(file:any): Observable<any> {
  // Create form data
  const formData = new FormData();
  // Store form name as "file" with file data
  formData.append('file', file, file.name);
  // Make http post request over api
  // with formData as req
  return this.httpClient.post(`${this.apiUrl}FileUpload/ProjectFile/${ localStorage.getItem("ElectricityUser")}`, formData);
}
}
