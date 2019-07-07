import { TestBed } from '@angular/core/testing';

import { BlocoService } from './bloco.service';

describe('BlocoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlocoService = TestBed.get(BlocoService);
    expect(service).toBeTruthy();
  });
});
