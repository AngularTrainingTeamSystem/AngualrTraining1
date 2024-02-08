// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService{
  private userUrl = 'http://localhost:3000/user';

  constructor(private router: Router, private http: HttpClient) { }

  // deprected-> returns observable that emits error msg
  isEmailTaken(email: string): Observable<boolean> {
    return this.getUsers().pipe(
      map(users => users.some(user => user.email === email)),
      catchError(() => {
        return new Observable<boolean>((observer) => {
          observer.error('Failed to check email availability.'); //throwError('Failed to check email availability.'
        });
      })
    );
  }

  // in new v of RXJS observable constuctor w error observer
  signUp(user: any): Observable<boolean> {
    return this.isEmailTaken(user.email).pipe(
      switchMap(emailTaken => {
        if (emailTaken) {
          return new Observable<boolean>((observer) => {
            observer.error('Email is already taken.');
          });
        } else {
          return this.http.post<void>(this.userUrl, user).pipe(
            map(() => true),
            catchError(() => {
              return new Observable<boolean>((observer) => {
                observer.error('Registration failed. Please try again.');
              });
            })
          );
        }
      })
    );
  }

  login(credentials: { email: string, password: string }): Observable<void> {
    return this.getUsers().pipe(
      map((users: any[]) => {
        console.log('Fetched users:', users);
  
        const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
        console.log('Found user:', user);
  
        if (user) {
          console.log('Login successful!');
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigate(['/users']); 
        } else {
          console.log('Invalid credentials');
        }
      })
    );

  }

  getCurrentUser(): any {
    const user = sessionStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  private getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.userUrl}`);
  }
}
