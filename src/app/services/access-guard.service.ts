import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { CanActivate, Router } from '@angular/router';
import { UserRole } from '../models/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class AccessGuardService implements CanActivate {
  
  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.getRole() === UserRole.Admin) {
      return true;
    } else {
      this.router.navigate(['/main']);
      return false;
    }
  }
}