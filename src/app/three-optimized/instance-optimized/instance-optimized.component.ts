import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { ThreeService } from "src/app/three/services/three.service";
import * as THREE from "three";
import { Object3D } from "three";
import * as Stats from "../../../../node_modules/stats.js/build/stats.min.js";

@Component({
  selector: "app-instance-optimized",
  templateUrl: "./instance-optimized.component.html",
  styleUrls: ["./instance-optimized.component.scss"],
})
export class InstanceOptimizedComponent implements OnInit {
  mouse = new THREE.Vector3();
  stats: any;
  geometry: THREE.InstancedBufferGeometry | THREE.BufferGeometry;
  instancedMesh: THREE.InstancedMesh<
    THREE.BufferGeometry | THREE.InstancedBufferGeometry,
    THREE.MeshNormalMaterial
  >;
  objectCount: number = 1000;
  threeCommon: { scene: any; renderer: any; camera: any; controls: any };
  @ViewChild("canvasEl", { static: false, read: ElementRef })
  canvasEl: ElementRef;
  @ViewChild("stats", { static: false, read: ElementRef }) statsEl: ElementRef;

  renderCalls = 0;

  raycaster = new THREE.Raycaster();
  color = new THREE.Color();
  mesh: THREE.InstancedMesh<
    THREE.InstancedBufferGeometry | THREE.BufferGeometry,
    THREE.MeshNormalMaterial
  >;

  constructor(private threeService: ThreeService) {}

  ngOnInit() {
    this.loadGeometry();
  }

  ngAfterViewInit(): void {
    this.setUpStats();
    this.threeCommon = this.threeService.getThreeCommon(
      this.canvasEl.nativeElement
    );
    this.threeCommon.camera.position.z = 300;
    this.threeCommon.camera.aspect =
      this.canvasEl.nativeElement.offsetWidth /
      this.canvasEl.nativeElement.offsetHeight;
    this.threeCommon.renderer.setPixelRatio(window.devicePixelRatio);
    this.threeCommon.camera.updateProjectionMatrix();
  }
  setUpStats() {
    this.stats = new Stats();
    this.stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
    this.statsEl.nativeElement.appendChild(this.stats.dom);
    this.stats.domElement.style.position = "absolute";
    this.stats.domElement.style.left = "0px";
    this.stats.domElement.style.top = "0px";
  }

  loadGeometry() {
    const loader = new THREE.BufferGeometryLoader();
    loader.load("assets/custom/geometry2.json", (geometry) => {
      this.geometry = geometry;
      this.drawInstanceMesh();
      this.renderView();
    });
  }
  drawInstanceMesh() {
    this.clean();
    const material = new THREE.MeshNormalMaterial();
    this.geometry.computeVertexNormals();
    const matrix = new THREE.Matrix4();
    this.mesh = new THREE.InstancedMesh(
      this.geometry,
      material,
      this.objectCount
    );
    for (var i = 0; i < this.objectCount; i++) {
      this.randomizeMatrix(matrix);
      this.mesh.setMatrixAt(i, matrix);
    }
    this.threeCommon.scene.add(this.mesh);
  }
  objectCountChangeHandler($event) {
    this.objectCount = Number.parseInt($event.target.value, 10);
    this.drawInstanceMesh();
  }
  clean() {
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
  randomizeMatrix(matrix: THREE.Matrix4) {
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

    scale.x = scale.y = scale.z = Math.random() * 1;

    matrix.compose(position, quaternion, scale);
  }

  private renderView() {
    this.raycaster.setFromCamera(this.mouse, this.threeCommon.camera);

    var intersection = this.raycaster.intersectObject(this.mesh);
    if (intersection.length > 0) {
      var rotationMatrix = new THREE.Matrix4().makeRotationY(0.2);
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
    window.requestAnimationFrame(this.renderView.bind(this));
    this.renderCalls = this.threeCommon.renderer.info.render.calls;
  }

  clickHandler(event) {
    event.preventDefault();
    let canvasBounds = this.threeCommon.renderer.context.canvas.getBoundingClientRect();
    this.mouse.x = ( ( event.clientX - canvasBounds.left ) / ( canvasBounds.right - canvasBounds.left ) ) * 2 - 1;
    this.mouse.y = - ( ( event.clientY - canvasBounds.top ) / ( canvasBounds.bottom - canvasBounds.top) ) * 2 + 1;
  }
}
