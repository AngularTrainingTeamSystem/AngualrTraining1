import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ContactServiceService } from '../service/contact-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, map, of, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-add-new-contact',
  templateUrl: './add-new-contact.component.html',
  styleUrls: ['./add-new-contact.component.scss']
})
export class AddNewContact implements OnInit {

  @Input()
  updateContact!: any;

  contactFrom!: FormGroup;

  id = crypto.randomUUID();
  
  constructor(
    private _fb: FormBuilder,
    private contactService: ContactServiceService,
    private router: Router,
    private route: ActivatedRoute,
    private _dialog: MatDialog
  ) {

  }
  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {

    this.contactFrom = this._fb.group({
      id: [this.id, Validators.required],
      Fullname: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      isActive: [false, Validators.required],
      isFavorite: [false, Validators.required],
      isDeleted: [false, Validators.required],
      contactDateCreated: [null, Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
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


