import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOnboardComponent } from './business-onboard.component';

describe('BusinessOnboardComponent', () => {
  let component: BusinessOnboardComponent;
  let fixture: ComponentFixture<BusinessOnboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessOnboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessOnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
