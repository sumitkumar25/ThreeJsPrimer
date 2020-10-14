import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Basic3dRoutingModule } from './basic3d-routing.module';
import { GeometryComponent } from './components/geometry/geometry.component';
import { AnimationsComponent } from './components/animations/animations.component';


@NgModule({
  declarations: [GeometryComponent, AnimationsComponent],
  imports: [
    CommonModule,
    Basic3dRoutingModule
  ]
})
export class Basic3dModule { }
