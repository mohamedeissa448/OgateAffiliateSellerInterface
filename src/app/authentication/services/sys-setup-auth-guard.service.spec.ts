import { TestBed } from '@angular/core/testing';

import { SysSetupAuthGuardService } from './sys-setup-auth-guard.service';

describe('SysSetupAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SysSetupAuthGuardService = TestBed.get(SysSetupAuthGuardService);
    expect(service).toBeTruthy();
  });
});
