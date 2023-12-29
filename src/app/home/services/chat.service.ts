import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, catchError } from 'rxjs';
import { User } from 'src/app/auth/models';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl: string = environment.apiUrl + '/user';

  constructor(
    private socket: Socket,  //Allow us to emit events
    private httpService: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) { }

  sendMessage(message: string): void {
    this.socket.emit('sendMessage', message);
  }

  getNewMessage(): Observable<string> {
    return this.socket.fromEvent<string>('newMessage');
  }

  getFriends(): Observable<User[]>{
    return this.httpService.get<User[]>(`${this.baseUrl}/friends/me`, { withCredentials: true}).pipe(
      catchError(
        this.errorHandlerService.handleError<User[]>('getFriendsCurrentUser', [])
      )
    )
  }
}
