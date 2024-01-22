import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule } from '@angular/forms';
import { FilteredPipePipe } from './filtered-pipe.pipe';
import { FormaPerdoruesComponent } from './forma-perdorues/forma-perdorues.component';
import { BodyHolderComponent } from './body-holder/body-holder.component';
import { ContactServiceService } from './Services/contact-service.service';
import { EditPerdoruesComponent } from './edit-perdorues/edit-perdorues.component';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';




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
    EditPerdoruesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [ContactServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
