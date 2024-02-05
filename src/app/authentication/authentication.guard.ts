import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router'; 
import { AuthenticationService } from '../services/authentication-service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiresLogin = route.data['requiresLogin'] || false;
    const requiredRole = route.data['requiredRole'];
    if (requiresLogin && !this.authService.isAuthenticated()) {
      this.router.navigate(['/login']); 
      return false;
    }
    return true;
    //return this.isAuthorized(route);
  }

    //DEACTIVATE WHEN USER LEAVES: canDeactivate
    //CanLoad, CanActivateChild



  //   const isAuthorized(route: ActivatedRouteSnapshot): boolean{
  //     const roles = ['Admin', 'User'];
  //     const requiredRole = route.data.requiredRole;
  //     const roleMatches= roles.findIndex(role => requiredRole.indexOf(role)! == -1);
  //     return (roleMatches >= 0) ? true : false; 
  // };

  
}