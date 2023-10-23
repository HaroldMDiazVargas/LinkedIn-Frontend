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
import { FriendRequestStatus, FriendRequest_Status } from '../../models/FriendRequest';

@Component({
  selector: 'app-connection-profile',
  templateUrl: './connection-profile.component.html',
  styleUrls: ['./connection-profile.component.scss'],
  standalone: true,
  imports: [HeaderComponent, CommonModule, IonicModule, RouterModule]
})
export class ConnectionProfileComponent  implements OnInit {
  user!: User;
  baseUserImageUrl: string = environment.apiUrl+'/feed/image/';
  bannerColors: BannerColors = {} as BannerColors;
  friendRequestStatus: FriendRequest_Status = {} as FriendRequest_Status;

  constructor(
    public bannerService: BannerColorService,
    private connectionService: ConnectionProfileService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getUser().pipe(take(1)).subscribe((user: User) => {
      this.bannerColors = this.bannerService.getBannerColors(user.role);
      this.user = user;
    });

    this.getFriendRequestStatus().pipe(take(1)).subscribe((friendRequestStatus: FriendRequestStatus) => {
      console.log(friendRequestStatus)
      this.friendRequestStatus = friendRequestStatus.status;
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
  
  getFriendRequestStatus(): Observable<FriendRequestStatus>{
    return this.getUserIdFromUrl().pipe(
      take(1),
      switchMap((userId: number) => {
        return this.connectionService.getFriendRequestStatus(userId)
      })
      )
  }

  private getUserIdFromUrl(): Observable<number>{
    return this.route.params.pipe(
      map((params) => parseInt(params['id']))
    )
  }


}
