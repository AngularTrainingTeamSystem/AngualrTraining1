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

//  onFormSubmit(): void {
  
//   if (this.contactFrom.valid) {
//     const data = this.contactFrom.value;
    

    
//     const emailToCheck = data['email'];
//     const usernameToCheck = data['username'];

//     // Call the emailValidator function to get the ValidatorFn
//     const emailValidatorFn = emailValidator(this.http);
//     const usernameValidatorFn = usernameValidator(this.http);

//     // Retrieve the email form control
//     const emailControl = this.contactFrom.get('email');
//     const userNameControl = this.contactFrom.get('username');

//     // Check if the email control exists and is not null
//     if (emailControl) {
//     // Use the ValidatorFn to check if the email is available
//       emailValidatorFn(emailControl)?.['subscribe']((errors: any) => {
//         if (errors && errors.emailTaken) {
//           if(this.contactFrom.get('email')!.touched){
//           // Handle the case when the email is not available 
//           this.emailControl?.setErrors({ emailTaken: false });
//         } 
//         this.emailControl?.setErrors({ emailTaken: true });

//       }else {
//           const contact = {
//             id: data['id'],
//             mobilenumber: data['mobileNumber'],
//             name: data['Fullname'],
//             isActive: data['isActive'],
//             isFavorite: data['isFavorite'],
//             isDeleted: data['isDeleted'],
//             contactDateCreated: new Date(),
//             email: data['email'],
//             username: data['username'],
//             // Add any additional fields or properties you have in your contact object
//           };

//           const hasId = this.route.snapshot.paramMap.has('id');
//           if (hasId) {
//             this.updateExistingContact(contact);
//           } else {
//             this.addAccount(contact);
//           }
//         }
//       });
//     } else {
//       console.error('Email control not found in the form group');
//     }
//   }
// }


// onFormSubmit(): void {
//   if (this.contactFrom.valid) {
//     const data = this.contactFrom.getRawValue();

//     // const emailToCheck = data['email'];
//     // const usernameToCheck = data['username'];

//     // Call the emailValidator and usernameValidator functions to get the ValidatorFns
//     const emailValidatorFn = emailValidator(this.http);
//     const usernameValidatorFn = usernameValidator(this.http);

//     // Retrieve the email and username form controls
//     const emailControl = this.contactFrom.get('email');
//     const usernameControl = this.contactFrom.get('username');

//     // Check if the email control exists and is not null
//     if (emailControl) {
     
//       // Use the ValidatorFn to check if the email is available
//       emailValidatorFn(emailControl)?.['subscribe']((emailErrors: any) => {
//         if (emailErrors && emailErrors.emailTaken) {
//           if (this.contactFrom.get('email')!.touched) {
//             // Handle the case when the email is not available 
//             this.emailControl?.setErrors({ emailTaken: false });
//           }
//           this.emailControl?.setErrors({ emailTaken: true });
//         } 
//           // Check if the username control exists and is not null
//           if (usernameControl) {
//             // Use the ValidatorFn to check if the username is available
//             usernameValidatorFn(usernameControl)?.['subscribe']((usernameErrors: any) => {
//               if (usernameErrors && usernameErrors.usernameTaken) {
//                 if (this.contactFrom.get('username')!.touched) {
//                   // Handle the case when the username is not available 
//                   this.usernameControl?.setErrors({ usernameTaken: false });
//                 }
//                 this.usernameControl?.setErrors({ usernameTaken: true });
//               } else {
//                 // Proceed with form submission
//                 this.processFormSubmission(data);
//               }
//             });
//           } else {
//             console.error('Username not found in the form group');
//           }
        
//       });
//     } else {
//       console.error('Email not found in the form group');
//     }
//   }
// }

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


