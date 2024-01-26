import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contacts } from '../contacts-db';
import { ContactServiceService } from '../service/contact-service.service';



@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponents implements OnInit{

  @Input()
  contact! : any;

  contactObj: any
  constructor(private route: ActivatedRoute, private router:Router , private contactService: ContactServiceService){
    this.contact = this.router.getCurrentNavigation()?.extras.state

  }
  

  

  ngOnInit() {

    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = String(routeParams.get('contactId'));

    // this.contact = CONTACTS.find((contact: { contactId: string; }) => contact.contactId === productIdFromRoute )
  }

  // onUpdateSubmit(){
  //   //create the code to update the form with my method from the service 
  //   this.contactService.updateContact(updatedContact);
  // }

}
