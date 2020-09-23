import { TestBed } from '@angular/core/testing';

import { ReturnedOrdersService } from './returned-orders.service';

describe('ReturnedOrdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReturnedOrdersService = TestBed.get(ReturnedOrdersService);
    expect(service).toBeTruthy();
  });
});
