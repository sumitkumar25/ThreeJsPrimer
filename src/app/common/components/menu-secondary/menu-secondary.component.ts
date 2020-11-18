import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Base3dRoutes } from "../../enums/base3d-routes.enum";
import { GlobeModuleRoutes } from "../../enums/globe-module-routes.enum";
import { MainRoutes } from "../../enums/main-routes.enum";
import { NetworkGraphRoutes } from "../../enums/network-graph-routes.enum";
import { ThreeModuleRoutes } from "../../enums/three-module-routes.enum";
import { ThreeOptimizedRoutes } from "../../enums/three-optimized-routes.enum";

@Component({
  selector: "app-menu-secondary",
  templateUrl: "./menu-secondary.component.html",
  styleUrls: ["./menu-secondary.component.scss"],
})
export class MenuSecondaryComponent implements OnInit {
  routerSubscription: Subscription;
  currentMainRoute = "";
  THREE_OPTIMIZED_ROUTES = ThreeOptimizedRoutes;
  BASE_3D_ROUTES = Base3dRoutes;
  THREE_MODULE_ROUTES = ThreeModuleRoutes;
  GLOBE_MODULE_ROUTES = GlobeModuleRoutes;
  MAIN_ROUTES_DOM_REF = MainRoutes;
  NETWORK_GRAPH_ROUTES = NetworkGraphRoutes;
  constructor(private router: Router) {}

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url) {
        this.currentMainRoute = event.url.split("/")[1] || "network-graph";
      }
    });
  }
}
