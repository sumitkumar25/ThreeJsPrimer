import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ThreeService } from '../../services/three.service';

@Component({
  selector: 'app-instance-mesh',
  templateUrl: './instance-mesh.component.html',
  styleUrls: ['./instance-mesh.component.scss']
})
export class InstanceMeshComponent implements OnInit {
  @ViewChild('canvasEl', { static: true }) canvasEl: ElementRef;

  threeCommon: { scene: any, renderer: any, camera: any, controls: any };
  constructor(private threeService: ThreeService) { }

  ngOnInit() {
    this.threeCommon = this.threeService.getThreeCommon(this.canvasEl.nativeElement);
    this.threeCommon.camera.fov = 50;
    this.threeCommon.camera.position.z = 550;
    this.threeCommon.camera.updateProjectionMatrix();
  }

  renderView() {
    this.threeCommon.renderer.render(this.threeCommon.scene, this.threeCommon.camera)
  }

}
