import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditContactComponents } from './edit-contact/edit-contact.component';
import { BodyComponent } from './body/body.component';
import { AddNewContact } from './add-new-contact/add-new-contact.component';

const routes: Routes = [
  {path:'contact-list', component : BodyComponent},
  // {path: 'contact-list/edit-contact/:contactId' , component: AddNewContact },
  {path: 'contact-list/:contactId' , component: AddNewContact },
  {path: 'contact-list/add-contact' , component: AddNewContact },
  {path:'' , redirectTo:'contact-list', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
