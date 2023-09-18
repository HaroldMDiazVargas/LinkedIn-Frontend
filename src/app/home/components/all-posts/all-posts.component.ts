import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IonicModule } from '@ionic/angular';
import { faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
  standalone: true,
  imports: [IonicModule, FontAwesomeModule]
})
export class AllPostsComponent  implements OnInit {
  faThumbsUp = faThumbsUp;
  faComment = faComment

  constructor() { }

  ngOnInit() {}

}
