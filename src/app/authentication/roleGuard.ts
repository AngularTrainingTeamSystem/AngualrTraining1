import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole = route.data['requiredRole'];

    if (requiredRole) {
      const currentUserRole = this.authService.currentUser().role;
      if (Array.isArray(requiredRole)) {
        if (!requiredRole.includes(currentUserRole)) {
          this.router.navigate(['/users']); 
          return false;
        }
      } else {
        if (currentUserRole !== requiredRole) {
          this.router.navigate(['/users']); 
          return false;
        }
      }
    }

    return true;
  }
}
