import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeAwayComponent } from './take-away.component';

describe('TakeAwayComponent', () => {
  let component: TakeAwayComponent;
  let fixture: ComponentFixture<TakeAwayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakeAwayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeAwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
