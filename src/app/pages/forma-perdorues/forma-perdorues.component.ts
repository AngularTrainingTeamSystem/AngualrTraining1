import { Component, OnInit } from '@angular/core';
import { ContactServiceService } from '../../service/contact-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../service/crud.service';
import { Kontakt } from '../../models/kontakt';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { AsyncValidatorFn } from '@angular/forms';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { UniqueEmail } from 'src/app/validators/uniqueEmail';
import { UniqueUsername } from 'src/app/validators/uniqueUsername';

@Component({
  selector: 'app-forma-perdorues',
  templateUrl: './forma-perdorues.component.html',
  styleUrls: ['./forma-perdorues.component.scss']
})
export class FormaPerdoruesComponent implements OnInit {
  kontakt: any;
  form!: FormGroup;
  id = this.route.snapshot.paramMap.get('id');
  kontakti: Kontakt = {
    id: '',
    mobilenumber: '',
    name: '',
    isActive: false,
    isFavorite: false,
    isDeleted: false,
    contactDateCreated: '',
    username: '',
    email: ''
  };

  constructor(private crudService: CrudService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private uniqueEmail: UniqueEmail, private uniqueUsername: UniqueUsername) { }

  ngOnInit() {
    this.formIntialization();
    this.loadContactInfo();
  }

  formIntialization() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      number: ['', [Validators.required, Validators.pattern('[0-9]{3}[0-9]{3}[0-9]{4}')]],
      email: ['', { validators: [Validators.required, Validators.email] }],
      isActive: [''],
      isFavorite: [''],
      isDeleted: [''],
      contactDateCreated: [''],
      username: ['',],

    });
  }

  //fills the blanc textboxes with info
  loadContactInfo() {
    console.log(this.id);
    if (this.id != null) {
      this.crudService.getContact(this.id).pipe(
        map((contact) => {
          this.kontakt = contact; console.log(contact); console.log(this.kontakt)
          this.form.setValue({
            name: this.kontakt.name,
            number: this.kontakt.mobilenumber,
            username: this.kontakt.username,
            email: this.kontakt.email,
            isActive: this.kontakt.isActive ? 'true' : '',
            isFavorite: this.kontakt.isFavorite ? 'true' : '',
            isDeleted: this.kontakt.isDeleted ? 'true' : '',
            contactDateCreated: this.kontakt.contactDateCreated
          });
        }),
        catchError((error) => {
          console.error('Error loading contact:', error);
          return of(null);
        })
      ).subscribe();
      this.form.get('email')?.valueChanges.subscribe(() => { this.form.get('email')?.addAsyncValidators(this.uniqueEmail.validate.bind(this.uniqueEmail)) })
      this.form.get('username')?.valueChanges.subscribe(() => { this.form.get('username')?.addAsyncValidators(this.uniqueUsername.validate.bind(this.uniqueUsername)) })
    }
  }

  createContact(): void {
    const formData = this.form.getRawValue();
    this.kontakti.name = formData.name;
    this.kontakti.mobilenumber = formData.number;
    this.kontakti.username = formData.username;
    this.kontakti.email = formData.email;
    this.kontakti.isActive = formData.isActive;
    this.kontakti.isFavorite = formData.isFavorite;
    this.kontakti.isDeleted = formData.isDeleted;
    this.kontakti.contactDateCreated = new Date().toISOString();
    //pipe is used to chain toghether the Observable operators
    this.crudService.createContact(this.kontakti).pipe(  //an observable is passed to the method
      tap(() => {                                       //it gets piped and it gets created while navigating to main
        this.router.navigate(['bodyholder']);          //then return observable that emits null
        alert('User saved');                          //this is done to ensure that the subscription
                                                     //of the observable completes after the navigation of the route is done
      }),
      catchError((error) => {
        console.error('Error creating contact:', error);
        return of(null);
      })
    ).subscribe();
  }

  deleteUser(): void {
    if (this.kontakt && this.kontakt.id) {
      this.crudService.deleteContact(this.kontakt.id).pipe(
        tap(() => {
          this.router.navigate(['bodyholder']);
          alert('User deleted');
        }),
        catchError((error) => {
          console.error('Error deleting contact:', error);
          return of(null);
        })
      ).subscribe();
    }
  }

  updateUser() {
    const formData = this.form.getRawValue();
    this.kontakt!.name = formData.name;
    this.kontakt!.mobilenumber = formData.number;
    this.kontakt!.username = formData.username;
    this.kontakt!.email = formData.email;
    this.kontakt!.isActive = formData.isActive;
    this.kontakt!.isFavorite = formData.isFavorite;
    this.kontakt!.isDeleted = formData.isDeleted;
    this.kontakt!.contactDateCreated = new Date().toISOString();

    this.crudService.updateContact(this.kontakt!).pipe(
      switchMap(() => {
        alert('User saved succesfully');
        this.router.navigate(['bodyholder']);
        return of(null);
      }),
      catchError((error) => {
        console.error('Error creating contact:', error);
        return of(null);
      })
    ).subscribe();
    // this.crudService.updateContact(this.kontakt!)
    //   .subscribe({
    //     next: () => {
    //       this.router.navigate(['']);
    //     },
    //     error: (error) => {
    //       console.error('Error updating contact:', error);
    //     },
    //   });
  }

  //checks if we get an id while navigating to redirect to the desired form of edit or creation
  makeAction() {
    if (!this.id) {
      this.createContact()
    }
    else {
      this.updateUser();
    }
  }
  usernameAsyncValidator(contactService: ContactServiceService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.crudService.isUsernameTaken(control.value).pipe(
        map((result: boolean) => {
          return result ? { usernameExists: true } : null;
        }),
        catchError(() => {
          console.error('Error checking username availability.');
          return of(null);
        })
      );
    };
  }
}
//check email or username availability
// checkForExistingUsernameOrEmail(newContact: Kontakt): boolean {
//   const allContacts = this.crudService.getAllContacts();
//   return allContacts.some(contact => contact.username === newContact.username || contact.email === newContact.email);
// }

// if (this.checkForExistingUsernameOrEmail(this.kontakti)) {
//   alert('Username or email already exists.');
//   return;
// }
