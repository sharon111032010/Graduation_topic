import { TestBed } from '@angular/core/testing';

import { ChatBotService } from '../service/chat-bot.service';

describe('ChatBotService', () => {
  let service: ChatBotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatBotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
