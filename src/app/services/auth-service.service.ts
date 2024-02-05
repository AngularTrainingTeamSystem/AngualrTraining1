import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  signup(user: any): Observable<any> {
    return this.http.post(`${this.url}/user`, user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.url}/user/?email=${email}&password=${password}`).pipe(
      tap((users: any[]) => {
        if (users.length === 1) {
          console.log(`Login successful for user: ${users[0].name}`);
          // Store user information in local storage.
          localStorage.setItem('currentUser', JSON.stringify(users[0]));
        } else {
          console.log('Login failed. User not found or invalid credentials.');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  getRole(): string | null {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser.role || null;
  }
}
