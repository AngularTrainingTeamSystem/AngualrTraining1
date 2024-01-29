import { Injectable, Input } from '@angular/core';
import { Contact } from '../model/contat';
import { Contacts } from '../contacts-db';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  @Input()
  updateContacts! : any;

  // getContactById(contactId: any) {
  //   this.updateContacts = this.router.getCurrentNavigation()?.extras.state;
  // }


  contacts : Contact[] = Contacts.CONTACTS;
  

  

  constructor(private route: ActivatedRoute, private router:Router) {

   }

  addContact(contact : Contact){
      this.contacts.push(contact);
      console.log(Contacts.CONTACTS)
  }

  getContactById(id:string){
    return this.contacts.find(contact => contact.contactId === id);
   }

  getAllContacts(){
    return this.contacts;
  }

  updateContact(updateContact : Contact){
    const indexId = this.contacts.findIndex(contact => contact.contactId === updateContact.contactId);
   
      if (indexId !== -1) {
        Contacts.CONTACTS[indexId] = updateContact;
      }
  }


   hasEmail(emailToCheck: string): boolean {
    return this.contacts.some((contact) => contact.email === emailToCheck);
  }
   hasUsername(usernameToCheck: string): boolean {
    return this.contacts.some((contact) => contact.username === usernameToCheck);
  }

  




  deleteContactById(contactId: string) {
    let contactToBeDeleted=this.contacts.find(contact => contact.contactId === contactId)
   let doDelete=confirm("Are you sure you want to deleted the contact:\n"+
   contactToBeDeleted?.name+" "+contactToBeDeleted?.mobilenumber)
    if(doDelete){
      let index=Contacts.CONTACTS.findIndex((contact: { contactId: string; })=>contact.contactId===contactId)
    Contacts.CONTACTS.splice(index,1)}
   
  }

  

}
