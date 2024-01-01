import { Component, OnInit } from '@angular/core';
import { ServerService } from './server-service/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'penpals';

  // Constructor
  constructor(
    private server: ServerService
  ) {}

  authenticated: boolean = false;

  ngOnInit(): void {
    this.server.authenticated$.subscribe(authenticated => this.authenticated = authenticated);
  }
}
