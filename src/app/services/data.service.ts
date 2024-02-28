import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaisInterface } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private paises: PaisInterface[] = [];

  constructor( private http: HttpClient) { }

  getPaises(): Promise<PaisInterface[]> {
    
    if (this.paises.length > 0) {
      return Promise.resolve(this.paises);
    }

    return new Promise ( resolve => {

      this.http.get('https://restcountries.com/v3.1/lang/spanish')
        .subscribe((paises: any) => {

          console.log(paises);
          this.paises = paises;
          resolve(this.paises);
        }
        );
    });    
  }

  getDetalleId(id: string) {
    if (this.paises.length > 0) {
      const pais = this.paises.find(p => p.cca3 === id);
      return Promise.resolve(pais);
    }
    return this.getPaises().then ((paises) => {
      const pais = this.paises.find(p => p.cca3 === id);
      return Promise.resolve(pais);
    });
  }
}
