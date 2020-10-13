import { Injectable } from "@angular/core";
import * as THREE from "three";
import { Colors } from "src/app/common/enums/colors.enum";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
@Injectable({
  providedIn: "root",
})
export class ThreeService {
  constructor() {}

  getThreeCommon(
    canvasEl,
    directionalLight = false
  ): { scene: any; renderer: any; camera: any; controls: any } {
    const common = {
      scene: new THREE.Scene(),
      renderer: new THREE.WebGLRenderer({ canvas: canvasEl, antialias: true }),
      camera: new THREE.PerspectiveCamera(75, 2),
      controls: {},
    };
    common.renderer.setSize(canvasEl.offsetWidth, canvasEl.offsetHeight);
    common.scene.add(
      directionalLight
        ? new THREE.DirectionalLight(0xffffff, 1)
        : new THREE.AmbientLight(0xffffff, 1)
    );
    common.controls = this.configureViewSettings(
      common.scene,
      common.camera,
      common.renderer
    );
    return common;
  }

  getThreeCommonWindow() {
    const common = {
      scene: new THREE.Scene(),
      renderer: new THREE.WebGLRenderer(),
      camera: new THREE.PerspectiveCamera(),
    };
    common.scene.background = new THREE.Color(Colors.canvasBackground);
    common.renderer.setSize(window.innerWidth, window.innerHeight);
    common.camera.position.z = 100;
    return common;
  }

  configureViewSettings(scene, camera, renderer) {
    scene.background = new THREE.Color(0xffffff);
    const light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 0, 100);
    // controls.autoRotate =true;
    // controls.autoRotateSpeed =1;
    return controls;
  }

  getRendererCallCount(renderer) {
    return renderer.info.render.calls;
  }

  cleanScene(threeCommon) {
    var meshes = [];

    threeCommon.scene.traverse(function (object) {
      if (object.isMesh) meshes.push(object);
    });
    for (var i = 0; i < meshes.length; i++) {
      var mesh = meshes[i];
      mesh.material.dispose();
      mesh.geometry.dispose();
      threeCommon.scene.remove(mesh);
    }
  }
}
