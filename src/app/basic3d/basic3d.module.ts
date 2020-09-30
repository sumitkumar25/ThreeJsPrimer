import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Basic3dRoutingModule } from './basic3d-routing.module';
import { GeometryComponent } from './components/geometry/geometry.component';


@NgModule({
  declarations: [GeometryComponent],
  imports: [
    CommonModule,
    Basic3dRoutingModule
  ]
})
export class Basic3dModule { }
