import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule,]
})
export class LoadingSpinnerComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
