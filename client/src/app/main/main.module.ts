import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SharedComponentsModule } from '@shared/components/shared-components.module';
import { SearchModule } from '@search/search.module';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedComponentsModule,
    SearchModule,
  ],
})
export class MainModule {}
