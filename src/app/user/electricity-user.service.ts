import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ElectricityUserService {

  private apiUrl: string = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  public SaveUser(userForm: User, connectionType: string) {
    
    return this.httpClient
      .post<any>(
        `${this.apiUrl}ElectricityUser/users/connectionType/${connectionType}`,
        userForm
      );
  }
  
// Returns an observable
upload(file:any): Observable<any> {
  // Create form data
  const formData = new FormData();
  // Store form name as "file" with file data
  formData.append('file', file, file.name);
  // Make http post request over api
  // with formData as req
  return this.httpClient.post(`${this.apiUrl}FileUpload/${ sessionStorage.getItem("ElectricityUser")}`, formData);
}
}
