import { Component, OnInit } from '@angular/core';
import { AircraftSize, AircraftType } from './enums';
import { AircraftFormResponse } from './interfaces';
import { AircraftService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public aircraftService: AircraftService) {}

  public ngOnInit(): void {
    this.aircraftService.queue$().subscribe(_ => console.log(_));
  }

  public addAircraft({ type, size }: AircraftFormResponse): void {
    const newAircraft = this.aircraftService.createNewAircraft(size, type);
    this.aircraftService.enqueue(newAircraft);
  }
}
