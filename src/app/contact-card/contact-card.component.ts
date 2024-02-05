import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../model/contat';
import { Router } from '@angular/router';
import { Contacts } from '../contacts-db';
import { ContactServiceService } from '../service/contact-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AuthService } from '../service/auth/auth.service';


@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent {
  @Output() sendData = new EventEmitter();

  @Input()
  contact! : Contact;

  constructor(private router: Router , private service : ContactServiceService , private _dialog : MatDialog  , private auth : AuthService){}

  ngOnInit() {


  }

  updateContact(id: string) {
   this.router.navigate(['contact-list/', id]);
  
  }

  

  inputValue: string = '';

  onGetInfo(){
    this.sendData.emit(this.inputValue);
  }


  removeContact(id: string) {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: {
        title: 'Confirmation ',
        message: 'Are you sure you want to delete this contact?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteContactById(id).subscribe(() => {
          window.location.reload();
        });
      }
    });
  }



  isAdmin(){
    
  if(this.auth.getUserRole() === "admin"){
    return true
  }else{
    return false
  }
}
}