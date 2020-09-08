import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { ThreeConstants } from '../../interfaces/three-constants';
import { CtVisualizationService } from '../../services/ct-visualization.service';
import { GeoJson, GeoJsonResponse } from '../../interfaces/geo-json';
import { Subscription } from 'rxjs';
import { CtVisualizationRequestService } from '../../services/ct-visualization-request.service';
import ThreeGlobe from 'three-globe';
// import Globe from 'globe.gl';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

@Component({
  selector: 'app-ct-globe-infrastructure',
  templateUrl: './ct-globe-infrastructure.component.html',
  styleUrls: ['./ct-globe-infrastructure.component.scss']
})
export class CtGlobeInfrastructureComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvasEl', { read: ElementRef, static: false }) canvasEl: ElementRef;
  private threeConstants: ThreeConstants;

  private assetsGeoData: Array<GeoJson>;

  private filteredGlobeData: Array<{ lat: number, lng: number, label: string }>

  subscriptions: Array<Subscription> = [];
  tbControls: any;

  private readonly awsUsRegions = [
    {
      lat: 40.367474,
      lng: -82.996216,
      label: 'US East (Ohio)'
    },
    // {
    //   lat: 37.926868,
    //   lng: -78.024902,
    //   label: 'US East (N. Virginia)'
    // },
    // {
    //   lat: 36.778259,
    //   lng: -119.417931,
    //   label: 'US West (N. California)'
    // },
    // {
    //   lat: 44.000000,
    //   lng: -120.500000,
    //   label: 'US West (Oregon)'
    // }
  ];
  obControls: any;
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  enableRaycast: boolean;

  constructor(
    private ctVisualization: CtVisualizationService,
    private ctVisualizationRequest: CtVisualizationRequestService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.threeConstants = this.ctVisualization.generateThreeConstants();
    this.getAssetGeoData();
  }

  getAssetGeoData() {
    this.subscriptions.push(
      this.ctVisualizationRequest.getAssetsGeoData()
        .subscribe((response: GeoJsonResponse) => {
          if (response.features && response.features.length) {
            this.assetsGeoData = response.features;
            this.constructInfraGlobe();
          }
        })
    );
  }

  constructInfraGlobe() {
    this.formatGeoJsonResponse();
    const globe = new ThreeGlobe()
      .globeImageUrl('assets/earth-dark.jpg')
      .pointsData(this.awsUsRegions)
      .pointAltitude(0.0005)
      .pointColor(() => '#007FFF')
      .pointRadius(.8)
      .pointResolution(2000)

    this.threeConstants.scene.add(globe);
    this.configureSceneParameters();
    this.renderScene();
  }
  onPointClick(point) {
    console.log('point click');

  }

  private formatGeoJsonResponse() {
    this.filteredGlobeData = this.assetsGeoData
      .filter((location: GeoJson) => {
        return (location.geometry && location.geometry.coordinates && location.geometry.coordinates.length === 2);
      }).map((location: GeoJson) => {
        return {
          lat: location.geometry.coordinates[0],
          lng: location.geometry.coordinates[1],
          label: location.properties && location.properties['city'] ? location.properties['city'] : ''
        };
      });
  }

  configureSceneParameters() {
    this.threeConstants.scene.add(new THREE.AmbientLight(0xbbbbbb));
    this.threeConstants.scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

    this.threeConstants.renderer.setSize(window.innerWidth, (window.innerHeight));
    this.canvasEl.nativeElement.appendChild(this.threeConstants.renderer.domElement);

    // (this.threeConstants.camera as THREE.PerspectiveCamera).aspect = this.canvasEl.nativeElement.offsetWidth / this.canvasEl.nativeElement.offsetHeight;
    (this.threeConstants.camera as THREE.PerspectiveCamera).aspect = window.innerWidth / window.innerHeight;
    (this.threeConstants.camera as THREE.PerspectiveCamera).updateProjectionMatrix();
    this.threeConstants.camera.position.z = 500;

    // controls.
    // this.tbControls = new TrackballControls(this.threeConstants.camera, this.threeConstants.renderer.domElement);
    // this.tbControls.minDistance = 101;
    // this.tbControls.rotateSpeed = 5;
    // this.tbControls.zoomSpeed = 0.8;

    this.obControls = new OrbitControls(this.threeConstants.camera, this.threeConstants.renderer.domElement);
    this.obControls.minDistance = 101;
    this.obControls.rotateSpeed = 5;
    this.obControls.zoomSpeed = 0.8;

    // this.threeConstants.renderer.domElement.addEventListener('click', this.mouseMoveHandler.bind(this), false)
  }

  mouseMoveHandler(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    this.enableRaycast = true;
  }

  private raycastVisualization() {
    if (this.enableRaycast) {
      this.enableRaycast = false;
      this.raycaster.setFromCamera(this.mouse, this.threeConstants.camera);
      const intersects = this.raycaster.intersectObjects(this.threeConstants.scene.children, true);

      for (var i = 0; i < intersects.length; i++) {
        const changeProp = intersects[i].object &&
          intersects[i].object['material'] &&
          intersects[i].object['material'].color &&
          intersects[i].object['material'].color.set;
        if (changeProp) {
          console.log(changeProp, intersects[i]);
          intersects[i].object['material'].color.set('red');
        } else {
          console.log(changeProp, intersects[i]);
        }
      }
    }
  }

  renderScene() {
    this.obControls.update();
    this.raycastVisualization();
    this.threeConstants.renderer.render(this.threeConstants.scene, this.threeConstants.camera);
    window.requestAnimationFrame(this.renderScene.bind(this));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
