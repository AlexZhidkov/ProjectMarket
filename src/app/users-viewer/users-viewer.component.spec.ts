import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersViewerComponent } from './users-viewer.component';

describe('UsersViewerComponent', () => {
  let component: UsersViewerComponent;
  let fixture: ComponentFixture<UsersViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
