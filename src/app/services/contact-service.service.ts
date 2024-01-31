import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class ContactService {
      //STEP 4. ADD  URL JSON SERVER ENDPOINT
      private apiUrl = 'http://localhost:3000/contacts';

      //STEP 5. ADD HTTP CLIENT CONSTRUCTOR
      constructor(private http: HttpClient) { } //as dependency
  
      getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
      }
      
      getUserById(id: number): Observable<User> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<User>(url);
      }

      //remove user  
      removeUser(id: number): Observable<any> {
      const headers = { 'content-type': 'application/json' }; // format of data sent to body,neccessary -> post/put
      const url = `${this.apiUrl}/${id}`; 
      return this.http.delete(url, { headers });
      }

      updateUser(updatedUser: User): Observable<any> {
      const headers = { 'content-type': 'application/json' };
      const body = JSON.stringify(updatedUser); // turn into JSON string
      const url = `${this.apiUrl}/${updatedUser.id}`;
      return this.http.put(url, body);
      }
  
      //add user  
      addUser(user: User): void {
      const headers ={ 'Content-Type': 'application/json' };
      const body = JSON.stringify(user);

      this.http.post(this.apiUrl, body, { headers }).subscribe(
        (data) => {
          console.log('Post request successful:', data);
        },
        (error) => {
          console.error('Error in post request:', error)
        }
      );
   }
    //alidations

    getExistingEmails(): Observable<string[]> {
      return this.getUsers().pipe(map(users => users.map(user => user.email)));
    }
  
    getExistingUsernames(): Observable<string[]> {
      return this.getUsers().pipe(map(users => users.map(user => user.username)));
    }

    //check for their uniqueness
    isEmailUnique(email: string, currentUserId?: number): Observable<boolean> {
      return this.getUsers().pipe(
        map(users => !users.some(user => user.email === email && user.id !== currentUserId))
      );
    }
    
    isUsernameUnique(username: string, currentUserId?: number): Observable<boolean> {
      return this.getUsers().pipe(
        map(users => !users.some(user => user.username === username && user.id !== currentUserId))
      );
    }
  }
