import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact-displayer',
  templateUrl: './contact-displayer.component.html',
  styleUrls: ['./contact-displayer.component.scss']
})
export class ContactDisplayerComponent {


  @Input()
  contact?:Contact | null //contact to be displayed in this component

  

  hideComponent(){
    this.contact=null;
  }
}
