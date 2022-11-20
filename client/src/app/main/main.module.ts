import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtRequestInterceptor } from '@shared/interceptors/jwt.interceptor';
import { SharedComponentsModule } from '@shared/components/shared-components.module';
import { SearchModule } from '@search/search.module';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedComponentsModule,
    SearchModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtRequestInterceptor,
      multi: true,
    },
  ]
})
export class MainModule {}
