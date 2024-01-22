import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditContactComponents } from './edit-contact/edit-contact.component';
import { BodyComponent } from './body/body.component';

const routes: Routes = [
  {path:'contact-list', component : BodyComponent},
  {path: 'contact-list/edit-contact/:contactId' , component: EditContactComponents },
  {path:'' , redirectTo:'contact-list', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
