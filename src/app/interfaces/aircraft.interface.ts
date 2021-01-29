import { AircraftSize, AircraftType } from "../enums";

export interface Aircraft {
  id: number;
  size: AircraftSize;
  type: AircraftType;
  hasBeenLaunched: boolean;
  launchTime?: Date;
  isEnqueued: boolean;
  enqueueTime?: Date;
}
