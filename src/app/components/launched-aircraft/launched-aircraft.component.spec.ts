import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchedAircraftComponent } from './launched-aircraft.component';

describe('LaunchedAircraftComponent', () => {
  let component: LaunchedAircraftComponent;
  let fixture: ComponentFixture<LaunchedAircraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaunchedAircraftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchedAircraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
