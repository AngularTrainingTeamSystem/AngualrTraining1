import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../model/contat';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent {
  @Output() sendData = new EventEmitter();


  @Input()
  contact! : Contact;

  constructor(private router: Router){}


  ngOnInit() {


  }

  updateContact(contact: Contact) {
    this.router.navigate(['contact-list/edit-contact/' , contact.contactId],{state: contact})

  }

  inputValue: string = '';

  onGetInfo(){
    this.sendData.emit(this.inputValue);
  }
}
