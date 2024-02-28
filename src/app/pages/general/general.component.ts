import { Component } from '@angular/core';
import { PaisInterface } from 'src/app/interfaces/pais.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent {
  paises: PaisInterface[] = [];
  constructor ( public dataService: DataService) {

  }
  ngOnInit() { 
    this.dataService.getPaises()
    .then( paises => {
      this.paises = paises
    });
  }
}
