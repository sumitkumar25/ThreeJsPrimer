/**
 * TODO: check if other possibilities are there for loaded mesh. current 'Group'.
 * TODO: Groups Texture.
 */
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { throttle } from "lodash";
import { forkJoin } from "rxjs";
import { ThreeService } from "src/app/three/services/three.service";
import * as THREE from "three";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry";
import * as Stats from "../../../../../node_modules/stats.js/build/stats.min.js";
import { NetworkGraphRequestService } from "../../services/network-graph-request.service.js";
import { ThreeFactoryService } from "../../services/three-factory.service.js";
import { LineMaterial } from "./../../../../../node_modules/three/examples/jsm/lines/LineMaterial.js";
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

  // performance class memebers.
  renderCalls: any;
  objectCount: number = 3;
  previousObjectCount = 0;
  layoutMesh: THREE.Mesh<THREE.Geometry, THREE.MeshBasicMaterial>;
  nodeMesh: THREE.InstancedMesh<any, THREE.MeshNormalMaterial | any>;
  instancedNodeMesh: THREE.InstancedMesh<
    THREE.InstancedBufferGeometry | THREE.BufferGeometry,
    THREE.MeshBasicMaterial
  >;

  // Level 1 Response;
  groupsData: Object;

  // connections
  connectionsData;

  nodePositionCollection: any = [];
  connectionStep: number = 1;
  connectionCount: number | string = "not specified";
  enableConnections = false;
  noConnectionMesh = false;
  mouse: any;
  raycaster = new THREE.Raycaster();
  line: LineSegments2;

  traffic = {};

  directionInstanceMesh;
  trafficColor = 0x378ef0;
  constructor(
    private threeService: ThreeService,
    private graphRequestService: NetworkGraphRequestService,
    private threeFactory: ThreeFactoryService
  ) {}

  ngOnInit() {
    this.initRequests();
  }

  ngAfterViewInit(): void {
    this.threeCommon = this.threeService.getThreeCommon(
      this.canvasEl.nativeElement,
      true
    );
    this.setUpStats();
    this.threeCommon.camera.position.z = 10;
    this.threeCommon.camera.aspect =
      this.canvasEl.nativeElement.offsetWidth /
      this.canvasEl.nativeElement.offsetHeight;
    this.threeCommon.renderer.setPixelRatio(window.devicePixelRatio);
    this.threeCommon.scene.background = "black";
    this.threeCommon.camera.updateProjectionMatrix();
    this.threeCommon.controls.addEventListener(
      "change",
      throttle(this.renderView.bind(this), 50)
    );
  }

  initRequests() {
    forkJoin(
      this.graphRequestService.getGroups(),
      this.graphRequestService.getNodeMesh()
    ).subscribe(([groupData, mesh]) => {
      this.nodeMeshResponseHandler(mesh);
      this.groupsResponseHandler(groupData);
    });
  }

  nodeMeshResponseHandler(mesh) {
    if (mesh.type && mesh.type === "Group") {
      this.nodeMesh = mesh.children[0];
    } else {
      this.nodeMesh = mesh;
    }
  }

  groupsResponseHandler(groupData: Object) {
    this.sceneController();
  }

  constructNodes() {
    let newMesh = !this.instancedNodeMesh;
    if (newMesh) {
      this.instancedNodeMesh = new THREE.InstancedMesh(
        this.nodeMesh.geometry,
        this.nodeMesh.material,
        10000
      );
    } else {
      this.instancedNodeMesh.instanceMatrix.needsUpdate = true;
    }
    for (let i = 0; i < this.objectCount; i++) {
      this.instancedNodeMesh.setMatrixAt(i, this.setPositionFromLayout(i));
    }
    if (this.previousObjectCount > this.objectCount) {
      for (let i = this.objectCount; i < this.previousObjectCount; i++) {
        //using indexes as id.
        let mat = new THREE.Matrix4();
        this.instancedNodeMesh.setMatrixAt(i, mat);
      }
    }
    this.threeCommon.scene.add(this.instancedNodeMesh);
  }

  setPositionFromTraffic(trafficLink: any): any {
    const source = trafficLink.source.position;
    const target = trafficLink.target.position;
    const axis = new THREE.Vector3(0, 1, 0);
    const matrix = new THREE.Matrix4();
    const quaternion = new THREE.Quaternion();
    const position = new THREE.Vector3(
      (source.x + target.x) / 2,
      (source.y + target.y) / 2,
      (source.z + target.z) / 2
    );
    const scale = new THREE.Vector3(1, 1, 1);
    quaternion.setFromUnitVectors(axis, target.sub(source).normalize());
    matrix.compose(position, quaternion, scale);
    return matrix;
  }

  setPositionFromLayout(i: number): THREE.Matrix4 {
    const matrix = new THREE.Matrix4();
    var rotation = new THREE.Euler();
    var quaternion = new THREE.Quaternion();
    var position = new THREE.Vector3();
    var offset = i * 3;
    position.x = (offset * Math.sin(i)) / Math.sqrt(i + 1);
    position.y = (offset * Math.cos(i)) / Math.sqrt(i + 1);
    position.z = i / 10;
    this.nodePositionCollection.push({ position, nodeIndex: i });
    var scale = new THREE.Vector3();
    quaternion.setFromEuler(rotation);
    scale.x = scale.y = scale.z = 1;
    matrix.compose(position, quaternion, scale);
    return matrix;
  }

  private sceneController() {
    this.constructNodes();
    if (this.enableConnections) {
      this.configureLineSegmentConnections();
      this.configureDirectionalArrows();
    }
    this.renderView();
  }
  configureDirectionalArrows() {
    let newMesh = !this.directionInstanceMesh;
    if (newMesh) {
      const geometry = new THREE.ConeBufferGeometry(0.3, 0.8);
      const material = new THREE.MeshBasicMaterial({
        color: this.trafficColor,
      });
      this.directionInstanceMesh = new THREE.InstancedMesh(
        geometry,
        material,
        10000
      );
    } else {
      this.directionInstanceMesh.instanceMatrix.needsUpdate = true;
    }
    Object.keys(this.traffic).forEach((key, index) => {
      this.directionInstanceMesh.setMatrixAt(
        index,
        this.setPositionFromTraffic(this.traffic[key])
      );
    });
    this.threeCommon.scene.add(this.directionInstanceMesh);

    //     const geometry = new THREE.ConeGeometry(0.2, 0.6);
    //  const material = new THREE.MeshPhongMaterial({
    //   color: 0x2984cf,
    //  emissive: 0x2984cf
    //  });
    //  const cone = new THREE.Mesh(geometry, material);
    //  cone.position.y = target.distanceTo(source) / 2;
    //  cone.scale.set(0.5, 0.5, 0.5);
    //  target.sub(source).normalize();
    //  this.arrowHelper = new THREE.ArrowHelper(target, source, 0);
    //  this.arrowHelper.cone.copy(cone);
    //  this.threeCommon.scene.add(this.arrowHelper);
  }

  configureLineSegmentConnections() {
    this.connectionCount = 0;
    this.traffic = {};
    const lineGeometry = new LineSegmentsGeometry();
    const positions = [];
    const colors = [];
    const matLine = new LineMaterial({
      color: this.trafficColor,
      vertexColors: true,
      dashed: false,
      linewidth: 3,
    });
    matLine.resolution.set(
      this.canvasEl.nativeElement.offsetWidth,
      this.canvasEl.nativeElement.offsetHeight
    );
    for (let index = 1; index < this.nodePositionCollection.length; index++) {
      const source = this.nodePositionCollection[0];
      const target = this.nodePositionCollection[index];
      this.traffic[index - 1] = { source, target };
      positions.push(
        source.position.x,
        source.position.y,
        source.position.z,
        target.position.x,
        target.position.y,
        target.position.z
      );
      const colorRGB = new THREE.Color(this.trafficColor).convertLinearToSRGB();
      colors.push(
        colorRGB.r,
        colorRGB.g,
        colorRGB.b,
        colorRGB.r,
        colorRGB.g,
        colorRGB.b
      );
      this.connectionCount++;
    }
    console.log();
    lineGeometry.setPositions(new Float32Array(positions));
    lineGeometry.setColors(colors);
    this.line = new LineSegments2(lineGeometry, matLine);
    this.line.userData = { __graphObj: "connection" };
    this.threeCommon.scene.add(this.line);
  }

  private lineClickHandler(raycastObj) {
    const _connection = this.traffic[raycastObj.faceIndex];
    console.log("faceIndex", raycastObj.faceIndex, _connection);
  }

  setUpStats() {
    this.stats = new Stats();
    this.stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
    this.statsEl.nativeElement.appendChild(this.stats.dom);
    this.updateStats();
  }
  updateStats() {
    this.stats.update();
    window.requestAnimationFrame(this.updateStats.bind(this));
  }
  // event handlers
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
    this.renderView();
  }

  objectCountChangeHandler($event) {
    this.threeService.cleanScene(this.threeCommon);
    this.nodePositionCollection = [];
    this.previousObjectCount = this.objectCount;
    this.objectCount = Number.parseInt($event.target.value, 10);
    this.connectionStep = this.objectCount;
    this.sceneController();
  }

  connectionStepHandler($event) {
    this.threeService.cleanScene(this.threeCommon);
    this.nodePositionCollection = [];
    this.connectionStep = Number.parseInt($event.target.value, 10);
    this.sceneController();
  }

  connectionStateHandler($event) {
    this.threeService.cleanScene(this.threeCommon);
    this.nodePositionCollection = [];
    this.enableConnections = $event.target.checked;
    this.sceneController();
  }

  meshTypeStateHandler($event) {
    this.threeService.cleanScene(this.threeCommon);
    this.nodePositionCollection = [];
    this.noConnectionMesh = $event.target.checked;
    this.sceneController();
  }

  renderView() {
    this.configureRaycast();
    this.threeCommon.renderer.render(
      this.threeCommon.scene,
      this.threeCommon.camera
    );
    this.renderCalls = this.threeCommon.renderer.info.render.calls;
  }

  private configureRaycast() {
    if (this.mouse) {
      this.raycaster.setFromCamera(this.mouse, this.threeCommon.camera);
      // const intersects = this.raycaster.intersectObjects(
      //   this.threeCommon.scene.children
      // );
      // console.log(intersects);
      const lineRaycast = this.raycaster.intersectObjects([this.line]);
      if (
        lineRaycast &&
        lineRaycast[0] &&
        lineRaycast[0].object &&
        lineRaycast[0].object.userData &&
        lineRaycast[0].object.userData.__graphObj === "connection"
      ) {
        this.lineClickHandler(lineRaycast[0]);
      }
    }
  }
}
