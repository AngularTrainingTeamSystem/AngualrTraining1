import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { ContactServiceService } from '../services/contact-service.service';
import { debounceTime, map, catchError, switchMap } from 'rxjs/operators';
import { of, timer } from 'rxjs';

export class ContactValidators {

  static usernameTaken(contactService: ContactServiceService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return of(null);
      }

      return timer(300).pipe(
        switchMap(() => contactService.isUsernameTaken(control.value)),
        map(isTaken => (isTaken ? { usernameTaken: true } : null)),
        catchError(() => of(null))
      );
    };
  }

  static emailTaken(contactService: ContactServiceService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return of(null);
      }

      return timer(300).pipe(
        switchMap(() => contactService.isEmailTaken(control.value)),
        map(isTaken => (isTaken ? { emailTaken: true } : null)),
        catchError(() => of(null))
      );
    };
  }
}