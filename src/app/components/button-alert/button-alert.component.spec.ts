import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAlertComponent } from './button-alert.component';

describe('ButtonAlertComponent', () => {
  let component: ButtonAlertComponent;
  let fixture: ComponentFixture<ButtonAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
