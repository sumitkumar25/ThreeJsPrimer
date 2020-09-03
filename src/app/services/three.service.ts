import { Injectable } from '@angular/core';
import * as THREE from 'three';
@Injectable({
  providedIn: 'root'
})
export class ThreeService {

  constructor() { }

  getThreeCommon() {
    return {
      scene: new THREE.Scene(),
      renderer : new THREE.WebGLRenderer(),
       camera: new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 500 ),
    }
  }
}
