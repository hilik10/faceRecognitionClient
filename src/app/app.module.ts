import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {WebcamModule} from 'ngx-webcam';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraComponent } from './camera/camera.component';
import {HttpClientModule} from '@angular/common/http';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    WebcamModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
