import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferrerComponent } from './referrer.component';

describe('ReferrerComponent', () => {
  let component: ReferrerComponent;
  let fixture: ComponentFixture<ReferrerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferrerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferrerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
