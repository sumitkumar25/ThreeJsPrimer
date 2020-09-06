import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizationD3Component } from './components/visualization-d3/visualization-d3.component';
import { D3RoutingModule } from './d3-routing/d3-routing.module';
import { CanvasConnectedNodesComponent } from './components/canvas-connected-nodes/canvas-connected-nodes.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [VisualizationD3Component, CanvasConnectedNodesComponent],
  imports: [
    CommonModule,
    D3RoutingModule,
    MatButtonModule
  ]
})
export class D3Module { }
