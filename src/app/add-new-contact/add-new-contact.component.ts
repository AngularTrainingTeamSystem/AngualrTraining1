import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactServiceService } from '../service/contact-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

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


    
    const hasId = this.route.snapshot.paramMap.get('id');
    console.log(hasId)

    this.initializeEmptyForm();

    
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
    this.contactFrom = this._fb.group({
      id: [this.updateContact.id, Validators.required],
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
      id: ['', Validators.required],
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

      this.contactService.addContact(contact).subscribe();

      const hasId = this.route.snapshot.paramMap.has('id');
      if (hasId) {
        this.updateExistingContact(contact);
      }

    }
  }

  private updateExistingContact(contact: any) {
    this.contactService.updateContact(contact).subscribe(() => {
      this.router.navigate(['/contact-list']);
    });
  }



  closeWindow() {
    this._dialog.closeAll();

    if (this.contactFrom.valid) {
      this.router.navigate(['/contact-list']);
    }
  }
}
