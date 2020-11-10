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
import {
  BufferAttribute,
  BufferGeometry,
  Geometry,
  Line3,
  LineSegments,
} from "three";
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from "three.meshline";
import * as Stats from "../../../../../node_modules/stats.js/build/stats.min.js";
import { NetworkGraphRequestService } from "../../services/network-graph-request.service.js";
import { ThreeFactoryService } from "../../services/three-factory.service.js";
import { LineGeometry } from "./../../../../../node_modules/three/examples/jsm/lines/LineGeometry.js";
import { LineMaterial } from "./../../../../../node_modules/three/examples/jsm/lines/LineMaterial.js";
import { Line2 } from "./../../../../../node_modules/three/examples/jsm/lines/Line2";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2";
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
  nodePositionCollection: any = [];
  connectionStep: number = 1;
  connectionCount: number | string = "not specified";
  enableConnections = false;
  noConnectionMesh = false;
  mouse: any;
  raycaster = new THREE.Raycaster();
  meshConnections: THREE.Mesh<any, any>;
  connectionInstancedMesh: THREE.InstancedMesh<any, any>;
  line: Line2 | LineSegments | LineSegments2;

  traffic = {};
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
    // this.threeCommon.scene.add(new THREE.AxesHelper(100));
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
    // this.groupsData not used.
    // this.groupsData = groupData;
    // this.objectCount = this.groupsData["data"].length;
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
      this.configureVertextSegmentsConnections();
      // this.configureIndividualConnections();
      // this.configureVertextIdentificationConnections();
      // this.configureVertexLineSegmentsConnections();
      // this.testSegments();
    }
    this.renderView();
  }

  // configureVertexLineSegmentsConnections() {
  //   this.connectionCount = 0;
  //   const lineGeometry = new BufferGeometry();
  //   const color = new THREE.Color(0x277cb2);
  //   const positions = [];
  //   const colors = [];

  //   for (
  //     let index = 0;
  //     index < this.nodePositionCollection.length - 1;
  //     index += 2
  //   ) {
  //     this.connectionCount++;
  //     const source = this.nodePositionCollection[index];
  //     const target = this.nodePositionCollection[index + 1];
  //     positions.push(source.position, target);
  //     colors.push(0x277cb2, 0x277cb2);
  //   }

  //   lineGeometry.setFromPoints(positions);
  //   lineGeometry.setAttribute(
  //     "color",
  //     new THREE.BufferAttribute(new Float32Array(colors), 1)
  //   );
  //   var mat = new THREE.LineBasicMaterial({
  //     color: 0x277cb2,
  //     vertexColors: true,
  //     linewidth: 5,
  //   });
  //   this.line = new THREE.LineSegments(lineGeometry, mat);
  //   this.line.userData = { __graphObj: "connection" };
  //   this.threeCommon.scene.add(this.line);
  // }
  configureVertextSegmentsConnections() {
    this.connectionCount = 0;
    this.traffic = {};
    const lineGeometry = new LineGeometry();
    const color = new THREE.Color(0x277cb2);
    const positions = [];
    const colors = [];
    const matLine = new LineMaterial({
      color: 0x277cb2,
      vertexColors: true,
      dashed: false,
      linewidth: 5,
    });
    matLine.resolution.set(
      this.canvasEl.nativeElement.offsetWidth,
      this.canvasEl.nativeElement.offsetHeight
    );
    let _faceIndex = 0
    for (let index = 1; index < this.nodePositionCollection.length; index++) {
      const source = this.nodePositionCollection[0];
      const target = this.nodePositionCollection[index];
      this.traffic[_faceIndex] = { source, target };
      _faceIndex+=2;
      positions.push(
        source.position.x,
        source.position.y,
        source.position.z,
        target.position.x,
        target.position.y,
        target.position.z
      );
      colors.push(color.r, color.b, color.g, color.r, color.b, color.g);
      this.connectionCount++;
    }
    console.log("position", positions.length,positions);
    lineGeometry.setPositions(new Float32Array(positions));
    lineGeometry.setColors(colors);
    this.line = new LineSegments2(lineGeometry, matLine);
    this.line.userData = { __graphObj: "connection" };
    this.threeCommon.scene.add(this.line);
  }
  configureVertextIdentificationConnections() {
    this.connectionCount = 0;
    this.traffic = {};
    const lineGeometry = new LineGeometry();
    const color = new THREE.Color(0x277cb2);
    const positions = [];
    const colors = [];
    const matLine = new LineMaterial({
      color: 0x277cb2,
      vertexColors: true,
      dashed: false,
      linewidth: 5,
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
      colors.push(color.r, color.b, color.g, color.r, color.b, color.g);
      this.connectionCount++;
    }
    lineGeometry.setPositions(positions);
    lineGeometry.setColors(colors);
    this.line = new Line2(lineGeometry, matLine);
    this.line.userData = { __graphObj: "connection" };
    this.threeCommon.scene.add(this.line);
  }

  private configureIndividualConnections() {
    this.connectionCount = 0;
    for (
      let index = 0;
      index < this.nodePositionCollection.length - 1;
      index += 2
    ) {
      this.connectionCount++;
      const source = this.nodePositionCollection[index];
      const target = this.nodePositionCollection[index + 1];
      const lineGeometry = new LineGeometry();
      const color = new THREE.Color(0x277cb2);
      lineGeometry.setPositions([
        source.x,
        source.y,
        source.z,
        target.x,
        target.y,
        target.z,
      ]);
      const matLine = new LineMaterial({
        color: 0x277cb2,
        vertexColors: true,
        dashed: false,
        linewidth: 5,
      });
      matLine.resolution.set(
        this.canvasEl.nativeElement.offsetWidth,
        this.canvasEl.nativeElement.offsetHeight
      );
      lineGeometry.setColors([
        color.r,
        color.b,
        color.g,
        color.r,
        color.b,
        color.g,
      ]);
      const line = new Line2(lineGeometry, matLine);
      this.threeCommon.scene.add(line);
    }
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

/**
 *  Cylindrical connections.
 */

// constructCylindricalConnections(connectionData, instanceMesh?) {
//   var material = new THREE.MeshLambertMaterial({ color: 0x277cb2 });
//   if (instanceMesh) {
//     var cylinder = new THREE.CylinderGeometry(0.1, 0.1, 1, 10, 10, false);
//     this.connectionInstancedMesh = new THREE.InstancedMesh(
//       this.nodeMesh.geometry,
//       material,
//       10000
//     );
//   }
//   var HALF_PI = Math.PI * 0.5;
//   connectionData.forEach((c) => {
//     var distance = c.source.distanceTo(c.target);
//     var cylinder = new THREE.CylinderGeometry(
//       0.1,
//       0.1,
//       distance,
//       10,
//       10,
//       false
//     );
//     // orient the cylinder
//     var position = c.target.clone().add(c.source).divideScalar(2);

//     var orientation = new THREE.Matrix4(); //a new orientation matrix to offset pivot
//     var offsetRotation = new THREE.Matrix4(); //a matrix to fix pivot rotation
//     var offsetPosition = new THREE.Matrix4(); //a matrix to fix pivot position
//     orientation.lookAt(c.source, c.target, new THREE.Vector3(0, 1, 0)); //look at destination
//     offsetRotation.makeRotationX(HALF_PI); //rotate 90 degs on X
//     orientation.multiply(offsetRotation); //combine orientation with rotation transformations
//     cylinder.applyMatrix4(orientation);
//     const mesh = new THREE.Mesh(cylinder, material);
//     mesh.position.set(position.x, position.y, position.z);
//     mesh.userData["__visualiserObj"] = "traffic";
//     this.threeCommon.scene.add(mesh);
//   });
//   // var cylinder = new THREE.CylinderGeometry(
//   //   0.1,
//   //   0.1,
//   //   distance,
//   //   10,
//   //   10,
//   //   false
//   // );
//   // var orientation = new THREE.Matrix4(); //a new orientation matrix to offset pivot
//   // var offsetRotation = new THREE.Matrix4(); //a matrix to fix pivot rotation
//   // var offsetPosition = new THREE.Matrix4(); //a matrix to fix pivot position
//   // orientation.lookAt(
//   //   sourceVector,
//   //   destinationVector,
//   //   new THREE.Vector3(0, 1, 0)
//   // ); //look at destination
//   // offsetRotation.makeRotationX(HALF_PI); //rotate 90 degs on X
//   // orientation.multiply(offsetRotation); //combine orientation with rotation transformations
//   // cylinder.applyMatrix4(orientation);
//   // var mesh = new THREE.Mesh(cylinder, material);
//   // mesh.position.set(position.x, position.y, position.z);
//   // return mesh;
// }

/**
 * Connection mesh
 */

// private createConnectionMesh(connectionData: any[]) {
//   this.connectionCount = connectionData.length / 2;
//   if (this.noConnectionMesh) {
//     const material = new MeshLineMaterial({
//       color: new THREE.Color("rgb(39,124,178)"),
//       opacity: 1,
//       lineWidth: 0.05,
//       depthTest: true,
//       transparent: false,
//     });
//     this.trafficGroup = [];
//     connectionData.forEach((connection, i) => {
//       if (connectionData[i + 1]) {
//         const meshline = new MeshLine();
//         meshline.setPoints([connectionData[i], connectionData[i + 1]]);
//         var mesh = new THREE.Mesh(meshline, material);
//         mesh["dt"] = { test: i };
//         this.trafficGroup.push(mesh);
//         this.threeCommon.scene.add(mesh);
//       }
//     });
//   } else {
//     this.meshline = new MeshLine();
//     this.meshline.setPoints(connectionData);
//     const material = new MeshLineMaterial({
//       color: new THREE.Color("rgb(39,124,178)"),
//       opacity: 1,
//       lineWidth: 0.05,
//       depthTest: true,
//       transparent: false,
//     });
//     this.meshConnections = new THREE.Mesh(this.meshline, material);
//     this.meshConnections.frustumCulled = false;
//     this.meshConnections.renderOrder = 10;
//     this.meshConnections.raycast = MeshLineRaycast;

//     this.threeCommon.scene.add(this.meshConnections);
//   }
// }

// private generateDistinctConnections(indexed) {
//   // connectionData.push();
//   var connectionData = [];
//   for (let index = 0; index < this.connectionPoints.length; index++) {
//     for (
//       let _index = this.connectionPoints.length - 1;
//       _index >= 0;
//       _index = _index - this.connectionStep
//     ) {
//       if (indexed) {
//         // connectionData.push(
//         //   this.connectionPoints[index],
//         //   this.connectionPoints[_index]
//         // );
//         connectionData.push(
//           this.connectionPoints[index].x,
//           this.connectionPoints[index].y,
//           this.connectionPoints[index].z,
//           this.connectionPoints[_index].x,
//           this.connectionPoints[_index].y,
//           this.connectionPoints[_index].z
//         );
//       } else {
//         connectionData.push({
//           source: this.connectionPoints[index],
//           target: this.connectionPoints[_index],
//         });
//       }
//     }
//   }
//   return connectionData;
// }
// private generateRandomConnections() {
//   var connectionData = [];
//   for (let index = 0; index < this.connectionPoints.length; index++) {
//     for (
//       let _index = this.connectionPoints.length - 1;
//       _index >= 0;
//       _index = _index - this.connectionStep
//     ) {
//       connectionData.push(
//         this.connectionPoints[index],
//         this.connectionPoints[_index]
//       );
//     }
//   }
//   return connectionData;
// }

// private generateSequentialConnections() {
//   var connectionData = [];
//   let _connectionCount = 0;
//   const len = this.connectionPoints.length / 2;
//   for (let index = 0; index < len; index += 30) {
//     _connectionCount += 1;
//     let _index = len + index;
//     if (this.connectionPoints[index] && this.connectionPoints[_index]) {
//       connectionData.push(
//         this.connectionPoints[index].x,
//         this.connectionPoints[index].y,
//         this.connectionPoints[index].z,
//         this.connectionPoints[_index].x,
//         this.connectionPoints[_index].y,
//         this.connectionPoints[_index].z
//       );
//     }
//   }
//   console.log("connectionCount", this.connectionCount);

//   this.connectionCount = _connectionCount;
//   return connectionData;
// }
