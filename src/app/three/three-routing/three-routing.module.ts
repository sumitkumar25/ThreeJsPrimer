import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizationThreeComponent } from '../components/visualization-three/visualization-three.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: VisualizationThreeComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreeRoutingModule { }
