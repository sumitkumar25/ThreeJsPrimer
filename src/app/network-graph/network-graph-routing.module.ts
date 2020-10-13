import { Component, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { NetworkGraphRoutes } from "../common/enums/network-graph-routes.enum";
import { GroupLayoutComponent } from "./components/group-layout/group-layout.component";

const routes: Routes = [
  {
    path: `${NetworkGraphRoutes.groupLayout}`,
    component: GroupLayoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NetworkGraphRoutingModule {}
