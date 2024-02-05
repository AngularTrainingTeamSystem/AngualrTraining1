import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() { }

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

  login({ email, password }: { email: string; password: string }): any {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }
    return null;
  }

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
}
