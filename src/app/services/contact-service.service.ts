import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, map, of, tap } from 'rxjs';
import { Contact, contacts } from 'src/app/models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {
  contacts!: Contact[];
  totalItems!: number;
  url = 'http://localhost:3000/contacts';

  constructor(private http: HttpClient) { }

  getContacts(): Observable<any> {
    return this.http.get(this.url).pipe(
      tap((res => this.totalItems = Object.values(res).length)),
      catchError((error) => of(error))
      );
  }

  getContactById(id: string): Observable<Contact> {
    return this.http.get(`${this.url}/${id}`) as Observable<Contact>;
  }

  addContact(newContact: Contact): void {
    const headers = {'content-type': 'application/json'}
    const body = JSON.stringify(newContact);
    
    this.http.post(this.url, body, {headers: headers}).subscribe({
      next: (data) => {
        console.log('POST Request sucessful', data);
      },
      error: (error) => {
        console.log('Error', error);
      }
    });
  }

  updateContact(updatedContact: Contact): Observable<any> {
    const headers = {'content-type': 'application/json'}
    const body = JSON.stringify(updatedContact);
    return this.http.put(`${this.url}/${updatedContact.id}`, body, {'headers': headers}).pipe(
      catchError((error) => of(error))
    );
  }

  deleteContact(id: string): Observable<any>{
    const headers = {'content-type': 'application/json'}
    console.log('ID', id);

    return this.http.delete(`${this.url}/${id}`, {'headers': headers})
  }

  isUsernameTaken(username: string): Observable<boolean> {
    return this.getContacts().pipe(
      map((contacts: Contact[]) => contacts.some((contact: Contact) => contact.username === username)),
      catchError(() => of(false))
    );
  }

  // Check if email already exists
  isEmailTaken(email: string): Observable<boolean> {
    return this.getContacts().pipe(
      map((contacts: Contact[]) => contacts.some((contact: Contact) => contact.email === email)),
      catchError(() => of(false))
    );
  }


  // getContacts(): Contact[] {
  //   return this.contacts;
  // }

  // getContactById(id: string): any {
  //   return  this.contacts.find(contact => contact.contactId === id);
  // }

  // isUsernameTaken(username: string): boolean {
  //   return this.contacts.some(contact => contact.username === username);
  // }
  
  // isEmailTaken(email: string): boolean {
  //   return this.contacts.some(contact => contact.email === email);
  // }
  
  // addContact(newContact: Contact): void {
  //       this.contacts.push(newContact);
  // }

  // updateContact(updatedContact: Contact): void {
  //   const index = this.contacts.findIndex(contact => contact.contactId === updatedContact.contactId);
  //   if (index !== -1) {
  //     this.contacts[index] = updatedContact;
  //   }
  // }

  // deleteContact(contactId: string): void {
  //   this.contacts = this.contacts.filter(contact => contact.contactId !== contactId);
  //   console.log(this.contacts);
  // }

}
