import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtRequestInterceptor } from '@shared/interceptors/jwt.interceptor';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule
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
