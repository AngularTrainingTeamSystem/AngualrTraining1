import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Kontakt } from '../../models/kontakt';
import { ContactServiceService } from '../../service/contact-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../service/crud.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-edit-perdorues',
  templateUrl: './edit-perdorues.component.html',
  styleUrls: ['./edit-perdorues.component.scss']
})

export class EditPerdoruesComponent implements OnInit {

  [x: string]: any;

  kontakt?: Kontakt;
  form!: FormGroup
  constructor(private contactService: CrudService,
    private route: ActivatedRoute,
    private crudService: CrudService,
    private router: Router

  ) {

  }

  // ngOnInit() {

  //   let id = this.route.snapshot.paramMap.get('id');

  //   if (id !== null) {

  //     this.kontakt = this.contactService.getContact(id) ;
  //   }

  //    this.form = new FormGroup({
  //     name: new FormControl(this.kontakt?.name, [Validators.required]),
  //     number: new FormControl(this.kontakt?.mobilenumber, [Validators.required, Validators.pattern('[0-9]{3}[0-9]{3}[0-9]{4}')]),
  //     birthday: new FormControl(this.kontakt?.contactDateCreated)
  //   });


  // }
  ngOnInit() {

    let id = this.route.snapshot.paramMap.get('id');

    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}[0-9]{3}[0-9]{4}')]),
      birthday: new FormControl('')
    });

    if (id !== null) {
      const formData = this.form.getRawValue();
      this.contactService.getContact(id).subscribe((kontakt) => {
        this.kontakt = kontakt;

        // this.kontakt.name= formData.name;
        // this.kontakt.mobilenumber= formData.mobilenumber.toString();
        // this.kontakt.contactDateCreated= formData.contactDateCreated;

        this.form.setValue({ name: this.kontakt.name, number: this.kontakt.mobilenumber, birthday: this.kontakt.contactDateCreated });

      });
    }
  }




  deleteUser(): void {
    if (this.kontakt && this.kontakt.id) {
      this.crudService.deleteContact(this.kontakt.id).subscribe();
      this.router.navigate(['']);
      alert('User deleted');
    }
  }

  // updateUser(){

  //   this.kontakt!.name=this.form.controls['name'].value
  //   this.kontakt!.mobilenumber=this.form.controls['number'].value
  //   this.kontakt!.contactDateCreated=this.form.controls['birthday'].value

  //   this.crudService.updateContact(this.kontakt!.id,this.kontakt!);
  //   this.router.navigate(['/body'])
  // }

  // updateUser() {
  //   this.kontakt!.name = this.form.controls['name'].value;
  //   this.kontakt!.mobilenumber = this.form.controls['number'].value;
  //   this.kontakt!.contactDateCreated = this.form.controls['birthday'].value;

  //   this.crudService.updateContact(this.kontakt!.id, this.kontakt!)
  //     .subscribe({
  //       next: () => {
  //         this.router.navigate(['/body']);
  //       },
  //       error: (error) => {
  //         console.error('Error updating contact:', error);
  //       },
  //     });
  // }

  updateUser() {
    this.kontakt!.name = this.form.controls['name'].value;
    this.kontakt!.mobilenumber = this.form.controls['number'].value;
    this.kontakt!.contactDateCreated = this.form.controls['birthday'].value;

    this.crudService.updateContact(this.kontakt!)
      .subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: (error) => {
          console.error('Error updating contact:', error);
        },
      });
  }


}
