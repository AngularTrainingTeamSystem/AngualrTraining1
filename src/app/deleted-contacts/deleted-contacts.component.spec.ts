import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedContactsComponent } from './deleted-contacts.component';

describe('DeletedContactsComponent', () => {
  let component: DeletedContactsComponent;
  let fixture: ComponentFixture<DeletedContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedContactsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletedContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
