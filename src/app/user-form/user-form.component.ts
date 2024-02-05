import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, EmailValidator, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ContactServiceService } from '../service/contact-service.service';
import { MatDialog } from '@angular/material/dialog';

import { ActivatedRoute, Router } from '@angular/router';
import { emailValidator, usernameValidator } from '../validators/email-username-validator';
import { HttpClient } from '@angular/common/http';
import { EmailUnique } from '../validators/emailValidator';




@Component({
  selector: 'app-add-new-contact',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponetnt implements OnInit {

  @Input()
  updateContact!: any;

  contactFrom!: FormGroup;

  id = crypto.randomUUID();

  
  
  constructor(
    private _fb: FormBuilder,
    private contactService: ContactServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private _dialog: MatDialog,
    private http: HttpClient,
    private emailUn: EmailUnique
  ) {

  }
  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {

    this.contactFrom = this._fb.group({
      id: [this.id],
      Fullname: ['',[ Validators.required , Validators.minLength(5)]],
      mobileNumber: ['',[ Validators.required , Validators.pattern("[06]{1}[0-9]{9}")]],
      isActive: [false, Validators.required],
      isFavorite: [false, Validators.required],
      isDeleted: [false, Validators.required],
      contactDateCreated: [new Date()],
      email: [
        '',
        {valididators: [Validators.required, Validators.email],
        asyncValidators:[this.emailUn.validate.bind(this.emailUn)]}
        
      ],
      username: ['', {
        validators :[ Validators.required , Validators.minLength(5)],
        asyncValidators:[this.emailUn.validateUserName.bind(this.emailUn)]}
      ],
    });

    const hasId = this.route.snapshot.paramMap.get('id');
    console.log(hasId)

    this.contactFrom

    if (hasId) {
      this.contactService.getContactById(hasId).subscribe(
        res => {
          this.updateContact = res
          this.initializeFormWithContactData();
        }
      )
    }
  }

  private initializeFormWithContactData() {

    this.contactFrom.setValue({
      id: this.updateContact.id,
      Fullname: this.updateContact.name,
      mobileNumber: this.updateContact.mobilenumber,
      isActive: this.updateContact.isActive ? 'true' : 'false',
      isFavorite: this.updateContact.isFavorite ? 'true' : 'false',
      isDeleted: this.updateContact.isDeleted ? 'true' : 'false',
      contactDateCreated: this.updateContact.contactDateCreated,
      email: this.updateContact.email, 
      username: this.updateContact.username,

    })
  }

  onFormSubmit() {

    if (this.contactFrom.valid) {
      const data = this.contactFrom.value;
      const emailToCheck = data['email'];
      const usernameToCheck = data['username'];
      const contact = {
        id: data['id'],
        mobilenumber: data['mobileNumber'],
        name: data['Fullname'],
        isActive: data['isActive'],
        isFavorite: data['isFavorite'],
        isDeleted: data['isDeleted'],
        contactDateCreated: new Date(),
        email: data['email'],
        username: data['username']
      };
      const hasId = this.route.snapshot.paramMap.has('id');
      if (hasId) {
        this.updateExistingContact(contact);
      } else {

        this.addAccount(contact);
      }
    }
  }


private processFormSubmission(data: any): void {
  const contact = {
    id: data.id,
    mobilenumber: data['mobileNumber'],
    name: data['Fullname'],
    isActive: data['isActive'],
    isFavorite: data['isFavorite'],
    isDeleted: data['isDeleted'],
    contactDateCreated: new Date(),
    email: data['email'],
    username: data['username'],
   
  };

  const hasId = this.route.snapshot.paramMap.has('id');
  if (hasId) {
    this.updateExistingContact(contact);
  } else {
    this.addAccount(contact);
  }
}


get emailControl() {
  return this.contactFrom.get('email');
}


get usernameControl(){
  return this.contactFrom.get('username');
}
  
  
  

  private updateExistingContact(contact: any) {
    this.contactService.updateContact(contact).subscribe(() => {
      this.router.navigate(['/contact-list']);
    });
  }

  private addAccount(contact: any) {
    this.contactService.addContact(contact).subscribe(() => {
      this._dialog.closeAll();
      window.location.reload();
    });

  }

  closeWindow() {
    this._dialog.closeAll();
    if (this.contactFrom.valid) {
      this.router.navigate(['/contact-list']);
    }
  }
}


