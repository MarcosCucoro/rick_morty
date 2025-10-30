import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileUser } from './profile-user';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

describe('ProfileUser', () => {
  let component: ProfileUser;
  let fixture: ComponentFixture<ProfileUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileUser],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
