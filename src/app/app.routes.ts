import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'private',
    canMatch: [AuthGuard],
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('./home/components/feed/feed.component').then((m) => m.FeedComponent),
      },
      {
        path: ':id',
        loadComponent: () => import('./home/components/connection-profile/connection-profile.component').then((m) => m.ConnectionProfileComponent),
      },
      {
        path: 'chat/connections',
        loadComponent: () => import('./home/components/chat/chat.component').then((m) => m.ChatComponent),
      }
    ]
  },
  {
    path: '',
    redirectTo: 'private',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.page').then( m => m.AuthPage)
  },
  {
    path: '*',
    loadComponent: () => import('./auth/auth.page').then( m => m.AuthPage)
  }
];
