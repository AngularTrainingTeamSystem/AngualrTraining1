import { Component } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { ContactServiceService } from '../../services/contact-service.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-deleted-contacts',
  templateUrl: './deleted-contacts.component.html',
  styleUrls: ['./deleted-contacts.component.scss']
})
export class DeletedContactsComponent {

  contacts!: any;
  searchTerm: string = '';

  constructor(private contactsService: ContactServiceService, private router: Router){
  }

  ngOnInit(): void {
    this.contactsService.getContacts().pipe(
      tap((data: Contact[]) => {
        this.contacts = data;
      })
    ).subscribe();
  }

  updateList(contact: Contact[]){
    this.contacts = contact;
  }
  
  showAlert(contactInfo: { name: string; mobilenumber: string, comment: string}): void {
    alert(`Name: ${contactInfo.name}, Number: ${contactInfo.mobilenumber} \nComment: ${contactInfo.comment}`);
  }
}
