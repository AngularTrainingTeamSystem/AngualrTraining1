import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { Contacts } from '../models/contacts';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, filter, map, of } from 'rxjs';
import { ContactModel } from '../models/contactModel';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  
 url='http://localhost:3000/contacts'

  constructor(private http:HttpClient) { 
   
  }

  getContacts():Observable<any>{
   return this.http.get(this.url)
  }

  getContactById(id:string):Observable<any>{
    return this.http.get(`${this.url}/${id}`)
  }

  updateContact(contact:ContactModel,id:string):Observable<any>{
   return this.http.put(`${this.url}/${id}`,contact)
  }

  addContact(newContact: Contact):Observable<any> {
    return this.http.post(`${this.url}`,newContact)
  }

  deleteContactById(contactId: string):Observable<any> {
   return this.http.delete(`${this.url}/${contactId}`)
  }
 
  findEmail(email: string): Observable<boolean> {
    return this.http.get(this.url).pipe(
      map((response: any) => response as Array<any>),
      map((contacts: Array<any>) => contacts.some(contact => contact.email == email)),
    );
  }

  findUsername(username: string): Observable<boolean> {
    return this.http.get(this.url).pipe(
      map((response: any) => response as Array<any>),
      map((contacts: Array<any>) => contacts.some(contact => contact.username == username))
    );
  }
  
}
