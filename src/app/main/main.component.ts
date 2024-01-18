import { Component } from '@angular/core';
import { Contact } from '../contact';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  showContact(contact:Contact){
    alert("Name:"+contact.name+"\n"+"Phone:"+contact.mobilenumber)
  }
  searchString!:string;
  searchStringPasser(event: string){
    
      this.searchString=event;
      
  }
}
