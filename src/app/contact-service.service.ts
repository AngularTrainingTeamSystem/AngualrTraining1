import { Injectable } from '@angular/core';
import { Contact, contacts } from 'src/app/models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {
  contacts:Contact[] = contacts;

  constructor() { }

  getContacts(): Contact[] {
    return this.contacts;
  }

  getContactById(id: string): any {
    return contacts.find(contact => contact.contactId === id);
  }

}
