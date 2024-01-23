import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactServiceService } from '../contact-service.service';
import { Router } from '@angular/router';
import { Contact } from '../models/contact.model';

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
    const contactsTotal = this.contactService.getContacts().length
      const contact = new Contact();
      contact.name = this.model.name;
      contact.mobilenumber = this.model.mobilenumber;
      contact.contactDateCreated = this.model.contactDateCreated;
      contact.isActive = this.model.isActive === "true" ? true : false; 
      contact.isDeleted = this.model.isDeleted === "true" ? true : false; 
      contact.isFavorite = this.model.isFavorite === "true" ? true : false; 
      contact.contactId = 'c' + (contactsTotal+1).toString();

      this.contactService.addContact(contact);
      this.router.navigate(['/main']);
    
  }

}
