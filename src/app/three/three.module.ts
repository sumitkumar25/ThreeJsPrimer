import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizationThreeComponent } from './components/visualization-three/visualization-three.component';
import { ThreeRoutingModule } from './three-routing/three-routing.module';
import { ConnectedNodesComponent } from './components/connected-nodes/connected-nodes.component';
import { MatButtonModule } from '@angular/material/button';
import { GlobePackageComponent } from './components/globe-package/globe-package.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ThreeGlobe3dComponent } from './components/three-globe3d/three-globe3d.component';
import { GlobeCounteriesComponent } from './components/globe-counteries/globe-counteries.component';
import { ThreeGlobeComponent } from './components/three-globe/three-globe.component';
import { ObjectGroupComponent } from './components/object-group/object-group.component';
import { InstanceMeshComponent } from './components/instance-mesh/instance-mesh.component';



@NgModule({
  declarations: [
    VisualizationThreeComponent, 
    ConnectedNodesComponent, 
    GlobePackageComponent,
    ThreeGlobe3dComponent,
    GlobeCounteriesComponent,
    ThreeGlobeComponent,
    ObjectGroupComponent,
    InstanceMeshComponent
  ],
  imports: [
    CommonModule,
    ThreeRoutingModule,
    MatButtonModule,
    MatTabsModule
  ]
})
export class ThreeModule { }
