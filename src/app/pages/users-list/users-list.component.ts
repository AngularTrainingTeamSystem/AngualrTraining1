import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact-service.service';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  selectedUser?: User | null;
  router: any;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.getUserInfo();
  }


  // getUserInfo() {
  //   this.users = this.contactService.getUsers();
  // }

  getUserInfo() {
    this.contactService.getUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  

  //service function logic
  selectUser(user: User): void {
    this.selectedUser = user;
  }

  deselectUser(): void {
    this.selectedUser = null;
  }

  removeUser(userId: number): void {
    this.contactService.removeUser(userId).subscribe(
      () => {
        this.getUserInfo(); // update user info
        this.deselectUser(); // clear whet you have selected
      },
      (error) => {
        console.error('Error removing user:', error);
      }
    );
  }
  
}
