import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { BodyComponent } from './pages/body/body.component';
import { AddContactComponent } from './pages/add-contact/add-contact.component';
import { EditContactComponent } from './pages/edit-contact/edit-contact.component';
import { DeletedContactsComponent } from './pages/deleted-contacts/deleted-contacts.component';
import { AddEditContactComponent } from './pages/add-edit-contact/add-edit-contact.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'main', component: BodyComponent, canActivate: [AuthGuardService] },
  { path: 'main/add-contact', component: AddEditContactComponent, canActivate: [AuthGuardService]},
  { path: 'main/deleted-contacts', component: DeletedContactsComponent, canActivate: [AuthGuardService]},
  { path: 'main/modify-contact-list/:id', component: AddEditContactComponent, canActivate: [AuthGuardService]},
  { path: 'log-in', component: LogInComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: '', redirectTo: 'log-in', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
