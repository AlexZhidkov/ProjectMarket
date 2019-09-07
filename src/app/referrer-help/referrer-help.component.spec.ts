import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferrerHelpComponent } from './referrer-help.component';

describe('ReferrerHelpComponent', () => {
  let component: ReferrerHelpComponent;
  let fixture: ComponentFixture<ReferrerHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferrerHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferrerHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
