import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyLoadingTestRoutingModule } from './lazy-loading-test-routing.module';
import { LazyLoadingTestComponent } from './lazy-loading-test.component';


@NgModule({
  declarations: [
    LazyLoadingTestComponent
  ],
  imports: [
    CommonModule,
    LazyLoadingTestRoutingModule
  ]
})
export class LazyLoadingTestModule { }
