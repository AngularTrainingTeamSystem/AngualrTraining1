import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; 
import { FormUserComponent } from './form-user.component';

const routes: Routes = [

  {
    path: '',
    component: FormUserComponent
  },
  {
    path: ':id',
    component: FormUserComponent
  }
];

@NgModule({
  declarations: [FormUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    RouterModule.forChild(routes)
  ]
})
export class FormUserModule { }
