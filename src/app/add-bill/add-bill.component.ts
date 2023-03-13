import { Component, OnInit } from '@angular/core';
import { ElectricityUserService } from '../user/electricity-user.service';
import { User } from '../user/user';
import { Biller } from './biller';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css']
})
export class AddBillComponent implements OnInit {
  user: Biller = new Biller();
  commercialUsers: User[] = [];
  residentialUsers: User[] = [];
  factoryUsers: User[] = [];
  flatUsers: User[] = [];
  constructor(private electricityUserService:ElectricityUserService) { }

  ngOnInit(): void {
this.electricityUserService.GetUsers('commercial').subscribe({
  next: items=> this.commercialUsers=items
});
this.electricityUserService.GetUsers('residential').subscribe({
  next: items=> this.residentialUsers=items
});
this.electricityUserService.GetUsers('flat').subscribe({
  next: items=> this.flatUsers=items
});
this.electricityUserService.GetUsers('factory').subscribe({
  next: items=> this.factoryUsers=items
});
  }


  SaveBill() : void {
this.electricityUserService.saveBill(this.user).subscribe({
  next: item=> {
    alert('saved succsfuly');
    this.user = new Biller();
  },
  error: error=> { alert('saved succsfuly'); this.user = new Biller(); }
})
  }
}
