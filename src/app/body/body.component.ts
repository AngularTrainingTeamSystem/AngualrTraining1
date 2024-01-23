import { Component } from '@angular/core';
import { Contact, contacts } from 'src/app/models/contact.model';
import { ContactServiceService } from '../contact-service.service';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {

  contacts!: Contact[];
  searchTerm: string = '';

  constructor(private contactsService: ContactServiceService){
    this.contacts = this.contactsService.getContacts().filter(contact => !contact.isDeleted);
  }
  
  showAlert(contactInfo: { name: string; mobilenumber: string, comment: string}): void {
    alert(`Name: ${contactInfo.name}, Number: ${contactInfo.mobilenumber} \nComment: ${contactInfo.comment}`);
  }
}
