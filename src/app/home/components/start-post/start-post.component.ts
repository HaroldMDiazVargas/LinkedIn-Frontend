import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule, ModalController } from '@ionic/angular';
import { faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { ModalComponent } from './modal/modal.component';
import { PostService } from '../../services/post.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-start-post',
  templateUrl: './start-post.component.html',
  styleUrls: ['./start-post.component.scss'],
  standalone: true,
  imports: [IonicModule, FontAwesomeModule]
})
export class StartPostComponent  implements OnInit, OnDestroy {
  @Output() create: EventEmitter<any> = new EventEmitter();
  private subscription!: Subscription;
  userFullImagePath: string = '';
  faThumbsUp = faThumbsUp;
  faComment = faComment

  constructor(
    public modalController: ModalController,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.subscription = this.authService.userFullImagePath.subscribe((fullImagePath: string) => this.userFullImagePath = fullImagePath )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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
