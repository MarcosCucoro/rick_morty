import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterDetails } from './character-details';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('CharacterDetails', () => {
  let component: CharacterDetails;
  let fixture: ComponentFixture<CharacterDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterDetails],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
