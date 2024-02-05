import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm! : FormGroup

 

constructor(private router : Router,
  private _fb: FormBuilder , 
  private Auth : AuthService){}



  ngOnInit() {
    this.InitializeLoginForm();
  }


  private InitializeLoginForm(){
      this.loginForm = this._fb.group({
          email : ['' , Validators.email],
          password : [''],
      });


  }





  onSubmit() {
    if (this.loginForm.valid) {
      const data = this.loginForm.getRawValue();
      const userInfo = {
        email: data.email,
        password: data.password
      };

      
      
  
      this.Auth.checkEmailAndPassword(userInfo.email, userInfo.password)
        .subscribe(result => {
          if (result) {
            // this.router.navigate(['contact-list/']);
            console.log("success")

            // const role = this.Auth.getUserRoleByEmailAndPassword(userInfo.email, userInfo.password);

            // this.Auth.userLoggedIn(role);
            this.Auth.getUserRoleByEmailAndPassword(userInfo.email, userInfo.password)
                          .subscribe((role: string | null) => {
                            if (role) {
                            this.Auth.userLoggedIn(role);
                                this.router.navigate(['contact-list/']);
                            } 
            });
            // this.router.navigate(['contact-list/']);
          } else {
            console.log("Email and password do not match");
          }
        }, error => {
          console.error("An error occurred:", error);
        });


        this.RoleChecker(userInfo.email)
    }

    


    
  }


  private RoleChecker(email : string){
    this.Auth.adminOrUser(email).subscribe(isAdmin => {
      if (isAdmin) {
        console.log('User has the role "admin".');

        
        
      } else {
        console.log('User does not have the role "admin".');
        
        
        // this.router.navigate(['/contact-list'])
      }
    }, error => {
      console.error("An error occurred while checking user role:", error);
    });
  }

  
  
    
    
   
  }
