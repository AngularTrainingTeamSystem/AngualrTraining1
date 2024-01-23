import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact-service.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})

export class UsersListComponent implements OnInit {

  users = this.contactService.getUsers();

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.users = this.contactService.getUsers();
  }
  
  removeUser(userId: number): void {
    this.contactService.removeUser(userId);
    this.getUserInfo();
  }
}

