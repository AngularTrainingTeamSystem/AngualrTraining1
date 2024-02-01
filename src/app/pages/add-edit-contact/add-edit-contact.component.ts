import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../../models/contact.model';
import { ContactServiceService } from '../../services/contact-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-contact',
  templateUrl: './add-edit-contact.component.html',
  styleUrls: ['./add-edit-contact.component.scss']
})
export class AddEditContactComponent implements OnInit {
  contactForm!: FormGroup;
  isEdit = false;
  contact!: Contact;
  model: any = {};
  isUsernameTaken: boolean = false;
  isEmailTaken: boolean = false;

  constructor(
    private contactService: ContactServiceService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm(this.contact);
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEdit = true;
        const contactId = params['id'];
        this.contactService.getContactById(contactId).subscribe((contact) => {
          console.log(contact);
          if (contact) {
            this.contact = contact;
            this.contactForm.setValue({name: contact.name, mobilenumber: contact.mobilenumber,
            isFavorite: contact.isFavorite, isActive: contact.isActive, isDeleted: contact.isDeleted,
            username: contact.username, email: contact.email, contactDateCreated: contact.contactDateCreated});
          } else {
            this.router.navigate(['/main']);
          }
        });
      }
    });
  }

  // checkUsernameValidity(): void {
  //   this.isUsernameTaken = this.contactService.isUsernameTaken(this.model.username);
  // }

  // checkEmailValidity(): void {
  //   this.isEmailTaken = this.contactService.isEmailTaken(this.model.email);
  // }

  initializeForm(contact?: Contact): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      mobilenumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      username: ['', [Validators.required]],
      email: [ '', [Validators.required, Validators.email]],
      isActive: [false],
      isFavorite: [false],
      isDeleted: [false],
      contactDateCreated: [new Date(), Validators.required],
    });
  }

  onSubmit(): void {
    const formData = this.contactForm.getRawValue();

    if (this.isEdit) {
      // Update existing contact
      this.contact.name = formData.name;
      this.contact.mobilenumber = formData.mobilenumber;
      this.contact.username = formData.username;
      this.contact.email = formData.email;
      this.contact.isActive = formData.isActive ===  'true'  ?  true :  false;
      this.contact.isFavorite = formData.isFavorite ===  'true'  ?  true :  false;
      this.contact.isDeleted = formData.isDeleted ===  'true'  ?  true :  false;
      this.contact.contactDateCreated = formData.contactDateCreated;

      this.contactService.updateContact(this.contact).subscribe((res) => {
        console.log(res);
      });

      alert(`Updated Contact:
        \nName: ${formData.name}\nMobile Number: ${formData.mobilenumber}`);
    } else {
      formData.isActive = formData.isActive ===  'true'  ?  true :  false;
      formData.isFavorite = formData.isFavorite ===  'true'  ?  true :  false;
      formData.isDeleted = formData.isDeleted ===  'true'  ?  true :  false;
      this.contactService.addContact(formData);
      alert(`Added Contact:
        \nName: ${formData.name}\nMobile Number: ${formData.mobilenumber}`);
    }

    this.router.navigate(['/main']);
  }
}
