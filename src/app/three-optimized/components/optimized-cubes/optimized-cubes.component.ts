import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
import { ThreeService } from "src/app/three/services/three.service";
import * as THREE from "three";
import { MeshNormalMaterial, Object3D } from "three";

@Component({
  selector: "app-optimized-cubes",
  templateUrl: "./optimized-cubes.component.html",
  styleUrls: ["./optimized-cubes.component.scss"],
})
export class OptimizedCubesComponent implements OnInit {
  mouse = new THREE.Vector2();
  stats: any;
  geometry: THREE.InstancedBufferGeometry | THREE.BufferGeometry;
  instancedMesh: THREE.InstancedMesh<
    THREE.BufferGeometry | THREE.InstancedBufferGeometry,
    THREE.MeshNormalMaterial
  >;
  objectCount: number = 20;
  @HostListener("resize") resizeEvent() {
    this.threeCommon.camera.aspect =
      this.canvasEl.nativeElement.offsetWidth /
      this.canvasEl.nativeElement.offsetHeight;
    this.threeCommon.camera.updateProjectionMatrix();
    this.threeCommon.renderer.setSize(
      this.canvasEl.nativeElement.offsetWidth,
      this.canvasEl.nativeElement.offsetHeight
    );
  }

  @ViewChild("canvasEl", { static: false, read: ElementRef })
  canvasEl: ElementRef;

  threeCommon: { scene: any; renderer: any; camera: any; controls: any };

  mesh: THREE.Mesh<THREE.BoxBufferGeometry, THREE.MeshBasicMaterial>;

  raycaster = new THREE.Raycaster();

  theta = 0;

  radius = 1000;

  intersected;

  constructor(private threeService: ThreeService) {}

  ngOnInit() {
    this.loadGeometry();
  }
  loadGeometry() {
    const loader = new THREE.BufferGeometryLoader();
    loader.load("assets/custom/geometry2.json", (geometry) => {
      this.geometry = geometry;
      // this.drawByMesh();
      this.drawByInstancing();
      this.renderView();
    });
  }

  ngAfterViewInit(): void {
    this.setUpStats();
    this.threeCommon = this.threeService.getThreeCommon(
      this.canvasEl.nativeElement
    );
    this.threeCommon.camera.position.z = 10;
    this.threeCommon.camera.aspect =
      this.canvasEl.nativeElement.offsetWidth /
      this.canvasEl.nativeElement.offsetHeight;
    this.threeCommon.renderer.setPixelRatio(window.devicePixelRatio);
    this.threeCommon.camera.updateProjectionMatrix();
    this.drawByMesh();
  }
  drawByMesh() {
    const mesh = new THREE.Mesh(this.geometry, new MeshNormalMaterial({}));
    mesh.position.set(15, 0, 0);
    this.threeCommon.scene.add(mesh);
  }
  drawByInstancing() {
    const material = new THREE.MeshNormalMaterial();
    this.instancedMesh = new THREE.InstancedMesh(
      this.geometry,
      material,
      this.objectCount
    );
    this.instancedMesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.threeCommon.scene.add(this.instancedMesh);
  }

  mouseMoveHandler(event) {
    event.preventDefault();
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
  setUpStats() {
    // this.stats = new Stats();
    // this.stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
    // document.body.appendChild(this.stats.dom);
    // this.stats.domElement.style.position = 'absolute';
    // this.stats.domElement.style.left = '0px';
    // this.stats.domElement.style.top = '0px';
  }

  private renderView() {
    const time = Date.now() * 0.001;
    this.instancedMesh.rotation.x = Math.sin(time / 4);
    this.instancedMesh.rotation.y = Math.sin(time / 2);
    let i = 0;
    const offset = (this.objectCount - 1) / 2;
    const dummy = new Object3D();
    for (var x = 0; x < this.objectCount; x++) {
      for (var y = 0; y < this.objectCount; y++) {
        for (var z = 0; z < this.objectCount; z++) {
          dummy.position.set(offset - x , offset - y, offset - z);
          dummy.rotation.y =
            Math.sin(x / 4 + time) +
            Math.sin(y / 4 + time) +
            Math.sin(z / 4 + time);
          dummy.rotation.z = dummy.rotation.y * 2;
          dummy.updateMatrix();
          this.instancedMesh.setMatrixAt(i++, dummy.matrix);
        }
      }
    }
    this.instancedMesh.instanceMatrix.needsUpdate = true;
    this.threeCommon.renderer.render(
      this.threeCommon.scene,
      this.threeCommon.camera
    );
    window.requestAnimationFrame(this.renderView.bind(this));
  }
}
