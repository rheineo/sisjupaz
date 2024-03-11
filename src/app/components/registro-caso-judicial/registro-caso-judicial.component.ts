import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map, of, startWith } from 'rxjs';
import { DateAdapter, ThemePalette } from '@angular/material/core';
import { MaxSizeValidator } from '@angular-material-components/file-input';

import { DatePipe } from '@angular/common';

export interface SelectorItems {
  name: string;
  value: number;
}

@Component({
  selector: 'app-registro-caso-judicial',
  templateUrl: './registro-caso-judicial.component.html',
  styleUrls: ['./registro-caso-judicial.component.scss']
})
export class RegistroCasoJudicialComponent {



  juzgadoFormGroup = this._formBuilder.group({
    juzgado: new FormControl('', Validators.required),
    nombrejuez: new FormControl({ value: 'Ana Gabriela', disabled: true }),
    apellidojuez: new FormControl({ value: 'Rodriguez Martinez', disabled: true }),   
  });

  toppings = new FormControl('');
  datosSolicitudFormGroup = this._formBuilder.group({
    fecha: new FormControl('', Validators.required),
    tipoProceso: new FormControl('')
  });

  datosInvolucradosFormGroup = this._formBuilder.group({
    nombreDenunciante: new FormControl('', Validators.required),
    apellidoDenunciante: new FormControl('', Validators.required),
    tipoDocumentoDenunciante: new FormControl('', Validators.required),
    numeroDocumentoDenunciante: new FormControl('', Validators.required),
    nombreDenunciado: new FormControl('', Validators.required),
    apellidoDenunciado: new FormControl('', Validators.required),
    tipoDocumentoDenunciado: new FormControl('', Validators.required),
    numeroDocumentoDenunciado: new FormControl('', Validators.required)
  });


  actividadesProcesalFormGroup: FormGroup;

  actividadesProcesales: FormArray;
  decisionFormGroup = this._formBuilder.group({
    conciliacion: new FormControl('', Validators.required),
    fechaDecision: new FormControl('', Validators.required),
    decisionTomada: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    derivacion: new FormControl('', Validators.required),
    tipoDerivacion: new FormControl('', Validators.required),
    documentoFirma: new FormControl('', Validators.required),
  });

  documentos: File[] = [];
 
  filteredOptions: Observable<SelectorItems[]> = of([]);
  activeStepIndex = 0;
  // para manipular archivos
  color: ThemePalette = 'primary';  
  disabled: boolean = false;
  multiple: boolean = true;
  accept: string = "image/*,.pdf";
  fileControlFVR: FormControl;
  fileControlDocProcesal: FormControl;
  fileControlFirma: FormControl;
  filesFVR: any[] = [];
  filesDocProcesal: any[] = [];
  filesFirma: any[] = [];


  maxSize = 32;
  uploading: boolean = false;
  
  
  lstJuzgado: SelectorItems[] = [{ name: 'Juzgado 1', value: 1 }, { name: 'Juzgado 2', value: 2 }, { name: 'Juzgado 3', value: 3 }];
  lstTipoProceso: SelectorItems[] = [
    {
      name: "Alimentos",
      value: 1
    },
    {
      name: "Faltas",
      value: 2
    },
    {
      name: "Violencia contra la mujer e integra...",
      value: 3
    },
    {
      name: "Conflictos Patrimoniales",
      value: 4
    },
    {
      name: "Sumarias intervenciones respecto del niño",
      value: 5
    },
    {
      name: "Levantamiento de cadáveres",
      value: 6
    }
  ];
  lstTipoDocumento: SelectorItems[] = [{ name: 'Cédula', value: 1 }, { name: 'Pasaporte', value: 2 }, { name: 'Cédula de Extranjería', value: 3 }];
  lstConciliacion: SelectorItems[] = [{ name: 'Conciliación 1', value: 1 }, { name: 'Conciliación 2', value: 2 }, { name: 'Conciliación 3', value: 3 }];
  lstDerivacion: SelectorItems[] = [{ name: 'Derivación 1', value: 1 }, { name: 'Derivación 2', value: 2 }, { name: 'Derivación 3', value: 3 }];
  

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


