import { Component } from '@angular/core';
import { Contacts } from '../contacts-db';
import { ContactServiceService } from '../service/contact-service.service';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponetnt } from '../user-form/user-form.component';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {

  constructor(
    private contactService : ContactServiceService,
    private _dialog: MatDialog,
    private auth : AuthService,
    private route : Router
  ){
  }


  contactz:any = this.contactService.getAllContacts();

  openAlert(event: any) {
    alert(event);

  }

  openEditContact(){
    this._dialog.open(UserFormComponetnt);
  }


  Logout(){
    this.auth.userLoggedOut().subscribe();
      this.route.navigate(['/login']);
  }

  searchTerm : string = '';
  
}