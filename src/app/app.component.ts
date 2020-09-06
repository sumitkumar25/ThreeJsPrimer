import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import * as THREE from 'three';
// // import { ThreeService } from './services/three.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
//   @ViewChild('threeJsElemOne', { static: true }) threeJsElemOne: ElementRef
//   scene;
//   camera;
//   renderer;
//   renderedObjs = [];

//   constructor(private threeService: ThreeService) {
//     const threeObj = this.threeService.getThreeCommon();
//     this.scene = threeObj.scene;
//     this.camera = threeObj.camera;
//     this.renderer = threeObj.renderer;
//     this.camera.position.set(0, 0, 25);
//     this.camera.lookAt(0, 0, 0);
//   }

//   ngOnInit() {
//     this.setRenderer();
//     this.renderLine();
//     this.renderCube();
//     this.addLightning();
//     window.requestAnimationFrame(this.renderAnimations.bind(this));
//   }
//   addLightning() {
//     const color = 0xFFFFFF;
//     const intensity = 1;
//     const light = new THREE.DirectionalLight(color, intensity);
//     light.position.set(-1, 2, 4);
//     this.scene.add(light);
//   }
//   setRenderer() {
//     const el = this.threeJsElemOne.nativeElement;
//     this.renderer.setSize(el.offsetWidth, el.offsetHeight);
//     el.appendChild(this.renderer.domElement);
//   }
//   renderCube() {
//     const geometry = new THREE.BoxGeometry(10, 10, 10);
//     const material = new THREE.MeshLambertMaterial({ color: 0x44aa88 });
//     const cube = new THREE.Mesh(geometry, material);
//     this.scene.add(cube);
//     this.renderedObjs.push(cube);
//   }
//   renderLine() {
//     // set size on section 1.
//     const material = new THREE.LineBasicMaterial({ color: 'red' });
//     const points = [];
//     points.push(new THREE.Vector3(- 10, 0, 0));
//     points.push(new THREE.Vector3(0, 10, 0));
//     points.push(new THREE.Vector3(10, 0, 0));

//     const geometry = new THREE.BufferGeometry().setFromPoints(points);
//     const line = new THREE.Line(geometry, material);
//     this.scene.add(line);
//     this.renderedObjs.push(line);
//   }

//   renderAnimations(time) {
//     time *= 0.001;  // convert time to seconds
//     this.renderedObjs.forEach((el, i) => {
//       if (i !== 0) {
//         el.rotation.x = 0.5*time;
//         el.rotation.y = 0.5*time;
//       }else{
//         el.rotation.x = 5*time;
//         el.rotation.y = 5*time;      
//       }
//     })
//     this.renderer.render(this.scene, this.camera);
//     requestAnimationFrame(this.renderAnimations.bind(this));
//   }
}
