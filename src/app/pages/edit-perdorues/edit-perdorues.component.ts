import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Kontakt } from '../../models/kontakt';
import { ContactServiceService } from '../../service/contact-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../service/crud.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-edit-perdorues',
  templateUrl: './edit-perdorues.component.html',
  styleUrls: ['./edit-perdorues.component.scss']
})

export class EditPerdoruesComponent implements OnInit {

[x: string]: any; 
 
   kontakt?: Kontakt;
  form!:FormGroup
  constructor(private contactService: CrudService,
     private route: ActivatedRoute,
     private crudService: CrudService,
     private router: Router

     ) {

  }

  ngOnInit() {

    let id = this.route.snapshot.paramMap.get('contactId');

    if (id !== null) {

      this.kontakt = this.contactService.getContact(id) ;
    }
  
     this.form = new FormGroup({
      name: new FormControl(this.kontakt?.name, [Validators.required]),
      number: new FormControl(this.kontakt?.mobilenumber, [Validators.required, Validators.pattern('[0-9]{3}[0-9]{3}[0-9]{4}')]),
      birthday: new FormControl(this.kontakt?.contactDateCreated)
    });
  
    
  }


  

  deleteUser(): void {
    if (this.kontakt && this.kontakt.contactId) {
      this.crudService.deleteContact(this.kontakt.contactId);
      this.router.navigate(['/body']);
    alert('User deleted');
    }
  }

  updateUser(){

    this.kontakt!.name=this.form.controls['name'].value
    this.kontakt!.mobilenumber=this.form.controls['number'].value
    this.kontakt!.contactDateCreated=this.form.controls['birthday'].value

    this.crudService.updateContact(this.kontakt!.contactId,this.kontakt!);
    this.router.navigate(['/body'])
  }
  

}
