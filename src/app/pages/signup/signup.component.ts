import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  //1. Attempt-> private userService: UserService
  constructor(private fb: FormBuilder, private authService: AuthenticationService ,  private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signupForm = this.fb.group({
      //strong password pattern:pattern('^((?!.*\\s)(?=.*[A-Z])(?=.*\\d).{8,99})$')]
      password: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      mobilenumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      name: ['', Validators.required],
      hasAccepted: [false],
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const registrationSuccessful = this.authService.register(this.signupForm.value);
      if (registrationSuccessful) {
        console.log('Registration successful!');
        this.router.navigate(['/login']);
      } else {
        console.error('Registration failed. User with this email already exists.');
      }
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }

  // nSubmit() {
  //   if (this.signupForm.valid) {
  //     this.userService.signUp(this.signupForm.value).subscribe(
  //       (registrationSuccessful) => {
  //         if (registrationSuccessful) {
  //           console.log('Registration successful!');
  //           this.router.navigate(['/login']);
  //         } else {
  //           console.error('Registration failed. Please try again.');
  //         }
  //       },
  //       error => {
  //         console.error('Error during registration:', error);
  //       }
  //     );
  //   } else {
  //     console.log('Form is invalid. Please check the fields.');
  //   }
  // }
}
