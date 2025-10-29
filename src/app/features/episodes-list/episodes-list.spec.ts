import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodesList } from './episodes-list';

describe('Episodes', () => {
  let component: EpisodesList;
  let fixture: ComponentFixture<EpisodesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodesList]
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
