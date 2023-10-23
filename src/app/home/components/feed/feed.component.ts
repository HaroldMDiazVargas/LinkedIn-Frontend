import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AdvertisingComponent } from '../advertising/advertising.component';
import { AllPostsComponent } from '../all-posts/all-posts.component';
import { ProfileSummaryComponent } from '../profile-summary/profile-summary.component';
import { StartPostComponent } from '../start-post/start-post.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  standalone: true,
  imports: [IonicModule, ProfileSummaryComponent, StartPostComponent, AdvertisingComponent, AllPostsComponent],
})
export class FeedComponent  implements OnInit {
  body = '';
  constructor() {}
  
  ngOnInit() {}
  
  onCreatePost(body: string){
    this.body = body;
  }
}
