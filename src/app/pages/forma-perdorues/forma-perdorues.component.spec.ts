import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaPerdoruesComponent } from './forma-perdorues.component';

describe('FormaPerdoruesComponent', () => {
  let component: FormaPerdoruesComponent;
  let fixture: ComponentFixture<FormaPerdoruesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormaPerdoruesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormaPerdoruesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
