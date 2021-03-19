import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbalagemComponent } from './embalagem.component';

describe('EmbalagemComponent', () => {
  let component: EmbalagemComponent;
  let fixture: ComponentFixture<EmbalagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmbalagemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbalagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
