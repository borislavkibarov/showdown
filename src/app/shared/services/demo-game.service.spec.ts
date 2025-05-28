import { TestBed } from '@angular/core/testing';

import { DemoGameService } from './demo-game.service';

describe('DemoGameService', () => {
  let service: DemoGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemoGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
