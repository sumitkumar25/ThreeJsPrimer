import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForceGraphComponent } from './components/force-graph/force-graph.component';


const routes: Routes = [
  {
    path: '',
    component: ForceGraphComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreeForceRoutingModule { }
