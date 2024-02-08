import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './authentication/authentication.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'form-user/:id', loadChildren: () => import('./pages/form-user/form-user.module').then(m => m.FormUserModule) },
  { path: 'form-user', loadChildren: () => import('./pages/form-user/form-user.module').then(m => m.FormUserModule), canActivate: [AuthGuard], data: { requiredRole: 'Admin'} },
  { path: 'users', component: UsersListComponent, canActivate: [AuthGuard], data: { requiredRole: ['Admin', 'User'] } },
  { path: 'login', component: LoginComponent },
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule) },
  { path: '**', component: NotFoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
