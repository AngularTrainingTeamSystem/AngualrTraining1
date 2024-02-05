import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BodyComponent } from './body/body.component';

import { HomePageComponent } from './home-page/home-page.component';
import { UserFormComponetnt } from './user-form/user-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { AuthGuard } from './Guard/auth.guard';

const routes: Routes = [
  {path:'contact-list', component : BodyComponent , canActivate:[AuthGuard]},
  {path: 'contact-list/:id' , component: UserFormComponetnt , canActivate:[AuthGuard]},
  {path: 'contact-list/add-contact' , component: UserFormComponetnt  },
  {path:'' , redirectTo:'home', pathMatch : 'full'},
  {path:'home', component : HomePageComponent},
  {path:'login' , component : LoginFormComponent},
  {path:'signup' , component: SignUpFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }