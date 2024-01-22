import { Component, Input } from '@angular/core';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { Router } from '@angular/router';

interface Contact {
  mobilenumber: string;
  name: string;
  isActive: boolean;
  isFavorite: boolean;
  isDeleted: boolean;
}

@Component({
  selector: 'app-button-alert-desc',
  templateUrl: './button-alert-desc.component.html',
  styleUrls: ['./button-alert-desc.component.scss']
})
export class ButtonAlertDescComponent {
  constructor(private router: Router) {}
  
  @Input()
  contact!: Contact;

  showAlert() {
    if (this.contact) {
      window.alert(`Name: ${this.contact.name}, Mobile Number: ${this.contact.mobilenumber}`);
      const answer = prompt('Add a Leave a note for the service');
      alert('Thank you for your feedback:\n ' +"' "+ answer+" '");
      this.router.navigateByUrl("/info");
   
    } else {
      window.alert('No contact available.');
    }
  }
}
