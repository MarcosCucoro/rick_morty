import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('Location', () => {
  let component: Location;
  let fixture: ComponentFixture<Location>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Location]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Location);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
