import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosGeneralesPageComponent } from './datos-generales-page.component';

describe('DatosGeneralesPageComponent', () => {
  let component: DatosGeneralesPageComponent;
  let fixture: ComponentFixture<DatosGeneralesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosGeneralesPageComponent]
    });
    fixture = TestBed.createComponent(DatosGeneralesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
