import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-profile-summary',
  templateUrl: './profile-summary.component.html',
  styleUrls: ['./profile-summary.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class ProfileSummaryComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
