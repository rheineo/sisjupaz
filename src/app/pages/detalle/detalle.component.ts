import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaisInterface } from 'src/app/interfaces/pais.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent {

  public pais: any;
  constructor(
    public dataServices: DataService,
    private activatedRoute: ActivatedRoute,
    private route: Router
  ) {

  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    if (id !== null) {
      this.dataServices.getDetalleId(id).then(p => {
        if (!p) {
          this.route.navigateByUrl('/');
        }
        this.pais = p;
        console.log(this.pais);
      });
    }

  }

}
