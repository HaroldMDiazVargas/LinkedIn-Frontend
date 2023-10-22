import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Post } from 'src/app/home/models/Post';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class ModalComponent  implements OnInit, OnDestroy {
  private userImagePathsubscription!: Subscription;
  userFullImagePath: string = '';
  userFullName: string = '';
  body: string = '';
  @Input() postToUpdate!: Post;
  @ViewChild('f') form!:NgForm;

  constructor(
    public modalController: ModalController,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.body = this.postToUpdate ? this.postToUpdate.body : '';
    this.userImagePathsubscription = this.authService.userFullImagePath.subscribe((fullImagePath: string) => this.userFullImagePath = fullImagePath )
    this.authService.userFullName.pipe(take(1)).subscribe((userFullName: string) => this.userFullName = userFullName);
  }

  ngOnDestroy(): void {
    this.userImagePathsubscription.unsubscribe();
  }

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
