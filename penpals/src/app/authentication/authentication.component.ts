import { Component } from '@angular/core';
import { ServerService } from '../server-service/server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {

  // Constructor
  constructor(
    private server: ServerService,
    private router: Router
  ) {}

  // Form variables
  username: string = '';
  password: string = '';

  // Authentication
  authenticate(): void {
    this.server.authenticate();
    this.router.navigate(['../home']);
  }
}
