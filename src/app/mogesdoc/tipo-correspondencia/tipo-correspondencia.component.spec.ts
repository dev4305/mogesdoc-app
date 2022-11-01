import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCorrespondenciaComponent } from './tipo-correspondencia.component';

describe('TipoCorrespondenciaComponent', () => {
  let component: TipoCorrespondenciaComponent;
  let fixture: ComponentFixture<TipoCorrespondenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoCorrespondenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoCorrespondenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
