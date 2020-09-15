import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreeForceRoutingModule } from './three-force-routing.module';
import { ForceGraphComponent } from './components/force-graph/force-graph.component';


@NgModule({
  declarations: [ForceGraphComponent],
  imports: [
    CommonModule,
    ThreeForceRoutingModule
  ]
})
export class ThreeForceModule { }
