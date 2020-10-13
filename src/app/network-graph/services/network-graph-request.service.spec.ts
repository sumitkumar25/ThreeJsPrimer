import { TestBed } from '@angular/core/testing';

import { NetworkGraphRequestService } from './network-graph-request.service';

describe('NetworkGraphRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetworkGraphRequestService = TestBed.get(NetworkGraphRequestService);
    expect(service).toBeTruthy();
  });
});
