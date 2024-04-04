import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonForManagerComponent } from './lesson-for-manager.component';

describe('LessonForManagerComponent', () => {
  let component: LessonForManagerComponent;
  let fixture: ComponentFixture<LessonForManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LessonForManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LessonForManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
