import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ResetUser } from '../resetUser';
import { SecurityService } from '../security/security.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  isAllowReset: boolean = false;
  password: string = '';
  username: string | null = '';
  token: string | null = '';
  constructor(private route: ActivatedRoute, private securityService: SecurityService,private router: Router) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('name');
    this.token = this.route.snapshot.paramMap.get('token');
    this.securityService.IsValidUser(this.username,this.token).subscribe({
      next: item=> {    
        this.isAllowReset = item;
        },
      error: error=> { 
        alert("error while getting forgot user data!");
      }
   });
   }
   ForgotPassword(): void {
    
   }
   Reset(): void {
    var item: ResetUser = { userName: this.username,password: this.password, token: this.token };
    this.securityService.ResetPassword(item).subscribe({
      next: item=> {    
          alert('password updated succesfuly');
          this.router.navigate([""]);
        },
      error: error=> { 
        alert("error while reseting password");
      }
   });
   }

}
