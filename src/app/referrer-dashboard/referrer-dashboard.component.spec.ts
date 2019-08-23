import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferrerDashboardComponent } from './referrer-dashboard.component';

describe('ReferrerDashboardComponent', () => {
  let component: ReferrerDashboardComponent;
  let fixture: ComponentFixture<ReferrerDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferrerDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferrerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
