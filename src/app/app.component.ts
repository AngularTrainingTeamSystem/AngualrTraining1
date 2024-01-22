import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewContact } from './add-new-contact/add-new-contact.component';
import { EditContactComponents } from './edit-contact/edit-contact.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PhoneBookProject';



  constructor(private _dialog: MatDialog){}


  
    openEditContact(){
      this._dialog.open(AddNewContact);
    }
  
}
