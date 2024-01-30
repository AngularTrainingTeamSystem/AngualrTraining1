import { Component, OnInit } from '@angular/core';
import { ContactServiceService } from '../../service/contact-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../service/crud.service';
import { Kontakt } from '../../models/kontakt';


@Component({
  selector: 'app-forma-perdorues',
  templateUrl: './forma-perdorues.component.html',
  styleUrls: ['./forma-perdorues.component.scss']
})
export class FormaPerdoruesComponent {
  kontakt: any;

  kontakti: Kontakt = {
    id: '',
    mobilenumber: '',
    name: '',
    isActive: false,
    isFavorite: false,
    isDeleted: false,
    contactDateCreated: '',
    username: '',
    email: ''
  };




  constructor(private crudService: CrudService, private router: Router) { }

  //check email or username availability
  // checkForExistingUsernameOrEmail(newContact: Kontakt): boolean {
  //   const allContacts = this.crudService.getAllContacts();
  //   return allContacts.some(contact => contact.username === newContact.username || contact.email === newContact.email);
  // }


  createContact(): void {

    // if (this.checkForExistingUsernameOrEmail(this.kontakti)) {
    //   alert('Username or email already exists.');
    //   return;
    // }


    this.kontakti.contactDateCreated = new Date().toISOString();
    this.crudService.createContact(this.kontakti).subscribe();
    alert('User saved');
    this.router.navigate(['/body']);



  }

}
