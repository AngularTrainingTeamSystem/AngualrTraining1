import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 
  url='http://localhost:3000/user'

  
  constructor(private http:HttpClient) { 
   
  }
saveUser(user:User):Observable<any>{
  return this.http.post(`${this.url}`,user)
}

  loadUserByCredentials(email:string,password:string):Observable<any>{
    return this.http.get(`${this.url}/?email=${email}&password=${password}`)
     .pipe(
      map((response: any) => response as Array<any>),
      map((response: Array<any>) => response[0])
     )
  }

  findEmail(email: string): Observable<boolean> {
    return this.http.get(this.url).pipe(
      map((response: any) => response as Array<any>),
      map((contacts: Array<any>) => contacts.some(contact => contact.email == email)),
    );
  }

}
