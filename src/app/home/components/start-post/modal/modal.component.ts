import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Post } from 'src/app/home/models/Post';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class ModalComponent  implements OnInit {
  body: string = '';
  @Input() postToUpdate!: Post;
  @ViewChild('f') form!:NgForm;

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    this.body = this.postToUpdate ? this.postToUpdate.body : '';
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
