import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CONTACTS } from '../contacts-db';



@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponents implements OnInit{

  @Input()
  contact! : any;

  contactObj: any
  constructor(private route: ActivatedRoute, private router:Router){
    this.contact = this.router.getCurrentNavigation()?.extras.state
  }
  

  

  ngOnInit() {

    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = String(routeParams.get('contactId'));

    // this.contact = CONTACTS.find((contact: { contactId: string; }) => contact.contactId === productIdFromRoute )
  }

}
