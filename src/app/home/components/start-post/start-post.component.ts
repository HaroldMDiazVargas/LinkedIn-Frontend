import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule, ModalController } from '@ionic/angular';
import { faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-start-post',
  templateUrl: './start-post.component.html',
  styleUrls: ['./start-post.component.scss'],
  standalone: true,
  imports: [IonicModule, FontAwesomeModule]
})
export class StartPostComponent  implements OnInit {
  faThumbsUp = faThumbsUp;
  faComment = faComment

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  async presentModal(){
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'modal-global-class'
    });

    await modal.present();
    const { role } = await modal.onDidDismiss();

    console.log(7, role);
  }

}
