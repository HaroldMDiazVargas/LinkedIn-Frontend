import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopoverComponent } from './popover/popover.component';
import { IonicModule, PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BehaviorSubject, Subscription, take } from 'rxjs';
import { ConnectionProfileService } from '../../services/connection-profile.service';
import { FriendRequest } from '../../models/FriendRequest';
import { FriendRequestPopoverComponent } from './friend-request-popover/friend-request-popover.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [PopoverComponent, FriendRequestPopoverComponent, IonicModule, CommonModule, RouterModule]
})
export class HeaderComponent  implements OnInit, OnDestroy {
  // countFriendRequests = new BehaviorSubject<number>(0);
  friendRequestsSubscription!: Subscription;
  private userImagePathsubscription!: Subscription;
  userFullImagePath: string = '';
  // popoverController: any;

  
  constructor(
    private authService: AuthService,
    public connectionService: ConnectionProfileService,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.userImagePathsubscription = this.authService.userFullImagePath.subscribe((fullImagePath: string) => this.userFullImagePath = fullImagePath );

    this.friendRequestsSubscription = this.connectionService.getMyFriendRequestReceived().subscribe((friendRequests: FriendRequest[]) => {
      // this.countFriendRequests.next(friendRequests.length);
      this.connectionService.friendRequests = friendRequests;                                   //Global property on centralize service/ ALSO: we could do using Input props and pass to other component!
    });
  }

  ngOnDestroy(): void {
    this.userImagePathsubscription.unsubscribe();
    this.friendRequestsSubscription.unsubscribe();
  }

  
  async presentPopover(e: Event) {
    if (this.connectionService.friendRequests.length === 0) return;
    const popover = await this.popoverController.create({
      component: FriendRequestPopoverComponent,
      event: e,
      showBackdrop: false,
      // dismissOnSelect: true,
      alignment: 'center',
      side: 'bottom',
      cssClass: 'request-popover'
      
    });

    await popover.present();
  }
}
