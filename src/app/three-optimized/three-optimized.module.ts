import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThreeOptimizedRoutingModule } from './three-optimized-routing.module';
import { InstanceMeshComponent } from './components/instance-mesh/instance-mesh.component';
import { ThreeOptimizedComponent } from './components/three-optimized/three-optimized.component';
import { UnoptimizedCubesComponent } from './components/unoptimized-cubes/unoptimized-cubes.component';


@NgModule({
  declarations: [InstanceMeshComponent, ThreeOptimizedComponent, UnoptimizedCubesComponent],
  imports: [
    CommonModule,
    ThreeOptimizedRoutingModule
  ]
})
export class ThreeOptimizedModule { }
