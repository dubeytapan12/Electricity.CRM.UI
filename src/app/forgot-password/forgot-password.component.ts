import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ResetUser } from '../resetUser';
import { SecurityService } from '../security/security.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  username: string = '';
  token: string | null = '';
  constructor(private route: ActivatedRoute, private securityService: SecurityService,private router: Router) { }

  ngOnInit(): void {
    
   }
   ForgotPassword(): void {
    if(!this.username)
    {
      alert('Please enter user name, under user textbox and than click forgot password');
      return;
    }
    this.securityService.ForgotPassword(this.username).subscribe({
      next: item=> {    
          alert('an email sent successfuly, Please check your email to reset password');
        },
      error: error=> { 
         alert('an email sent successfuly, Please check your email to reset password');
      }
   });
   }
}
