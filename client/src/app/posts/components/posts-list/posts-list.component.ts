import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../../types/post';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostListComponent {
  @Input() posts$: Observable<IPost[]>;
}
