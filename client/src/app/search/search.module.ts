import { PostsModule } from './../posts/posts.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserModule } from '@user/user.module';
import { MaterialModule } from '@shared/material/material.module';
import { SearchComponent } from './search.component';
import { SharedComponentsModule } from '@shared/components/shared-components.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    UserModule,
    PostsModule,
    SharedComponentsModule,
  ],
  exports: [SearchComponent],
})
export class SearchModule {}
