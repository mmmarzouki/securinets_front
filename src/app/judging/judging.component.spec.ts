import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgingComponent } from './judging.component';

describe('JudgingComponent', () => {
  let component: JudgingComponent;
  let fixture: ComponentFixture<JudgingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
