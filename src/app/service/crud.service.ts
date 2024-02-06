import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

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

interface User {
  name: string;
  email: string;
  phone: number;
  password: string;
  id: number;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  url = 'http://localhost:3000/contacts';
  urlUser = "http://localhost:3000/user";

  constructor(private http: HttpClient) { }

  getAllContacts() {
    return this.http.get(this.url)
  }

  getAllUsersLoginInfo() {
    return this.http.get(this.urlUser)
  }

  getContact(id: string): Observable<Kontakt> {
    return this.http.get(`${this.url}/${id}`) as Observable<Kontakt>
  }

  deleteContact(id: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  deleteUserLogin(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlUser}/${id}`);
  }

  updateContact(updatedContact: Kontakt): Observable<any> {
    const body = JSON.stringify(updatedContact);
    return this.http.put(`${this.url}/${updatedContact.id}`, body)
  }

  createContact(contact: Kontakt): Observable<Kontakt> {
    return this.http.post<Kontakt>(this.url, contact);
  }

  createUserLogin(user: User): Observable<User> {
    return this.http.post<User>(this.urlUser, user);
  }
  
  createUserBySignUp(user: User): Observable<any> {
    return this.http.post(`${this.urlUser}`, user);
  }

  getUserLogin(email: string, password: string) {
    return this.http.get(`${this.urlUser}/?email=${email}&password=${password}`)
      .pipe(
        map((response: any) => response as Array<any>),
        map((response: Array<any>) => response[0])
      )
  }

  isUsernameTaken(username: string): Observable<boolean> {
    return this.http.get<any>(this.url).pipe(
      map((data) => {
        const contacts = data.contacts;
        return contacts.some((contact: { username: string; }) => contact.username === username);
      })
    );
  }
}

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

//creation by sign up
  // createUserBySignUp(user:User){
  //   this.http.post(`${this.urlUser}`,user).subscribe(
  //   )
  // }
//-----------------------------------------------------------------------------------------------------------------//
