import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ThreeService } from "src/app/three/services/three.service";
import * as THREE from "three";
import { ConeGeometry, IcosahedronGeometry, SphereGeometry } from "three";
import * as Stats from "../../../../../node_modules/stats.js/build/stats.min.js";
import { OBJLoader } from "./../../../../../node_modules/three/examples/jsm/loaders/OBJLoader";

@Component({
  selector: "app-instanced-layout",
  templateUrl: "./instanced-layout.component.html",
  styleUrls: ["./instanced-layout.component.scss"],
})
export class InstancedLayoutComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("canvasEl", { static: false, read: ElementRef })
  canvasEl: ElementRef;

  threeCommon: { scene: any; renderer: any; camera: any; controls: any };

  instancedMesh: THREE.InstancedMesh<
    THREE.BufferGeometry | THREE.InstancedBufferGeometry,
    THREE.MeshNormalMaterial
  >;
  object: any;
  mesh: THREE.InstancedMesh<any, THREE.MeshNormalMaterial>;
  objectCount: number = 3;
  geometry: any;
  vertices: any = [];
  layoutGeometry:
    | THREE.ConeGeometry
    | THREE.IcosahedronGeometry
    | THREE.SphereGeometry;
  renderCalls: any;

  mouse;
  raycaster = new THREE.Raycaster();
  stats: any;

  constructor(private threeService: ThreeService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.threeCommon = this.threeService.getThreeCommon(
      this.canvasEl.nativeElement
    );
    this.setUpStats();
    this.threeCommon.camera.position.z = 25;
    this.constructLayout();
    this.loadGeometry();
  }
  constructLayout() {
    if (this.objectCount <= 6) {
      this.layoutGeometry = new ConeGeometry(10, 10, this.objectCount - 1);
    } else if (this.objectCount <= 12) {
      this.layoutGeometry = new IcosahedronGeometry(10, 0);
    } else {
      this.layoutGeometry = new SphereGeometry(15, 12, 10);
    }
    const material = new THREE.MeshBasicMaterial({
      color: "red",
      wireframe: true,
    });
    const mesh = new THREE.Mesh(this.layoutGeometry, material);
    this.threeCommon.scene.add(mesh);
  }

  loadGeometry() {
    const objLoader = new OBJLoader();
    objLoader
      .loadAsync("assets/node-spheres/sphere.obj")
      .then((res) => {
        this.object = res;
        this.geometry = res.children[0].geometry;
        this.sceneController();
      })
      .catch((e) => console.log(e));
  }
  sceneController() {
    const material = new THREE.MeshNormalMaterial();
    this.geometry.computeVertexNormals();
    this.mesh = new THREE.InstancedMesh(
      this.geometry,
      material,
      this.objectCount
    );
    for (var i = 0; i < this.objectCount; i++) {
      this.mesh.setMatrixAt(i, this.setPositionFromLayout(i));
    }
    this.threeCommon.scene.add(this.mesh);
    this.renderView();
  }
  setPositionFromLayout(i: number): THREE.Matrix4 {
    const matrix = new THREE.Matrix4();
    var position = new THREE.Vector3();
    var rotation = new THREE.Euler();
    var quaternion = new THREE.Quaternion();
    var scale = new THREE.Vector3();
    if (!this.layoutGeometry.vertices[i]) {
      console.log("no vertex for index", i);
    }
    let step = Math.floor(
      this.layoutGeometry.vertices.length / this.objectCount
    );
    position = this.layoutGeometry.vertices[i];
    // rotation.x = Math.random() * 2 * Math.PI;
    // rotation.y = Math.random() * 2 * Math.PI;
    // rotation.z = Math.random() * 2 * Math.PI;

    quaternion.setFromEuler(rotation);

    scale.x = scale.y = scale.z = 1;

    matrix.compose(position, quaternion, scale);
    return matrix;
  }

  randomizeMatrix(matrix: THREE.Matrix4, i) {
    var position = new THREE.Vector3();
    var rotation = new THREE.Euler();
    var quaternion = new THREE.Quaternion();
    var scale = new THREE.Vector3();

    position.x = Math.random() * 40 - 20;
    position.y = Math.random() * 40 - 20;
    position.z = Math.random() * 40 - 20;

    rotation.x = Math.random() * 2 * Math.PI;
    rotation.y = Math.random() * 2 * Math.PI;
    rotation.z = Math.random() * 2 * Math.PI;

    quaternion.setFromEuler(rotation);

    scale.x = scale.y = scale.z = 1;

    matrix.compose(position, quaternion, scale);
  }

  destroyMesh() {
    var meshes = [];

    this.threeCommon.scene.traverse(function (object) {
      if (object.isMesh) meshes.push(object);
    });

    for (var i = 0; i < meshes.length; i++) {
      var mesh = meshes[i];
      mesh.material.dispose();
      mesh.geometry.dispose();

      this.threeCommon.scene.remove(mesh);
    }
  }

  objectCountChangeHandler($event) {
    this.objectCount = Number.parseInt($event.target.value, 10);
    this.destroyMesh();
    this.constructLayout();
    this.sceneController();
  }

  clickHandler(event) {
    event.preventDefault();
    let canvasBounds = this.threeCommon.renderer.context.canvas.getBoundingClientRect();
    this.mouse = this.mouse || new THREE.Vector3();
    this.mouse.x =
      ((event.clientX - canvasBounds.left) /
        (canvasBounds.right - canvasBounds.left)) *
        2 -
      1;
    this.mouse.y =
      -(
        (event.clientY - canvasBounds.top) /
        (canvasBounds.bottom - canvasBounds.top)
      ) *
        2 +
      1;
  }

  setUpStats() {
    this.stats = new Stats();
    this.stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom);
  }

  renderView() {
    if (this.mouse) {
      this.raycaster.setFromCamera(this.mouse, this.threeCommon.camera);
    }

    var intersection = this.raycaster.intersectObject(this.mesh);
    if (intersection.length > 0) {
      var rotationMatrix = new THREE.Matrix4().makeRotationY(0.3);
      var instanceMatrix = new THREE.Matrix4();
      var instanceId = intersection[0].instanceId;
      const matrix = new THREE.Matrix4();
      this.mesh.getMatrixAt(intersection[0].instanceId, instanceMatrix);
      matrix.multiplyMatrices(instanceMatrix, rotationMatrix);

      this.mesh.setMatrixAt(intersection[0].instanceId, matrix);
      this.mesh.instanceMatrix.needsUpdate = true;
    }
    this.threeCommon.renderer.render(
      this.threeCommon.scene,
      this.threeCommon.camera
    );
    this.threeCommon.controls.update();
    this.stats.update();
    this.renderCalls = this.threeService.getRendererCallCount(
      this.threeCommon.renderer
    );
    window.requestAnimationFrame(this.renderView.bind(this));
  }

  ngOnDestroy(): void {
    this.threeService.cleanScene(this.threeCommon);
  }
}
