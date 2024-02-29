import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, fromEvent, merge, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { JudicialCasesService } from './judicial-cases.service';
import * as localForage from 'localforage';

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

  saveForm(formData: any) {
    localForage.getItem('formularios').then((existentes: any) => {
        const formulariosGuardados = existentes ? existentes : [];
        formulariosGuardados.push(formData);
        localForage.setItem('formularios', formulariosGuardados).then(function(value) {
            console.log("Formulario guardado:", value);
        }).catch(function(err) {
            console.error(err);
        });
    }).catch((err) => {
        console.error(err);
    });
  }

  sendForm(formData: any): Observable<any> {
    return from(this.judicialCasesService.addJudicialCase(formData));
  }

  checkNetworkStatusAndSync() {
    merge(
      of(navigator.onLine),
      fromEvent(window, 'online'),
      fromEvent(window, 'offline')
    ).pipe(
      switchMap(isOnline => {
        if (isOnline) {
          // manaejar la lógica para recuperar los datos guardados y enviarlos al servidor
        } else {
          // manejar lo que sucede cuando el usuario está offline
        }
        return of(isOnline);
      })
    ).subscribe(online => {
      if (online) {
        this.syncData();
      }
    });
  }

  private syncData() {
    // Obtener todos los formularios guardados del almacenamiento local
    // y enviarlos al servidor uno por uno
  }
}
