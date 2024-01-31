import { Validators, ValidatorFn, AbstractControl } from '@angular/forms';

export class CustomValidators extends Validators {

  // calling service here

  static uniqueEmail(existingEmails: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value.toLowerCase();
      if (existingEmails.includes(value)) {
        return { uniqueEmail: true };
      }
      return null;
    };
  }


  static uniqueUsername(existingUsernames: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value.toLowerCase();
      if (existingUsernames.includes(value)) {
        return { uniqueUsername: true };
      }
      return null;
    };
  }
}



