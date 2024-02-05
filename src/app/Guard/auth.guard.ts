import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginFormComponent } from '../login-form/login-form.component';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private service : AuthService , private router : Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // return this.service.loggedIn
    
    return this.userCheck()

 
  
}


userCheck(){
  if(this.service.loggedIn){
    return true;
  }else{
    this.router.navigate(['/login'])
    return false;
  }
}



 
}
