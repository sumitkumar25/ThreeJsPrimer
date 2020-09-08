import { TestBed } from '@angular/core/testing';

import { CtVisualizationRequestService } from './ct-visualization-request.service';

describe('CtVisualizationRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CtVisualizationRequestService = TestBed.get(CtVisualizationRequestService);
    expect(service).toBeTruthy();
  });
});
