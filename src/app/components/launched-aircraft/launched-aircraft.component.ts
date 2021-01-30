import { Component, Input } from '@angular/core';
import { Aircraft } from '../../interfaces';

@Component({
  selector: 'launched-aircraft',
  templateUrl: './launched-aircraft.component.html',
  styleUrls: ['./launched-aircraft.component.scss']
})
export class LaunchedAircraftComponent {
  @Input() public aircraft: Aircraft;
}
