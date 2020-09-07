import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizationThreeComponent } from './components/visualization-three/visualization-three.component';
import { ThreeRoutingModule } from './three-routing/three-routing.module';
import { ConnectedNodesComponent } from './components/connected-nodes/connected-nodes.component';
import { MatButtonModule } from '@angular/material/button';
import { GlobePackageComponent } from './components/globe-package/globe-package.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ThreeGlobe3dComponent } from './components/three-globe3d/three-globe3d.component';



@NgModule({
  declarations: [
    VisualizationThreeComponent, 
    ConnectedNodesComponent, 
    GlobePackageComponent,
    ThreeGlobe3dComponent
  ],
  imports: [
    CommonModule,
    ThreeRoutingModule,
    MatButtonModule,
    MatTabsModule
  ]
})
export class ThreeModule { }
