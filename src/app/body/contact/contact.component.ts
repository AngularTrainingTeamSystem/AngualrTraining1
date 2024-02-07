import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../models/contact';
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { catchError } from 'rxjs';
import { UserRole } from 'src/app/models/userRole.enum';

@Component({
   selector: 'app-contact',
   templateUrl: './contact.component.html',
   styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

   constructor(private contactService: ContactService, 
               private router: Router,
               private authService: AuthenticationService) {

   }
   @Input('contactDisplayed')
   contact!: Contact;
   comment!: string;

   @Output()
   buttonClicked = new EventEmitter();

   @Output()
   sendContact = new EventEmitter()

   @Output()
   contactWasDeleted = new EventEmitter()

   deleteContact() {
      if (confirm("Are you sure you want to delete this contact:\nName:" + this.contact.name)) {
         this.contactService.deleteContactById(this.contact.id).subscribe(
            {
               next: () => {
                  this.contactWasDeleted.emit()
               },
               error: (e) => {
                 console.log(e);
               }
             })
      }
      return
   }
   sendContactToBody() { //sends the contact obj to body component 
      this.sendContact.emit(this.contact)
   }
   isAdmin(){
      return this.authService.getRole()==UserRole.ADMIN
   }
}
