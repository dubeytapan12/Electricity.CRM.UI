import { Component, OnInit } from '@angular/core';
import { ElectricityUserService } from '../user/electricity-user.service';

@Component({
  selector: 'app-upload-pptword',
  templateUrl: './upload-pptword.component.html',
  styleUrls: ['./upload-pptword.component.css']
})
export class UploadPPTWordComponent implements OnInit {

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
      this.fileUploadService.uploadPPTWorld(this.file).subscribe({
        next: result=> alert('uploaded succesfuly!'),
        error: result=> alert('uploaded succesfuly!'),
      });
    }
  }
}
