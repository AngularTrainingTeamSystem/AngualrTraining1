import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticateUserService } from 'src/app/service/authenticate-user.service';
import { CrudService } from 'src/app/service/crud.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  passwordVisible = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authenticate: AuthenticateUserService) { }

  ngOnInit() {
    this.initializeLoginForm();
  }

  initializeLoginForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  ///reconstructed just like the sign up method
  logIn() {
    const data = this.form.getRawValue();
    let user: User;
    this.authenticate.getUserInfo(data.email, data.password).subscribe({
      next: (res) => {
        user = res;
        if (user) {
          this.authenticate.login(user.role);
          this.router.navigate(['bodyholder']);
        } else {
          this.router.navigate(['']);
        }
      },
      error: (error) => {
        console.log('Error getting user info:', error);
      }
    });
  }
  
}
