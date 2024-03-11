import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCasoNotarialComponent } from './registro-caso-notarial.component';

describe('RegistroCasoNotarialComponent', () => {
  let component: RegistroCasoNotarialComponent;
  let fixture: ComponentFixture<RegistroCasoNotarialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroCasoNotarialComponent]
    });
    fixture = TestBed.createComponent(RegistroCasoNotarialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
