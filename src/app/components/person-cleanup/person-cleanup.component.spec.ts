import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCleanupComponent } from './person-cleanup.component';

describe('PersonCleanupComponent', () => {
  let component: PersonCleanupComponent;
  let fixture: ComponentFixture<PersonCleanupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonCleanupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonCleanupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
