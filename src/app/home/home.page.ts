import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { StoreModule, provideState, provideStore } from '@ngrx/store';
import { postFeatureKey, postReducer } from './store/reducers';

// const config: SocketIoConfig = { url: 'http://localhost:9000', options: {}}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, HeaderComponent],  // For not standalone SocketIoModule.forRoot(config)],
  // providers: [provideState(postFeatureKey, postReducer)]
})
export class HomePage {
  constructor() {}
}
