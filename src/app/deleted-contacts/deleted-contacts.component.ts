import { Component } from '@angular/core';
import { Contact } from '../models/contact.model';
import { ContactServiceService } from '../contact-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deleted-contacts',
  templateUrl: './deleted-contacts.component.html',
  styleUrls: ['./deleted-contacts.component.scss']
})
export class DeletedContactsComponent {

  contacts!: Contact[];
  searchTerm: string = '';

  constructor(private contactsService: ContactServiceService, private router: Router){
  }
  ngOnInit(): void {
    this.contacts = this.contactsService.getContacts();
  }

  updateList(contact: Contact[]){
    this.contacts = contact;
  }
  
  showAlert(contactInfo: { name: string; mobilenumber: string, comment: string}): void {
    alert(`Name: ${contactInfo.name}, Number: ${contactInfo.mobilenumber} \nComment: ${contactInfo.comment}`);
  }
}
