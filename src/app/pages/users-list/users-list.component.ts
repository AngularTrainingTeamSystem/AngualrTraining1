import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../services/contact-service.service';
import { User } from '../../models/user.model';
import { AuthenticationService } from 'src/app/services/authentication-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})

export class UsersListComponent implements OnInit {
  users: User[] = [];
  selectedUser?: User | null;

  // isLoggedIn = false;
  // isAdmin = false;


  constructor(private contactService: ContactService, 
    public authenticationService: AuthenticationService,
    private router: Router) {}

    ngOnInit(): void {
      this.getUserInfo();
      this.authenticationService.isLoggedIn.subscribe((loggedIn) => {
        // this.isLoggedIn = loggedIn;
      });
      this.authenticationService.userRole.subscribe((role) => {
        // this.isAdmin = role === 'admin';
      });
    }
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
