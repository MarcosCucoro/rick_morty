import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then(m => m.Login),
    canActivate: [loginGuard]
  },
  {
    path: '',
    loadComponent: () => import('./features/home/home').then(m => m.Home),
    canActivate: [authGuard]
  },
  {
    path: 'character',
    loadComponent: () => import('./features/character-list/character-list').then(m => m.CharacterList),
    canActivate: [authGuard]
  },
  {
    path: 'character/:id',
    loadComponent: () => import('./features/character-details/character-details').then(m => m.CharacterDetails),
    canActivate: [authGuard]
  },
  {
    path: 'location',
    loadComponent: () => import('./features/location-list/location-list').then(m => m.LocationList),
    canActivate: [authGuard]
  },
  {
    path: 'location/:id',
    loadComponent: () => import('./features/location-details/location-details').then(m => m.LocationDetails),
    canActivate: [authGuard]
  },
  {
    path: 'episode',
    loadComponent: () => import('./features/episodes-list/episodes-list').then(m => m.EpisodesList),
    canActivate: [authGuard]
  },
  {
    path: 'episode/:id',
    loadComponent: () => import('./features/episode-details/episode-details').then(m => m.EpisodeDetails),
    canActivate: [authGuard]
  },
  {
    path: 'profile-user',
    loadComponent: () => import('./features/profile-user/profile-user').then(m => m.ProfileUser),
    canActivate: [authGuard]
  }
];
