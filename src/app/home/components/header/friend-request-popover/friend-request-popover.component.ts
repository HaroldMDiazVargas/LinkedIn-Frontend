import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
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
    public connectionProfileService: ConnectionProfileService
  ) { }

  ngOnInit() {}

}
