import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit{
  loginForm!: FormGroup;
  loginFailed: boolean = false;


  constructor(private fb: FormBuilder, private router: Router, private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password} = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (userData: any[]) => {
          if (userData.length > 0) {
            // Successful login, user exists in the database
            this.router.navigate(['/main']);
          } else {
            // Invalid credentials
            console.error('Invalid email or password');
            this.loginFailed = true;
            this.router.navigate(['/login']);
          }
        },
        error: (error) => {
          console.error('Error during login:', error),
          this.loginFailed = true
        }
      });
    }
  }
}
