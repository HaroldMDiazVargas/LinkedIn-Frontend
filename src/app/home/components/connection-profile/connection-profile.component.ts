import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { BannerColorService } from '../../services/banner-color.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-connection-profile',
  templateUrl: './connection-profile.component.html',
  styleUrls: ['./connection-profile.component.scss'],
  standalone: true,
  imports: [HeaderComponent, CommonModule, IonicModule]
})
export class ConnectionProfileComponent  implements OnInit {
  userFullImagePath = '';
  userFullName = '';

  constructor(
    public bannerService: BannerColorService
  ) { }

  ngOnInit() {
    this.userFullImagePath = environment.apiUrl+'/feed/image/avatar.svg';
    this.userFullName = 'Harold Díaz'
  }

}
