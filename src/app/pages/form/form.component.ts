import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact-service.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  
  contactForm!: FormGroup;

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
      contactId: ['', Validators.required], 
      mobilenumber: ['', [Validators.required, Validators.pattern('[0-9]*(\.[0-9]+)?')]],
      isFavorite: [false],
      isDeleted: [false],
      isActive: [false],
      contactDateCreated: ['']
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      let newContact: User = this.contactForm.value;
      newContact.id= Number(this.contactForm.value['contactId'])
      this.contactService.addUser(newContact);
      this.router.navigate(['/users']);
    }
  }
  
  resetForm(): void {
    this.contactForm.reset(); 
  }
}
