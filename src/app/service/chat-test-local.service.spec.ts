import { TestBed } from '@angular/core/testing';

import { ChatTestLocalService } from './chat-test-local.service';

describe('ChatTestLocalService', () => {
  let service: ChatTestLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatTestLocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