  constructor(private _formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>, private datePipe: DatePipe,
    private cdr: ChangeDetectorRef) {
    this._adapter.setLocale('es');

    this.fileControlFVR = new FormControl(this.filesFVR, [
      Validators.required,
      MaxSizeValidator(this.maxSize * 1024 * 1024)
    ]);

    this.fileControlDocProcesal = new FormControl(this.filesDocProcesal, [
      Validators.required,
      MaxSizeValidator(this.maxSize * 1024 * 1024)
    ]);

    this.fileControlFirma = new FormControl(this.filesFirma, [
      Validators.required,
      MaxSizeValidator(this.maxSize * 1024 * 1024)
    ]);

    

    this.actividadesProcesales = this._formBuilder.array([
      this.crearActividadProcesal()
    ]);
    this.actividadesProcesalFormGroup = this._formBuilder.group({
      campoNoRepetido: [''], 
      actividadesProcesales: this.actividadesProcesales
    });   
    
    }

  ngOnInit() {
    // inicializacion de autocomplete
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

    // Agregar archivos seleccionados a this.files
    // this.fileControlFVR.valueChanges.subscribe((files: any[]) => {
      // this.filesFVR.push(...files);
    // });

    // this.inicializarControles();
  }

  ngAfterViewInit(): void {
    // Forzar la actualización de estilos de los elementos agregados dinámicamente
    setTimeout(() => {
      // Realizar alguna operación mínima que obligue a Angular a renderizar nuevamente los elementos

    });
  }

  formatDate(date: Date | null): string {
    if (date) {
      return this.datePipe.transform(date, 'dd/MM/yyyy') ?? '';
    }
    return '';
  }

  displayFn(juzgado: SelectorItems): string {
    return juzgado?.name ?? '';
  }

  private _filter(name: string): SelectorItems[] {
    const filterValue = name.toLowerCase();

    return this.lstJuzgado.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private crearActividadProcesal() {
    return this._formBuilder.group({
      fecha: ['', Validators.required],
      actividadProcesal: ['', [Validators.required, Validators.maxLength(100)]]
    });
  
  }

  agregarActividadProcesal(): void {
    this.actividadesProcesales.push(this.crearActividadProcesal());
    this.cdr.detectChanges();
  }

  eliminarActividadProcesal(index: number): void {
    this.actividadesProcesales.removeAt(index);
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

  onFileSelectedFVR(event: any): void {
    if (event?.target?.files) {
      const files: FileList = event.target.files;      
      this.filesFVR = this.filesFVR ? this.filesFVR.concat(Array.from(files)) : Array.from(files);
      
    } else {
      console.error("No se detectaron archivos seleccionados.");
    }
  }

  onDeleteFVR(file: any) {
    this.filesFVR = this.filesFVR.filter(f => f.name !== file.name);
  }

  onFileSelectedDocProcesal(event: any): void {
    if (event?.target?.files) {
      const files: FileList = event.target.files;
      this.filesDocProcesal = this.filesDocProcesal ? this.filesDocProcesal.concat(Array.from(files)) : Array.from(files);

    } else {
      console.error("No se detectaron archivos seleccionados.");
    }
  }

  onDeleteDocProcesal(file: any) {
    this.filesDocProcesal = this.filesDocProcesal.filter(f => f.name !== file.name);
  }

  onFileSelectedFirma(event: any): void {
    if (event?.target?.files) {
      const files: FileList = event.target.files;
      this.filesFirma = this.filesFirma ? this.filesFirma.concat(Array.from(files)) : Array.from(files);

    } else {
      console.error("No se detectaron archivos seleccionados.");
    }
  }

  onDeleteDocFirma(file: any) {
    this.filesDocProcesal = this.filesDocProcesal.filter(f => f.name !== file.name);
  }



  onUpload() {
    this.uploading = true;
    for (let file of this.filesFVR) {
      const filePath = `uploads/${file.name}`;
      // const ref = this.storage.ref(filePath);
      // ref.put(file).on('state_changed', (snapshot) => {
        // Mostrar progreso de la subida
      // }, (error) => {
        // Mostrar mensaje de error
      // }, () => {
        // Mostrar mensaje de éxito
        // this.uploading = false;
     //  });
    }
  }

  
}
