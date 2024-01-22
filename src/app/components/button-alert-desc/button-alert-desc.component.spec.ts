import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAlertDescComponent } from './button-alert-desc.component';

describe('ButtonAlertDescComponent', () => {
  let component: ButtonAlertDescComponent;
  let fixture: ComponentFixture<ButtonAlertDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonAlertDescComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonAlertDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
