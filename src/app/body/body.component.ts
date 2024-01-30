import { Component } from '@angular/core';
import { Contacts } from '../contacts-db';
import { ContactServiceService } from '../service/contact-service.service';
import { MatDialog } from '@angular/material/dialog';
import { AddNewContact } from '../add-new-contact/add-new-contact.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {

  constructor(
    private contactService : ContactServiceService,
    private _dialog: MatDialog
  ){
  }

  // contactss = [...CONTACTS];
  // contactss = this.contactService.getAllContacts();

  contactz:any = this.contactService.getAllContacts();

  openAlert(event: any) {
    alert(event);

  }

  openEditContact(){
    this._dialog.open(AddNewContact);
  }

  searchTerm : string = '';
}
