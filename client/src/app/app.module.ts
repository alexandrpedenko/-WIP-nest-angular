import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GlobalHttpErrorInterceptor } from '@shared/interceptors/http-global.interceptor';
import { SharedComponentsModule } from '@shared/components/shared-components.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedComponentsModule,
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpErrorInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
