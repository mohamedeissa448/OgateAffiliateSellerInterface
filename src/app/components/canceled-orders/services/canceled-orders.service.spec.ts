import { TestBed } from '@angular/core/testing';

import { CanceledOrdersService } from './canceled-orders.service';

describe('CanceledOrdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanceledOrdersService = TestBed.get(CanceledOrdersService);
    expect(service).toBeTruthy();
  });
});
