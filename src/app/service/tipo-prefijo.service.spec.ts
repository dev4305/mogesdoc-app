import { TestBed } from '@angular/core/testing';

import { TipoPrefijoService } from './tipo-prefijo.service';

describe('TipoPrefijoService', () => {
  let service: TipoPrefijoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoPrefijoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
