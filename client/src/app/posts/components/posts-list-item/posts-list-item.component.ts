import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IPost } from '../../types/post';

@Component({
  selector: 'app-posts-list-item',
  templateUrl: './posts-list-item.component.html',
  styleUrls: ['./posts-list-item.component.scss'],
})
export class PostsListItemComponent {
  @Input() post: IPost;
  apiLink = environment.API_LINK;
}
