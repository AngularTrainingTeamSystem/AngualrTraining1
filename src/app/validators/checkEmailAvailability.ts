import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map } from 'rxjs';
import { CrudService } from '../service/crud.service';
import { Kontakt } from '../models/kontakt';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CheckEmailAvailability implements AsyncValidator {
  constructor(private service: CrudService) {}

  validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> | Promise<ValidationErrors | null> {
    return this.service.getAllUsersLoginInfo().pipe(
      map((users: any) => users as Array<any>),
      map((users: Array<any>) =>
        users.some((user) => user.email == control.value)
      ),
      map((isUnique: boolean) => {
        return isUnique ? { uniqueEmail: true } : null;
      })
    );
  }
}
