import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../models/contact';
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
 
  constructor (private contactService:ContactService,private router :Router){

  }
  @Input('contactDisplayed')
  contact!:Contact;


  comment!:string;

 @Output()
 buttonClicked=new EventEmitter();

 @Output()
 sendContact=new EventEmitter()


 deleteContact(){
  
    this.contactService.deleteContactById(this.contact.contactId)
    
    this.router.navigate(['/main'])
 }

 sendContactToBody(){ //sends the contact obj to body component 
    this.sendContact.emit(this.contact)
 }
}
