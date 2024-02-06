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

  constructor(private router: Router, private authenticate: AuthenticateUserService) { }

  onContactClick(id: string) {
    if (this.isAdmin()) {
      this.router.navigate(['/forma', id]);
    }

  }
  @Output() sendData = new EventEmitter();
  @Input('kontakt')
  kontakt!: Kontakt
  input!: string;

  userInformation: Kontakt | null = null;
  showUserInformation: boolean = false;

  ngOnInit(): void { }

  //displays the information  of a specific contact when clicked on in the table
  getUserInformation() {
    if (this.showUserInformation) {
      this.userInformation = null;
    } else {
      this.userInformation = this.kontakt;
    }
    this.showUserInformation = !this.showUserInformation;
  }

  isAdmin() {
    if (this.authenticate.getRole() === 'admin') {
      return true;
    } else {
      return false;
    }
  }
}

