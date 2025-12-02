import { TestBed } from '@angular/core/testing';

import { FruitStorageService } from './fruit-storage.service';

describe('FruitStorageService', () => {
  let service: FruitStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FruitStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
