import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDetails } from './location-details';

describe('LocationDetails', () => {
  let component: LocationDetails;
  let fixture: ComponentFixture<LocationDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
