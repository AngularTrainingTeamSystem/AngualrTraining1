import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDisplayerComponent } from './contact-displayer.component';

describe('ContactDisplayerComponent', () => {
  let component: ContactDisplayerComponent;
  let fixture: ComponentFixture<ContactDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactDisplayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
