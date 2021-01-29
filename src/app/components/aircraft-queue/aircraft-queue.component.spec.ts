import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftQueueComponent } from './aircraft-queue.component';

describe('AircraftQueueComponent', () => {
  let component: AircraftQueueComponent;
  let fixture: ComponentFixture<AircraftQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AircraftQueueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
