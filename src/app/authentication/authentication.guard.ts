import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router'; 
import { AuthenticationService } from '../services/authentication-service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }
  
  canActivate(): boolean {
    //const requiresLogin = route.data['requiresLogin'] || false;
    //const requiredRole = route.data['requiredRole'];
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']); 
      return false;
    }
    return true;
    //return this.isAuthorized(route);
  }

  
}