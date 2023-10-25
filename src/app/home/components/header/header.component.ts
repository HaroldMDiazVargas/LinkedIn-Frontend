import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopoverComponent } from './popover/popover.component';
import { IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription, take } from 'rxjs';
import { ConnectionProfileService } from '../../services/connection-profile.service';
import { FriendRequest } from '../../models/FriendRequest';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [PopoverComponent, IonicModule]
})
export class HeaderComponent  implements OnInit, OnDestroy {
  friendRequests: FriendRequest[] = [];
  private userImagePathsubscription!: Subscription;
  userFullImagePath: string = '';
  
  constructor(
    private authService: AuthService,
    private connectionService: ConnectionProfileService,
  ) { }

  ngOnInit() {
    this.userImagePathsubscription = this.authService.userFullImagePath.subscribe((fullImagePath: string) => this.userFullImagePath = fullImagePath );

    this.connectionService.getMyFriendRequestReceived().pipe(take(1)).subscribe((friendRequests: FriendRequest[]) => {
      this.friendRequests = friendRequests
    });
  }

  ngOnDestroy(): void {
    this.userImagePathsubscription.unsubscribe();
  }
}
