import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoQuestionComponent } from './demo-question.component';

describe('DemoQuestionComponent', () => {
  let component: DemoQuestionComponent;
  let fixture: ComponentFixture<DemoQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemoQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemoQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
