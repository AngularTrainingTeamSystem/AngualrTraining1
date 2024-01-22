import { Component } from '@angular/core';
import { CONTACTS } from '../contacts-db';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {


  contactss = [...CONTACTS];

  openAlert(event: any) {
    alert(event);

  }

  searchTerm : string = '';
}
