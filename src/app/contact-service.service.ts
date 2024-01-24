import { Injectable } from '@angular/core';
import { Contact, contacts } from 'src/app/models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {
  contacts: Contact[] = contacts;

  constructor() { }

  getContacts(): Contact[] {
    return this.contacts;
  }

  getContactById(id: string): any {
    return  this.contacts.find(contact => contact.contactId === id);
  }

  isUsernameTaken(username: string): boolean {
    return this.contacts.some(contact => contact.username === username);
  }
  
  isEmailTaken(email: string): boolean {
    return this.contacts.some(contact => contact.email === email);
  }
  
  addContact(newContact: Contact): void {
        this.contacts.push(newContact);
  }

  updateContact(updatedContact: Contact): void {
    const index = this.contacts.findIndex(contact => contact.contactId === updatedContact.contactId);
    if (index !== -1) {
      this.contacts[index] = updatedContact;
    }
  }

  deleteContact(contactId: string): void {
    this.contacts = this.contacts.filter(contact => contact.contactId !== contactId);
    console.log(this.contacts);
  }

}
