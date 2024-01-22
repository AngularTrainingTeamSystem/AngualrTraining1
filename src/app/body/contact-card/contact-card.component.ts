import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent {
  
  @Output() cardButtonClick = new EventEmitter<any>();

  @Input() contact !: Contact;
  inputField: string = '';

  onButtonClick(): void {
    this.cardButtonClick.emit({name: this.contact.name, mobilenumber: this.contact.mobilenumber, comment: this.inputField});
  }
}
