import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(

  ) {
    this.authenticatedSubject = new BehaviorSubject<boolean>(false);
    this.authenticated$ = this.authenticatedSubject.asObservable();
  }

  // Attributes needed everywhere
  authenticated$: Observable<boolean>;
  private authenticatedSubject: BehaviorSubject<boolean>;

  // Authentication
  authenticate(): void {
    this.authenticatedSubject.next(true);
  }
}
