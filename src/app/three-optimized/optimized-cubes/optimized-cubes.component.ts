import { HostListener, ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { ThreeService } from "src/app/three/services/three.service";
import * as THREE from "three";
import * as Stats from "../../../../node_modules/stats.js/build/stats.min.js";
// import { GLTFLoader } from 'three/examples/js/loaders/GLTFLoader';
// import { DRACOLoader } from 'three/examples/js/loaders/DRACOLoader';
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { Object3D } from 'three';

@Component({
  selector: "app-optimized-cubes",
  templateUrl: "./optimized-cubes.component.html",
  styleUrls: ["./optimized-cubes.component.scss"],
})
export class OptimizedCubesComponent implements OnInit {
  mouse = new THREE.Vector2();
  stats: any;
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

  ngOnInit() {}
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
    // this.viewController();
    // this.loaderController();
    this.bufferLoaderController();
  }
  bufferLoaderController() {
    const loader = new THREE.BufferGeometryLoader();
    loader.load(
      // resource URL
      "assets/custom/geometry2.json",

      // onLoad callback
      (geometry) => {
        geometry.computeVertexNormals();
        const material = new THREE.MeshNormalMaterial({});
        const workingmaterial = new THREE.MeshNormalMaterial({});
        const mesh = new THREE.InstancedMesh(geometry, material, 1);
        const working = new THREE.Mesh(
          geometry,
          workingmaterial
        );

        const dummy = new Object3D();
        dummy.position.set(1,1,1);
        mesh.setMatrixAt( 1, dummy.matrix);
        mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        mesh.instanceMatrix.needsUpdate = true;

        this.threeCommon.scene.add(mesh);
        // this.threeCommon.scene.add(working);
        this.renderSimpleView();
      }
    );
  }

  loaderController() {
    var loader = new OBJLoader();
    loader.load(
      "assets/custom/model.obj",
      (geometry) => {
        this.threeCommon.scene.add(geometry);
        console.log(geometry);

        var material = new THREE.MeshNormalMaterial();
        // check overdraw
        // var material = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.1, transparent: true } );

        // mesh = new THREE.InstancedMesh( geometry, material, count );
        // mesh.instanceMatrix.setUsage( THREE.DynamicDrawUsage ); // will be updated every frame
        // scene.add( mesh );
        this.renderSimpleView();
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function (error) {
        console.log("An error happened");
      }
    );
  }

  mouseMoveHandler(event) {
    event.preventDefault();
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
  setUpStats() {
    this.stats = new Stats();
    this.stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom);
  }
  // viewController() {
  //   /**
  //    * Construction.
  //    * 1. Construct Geometry .
  //    *    Optimization Prerequisite.
  //    *    Copy geometry attributes along with index(TODO: why?) to InstanceBufferGeometry
  //    * 2. Construct a Mesh * 2000
  //    *    Optimization.
  //    *    1. Construct Array Matrix. size 2000*4
  //    *    2. Wire to instancedGeometry by InstancedBufferAttribute using setAttribute
  //    *    3. set material color as above.
  //    *
  //    *
  //    *
  //    * 3. Set Positions (rotation,position,scale).
  //    *    1. Set positions same as unoptimized code.
  //    * 4. Add to Scene.
  //    */
  //   const geometry = new THREE.BoxBufferGeometry(20, 20, 20);
  //   /**
  //    *
  //    * 2. Copy geometry Index to InstanceBufferGeometry.
  //    * 3. Set number of instances 'maxInstancedCount'.
  //    *
  //    * 4. set 'aInstanceMatrix' This takes care of the position, scale, rotation
  //    * 5. set 'aInstanceColor' for material.
  //    */
  //   const instancedGeometry = new THREE.InstancedBufferGeometry();

  //   Object.keys(geometry.attributes).forEach((attr) => {
  //     instancedGeometry.attributes[attr] = geometry.attributes[attr];
  //   });
  //   instancedGeometry.index = geometry.index;
  //   instancedGeometry["maxInstancedCount"] = 2000;

  //   const matArraySize = 1 * 4;
  //   // why 2000*4?
  //   const matrixArray = [new Float32Array(matArraySize)];

  //   for (let i = 0; i < matrixArray.length; i++) {
  //     instancedGeometry.setAttribute(
  //       `aInstanceMatrix${i}`,
  //       new THREE.InstancedBufferAttribute(matrixArray[i], 4)
  //     );
  //   }
  //   const instanceColorArray = new Uint8Array(1 * 3);
  //   instancedGeometry.setAttribute(
  //     "aInstanceColor",
  //     new THREE.InstancedBufferAttribute(instanceColorArray, 3, true)
  //   );

  //   for (var i = 0; i < 1; i++) {
  //     var object = new THREE.Object3D();
  //     const color = new THREE.Color(Math.random() * 0xffffff);

  //     object.position.x =
  //       Math.random() * this.canvasEl.nativeElement.offsetWidth -
  //       this.canvasEl.nativeElement.offsetHeight;
  //     object.position.y =
  //       Math.random() * this.canvasEl.nativeElement.offsetWidth -
  //       this.canvasEl.nativeElement.offsetHeight;
  //     object.position.z =
  //       Math.random() * this.canvasEl.nativeElement.offsetWidth -
  //       this.canvasEl.nativeElement.offsetHeight;

  //     object.rotation.x = Math.random() * 2 * Math.PI;
  //     object.rotation.y = Math.random() * 2 * Math.PI;
  //     object.rotation.z = Math.random() * 2 * Math.PI;

  //     object.scale.x = Math.random() + 0.5;
  //     object.scale.y = Math.random() + 0.5;
  //     object.scale.z = Math.random() + 0.5;

  //     this.threeCommon.scene.add(object);
  //     object.updateMatrixWorld();
  //     for (let r = 0; r < matrixArray.length; r++) {
  //       for (let c = 0; c < matrixArray.length; c++) {
  //         matrixArray[r][i * 4 + c] = object.matrixWorld.elements[r * 4 + c];
  //       }
  //     }

  //     const colorArray = color.toArray().map((c) => Math.floor(c * 255));
  //     for (let c = 0; c < 3; c++) {
  //       instanceColorArray[i * 3 + c] = colorArray[c];
  //     }
  //   }
  //   const instanceMaterial = new THREE.MeshLambertMaterial({
  //     color: Math.random() * 0xffffff,
  //   });
  //   instanceMaterial.onBeforeCompile = (shader) => {
  //     shader.vertexShader = `
  //         attribute vec4 aInstanceMatrix0;
  //         attribute vec4 aInstanceMatrix1;
  //         attribute vec4 aInstanceMatrix2;
  //         attribute vec4 aInstanceMatrix3;

  //         attribute vec3 aInstanceColor;

  //         ${shader.vertexShader.replace(
  //           "#include <begin_vertex>",
  //           `mat4 aInstanceMatrix = mat4( aInstanceMatrix0, aInstanceMatrix1, aInstanceMatrix2,aInstanceMatrix3);
  //           vec3 transformed = (aInstanceMatrix * vec4( position , 1. )).xyz;`
  //         )}`;
  //   };

  //   this.renderView();
  // }

  // renderView(calleeAnimationFrame?) {
  // this.theta += 0.01;
  // this.threeCommon.camera.position.x =
  //   this.radius * Math.sin(THREE.MathUtils.degToRad(this.theta));
  // this.threeCommon.camera.position.y =
  //   this.radius * Math.sin(THREE.MathUtils.degToRad(this.theta));
  // this.threeCommon.camera.position.z =
  //   this.radius * Math.cos(THREE.MathUtils.degToRad(this.theta));
  // this.threeCommon.camera.lookAt(this.threeCommon.scene.position);
  // this.stats.update();
  // this.raycaster.setFromCamera(this.mouse, this.threeCommon.camera);

  // var intersects = this.raycaster.intersectObjects(
  //   this.threeCommon.scene.children
  // );
  // if (intersects.length > 0) {
  //   if (this.intersected != intersects[0].object) {
  //     if (this.intersected)
  //       this.intersected.material.emissive.setHex(
  //         this.intersected.currentHex
  //       );
  //     this.intersected = intersects[0].object;
  //     this.intersected.currentHex = this.intersected.material.emissive.getHex();
  //     this.intersected.material.emissive.setHex(0xff0000);
  //   }
  // } else {
  //   if (this.intersected)
  //     this.intersected.material.emissive.setHex(this.intersected.currentHex);
  //   this.intersected = null;
  // }
  // console.log(this.threeCommon.renderer.info.render.calls);
  //   this.renderSimpleView();
  // }

  private renderSimpleView() {
    this.threeCommon.renderer.render(
      this.threeCommon.scene,
      this.threeCommon.camera
    );
    window.requestAnimationFrame(this.renderSimpleView.bind(this));
  }
}
