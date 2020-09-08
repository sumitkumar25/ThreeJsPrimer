import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'three',
    loadChildren: () => import('./three/three.module').then(m => m.ThreeModule)
  },
  {
    path: 'pixi',
    loadChildren: () => import('./pixi/pixi.module').then(m => m.PixiModule)
  },
  {
    path: 'd3',
    loadChildren: () => import('./d3/d3.module').then(m => m.D3Module)
  },
  {
    path: 'CtVisualization',
    loadChildren: () => import('./ct-visualization/ct-visualization.module').then(m => m.CtVisualizationModule)
  },
  {
    path: '',
    redirectTo: 'CtVisualization',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }