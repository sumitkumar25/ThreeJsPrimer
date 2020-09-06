import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizationThreeComponent } from './components/visualization-three/visualization-three.component';
import { ThreeRoutingModule } from './three-routing/three-routing.module';
import { ConnectedNodesComponent } from './components/connected-nodes/connected-nodes.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [VisualizationThreeComponent, ConnectedNodesComponent],
  imports: [
    CommonModule,
    ThreeRoutingModule,
    MatButtonModule
  ]
})
export class ThreeModule { }
