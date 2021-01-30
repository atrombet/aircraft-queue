import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Aircraft } from '../../interfaces';

@Component({
  selector: 'aircraft-queue',
  templateUrl: './aircraft-queue.component.html',
  styleUrls: ['./aircraft-queue.component.scss']
})
export class AircraftQueueComponent {
  @Input() aircraftList: Aircraft[];
  @Output() public dequeue = new EventEmitter<number>();
  @Output() public launch = new EventEmitter<void>();
}
