import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, fromEvent, merge, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { JudicialCasesService } from './judicial-cases.service';
import * as localForage from 'localforage';
import { FormFiles } from '../interfaces/form-files.interface';
@Injectable({
  providedIn: 'root'
})
export class OfflineManagerService {
  constructor(
    private http: HttpClient,
    private judicialCasesService: JudicialCasesService
  ) {
    this.checkNetworkStatusAndSync();
  }

  private convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  private base64ToFile(dataURI: string, filename: string): File {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([ab], { type: mimeString });
    return new File([blob], filename, { type: mimeString });
  }

  private base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  }

  async saveForm(formData: any, files: FormFiles): Promise<void> {
    try {
      const fileConversions: Promise<{ key: keyof FormFiles, base64: string }>[] = [];

      (Object.keys(files) as Array<keyof FormFiles>).forEach(key => {
        const file = files[key];
        if (file) {
          const conversion = this.convertFileToBase64(file).then(base64 => ({ key, base64 }));
          fileConversions.push(conversion);
        }
      });

      const convertedFiles = await Promise.all(fileConversions);

      convertedFiles.forEach(({ key, base64 }) => {
        formData[key] = base64;
      });

      const existentesRaw = await localForage.getItem('formularios');
      const existentes = Array.isArray(existentesRaw) ? existentesRaw : [];

      existentes.push(formData);

      await localForage.setItem('formularios', existentes);
      console.log("Formulario y archivos guardados localmente.");
    } catch (err) {
      console.error("Error al guardar formulario y archivos:", err);
    }
  }




  sendForm(formData: any, files: FormFiles): Observable<any> {
    return from(this.judicialCasesService.addJudicialCaseWithFiles(formData, files));
  }

  checkNetworkStatusAndSync() {
    merge(
      of(navigator.onLine),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    ).pipe(
      switchMap(isOnline => {
        if (isOnline) {
          console.log("El dispositivo ha vuelto online, sincronizando datos...");
          this.syncData();
        } else {
          console.log("El dispositivo está offline.");
        }
        return of(isOnline);
      })
    ).subscribe(online => {
      if (online) {
        console.log("Verificado que estamos online, sincronizando cualquier dato pendiente...");
      }
    });
  }

  private syncData() {
     localForage.getItem('formularios').then((value) => {
       const formulariosGuardados = value as any[];

       if (formulariosGuardados && formulariosGuardados.length > 0) {
         const sendPromises = formulariosGuardados.map((formData) =>
           this.judicialCasesService.addJudicialCase(formData).then(() => formData)
         );

         // Espera a que todas las promesas se resuelvan
         Promise.allSettled(sendPromises).then((results) => {

           const failedSubmissions = results.filter((result) => result.status === 'rejected').map((result) => (result as PromiseRejectedResult).reason);
           if (failedSubmissions.length > 0) {
             console.error('Algunos formularios no se pudieron enviar:', failedSubmissions);
           }

           const successfullySent = results.filter((result) => result.status === 'fulfilled').map((result) => (result as PromiseFulfilledResult<any>).value);
           const updatedFormularios = formulariosGuardados.filter((form) => !successfullySent.includes(form));

           localForage.setItem('formularios', updatedFormularios);
         });
       }
     }).catch(err => {
       console.error('Error al recuperar formularios para sincronización:', err);
     });
   }






}
