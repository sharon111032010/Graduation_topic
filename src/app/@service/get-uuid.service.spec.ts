import { TestBed } from '@angular/core/testing';

import { GetUUidService } from './get-uuid.service';

describe('GetUUidService', () => {
  let service: GetUUidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUUidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
