import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Aircraft } from '../../interfaces';

@Component({
  selector: 'aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.scss']
})
export class AircraftComponent {
  @Input() public aircraft: Aircraft;
  @Output() public dequeue = new EventEmitter<number>();

  constructor() { }
}
