import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDetails } from './character-details';

describe('CharacterDetails', () => {
  let component: CharacterDetails;
  let fixture: ComponentFixture<CharacterDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterDetails]
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
