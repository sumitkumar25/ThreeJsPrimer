import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from "@angular/core";
import * as THREE from "three";
import * as TrackballControls from "three-trackballcontrols";
import { ThreeService } from "../../services/three.service";

@Component({
  selector: "app-three-globe3d",
  templateUrl: "./three-globe3d.component.html",
  styleUrls: ["./three-globe3d.component.scss"],
})
export class ThreeGlobe3dComponent implements OnInit, OnDestroy {
  @ViewChild("canvasEl3d", { static: true }) canvasEl3d: ElementRef;
  scene;
  camera;
  renderer;
  controls;
  constructor(private threeService: ThreeService) {}

  ngOnInit() {
    this.init();
  }
  init() {
    const fov = 75;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 5;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.renderer = new THREE.WebGL1Renderer({
      canvas: this.canvasEl3d.nativeElement,
    });
    // set some defaults
    this.camera.position.z = 5;
    this.scene.background = new THREE.Color("white");
    this.render();
    //
    const loader = new THREE.TextureLoader();
    const texture = loader.load("assets/world.jpg", this.render.bind(this));
    const geometry = new THREE.SphereBufferGeometry(2, 64, 32);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    this.scene.add(new THREE.Mesh(geometry, material));

    // fetch data
    this.loadFile("assets/globe-data.asc")
      .then(this.parseData)
      .then(this.addBoxes.bind(this))
      .then(this.render.bind(this));
  }
  addBoxes(file: any) {
    const { min, max, data } = file;
    const range = max - min;
    const color = new THREE.Color();

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxBufferGeometry(boxWidth, boxHeight, boxDepth);

    // make it so it scales away from the positive Z axis
    geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0, 0.5));

    // these helpers will make it easy to position the boxes
    // We can rotate the lon helper on its Y axis to the longitude
    const lonHelper = new THREE.Object3D();
    this.scene.add(lonHelper);
    // We rotate the latHelper on its X axis to the latitude
    const latHelper = new THREE.Object3D();
    lonHelper.add(latHelper);
    // The position helper moves the object to the edge of the sphere
    const positionHelper = new THREE.Object3D();
    positionHelper.position.z = 2;
    latHelper.add(positionHelper);

    const lonFudge = Math.PI * 0.5;
    const latFudge = Math.PI * -0.135;
    data.forEach((row, latIndex) => {
      row.forEach((value, lonIndex) => {
        if (value === undefined) {
          return;
        }
        const amount = (value - min) / range;
        const material = new THREE.MeshBasicMaterial();
        //  TODO:experiment hue
        const hue = THREE.MathUtils.lerp(0.7, 0.3, amount);
        const saturation = 1;
        const lightness = THREE.MathUtils.lerp(0.1, 1.0, amount);
        material.color.setHSL(hue, saturation, lightness);

        const mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);

        lonHelper.rotation.y =
          THREE.MathUtils.degToRad(lonIndex + file.xllcorner) + lonFudge;
        latHelper.rotation.x =
          THREE.MathUtils.degToRad(latIndex + file.yllcorner) + latFudge;

        // use the world matrix of the position helper to
        // position this mesh.
        positionHelper.updateWorldMatrix(true, false);
        mesh.applyMatrix4(positionHelper.matrixWorld);

        mesh.scale.set(0.005, 0.005, THREE.MathUtils.lerp(0.01, 0.5, amount));
      });
    });
  }

  render() {
    this.setupViewSetting();
    this.renderer.render(this.scene, this.camera);
  }
  async loadFile(url) {
    const req = await fetch(url);
    return req.text();
  }

  parseData(text) {
    const data = [];
    const settings = { data };
    let max;
    let min;
    // split into lines
    text.split("\n").forEach((line) => {
      // split the line by whitespace
      const parts = line.trim().split(/\s+/);
      if (parts.length === 2) {
        // only 2 parts, must be a key/value pair
        settings[parts[0]] = parseFloat(parts[1]);
      } else if (parts.length > 2) {
        // more than 2 parts, must be data
        const values = parts.map((v) => {
          const value = parseFloat(v);
          if (value === settings["NODATA_value"]) {
            return undefined;
          }
          max = Math.max(max === undefined ? value : max, value);
          min = Math.min(min === undefined ? value : min, value);
          return value;
        });
        data.push(values);
      }
    });
    return Object.assign(settings, { min, max });
  }

  setupViewSetting() {
    // this.scene.background = new THREE.Color('black');
    this.scene.add(new THREE.AmbientLight(0xbbbbbb));
    this.scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

    // // Setup camera
    // this.camera.aspect = 2;
    // this.camera.updateProjectionMatrix();
    // this.camera.position.z = 500;

    // Add camera controls
    const tbControls = new TrackballControls(
      this.camera,
      this.renderer.domElement
    );
    tbControls.minDistance = 101;
    tbControls.rotateSpeed = 5;
    tbControls.zoomSpeed = 0.8;
  }

  ngOnDestroy(): void {
    this.threeService.cleanScene({
      scene: this.scene,
      camera: this.camera,
      renderer: this.renderer,
    });
  }
}
