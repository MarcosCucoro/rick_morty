import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Server },
  { path: 'login', renderMode: RenderMode.Server },
  { path: 'home', renderMode: RenderMode.Server },
  { path: 'character', renderMode: RenderMode.Server },
  { path: 'character/:id', renderMode: RenderMode.Server },
  { path: 'location', renderMode: RenderMode.Server },
  { path: 'location/:id', renderMode: RenderMode.Server },
  { path: 'episode', renderMode: RenderMode.Server },
  { path: 'episode/:id', renderMode: RenderMode.Server },
  { path: 'profile-user', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Server },
];
