import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainRoutes } from "./common/enums/main-routes.enum";

const routes: Routes = [
  {
    path: `${MainRoutes.base3d}`,
    loadChildren: () =>
      import("./basic3d/basic3d.module").then((m) => m.Basic3dModule),
  },
  {
    path: `${MainRoutes["three-optimized"]}`,
    loadChildren: () =>
      import("./three-optimized/three-optimized.module").then(
        (m) => m.ThreeOptimizedModule
      ),
  },
  {
    path: `${MainRoutes["three-basics"]}`,
    loadChildren: () =>
      import("./three/three.module").then((m) => m.ThreeModule),
  },
  // {
  //   path: "pixi",
  //   loadChildren: () => import("./pixi/pixi.module").then((m) => m.PixiModule),
  // },
  {
    path: `${MainRoutes.canvas}`,
    loadChildren: () => import("./d3/d3.module").then((m) => m.D3Module),
  },
  {
    path: `${MainRoutes["globe-visualization"]}`,
    loadChildren: () =>
      import("./ct-visualization/ct-visualization.module").then(
        (m) => m.CtVisualizationModule
      ),
  },
  {
    path: `${MainRoutes["force-graph"]}`,
    loadChildren: () =>
      import("./three-force/three-force.module").then(
        (m) => m.ThreeForceModule
      ),
  },
  {
    path: "",
    redirectTo: "three-optimized",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
