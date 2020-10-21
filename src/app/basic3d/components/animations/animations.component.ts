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
    this.threeCommon.camera.position.z = 10;
    this.threeCommon.controls.addEventListener(
      "change",
      this.renderView.bind(this)
    );
    this.viewController();
  }

  viewController() {
    // this.configureGeometry();
    // this.configureMesh();
    this.threeService.configureHelpers(this.threeCommon.scene);
    this.configureConnections();
    // this.configureDirectionArrows();
    this.renderView();
  }

  configureConnections() {
    let sourceVector = new THREE.Vector3(0, 0, 0);
    let destinationVector = new THREE.Vector3(5, 5, 5);
    var HALF_PI = Math.PI * 0.5;
    var distance = sourceVector.distanceTo(destinationVector);
    var position = destinationVector.clone().add(sourceVector).divideScalar(2);
    var material = new THREE.MeshLambertMaterial({
      color: 0x277cb2,
      wireframe: true,
    });
    var cylinder = new THREE.CylinderGeometry(
      0.01,
      0.01,
      distance,
      8,
      1,
      false
    );

    const coneGeometry = new THREE.ConeBufferGeometry(1 * 0.25);
    const conematerial = new THREE.MeshBasicMaterial({ color: "red" });
    // Correct orientation
    coneGeometry.translate(0, 1 / 2, 0);
    coneGeometry.rotateX(Math.PI / 2);
    const arrowMesh = new THREE.Mesh(coneGeometry, conematerial);
    this.threeCommon.scene.add(arrowMesh);

    var orientation = new THREE.Matrix4(); //a new orientation matrix to offset pivot
    var offsetRotation = new THREE.Matrix4(); //a matrix to fix pivot rotation
    var offsetPosition = new THREE.Matrix4(); //a matrix to fix pivot position
    orientation.lookAt(
      sourceVector,
      destinationVector,
      new THREE.Vector3(0, 1, 0)
    ); //look at destination
    offsetRotation.makeRotationX(HALF_PI); //rotate 90 degs on X
    orientation.multiply(offsetRotation); //combine orientation with rotation transformations
    cylinder.applyMatrix4(orientation);
    var mesh = new THREE.Mesh(cylinder, material);
    mesh.position.set(position.x, position.y, position.z);
    this.threeCommon.scene.add(mesh);
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
