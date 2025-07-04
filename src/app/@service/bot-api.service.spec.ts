import { TestBed } from '@angular/core/testing';

import { BotAPIService } from './bot-api.service';

describe('BotAPIService', () => {
  let service: BotAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
