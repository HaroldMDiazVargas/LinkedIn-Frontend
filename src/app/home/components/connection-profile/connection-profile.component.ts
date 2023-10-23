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
  bannerColors: BannerColors = {} as BannerColors

  constructor(
    public bannerService: BannerColorService,
    private connectionService: ConnectionProfileService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getUser().pipe(take(1)).subscribe((user: User) => {
      this.bannerColors = this.bannerService.getBannerColors(user.role);
      this.user = user;
    })
  }

  getUser(): Observable<User> {
    return this.getUserIdFromUrl().pipe(
      take(1),
      switchMap((userId: number) => {
        return this.connectionService.getConnectionUser(userId)
      })
    )
  }

  private getUserIdFromUrl(): Observable<number>{
    return this.route.params.pipe(
      map((params) => parseInt(params['id']))
    )
  }

}
