import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router'; 
import { AuthenticationService } from '../services/authentication-service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiresLogin = route.data['requiresLogin'] || false; const requiredRole = route.data['requiredRole'];
    if (requiresLogin && !this.authService.isAuthenticated()) {
      //this.router.navigate(['/login']); 
      return false;
    }
    if (requiredRole && !this.authService.isAuthorized(requiredRole)) { 
      //this.router.navigate(['/login']); 
    }
    return true;
  }
}