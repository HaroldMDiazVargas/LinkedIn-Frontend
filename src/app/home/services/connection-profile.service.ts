import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/models';
import { environment } from 'src/environments/environment';
import { FriendRequest, FriendRequestStatus, FriendRequest_Status } from '../models/FriendRequest';

@Injectable({
  providedIn: 'root'
})
export class ConnectionProfileService {
  private baseUrl: string = environment.apiUrl + '/user/';
  
  constructor(
    private http: HttpClient
  ) { }

  getConnectionUser(id: number): Observable<User>{
    return this.http.get<User>(`${this.baseUrl}${id}`, { withCredentials: true});
  }

  getFriendRequestStatus(id: number): Observable<FriendRequest> {
    return this.http.get<FriendRequest>(`${this.baseUrl}friend-request/status/${id}`, { withCredentials: true });
  }

  sendFriendRequest(id: number): Observable<FriendRequestStatus | { error: string }>{
    return this.http.post<FriendRequestStatus | { error: string }>(`${this.baseUrl}friend-request/send/${id}`, {}, { withCredentials: true })
  }

  respondFriendRequest(id: number, status: FriendRequest_Status){
    return this.http.put<FriendRequestStatus | { error: string }>(`${this.baseUrl}friend-request/${id}`, { status }, { withCredentials: true })
  }
}
