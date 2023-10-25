import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BannerColorService, BannerColors } from '../../services/banner-color.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { ConnectionProfileService } from '../../services/connection-profile.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { User } from 'src/app/auth/models';
import { Observable, map, of, switchMap, take } from 'rxjs';
import { FriendRequest, FriendRequestStatus, FriendRequest_Status } from '../../models/FriendRequest';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-connection-profile',
  templateUrl: './connection-profile.component.html',
  styleUrls: ['./connection-profile.component.scss'],
  standalone: true,
  imports: [HeaderComponent, CommonModule, IonicModule, RouterModule]
})
export class ConnectionProfileComponent  implements OnInit {
  userProfile!: User;
  currentUser!: User;
  baseUserImageUrl: string = environment.apiUrl+'/feed/image/';
  bannerColors: BannerColors = {} as BannerColors;
  friendRequestStatus: FriendRequest = {} as FriendRequest;

  constructor(
    public bannerService: BannerColorService,
    private connectionService: ConnectionProfileService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.getUser().pipe(take(1)).subscribe((user: User) => {
      this.bannerColors = this.bannerService.getBannerColors(user.role);
      this.userProfile = user;
    });

    this.getFriendRequestStatus().pipe(take(1)).subscribe((friendRequestStatus: FriendRequest) => {
      console.log(friendRequestStatus)
      this.friendRequestStatus = friendRequestStatus;
    });

    this.authService.userStream.pipe(
      take(1)
    ).subscribe((user: User) => {
        this.currentUser = user;
    })
  }

  getUser(): Observable<User> {
    return this.getUserIdFromUrl().pipe(
      take(1),
      switchMap((userId: number) => {
        return this.connectionService.getConnectionUser(userId);
      })
    )
  }
  
  getFriendRequestStatus(): Observable<FriendRequest>{
    return this.getUserIdFromUrl().pipe(
      take(1),
      switchMap((userId: number) => {
        return this.connectionService.getFriendRequestStatus(userId)
      })
      )
  }

  addConnection(status: FriendRequest_Status): void {
    if (this.friendRequestStatus.status === 'waiting-for-current-user-response'){
      const id = this.friendRequestStatus.id;
      this.connectionService.respondFriendRequest(id, status).pipe(take(1)).subscribe();
      this.friendRequestStatus.status = status;
    }
    else {
      this.connectionService.sendFriendRequest(this.userProfile.id).pipe(take(1)).subscribe();
      this.friendRequestStatus.status = 'pending';
    }
  }

  private getUserIdFromUrl(): Observable<number>{
    return this.route.params.pipe(
      map((params) => parseInt(params['id']))
    )
  }


}
