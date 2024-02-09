import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserdisplayComponent } from './userdisplay/userdisplay.component';

const routes: Routes = [{ path: '', component: UserdisplayComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserInformationRoutingModule {}
