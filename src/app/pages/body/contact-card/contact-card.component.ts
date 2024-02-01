import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { Router } from '@angular/router';
import { ContactServiceService } from 'src/app/services/contact-service.service';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent {
  
  constructor(private contactService: ContactServiceService, private router: Router){
    console.log(this.contact);
  }

  @Output() cardButtonClick = new EventEmitter<any>();

  @Output() deleteContact = new EventEmitter<any>();

  @Input() contact !: Contact;
  inputField: string = '';

  showDetails: boolean = false;

  updateContact(): void {
    this.router.navigate(['/main/modify-contact-list/', this.contact.id])
  }

  confirmDelete(): void {
    const isConfirmed = window.confirm('Are you sure you want to delete this contact?');
    
    if (isConfirmed) {
      this.deleteClient();
    }
  }

  deleteClient(): void {
    this.contactService.deleteContact(this.contact.id).subscribe( res =>
      this.contactService.getContacts().subscribe(contact =>
        this.deleteContact.emit(contact)
      )
    );
  }

  toggleCardDetails(): void {
    this.showDetails = !this.showDetails;
  }

  showAlert(){
    alert("Contact Info: \nName: " + this.contact.name + "\nMobile Number: " + this.contact.mobilenumber + 
    "\nActive: " + this.contact.isActive + "\nFavourite: " + this.contact.isFavorite +
    "\nDeleted: " + this.contact.isDeleted + "\nDate Created: " + this.contact.contactDateCreated +
    "\nUsername: " + this.contact.username + "\nEmail: " + this.contact.email + "\nComment: " + this.inputField);
  }
}
