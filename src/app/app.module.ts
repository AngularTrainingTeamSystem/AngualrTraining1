import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { ButtonComponent } from './components/button/button.component';
import { InfoComponent } from './pages/info/info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ButtonAlertComponent } from './components/button-alert/button-alert.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonAlertDescComponent } from './components/button-alert-desc/button-alert-desc.component';
import { FilterPipe } from './pages/contact/filter.pipe';
import { FormComponent } from './pages/form/form.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { FormsModule } from '@angular/forms';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserDetailsComponent } from './pages/users-details/user-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopNavComponent,
    ButtonComponent,
    InfoComponent,
    BottomNavComponent,
    ContactComponent,
    ButtonAlertComponent,
    ButtonAlertDescComponent,
    FilterPipe,
    FormComponent,
    EditUserComponent,
    UsersListComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
