import { Routes } from '@angular/router';
import { CharacterList } from './features/character-list/character-list';
import { CharacterDetails } from './features/character-details/character-details';

export const routes: Routes = [
  { path: '', redirectTo: 'characters', pathMatch: 'full' },
  { path: 'characters', component: CharacterList },
  { path: 'characters/:id', component: CharacterDetails },
];
