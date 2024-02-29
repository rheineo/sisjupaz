import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OfflineManagerService } from '../../services/offline-manager.service';

@Component({
  selector: 'app-datos-generales-form',
  templateUrl: './datos-generales-form.component.html',
  styleUrls: ['./datos-generales-form.component.css']
})
export class DatosGeneralesFormComponent implements OnInit {

  datosGeneralesForm!: FormGroup;

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

  onSubmit() {
    if (this.datosGeneralesForm.valid) {
      const formData = this.datosGeneralesForm.value;

      // Revisar si el navegador está en línea o no
      if (navigator.onLine) {
        this.offlineManager.sendForm(formData).subscribe({
          next: (response) => {
            console.log('Formulario enviado con éxito', response);
          },
          error: (error) => {
            console.error('Error al enviar el formulario', error);
          }
        });
      } else {
        // Navegaor fuera de línea, guardar el formulario para enviarlo más tarde
        this.offlineManager.saveForm(formData);
        console.log("Offline Manager", formData);
      }
    }
  }

}
