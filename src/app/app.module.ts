import { Injector, NgModule } from '@angular/core';
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
import { ContactDisplayerComponent } from './body/contact-info-displayer/contact-displayer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ContactRequestInterceptorInterceptor } from './interceptors/contact-request-interceptor.interceptor';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './authentication/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
const appRoutes: Routes = [
  { path: 'main/add', component: ContactFormComponent,
  canActivate: [AuthGuard],
        data: {role: 'ADMIN'} },
  { path: 'main', component: MainComponent,
  canActivate: [AuthGuard],
        data: {role: ['ADMIN','USER']}
    },
  {path: 'main/update/:contactId', component: ContactFormComponent,
      canActivate: [AuthGuard],
          data: {role: 'ADMIN'} },
  {path:'signUp', component:SignUpComponent},
  {path:'login', component:LoginComponent},
  {path:'', redirectTo:'login',pathMatch:'full'},
  { path: '**', component: NotFoundComponent }
];
export let AppInjector: Injector;

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
    ContactDisplayerComponent,
    SignUpComponent,
    LoginComponent,
    NotFoundComponent,

    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
    
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:ContactRequestInterceptorInterceptor,multi:true}],
  bootstrap: [AppComponent]
})


export class AppModule {

  
 }
