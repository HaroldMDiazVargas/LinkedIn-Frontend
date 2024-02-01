import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { importProvidersFrom } from '@angular/core';
import { authFeatureKey, authReducer } from './auth/store/reducers';
import { StoreModule, provideState } from '@ngrx/store';
import { appReducer } from './store/app.state';
import { postFeatureKey, postReducer } from './home/store/reducers';
import * as postEffects from './home/store/effects';
import * as authEffects from './auth/store/effects';
import { provideEffects } from '@ngrx/effects';

export const routes: Routes = [
  {
    path: 'private',
    canMatch: [AuthGuard],
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    loadChildren: () => import('./home/home.route').then((m) => m.HomeRoutes),
    providers: [
      provideState(postFeatureKey, postReducer),
      provideEffects(postEffects),  
    ]
    // children: [
    //   {
    //     path: '',
    //     redirectTo: 'home',
    //     pathMatch: 'full',
    //   },
    //   {
    //     path: 'home',
    //     loadComponent: () => import('./home/components/feed/feed.component').then((m) => m.FeedComponent),
    //   },
    //   {
    //     path: ':id',
    //     loadComponent: () => import('./home/components/connection-profile/connection-profile.component').then((m) => m.ConnectionProfileComponent),
    //   },
    //   {
    //     path: 'chat/connections',
    //     loadComponent: () => import('./home/components/chat/chat.component').then((m) => m.ChatComponent),
    //   }
    // ]
  },
  {
    path: '',
    redirectTo: 'private',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.page').then( m => m.AuthPage),
    providers: [
      // provideState(authFeatureKey, authReducer),
      // provideEffects(authEffects),
      // importProvidersFrom(
        // register feature reducer
        // StoreModule.forFeature('auth', authReducer),)
    ]
  },
  {
    path: '*',
    loadComponent: () => import('./auth/auth.page').then( m => m.AuthPage)
  }
];
