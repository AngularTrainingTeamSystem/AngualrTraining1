import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPerdoruesComponent } from './edit-perdorues.component';

describe('EditPerdoruesComponent', () => {
  let component: EditPerdoruesComponent;
  let fixture: ComponentFixture<EditPerdoruesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPerdoruesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPerdoruesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
