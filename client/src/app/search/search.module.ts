import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserModule } from '@user/user.module';
import { MaterialModule } from '@shared/material/material.module';
import { SearchComponent } from './search.component';

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    UserModule,
  ]
})
export class SearchModule { }
