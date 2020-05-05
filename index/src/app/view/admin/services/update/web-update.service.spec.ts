import { TestBed } from '@angular/core/testing';

import { WebUpdateService } from './web-update.service';

describe('WebUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebUpdateService = TestBed.get(WebUpdateService);
    expect(service).toBeTruthy();
  });
});
