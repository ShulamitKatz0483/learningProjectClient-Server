import { TestBed } from '@angular/core/testing';

import { StudentInLessonService } from './student-in-lesson.service';

describe('StudentInLessonService', () => {
  let service: StudentInLessonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentInLessonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
