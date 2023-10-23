import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnectionProfileService {
  private baseUrl: string = environment.apiUrl + '/user/';
  
  constructor(
    private http: HttpClient
  ) { }

  getConnectionUser(id: number): Observable<User>{
    return this.http.get<User>(`${this.baseUrl}${id}`, { withCredentials: true})
  }
}
