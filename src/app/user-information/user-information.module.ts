import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserdisplayComponent } from './userdisplay/userdisplay.component';
import { UserInformationRoutingModule } from './user-information-routing.module';
import { Routes } from '@angular/router';

@NgModule({
  declarations: [UserdisplayComponent],
  imports: [CommonModule, UserInformationRoutingModule],
})
export class UserInformationModule {}
