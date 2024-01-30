import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BodyComponent } from './pages/body/body.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { FilteredPipePipe } from './pipes/filtered-pipe.pipe';
import { FormaPerdoruesComponent } from './pages/forma-perdorues/forma-perdorues.component';
import { BodyHolderComponent } from './pages/body-holder/body-holder.component';
import { ContactServiceService } from './service/contact-service.service';
import { EditPerdoruesComponent } from './pages/edit-perdorues/edit-perdorues.component';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CrudService } from './service/crud.service';
import { HeaderComponent } from './components/header/header.component';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { RequestheaderinterceptorInterceptor } from './interceptor/requestheaderinterceptor.interceptor';
import { HttpClientModule } from '@angular/common/http';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    ContactComponent,
    FilteredPipePipe,
    FormaPerdoruesComponent,
    BodyHolderComponent,
    EditPerdoruesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [ContactServiceService, CrudService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestheaderinterceptorInterceptor, multi: true },
    { provide: HttpClient, useClass: HttpClient }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
