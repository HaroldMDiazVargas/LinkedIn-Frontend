import { inject } from '@angular/core';
import { CanMatchFn, Route, Router } from '@angular/router';
import { take, switchMap, of, tap, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isUserLoggedIn.pipe(
    take(1),
    switchMap((isUserLoggedIn: boolean) => {
      if (isUserLoggedIn){
        return of(isUserLoggedIn);
      }
      return authService.checkAuthentication();
    }),
    tap((isUserLoggedIn: boolean) => {
      if (!isUserLoggedIn){
        router.navigate(['/auth'])
      }
    })
  );

}
