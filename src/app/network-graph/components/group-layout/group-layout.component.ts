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
import { MeshLine, MeshLineMaterial } from "three.meshline";
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

  //events
  meshline: any;
  connectionPoints: any = [];
  connectionStep: number = 1;
  connectionCount: number;
  enableConnections = false;
  noConnectionMesh = false;
  mouse: any;
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
    this.threeCommon.scene.add(new THREE.AxesHelper(100));
    this.threeCommon.controls.addEventListener(
      "change",
      throttle(this.renderView.bind(this), 50)
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
      //using indexes as id.
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

  setPositionFromLayout(i: number): THREE.Matrix4 {
    const matrix = new THREE.Matrix4();
    var rotation = new THREE.Euler();
    var quaternion = new THREE.Quaternion();
    var position = new THREE.Vector3();
    var offset = i * 3;
    position.x = (offset * Math.sin(i)) / Math.sqrt(i + 1);
    position.y = (offset * Math.cos(i)) / Math.sqrt(i + 1);
    position.z = i / 10;
    this.connectionPoints.push(position);
    var scale = new THREE.Vector3();
    quaternion.setFromEuler(rotation);
    scale.x = scale.y = scale.z = 1;
    matrix.compose(position, quaternion, scale);
    return matrix;
  }

  renderView() {
    this.threeCommon.renderer.render(
      this.threeCommon.scene,
      this.threeCommon.camera
    );
    this.renderCalls = this.threeCommon.renderer.info.render.calls;
  }

  private sceneController() {
    this.constructNodes();
    if (this.enableConnections) {
      this.constructMeshlineConnections();
    }
    this.renderView();
  }

  constructMeshlineConnections() {
    var connectionData = [];
    for (let index = 0; index < this.connectionPoints.length; index++) {
      for (
        let _index = this.connectionPoints.length - 1;
        _index >= 0;
        _index = _index - this.connectionStep
      ) {
        connectionData.push(
          this.connectionPoints[index],
          this.connectionPoints[_index]
        );
      }
    }

    this.createConnectionMesh(connectionData);
  }

  private createConnectionMesh(connectionData: any[]) {
    this.connectionCount = connectionData.length / 2;
    if (this.noConnectionMesh) {
      const material = new MeshLineMaterial({
        color: new THREE.Color("rgb(39,124,178)"),
        opacity: 1,
        lineWidth: 0.05,
        depthTest: true,
        transparent: false,
      });
      let meshCount = 0;
      this.connectionsData.forEach((connection, i) => {
        if (connectionData[i + 1] && i%2 === 0) {
          const meshline = new MeshLine();
          meshline.setPoints([connectionData[i], connectionData[i + 1]]);
          var mesh = new THREE.Mesh(meshline, material);
          mesh.frustumCulled = false;
          meshCount++;
          this.threeCommon.scene.add(mesh);
        }
      });
      console.log(meshCount);
      
    } else {
      this.meshline = new MeshLine();
      this.meshline.setPoints(connectionData);
      const material = new MeshLineMaterial({
        color: new THREE.Color("rgb(39,124,178)"),
        opacity: 1,
        lineWidth: 0.05,
        depthTest: true,
        transparent: false,
      });
      var mesh = new THREE.Mesh(this.meshline, material);
      mesh.frustumCulled = false;
      mesh.renderOrder = 10;
      this.threeCommon.scene.add(mesh);
    }
  }

  constructCylindricalConnection(sourceVector, destinationVector) {
    // this.meshline = new MeshLine();
    // this.meshline.setPoints([sourceVector, destinationVector]);
    // var HALF_PI = Math.PI * 0.5;
    // var distance = sourceVector.distanceTo(destinationVector);
    // var position = destinationVector.clone().add(sourceVector).divideScalar(2);
    // var material = new THREE.MeshLambertMaterial({ color: 0x277cb2 });
    // var cylinder = new THREE.CylinderGeometry(.1, .1, distance, 10, 10, false);
    // var orientation = new THREE.Matrix4(); //a new orientation matrix to offset pivot
    // var offsetRotation = new THREE.Matrix4(); //a matrix to fix pivot rotation
    // var offsetPosition = new THREE.Matrix4(); //a matrix to fix pivot position
    // orientation.lookAt(
    //   sourceVector,
    //   destinationVector,
    //   new THREE.Vector3(0, 1, 0)
    // ); //look at destination
    // offsetRotation.makeRotationX(HALF_PI); //rotate 90 degs on X
    // orientation.multiply(offsetRotation); //combine orientation with rotation transformations
    // cylinder.applyMatrix4(orientation);
    // var mesh = new THREE.Mesh(cylinder, material);
    // mesh.position.set(position.x, position.y, position.z);
    // return mesh;
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
  }

  objectCountChangeHandler($event) {
    this.threeService.cleanScene(this.threeCommon);
    this.connectionPoints = [];
    this.previousObjectCount = this.objectCount;
    this.objectCount = Number.parseInt($event.target.value, 10);
    this.connectionStep = this.objectCount;
    this.sceneController();
  }

  connectionStepHandler($event) {
    this.threeService.cleanScene(this.threeCommon);
    this.connectionPoints = [];
    this.connectionStep = Number.parseInt($event.target.value, 10);
    this.sceneController();
  }

  connectionStateHandler($event) {
    this.threeService.cleanScene(this.threeCommon);
    this.connectionPoints = [];
    this.enableConnections = $event.target.checked;
    console.log(this.enableConnections);
    
    this.sceneController();
  }

  meshTypeStateHandler($event) {
    this.threeService.cleanScene(this.threeCommon);
    this.connectionPoints = [];
    this.noConnectionMesh = $event.target.checked;
    this.sceneController();
  }
}
