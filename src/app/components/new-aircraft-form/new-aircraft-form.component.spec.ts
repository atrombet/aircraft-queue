import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAircraftFormComponent } from './new-aircraft-form.component';

describe('NewAircraftFormComponent', () => {
  let component: NewAircraftFormComponent;
  let fixture: ComponentFixture<NewAircraftFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewAircraftFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAircraftFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
