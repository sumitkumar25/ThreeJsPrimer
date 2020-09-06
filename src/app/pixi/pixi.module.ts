import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizationPixiComponent } from './components/visualization-pixi/visualization-pixi.component';
import { PixiRoutingModule } from './pixi-routing/pixi-routing.module';



@NgModule({
  declarations: [VisualizationPixiComponent],
  imports: [
    CommonModule,
    PixiRoutingModule
  ]
})
export class PixiModule { }
