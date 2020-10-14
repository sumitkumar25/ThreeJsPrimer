import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ThreeService } from "src/app/three/services/three.service";
import * as THREE from "three";
import { Mesh } from "three";

@Component({
  selector: "app-animations",
  templateUrl: "./animations.component.html",
  styleUrls: ["./animations.component.scss"],
})
export class AnimationsComponent implements OnInit, AfterViewInit {
  @ViewChild("canvasEl", { static: false, read: ElementRef })
  canvasEl: ElementRef;

  threeCommon: { scene: any; renderer: any; camera: any; controls: any };

  geometry: THREE.Geometry;
  constructor(private threeService: ThreeService) {}
  objectCount = 3;
  ngOnInit() {}
  ngAfterViewInit() {
    this.threeCommon = this.threeService.getThreeCommon(
      this.canvasEl.nativeElement
    );
    this.threeCommon.camera.position.z = 2;
    this.viewController();
  }

  viewController() {
    this.configureGeometry();
    this.configureMesh();
    this.renderView();
  }

  configureGeometry() {
    this.geometry = new THREE.CircleGeometry(this.objectCount);
  }

  configureMesh() {
    this.threeCommon.scene.add(
      new Mesh(
        this.geometry,
        new THREE.MeshBasicMaterial({ color: "red", side: THREE.DoubleSide })
      )
    );
  }
  objectCountChangeHandler($event) {
    this.objectCount = Number.parseInt($event.target.value, 10);
  }
  renderView() {
    this.threeCommon.renderer.render(
      this.threeCommon.scene,
      this.threeCommon.camera
    );
  }
}
