import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ThreeModuleRoutes } from "src/app/common/enums/three-module-routes.enum";
import { ConnectedNodesComponent } from "../components/connected-nodes/connected-nodes.component";
import { GlobeCounteriesComponent } from "../components/globe-counteries/globe-counteries.component";
import { GlobePackageComponent } from "../components/globe-package/globe-package.component";
import { ObjectGroupComponent } from "../components/object-group/object-group.component";
import { ThreeGlobeComponent } from "../components/three-globe/three-globe.component";
import { ThreeGlobe3dComponent } from "../components/three-globe3d/three-globe3d.component";
const routes: Routes = [
  {
    path: `${ThreeModuleRoutes.threeGlobeComponent}`,
    component: ThreeGlobeComponent,
  },
  {
    path: `${ThreeModuleRoutes.threeGlobe3dComponent}`,
    component: ThreeGlobe3dComponent,
  },
  {
    path: `${ThreeModuleRoutes.globePackageComponent}`,
    component: GlobePackageComponent,
  },
  {
    path: `${ThreeModuleRoutes.globeCounteriesComponent}`,
    component: GlobeCounteriesComponent,
  },
  {
    path: `${ThreeModuleRoutes.connectedNodesComponent}`,
    component: ConnectedNodesComponent,
  },
  {
    path: `${ThreeModuleRoutes.objectGroupComponent}`,
    component: ObjectGroupComponent,
  },
  {
    path: "",
    component: ThreeGlobeComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThreeRoutingModule {}
