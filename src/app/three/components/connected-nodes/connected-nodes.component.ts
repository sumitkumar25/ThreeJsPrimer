import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ThreeService } from '../../services/three.service';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Colors } from 'src/app/common/enums/colors.enum';

@Component({
  selector: 'app-connected-nodes',
  templateUrl: './connected-nodes.component.html',
  styleUrls: ['./connected-nodes.component.scss']
})
export class ConnectedNodesComponent implements OnInit, AfterViewInit {
  threeCommon
  @ViewChild('canvasEl', { static: false }) canvasEl: ElementRef;

  nodes = [];
  mouse: THREE.Vector2;
  raycaster: THREE.Raycaster;

  constructor(private threeService: ThreeService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.threeCommon = this.threeService.getThreeCommon(this.canvasEl.nativeElement);
    this.initShapes();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
  }
  initShapes() {
    this.constructNodes();
    this.constructConnections();
    this.configureViewSettings();
    this.renderView();
  }
  configureViewSettings() {
    const light = new THREE.AmbientLight(0x404040); // soft white light
    this.threeCommon.scene.add(light);
    const controls = new OrbitControls(this.threeCommon.camera, this.threeCommon.renderer.domElement);

    //controls.update() must be called after any manual changes to the camera's transform
    this.threeCommon.camera.position.set(0, 0, 5);
    controls.update();
  }

  constructNodes() {
    const geometry = new THREE.SphereBufferGeometry();
    const material = new THREE.MeshPhongMaterial({ color: Colors.green });
    const node = new THREE.Mesh(geometry, material);
    this.threeCommon.scene.add(node);
    const geometry2 = new THREE.SphereBufferGeometry();
    const material2 = new THREE.MeshPhongMaterial({ color: Colors.yellow });
    const node2 = new THREE.Mesh(geometry2, material2);
    node2.position.x = 2;
    node.position.x = -2;0
    this.threeCommon.scene.add(node2)
    this.threeCommon.camera.position.z = 5;
  }
  constructConnections() {
    const material = new THREE.LineBasicMaterial({ color: Colors.red });
    var points = [];
    points.push(new THREE.Vector3(-1, 0, 0));
    points.push(new THREE.Vector3(1, 0, 0));
    var geometry = new THREE.BufferGeometry().setFromPoints(points);
    var line = new THREE.Line(geometry, material);
    this.threeCommon.scene.add(line);
  }
  renderView(arg?) {
    this.threeCommon.renderer.render(this.threeCommon.scene, this.threeCommon.camera);
    window.requestAnimationFrame(this.renderView.bind(this));
  }

  clickEventHandler(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.threeCommon.camera);

    // calculate objects intersecting the picking ray
    var intersects = this.raycaster.intersectObjects(this.threeCommon.scene.children);

    for (var i = 0; i < intersects.length; i++) {
      intersects[i].object['material'].color.set('black');
    }
    this.renderView();
  }

  hoverEventHandler(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.threeCommon.camera);

    // calculate objects intersecting the picking ray
    var intersects = this.raycaster.intersectObjects(this.threeCommon.scene.children);

    for (var i = 0; i < intersects.length; i++) {
      console.log(intersects[i].object['material'].color);

      intersects[i].object['material'].color.set('yellow');
    }
    this.renderView();
  }

  blurEventHandler($event) {
    this.initShapes();
    this.renderView();
  }

  resetEventHandler($event) {
    this.initShapes();
    this.renderView();
  }


}
