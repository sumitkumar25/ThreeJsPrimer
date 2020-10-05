import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ThreeService } from "src/app/three/services/three.service";
import * as THREE from "three";
import * as random from "random";

@Component({
  selector: "app-instanced-spheres",
  templateUrl: "./instanced-spheres.component.html",
  styleUrls: ["./instanced-spheres.component.scss"],
})
export class InstancedSpheresComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("canvasEl", { static: false, read: ElementRef })
  canvasEl: ElementRef;

  threeCommon: { scene: any; renderer: any; camera: any; controls: any };
  instanceCount: number;
  instancedGeometry: THREE.InstancedBufferGeometry;

  vertexShader;
  fragmentShader;

  constructor(private threeService: ThreeService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.threeCommon = this.threeService.getThreeCommon(
      this.canvasEl.nativeElement
    );
    this.threeCommon.camera.position.z = 50;
    this.sceneController();
  }
  sceneController() {
    this.configureShaders();
    let baseGeometry = new THREE.SphereBufferGeometry(3);
    this.instancedGeometry = new THREE.InstancedBufferGeometry().copy(
      baseGeometry
    );
    this.instanceCount = 7000;
    this.instancedGeometry.instanceCount = this.instanceCount;
    let material = new THREE.ShaderMaterial({
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader,
      uniforms: {
        uTime: new THREE.Uniform(0),
      },
    });
    let mesh = new THREE.Mesh(this.instancedGeometry, material);
    this.threeCommon.scene.add(mesh);
    this.configureInstanceAttributes();

    this.renderView();
  }
  configureShaders() {
    this.vertexShader = `
    #define PI (3.14159265358979323846)
    attribute vec4 aCurve;
    uniform float uTime;

    attribute vec3 aColor;
    varying vec3 vColor;

    vec3 getCurvePosition(float progress, float radius, float offset){
      vec3 pos = vec3(0.);
      pos.x += cos(progress *PI *8.) * radius ;
      pos.y += sin(progress *PI *8.) * radius + sin(progress * PI *2.) * 30.;
      pos.z += progress *200. - 200./2. + offset;
      return pos;
    }
    void main(){
      vec3 transformed = position;
      
      // 2. Extract values from attribute
      float aRadius = aCurve.x;
      float aZOffset = aCurve.z;
      float aSpeed = aCurve.w;
      float aProgress = mod(aCurve.y + uTime * aSpeed, 1.);
      
      // 3. Get position and add it to the final position
      vec3 curvePosition = getCurvePosition(aProgress, aRadius, aZOffset);
      transformed += curvePosition;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.);
      vColor = aColor;
    }
    `;

    this.fragmentShader = `
    varying vec3 vColor;
    void main(){
      gl_FragColor = vec4(vColor, 1.);
    }
    `;
  }
  configureInstanceAttributes() {
    let aColor = [];
    let colors = [
      new THREE.Color("#ff3030"),
      new THREE.Color("#0000ff"),
      new THREE.Color("#00ff99"),
    ];
    let aCurve = [];

    for (let i = 0; i < this.instanceCount; i++) {
      let radius = random.float(10, 20);
      let zOffset = random.float(-5, 5);
      let progress = random.float();
      let speed = random.float(0.02, 0.07);
      aCurve.push(radius, progress, zOffset, speed);

      let color = colors[random.int(0, colors.length - 1)];
      aColor.push(color.r, color.g, color.b);
    }
    let aCurveFloat32 = new Float32Array(aCurve);
    this.instancedGeometry.setAttribute(
      "aCurve",
      new THREE.InstancedBufferAttribute(aCurveFloat32, 4, false)
    );

    const f32 = new Float32Array(aColor);
    this.instancedGeometry.setAttribute(
      "aColor",
      new THREE.InstancedBufferAttribute(f32, 3, false)
    );

    // sphere props.
  }

  renderView() {
    this.threeCommon.renderer.render(
      this.threeCommon.scene,
      this.threeCommon.camera
    );
    window.requestAnimationFrame(this.renderView.bind(this));
  }
  ngOnDestroy(): void {
    this.threeService.cleanScene(this.threeCommon);
  }
}
