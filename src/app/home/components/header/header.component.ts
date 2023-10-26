import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopoverComponent } from './popover/popover.component';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription, take } from 'rxjs';
import { ConnectionProfileService } from '../../services/connection-profile.service';
import { FriendRequest } from '../../models/FriendRequest';
import { FriendRequestPopoverComponent } from './friend-request-popover/friend-request-popover.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [PopoverComponent, FriendRequestPopoverComponent, IonicModule]
})
export class HeaderComponent  implements OnInit, OnDestroy {
  friendRequests: FriendRequest[] = [];
  friendRequestsSubscription!: Subscription;
  private userImagePathsubscription!: Subscription;
  userFullImagePath: string = '';

  
  constructor(
    private authService: AuthService,
    public connectionService: ConnectionProfileService,
  ) { }

  ngOnInit() {
    this.userImagePathsubscription = this.authService.userFullImagePath.subscribe((fullImagePath: string) => this.userFullImagePath = fullImagePath );

    this.friendRequestsSubscription = this.connectionService.getMyFriendRequestReceived().subscribe((friendRequests: FriendRequest[]) => {
      this.friendRequests = friendRequests;
      this.connectionService.friendRequests = friendRequests;                                   //Global property on centralize service/ ALSO: we could do using Input props and pass to other component!
    });
  }

  ngOnDestroy(): void {
    this.userImagePathsubscription.unsubscribe();
    this.friendRequestsSubscription.unsubscribe();
  }
}
