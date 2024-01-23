import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactServiceService } from '../contact-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent {
  model: any = {};

  isFormValid: boolean = false;

  constructor(private contactService: ContactServiceService, private router: Router) {}

  
  
  onSubmit(): void {
      const newContact = { ...this.model };
      this.contactService.addContact(newContact);
      this.router.navigate(['/main']);
    
  }

}
