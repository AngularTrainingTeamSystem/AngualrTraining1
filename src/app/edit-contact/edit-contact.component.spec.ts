import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContactComponents } from './edit-contact.component';

describe('EditContactComponents', () => {
  let component: EditContactComponents;
  let fixture: ComponentFixture<EditContactComponents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditContactComponents ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditContactComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
