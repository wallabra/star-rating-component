import { TestBed } from '@angular/core/testing';

import { NarrationService } from './narration-service';

describe('NarrationService', () => {
  let service: NarrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NarrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
