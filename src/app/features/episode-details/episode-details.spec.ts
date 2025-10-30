import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EpisodeDetails } from './episode-details';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('EpisodeDetails', () => {
  let component: EpisodeDetails;
  let fixture: ComponentFixture<EpisodeDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodeDetails],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpisodeDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
