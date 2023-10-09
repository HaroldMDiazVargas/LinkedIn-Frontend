import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/Post';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl: string = environment.apiUrl + '/feed';

  constructor(private http: HttpClient) { }

  getSelectedPosts(params: string){
    return this.http.get<Post[]>(this.baseUrl + params, { withCredentials: true})
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
