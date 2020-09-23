import { TestBed } from '@angular/core/testing';

import { MediaAuthGuardService } from './media-auth-guard.service';

describe('MediaAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MediaAuthGuardService = TestBed.get(MediaAuthGuardService);
    expect(service).toBeTruthy();
  });
});
