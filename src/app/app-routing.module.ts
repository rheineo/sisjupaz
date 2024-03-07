import { NgModule } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';
import { GeneralComponent } from './pages/general/general.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { DatosGeneralesPageComponent } from './pages/datos-generales-page/datos-generales-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroCasoJudicialComponent } from './components/registro-caso-judicial/registro-caso-judicial.component';


const routes: Routes = [
  { path: '', component: GeneralComponent },
  { path: 'detalle/:id', component: DetalleComponent},
  { path: 'datos-generales', component: DatosGeneralesPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro-caso-judicial', component: RegistroCasoJudicialComponent },
  { path: '**', component: GeneralComponent },

];
@NgModule({

  imports: [ RouterModule.forRoot( routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
