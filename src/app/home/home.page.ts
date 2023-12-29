import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

// const config: SocketIoConfig = { url: 'http://localhost:9000', options: {}}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, HeaderComponent] // For not standalone SocketIoModule.forRoot(config)],
})
export class HomePage {
  constructor() {}
}
