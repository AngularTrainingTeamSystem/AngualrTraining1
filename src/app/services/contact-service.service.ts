import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})

export class ContactService {
  private users: User[] = [
    {"id": 1, "mobilenumber": "1234567890", "name": "John Doe", "isActive": true, "isFavorite": false, "isDeleted": false, "contactDateCreated": "2023-07-12"},
    {"id": 2, "mobilenumber": "9876543210", "name": "Jane Smith", "isActive": false, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-05-24"},
    {"id": 3, "mobilenumber": "5551112233", "name": "Alice Johnson", "isActive": true, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-10-08"},
    {"id": 4, "mobilenumber": "8887776666", "name": "Bob Williams", "isActive": false, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-02-17"},
    {"id": 5, "mobilenumber": "3332221111", "name": "Eve Davis", "isActive": true, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-11-30"},
    {"id": 6, "mobilenumber": "4445556666", "name": "Charlie Brown", "isActive": false, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-08-21"},
    {"id": 7, "mobilenumber": "9998887777", "name": "Grace Taylor", "isActive": true, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-04-06"},
    {"id": 8, "mobilenumber": "7776665555", "name": "Daniel White", "isActive": false, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-09-14"},
    {"id": 9, "mobilenumber": "6665554444", "name": "Sophia Miller", "isActive": true, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-01-28"},
    {"id": 10, "mobilenumber": "2223334444", "name": "Liam Anderson", "isActive": false, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-06-10"},
    {"id": 11, "mobilenumber": "1112223333", "name": "Olivia Parker", "isActive": true, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-03-19"},
    {"id": 12, "mobilenumber": "5554443333", "name": "Matthew Turner", "isActive": false, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-12-02"},
    {"id": 13, "mobilenumber": "9990001111", "name": "Emma Harris", "isActive": true, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-07-28"},
    {"id": 14, "mobilenumber": "4448887777", "name": "James Carter", "isActive": false, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-02-05"},
    {"id": 15, "mobilenumber": "7773336666", "name": "Ava Rodriguez", "isActive": true, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-10-19"}
   ];

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}
