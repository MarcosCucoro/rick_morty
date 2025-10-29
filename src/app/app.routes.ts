import { Routes } from '@angular/router';

import { CharacterDetails } from './features/character-details/character-details';
import { CharacterList } from './features/character-list/character-list';
import { EpisodesList } from './features/episodes-list/episodes-list';
import { Home } from './features/home/home';
import { LocationDetails } from './features/location-details/location-details';
import { LocationList } from './features/location-list/location-list';
import { EpisodeDetails } from './features/episode-details/episode-details';
import { Login } from './features/login/login';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'home', component: Home },
  { path: 'character', component: CharacterList },
  { path: 'character/:id', component: CharacterDetails },
  { path: 'location', component: LocationList },
  { path: 'location/:id', component: LocationDetails },
  { path: 'episode', component: EpisodesList },
  { path: 'episode/:id', component: EpisodeDetails }
];
