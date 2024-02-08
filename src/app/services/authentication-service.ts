import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() { }

  //private url = 'http://localhost:3000';

  register(user: any): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.some((existingUser: any) => existingUser.email === user.email);
    if (userExists) {
      return false;
    }
    user.role = user.userType === 'admin' ? 'admin' : 'user';  
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  //  post for register
  //  register(user: any): Observable<boolean> {
  //   return this.http.post<boolean>(`${this.url}/signup`, user).pipe(
  //     tap((success: boolean) => {
  //       if (success) {
  //         console.log('Registration successful.');
  //       } else {
  //         console.log('Registration failed. User already exists.');
  //       }
  //     })
  //   );
  // }
  

  login({ email, password }: { email: string; password: string }): any {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }
    return null;
  }

  // Sane task but; post -> api
  // login(email: string, password: string): Observable<any> {
  //   return this.http.get<any[]>(`${this.url}/login/?email=${email}&password=${password}`).pipe(
  //     tap((users: any[]) => {
  //       if (users.length === 1) {
  //         console.log(`Login successful for user: ${users[0].name}`);
  //         localStorage.setItem('currentUser', JSON.stringify(users[0]));
  //       } else {
  //         console.log('Login failed. User not found or invalid credentials.');
  //       }
  //     })
  //   );
  // }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  currentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  isAuthorized(requiredRole: string): boolean {
    const user = this.currentUser();
    return user.role === requiredRole;
  }

  isAdmin(): boolean {
    const user = this.currentUser();
    return user.role === 'admin';
  }

  isUser(): boolean {
    const user = this.currentUser();
    return user.role === 'user';
  }

}
