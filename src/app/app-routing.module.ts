import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserDetailsComponent } from './pages/users-details/user-details.component';
import { FormUserComponent } from './pages/form-user/form-user.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuard } from './authentication/authentication.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'form-user/:id', component: FormUserComponent, canActivate: [AuthGuard], data: { requiredRole: ['Admin', 'User'] } },
  { path: 'form-user', component: FormUserComponent, canActivate: [AuthGuard], data: { requiredRole:'Admin'} },
  { path: 'users', component: UsersListComponent, canActivate: [AuthGuard], data: { requiredRole: ['Admin', 'User'] } },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
