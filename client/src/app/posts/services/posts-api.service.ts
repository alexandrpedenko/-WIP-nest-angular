import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { serializeHttpParams } from '@shared/utils/http-serialize';
import { AuthService } from '@auth/services/auth.service';
import { IGetPostsParams } from './types';
import { IPost } from '../types/post';


@Injectable({
  providedIn: 'root'
})
export class PostsApiService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  findPosts(httpParams: IGetPostsParams) {
    return this.http.get<IPost[]>(
      `/api/posts/feed/${this.authService.loggedInUser?._id}`,
      { params: serializeHttpParams(httpParams) }
    );
  }
}
