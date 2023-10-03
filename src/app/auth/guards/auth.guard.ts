import { inject } from '@angular/core';
import { CanMatchFn, Route, Router } from '@angular/router';
import { take, switchMap, of, tap, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const roleManagerGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isUserLoggedIn.pipe(
    take(1),
    switchMap((isUserLogged: boolean) => {
        return of(isUserLogged);
    }),
    tap((isUserLoggedIn: boolean) => {
      if (!isUserLoggedIn){
        router.navigate(['/auth'])
      }
    })
  );

}
