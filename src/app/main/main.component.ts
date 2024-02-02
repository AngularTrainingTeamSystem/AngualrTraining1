import { Component } from '@angular/core';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  searchString!: string;

  searchStringPasser(event: string) {
    this.searchString = event;
  }

  showContact(contact: Contact) {
    alert("Name:" + contact.name + "\n" + "Phone:" + contact.mobilenumber)
  }
}
