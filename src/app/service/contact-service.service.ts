import { Injectable, Input } from '@angular/core';
import { Contact } from '../model/contat';
import { Contacts } from '../contacts-db';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  @Input()
  updateContacts!: any;

  // getContactById(id: any) {
  //   this.updateContacts = this.router.getCurrentNavigation()?.extras.state;
  // }



  contactz: any;

  url = 'http://localhost:3000/contacts';



  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {

  } addContact(contact: any): Observable<any> {
    return this.http.post<any>(this.url, contact);
  }

  getContactById(id: string | null): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  getAllContacts(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  updateContact(updateContact: any): Observable<any> {
    const updateUrl = `${this.url}/${updateContact.id}`;
    return this.http.put<any>(updateUrl, updateContact);
  }

  deleteContactById(id: string): Observable<void> {
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete<void>(deleteUrl);
  }

  hasEmail(emailToCheck: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/hasEmail/${emailToCheck}`);
  }

  hasUsername(usernameToCheck: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/hasUsername/${usernameToCheck}`);
  }



}
