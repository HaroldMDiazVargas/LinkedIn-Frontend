import { Routes } from '@angular/router';
// import { AuthGuard } from './auth/guards/auth.guard';

export const HomeRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./components/feed/feed.component').then((m) => m.FeedComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./components/connection-profile/connection-profile.component').then((m) => m.ConnectionProfileComponent),
  },
  {
    path: 'chat/connections',
    loadComponent: () => import('./components/chat/chat.component').then((m) => m.ChatComponent),
  }
];
