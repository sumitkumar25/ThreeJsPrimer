import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { D3RoutingModule } from "./d3-routing/d3-routing.module";
import { CanvasConnectedNodesComponent } from "./components/canvas-connected-nodes/canvas-connected-nodes.component";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [CanvasConnectedNodesComponent],
  imports: [CommonModule, D3RoutingModule],
})
export class D3Module {}
