import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
  
  // Omnipresent attributes : 
    // Boolean checking if the user is authenticated
    authenticated$: Observable<boolean>;
    private authenticatedSubject: BehaviorSubject<boolean>;

    // Current user
    currentUser$: Observable<User | null>;
    private currentUserSubject: BehaviorSubject<User | null>;

  // Authentication
  authenticate(user: User): Observable<User> {
    this.http.get<User>(`/fetch/${user.username}`).subscribe(
      {
        next: (requestedUser: User) => {
          console.log(requestedUser);
          if (requestedUser.password === user.password) {
            this.authenticatedSubject.next(true);
            this.currentUserSubject.next(requestedUser);
            return requestedUser;
          }
        },
        error: (error: any) => {
          console.error(error);
        },
        complete: () => {
          console.log('Completed');
        }
      }
    );
  }
}
