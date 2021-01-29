import { TestBed } from '@angular/core/testing';

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
    expect(true).toBe(false);
  });

  it('should enqueue an aircraft', () => {
    expect(true).toBe(false);
  });

  it('should store all aircraft in state', () => {
    expect(true).toBe(false);
  });

  it('should sort passenger aircraft before cargo aircraft', () => {
    expect(true).toBe(false);
  });

  it('should sort large aircraft before small aircraft', () => {
    expect(true).toBe(false);
  });

  it('should launch an aircraft', () => {
    expect(true).toBe(false);
  });

  it('should dequeue an aircraft', () => {
    expect(true).toBe(false);
  });

  it('should return the queue of aircraft', () => {
    expect(true).toBe(false);
  });

  it('should return only launched aircraft', () => {
    expect(true).toBe(false);
  });

  it('should return only dequeued aircraft', () => {
    expect(true).toBe(false);
  });

  it('should return the next aircraft in the queue', () => {
    expect(true).toBe(false);
  });
});
