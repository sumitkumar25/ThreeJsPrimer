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
import SpriteText from "three-spritetext";
import { LineSegments2 } from "three/examples/jsm/lines/LineSegments2";
import { LineSegmentsGeometry } from "three/examples/jsm/lines/LineSegmentsGeometry";
import * as Stats from "../../../../../node_modules/stats.js/build/stats.min.js";
import { NetworkGraphRequestService } from "../../services/network-graph-request.service.js";
import { LineMaterial } from "./../../../../../node_modules/three/examples/jsm/lines/LineMaterial.js";
import { throttle } from "lodash";
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
  nodeMesh: THREE.InstancedMesh<any, THREE.MeshNormalMaterial | any> | any;
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
  renderRequested: any;
  loadObjModel: boolean;
  nodeMeshBuffer: {
    geometry: THREE.SphereBufferGeometry;
    material: THREE.MeshBasicMaterial;
  };
  labelSpriteText: any = "sprite";
  labelsElements: any = {};

  throttledLabelUpdate = throttle(this.configureLabelsFov, 200);
  lableMap: any = {};
  labelcount: any;
  constructor(
    private threeService: ThreeService,
    private graphRequestService: NetworkGraphRequestService
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
    // this.threeCommon.camera.aspect =
    //   this.canvasEl.nativeElement.offsetWidth /
    //   this.canvasEl.nativeElement.offsetHeight;
    // this.threeCommon.renderer.setPixelRatio(2);
    this.threeCommon.scene.background = new THREE.Color(0x000000);
    this.threeCommon.camera.updateProjectionMatrix();
    this.threeCommon.controls.addEventListener("change", () => {
      // this.configureRaycast();
      // this.configureLabels();
      this.requestRenderIfNotRequested();
    });
    window.addEventListener(
      "resize",
      this.requestRenderIfNotRequested.bind(this)
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
    this.nodeMeshBuffer = {
      geometry: new THREE.SphereBufferGeometry(1, 10, 10),
      material: new THREE.MeshPhongMaterial({ color: 0xefefef }),
    };
    if (mesh.type && mesh.type === "Group") {
      this.nodeMesh = mesh.children[0];
    } else {
      this.nodeMesh = mesh;
    }
  }

  groupsResponseHandler(groupData: Object) {
    this.sceneController();
  }

  constructNodes(forceNewMesh) {
    let newMesh = forceNewMesh || !this.instancedNodeMesh;
    if (newMesh) {
      if (this.instancedNodeMesh) {
        this.instancedNodeMesh.geometry.dispose();
        this.instancedNodeMesh.material.dispose();
        this.threeCommon.scene.remove(this.instancedNodeMesh);
      }
      const attrObj = this.loadObjModel ? this.nodeMesh : this.nodeMeshBuffer;
      this.instancedNodeMesh = new THREE.InstancedMesh(
        attrObj.geometry,
        attrObj.material,
        10000
      );
      this.instancedNodeMesh.userData = { __graphObj: "nodeMesh" };
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
    quaternion.setFromUnitVectors(
      axis,
      target.clone().sub(source.clone()).normalize()
    );
    matrix.compose(position, quaternion, scale);
    return matrix;
  }

  setPositionFromLayout(i: number): THREE.Matrix4 {
    const matrix = new THREE.Matrix4();
    var rotation = new THREE.Euler();
    var quaternion = new THREE.Quaternion();
    var position = new THREE.Vector3();
    var offset = i * 5;
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

  private sceneController(newMesh?) {
    this.constructNodes(!!newMesh);
    if (this.enableConnections) {
      this.configureLineSegmentConnections();
      this.configureDirectionalArrows();
    }
    // this.configureRaycast();
    this.configureLabels();
    this.requestRenderIfNotRequested();
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
    for (let index = 0; index < this.directionInstanceMesh.count; index++) {
      this.directionInstanceMesh.setMatrixAt(index, new THREE.Matrix4());
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
    const colorRGB = new THREE.Color(this.trafficColor).convertLinearToSRGB();

    for (
      let index = 0;
      index < this.nodePositionCollection.length - 1;
      index++
    ) {
      const source = this.nodePositionCollection[index];
      const target = this.nodePositionCollection[index + 1];
      this.traffic[index] = { source, target };
      positions.push(
        source.position.x,
        source.position.y,
        source.position.z,
        target.position.x,
        target.position.y,
        target.position.z
      );
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
  /**
   * 
   * @param event     
   * this.mouse.x =
      ((event.clientX - canvasBounds.left) /
        (canvasBounds.right - canvasBounds.left))
        
      (x + 1)/2 *
   */
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
    this.configureRaycast();
    this.configureLabels();
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

  nodeGeometryChangeHandler($event) {
    this.threeService.cleanScene(this.threeCommon);
    this.loadObjModel = $event.target.value === "obj";
    this.sceneController(true);
  }

  labelsStateHandler($event) {
    this.threeService.cleanScene(this.threeCommon);
    this.labelSpriteText = $event.target.value;
    this.sceneController();
  }

  renderView() {
    this.renderRequested = false;
    if (this.resizeRendererToDisplaySize(this.threeCommon.renderer)) {
      const canvas = this.threeCommon.renderer.domElement;
      this.threeCommon.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.threeCommon.camera.updateProjectionMatrix();
    }
    this.throttledLabelUpdate();
    this.threeCommon.renderer.render(
      this.threeCommon.scene,
      this.threeCommon.camera
    );
    this.renderCalls = this.threeService.getRendererCallCount(
      this.threeCommon.renderer
    );
  }

  private configureLabelsFov() {
    this.labelcount = 0;
    Object.keys(this.lableMap).forEach((objectId) => {
      const object = this.lableMap[objectId];
      const zoom = this.threeCommon.camera.position.distanceTo(
        object.obj.position
      );
      if (zoom < 100) {
        if (!object.visible) {
          this.threeCommon.scene.add(object.obj);
          this.lableMap[objectId] = { ...object, ...{ visible: true } };
        }
      } else {
        this.threeCommon.scene.remove(object.obj);
        this.lableMap[objectId] = { ...object, ...{ visible: false } };
      }
      if(this.lableMap[objectId].visible){
        this.labelcount++;
      }
    });
  }

  private configureLabels() {
    if (this.labelSpriteText === "html") {
      this.htmlOverlayAllLabels();
    } else if (this.labelSpriteText === "sprite") {
      this.npmSpriteAllLabels();
    } else if (this.labelSpriteText === "allMouseSpriteNative") {
      this.nativeSpriteAllLabels();
    }
  }

  private configureEventBasedLabels(intersects) {
    if (this.labelSpriteText === "mouseSprite") {
      this.npmSpriteOnEvent(intersects);
    } else if (this.labelSpriteText === "mouseSpriteNative") {
      this.nativeSpriteOnEvent(intersects);
    }
  }

  resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  requestRenderIfNotRequested() {
    if (!this.renderRequested) {
      this.renderRequested = true;
      window.requestAnimationFrame(this.renderView.bind(this));
    }
  }
  private configureRaycast() {
    // if (this.mouse) {
    //   this.raycaster.setFromCamera(this.mouse, this.threeCommon.camera);
    //   // const intersects = this.raycaster.intersectObjects(
    //   //   this.threeCommon.scene.children
    //   // );
    //   // console.log(intersects);
    //   const lineRaycast = this.raycaster.intersectObjects([this.line]);
    //   if (
    //     lineRaycast &&
    //     lineRaycast[0] &&
    //     lineRaycast[0].object &&
    //     lineRaycast[0].object.userData &&
    //     lineRaycast[0].object.userData.__graphObj === "connection"
    //   ) {
    //     this.lineClickHandler(lineRaycast[0]);
    //   }
    // }

    if (this.mouse) {
      this.raycaster.setFromCamera(this.mouse, this.threeCommon.camera);

      // label
      var intersects = this.raycaster.intersectObjects(
        this.threeCommon.scene.children
      );
      if (
        intersects &&
        intersects[0] &&
        intersects[0].object &&
        intersects[0].object.userData.__graphObj === "nodeMesh"
      ) {
        this.configureEventBasedLabels(intersects);
      }
    }
  }
  /**
   * NPM sprite text. On mouse click
   */
  private npmSpriteOnEvent(intersects: THREE.Intersection[]) {
    const sprite = new SpriteText("node label" + intersects[0].instanceId);
    sprite.color = "#ffffff";
    sprite.textHeight = 0.7;
    sprite.visible = true;
    const position = this.getLabelPosition(intersects, null);
    sprite.position.set(position.x, position.y - 2, position.z);
    this.threeCommon.scene.add(sprite);
  }
  /**
   * NPM sprite text. all labels
   */
  npmSpriteAllLabels() {
    for (let index = 0; index < this.objectCount; index++) {
      const matrix = new THREE.Matrix4();
      const position = new THREE.Vector3();
      if (!this.lableMap[index]) {
        this.instancedNodeMesh.getMatrixAt(index, matrix);
        position.setFromMatrixPosition(matrix);
        // console.log(cameraPosition.distanceTo(position), `node index ${index}`);
        const sprite = new SpriteText(`node index ${index}`);
        sprite.color = "#b3b3b3";
        sprite.textHeight = 1;
        sprite.visible = true;
        sprite.position.set(position.x, position.y + 2, position.z);
        sprite.userData = { __objId: index };
        this.lableMap[index] = { obj: sprite, visible: false };
      }
    }
  }
  /**
   * Native canvas sprite text. On mouse click
   */
  private nativeSpriteOnEvent(intersects: any) {
    const sprite = this.createNativeSpriteLabel(
      "node label" + intersects[0].instanceId
    );
    const position = this.getLabelPosition(intersects, null);
    sprite.position.set(position.x, position.y - 2, position.z);
    this.threeCommon.scene.add(sprite);
  }

  /**
   * Native canvas sprite text. all labels
   */
  nativeSpriteAllLabels() {
    for (let index = 0; index < this.objectCount; index++) {
      const position = this.getLabelPosition(null, index);
      const sprite = this.createNativeSpriteLabel(`native index ${index}`);
      sprite.position.setX(position.x);
      sprite.position.setY(position.y - 2);
      this.threeCommon.scene.add(sprite);
    }
  }
  /**
   * HTML overlay. all labels
   */
  htmlOverlayAllLabels() {
    const labelParentElem = document.querySelector("#labels");
    labelParentElem.innerHTML = "";
    const docFrag = document.createDocumentFragment();
    let canvasBounds = this.threeCommon.renderer.context.canvas.getBoundingClientRect();
    const frustum = new THREE.Frustum();

    for (let index = 0; index < this.objectCount; index++) {
      const elem = document.createElement("div");
      elem.className = "label-div";
      elem.textContent = "node name " + index;
      elem.setAttribute("data-matrix-id", index + "");
      let matrix = new THREE.Matrix4();
      this.instancedNodeMesh.getMatrixAt(index, matrix);
      const position = new THREE.Vector3();
      position.setFromMatrixPosition(matrix);
      this.threeCommon.camera.updateMatrix();
      this.threeCommon.camera.updateMatrixWorld();

      frustum.setFromProjectionMatrix(
        new THREE.Matrix4().multiplyMatrices(
          this.threeCommon.camera.projectionMatrix,
          this.threeCommon.camera.matrixWorldInverse
        )
      );

      // if (
      //   frustum.containsPoint(position) &&
      //   this.threeCommon.camera.position.distanceTo(position) < 25
      // ) {
      position.setY(position.y - 1);
      position.project(this.threeCommon.camera);
      // convert to unit  vector.
      position.normalize();
      if (Number.isNaN(position.x)) {
        position.x = 0;
      }
      if (Number.isNaN(position.y)) {
        position.y = 0;
      }
      const x = ((position.x + 1) * canvasBounds.width) / 2;
      const y = ((1 - position.y) * canvasBounds.height) / 2;
      elem.style.left = `${0}px`;
      elem.style.top = `${0}px`;
      elem.style.position = `absolute`;
      elem.style.zIndex = (((-position.z * 0.5 + 0.5) * 100000) | 0) + "";
      elem.style.minWidth = "100px";
      elem.style.transform = `translate(${x}px,${y}px)`;
      docFrag.appendChild(elem);
    }
    labelParentElem.append(docFrag);
  }

  createNativeSpriteLabel(text): any {
    var font = "Arial";
    var size = 130;
    var color = "#ffffff";
    var font = "bold " + size + "px " + font;

    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text),
      textWidth = metrics.width;

    canvas.width = textWidth + 3;
    canvas.height = size + 3;

    context.font = font;
    context.fillStyle = color;
    context.fillText(text, 0, size + 3);
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial({ map: texture });

    let sprite1 = new THREE.Sprite(spriteMaterial);
    sprite1.scale.set(4, 1, 1.0);
    return sprite1;
  }

  private getLabelPosition(intersects: THREE.Intersection[], index) {
    const _index = intersects ? intersects[0].instanceId : index;
    let matrix = new THREE.Matrix4();
    this.instancedNodeMesh.getMatrixAt(_index, matrix);
    const position = new THREE.Vector3();
    position.setFromMatrixPosition(matrix);
    return position;
  }
}
