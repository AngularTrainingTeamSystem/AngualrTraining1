import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Contacts } from '../models/contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
 

  constructor() { 
   
  }

  private contacts:Contact[]=Contacts.contacts;

  getContacts(){
    return this.contacts
  }
  getContactById(id:string){
   return this.contacts.find(contact => contact.contactId === id);
  }

  updateContact(contact:Contact){
    let index=Contacts.contacts.findIndex(c=>c.contactId===contact.contactId)
    
   Contacts.contacts[index]=contact;
    
  }
  addContact(newContact: Contact) {
    
    newContact.contactId="c"+(Number(Contacts.contacts[Contacts.contacts.length-1].contactId.substring(1))+1);
    
    Contacts.contacts.push(newContact)
  }
  deleteContactById(contactId: string) {
    let contactToBeDeleted=this.contacts.find(contact => contact.contactId === contactId)
   let doDelete=confirm("Are you sure you want to deleted the contact:\n"+
   contactToBeDeleted?.name+" "+contactToBeDeleted?.mobilenumber)
    if(doDelete){
      let index=Contacts.contacts.findIndex(contact=>contact.contactId===contactId)
   Contacts.contacts.splice(index,1)}
   
  }
}
