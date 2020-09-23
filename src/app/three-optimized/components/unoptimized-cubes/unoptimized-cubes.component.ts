import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ThreeService } from 'src/app/three/services/three.service';
import * as THREE from 'three';
import * as Stats from '../../../../../node_modules/stats.js/build/stats.min.js';
@Component({
  selector: 'app-unoptimized-cubes',
  templateUrl: './unoptimized-cubes.component.html',
  styleUrls: ['./unoptimized-cubes.component.scss']
})
export class UnoptimizedCubesComponent implements OnInit, AfterViewInit {
  mouse = new THREE.Vector2();
  stats: any;
  @HostListener('resize') resizeEvent() {
    this.threeCommon.camera.aspect = this.canvasEl.nativeElement.offsetWidth / this.canvasEl.nativeElement.offsetHeight;
    this.threeCommon.camera.updateProjectionMatrix();
    this.threeCommon.renderer.setSize(this.canvasEl.nativeElement.offsetWidth, this.canvasEl.nativeElement.offsetHeight);
  }

  @ViewChild('canvasEl', { static: false, read: ElementRef }) canvasEl: ElementRef;

  threeCommon: { scene: any, renderer: any, camera: any, controls: any };

  mesh: THREE.Mesh<THREE.BoxBufferGeometry, THREE.MeshBasicMaterial>;

  raycaster = new THREE.Raycaster();

  theta = 0;

  radius = 1000;

  intersected;

  constructor(private threeService: ThreeService) { }


  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.setUpStats();
    this.threeCommon = this.threeService.getThreeCommon(this.canvasEl.nativeElement);
    this.threeCommon.camera.position.z = 0;
    this.threeCommon.camera.aspect = this.canvasEl.nativeElement.offsetWidth / this.canvasEl.nativeElement.offsetHeight;
    this.threeCommon.renderer.setPixelRatio( window.devicePixelRatio );
    this.threeCommon.camera.updateProjectionMatrix();
    this.threeCommon.scene.background = new THREE.Color( 0xf0f0f0 );
    this.viewController();
  }

  mouseMoveHandler(event) {
    event.preventDefault();
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
  }
  setUpStats() {
    this.stats = new Stats();
    this.stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.stats.dom);
  }
  viewController() {
    const geometry = new THREE.BoxBufferGeometry(20, 20, 20);
    for (var i = 0; i < 2000; i++) {

      var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));

      object.position.x = Math.random() * this.canvasEl.nativeElement.offsetWidth - this.canvasEl.nativeElement.offsetHeight;
      object.position.y = Math.random() * this.canvasEl.nativeElement.offsetWidth - this.canvasEl.nativeElement.offsetHeight;
      object.position.z = Math.random() * this.canvasEl.nativeElement.offsetWidth - this.canvasEl.nativeElement.offsetHeight;

      object.rotation.x = Math.random() * 2 * Math.PI;
      object.rotation.y = Math.random() * 2 * Math.PI;
      object.rotation.z = Math.random() * 2 * Math.PI;

      object.scale.x = Math.random() + 0.5;
      object.scale.y = Math.random() + 0.5;
      object.scale.z = Math.random() + 0.5;

      this.threeCommon.scene.add(object);

    }
    this.renderView();
  }

  renderView(calleeAnimationFrame?) {
    this.theta += 0.01;
    this.threeCommon.camera.position.x = this.radius * Math.sin(THREE.MathUtils.degToRad(this.theta));
    this.threeCommon.camera.position.y = this.radius * Math.sin(THREE.MathUtils.degToRad(this.theta));
    this.threeCommon.camera.position.z = this.radius * Math.cos(THREE.MathUtils.degToRad(this.theta));
    this.threeCommon.camera.lookAt(this.threeCommon.scene.position);
       this.stats.update();
    this.raycaster.setFromCamera(this.mouse, this.threeCommon.camera);

    var intersects = this.raycaster.intersectObjects(this.threeCommon.scene.children);
    if (intersects.length > 0) {
      if (this.intersected != intersects[0].object) {
        if (this.intersected) this.intersected.material.emissive.setHex(this.intersected.currentHex);
        this.intersected = intersects[0].object;
        this.intersected.currentHex = this.intersected.material.emissive.getHex();
        this.intersected.material.emissive.setHex(0xff0000);

      }
    } else {
      if (this.intersected) this.intersected.material.emissive.setHex(this.intersected.currentHex);
      this.intersected = null;
    }
    // console.log(this.threeCommon.renderer.info.render.calls)
    this.threeCommon.renderer.render(this.threeCommon.scene, this.threeCommon.camera);
    window.requestAnimationFrame(this.renderView.bind(this));
  }

}
