import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InfoComponent } from './pages/info/info.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FormComponent } from './pages/form/form.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserDetailsComponent } from './pages/users-details/user-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent}, 
  { path: 'info', component: InfoComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'form', component: FormComponent },
  { path: 'edit-user/:id', component: EditUserComponent },


  // User-details-list
  { path: 'users', component: UsersListComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  //{ redirectTo: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
