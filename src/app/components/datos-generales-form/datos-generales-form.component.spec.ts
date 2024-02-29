import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosGeneralesFormComponent } from './datos-generales-form.component';

describe('DatosGeneralesFormComponent', () => {
  let component: DatosGeneralesFormComponent;
  let fixture: ComponentFixture<DatosGeneralesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosGeneralesFormComponent]
    });
    fixture = TestBed.createComponent(DatosGeneralesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
