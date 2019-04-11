import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeReportComponent } from './judge-report.component';

describe('JudgeReportComponent', () => {
  let component: JudgeReportComponent;
  let fixture: ComponentFixture<JudgeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
