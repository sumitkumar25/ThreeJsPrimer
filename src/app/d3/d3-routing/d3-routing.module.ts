import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CanvasConnectedNodesComponent } from "../components/canvas-connected-nodes/canvas-connected-nodes.component";

const routes: Routes = [
  {
    path: "",
    component: CanvasConnectedNodesComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class D3RoutingModule {}
