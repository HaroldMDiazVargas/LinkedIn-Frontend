import { Injectable } from '@angular/core';
import { ILogin, ISignup, Role, User } from '../models';
import { BehaviorSubject, Observable, map, of, switchMap, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
// import { Plugins } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

// import { Storage } from '@capacitor/plugins';
// import { MyImport } = Plugins;


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.apiUrl+'/auth';
  private user$ = new BehaviorSubject<User>({} as User);

  constructor(
    private http: HttpClient,
    private router: Router
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
}
