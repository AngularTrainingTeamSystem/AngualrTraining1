import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contact, contacts } from '../models/contact.model';
import { ContactServiceService } from '../contact-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})

export class EditContactComponent implements OnInit {
  contactForm!: FormGroup;
  contact!: Contact;

  constructor(
    private contactService: ContactServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    let id: any = this.route.snapshot.paramMap.get('id');
    this.contact = this.contactService.getContactById(id);
    
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      name: [this.contact.name, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      mobilenumber: [this.contact.mobilenumber, [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  onSubmit(): void {
    // Handle form submission here
    alert(`Name: ${this.contactForm.value.name}\nMobile Number: ${this.contactForm.value.mobilenumber}`);
  }

  toHome() {
    this.router.navigate(['/main']);
  }
}
