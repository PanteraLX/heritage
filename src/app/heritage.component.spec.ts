import { TestBed, async } from '@angular/core/testing';
import { HeritageComponent } from './heritage.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeritageComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(HeritageComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'heritage'`, () => {
    const fixture = TestBed.createComponent(HeritageComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('heritage');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(HeritageComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('heritage app is running!');
  });
});
