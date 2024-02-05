import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Kontakt } from '../models/kontakt';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { AuthenticateUserService } from '../service/authenticate-user.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private router: Router,private authenticate : AuthenticateUserService) { }

  onContactClick(id: string) {
    if(this.isAdmin()){
    this.router.navigate(['/forma', id]);
  }

  }
  @Output() sendData = new EventEmitter();
  @Input('kontakt')
  kontakt!: Kontakt
  input!: string;

  ngOnInit(): void { }

  getUserInformation() {
    alert("Name : " + this.kontakt.name + "\n" + "Id : " + this.kontakt.id + "\n" + "MobileNumber : " + this.kontakt.mobilenumber
      + "\n" + "Date Of Birth : " + this.kontakt.contactDateCreated
      + "\n" + "Username : " + this.kontakt.username + "\n" + "Email : " + this.kontakt.email + "\n" + "Active : " + this.kontakt.isActive
      + "\n" + "Favorite : " + this.kontakt.isFavorite );
  }

  isAdmin(){
    if(this.authenticate.getRole() === 'admin'){
     return  true;
    }else{
      return false;
    }
   }
}

