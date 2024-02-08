import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { debounceTime, map, catchError, switchMap } from 'rxjs/operators';
import { of, timer } from 'rxjs';
import { AuthServiceService } from '../services/auth-service.service';

export class UserValidators {

  static emailTaken(authService: AuthServiceService): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return of(null);
      }

      return timer(300).pipe(
        switchMap(() => authService.isEmailTaken(control.value)),
        map(isTaken => (isTaken ? { emailTaken: true } : null)),
        catchError(() => of(null))
      );
    };
  }
}