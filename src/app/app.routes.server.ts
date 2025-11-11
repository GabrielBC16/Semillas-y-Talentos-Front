import { RenderMode, ServerRoute } from '@angular/ssr';
import { get } from 'http';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'projects/:id',
    renderMode: RenderMode.Client
  }
];
