import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyComponent } from './pages/body/body.component';
import { FormaPerdoruesComponent } from './pages/forma-perdorues/forma-perdorues.component';
import { BodyHolderComponent } from './pages/body-holder/body-holder.component';
import { EditPerdoruesComponent } from './pages/edit-perdorues/edit-perdorues.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/authenticationGuard';
import { NotfoundComponent } from './notfound/notfound.component';
import { UserInformationModule } from './user-information/user-information.module';
import { UserdisplayComponent } from './user-information/userdisplay/userdisplay.component';

const routes: Routes = [
  { path: 'body', component: BodyComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: LoginComponent },
  {
    path: 'forma',
    component: FormaPerdoruesComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  {
    path: 'bodyholder',
    component: BodyHolderComponent,
    canActivate: [AuthGuard],
    data: { role: ['admin', 'user'] },
  },
  {
    path: 'forma/:id',
    component: FormaPerdoruesComponent,
    canActivate: [AuthGuard],
    data: { role: 'admin' },
  },
  { path: '**', component: NotfoundComponent },

  //lazy loading

  {
    path: 'userinfo',
    loadChildren: () =>
      import('./user-information/user-information.module').then(
        (m) => m.UserInformationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
