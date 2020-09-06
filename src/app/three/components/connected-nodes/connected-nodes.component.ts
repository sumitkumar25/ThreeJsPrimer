import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ThreeService } from '../../services/three.service';
import * as THREE from 'three';

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
    this.renderView();
  }

  constructNodes() {
    const geometry = new THREE.SphereBufferGeometry(.5);
    const material = new THREE.MeshBasicMaterial({ color: 'blue' });
    const node = new THREE.Mesh(geometry, material);
    this.threeCommon.scene.add(node);
    const geometry2 = new THREE.SphereBufferGeometry(.5);
    const material2 = new THREE.MeshBasicMaterial({ color: 'green' });
    const node2 = new THREE.Mesh(geometry2, material2);
    node2.position.x = 2;
    node.position.x = -2;
    this.threeCommon.scene.add(node2)
  }
  constructConnections() {
    const material = new THREE.LineBasicMaterial({ color: 'red' });
    var points = [];
    points.push(new THREE.Vector3(-1, 0, 0));
    points.push(new THREE.Vector3(1, 0, 0));
    var geometry = new THREE.BufferGeometry().setFromPoints(points);
    var line = new THREE.Line(geometry, material);
    this.threeCommon.scene.add(line);
  }
  renderView(arg?) {
    this.threeCommon.renderer.render(this.threeCommon.scene, this.threeCommon.camera);
  }

  clickEventHandler(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.threeCommon.camera);

    // calculate objects intersecting the picking ray
    var intersects = this.raycaster.intersectObjects(this.threeCommon.scene.children);

    for (var i = 0; i < intersects.length; i++) {
      intersects[ i ].object['material'].color.set( 'black' );
    }
    this.renderView();
  }

  hoverEventHandler(event){
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mouse, this.threeCommon.camera);

    // calculate objects intersecting the picking ray
    var intersects = this.raycaster.intersectObjects(this.threeCommon.scene.children);

    for (var i = 0; i < intersects.length; i++) {
      console.log(intersects[ i ].object['material'].color );
      
      intersects[ i ].object['material'].color.set( 'yellow' );
    }
    this.renderView();
  }

  blurEventHandler($event){    
    this.initShapes();
    this.renderView(); 
  }

  resetEventHandler($event){
    this.initShapes();
    this.renderView();
  }
}
