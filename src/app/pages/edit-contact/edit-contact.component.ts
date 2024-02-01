import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactServiceService } from '../../services/contact-service.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  contactForm!: FormGroup;
  id!: string;
  contact!: Contact;
  constructor(
    private contactService: ContactServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.initForm();
    });
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      mobilenumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });

    let contacts: Contact;
    const contact$ = this.contactService.getContactById(this.id);
    contact$.subscribe(contact => {
      if (contact) {
        this.contact = contact;
        this.contactForm.setValue({name: contact.name, mobilenumber: contact.mobilenumber});
      } else {
        this.router.navigate(['/main']); // Redirect to the main page or handle as needed
      }
    })
  }
  

  onSubmit(): void {
    const formData = this.contactForm.getRawValue();

    this.contact.name = formData['name'];
    this.contact.mobilenumber = formData['mobilenumber'];

    this.contactService.updateContact(this.contact).subscribe((res) => {
      console.log(res);
    })

    alert(`Updated Contact:
      \nName: ${formData.name}\nMobile Number: ${formData.mobilenumber}`);
    this.router.navigate(['/main']); // Redirect to the main page or handle as needed
  
  }

  toHome() {
    this.router.navigate(['/main']);
  }
}
