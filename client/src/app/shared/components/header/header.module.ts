import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@shared/material/material.module';
import { HeaderComponent } from './header.component';
import { HeaderNavComponent } from './header-nav/header-nav.component';

@NgModule({
  declarations: [
    HeaderComponent,
    HeaderNavComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    HeaderNavComponent
  ]
})
export class HeaderModule { }
