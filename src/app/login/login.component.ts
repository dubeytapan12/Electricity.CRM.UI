import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SecurityService } from '../security/security.service';
import { User } from './User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = new User();
  constructor(private router: Router,
    private securityService:SecurityService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }
  Login(): void {
    this.securityService.Login(this.user).subscribe({
      next: item=> {    
          this.router.navigate(["Home"]);
        },
      error: error=> { 
        alert("invalid username or password");
      }
   });
  }
}
