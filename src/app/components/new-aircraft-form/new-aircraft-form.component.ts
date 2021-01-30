import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AircraftSize, AircraftType } from '../../enums';
import { AircraftFormResponse } from '../../interfaces';

@Component({
  selector: 'new-aircraft-form',
  templateUrl: './new-aircraft-form.component.html',
  styleUrls: ['./new-aircraft-form.component.scss']
})
export class NewAircraftFormComponent implements OnInit {
  public newAircraftForm: FormGroup;

  @Output() public addNewAircraft = new EventEmitter<AircraftFormResponse>();

  // Make Enums available to the template.
  public Type = AircraftType;
  public Size = AircraftSize;

  constructor(private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.newAircraftForm = this.fb.group({
      type: [AircraftType.Passenger, Validators.required],
      size: [AircraftSize.Large, Validators.required]
    });
  }

  /**
   * Handles a user click on the Enqueue button.
   */
  public onSubmit(): void {
    if (this.newAircraftForm.valid) {
      this.addNewAircraft.emit(this.newAircraftForm.value);
    } else {
      console.error('Invalid form');
    }
  }

}
