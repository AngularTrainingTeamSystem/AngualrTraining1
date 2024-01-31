// custom-validators.ts
import { AbstractControl, ValidationErrors, AsyncValidatorFn, AsyncValidator, FormControl } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { ContactServiceService } from '../service/contact-service.service';

export class CustomValidators {

  constructor(private contactService: ContactServiceService) {}

  static emailExists(contactService: ContactServiceService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return timer(300).pipe(
        switchMap(() => {
          const emailToCheck = control.value;
          return contactService.hasEmail(emailToCheck).pipe(
            map(exists => (exists ? { emailExists: true } : null))
          );
        })
      );
    };
  }

  static usernameExists(contactService: ContactServiceService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return timer(300).pipe(
        switchMap(() => {
          const usernameToCheck = control.value;
          return contactService.hasUsername(usernameToCheck).pipe(
            map(exists => (exists ? { usernameExists: true } : null))
          );
        })
      );
    };
  }
}
