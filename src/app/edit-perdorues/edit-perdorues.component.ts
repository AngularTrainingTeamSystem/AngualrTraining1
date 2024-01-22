import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Kontakt } from '../kontakt';
import { ContactServiceService } from '../Services/contact-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-edit-perdorues',
  templateUrl: './edit-perdorues.component.html',
  styleUrls: ['./edit-perdorues.component.scss']
})




export class EditPerdoruesComponent implements OnInit {

  

  

[x: string]: any; 
 
   kontakt!: Kontakt;

  constructor(private contactService: ContactServiceService, private route: ActivatedRoute) {

  }

  ngOnInit() {

    let id = this.route.snapshot.paramMap.get('contactId');

    if (id !== null) {

      this.kontakt = this.contactService.getContactById(id);
    }
  
    
  }

  
  
  //validimi i formes
  form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    number: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}')]),
    birthday: new FormControl(null)
  });
  

}
