
import { Component } from '@angular/core';
import { ContactService } from '../../services/contact-service.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})

export class UsersListComponent {
  users = this.contactService.getUsers();
  constructor(private contactService: ContactService) {}
}
