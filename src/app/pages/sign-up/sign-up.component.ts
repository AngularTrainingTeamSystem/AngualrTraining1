import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { UserValidators } from 'src/app/validators/user-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required]],
      mobilenumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email], [UserValidators.emailTaken(this.authService)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['user', [Validators.required]]
    });
  }

  onSubmit(): void {
    // Implement your signup logic here
    if (this.signupForm.valid) {
      const user = this.signupForm.value;
      this.authService.signup(user).subscribe({
        next: () => {
          console.log('Signup successful');
          this.router.navigate(['/log-in']);
        },
        error: (error) => console.error('Error during signup:', error)
      });
    }
  }
}
