import { Component, Input } from '@angular/core';
import { Kontakt } from '../../models/kontakt';
import { ContactServiceService } from '../../service/contact-service.service';
import { CrudService } from '../../service/crud.service';
import { AuthenticateUserService } from 'src/app/service/authenticate-user.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent {
  kontaktet: any = this.crudService.getAllContacts();

  constructor(
    private contactService: ContactServiceService,
    private crudService: CrudService,
    private authenticate: AuthenticateUserService
  ) {}
  @Input()
  search!: string;

  isAdmin() {
    if (this.authenticate.getRole() === 'admin') {
      return true;
    } else {
      return false;
    }
  }
}
