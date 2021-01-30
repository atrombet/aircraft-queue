import { Component, Input } from '@angular/core';
import { Aircraft } from '../../interfaces';

@Component({
  selector: 'launch-history',
  templateUrl: './launch-history.component.html',
  styleUrls: ['./launch-history.component.scss']
})
export class LaunchHistoryComponent {
  @Input() public launchedAircraft: Aircraft[];
}
