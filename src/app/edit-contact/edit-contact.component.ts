import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactServiceService } from '../contact-service.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  contactForm!: FormGroup;
  contactId!: string;

  constructor(
    private contactService: ContactServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.contactId = params['id'];
      this.initForm();
    });
  }

  initForm(): void {
    const contact = this.contactService.getContactById(this.contactId);
    if (contact) {
      this.contactForm = this.fb.group({
        name: [contact.name, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
        mobilenumber: [contact.mobilenumber, [Validators.required, Validators.pattern(/^\d+$/)]],
      });
    } else {
      this.router.navigate(['/main']); // Redirect to the main page or handle as needed
    }
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const updatedContact = {
        ...this.contactService.getContactById(this.contactId),
        ...this.contactForm.value
      };
      this.contactService.updateContact(updatedContact);
      alert(`Updated Contact:
        \nName: ${updatedContact.name}\nMobile Number: ${updatedContact.mobilenumber}`);
      this.router.navigate(['/main']); // Redirect to the main page or handle as needed
    }
  }

  toHome() {
    this.router.navigate(['/main']);
  }
}
