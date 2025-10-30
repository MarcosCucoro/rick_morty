import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationDetails } from './location-details';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('LocationDetails', () => {
  let component: LocationDetails;
  let fixture: ComponentFixture<LocationDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationDetails],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
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
