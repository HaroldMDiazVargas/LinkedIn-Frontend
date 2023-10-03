import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/Post';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl: string = environment.apiUrl + '/feed';

  constructor(private http: HttpClient) { }

  getSelectedPosts(params: string){
    return this.http.get<Post[]>(this.baseUrl + params, { withCredentials: true})
  }

}
