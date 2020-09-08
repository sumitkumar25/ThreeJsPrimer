import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import ThreeGlobe from 'three-globe';
import { ThreeService } from '../../services/three.service';
import * as THREE from 'three';
import * as TrackballControls from 'three-trackballcontrols';
@Component({
  selector: 'app-globe-counteries',
  templateUrl: './globe-counteries.component.html',
  styleUrls: ['./globe-counteries.component.scss']
})
export class GlobeCounteriesComponent implements OnInit {
  @ViewChild('canvasEl', { static: false, read: ElementRef }) canvasEl: ElementRef;

  scene;
  camera;
  renderer;
  tbControls;
  constructor(private threeService: ThreeService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const threeConstants = this.threeService.getThreeCommon(this.canvasEl.nativeElement);
    // const threeConstants = this.threeService.getThreeCommonWindow();
    this.scene = threeConstants.scene;
    this.camera = threeConstants.camera;
    this.renderer = threeConstants.renderer;

    this.initGlobe();
    this.setupViewSetting();
    this.renderView();
  }
  setupViewSetting() {
    this.scene.add(new THREE.AmbientLight(0xbbbbbb));
    this.scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

    this.camera.aspect = this.canvasEl.nativeElement.offsetWidth / this.canvasEl.nativeElement.offsetHeight;
    this.camera.updateProjectionMatrix();
    this.camera.position.z = 500;

    // controls.
    this.tbControls = new TrackballControls(this.camera, this.renderer.domElement);
    this.tbControls.minDistance = 101;
    this.tbControls.rotateSpeed = 5;
    this.tbControls.zoomSpeed = 0.8;
  }

  initGlobe() {
    const gData = [...Array(300).keys()].map(() => ({
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      size: Math.random() / 3,
      color: ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
    }));
    const globe = new ThreeGlobe()
      .globeImageUrl('assets/earth-dark.jpg')
      .bumpImageUrl('assets/earth-topology.png')
      .pointsData(gData)
      // .pointAltitude('size')
      .pointAltitude(0)
      .pointColor('color')
      .labelsData(gData)
      .labelText(d => {
        const res = `(${Math.round(d['lat'] * 1e2) / 1e2}, ${Math.round(d['lng'] * 1e2) / 1e2})`;
        return res
      })
      .labelSize(2)
      .labelColor('color');
    // .labelDotRadius(d => d['size'] / 5)
    this.scene.add(globe);
    // setTimeout(() => {
    //   gData.forEach(d => d.size = Math.random());
    //   globe.pointsData(gData);
    // }, 4000);
  }

  renderView() {
    this.tbControls.update();
    this.renderer.render(this.scene, this.camera)
    window.requestAnimationFrame(this.renderView.bind(this));
  }
}

