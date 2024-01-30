import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactServiceService } from '../service/contact-service.service';
import { Contact } from '../model/contat';
import { ActivatedRoute, Router } from '@angular/router';
import { Contacts } from '../contacts-db';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-add-new-contact',
  templateUrl: './add-new-contact.component.html',
  styleUrls: ['./add-new-contact.component.scss']
})
export class AddNewContact {

  @Input()
  updateContact!: any;

  contactFrom!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private contactService: ContactServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private _dialog: MatDialog
  ) {
    this.initializeForm();
  }

  private initializeForm() {
    this.updateContact = this.router.getCurrentNavigation()?.extras.state;
    const hasId = this.route.snapshot.paramMap.has('contactId');

    if (hasId) {
      this.initializeFormWithContactData();
    } else {
      this.initializeEmptyForm();
    }
  }

  private initializeFormWithContactData() {
    this.contactFrom = this._fb.group({
      contactId: [this.updateContact.contactId, Validators.required],
      Fullname: [this.updateContact.name, Validators.required],
      mobileNumber: [this.updateContact.mobilenumber, Validators.required],
      isActive: [this.updateContact.isActive ? 'true' : 'false', Validators.required],
      isFavorite: [this.updateContact.isFavorite ? 'true' : 'false', Validators.required],
      isDeleted: [this.updateContact.isDeleted ? 'true' : 'false', Validators.required],
      contactDateCreated: [this.updateContact.contactDateCreated, Validators.required],
      email: [this.updateContact.email, Validators.required],
      username: [this.updateContact.username, Validators.required],
    });
  }

  private initializeEmptyForm() {
    this.contactFrom = this._fb.group({
      contactId: ['', Validators.required],
      Fullname: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      isActive: [false, Validators.required],
      isFavorite: [false, Validators.required],
      isDeleted: [false, Validators.required],
      contactDateCreated: [null, Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
    });
  }

  onFormSubmit() {
    if (this.contactFrom.valid) {
      const data = this.contactFrom.value;
      const emailToCheck = data['email'];
      const usernameToCheck = data['username'];
      const contact: Contact = {
        contactId: data['contactId'],
        mobilenumber: data['mobileNumber'],
        name: data['Fullname'],
        isActive: data['isActive'],
        isFavorite: data['isFavorite'],
        isDeleted: data['isDeleted'],
        contactDateCreated: new Date(),
        email: data['email'],
        username: data['username']
      };

      const hasId = this.route.snapshot.paramMap.has('contactId');
      if (hasId) {
        this.updateExistingContact(contact);
      } else {
        this.addNewContactWithValidation(contact, emailToCheck, usernameToCheck);
      }
    }
  }

  private updateExistingContact(contact: Contact) {
    this.contactService.updateContact(contact);
    this.router.navigate(['/contact-list']);
  }

  private addNewContactWithValidation(contact: Contact, emailToCheck: string, usernameToCheck: string) {
    if (this.contactService.hasEmail(emailToCheck)) {
      this.showErrorDialog('Email is already taken');
    } else if (this.contactService.hasUsername(usernameToCheck)) {
      this.showErrorDialog('Username is already taken');
    } else {
      this.contactService.addContact(contact);
      this._dialog.closeAll();
    }
  }

  showErrorDialog(errorMessage: string): void {
    this._dialog.open(ErrorDialogComponent, {
      data: { message: errorMessage },
      width: '300px',
    });
  }

  closeWindow() {
    this._dialog.closeAll();

    if (this.contactFrom.valid) {
      this.router.navigate(['/contact-list']);
    }
  }
}
