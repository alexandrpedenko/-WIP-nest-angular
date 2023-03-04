import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostsApiService } from './posts-api.service';
import { IGetPostsParams } from './types';
import { IPost } from '../types/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private postApiService: PostsApiService) { }

  findPosts(httpParams: IGetPostsParams): Observable<IPost[]> {
    return this.postApiService.findPosts(httpParams);
  }
}
