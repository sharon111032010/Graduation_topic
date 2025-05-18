import { TestBed } from '@angular/core/testing';

import { UserInofService } from './user-inof.service';

describe('UserInofService', () => {
  let service: UserInofService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInofService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
