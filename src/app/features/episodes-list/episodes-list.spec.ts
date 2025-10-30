import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EpisodesList } from './episodes-list';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Episodes', () => {
  let component: EpisodesList;
  let fixture: ComponentFixture<EpisodesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodesList],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpisodesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
