import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/Post';
import { environment } from 'src/environments/environment';
import { catchError, take, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ErrorHandlerService } from './../../core/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl: string = environment.apiUrl + '/feed';

  constructor(
    private http: HttpClient,
    private erroHandlerService: ErrorHandlerService
    // private authService: AuthService
    ) { 
      // this.authService.getUserImageName().pipe(                                    //Use only for JWT logic, when localStorage data is not updated!
      //   take(1),                                                                   //With Session auth, like we're continously call server to check auth
      //   tap(({ imageName }) => {                                                     //we always have the user data updated, we don't need to call it again!
      //     const defaultImagePath = 'avatar.svg';
      //     this.authService.updateUserImagePath(imageName || defaultImagePath).subscribe();
      //   })
      // ).subscribe()
  }

  getSelectedPosts(params: string){
    return this.http.get<Post[]>(this.baseUrl + params, { withCredentials: true}).pipe(
      tap((posts: Post[]) => {
        if (!posts.length) throw new Error('No posts to retrieve');
      }),
      catchError(
        this.erroHandlerService.handleError<Post[]>('getSelectedPosts', [])
      )
    )
  }

  createPost(body: string){
    return this.http.post<Post>(this.baseUrl, { body }, { withCredentials: true} )
      .pipe(
        take(1)       //Avoid to unsubcribe, destorys the observable after take one
      );
  }

  updatePost(id: number, body: string){
    return this.http.put(`${this.baseUrl}/${id}`, { body }, { withCredentials: true} )
      .pipe(
        take(1)       //Avoid to unsubcribe, destorys the observable after take one
      );
  }

  deletePost(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`, { withCredentials: true} )
      .pipe(
        take(1)       //Avoid to unsubcribe, destorys the observable after take one
      );
  }


}
