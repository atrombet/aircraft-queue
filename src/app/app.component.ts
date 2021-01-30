import { Component } from '@angular/core';
import { AircraftFormResponse } from './interfaces';
import { AircraftService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public aircraftService: AircraftService) {}

  /**
   * Creates a new aircraft and adds it to the queue.
   * @param param0 - The type and size the user selected to add a new aircraft.
   */
  public addAircraft({ type, size }: AircraftFormResponse): void {
    const newAircraft = this.aircraftService.createNewAircraft(size, type);
    this.aircraftService.enqueue(newAircraft);
  }

  /**
   * Launches the next aircraft in the queue.
   */
  public launch(): void {
    this.aircraftService.launch();
  }

  /**
   * Dequeues the aircraft with the given ID.
   * @param id - The ID of the aircraft to dequeue.
   */
  public dequeue(id: number): void {
    this.aircraftService.dequeue(id);
  }
}
