import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ThreeService } from "src/app/three/services/three.service";
import * as THREE from "three";
import * as Stats from "../../../../../node_modules/stats.js/build/stats.min.js";
import { OBJLoader } from "./../../../../../node_modules/three/examples/jsm/loaders/OBJLoader";

@Component({
  selector: "app-group-layout",
  templateUrl: "./group-layout.component.html",
  styleUrls: ["./group-layout.component.scss"],
})
export class GroupLayoutComponent implements OnInit, AfterViewInit {
  threeCommon: { scene: any; renderer: any; camera: any; controls: any };

  @ViewChild("canvasEl", { static: false, read: ElementRef })
  canvasEl: ElementRef;
  @ViewChild("stats", { static: false, read: ElementRef }) statsEl: ElementRef;
  stats: any;

  // layout class members
  layoutGeometry: THREE.CircleGeometry;
  layoutMaterial: THREE.MeshBasicMaterial;

  // performance class memebers.
  renderCalls: any;
  objectCount: number = 3;
  layoutMesh: THREE.Mesh<THREE.CircleGeometry, THREE.MeshBasicMaterial>;
    nodeGeometry: THREE.InstancedBufferGeometry | THREE.BufferGeometry;
    nodeMesh: THREE.InstancedMesh<any, THREE.MeshNormalMaterial>;

  constructor(private threeService: ThreeService) {}

  ngAfterViewInit(): void {
    this.threeCommon = this.threeService.getThreeCommon(
      this.canvasEl.nativeElement
    );
    this.setUpStats();
    this.setUpHelpers();
    this.threeCommon.camera.position.z = 20;
    this.threeCommon.camera.aspect =
      this.canvasEl.nativeElement.offsetWidth /
      this.canvasEl.nativeElement.offsetHeight;
    this.threeCommon.renderer.setPixelRatio(window.devicePixelRatio);
    // this.threeCommon.scene.background = 'black';
    this.threeCommon.camera.updateProjectionMatrix();
  }

  setUpHelpers() {
    this.threeCommon.scene.add(new THREE.AxesHelper(50));
  }

  constructNodes() {
    const material = new THREE.MeshNormalMaterial();
    const matrix = new THREE.Matrix4();
    this.nodeMesh = new THREE.InstancedMesh(
      this.nodeGeometry,
      material,
      this.objectCount
    );
    for (var i = 0; i < this.objectCount; i++) {
      this.nodeMesh.setMatrixAt(i, this.setPositionFromLayout(i));
    }
    this.threeCommon.scene.add(this.nodeMesh);
  }

  setPositionFromLayout(i: number): THREE.Matrix4 {
    const matrix = new THREE.Matrix4();
    var position = new THREE.Vector3();
    var rotation = new THREE.Euler();
    var quaternion = new THREE.Quaternion();
    var scale = new THREE.Vector3();
    if (!this.layoutGeometry.vertices[i]) {
      console.log("no vertex for index", i+1);
    }
    position = this.layoutGeometry.vertices[i+1];
    // rotation.x = Math.random() * 2 * Math.PI;
    // rotation.y = Math.random() * 2 * Math.PI;
    // rotation.z = Math.random() * 2 * Math.PI;

    quaternion.setFromEuler(rotation);

    scale.x = scale.y = scale.z = 1;

    matrix.compose(position, quaternion, scale);
    return matrix;
  }

  initLayout() {
    this.threeService.cleanScene(this.threeCommon);
    this.layoutGeometry = new THREE.CircleGeometry(
      10,
      this.objectCount,
      0,
      2 * Math.PI
    );
    this.layoutMaterial = new THREE.MeshBasicMaterial({
      color: "black",
      wireframe: true,
    });
    this.layoutMesh = new THREE.Mesh(this.layoutGeometry, this.layoutMaterial);
    // this.layoutMesh.rotateX(-1);
    // this.layoutMesh.upda
    this.threeCommon.scene.add(this.layoutMesh);
  }

  setUpStats() {
    this.stats = new Stats();
    this.stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
    this.statsEl.nativeElement.appendChild(this.stats.dom);
    this.stats.domElement.style.position = "absolute";
    this.stats.domElement.style.left = "0px";
    this.stats.domElement.style.top = "0px";
  }

  clickHandler($event) {

  }
  private renderView() {
    // if (this.mouse) {
    //   this.raycaster.setFromCamera(this.mouse, this.threeCommon.camera);
    // }

    // var intersection = this.raycaster.intersectObject(this.mesh);
    // if (intersection.length > 0) {
    //   var rotationMatrix = new THREE.Matrix4().makeRotationY(0.2);
    //   var instanceMatrix = new THREE.Matrix4();
    //   var instanceId = intersection[0].instanceId;
    //   const matrix = new THREE.Matrix4();
    //   this.mesh.getMatrixAt(intersection[0].instanceId, instanceMatrix);
    //   matrix.multiplyMatrices(instanceMatrix, rotationMatrix);

    //   this.mesh.setMatrixAt(intersection[0].instanceId, matrix);
    //   this.mesh.instanceMatrix.needsUpdate = true;
    // }
    this.threeCommon.renderer.render(
      this.threeCommon.scene,
      this.threeCommon.camera
    );
    this.threeCommon.controls.update();
    this.stats.update();
    window.requestAnimationFrame(this.renderView.bind(this));
    this.renderCalls = this.threeCommon.renderer.info.render.calls;
  }

  objectCountChangeHandler($event) {
    this.objectCount = Number.parseInt($event.target.value, 10);
    this.sceneController();
  }

    private sceneController() {
        this.initLayout();
        this.constructNodes();
        this.renderView();
    }

  ngOnInit() {
    this.loadGeometry();
  }

  loadGeometry() {
    const loader = new THREE.BufferGeometryLoader();
    loader.load("assets/custom/geometry2.json", (geometry) => {
      this.nodeGeometry = geometry;

    });
    const objLoader = new OBJLoader();
    objLoader
      .loadAsync("assets/node-spheres/sphere.obj")
      .then((res) => {
        this.nodeGeometry = res.children[0].geometry;
        this.sceneController();
      })
      .catch((e) => console.log(e));
  }
}
