import { TestBed } from '@angular/core/testing';

import { EmbalagemService } from './embalagem.service';

describe('EmbalagemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmbalagemService = TestBed.get(EmbalagemService);
    expect(service).toBeTruthy();
  });
});
