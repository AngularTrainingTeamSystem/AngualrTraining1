
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Contact } from '../models/contact';
import { Contacts } from '../models/contacts';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createStartsWithUpperCase } from '../validations/startsWithUpperCase.validator';
import { ContactModel } from '../models/contactModel';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  contact: Contact|undefined;
  constructor(
    private route: ActivatedRoute,
    private contactService:ContactService,
    private fb:FormBuilder,
    private router:Router
  ) { }
  form!:FormGroup

  //contacts= this.contactService.getContacts()
  
  ngOnInit() {

    this.form=this.fb.group(
      {
        name:['',{validators:[Validators.required,Validators.minLength(2),createStartsWithUpperCase()],
        updateOn:'blur'}],
        mobile:['',[Validators.required,Validators.minLength(8)]],
        isFavorite:[''],
        isActive:[''],
        isDeleted:[''],
      }
    )

    const routeParams = this.route.snapshot.paramMap;
    const contactIdFromRoute = (routeParams.get('contactId'));
    if(contactIdFromRoute!=null){
    this.contact = this.contactService.getContactById(contactIdFromRoute);
    let contactModel:ContactModel=new ContactModel(this.contact!.mobilenumber
      ,this.contact!.name,this.contact!.isActive,this.contact!.isFavorite,
      this.contact!.isDeleted,this.contact!.contactDateCreated)
    this.initForm(contactModel)
    }
}
initForm(contact:ContactModel){
this.form.setValue(contact)
}
get contactName(){
  return this.form.controls['name']
}
get contactMobile(){
  return this.form.controls['mobile']
}

update(id:string){
      let updatedContact:Contact=new Contact;
      
      updatedContact.contactId=id;
      updatedContact.name=this.form.value['name']
      updatedContact.mobilenumber=this.form.value['mobile']
      updatedContact.isActive=this.form.value['isActive']
      updatedContact.isFavorite=this.form.value['isFavorite']
      updatedContact.isDeleted=this.form.value['isDeleted']
      
      this.contactService.updateContact(updatedContact)
      this.router.navigate(['/main'])
}
setFormAction(){
  const routeParams = this.route.snapshot.paramMap;
  const contactIdFromRoute = (routeParams.get('contactId'));
  if(contactIdFromRoute!=null){
    this.update(this.contact!.contactId)
  }
  else {this.addContact()}
}

addContact(){
  let createdContact:Contact=new Contact;
      createdContact.name=this.form.value['name']
      createdContact.mobilenumber=this.form.value['mobile']
      createdContact.isActive=this.form.value['isActive']
      createdContact.isFavorite=this.form.value['isFavorite']
      createdContact.isDeleted=this.form.value['isDeleted']
      this.contactService.addContact(createdContact)
      this.router.navigate(['/main'])
}
}
