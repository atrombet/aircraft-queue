import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AircraftSize, AircraftType } from './enums';
import { AircraftService } from './services';
import { AircraftFormResponse } from './interfaces';

class MockAircraftService {
  public createNewAircraft(): void {}
  public enqueue(): void {}
  public launch(): void {}
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: AircraftService, useClass: MockAircraftService }
      ]
    }).compileComponents();
  });

  const setup = () => {
    const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
    const component: AppComponent = fixture.componentInstance;
    const aircraftService: AircraftService = TestBed.inject(AircraftService);

    return { fixture, component, aircraftService };
  };

  it('should create the app', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });

  it('should add a new aircraft', () => {
    const { fixture, component, aircraftService } = setup();
    const addButton = fixture.debugElement.query(By.css('new-aircraft-form'));
    spyOn(component, 'addAircraft').and.callThrough();
    spyOn(aircraftService, 'createNewAircraft').and.callThrough();
    spyOn(aircraftService, 'enqueue');

    const formResponse: AircraftFormResponse = { type: AircraftType.Passenger, size: AircraftSize.Large };

    addButton.triggerEventHandler('addNewAircraft', formResponse);
    expect(component.addAircraft).toHaveBeenCalledWith(formResponse);
    expect(aircraftService.createNewAircraft).toHaveBeenCalled();
    expect(aircraftService.enqueue).toHaveBeenCalled();
  });

  it('should launch an aircraft using teh aircraft service', () => {
    const { fixture, component, aircraftService } = setup();
    const launchButton = fixture.debugElement.query(By.css('#launchButton'));
    spyOn(component, 'launch').and.callThrough();
    spyOn(aircraftService, 'launch');
    launchButton.triggerEventHandler('click', {});
    expect(component.launch).toHaveBeenCalled();
    expect(aircraftService.launch).toHaveBeenCalled();
  });
});
