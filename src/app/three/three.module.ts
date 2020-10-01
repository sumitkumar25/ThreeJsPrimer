import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { ConnectedNodesComponent } from './components/connected-nodes/connected-nodes.component';
import { GlobeCounteriesComponent } from './components/globe-counteries/globe-counteries.component';
import { GlobePackageComponent } from './components/globe-package/globe-package.component';
import { ObjectGroupComponent } from './components/object-group/object-group.component';
import { ThreeGlobeComponent } from './components/three-globe/three-globe.component';
import { ThreeGlobe3dComponent } from './components/three-globe3d/three-globe3d.component';
import { ThreeRoutingModule } from './three-routing/three-routing.module';



@NgModule({
  declarations: [ 
    ConnectedNodesComponent, 
    GlobePackageComponent,
    ThreeGlobe3dComponent,
    GlobeCounteriesComponent,
    ThreeGlobeComponent,
    ObjectGroupComponent,
  ],
  imports: [
    CommonModule,
    ThreeRoutingModule,
    MatButtonModule,
    MatTabsModule
  ]
})
export class ThreeModule { }
