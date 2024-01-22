import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-new-contact',
  templateUrl: './add-new-contact.component.html',
  styleUrls: ['./add-new-contact.component.scss']
})
export class AddNewContact {

  contactFrom: FormGroup;

  //service of form builder 

  constructor(private _fb: FormBuilder) {
    this.contactFrom = this._fb.group({
      contactId: '',
      mobileNumber: '',
      Fullname: '',
      isActive: '',
      isFavorite: '',
      isDeleted: '',
      contactDateCreated: ''
    })
  }

  onFormSubmit() {
    if (this.contactFrom.valid) {
      console.log(this.contactFrom.value);
    }
  }

}
