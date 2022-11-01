import { TestBed } from '@angular/core/testing';

import { TipoCorrespondenciaService } from './tipo-correspondencia.service';

describe('TipoCorrespondenciaService', () => {
  let service: TipoCorrespondenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoCorrespondenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
