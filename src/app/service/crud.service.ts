import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';




interface Kontakt {
  id: string;
  mobilenumber: string;
  name: string;
  isActive: boolean;
  isFavorite: boolean;
  isDeleted: boolean;
  contactDateCreated: string;
  username: string;
  email: string;

}



@Injectable({
  providedIn: 'root'
})
export class CrudService {
  // kontaktet:Kontakt[]=[
  //   { "id": "c1", "mobilenumber": "1234567890", "name": "John Doe", "isActive": true, "isFavorite": false, "isDeleted": false, "contactDateCreated": "2023-07-12", "username": "john_doe", "email": "john.doe@example.com" },
  // { "id": "c2", "mobilenumber": "9876543210", "name": "Jane Smith", "isActive": false, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-05-24", "username": "jane_smith", "email": "jane.smith@example.com" },
  // { "id": "c3", "mobilenumber": "5551112233", "name": "Alice Johnson", "isActive": true, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-10-08", "username": "alice_johnson", "email": "alice.johnson@example.com" },
  // { "id": "c4", "mobilenumber": "8887776666", "name": "Bob Williams", "isActive": false, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-02-17", "username": "bob_williams", "email": "bob.williams@example.com" },
  // { "id": "c5", "mobilenumber": "3332221111", "name": "Eve Davis", "isActive": true, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-11-30", "username": "eve_davis", "email": "eve.davis@example.com" },
  // { "id": "c6", "mobilenumber": "4445556666", "name": "Charlie Brown", "isActive": false, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-08-21", "username": "charlie_brown", "email": "charlie.brown@example.com" },
  // { "id": "c7", "mobilenumber": "9998887777", "name": "Grace Taylor", "isActive": true, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-04-06", "username": "grace_taylor", "email": "grace.taylor@example.com" },
  // { "id": "c8", "mobilenumber": "7776665555", "name": "Daniel White", "isActive": false, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-09-14", "username": "daniel_white", "email": "daniel.white@example.com" },
  // { "id": "c9", "mobilenumber": "6665554444", "name": "Sophia Miller", "isActive": true, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-01-28", "username": "sophia_miller", "email": "sophia.miller@example.com" },
  // { "id": "c10", "mobilenumber": "2223334444", "name": "Liam Anderson", "isActive": false, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-06-10", "username": "liam_anderson", "email": "liam.anderson@example.com" },
  // { "id": "c11", "mobilenumber": "1112223333", "name": "Olivia Parker", "isActive": true, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-03-19", "username": "olivia_parker", "email": "olivia.parker@example.com" },
  // { "id": "c12", "mobilenumber": "5554443333", "name": "Matthew Turner", "isActive": false, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-12-02", "username": "matthew_turner", "email": "matthew.turner@example.com" },
  // { "id": "c13", "mobilenumber": "9990001111", "name": "Emma Harris", "isActive": true, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-07-28", "username": "emma_harris", "email": "emma.harris@example.com" },
  // { "id": "c14", "mobilenumber": "4448887777", "name": "James Carter", "isActive": false, "isFavorite": false, "isDeleted": true, "contactDateCreated": "2023-02-05", "username": "james_carter", "email": "james.carter@example.com" },
  // { "id": "c15", "mobilenumber": "7773336666", "name": "Ava Rodriguez", "isActive": true, "isFavorite": true, "isDeleted": false, "contactDateCreated": "2023-10-19", "username": "ava_rodriguez", "email": "ava.rodriguez@example.com" }
  // ]

  url = 'http://localhost:3000/contacts';


  //remove 
  constructor(private http: HttpClient) { }



  // createContact(contact: Kontakt): void {
  //   this.kontaktet.push(contact);
  // }

  // getContact(id: string): Kontakt | undefined {
  //   return this.kontaktet.find(contact => contact.id === id);
  // }

  // updateContact(id: string, updatedContact: Kontakt): void {
  //   const contactIndex = this.kontaktet.findIndex(contact => contact.id === id);

  //   if (contactIndex !== -1) {
  //     this.kontaktet[contactIndex] = updatedContact;
  //   }
  // }

  // deleteContact(id: string): void {
  //   const contactIndex = this.kontaktet.findIndex(contact => contact.id === id);
  //   if (contactIndex !== -1) {
  //     this.kontaktet.splice(contactIndex, 1);
  //     console.log(this.kontaktet);
  //   }
  // }

  // getAllContacts(): Kontakt[] {
  //   return this.kontaktet;
  // }
  //-----------------------------------------------------------------------------------------------------------------//
  getAllContacts() {
    return this.http.get(this.url)

  }

  getContact(id: string): Observable<Kontakt> {
    return this.http.get(`${this.url}/${id}`) as Observable<Kontakt>
  }

  deleteContact(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  updateContact(updatedContact: Kontakt): Observable<any> {
    const body = JSON.stringify(updatedContact);

    return this.http.put(`${this.url}/${updatedContact.id}`, body)
  }

  createContact(contact: Kontakt): Observable<Kontakt> {
    return this.http.post<Kontakt>(this.url, contact);
  }




}
