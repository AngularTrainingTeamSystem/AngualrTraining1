import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewContact } from './add-new-contact.component';

describe('AddNewContact', () => {
  let component: AddNewContact;
  let fixture: ComponentFixture<AddNewContact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewContact ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewContact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});