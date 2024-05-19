import { TestBed } from '@angular/core/testing';

import { DavenService } from './daven.service';

describe('DavenService', () => {
  let service: DavenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DavenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
