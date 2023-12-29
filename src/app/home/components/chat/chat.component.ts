import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/auth/models';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';

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

  constructor(
    private chatService: ChatService
  ) { }

  ngOnInit() {
    this.chatService.getNewMessage().subscribe((message: string) => {
      this.messages.push(message);
    });

    this.chatService.getFriends().subscribe((friends: User[]) => {
      this.friends = friends;
    });

  }

  ngOnDestroy(): void {
    
  }

  onSubmit(){
    const { message } = this.form.value;
    if (!message) return;
    this.chatService.sendMessage(message);
    this.form.reset();
  }

}
