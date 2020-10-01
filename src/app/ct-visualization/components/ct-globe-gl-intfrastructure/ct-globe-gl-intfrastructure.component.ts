import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";
import Globe from "globe.gl";
import { CtVisualizationRequestService } from "../../services/ct-visualization-request.service";
import { GeoJson, GeoJsonResponse } from "../../interfaces/geo-json";
import { GlobeData } from "../../interfaces/globe-data";
import { ThreeService } from "src/app/three/services/three.service";
@Component({
  selector: "app-ct-globe-gl-intfrastructure",
  templateUrl: "./ct-globe-gl-intfrastructure.component.html",
  styleUrls: ["./ct-globe-gl-intfrastructure.component.scss"],
})
export class CtGlobeGlIntfrastructureComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("el", { static: false }) el: ElementRef;

  filteredGlobeData: Array<GlobeData>;
  subscription: any;

  constructor(
    private ctVisualization: CtVisualizationRequestService,
    private threeService: ThreeService
  ) {}
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngOnInit() {}
  getStateCapitalsData() {
    this.subscription = this.ctVisualization
      .getStateCapitals()
      .subscribe((response: GeoJsonResponse) => {
        if (response.features && response.features.length) {
          this.formatGeoJsonResponse(response.features);
          this.constructGlobe();
        }
      });
  }
  ngAfterViewInit(): void {
    this.getStateCapitalsData();
  }

  private formatGeoJsonResponse(usaCapitalsGeoData) {
    this.filteredGlobeData = usaCapitalsGeoData
      .filter((location: GeoJson) => {
        return (
          location.geometry &&
          location.geometry.coordinates &&
          location.geometry.coordinates.length === 2
        );
      })
      .map((location: GeoJson) => {
        return {
          lat: location.geometry.coordinates[1],
          lng: location.geometry.coordinates[0],
          label:
            location.properties && location.properties.name
              ? location.properties.name
              : "",
        };
      });
  }

  constructGlobe() {
    const globe = Globe();
    globe(this.el.nativeElement)
      .globeImageUrl("assets/earth-dark.jpg")
      .pointsData(this.filteredGlobeData)
      .pointAltitude(0.0005)
      .pointColor((e) => {
        return "#007FFF";
      })
      .pointRadius(0.2)
      .pointResolution(2000)
      .onPointClick(function (point, event) {
        console.log("click", point, event, this);
      })
      .onPointHover(function (point, prevPoint) {
        console.log("hover", point, prevPoint, this);
      });
  }

  scrollToTop($event) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
}
