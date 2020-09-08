import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { Colors } from 'src/app/common/colors.enum';
@Injectable({
  providedIn: 'root'
})
export class ThreeService {

  constructor() { }

  getThreeCommon(canvasEl): { scene: any, renderer: any, camera: any } {
    const common = {
      scene: new THREE.Scene(),
      renderer: new THREE.WebGLRenderer({ canvas: canvasEl }),
      camera: new THREE.PerspectiveCamera(75,2),
    }
    //  set some defaults
    common.scene.background = new THREE.Color(Colors.canvasBackground);
    common.renderer.setSize(canvasEl.offsetWidth, canvasEl.offsetHeight)
    return common;
  }

  getThreeCommonWindow() {
    const common = {
      scene: new THREE.Scene(),
      renderer: new THREE.WebGLRenderer(),
      camera: new THREE.PerspectiveCamera(),
    }
    common.scene.background = new THREE.Color(Colors.canvasBackground);
    common.renderer.setSize(window.innerWidth, window.innerHeight);
    common.camera.position.z = 5;
    return common;
  }
}
