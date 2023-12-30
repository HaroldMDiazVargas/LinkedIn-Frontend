import { Injectable } from '@angular/core';
import { SocketIoConfig, Socket } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {
  // transportOptions: {
  //   polling: {
  //     extraHeaders: {
  //         Authorization: localStorage.getItem('access_token')  //Verify JWT in localStorage is present when we request to server and make socket connection/communication
  //     }
  //   }
  // }
} };

@Injectable({
  providedIn: 'root'
})
export class ChatSocketService extends Socket {

  constructor() { 
    super(config);
  }
}
