import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { DeletedContactsComponent } from './deleted-contacts/deleted-contacts.component';

const routes: Routes = [
  { path: 'main', component: BodyComponent },
  { path: 'main/edit-contact/:id', component: EditContactComponent},
  { path: 'main/add-contact', component: AddContactComponent},
  { path: 'deleted-contacts', component: DeletedContactsComponent},
  { path: '', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
