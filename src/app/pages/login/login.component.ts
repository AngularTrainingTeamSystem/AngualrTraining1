import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError = false;

  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      password: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      const user = this.authService.login(credentials);
      if (user) {
        console.log('Login successful!');
        this.router.navigate(['/users']);
      } else {
        console.error('Login failed. Invalid credentials.');
        this.loginError = true;
      }
    } else {
      console.log('Form is invalid. Please check the fields.');
    }
  }
}
