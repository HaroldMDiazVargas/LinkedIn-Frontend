import { Injectable } from '@angular/core';
import { ICheckAuth, ILogin, ILogout, ISignup, Role, User } from '../models';
import { BehaviorSubject, Observable, from, map, of, switchMap, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
// import { Plugins } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
// import { Storage } from '@capacitor/plugins';
// import { MyImport } = Plugins;
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.apiUrl+'/auth';
  private user$ = new BehaviorSubject<User>({} as User);

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}
  
  get isUserLoggedIn(): Observable<boolean>{
    return this.user$.asObservable().pipe(
      switchMap((user: User) => {
        const isUserAuthenticated = Object.keys(user).length !== 0
        return of(isUserAuthenticated);
      })
    )
  };

  get userRole(): Observable<Role>{
    return this.user$.asObservable().pipe(
      switchMap((user: User) => {
        return of(user.role);
      })
    )
  }

  register(newUser: ISignup): Observable<User>{
    return this.http.post<User>(this.baseUrl+'/register', newUser).pipe(take(1));
  }

  login(credentials: ILogin): Observable<User>{ 
    return this.http.post<User>(this.baseUrl+'/login', credentials, { withCredentials: true }).pipe(
      take(1),
      tap(response => {
        Preferences.set({
          key: 'user',
          value: JSON.stringify(response)
        });
        this.user$.next(response);
        
      }))
  }

  isCookieInStorage(): Observable<boolean> {        //IS NOT WORKING, NOT POSSIBLE FROM FRONTEND - COOKIE IS HTTPS ONLY. USE FOR JWT Approach
    return from(this.cookieService.get('connect.sid')).pipe(
      switchMap((cookie) => {
        return from(Preferences.get({
          key: 'user'
        })).pipe(
          map(data => {
            if (!cookie) return false;
            if (data.value)
              this.user$.next(JSON.parse(data.value) as User)
            return true;
          })
        )
      })
      
    );
  }

  checkAuthentication(): Observable<boolean>{
    return this.http.get<ICheckAuth>(this.baseUrl+'/check', { withCredentials: true }).pipe(
      map((response) => {
          if (response.user)
            this.user$.next(response.user);
          else
            this.user$.next({} as User);
          return response.isAuthenticated;
      })
    );
  }

  logout(): Observable<ILogout>{
    return this.http.post<ILogout>(this.baseUrl+'/logout', {}, { withCredentials: true }).pipe(
      take(1),
      tap(response => {        
        this.user$.next({} as User);
        Preferences.remove({
          key: 'user'
        })
        this.router.navigate(['/auth']);
      })
    );
  }
}