
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Contact } from '../models/contact';
import { Contacts } from '../models/contacts';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createStartsWithUpperCase } from '../validations/startsWithUpperCase.validator';
import { ContactModel } from '../models/contactModel';
import { createUnique } from '../validations/unique.validator';
import { catchError, finalize, of } from 'rxjs';
import { UniqueEmail } from '../validations/uniqueEmail';
import { UniqueUsername } from '../validations/uniqueUsername';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  contact: any;
  constructor(
    private route: ActivatedRoute,
    private contactService: ContactService,
    private fb: FormBuilder,
    private router: Router,
    private uniqueEmail: UniqueEmail,
    private uniqueUsername: UniqueUsername
  ) { }
  form!: FormGroup

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const contactIdFromRoute = (routeParams.get('contactId'));

    this.initForm()
    if (contactIdFromRoute != null) {
      this.contactService.getContactById(contactIdFromRoute)
        .pipe(finalize(() => {

          let contactModel: ContactModel = new ContactModel(this.contact!.mobilenumber
            , this.contact!.name, this.contact!.isActive, this.contact!.isFavorite,
            this.contact!.isDeleted, this.contact!.username, this.contact!.email)

          this.populateForm(contactModel)
        }),
          catchError((error) => { return of(new Error(error)) }))
        .subscribe(contact => this.contact = contact);

    }
  }
  populateForm(contact: ContactModel) {
    this.form.setValue(contact)
  }
  initForm() {
    this.form = this.fb.group(
      {
        name: ['', {
          validators: [Validators.required, Validators.minLength(2), createStartsWithUpperCase()],
          updateOn: 'blur'
        }],
        mobilenumber: ['', [Validators.required, Validators.minLength(8)]],
        isFavorite: [''],
        isActive: [''],
        isDeleted: [''],
        username: ['', {
           validators: [Validators.required],
        }],
        email: ['', {
           validators: [Validators.required],
        }]
      }
    )
   
    const emailControl=this.form.get('email')
    emailControl?.valueChanges.subscribe(()=>{
      
      if(this.contact?.email==emailControl.value){
        emailControl.removeAsyncValidators(this.uniqueEmail.validate.bind(this.uniqueEmail))
        this.form.updateValueAndValidity({emitEvent:true})
    }
  else{
      emailControl.setAsyncValidators(this.uniqueEmail.validate.bind(this.uniqueEmail))
      this.form.updateValueAndValidity({emitEvent:true})
  }
})
  const usernameControl=this.form.get('username')
    usernameControl?.valueChanges.subscribe(()=>{
      if(this.contact?.username==usernameControl.value){
      usernameControl.removeAsyncValidators(this.uniqueUsername.validate.bind(this.uniqueUsername))
      this.form.updateValueAndValidity()
      }
      else{
        usernameControl.setAsyncValidators(this.uniqueUsername.validate.bind(this.uniqueUsername))
         this.form.updateValueAndValidity({emitEvent:true})
       }
    })
  }
  get contactName() {
    return this.form.controls['name']
  }
  get contactMobile() {
    return this.form.controls['mobilenumber']
  }

  update(id: string) {
    let updatedContact: ContactModel = new ContactModel(this.form.value['mobilenumber'], this.form.value['name'],
      this.form.value['isActive'], this.form.value['isFavorite'], this.form.value['isDeleted'],
      this.form.value['username'], this.form.value['email']);
    this.contactService.updateContact(updatedContact, id).subscribe({
      next:()=>{console.log("Updated")},
      error(err) {
        console.log(err)
      },
    }
    )
    this.router.navigate(['/main'])
  }

  setFormAction() {
    const routeParams = this.route.snapshot.paramMap;
    const contactIdFromRoute = (routeParams.get('contactId'));
    if (contactIdFromRoute != null) {
      this.update(this.contact!.id)
    }
    else { this.addContact() }
  }

  addContact() {
    let createdContact: Contact = new Contact;
    createdContact.name = this.form.value['name']
    createdContact.mobilenumber = this.form.value['mobilenumber']
    createdContact.isActive = this.form.value['isActive']
    createdContact.isFavorite = this.form.value['isFavorite']
    createdContact.isDeleted = this.form.value['isDeleted']
    createdContact.username = this.form.value['username']
    createdContact.email = this.form.value['email']
    this.contactService.addContact(createdContact).subscribe({
      next:()=>{console.log("Added")},
      error(err) {
        console.log(err)
      },
    }
    )
    this.router.navigate(['/main'])
  }
}
