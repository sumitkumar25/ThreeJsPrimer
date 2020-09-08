import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { ThreeConstants } from '../interfaces/three-constants';

@Injectable({
  providedIn: 'root'
})
export class CtVisualizationService {

  constructor() { }

  generateThreeConstants(canvasEl?: HTMLCanvasElement): ThreeConstants {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera();
    const renderer = canvasEl ?new THREE.WebGLRenderer({canvas:canvasEl}):new THREE.WebGLRenderer() ;
    return { scene, camera, renderer }
  }
}
