import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyLoadingTestComponent } from './lazy-loading-test.component';

const routes: Routes = [{ path: '', component: LazyLoadingTestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyLoadingTestRoutingModule { }
