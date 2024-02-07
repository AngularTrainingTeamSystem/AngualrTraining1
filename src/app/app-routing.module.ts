import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'lazyLoadingTest', loadChildren: () => import('./lazy-loading-test/lazy-loading-test.module').then(m => m.LazyLoadingTestModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
