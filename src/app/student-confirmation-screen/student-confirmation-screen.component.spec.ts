import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentConfirmationScreenComponent } from './student-confirmation-screen.component';

describe('StudentConfirmationScreenComponent', () => {
  let component: StudentConfirmationScreenComponent;
  let fixture: ComponentFixture<StudentConfirmationScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentConfirmationScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentConfirmationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
