import { Routes } from '@angular/router';
import { roleManagerGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    canMatch: [roleManagerGuard],
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
];
