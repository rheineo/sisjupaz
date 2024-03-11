import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfflineManagerService } from '../../services/offline-manager.service';
import { FormFiles } from 'src/app/interfaces/form-files.interface';

@Component({
  selector: 'app-datos-generales-form',
  templateUrl: './datos-generales-form.component.html',
  styleUrls: ['./datos-generales-form.component.scss']
})
export class DatosGeneralesFormComponent implements OnInit {

  datosGeneralesForm!: FormGroup;
  imagen?: File;
  pdf?: File;
  doc?: File;
  excel?: File;

  constructor(
    private fb: FormBuilder,
    private offlineManager: OfflineManagerService
  ) { }

  ngOnInit(): void {
    this.datosGeneralesForm = this.fb.group({
      numeroDocumento: ['', [Validators.required, Validators.maxLength(8)]],
      tipoDocumento: ['', Validators.required],
      lenguaMaterna: ['', Validators.required],
      otroIdioma: [''],
      datosTelefonicos: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      autoIdentificacionEtnica: ['', Validators.required],
      gradoEducacion: ['', Validators.required],
      tipoComunidad: ['', Validators.required],
      discapacidad: [false]
    });
  }

  onFileSelect(event: Event, fileType: 'imagen' | 'pdf' | 'doc' | 'excel'): void {
    const target = event.target as HTMLInputElement;
    const file: File | null = target.files ? target.files[0] : null;
    if (!file) return;

    switch (fileType) {
      case 'imagen':
        this.imagen = file;
        break;
      case 'pdf':
        this.pdf = file;
        break;
      case 'doc':
        this.doc = file;
        break;
      case 'excel':
        this.excel = file;
        break;
    }
  }

  onSubmit() {
    if (this.datosGeneralesForm.valid) {
      const formData = this.datosGeneralesForm.value;

      // Construye un objeto con los archivos, excluyendo los que son undefined
      const files: FormFiles = {};
      if (this.imagen) files.image = this.imagen;
      if (this.pdf) files.pdf = this.pdf;
      if (this.doc) files.doc = this.doc;
      if (this.excel) files.excel = this.excel;

      if (navigator.onLine) {
        // En línea: Envía formData y archivos (si existen)
        this.offlineManager.sendForm(formData, files).subscribe({
          next: (response) => console.log('Formulario enviado con éxito', response),
          error: (error) => console.error('Error al enviar el formulario', error)
        });
      } else {
        // Fuera de línea: Guarda formData y archivos localmente
        this.offlineManager.saveForm(formData, files);
        console.log("Formulario guardado para sincronización offline", formData);
      }
    }
  }



}
