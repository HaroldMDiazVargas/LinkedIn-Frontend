import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class ModalComponent  implements OnInit {
  
  @ViewChild('f') form!:NgForm;

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  onPost() {
    if (!this.form.valid) return;
    const body = this.form.value['body'];
    this.modalController.dismiss(
      {
        post: {
          body
        }
      },
      'post'
    )
  }

  async  onDismiss(){
    await this.modalController.dismiss(null, 'dismiss');
  }

}
