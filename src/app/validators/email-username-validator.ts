import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:3000/contacts';

export function emailValidator(http: HttpClient): ValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    // Check if the control is an AbstractControl instance
    if (!(control instanceof AbstractControl)) {
      return of(null);
    }

    const email = control.value;

    // If the email field is empty, return null (valid)
    if (!email) {
      return of(null);
    }

    // Use debounceTime to wait for the user to stop typing before making the request
    return of(email).pipe(
      debounceTime(300),
      switchMap(emailToCheck => hasEmail(http, emailToCheck)),
      map(isAvailable => (isAvailable ? null : { emailTaken: true })),
      catchError(() => of({ emailTaken: true })) // In case of an error, consider it as a valid email
    );
  };
}


export function usernameValidator(http : HttpClient) : ValidatorFn{
  return (control : AbstractControl) : Observable<ValidationErrors | null> =>{
      if(!(control instanceof AbstractControl)){
        return of(null);
      }

      const username = control.value;

      if(!username){
        return of (null);
      }

      return of(username).pipe(
        debounceTime(300),
        switchMap(usernameToCheck => hasUsername(http , usernameToCheck)),
        map(isAvailable => (isAvailable ? null : { usernameTaken: true })),
        catchError(()=> of({usernameTaken : true}))
      );

  };
}

function hasEmail(http: HttpClient, emailToCheck: string): Observable<boolean> {
  return http.get<any[]>(`${API_URL}?email=${emailToCheck}`).pipe(
    map(contacts => contacts.length === 0)
  );
}


function hasUsername(http: HttpClient, usernameToCheck: string): Observable<boolean> {
  return http.get<any[]>(`${API_URL}?username=${usernameToCheck}`).pipe(
    map(contacts => contacts.length === 0)

  );
}