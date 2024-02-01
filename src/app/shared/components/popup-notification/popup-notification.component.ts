import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'popup-notification',
  templateUrl: './popup-notification.component.html',
  styleUrls: ['./popup-notification.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,]
})
export class PopupNotificationComponent  implements OnInit {
  @Input('message') message!: string;

  constructor() { }

  ngOnInit() {}

}
