import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, map } from "rxjs";
import { CrudService } from "../service/crud.service";
import { Kontakt } from "../models/kontakt";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UniqueEmail implements AsyncValidator{

    constructor(private  service:CrudService) {}
    
    validate(control: AbstractControl): Observable<ValidationErrors | null> | Promise<ValidationErrors | null> {
       return this.service.getAllContacts().pipe(
        map((contacts:any) => contacts as Array<any>),
        map((contacts:Array<any>)=>contacts.some(contact=>contact.email==control.value)),
        map((isUnique:boolean)=>{return isUnique?{uniqueEmail:true}:null}
       ))
    }
 
}