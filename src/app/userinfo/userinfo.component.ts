import { Component, Input } from '@angular/core';
import { Kontakt } from '../models/kontakt';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent {

@Input() userInformation :  Kontakt | null = null;




}
