import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(
    private http: HttpClient
  ) {
    this.authenticatedSubject = new BehaviorSubject<boolean>(false);
    this.authenticated$ = this.authenticatedSubject.asObservable();

    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }
  
  // URLs
    // Local
    private localURL: string = 'http://localhost:3000';

  // Omnipresent attributes : 
    // Boolean checking if the user is authenticated
    authenticated$: Observable<boolean>;
    private authenticatedSubject: BehaviorSubject<boolean>;

    // Current user
    currentUser$: Observable<User | null>;
    private currentUserSubject: BehaviorSubject<User | null>;

  // Authentication
    // Sign In
    signIn(user: User): Observable<User> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.get<User>(`${this.localURL}/signin/${user.username}` , { headers });
    }

    // Sign Up
    signUp(user: User): Observable<User> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<User>(`${this.localURL}/signup`, user, { headers });
    }
}
