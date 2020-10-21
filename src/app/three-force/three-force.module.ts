import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreeForceRoutingModule } from './three-force-routing.module';
import { ForceGraphComponent } from './components/force-graph/force-graph.component';
import { GraphLinkComponent } from './components/graph-link/graph-link.component';


@NgModule({
  declarations: [ForceGraphComponent, GraphLinkComponent],
  imports: [
    CommonModule,
    ThreeForceRoutingModule
  ]
})
export class ThreeForceModule { }
