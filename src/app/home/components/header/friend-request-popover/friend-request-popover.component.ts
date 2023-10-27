import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { take } from 'rxjs';
import { ConnectionProfileService } from 'src/app/home/services/connection-profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-friend-request-popover',
  templateUrl: './friend-request-popover.component.html',
  styleUrls: ['./friend-request-popover.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class FriendRequestPopoverComponent  implements OnInit {
  baseUserImageUrl: string = environment.apiUrl+'/feed/image/';
  
  constructor(
    public connectionService: ConnectionProfileService,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {}

  acceptRequest(id: number){
    this.connectionService.respondFriendRequest(id, 'accepted').pipe(take(1)).subscribe();
    this.connectionService.friendRequests = this.connectionService.friendRequests.filter((request) => request.id !== id);
    if (this.connectionService.friendRequests.length === 0)
      this.popoverController.dismiss();
  }

  declineRequest(id: number){
    this.connectionService.respondFriendRequest(id, 'declined').pipe(take(1)).subscribe();
    this.connectionService.friendRequests = this.connectionService.friendRequests.filter((request) => request.id !== id);
    if (this.connectionService.friendRequests.length === 0)
      this.popoverController.dismiss();
  }

}
