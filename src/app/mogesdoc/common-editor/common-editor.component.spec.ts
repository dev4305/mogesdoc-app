import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonEditorComponent } from './common-editor.component';

describe('CommonEditorComponent', () => {
  let component: CommonEditorComponent;
  let fixture: ComponentFixture<CommonEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
