// tslint:disable: no-string-literal
import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs/operators';
import { AircraftSize, AircraftType } from '../enums';
import { Aircraft } from '../interfaces';

import { AircraftService } from './aircraft.service';

describe('AircraftService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  const setup = () => {
    const service: AircraftService = TestBed.inject(AircraftService);
    return { service };
  };

  it('should be created', () => {
    const { service } = setup();
    expect(service).toBeTruthy();
  });

  it('should create a new aircraft', () => {
    const { service } = setup();
    const craft = service.createNewAircraft(AircraftSize.Small, AircraftType.Cargo);
    expect(craft.type).toBe(AircraftType.Cargo);
    expect(craft.size).toBe(AircraftSize.Small);
    expect(craft.hasBeenLaunched).toBe(false);
    expect(craft.isEnqueued).toBe(false);
  });

  it('should enqueue an aircraft', () => {
    const { service } = setup();
    const craft = service.createNewAircraft(AircraftSize.Small, AircraftType.Cargo);
    service.enqueue(craft);
    expect(service['aircraft$'].getValue().get(craft.id)).toBeTruthy();
  });

  it('should store all aircraft in state', () => {
    const { service } = setup();
    service.enqueue(service.createNewAircraft(AircraftSize.Small, AircraftType.Cargo));
    service.enqueue(service.createNewAircraft(AircraftSize.Small, AircraftType.Passenger));
    service.enqueue(service.createNewAircraft(AircraftSize.Large, AircraftType.Passenger));
    expect(service['aircraft$'].getValue().size).toBe(3);
  });

  it('should sort passenger aircraft before cargo aircraft', done => {
    const { service } = setup();
    service.enqueue(service.createNewAircraft(AircraftSize.Small, AircraftType.Cargo));
    service.enqueue(service.createNewAircraft(AircraftSize.Small, AircraftType.Passenger));

    service.queue$().pipe(take(1)).subscribe((aircraft: Aircraft[]) => {
      expect(aircraft[0].type).toBe(AircraftType.Passenger);
      expect(aircraft[1].type).toBe(AircraftType.Cargo);
      done();
    });
  });

  it('should sort large aircraft before small aircraft', done => {
    const { service } = setup();
    service.enqueue(service.createNewAircraft(AircraftSize.Small, AircraftType.Passenger));
    service.enqueue(service.createNewAircraft(AircraftSize.Large, AircraftType.Passenger));

    service.queue$().pipe(take(1)).subscribe((aircraft: Aircraft[]) => {
      expect(aircraft[0].size).toBe(AircraftSize.Large);
      expect(aircraft[1].size).toBe(AircraftSize.Small);
      done();
    });
  });

  it('should launch an aircraft', () => {
    const { service } = setup();
    service.enqueue(service.createNewAircraft(AircraftSize.Large, AircraftType.Passenger));
    service.launch();
    expect(service['aircraft$'].getValue().get(0).hasBeenLaunched).toBe(true);
    expect(service['aircraft$'].getValue().get(0).isEnqueued).toBe(false);
  });

  it('should dequeue an aircraft', () => {
    const { service } = setup();
    service.enqueue(service.createNewAircraft(AircraftSize.Large, AircraftType.Passenger));
    service.dequeue(0);
    expect(service['aircraft$'].getValue().get(0).hasBeenLaunched).toBe(false);
    expect(service['aircraft$'].getValue().get(0).isEnqueued).toBe(false);
  });

  it('should return the queue of aircraft', done => {
    const { service } = setup();
    service.enqueue(service.createNewAircraft(AircraftSize.Small, AircraftType.Passenger));
    service.enqueue(service.createNewAircraft(AircraftSize.Large, AircraftType.Cargo));
    service.enqueue(service.createNewAircraft(AircraftSize.Small, AircraftType.Cargo));
    service.enqueue(service.createNewAircraft(AircraftSize.Large, AircraftType.Passenger));

    service.queue$().pipe(take(1)).subscribe((aircraft: Aircraft[]) => {
      expect(aircraft[0].size).toBe(AircraftSize.Large);
      expect(aircraft[0].type).toBe(AircraftType.Passenger);
      expect(aircraft[1].size).toBe(AircraftSize.Small);
      expect(aircraft[1].type).toBe(AircraftType.Passenger);
      expect(aircraft[2].size).toBe(AircraftSize.Large);
      expect(aircraft[2].type).toBe(AircraftType.Cargo);
      expect(aircraft[3].size).toBe(AircraftSize.Small);
      expect(aircraft[3].type).toBe(AircraftType.Cargo);
      done();
    });
  });

  it('should return only launched aircraft', done => {
    const { service } = setup();
    service.enqueue(service.createNewAircraft(AircraftSize.Small, AircraftType.Passenger));
    service.enqueue(service.createNewAircraft(AircraftSize.Large, AircraftType.Passenger));
    service.launch();

    service.launchedAircraft$().pipe(take(1)).subscribe((aircraft: Aircraft[]) => {
      expect(aircraft.length).toBe(1);
      expect(aircraft[0].hasBeenLaunched).toBe(true);
      done();
    });
  });

  it('should return only dequeued aircraft', done => {
    const { service } = setup();
    service.enqueue(service.createNewAircraft(AircraftSize.Small, AircraftType.Passenger));
    service.enqueue(service.createNewAircraft(AircraftSize.Large, AircraftType.Passenger));
    service.dequeue(1);

    service.dequeuedAircraft$().pipe(take(1)).subscribe((aircraft: Aircraft[]) => {
      expect(aircraft.length).toBe(1);
      expect(aircraft[0].hasBeenLaunched).toBe(false);
      expect(aircraft[0].isEnqueued).toBe(false);
      done();
    });
  });

  it('should return the next aircraft in the queue', done => {
    const { service } = setup();
    service.enqueue(service.createNewAircraft(AircraftSize.Small, AircraftType.Passenger));
    service.enqueue(service.createNewAircraft(AircraftSize.Large, AircraftType.Cargo));
    service.enqueue(service.createNewAircraft(AircraftSize.Small, AircraftType.Cargo));
    service.enqueue(service.createNewAircraft(AircraftSize.Large, AircraftType.Passenger));

    service.nextInQueue$().pipe(take(1)).subscribe((aircraft: Aircraft) => {
      expect(aircraft.size).toBe(AircraftSize.Large);
      expect(aircraft.type).toBe(AircraftType.Passenger);
      expect(aircraft.id).toBe(3);
      done();
    });
  });
});
