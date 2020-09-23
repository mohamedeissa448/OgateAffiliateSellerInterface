import { TestBed } from '@angular/core/testing';

import { ViewImagesService } from './view-images.service';

describe('ViewImagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewImagesService = TestBed.get(ViewImagesService);
    expect(service).toBeTruthy();
  });
});
