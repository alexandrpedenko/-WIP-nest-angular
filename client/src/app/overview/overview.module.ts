import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { OverviewRoutingModule } from './overview-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtRequestInterceptor } from '@shared/interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    OverviewComponent
  ],
  imports: [
    CommonModule,
    OverviewRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtRequestInterceptor,
      multi: true,
    },
  ]
})
export class OverviewModule { }
