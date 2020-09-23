import { TestBed } from '@angular/core/testing';

import { ViewOrderDetailsService } from './view-order-details.service';

describe('ViewOrderDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewOrderDetailsService = TestBed.get(ViewOrderDetailsService);
    expect(service).toBeTruthy();
  });
});
