import { Component } from '@angular/core';
import { ServerService } from '../server-service/server.service';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent {
  // Constructor
  constructor(private server: ServerService, private router: Router) {}

  // User
  user: User = {
    username: '',
    password: '',
    friends: [],
  };

  // Verifies form errors
  errorMessages(state: NgModel): string[] {
    console.log(state);
    let element: string = state.path.join(',');
    let messages: string[] = [];
    if (state.errors) {
      for (let errorName in state.errors) {
        switch (errorName) {
          case 'required':
            messages.push($localize`The ${element} field is required`);
            break;
          case 'minlength':
            messages.push(`The ${element} field must be at least
    ${state.errors['minlength'].requiredLength}
   characters long`);
            break;
          case 'pattern':
            messages.push(
              `The ${element} field must respect the required format`
            );
            break;
        }
      }
    }
    return messages;
  }

  // Authentication
  authenticate(): void {
    this.server.authenticate();
    this.router.navigate(['../home']);
  }
}
