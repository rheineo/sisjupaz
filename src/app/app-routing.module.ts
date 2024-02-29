import { NgModule } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';
import { GeneralComponent } from './pages/general/general.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { DatosGeneralesPageComponent } from './pages/datos-generales-page/datos-generales-page.component';


const routes: Routes = [
  { path: '', component: GeneralComponent },
  { path: 'detalle/:id', component: DetalleComponent},
  { path: 'datos-generales', component: DatosGeneralesPageComponent },
  { path: '**', component: GeneralComponent },

];
@NgModule({

  imports: [ RouterModule.forRoot( routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
