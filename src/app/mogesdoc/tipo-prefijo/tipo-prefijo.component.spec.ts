import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoPrefijoComponent } from './tipo-prefijo.component';

describe('TipoPrefijoComponent', () => {
  let component: TipoPrefijoComponent;
  let fixture: ComponentFixture<TipoPrefijoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoPrefijoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoPrefijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
