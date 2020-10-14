import { TestBed } from '@angular/core/testing';

import { ThreeFactoryService } from './three-factory.service';

describe('ThreeFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThreeFactoryService = TestBed.get(ThreeFactoryService);
    expect(service).toBeTruthy();
  });
});
