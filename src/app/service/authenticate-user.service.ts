import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateUserService {

  constructor( private crudService:CrudService) { }
  isLogin=false;
  roleAs?:string;

  getUserInfo(email:string,password:string):Observable<any>{
    return this.crudService.getUserLogin(email,password);
  }
  
  login(role: string) {
    this.isLogin = true;
    this.roleAs = role;
    localStorage.setItem('STATE', 'true');
    localStorage.setItem('ROLE', this.roleAs);
    return of({ success: this.isLogin, role: this.roleAs });
  }

  logout() {
    this.isLogin = false;
    this.roleAs = '';
    localStorage.setItem('STATE', 'false');
    localStorage.setItem('ROLE', '');
    return of({ success: this.isLogin, role: '' });
  }

  isLoggedIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn == 'true')
      this.isLogin = true;
    else
      this.isLogin = false;
    return this.isLogin;
  }

  getRole() {
    this.roleAs = localStorage.getItem('ROLE')!;
    return this.roleAs;
  }

  
}
