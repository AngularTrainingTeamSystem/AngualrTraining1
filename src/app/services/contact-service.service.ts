import { Injectable } from '@angular/core';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root',
})

export class ContactService {
  private users: User[] = [
    {"id": 1, "mobilenumber": "1234567890", "name": "John Doe", "email": "john@example.com", "username": "john_doe", "isActive": true, "isFavorite": false, "isDeleted": false, "contactDateCreated": "2023-07-12"},
    {"id": 2, "mobilenumber": "9876543210", "name": "Jane Smith", "email": "jane@example.com", "username": "jane_smith", "isActive": false, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-05-24"},
    {"id": 3, "mobilenumber": "5551112233", "name": "Alice Johnson", "email": "alice@example.com", "username": "alice_j", "isActive": true, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-10-08"},
    {"id": 4, "mobilenumber": "8887776666", "name": "Bob Williams", "email": "bob@example.com", "username": "bob_w", "isActive": false, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-02-17"},
    {"id": 5, "mobilenumber": "3332221111", "name": "Eve Davis", "email": "eve@example.com", "username": "eve_d", "isActive": true, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-11-30"},
    {"id": 6, "mobilenumber": "4445556666", "name": "Charlie Brown", "email": "charlie@example.com", "username": "charlie_b", "isActive": false, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-08-21"},
    {"id": 7, "mobilenumber": "9998887777", "name": "Grace Taylor", "email": "grace@example.com", "username": "grace_t", "isActive": true, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-04-06"},
    {"id": 8, "mobilenumber": "7776665555", "name": "Daniel White", "email": "daniel@example.com", "username": "daniel_w", "isActive": false, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-09-14"},
    {"id": 9, "mobilenumber": "6665554444", "name": "Sophia Miller", "email": "sophia@example.com", "username": "sophia_m", "isActive": true, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-01-28"},
    {"id": 10, "mobilenumber": "2223334444", "name": "Liam Anderson", "email": "liam@example.com", "username": "liam_a", "isActive": false, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-06-10"},
    {"id": 11, "mobilenumber": "1112223333", "name": "Olivia Parker", "email": "olivia@example.com", "username": "olivia_p", "isActive": true, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-03-19"},
    {"id": 12, "mobilenumber": "5554443333", "name": "Matthew Turner", "email": "matthew@example.com", "username": "matthew_t", "isActive": false, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-12-02"},
    {"id": 13, "mobilenumber": "9990001111", "name": "Emma Harris", "email": "emma@example.com", "username": "emma_h", "isActive": true, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-07-28"},
    {"id": 14, "mobilenumber": "4448887777", "name": "James Carter", "email": "james@example.com", "username": "james_c", "isActive": false, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-02-05"},
    {"id": 15, "mobilenumber": "7773336666", "name": "Ava Rodriguez", "email": "ava@example.com", "username": "ava_r", "isActive": true, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-10-19"}
  ];


  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }
  //remove user  
  removeUser(id: number): void {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }

  updateUser(updatedUser: User): void {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }

  getExistingEmails(): string[] {
    return this.users.map((user) => user.email);
  }

  getExistingUsernames(): string[] {
    return this.users.map((user) => user.username);
  }

  //check for their uniqueness
  isEmailUnique(email: string, currentUserId?: number): boolean {
    return !this.users.some((user) => user.email === email && user.id !== currentUserId);
  }

  isUsernameUnique(username: string, currentUserId?: number): boolean {
    return !this.users.some((user) => user.username === username && user.id !== currentUserId);
  }
  

  //add user  
  addUser(user: User): void {
    //user.id = this.users.length + 1;
   this.users.push(user);
   console.log(this.users);
  }
}
