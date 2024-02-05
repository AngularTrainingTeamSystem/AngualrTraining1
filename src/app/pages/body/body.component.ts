import { Component, OnInit } from '@angular/core';
import { Contact, contacts } from 'src/app/models/contact.model';
import { ContactServiceService } from '../../services/contact-service.service';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit{

  contacts!: any;
  searchTerm: string = '';

  constructor(private contactsService: ContactServiceService, private router: Router, public authService: AuthServiceService){
  }

  ngOnInit(): void {
    this.contacts = this.contactsService.getContacts().subscribe(
      (data: Contact[]) => {
        this.contacts = data;
      },
      (error) => {
        console.error('Error fetching contacts:', error);
      }
    );
  }

  updateList(contact: Contact[]){
    this.contacts = contact;
  }
  
  showAlert(contactInfo: { name: string; mobilenumber: string, comment: string}): void {
    alert(`Name: ${contactInfo.name}, Number: ${contactInfo.mobilenumber} \nComment: ${contactInfo.comment}`);
  }

  isUserAdmin(): boolean {
    return this.authService.getRole() === 'admin';
  }

}
