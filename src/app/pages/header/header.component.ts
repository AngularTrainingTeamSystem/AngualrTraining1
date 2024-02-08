import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ContactServiceService } from 'src/app/services/contact-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  @Output() search = new EventEmitter();

  selectedValue: string = 'main';

  constructor(private router: Router, public authService: AuthServiceService, private contactService: ContactServiceService) {}
  
  onDropdownChange(event: any): void {
    const selectedValue = event.target.value;
    this.router.navigate(['/' + selectedValue]);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/log-in']);
  }

  confirmLogOut(): void {
    const isConfirmed = window.confirm('Are you sure you want to Log Out?');

    if (isConfirmed) {
      this.logout();
    }
  }
  
}
