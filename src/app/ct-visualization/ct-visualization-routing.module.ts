import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CtVisualizationComponent } from './components/ct-visualization/ct-visualization.component';


const routes: Routes = [
  {
    path: '',
    component: CtVisualizationComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CtVisualizationRoutingModule { }
