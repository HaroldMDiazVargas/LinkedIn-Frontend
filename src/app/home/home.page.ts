import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { StartPostComponent } from './components/start-post/start-post.component';
import { AdversitingComponent } from './components/adversiting/adversiting.component';
import { ProfileSummaryComponent } from './components/profile-summary/profile-summary.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, HeaderComponent, ProfileSummaryComponent, StartPostComponent, AdversitingComponent],
})
export class HomePage {
  constructor() {}
}
