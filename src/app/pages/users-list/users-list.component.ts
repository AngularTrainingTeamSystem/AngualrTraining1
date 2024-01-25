import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact-service.service';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users = this.contactService.getUsers();
  selectedUser?: User | null;
  router: any;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.users = this.contactService.getUsers();
  }

  selectUser(user: User): void {
    this.selectedUser = user;
  }

  deselectUser(): void {
    this.selectedUser = null;
  }

  removeUser(userId: number): void {
    this.contactService.removeUser(userId);
    this.getUserInfo();
  }
}
