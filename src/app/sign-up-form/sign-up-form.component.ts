import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit{

  signUpForm! : FormGroup;

  constructor(private _fb : FormBuilder,
    private router : Router ,
    private route: ActivatedRoute,
    private Auth : AuthService){}


    ngOnInit() {
      this.initializeSignUpForm();
    }




    private initializeSignUpForm() {
      this.signUpForm = this._fb.group({
        name: [''],
        email: [''],
        phone: [''],
        role :[''],
        password: [''],
      });
    }




  onSubmit() {
    if(this.signUpForm.valid){
      const data = this.signUpForm.getRawValue();
      console.log(data);
      const newUser = {
        name : data.name,
        email : data.email,
        phone : data.phone,
        role : data.role,
        password : data.password

      };

      this.Auth.addNewUser(newUser).subscribe();
    }


    this.router.navigate(['/login']);

    
    
  }
}
