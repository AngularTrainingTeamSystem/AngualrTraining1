import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';



@Injectable({
  providedIn: 'root',
})

export class ContactService {
      //STEP 4. ADD  URL JSON SERVER ENDPOINT
      private apiUrl = 'http://localhost:3000/contacts';

      //STEP 5. ADD HTTP CLIENT CONSTRUCTOR
      constructor(private http: HttpClient) { } //as dependency
  
      getUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl); // get request no body; You are getting data not sending 
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
    //Validations
    //Map operator-> can rewrap to an observable so we can subscribe; Thats why we need pipe
    //Observables use observer to respond to data emissions
    //check for their uniqueness

        // Check if the email is unique, excluding the current user
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
     

    emailAsyncValidator(currentUserId?: number): AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return this.isEmailUnique(control.value, currentUserId).pipe(
          map((isUnique: boolean) => (isUnique ? null : { uniqueEmail: true })),
          catchError(() => of(null))
        );
      };
    }
    
    // tap-> taps into stream without chaning; monitoring
    usernameAsyncValidator(currentUserId?: number): AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors | null> => {
        return this.isUsernameUnique(control.value, currentUserId).pipe(
          map((isUnique: boolean) => (isUnique ? null : { uniqueUsername: true })),
          catchError(() => of(null))
        );
      };
    } 
    
  }
