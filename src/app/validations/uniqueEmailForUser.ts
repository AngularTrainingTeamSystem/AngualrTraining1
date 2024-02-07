import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { ContactService } from "../services/contact.service";
import { Observable, catchError, map, of } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "../services/user.service";

@Injectable({ providedIn: 'root' })
export class UniqueEmailUser implements AsyncValidator {
  constructor(private userService: UserService,
             private route:ActivatedRoute) {}
    
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
   
    return this.userService.findEmail(control.value).pipe(
      map((isUnique) => (isUnique ? { unique: true } : null)),
      catchError(() => of(null)),
    );
  }
}