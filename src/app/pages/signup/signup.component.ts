import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { CrudService } from 'src/app/service/crud.service';
import { HttpClient } from '@angular/common/http';
import { UserRole } from 'src/app/models/user-role';
import { CheckEmailAvailability } from 'src/app/validators/checkEmailAvailability';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  UserRole = UserRole;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private crudService: CrudService,
    private router: Router,
    private uniqueEmail: CheckEmailAvailability
  ) {}

  ngOnInit() {
    this.formIntialization();
  }

  formIntialization() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: [this.uniqueEmail.validate.bind(this.uniqueEmail)],
        },
      ],
      phone: [
        '',
        [Validators.required, Validators.pattern('[0-9]{3}[0-9]{3}[0-9]{4}')],
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: [UserRole.User, [Validators.required]],
    });
  }

  signUpNewUser() {
    const data = this.signupForm.getRawValue();
    let user: User = new User();
    user.name = data.name;
    user.email = data.email;
    user.phone = data.phone;
    user.password = data.password;
    user.role = data.role;

    this.crudService.createUserBySignUp(user).subscribe({
      //fixed it was deprecated
      next: (response) => {
        console.log('User created successfully:', response);
        this.router.navigate(['']);
      },
      error: (error) => {
        console.log('Error creating user:', error);
      },
    });
  }
  // signUpNewUser() {
  //   const data = this.signupForm.getRawValue();
  //   let user: User = new User
  //   user.name = data.name;
  //   user.email = data.email;
  //   user.phone = data.phone;
  //   user.password = data.password;
  //   user.role = data.role;
  //   this.crudService.createUserBySignUp(user);
  //   this.router.navigate(['']);
  // }
}
