import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ThreeService } from "src/app/three/services/three.service";
import * as THREE from "three";
import { Mesh, Vector3 } from "three";

@Component({
  selector: "app-geometry",
  templateUrl: "./geometry.component.html",
  styleUrls: ["./geometry.component.scss"],
})
export class GeometryComponent implements OnInit, AfterViewInit {
  @ViewChild("canvasEl", { static: false, read: ElementRef })
  canvasEl: ElementRef;

  threeCommon: { scene: any; renderer: any; camera: any; controls: any };

  geometry: THREE.Geometry;

  constructor(private threeService: ThreeService) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.threeCommon = this.threeService.getThreeCommon(
      this.canvasEl.nativeElement
    );
    this.viewController();
  }
  viewController() {
    this.configureGeometry();
    this.configureMesh();
    this.renderView();
  }

  configureGeometry() {
    this.geometry = new THREE.Geometry();
    this.geometry.vertices.push(new THREE.Vector3(1, 0, 0));
    this.geometry.vertices.push(new THREE.Vector3(0, 1, 0));
    this.geometry.vertices.push(new THREE.Vector3(0, 0, 1));

    this.geometry.faces.push(new THREE.Face3(0, 1, 2));
  }

  configureMesh() {
    this.threeCommon.scene.add(
      new Mesh(
        this.geometry,
        new THREE.MeshBasicMaterial({ color: "red", side: THREE.DoubleSide })
      )
    );
  }

  renderView() {
    this.threeCommon.renderer.render(
      this.threeCommon.scene,
      this.threeCommon.camera
    );
    window.requestAnimationFrame(this.renderView.bind(this));
  }
}
