import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisualizationD3Component } from '../components/visualization-d3/visualization-d3.component';

const routes: Routes = [
  {
    path: '',
    component: VisualizationD3Component
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class D3RoutingModule { }
