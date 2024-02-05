import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { BodyComponent } from './pages/body/body.component';
import { FooterComponent } from './pages/footer/footer.component';
import { ContactCardComponent } from './pages/body/contact-card/contact-card.component';
import { AddContactComponent } from './pages/add-contact/add-contact.component';
import { EditContactComponent } from './pages/edit-contact/edit-contact.component';
import { ContactFilterPipe } from './pipes/contactfilter.pipe';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DeletedContactsComponent } from './pages/deleted-contacts/deleted-contacts.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddEditContactComponent } from './pages/add-edit-contact/add-edit-contact.component';
import { ContactRequestInterceptor } from './interceptors/contact-request.interceptor';
import { LogInComponent } from './pages/log-in/log-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthServiceService } from './services/auth-service.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    ContactCardComponent,
    AddContactComponent,
    EditContactComponent,
    ContactFilterPipe,
    DeletedContactsComponent,
    AddEditContactComponent,
    LogInComponent,
    SignUpComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule
  ],
  
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ContactRequestInterceptor, multi: true},
    AuthServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
