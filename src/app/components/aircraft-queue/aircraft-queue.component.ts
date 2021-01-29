import { Component, Input } from '@angular/core';
import { Aircraft } from '../../interfaces';

@Component({
  selector: 'aircraft-queue',
  templateUrl: './aircraft-queue.component.html',
  styleUrls: ['./aircraft-queue.component.scss']
})
export class AircraftQueueComponent {
  @Input() aircraftList: Aircraft[];

  constructor() { }

}
