import { Component, Input } from '@angular/core';
import { Aircraft } from '../../interfaces';

@Component({
  selector: 'aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.scss']
})
export class AircraftComponent {
  @Input() aircraft: Aircraft;

  constructor() { }

}
