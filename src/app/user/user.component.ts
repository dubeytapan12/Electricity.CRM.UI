import { Component, OnInit } from '@angular/core';
import { ElectricityUserService } from './electricity-user.service';
import { User } from './user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user:User = new User();
  connectionType:string = 'commercial';
  constructor(private electricityUserService:ElectricityUserService) { }

  ngOnInit(): void {
  }
  SaveUserData() : void {
    this.electricityUserService.SaveUser(this.user,this.connectionType).subscribe({
      next: item=> {
        alert('data saved succesfuly');
        this.user = new User();
      },
      error: error=> {
      alert(error);
      }
    });
  }
}
