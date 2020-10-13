import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ThreeOptimizedRoutingModule } from "./three-optimized-routing.module";
import { UnoptimizedCubesComponent } from "./components/unoptimized-cubes/unoptimized-cubes.component";

import { InstancedLayoutComponent } from './components/instanced-layout/instanced-layout.component';
import { InstanceOptimizedComponent } from './components/instance-optimized/instance-optimized.component';
import { InstancedSpheresComponent } from './components/instanced-spheres/instanced-spheres.component';
import { OptimizedCubesComponent } from './components/optimized-cubes/optimized-cubes.component';

@NgModule({
  declarations: [
    UnoptimizedCubesComponent,
    OptimizedCubesComponent,
    InstancedSpheresComponent,
    InstanceOptimizedComponent,  
    InstancedLayoutComponent
  ],
  imports: [CommonModule, ThreeOptimizedRoutingModule],
})
export class ThreeOptimizedModule {}
