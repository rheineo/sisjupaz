import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCasoJudicialComponent } from './registro-caso-judicial.component';

describe('RegistroCasoJudicialComponent', () => {
  let component: RegistroCasoJudicialComponent;
  let fixture: ComponentFixture<RegistroCasoJudicialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroCasoJudicialComponent]
    });
    fixture = TestBed.createComponent(RegistroCasoJudicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
