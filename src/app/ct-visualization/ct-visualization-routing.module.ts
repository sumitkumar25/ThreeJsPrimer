import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GlobeModuleRoutes } from "../common/enums/globe-module-routes.enum";
import { CtGlobeGlIntfrastructureComponent } from "./components/ct-globe-gl-intfrastructure/ct-globe-gl-intfrastructure.component";
import { CtGlobeInfrastructureComponent } from "./components/ct-globe-infrastructure/ct-globe-infrastructure.component";
import { CtVisualizationComponent } from "./components/ct-visualization/ct-visualization.component";

const routes: Routes = [
  {
    path: `${GlobeModuleRoutes.globeGlPackage}`,
    component: CtGlobeGlIntfrastructureComponent,
  },
  {
    path: `${GlobeModuleRoutes.globeRaycaster}`,
    component: CtGlobeInfrastructureComponent,
  },
  {
    path: "",
    component: CtGlobeGlIntfrastructureComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CtVisualizationRoutingModule {}
