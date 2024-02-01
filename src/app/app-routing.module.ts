import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { BodyComponent } from './pages/body/body.component';
import { AddContactComponent } from './pages/add-contact/add-contact.component';
import { EditContactComponent } from './pages/edit-contact/edit-contact.component';
import { DeletedContactsComponent } from './pages/deleted-contacts/deleted-contacts.component';
import { AddEditContactComponent } from './pages/add-edit-contact/add-edit-contact.component';

const routes: Routes = [
  { path: 'main', component: BodyComponent },
  { path: 'main/add-contact', component: AddEditContactComponent},
  { path: 'deleted-contacts', component: DeletedContactsComponent},
  { path: 'main/modify-contact-list/:id', component: AddEditContactComponent},
  { path: '', redirectTo: 'main', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
