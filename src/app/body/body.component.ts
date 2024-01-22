import { Component } from '@angular/core';
import { Contact, contacts } from 'src/app/models/contact.model';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  contacts = contacts.filter(contact => !contact.isDeleted);

  searchTerm: string = '';

  showAlert(contactInfo: { name: string; mobilenumber: string, comment: string}): void {
    alert(`Name: ${contactInfo.name}, Number: ${contactInfo.mobilenumber} \nComment: ${contactInfo.comment}`);
  }
}
