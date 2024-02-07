import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createStartsWithUpperCase } from '../validations/startsWithUpperCase.validator';
import { UniqueEmail } from '../validations/uniqueEmail';
import { Route, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { UniqueEmailUser } from '../validations/uniqueEmailForUser';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{
  
  form!: FormGroup
  constructor(private fb:FormBuilder,
    private uniqueEmail:UniqueEmailUser,
    private router:Router,
    private userService:UserService){
  }
  options: any[] = [
    { value: 'USER', label: 'User' },
    { value: 'ADMIN', label: 'Admin' }
   
  ];
  ngOnInit(): void {
    this.form = this.fb.group(
      {
        name: ['', {
          validators: [Validators.required, Validators.minLength(2), createStartsWithUpperCase()],
          updateOn: 'blur'
        }],
        mobilenumber: ['', [Validators.required, Validators.minLength(8)]],
       
        email: ['', {
           validators: [Validators.required],
           asyncValidators:[this.uniqueEmail.validate.bind(this.uniqueEmail)]
        }],
        password: ['', {
           validators: [Validators.required],
      
        }],
        role: ['', Validators.required]
      }
    )
  
  }

  singUp(){
      const data=this.form.getRawValue()
      let user:User = new User
      user.name=data.name
      user.email=data.email
      user.phone=data.mobilenumber
      user.password=data.password
      user.role=data.role
      this.userService.saveUser(user)
      .subscribe({
        next: () => {
          console.log("Added")
        },
        error: (e) => {
          console.log(e);
        }
      });
      this.router.navigate(['/login'])
  }
}
