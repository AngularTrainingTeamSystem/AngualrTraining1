import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './main/header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './main/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './body/contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactFilterPipe } from './pipes/contact-filter.pipe';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import {  StartsWithUpperCaseDirective } from './directives/starts-uppercase.directive';
import { OneErrorPipe } from './pipes/one-error.pipe';
import { ContactFormComponent } from './contact-form/contact-form.component';

const appRoutes: Routes = [
  { path: 'main/add', component: ContactFormComponent },
  { path: 'main', component: MainComponent },
  {path: 'main/update/:contactId', component: ContactFormComponent },
  {path:'', redirectTo:'main',pathMatch:'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    ContactComponent,
    ContactFilterPipe,
    OneErrorPipe,
    MainComponent,
    StartsWithUpperCaseDirective,
    ContactFormComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
