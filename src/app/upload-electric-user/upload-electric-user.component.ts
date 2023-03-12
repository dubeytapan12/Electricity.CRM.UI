import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, map, of } from 'rxjs';
import { ElectricityUserService } from '../user/electricity-user.service';

@Component({
  selector: 'app-upload-electric-user',
  templateUrl: './upload-electric-user.component.html',
  styleUrls: ['./upload-electric-user.component.css']
})
export class UploadElectricUserComponent implements OnInit {
  
  loading: boolean = false; // Flag variable
  file: File = {} as File; // Variable to store file to Upload
  // Inject service 
  constructor(private fileUploadService: ElectricityUserService) { }

  ngOnInit(): void {
  }
  // On file Select
  onChange(event:any) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    if (this.file) {
      this.loading = !this.loading;
      console.log(this.file);
      this.fileUploadService.upload(this.file).subscribe((event: any) => {
        if (typeof event === 'object') {
          // Short link via api response
          this.loading = false; // Flag variable
        }
        alert('uploaded succssfuly and sent email');
      });
    }
  }
}
