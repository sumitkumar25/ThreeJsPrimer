import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisualizationPixiComponent } from '../components/visualization-pixi/visualization-pixi.component';
const routes: Routes = [
  {
    path: '',
    component: VisualizationPixiComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PixiRoutingModule { }
