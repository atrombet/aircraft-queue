import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe, forkJoin } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';
import { AircraftSize, AircraftType } from '../enums';
import { Aircraft } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AircraftService {
  /**
   * Stores all the aircraft the user has created.
   * This list is unsorted.
   */
  private aircraft$ = new BehaviorSubject<Map<number, Aircraft>>(new Map<number, Aircraft>());

  private lastId: number;

  constructor() {}

  /**
   * Returns the sorted queue of aircraft.
   */
  public queue$(): Observable<Aircraft[]> {
    return this.aircraft$.pipe(
      this.aircraftArrayFromMap(),
      map((aircraft: Aircraft[]) => {
        // Filter out aircraft that have been launched already.
        return aircraft.filter(a => a.isEnqueued);
      }),
      this.sortAircraft()
    );
  }

  /**
   * Returns the next Aircraft in the queue.
   */
  public nextInQueue$(): Observable<Aircraft> {
    return this.queue$().pipe(
      map((sortedAircraft: Aircraft[]) => {
        const aircraftQueue: Aircraft[] = [ ...sortedAircraft ];
        return aircraftQueue.shift();
      })
    );
  }

  /**
   * Returns a list of the launched aircraft.
   */
  public launchedAircraft$(): Observable<Aircraft[]> {
    return this.aircraft$.pipe(
      this.aircraftArrayFromMap(),
      map((aircraft: Aircraft[]) => {
        return aircraft.filter(a => a.hasBeenLaunched);
      }),
      this.sortByLastLaunched()
    );
  }

  /**
   * Returns a list of the dequeued aircraft
   */
  public dequeuedAircraft$(): Observable<Aircraft[]> {
    return this.aircraft$.pipe(
      this.aircraftArrayFromMap(),
      map((aircraft: Aircraft[]) => {
        // Aircraft have been dequeued if isEnqueued is FALSE and they have an enqueuedTime.
        return aircraft.filter(a => !a.isEnqueued && !!a.enqueueTime);
      })
    );
  }

  /**
   * Creates a new aircraft given the type and size.
   */
  public createNewAircraft(size: AircraftSize, type: AircraftType): Aircraft {
    const newId = typeof this.lastId !== 'undefined' ? this.lastId + 1 : 0;
    const aircraft: Aircraft = {
      id: newId,
      size,
      type,
      hasBeenLaunched: false,
      isEnqueued: false
    };
    this.lastId = newId;
    return aircraft;
  }

  /**
   * Adds a new aircraft to the queue in the proper order.
   * @param aircraft - The new aircraft to add to the queue
   */
  public enqueue(newAircraft: Aircraft): void {
    this.aircraft$.pipe(
      take(1),
      tap((aircraftMap: Map<number, Aircraft>) => {
        // Clone the aircraft map.
        const newAircraftMap = new Map(aircraftMap);
        // Add the new aircraft.
        newAircraft.isEnqueued = true;
        newAircraft.enqueueTime = new Date();
        newAircraftMap.set(newAircraft.id, newAircraft);
        // Emit the new sorted list as the next value of the queue.
        this.aircraft$.next(newAircraftMap);
      })
    ).subscribe();
  }

  /**
   * Launches the next aircraft in the queue.
   */
  public launch(): void {
    forkJoin({
      next: this.nextInQueue$().pipe(take(1)),
      aircraftMap: this.aircraft$.pipe(take(1))
    }).pipe(
      tap(({ next, aircraftMap }: { next: Aircraft, aircraftMap: Map<number, Aircraft> }) => {
        next.hasBeenLaunched = true;
        next.isEnqueued = false;
        next.launchTime = new Date();
        // Clone the aircraft map.
        const newAircraftMap = new Map(aircraftMap);
        newAircraftMap.set(next.id, next);
        this.aircraft$.next(newAircraftMap);
      })
    ).subscribe();
  }

  /**
   * Dequeues an aircraft without launching it.
   * @param id - The ID of the aircraft to dequeue.
   */
  public dequeue(id: number): void {
    this.aircraft$.pipe(
      take(1),
      tap((aircraftMap: Map<number, Aircraft>) => {
        // Clone the aircraft map.
        const newAircraftMap = new Map(aircraftMap);
        newAircraftMap.set(id, {
          ...newAircraftMap.get(id),
          isEnqueued: false
        });
        this.aircraft$.next(newAircraftMap);
      })
    ).subscribe();
  }

  /**
   * Comparator function to sort aircraft by type.
   * @param a - First arg of comparator function
   * @param b - Second arg of comparator function
   */
  public sortByType(a: Aircraft, b: Aircraft): number {
    if (a.type === AircraftType.Passenger && b.type === AircraftType.Cargo) {
      return -1;
    } else if (b.type === AircraftType.Passenger && a.type === AircraftType.Cargo) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * Comparator function to sort aircraft by size.
   * @param a - First arg of comparator function
   * @param b - Second arg of comparator function
   */
  public sortBySize(a: Aircraft, b: Aircraft): number {
    if (a.size === AircraftSize.Large && b.size === AircraftSize.Small) {
      return -1;
    } else if (b.size === AircraftSize.Large && a.size === AircraftSize.Small) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * A pipeable operator that returns an array of aircraft from the state map.
   */
  private aircraftArrayFromMap(): any {
    return pipe(
      map((aircraftMap: Map<number, Aircraft>) => {
        return Array.from(aircraftMap.values());
      })
    );
  }

  /**
   * A pipeable operator that sorts a list of aircraft according the business rules.
   */
  private sortAircraft(): any {
    return pipe(
      map((aircraft: Aircraft[]) => {
        return [
          ...aircraft.filter(a => a.type === AircraftType.Passenger).sort(this.sortBySize),
          ...aircraft.filter(a => a.type === AircraftType.Cargo).sort(this.sortBySize)
        ];
      })
    );
  }

  /**
   * Sorts a list of launched aircraft with the most recent first.
   */
  private sortByLastLaunched(): any {
    return pipe(
      map((aircraft: Aircraft[]) => {
        return aircraft.sort((a, b) => b.launchTime.getTime() - a.launchTime.getTime());
      })
    );
  }
}
