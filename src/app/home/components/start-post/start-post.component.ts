import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule, ModalController } from '@ionic/angular';
import { faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from './modal/modal.component';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-start-post',
  templateUrl: './start-post.component.html',
  styleUrls: ['./start-post.component.scss'],
  standalone: true,
  imports: [IonicModule, FontAwesomeModule]
})
export class StartPostComponent  implements OnInit {
  @Output() create: EventEmitter<any> = new EventEmitter();
  faThumbsUp = faThumbsUp;
  faComment = faComment

  constructor(
    public modalController: ModalController
    ) { }

  ngOnInit() {}

  async presentModal(){
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'modal-global-class'
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (!data) return;
    if (data){
      this.create.emit(data.post.body)
    }
  }

}
