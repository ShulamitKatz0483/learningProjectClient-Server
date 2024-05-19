import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsForStudentComponent } from './lessons-for-student.component';

describe('LessonsForStudentComponent', () => {
  let component: LessonsForStudentComponent;
  let fixture: ComponentFixture<LessonsForStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LessonsForStudentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LessonsForStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
