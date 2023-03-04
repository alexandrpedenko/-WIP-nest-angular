import { PostsRoutingModule } from './posts-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@shared/material/material.module';
import { PostsListItemComponent } from './components/posts-list-item/posts-list-item.component';
import { PostListComponent } from './components/posts-list/posts-list.component';

@NgModule({
  declarations: [PostsListItemComponent, PostListComponent],
  imports: [CommonModule, PostsRoutingModule, MaterialModule],
  exports: [PostsListItemComponent, PostListComponent],
})
export class PostsModule {}
