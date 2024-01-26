import { Component } from '@angular/core';
import { Contacts } from '../contacts-db';
import { ContactServiceService } from '../service/contact-service.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {

  constructor(
    private contactService : ContactServiceService
  ){
  }

  // contactss = [...CONTACTS];
  contactss = this.contactService.getAllContacts();

  openAlert(event: any) {
    alert(event);

  }

  searchTerm : string = '';
}
