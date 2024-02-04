import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createStartsWithUpperCase } from '../validations/startsWithUpperCase.validator';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form!: FormGroup
  constructor(private fb:FormBuilder,private authService:AuthenticationService,
    private router:Router){

  }
  ngOnInit(): void {
    localStorage.clear()
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
  }
  login(){
    let user
    this.authService.getUserByEmailAndPassword(
      this.form.controls['email'].value,
      this.form.controls['password'].value).subscribe(
        (res)=>{
        user=res
        if(user){
          this.authService.login(user.role)
          this.router.navigate(['main'])
        }
        else{
          this.router.navigate(['login'])
        }
      }
      )
      
      
  }
}
