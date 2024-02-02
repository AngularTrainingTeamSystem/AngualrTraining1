import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { ContactService } from "../services/contact.service";
import { Observable, catchError, map, of } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  constructor(private contactService: ContactService,
             ) {}
    
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
   
    return this.contactService.findUsername(control.value).pipe(
      map((isUnique) => (isUnique ? { unique: true } : null)),
      catchError(() => of(null)),
    );
  }
}