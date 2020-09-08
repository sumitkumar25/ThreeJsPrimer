import { TestBed } from '@angular/core/testing';

import { CtVisualizationService } from './ct-visualization.service';

describe('CtVisualizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CtVisualizationService = TestBed.get(CtVisualizationService);
    expect(service).toBeTruthy();
  });
});
