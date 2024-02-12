import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserDetailsComponent } from './pages/users-details/user-details.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RequestHeaderInterceptor } from './request-header.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationService } from './services/authentication-service';
import { TestComponentComponent } from './test/test-component/test-component.component';
import { TestComponent2Component } from './test/test-component2/test-component2.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopNavComponent,
    BottomNavComponent,
    //FormUserComponent,
    UsersListComponent,
    UserDetailsComponent,
    LoginComponent,
    TestComponentComponent,
    TestComponent2Component,
    //SignupComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  //STEP 6: Request Header interceptor declaration
  providers: [
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestHeaderInterceptor, multi:true},
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
