import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/auth/models';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { ChatSocketService } from 'src/app/core/chat-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ChatComponent  implements OnInit, OnDestroy {
  @ViewChild('form') form!: NgForm;
  newMessage!: Observable<string>;
  messages: string[] = [];
  friends: User[] = [];
  baseUserImageUrl: string = environment.apiUrl+'/feed/image/';
  private userImagePathsubscription!: Subscription;
  private friendSubscription!: Subscription;
  private messageSubscription!: Subscription;
  userFullImagePath: string = '';
  selectedUser!: User;

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.messageSubscription = this.chatService.getNewMessage().subscribe((message: string) => {
      this.messages.push(message);
    });

    this.friendSubscription = this.chatService.getFriends().subscribe((friends: User[]) => {
      this.friends = friends;
    });

    this.userImagePathsubscription = this.authService.userFullImagePath.subscribe((fullImagePath: string) => this.userFullImagePath = fullImagePath );

  }

  ngOnDestroy(): void {
    this.userImagePathsubscription.unsubscribe();
    this.friendSubscription.unsubscribe();
    this.messageSubscription.unsubscribe();
  }

  onSubmit(){
    const { message } = this.form.value;
    if (!message) return;
    this.chatService.sendMessage(message);
    this.form.reset();
  }

  selectUser(user: User){
    this.selectedUser = user;
  }

}
