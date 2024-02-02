import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserDetailsComponent } from './pages/users-details/user-details.component';
import { FormUserComponent } from './pages/form-user/form-user.component';


const routes: Routes = [
  { path: '', component: HomeComponent}, 
  { path: 'form-user/:id', component: FormUserComponent },
  { path: 'form-user', component: FormUserComponent }, 
  { path: 'users', component: UsersListComponent },
  { path: 'users/:id', component: UserDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
