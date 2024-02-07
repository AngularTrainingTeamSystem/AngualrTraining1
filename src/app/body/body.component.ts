import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Contact } from '../models/contact';
import { AppComponent } from '../app.component';
import { Contacts } from '../models/contacts';
import { ContactService } from '../services/contact.service';
import { ContactFilterPipe } from '../pipes/contact-filter.pipe';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { UserRole } from '../models/userRole.enum';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit{
  constructor(private contactService:ContactService,
   private router :Router,
    private authService:AuthenticationService){

  }
   
  
  contacts!:any
  contact?:Contact |null //contact obj that will be passed to contact diplayer component

  
   @Input()
   searchString!:string;
   @Output() 
   showContactButtonClicked=new EventEmitter();

   ngOnInit(): void {
      this.updateContactList()
   }

   updateContactList(){
      this.contacts=this.contactService.getContacts()
   }
   buttonClicked(contact: Contact){
      this.showContactButtonClicked.emit(contact);
   }

   inputContact(event:Contact){
      this.contact=event
   }
   logout(){
      this.authService.logout()
      this.router.navigate(['login'])
   }
   isAdmin(){
      return this.authService.getRole()==UserRole.ADMIN
   }
  
   }

   

