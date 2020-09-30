import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MainRoutes } from '../../enums/main-routes.enum';
import { ThreeOptimizedRoutes } from '../../enums/three-optimized-routes.enum';

@Component({
  selector: "app-menu-secondary",
  templateUrl: "./menu-secondary.component.html",
  styleUrls: ["./menu-secondary.component.scss"],
})
export class MenuSecondaryComponent implements OnInit {
  routerSubscription: Subscription;
  currentMainRoute = "";
  THREE_OPTIMIZED_ROUTES = ThreeOptimizedRoutes;
  MAIN_ROUTES_DOM_REF = MainRoutes;
  constructor(private router: Router) {}

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url) {
        this.currentMainRoute = event.url.split("/")[1];
      }
    });
  }
}
