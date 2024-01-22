import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, delay, tap } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';

interface Contact {
  mobilenumber: string;
  name: string;
  isActive: boolean;
  isFavorite: boolean;
  isDeleted: boolean;
}

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})

export class InfoComponent implements OnInit {
  private list$: Observable<Contact[]> = of([
    { mobilenumber: "123456789", name: "John Doe", isActive: true, isFavorite: false, isDeleted: false },
  ]).pipe(delay(1000));

  public forms$?: Observable<FormGroup[]>;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.forms$ = this.list$.pipe(
      map(this.generateForms.bind(this)), // Binding 'this' to access class methods
      tap(console.log)
    );
  }

  private generateForms(list: Contact[]): FormGroup[] {
    return list.map(
      ({ mobilenumber = "", name = "", isActive = false, isFavorite = false, isDeleted = false }) =>
        new FormGroup({
          mobilenumber: new FormControl(mobilenumber, [Validators.required]),
          name: new FormControl(name, [Validators.required]),
          isActive: new FormControl(isActive),
          isFavorite: new FormControl(isFavorite),
          isDeleted: new FormControl(isDeleted)
        })
    );
  }

  public log(value: Contact): void {
    console.log("value ->", value);
    this.router.navigate(['/contact']);
  
  }

}
