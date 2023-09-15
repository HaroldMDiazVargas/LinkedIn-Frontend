import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class ModalComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
