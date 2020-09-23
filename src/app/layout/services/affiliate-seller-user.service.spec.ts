import { TestBed } from '@angular/core/testing';

import { AffiliateSellerUserService } from './affiliate-seller-user.service';

describe('AffiliateSellerUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AffiliateSellerUserService = TestBed.get(AffiliateSellerUserService);
    expect(service).toBeTruthy();
  });
});
