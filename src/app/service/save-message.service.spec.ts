import { TestBed } from '@angular/core/testing';

import { SaveMessageService } from './save-message.service';

describe('SaveMessageService', () => {
  let service: SaveMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaveMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
