import { Component, Input, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InfiniteScrollCustomEvent, IonInfiniteScroll, IonicModule, ModalController, ScrollCustomEvent } from '@ionic/angular';
import { faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../../models/Post';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post.service';
import { BehaviorSubject, Subscription, combineLatest, map, take } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ModalComponent } from '../start-post/modal/modal.component';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/auth/models';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { postsActions } from '../../store/actions';
import { selectPosts } from '../../store/reducers';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss'],
  standalone: true,
  imports: [IonicModule, FontAwesomeModule, CommonModule, RouterModule],
// pro
})
export class AllPostsComponent  implements OnInit, OnDestroy {
  // @Input() postBody?: string;
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  baseUserImageUrl: string = environment.apiUrl+'/feed/image/';
  faThumbsUp = faThumbsUp;
  faComment = faComment;
  allLoadedPosts: Post[] = [];
  queryParams: string = '';
  numberOfPosts = 5;
  skipPosts = 0;
  userId$ = new BehaviorSubject<number>(0)
  // userId!: number;
  private userImagePathsubscription!: Subscription;
  private userSubscription!: Subscription;
  userFullImagePath: string = '';
  userFullName: string = '';
  data$ = combineLatest({   //Resolve every single stream with the value
    posts: this.store.select(selectPosts),
  });

  constructor(
    private postService: PostService,
    private authService: AuthService,
    public modalController: ModalController,
    private store: Store
    ) { }

  ngOnInit() {
    this.getPosts(false);
    this.authService.userId.pipe(take(1)).subscribe((userId: number) => this.userId$.next(userId));
    // this.userSubscription = this.authService.userStream.subscribe((user: User) => {
    //   this.allLoadedPosts.forEach((post: Post) => {
    //     if (post.author.id === user.id)
    //       post.author.imagePath = user.imagePath
    //   })
    // })
    this.userImagePathsubscription = this.authService.userFullImagePath.subscribe((fullImagePath: string) => this.userFullImagePath = fullImagePath );
    this.authService.userFullName.pipe(take(1)).subscribe((userFullName: string) => this.userFullName = userFullName);
  }

  ngOnDestroy(): void {
    this.userImagePathsubscription.unsubscribe();
    // this.userSubscription.unsubscribe();
  }

  
  // REPLACED BY REDUX 
  // ngOnChanges(changes: SimpleChanges){    //Detect the input variable changes
  //   const postBody = changes['postBody'].currentValue;
  //   if (!postBody) return;
  //   this.postService.createPost(postBody).subscribe((post: Post) => {
  //     this.allLoadedPosts.unshift(post);
  //   })
  // }

  getPosts(isInitialLoad: boolean, ev?: InfiniteScrollCustomEvent ){
    this.store.dispatch(postsActions.getLimitPosts({ skip: this.skipPosts, take: this.numberOfPosts}));
    this.skipPosts = this.skipPosts + 5;
    // this.queryParams = `?take=${this.numberOfPosts}&skip=${this.skipPosts}`;
    // const posts = this.postService.getSelectedPosts(this.queryParams).subscribe({
    //   next: (posts: Post[]) => {
    //     for (let index = 0; index < posts.length; index++) {
    //       this.allLoadedPosts.push(posts[index]);
    //     }
    //     this.skipPosts = this.skipPosts + 5;
    //   },
    //   error: (error) => {
    //     console.log(error)
    //   }
    // })
    if (isInitialLoad) ev?.target.complete();
  }

  loadData(ev: InfiniteScrollCustomEvent ) {
    this.getPosts(true, ev)
  }

  async presentUpdateModal(postToUpdate: Post){
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'modal-global-class',
      componentProps: {
        postToUpdate
      }
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (!data) return;
    if (data){
      const newBody = data.post.body;
      this.store.dispatch(postsActions.updatePost({id: postToUpdate.id, body: newBody}))
      // this.postService.updatePost(postToUpdate.id, newBody).subscribe({
      //   next: (result) => {
      //     const indx = this.allLoadedPosts.findIndex(post => post.id === postToUpdate.id);
      //     this.allLoadedPosts[indx].body = newBody;
      //   }
      // })
    }
  }

  deletePost(id: number){
    this.store.dispatch(postsActions.deletePost({id}))
    // this.postService.deletePost(postId).subscribe({
    //   next: (result) => {
    //     this.allLoadedPosts = this.allLoadedPosts.filter(post => post.id !== postId)
    //   },
    //   error: (error) => {
    //     console.log(error)
    //   }
    // })
  }
}
