import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyHolderComponent } from './body-holder.component';

describe('BodyHolderComponent', () => {
  let component: BodyHolderComponent;
  let fixture: ComponentFixture<BodyHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BodyHolderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodyHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
