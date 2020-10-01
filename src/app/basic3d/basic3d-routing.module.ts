import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { Base3dRoutes } from "../common/enums/base3d-routes.enum";
import { GeometryComponent } from "./components/geometry/geometry.component";

const routes: Routes = [
  { path: "", component: GeometryComponent },
  { path: `${Base3dRoutes.customGeometry}`, component: GeometryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Basic3dRoutingModule {}
