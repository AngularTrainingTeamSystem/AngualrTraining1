import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { AddNewContact } from './add-new-contact/add-new-contact.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { BodyComponent } from './body/body.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { FormsModule, NgModel } from '@angular/forms';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { EditContactComponents } from './edit-contact/edit-contact.component';
import {MatTableModule} from '@angular/material/table';
import { FooterComponent } from './footer/footer.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    AddNewContact,
    BodyComponent,
    ContactCardComponent,
    SearchFilterPipe,
    EditContactComponents,
    FooterComponent,
    ErrorDialogComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    HttpClientModule
  ],
providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
