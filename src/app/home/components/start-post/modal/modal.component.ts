import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class ModalComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  onPost() {
    console.log(8);
  }

}
