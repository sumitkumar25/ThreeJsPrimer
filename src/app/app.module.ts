import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThreeGlobeComponent } from './three-globe/three-globe.component';
import { ThreeGlobe3dComponent } from './three-globe3d/three-globe3d.component';
import { ThreeSolarSystemComponent } from './three-solar-system/three-solar-system.component';

@NgModule({
  declarations: [
    AppComponent,
    ThreeGlobeComponent,
    ThreeGlobe3dComponent,
    ThreeSolarSystemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
