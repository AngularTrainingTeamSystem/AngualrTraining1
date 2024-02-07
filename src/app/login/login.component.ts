import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createStartsWithUpperCase } from '../validations/startsWithUpperCase.validator';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form!: FormGroup
  userNotPresent:boolean=false
  constructor(private fb:FormBuilder,private authService:AuthenticationService,
    private router:Router){

  }
  ngOnInit(): void {
    this.form = this.fb.group(
      {
        email: ['', {
           validators: [Validators.required]
        }],
        password: ['', {
           validators: [Validators.required],
      
        }]
      }
    )
    let emailControl=this.form.get('email')
    let passwordControl=this.form.get('password')
    emailControl?.valueChanges.pipe(
      tap(()=>{this.userNotPresent=false})
    ).subscribe()
    passwordControl?.valueChanges.pipe(
      tap(()=>{this.userNotPresent=false})
    ).subscribe()
  }
  login(){
    let user
    let formData=this.form.getRawValue()
    this.authService.getUserByEmailAndPassword(
      formData.email,
      formData.password).subscribe({
        next:(res)=>{
        user=res
        if(user){
          this.userNotPresent=false
          this.authService.login(user.role)
          this.router.navigate(['main'])
        }
        else{
          this.userNotPresent=true;
          this.router.navigate(['login'])
        }
      },
      error:(err)=>{
        console.log(err)
      }
    }
      )
      
      
  }
}
