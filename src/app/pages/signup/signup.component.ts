import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;


  constructor(private formBuilder: FormBuilder, private crudService: CrudService, private router: Router) { }

  ngOnInit() {
    this.formIntialization();
  }

  formIntialization() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{3}[0-9]{3}[0-9]{4}')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', [Validators.required]]
    });
  }

  signUpNewUser() {
    const data = this.signupForm.getRawValue();
    let user: User = new User
    user.name = data.name;
    user.email = data.email;
    user.phone = data.phone;
    user.password = data.password;
    user.role = data.role;
    this.crudService.createUserBySignUp(user);
    this.router.navigate(['']);
  }

}
