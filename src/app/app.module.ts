import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AircraftQueueComponent } from './components/aircraft-queue/aircraft-queue.component';
import { AircraftComponent } from './components/aircraft/aircraft.component';
import { NewAircraftFormComponent } from './components/new-aircraft-form/new-aircraft-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AircraftQueueComponent,
    AircraftComponent,
    NewAircraftFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
