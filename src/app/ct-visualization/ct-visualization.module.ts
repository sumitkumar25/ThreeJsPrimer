import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CtVisualizationRoutingModule } from "./ct-visualization-routing.module";
import { CtGlobeInfrastructureComponent } from "./components/ct-globe-infrastructure/ct-globe-infrastructure.component";
import { CtVisualizationRequestService } from "./services/ct-visualization-request.service";
import { HttpClientModule } from "@angular/common/http";
import { CtGlobeGlIntfrastructureComponent } from "./components/ct-globe-gl-intfrastructure/ct-globe-gl-intfrastructure.component";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    CtGlobeInfrastructureComponent,
    CtGlobeGlIntfrastructureComponent,
  ],
  imports: [
    CommonModule,
    CtVisualizationRoutingModule,
    HttpClientModule,
    MatButtonModule,
  ],
  providers: [CtVisualizationRequestService],
})
export class CtVisualizationModule {}
