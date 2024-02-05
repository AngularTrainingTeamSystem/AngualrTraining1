import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { ContactServiceService } from "../service/contact-service.service";
import { Observable, catchError, map, of } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({providedIn:'root'})

export class EmailUnique implements AsyncValidator {


    constructor(private conctactService : ContactServiceService){
        
    }


    validate(control: AbstractControl): Observable<ValidationErrors | null> {
       return this.conctactService.hasEmail(control.value).pipe(
        map((isUnique) => (isUnique ? {unique : true} : null)),
        catchError(() => of(null))
       )
    }


    validateUserName(control: AbstractControl): Observable<ValidationErrors | null> {
        return this.conctactService.hasUsername(control.value).pipe(
         map((isUnique) => (isUnique ? {unique : true} : null)),
         catchError(() => of(null))
        )
     }




    // registerOnValidatorChange?(fn: () => void): void {
    //     throw new Error("Method not implemented.");
    // }





}