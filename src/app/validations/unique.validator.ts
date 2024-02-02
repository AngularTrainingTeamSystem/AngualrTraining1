import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ContactService } from "../services/contact.service";
import { Contact } from "../models/contact";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { Inject, inject } from "@angular/core";
import { AppInjector } from "../app.module";
import { finalize } from "rxjs";


export class Unique{}

export function createUnique(id:string | null):ValidatorFn |null{
  const service=inject(ContactService)
    /*return (control:AbstractControl):ValidationErrors |null =>{
        const service=AppInjector.get(ContactService)
       let contactWithThisId :Contact | undefined
       let allContacts:any
       

       if (!control.value){ return null};
      let form:FormGroup|FormArray|null=control.parent
      
      service.getContacts().pipe(finalize(()=>{
        if(id!=null){
          console.log("idddd" +id)
          service.getContactById(id)
          .pipe(finalize(()=>{return getValidation(service,control,allContacts,contactWithThisId)})).subscribe(
            contact=>contactWithThisId=contact
          )
        }
        else {return getValidation(service,control,allContacts,contactWithThisId)}
      })).subscribe(
        contacts=> allContacts=contacts
      )
      
    }*/

return null
}

function getValidation(service:ContactService,control:AbstractControl,
  allContacts:any,contactWithThisId:any){
  
  if (!control.value){ return null};
  let form:FormGroup|FormArray|null=control.parent
  let isEmail,isUsername = false;

if ('email' in form!.controls) {
  
isEmail = form!.controls["email"] === control;
if(isEmail==true){

let index=allContacts.findIndex((c: { email: string; })=>c.email===control.value)
console.log("kontakti me indexxx"+JSON.stringify(allContacts[index]))
console.log("kontakti nga id"+JSON.stringify(contactWithThisId))
if(index!=-1){
if(contactWithThisId==allContacts[index]){
  console.log("jan i njejti kontakttt")
  return null
}
console.log("nuk jan i njejti kontakttt")
return  {unique:true}
}
}
}
if ('username' in form!.controls) {
isUsername = form!.controls["username"] === control;
if(isUsername==true){
 
let index=allContacts.findIndex((c: { username: string; })=>c.username===control.value)
if(index!=-1){
if(contactWithThisId==allContacts[index]){
  return null
}
return  {unique:true}
}
}
}

  
  return null;
}