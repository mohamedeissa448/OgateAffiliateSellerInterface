import { TestBed } from '@angular/core/testing';

import { MyPaymentsService } from './my-payments.service';

describe('MyPaymentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyPaymentsService = TestBed.get(MyPaymentsService);
    expect(service).toBeTruthy();
  });
});
