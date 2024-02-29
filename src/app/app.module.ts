import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GeneralComponent } from './pages/general/general.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DatosGeneralesFormComponent } from './components/datos-generales-form/datos-generales-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatosGeneralesPageComponent } from './pages/datos-generales-page/datos-generales-page.component';


@NgModule({
  declarations: [
    AppComponent,
    GeneralComponent,
    DetalleComponent,
    DatosGeneralesFormComponent,
    DatosGeneralesPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
