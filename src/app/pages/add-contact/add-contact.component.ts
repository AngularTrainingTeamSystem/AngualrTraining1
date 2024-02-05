import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactServiceService } from '../../services/contact-service.service';
import { Router } from '@angular/router';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent {
  model: any = {};
  isUsernameTaken: boolean = false;
  isEmailTaken: boolean = false;

  constructor(private contactService: ContactServiceService, private router: Router) { }

  // checkUsernameValidity(): void {
  //   this.isUsernameTaken = this.contactService.isUsernameTaken(this.model.username);
  // }

  // checkEmailValidity(): void {
  //   this.isEmailTaken = this.contactService.isEmailTaken(this.model.email);
  // }

  onSubmit(form: NgForm): void {
    if (form.valid && !this.isUsernameTaken && !this.isEmailTaken) {

      const contact = new Contact();
      contact.name = this.model.name;
      contact.mobilenumber = this.model.mobilenumber;
      contact.contactDateCreated = this.model.contactDateCreated;
      contact.isActive = this.model.isActive === "true" ? true : false;
      contact.isDeleted = this.model.isDeleted === "true" ? true : false;
      contact.isFavorite = this.model.isFavorite === "true" ? true : false;
      contact.username = this.model.username;
      contact.email = this.model.email;

      this.contactService.addContact(contact);
      this.router.navigate(['/main']);
    }
  }
}
