import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../model/contat';
import { Router } from '@angular/router';
import { Contacts } from '../contacts-db';
import { ContactServiceService } from '../service/contact-service.service';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent {
  @Output() sendData = new EventEmitter();




  @Input()
  contact! : Contact;

  constructor(private router: Router , private service : ContactServiceService ){}


  ngOnInit() {


  }

  updateContact(id: string) {
    // this.router.navigate(['contact-list/edit-contact/', contact.id], { state: contact })
    
    this.router.navigate(['contact-list/', id]);
  
  }

  

  inputValue: string = '';

  onGetInfo(){
    this.sendData.emit(this.inputValue);
  }


  removeContact(id:string){
    this.service.deleteContactById(id).subscribe();
  }
}
