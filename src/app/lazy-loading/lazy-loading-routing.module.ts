import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeletedContactsComponent } from '../deleted-contacts/deleted-contacts.component';
import { LazyLoadingComponent } from './lazy-loading/lazy-loading.component';

const routes: Routes = [
  { path: '', component: LazyLoadingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyLoadingRoutingModule { }
