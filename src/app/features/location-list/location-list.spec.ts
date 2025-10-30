import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationList } from './location-list';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('LocationList', () => {
  let component: LocationList;
  let fixture: ComponentFixture<LocationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationList],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
