import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CtVisualizationRoutingModule } from './ct-visualization-routing.module';
import { CtVisualizationComponent } from './components/ct-visualization/ct-visualization.component';
import { CtGlobeInfrastructureComponent } from './components/ct-globe-infrastructure/ct-globe-infrastructure.component';
import { CtVisualizationRequestService } from './services/ct-visualization-request.service';
import { HttpClientModule } from '@angular/common/http';
import { CtGlobeGlIntfrastructureComponent } from './components/ct-globe-gl-intfrastructure/ct-globe-gl-intfrastructure.component';


@NgModule({
  declarations: [CtVisualizationComponent, CtGlobeInfrastructureComponent, CtGlobeGlIntfrastructureComponent],
  imports: [
    CommonModule,
    CtVisualizationRoutingModule,
    HttpClientModule
  ],
  providers: [
    CtVisualizationRequestService
  ]
})
export class CtVisualizationModule { }
