import { Component, OnInit } from "@angular/core";
import { MainRoutes } from "../../enums/main-routes.enum";

@Component({
  selector: "app-menu-primary",
  templateUrl: "./menu-primary.component.html",
  styleUrls: ["./menu-primary.component.scss"],
})
export class MenuPrimaryComponent implements OnInit {
  MAIN_ROUTES_DOM_REF = MainRoutes;
  constructor() {}

  ngOnInit() {}
}
