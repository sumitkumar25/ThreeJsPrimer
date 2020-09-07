import { Injectable } from '@angular/core';
import * as THREE from 'three';
@Injectable({
  providedIn: 'root'
})
export class ThreeService {

  constructor() { }

  getThreeCommon(canvasEl): { scene: any, renderer: any, camera: any } {
    const common = {
      scene: new THREE.Scene(),
      renderer: new THREE.WebGLRenderer({ canvas: canvasEl }),
      camera: new THREE.PerspectiveCamera(),
    }
    //  set some defaults
    common.scene.background = new THREE.Color('white');
    common.renderer.setSize(canvasEl.offsetWidth, canvasEl.offsetHeight)
    common.camera.position.z = 5
    return common;
  }

  getThreeCommonWindow() {
    const common = {
      scene: new THREE.Scene(),
      renderer: new THREE.WebGLRenderer(),
      camera: new THREE.PerspectiveCamera(),
    }
    common.scene.background = new THREE.Color('white');
    common.renderer.setSize(window.innerWidth, window.innerHeight);
    common.camera.position.z = 5;
    return common;
  }
}
