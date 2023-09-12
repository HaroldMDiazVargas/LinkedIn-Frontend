import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

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

  constructor() { }

  ngOnInit() {}

}
