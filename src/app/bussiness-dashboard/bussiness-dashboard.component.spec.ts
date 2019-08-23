import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessDashboardComponent } from './bussiness-dashboard.component';

describe('BussinessDashboardComponent', () => {
  let component: BussinessDashboardComponent;
  let fixture: ComponentFixture<BussinessDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BussinessDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
