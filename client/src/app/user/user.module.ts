import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './compoents/user-list/user-list.component';
import { UserListItemComponent } from './compoents/user-list-item/user-list-item.component';
import { MaterialModule } from '@shared/material/material.module';


@NgModule({
  declarations: [
    UserListComponent,
    UserListItemComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule
  ],
  exports: [
    UserListComponent,
    UserListItemComponent
  ]
})
export class UserModule { }
