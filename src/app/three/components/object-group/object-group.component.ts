import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ThreeService } from '../../services/three.service';
import * as THREE from 'three';
import { SphereBufferGeometry, Object3D, Group } from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';


@Component({
  selector: 'app-object-group',
  templateUrl: './object-group.component.html',
  styleUrls: ['./object-group.component.scss']
})
export class ObjectGroupComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvasEl', { static: false }) canvasEl: ElementRef;

  threeCommon: { scene: any, renderer: any, camera: any, controls: any };

  nodes: Array<SphereBufferGeometry> = [];
  raycaster: THREE.Raycaster;
  mouse: THREE.Vector2;
  dragControls: DragControls;
  dragableElem=[];


  constructor(private threeService: ThreeService) { }

  ngOnInit() {
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
  }

  ngAfterViewInit() {
    this.threeCommon = this.threeService.getThreeCommon(this.canvasEl.nativeElement);
    this.threeCommon.camera.fov = 50;
    this.threeCommon.camera.position.z = 550;
    this.threeCommon.camera.updateProjectionMatrix();
    this.viewController();
  }
  viewController() {
    this.constructDataObjects();
    this.renderView();
  }
  constructDataObjects() {
    this.constructNodeObjects();
    this.constructNode2Objects();
    this.constructConnectionObjects();
    this.dragControls = new DragControls([...this.dragableElem], this.threeCommon.camera, this.threeCommon.renderer.domElement);
    this.dragControls.addEventListener('drag', this.dragHandler);

  }
  dragHandler(arg0) {
    console.log({ drag: arg0 })
  }
  constructNode2Objects() {
    const nodeObj = new Object3D();
    const nGroup = new Group();

    const radius = 5;
    const widthSegments = 30;
    const heightSegments = 30;
    for (let index = 0; index < 4; index++) {
      const sphere = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);
      const material = new THREE.MeshBasicMaterial({
        color: [0xF3A2B0, 0x928369, 0x302B22, 0x605602][index],
      });
      const mesh = new THREE.Mesh(sphere, material);
      mesh.userData = {
        id: `mesh2-${index}`,
        name: `mesh2-${index}`,
      }
      const x = 120 + (index % 2 === 0 ? (2 * radius + 1) * (index + 1) : -((2 * radius + 1) * (index + 1)));
      const y = 120 + (index % 2 === 0 ? -(2 * radius + 1) * (index + 1) : ((2 * radius + 1) * (index + 1)));
      const z = 120 + (index % 2 === 0 ? (2 * radius + 1) * (index + 1) : -((2 * radius + 1) * (index + 1)));
      mesh.position.set(x, y, z)
      // nodeGroup.add(mesh);
      // this.threeCommon.scene.add(nodeGroup);      
      nodeObj.add(mesh);
    }


    // bounding box.
    const box = new THREE.BoxHelper(nodeObj, 'red');
    const bbDimensions = box.geometry.boundingSphere;
    // bounding sphere.
    const bbSphere = new THREE.SphereBufferGeometry(bbDimensions.radius, 30, 30);
    const bbMaterial = new THREE.MeshBasicMaterial({
      color: 'blue',
      transparent: true,
      opacity: 0.1
    });
    const bbSphereMesh = new THREE.Mesh(bbSphere, bbMaterial);
    bbSphereMesh.position.set(bbDimensions.center.x, bbDimensions.center.y, bbDimensions.center.z);
    [bbSphereMesh, box, nodeObj].forEach(threeEl => nGroup.add(threeEl));
    nGroup.userData = {
      id: `g2`,
      name: `g2`
    }
    this.threeCommon.scene.add(nGroup);
    this.dragableElem.push(nGroup.children[0])
  }
  constructNodeObjects() {
    const nodeObj = new Object3D();
    const nGroup = new Group();

    const radius = 5;
    const widthSegments = 30;
    const heightSegments = 30;
    for (let index = 0; index < 4; index++) {
      const sphere = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);
      const material = new THREE.MeshBasicMaterial({
        color: 'black',
      });
      const mesh = new THREE.Mesh(sphere, material);
      mesh.userData = {
        id: `mesh-${index}`,
        name: `mesh-${index}`,
      }
      const x = index % 2 === 0 ? (2 * radius + 1) * (index + 1) : -((2 * radius + 1) * (index + 1));
      const y = index % 2 === 0 ? -(2 * radius + 1) * (index + 1) : ((2 * radius + 1) * (index + 1));
      const z = index % 2 === 0 ? (2 * radius + 1) * (index + 1) : -((2 * radius + 1) * (index + 1));
      mesh.position.set(x, y, z)
      // nodeGroup.add(mesh);
      // this.threeCommon.scene.add(nodeGroup);

      nodeObj.add(mesh);
    }


    // bounding box.
    const box = new THREE.BoxHelper(nodeObj, 0x000000);
    const bbDimensions = box.geometry.boundingSphere;
    // bounding sphere.
    const bbSphere = new THREE.SphereBufferGeometry(bbDimensions.radius, 30, 30);
    const bbMaterial = new THREE.MeshBasicMaterial({
      color: 'red',
      transparent: true,
      opacity: 0.1
    });
    const bbSphereMesh = new THREE.Mesh(bbSphere, bbMaterial);
    bbSphereMesh.position.set(bbDimensions.center.x, bbDimensions.center.y, bbDimensions.center.z);
    [bbSphereMesh, box, nodeObj].forEach(threeEl => nGroup.add(threeEl));
    nGroup.userData = {
      id: `g1`,
      name: `g1`
    }
    this.threeCommon.scene.add(nGroup);
    this.dragableElem.push(nGroup.children[0]);
  }
  constructConnectionObjects() {
  }

  renderView() {
    this.threeCommon.renderer.render(this.threeCommon.scene, this.threeCommon.camera);
    window.requestAnimationFrame(this.renderView.bind(this));
  }

  ngOnDestroy(){
    this.threeService.cleanScene(this.threeCommon)
  }

}
