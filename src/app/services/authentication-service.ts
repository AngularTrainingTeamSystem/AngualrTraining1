// authentication.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private role = new BehaviorSubject<string>(''); 

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get userRole(): Observable<string> {
    return this.role.asObservable();
  }

  get hasRoleAdmin(): Observable<boolean> {
    return this.userRole.pipe(map(role => role === 'admin'));
  }

  login(credentials: { email: string, password: string }): void {
    this.loggedIn.next(true);
    const userRole = this.determineUserRole(credentials.email);
    this.role.next(userRole);
  }
  private determineUserRole(email: string): string {
    return 'user';
  }
}

