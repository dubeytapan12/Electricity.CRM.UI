import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from './security/security.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router,public securityService:SecurityService) {}
  Logout() {
    this.securityService.logout();
    this.router.navigate([""]);
  }
}
