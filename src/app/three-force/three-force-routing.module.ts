import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForceGraphComponent } from './components/force-graph/force-graph.component';
import { GraphLinkComponent } from './components/graph-link/graph-link.component';


const routes: Routes = [
  {
    path: '',
    component: GraphLinkComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThreeForceRoutingModule { }
