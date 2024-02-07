import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private userService:UserService) {}
  
  login(role: string) {
    localStorage.setItem('STATE', 'true');
    localStorage.setItem('ROLE', role);
  }
  logout() {
    localStorage.clear()
  }
  isLoggedIn() {
    return localStorage.getItem('STATE');
  }
  getRole() {
    return localStorage.getItem('ROLE')!;
  }
  getUserByEmailAndPassword(email:string,password:string):Observable<any>{
    return this.userService.loadUserByCredentials(email,password)  
  }
}
