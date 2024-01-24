import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact-service.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { CustomValidators } from './custom.validator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  contactForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      contactId: ['', [Validators.required, Validators.pattern('[0-9]*(\.[0-9]+)?')]],
      mobilenumber: ['', [Validators.required, Validators.pattern('[0-9]*(\.[0-9]+)?')]],
      email: ['',
        [
          Validators.required,
          Validators.email,
          CustomValidators.uniqueEmail(this.contactService.getExistingEmails()),
        ],
      ],
      username: [
        '',
        [
          Validators.required,
          CustomValidators.uniqueUsername(this.contactService.getExistingUsernames()),
        ],
      ],
      isFavorite: [false],
      isDeleted: [false],
      isActive: [false],
      contactDateCreated: [''],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const newContact: User = this.contactForm.value;
      newContact.id = Number(this.contactForm.value['contactId']);
      if (!this.contactService.isEmailUnique(newContact.email, newContact.id) || !this.contactService.isUsernameUnique(newContact.username, newContact.id)) {
        this.errorMessage = 'Username or email is already taken.';
      } else {
        this.contactService.addUser(newContact);
        this.router.navigate(['/users']);
        console.log(this.contactService);
      }
    }
  }

  resetForm(): void {
    this.contactForm.reset();
  }
}

