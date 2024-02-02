import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { ContactService } from "../services/contact.service";
import { Observable, catchError, map, of } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class UniqueEmail implements AsyncValidator {
  constructor(private contactService: ContactService,
             private route:ActivatedRoute) {}
    
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
   
    return this.contactService.findEmail(control.value).pipe(
      map((isUnique) => (isUnique ? { unique: true } : null)),
      catchError(() => of(null)),
    );
  }
}