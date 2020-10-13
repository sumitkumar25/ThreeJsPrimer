import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ThreeOptimizedRoutes } from "../common/enums/three-optimized-routes.enum";
import { InstanceOptimizedComponent } from "./components/instance-optimized/instance-optimized.component";
import { InstancedLayoutComponent } from "./components/instanced-layout/instanced-layout.component";
import { InstancedSpheresComponent } from "./components/instanced-spheres/instanced-spheres.component";
import { OptimizedCubesComponent } from "./components/optimized-cubes/optimized-cubes.component";
import { UnoptimizedCubesComponent } from "./components/unoptimized-cubes/unoptimized-cubes.component";

const routes: Routes = [
  {
    path: `${ThreeOptimizedRoutes.instancingRaycast}`,
    component: InstanceOptimizedComponent,
  },
  {
    path: `${ThreeOptimizedRoutes.instancingBasic}`,
    component: OptimizedCubesComponent,
  },
  {
    path: `${ThreeOptimizedRoutes.webglShaders}`,
    component: InstancedSpheresComponent,
  },
  {
    path: `${ThreeOptimizedRoutes.unoptimizedCubes}`,
    component: UnoptimizedCubesComponent,
  },
  {
    path: `${ThreeOptimizedRoutes.instancingLayout}`,
    component: InstancedLayoutComponent,
  },
  {
    path: "",
    redirectTo: `${ThreeOptimizedRoutes.instancingLayout}`,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThreeOptimizedRoutingModule {}
