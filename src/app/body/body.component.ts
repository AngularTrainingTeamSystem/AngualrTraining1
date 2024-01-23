import { Component, OnInit } from '@angular/core';
import { Contact, contacts } from 'src/app/models/contact.model';
import { ContactServiceService } from '../contact-service.service';
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit{

  contacts!: Contact[];
  searchTerm: string = '';

  constructor(private contactsService: ContactServiceService){
  }
  ngOnInit(): void {
    this.contacts = this.contactsService.getContacts();
  }
  
  showAlert(contactInfo: { name: string; mobilenumber: string, comment: string}): void {
    alert(`Name: ${contactInfo.name}, Number: ${contactInfo.mobilenumber} \nComment: ${contactInfo.comment}`);
  }
}
