import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project';

  //Validime per FORMBUILDER SIPAS KERKESES//
  form: FormGroup;


 constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
      birthday: ['', Validators.required]
    });
 }

  



}
