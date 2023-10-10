import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollCustomEvent, IonInfiniteScroll, IonicModule, ScrollCustomEvent } from '@ionic/angular';
import { faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../../models/Post';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';
import { BehaviorSubject, map, take } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
  standalone: true,
  imports: [IonicModule, FontAwesomeModule, CommonModule],
// pro
})
export class AllPostsComponent  implements OnInit {
  @Input() postBody?: string;
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  faThumbsUp = faThumbsUp;
  faComment = faComment;
  allLoadedPosts: Post[] = [];
  queryParams: string = '';
  numberOfPosts = 5;
  skipPosts = 0;
  userId$ = new BehaviorSubject<number>(0)

  constructor(
    private postService: PostService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.getPosts(false);
    this.authService.userId.pipe(
      take(1)).subscribe((userId: number ) => {
        this.userId$.next(userId);
      })
  }

  ngOnChanges(changes: SimpleChanges){    //Detect the input variable changes
    const postBody = changes['postBody'].currentValue;
    if (!postBody) return;
    this.postService.createPost(postBody).subscribe((post: Post) => {
      this.allLoadedPosts.unshift(post);
    })
  }

  getPosts(isInitialLoad: boolean, ev?: InfiniteScrollCustomEvent ){
    // if (this.skipPosts === 20) ev.target.disabled = true;
    this.queryParams = `?take=${this.numberOfPosts}&skip=${this.skipPosts}`;
    const posts = this.postService.getSelectedPosts(this.queryParams).subscribe({
      next: (posts: Post[]) => {
        for (let index = 0; index < posts.length; index++) {
          this.allLoadedPosts.push(posts[index]);
        }
        if (isInitialLoad) ev?.target.complete();
        this.skipPosts = this.skipPosts + 5;
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  loadData(ev: InfiniteScrollCustomEvent ) {
    this.getPosts(true, ev)
  }

  presentUpdateModal(postId: number){
    console.log('update')
  }

  deletePost(postId: number){
    this.postService.deletePost(postId).subscribe({
      next: (result) => {
        this.allLoadedPosts = this.allLoadedPosts.filter(post => post.id !== postId)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
