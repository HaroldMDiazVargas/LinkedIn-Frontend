import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { StartPostComponent } from './components/start-post/start-post.component';
import { ProfileSummaryComponent } from './components/profile-summary/profile-summary.component';
import { AdvertisingComponent } from './components/advertising/advertising.component';
import { AllPostsComponent } from './components/all-posts/all-posts.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, HeaderComponent, ProfileSummaryComponent, StartPostComponent, AdvertisingComponent, AllPostsComponent],
})
export class HomePage {
  body = '';
  constructor() {}

  onCreatePost(body: string){
    this.body = body;
  }
}
