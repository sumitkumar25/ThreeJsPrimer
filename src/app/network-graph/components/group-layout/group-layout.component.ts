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
import { forkJoin } from "rxjs";
import { ThreeService } from "src/app/three/services/three.service";
import * as THREE from "three";
import { Matrix3, Matrix4, Vector3 } from "three";
import * as Stats from "../../../../../node_modules/stats.js/build/stats.min.js";
import { NetworkGraphRequestService } from "../../services/network-graph-request.service.js";
import { ThreeFactoryService } from "../../services/three-factory.service.js";
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
  nodeMesh: THREE.InstancedMesh<any, THREE.MeshNormalMaterial | any>;
  instancedNodeMesh: THREE.InstancedMesh<
    THREE.InstancedBufferGeometry | THREE.BufferGeometry,
    THREE.MeshBasicMaterial
  >;

  // Level 1 Response;
  groupsData: Object;

  // connections
  connectionsData;
  line: THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>;
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
    // this.setUpHelpers();
    this.threeCommon.camera.position.z = 10;
    this.threeCommon.camera.aspect =
      this.canvasEl.nativeElement.offsetWidth /
      this.canvasEl.nativeElement.offsetHeight;
    this.threeCommon.renderer.setPixelRatio(window.devicePixelRatio);
    this.threeCommon.scene.background = "black";
    this.threeCommon.camera.updateProjectionMatrix();
    this.threeCommon.controls.addEventListener(
      "change",
      this.renderView.bind(this)
    );
  }

  initRequests() {
    forkJoin(
      this.graphRequestService.getGroups(),
      this.graphRequestService.getNodeMesh(),
      this.graphRequestService.getTrafficConnections()
    ).subscribe(([groupData, mesh, arg]) => {
      this.connectionsData = arg["data"];
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
    this.groupsData = groupData;
    this.objectCount = this.groupsData["data"].length;
    this.sceneController();
  }

  initLayout() {
    // this.threeService.cleanScene(this.threeCommon);
    const radiusOffset = Math.floor(this.objectCount / 10);
    this.layoutGeometry = new THREE.CircleGeometry(
      10 + radiusOffset * radiusOffset,
      this.objectCount,
      0,
      2 * Math.PI
    );
    this.layoutMaterial = new THREE.MeshPhongMaterial({
      color: "white",
      transparent: true,
      opacity: 0.3,
    });
    this.layoutMesh = new THREE.Mesh(this.layoutGeometry, this.layoutMaterial);
    // this.layoutMesh.rotateX(-1);
    // this.layoutMesh.upda
    this.threeCommon.scene.add(this.layoutMesh);
  }

  setUpHelpers() {
    this.threeCommon.scene.add(new THREE.AxesHelper(50));
  }

  constructNodes() {
    this.instancedNodeMesh = new THREE.InstancedMesh(
      this.nodeMesh.geometry,
      this.nodeMesh.material,
      this.objectCount
    );
    for (var i = 0; i < this.objectCount; i++) {
      //using indexes as id.
      this.instancedNodeMesh.setMatrixAt(i, this.setPositionFromLayout(i));
    }
    this.threeCommon.scene.add(this.instancedNodeMesh);
  }

  setPositionFromLayout(i: number): THREE.Matrix4 {
    const matrix = new THREE.Matrix4();
    var position = new THREE.Vector3();
    var rotation = new THREE.Euler();
    var quaternion = new THREE.Quaternion();
    var scale = new THREE.Vector3();
    if (!this.layoutGeometry.vertices[i]) {
      console.log("no vertex for index", i + 1);
    }
    position = this.layoutGeometry.vertices[i + 1];
    quaternion.setFromEuler(rotation);
    scale.x = scale.y = scale.z = 1;
    matrix.compose(position, quaternion, scale);
    return matrix;
  }

  clickHandler($event) {}

  renderView() {
    this.threeCommon.renderer.render(
      this.threeCommon.scene,
      this.threeCommon.camera
    );
    this.renderCalls = this.threeCommon.renderer.info.render.calls;
  }

  objectCountChangeHandler($event) {
    this.threeService.cleanScene(this.threeCommon);
    this.objectCount = Number.parseInt($event.target.value, 10);
    this.sceneController();
  }

  private sceneController() {
    this.initLayout();
    this.constructNodes();
    this.constructConnection();
    this.renderView();
  }
  constructConnection() {
    this.line = this.line || this.threeFactory.getLine();
    let points = [];
    const nodeMap = this.groupsData["data"].reduce((acc, current, index) => {
      acc[current.id] = index;
      return acc;
    }, {});
    if(!this.connectionsData){
      return;
    }
    this.connectionsData.forEach((connection) => {
      let sourceIndex = nodeMap[connection.from];
      let destinationIndex = nodeMap[connection.to];
      let sourceMatrix = new Matrix4();
      let destinationMatrix = new Matrix4();
      this.instancedNodeMesh.getMatrixAt(sourceIndex, sourceMatrix);
      this.instancedNodeMesh.getMatrixAt(destinationIndex, destinationMatrix);
      points.push(
        new THREE.Vector3().setFromMatrixPosition(sourceMatrix),
        new THREE.Vector3().setFromMatrixPosition(destinationMatrix),
      );
    });
    //  this.line.geometry.setFromPoints()
    // console.log(...this.layoutMesh.geometry.vertices.slice(1))
    this.line.geometry.setFromPoints(points);
    this.threeCommon.scene.add(this.line);
  }

  setUpStats() {
    this.stats = new Stats();
    this.stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
    this.statsEl.nativeElement.appendChild(this.stats.dom);
    this.stats.update();
  }

  // updateStats() {
  //   window.requestAnimationFrame(this.updateStats.bind(this));
  // }
}
