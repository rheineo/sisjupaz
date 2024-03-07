import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, map, of, startWith } from 'rxjs';
import { DateAdapter } from '@angular/material/core';

import { DatePipe } from '@angular/common';

export interface Juzgado {
  name: string;
  value: number;
}

@Component({
  selector: 'app-registro-caso-judicial',
  templateUrl: './registro-caso-judicial.component.html',
  styleUrls: ['./registro-caso-judicial.component.css']
})
export class RegistroCasoJudicialComponent {

  

  juzgadoFormGroup = this._formBuilder.group({
    juzgado: new FormControl('', Validators.required),
    nombrejuez: new FormControl('', Validators.required),
    apellidojuez: new FormControl('', Validators.required),
    // ... otros campos del primer paso
  });

  toppings = new FormControl('');
  datosSolicitudFormGroup = this._formBuilder.group({
    fecha: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required)
    // ... otros campos del segundo paso
  });

  datosDenuncianteFormGroup = this._formBuilder.group({
    nombre: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required)
    // ... otros campos del segundo paso
  });

  datosDenunciadoFormGroup = this._formBuilder.group({
    nombre: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required)
    // ... otros campos del segundo paso
  });

  actividadesProcesalFormGroup = this._formBuilder.group({
    fecha: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required)
    // ... otros campos del segundo paso
  });

  decisionFormGroup = this._formBuilder.group({
    fecha: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required),
    observacion: new FormControl('', Validators.required),
    decisionTomada: new FormControl('', Validators.required),
    derivacion: new FormControl('', Validators.required),
    documentoFirma: new FormControl('', Validators.required),
    // ... otros campos del segundo paso
  });


  // fechaDecision: Date;  
  documentos: File[] = [];
  lstJuzgado: Juzgado[] = [{ name: 'Juzgado 1', value: 1 }, { name: 'Juzgado 2', value: 2 }, { name: 'Juzgado 3', value: 3 }];
  lstTipoProceso: string[] = ['Alimentos', 'Faltas', 'Violencia contra la mujer e integra...', 'Conflictos Patrimoniales', 'Sumarias intervenciones respecto del niño', 'Levantamiento de cadáveres'];
  filteredOptions: Observable<Juzgado[]> = of([]);

  // Propiedades para el stepper
  steps = [
    {
      label: 'Juzgado y Juez',
      formDisabled: false,
    },
    {
      label: 'Datos de Solicitud',
      formDisabled: false,
    },
    {
      label: 'Datos de Involucrados',
      formDisabled: false,
    },
    {
      label: 'Actividades Procesales',
      formDisabled: false,
    },
    {
      label: 'Decisión Dictada',
      formDisabled: false,
    },
  ];
  activeStepIndex = 0;

  constructor(private _formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>, private datePipe: DatePipe) { 
    this._adapter.setLocale('es');
    }

  ngOnInit() {
    this.filteredOptions = this.juzgadoFormGroup.controls['juzgado'].valueChanges.pipe(
      startWith(''),
      map(value => {
        if (value !== null) {
          const name = value;
          return name ? this._filter(name) : this.lstJuzgado.slice();
        } else {
          return this.lstJuzgado.slice();
        }
      }),
    );
  }

  formatDate(date: Date | null): string {
    if (date) {
      return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
    }
    return '';
  }

  displayFn(juzgado: Juzgado): string {
    return juzgado?.name ?? '';
  }

  private _filter(name: string): Juzgado[] {
    const filterValue = name.toLowerCase();

    return this.lstJuzgado.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  // Métodos para navegar entre pasos
  onPreviousStep() {
    this.activeStepIndex--;
  }

  onNextStep() {
    this.activeStepIndex++;
  }

  // Métodos para manejar el formulario
  onSubmit() {
    // Enviar datos del formulario
  }

  onCancel() {
    // Restablecer el formulario
  }

  onReset() {
    // Restablecer el stepper al primer paso
    this.activeStepIndex = 0;
  }

  // Métodos para adjuntar documentos
  onFileSelected(event: any) {
    this.documentos = event.target.files;
  }
}
