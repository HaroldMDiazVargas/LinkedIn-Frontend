import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    canMatch: [AuthGuard],
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.page').then( m => m.AuthPage)
  },
  {
    path: ':id',
    canMatch: [AuthGuard],
    loadComponent: () => import('./home/components/connection-profile/connection-profile.component').then((m) => m.ConnectionProfileComponent),
  },
];
