import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Kontakt } from '../kontakt';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit{
 

  constructor(private router: Router) {}


  onContactClick(contactId: string) {
  this.router.navigate(['/edit', contactId]);
}


  @Output() sendData = new EventEmitter(); 


  @Input('kontakt')
  kontakt!:Kontakt

  input!:string;

  ngOnInit(): void {
    
  }

  
  shtoShenim(){
    alert("Emri: " + this.kontakt.name + "\n" + "Id: " + this.kontakt.contactId + "\n" + "MobileNumber: " +  this.kontakt.mobilenumber  );
  }
}
