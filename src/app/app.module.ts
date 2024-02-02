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
import { FormUserComponent } from './pages/form-user/form-user.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopNavComponent,
    BottomNavComponent,
    FormUserComponent,
    UsersListComponent,
    UserDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    ReactiveFormsModule,
    FormsModule
  ],
  //STEP 6: Request Header interceptor declaration
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestHeaderInterceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
