import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOnboardComponent } from './student-onboard.component';

describe('StudentOnboardComponent', () => {
  let component: StudentOnboardComponent;
  let fixture: ComponentFixture<StudentOnboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentOnboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentOnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
