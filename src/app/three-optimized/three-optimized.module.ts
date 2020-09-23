import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ThreeOptimizedRoutingModule } from "./three-optimized-routing.module";
import { ThreeOptimizedComponent } from "./components/three-optimized/three-optimized.component";
import { UnoptimizedCubesComponent } from "./components/unoptimized-cubes/unoptimized-cubes.component";
import { OptimizedCubesComponent } from './optimized-cubes/optimized-cubes.component';
import { InstancedSpheresComponent } from './instanced-spheres/instanced-spheres.component';

@NgModule({
  declarations: [ThreeOptimizedComponent, UnoptimizedCubesComponent, OptimizedCubesComponent, InstancedSpheresComponent],
  imports: [CommonModule, ThreeOptimizedRoutingModule],
})
export class ThreeOptimizedModule {}
