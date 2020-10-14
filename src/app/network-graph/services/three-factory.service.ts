import { Injectable } from "@angular/core";
import * as THREE from "three";

@Injectable({
  providedIn: "root",
})
export class ThreeFactoryService {
  constructor() {}

  getLine() {
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x216491 });
    const lineGeometry = new THREE.BufferGeometry();
    return new THREE.Line(lineGeometry, lineMaterial);
  }
}
