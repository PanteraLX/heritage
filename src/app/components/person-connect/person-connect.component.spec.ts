import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonConnectComponent } from './person-connect.component';

describe('PersonConnectComponent', () => {
  let component: PersonConnectComponent;
  let fixture: ComponentFixture<PersonConnectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonConnectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
