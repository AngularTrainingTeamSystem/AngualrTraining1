import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Contact {
  contactId: string;
  mobilenumber: string;
  name: string;
  isActive: boolean;
  isFavorite: boolean;
  isDeleted: boolean;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

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
      isActive: [false]
    });
  }

  onSubmit() {
    console.log(this.contactForm.value);
  }
}
