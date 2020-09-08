import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Globe from 'globe.gl';
@Component({
  selector: 'app-ct-globe-gl-intfrastructure',
  templateUrl: './ct-globe-gl-intfrastructure.component.html',
  styleUrls: ['./ct-globe-gl-intfrastructure.component.scss']
})
export class CtGlobeGlIntfrastructureComponent implements OnInit, AfterViewInit {
  @ViewChild('el', { static: false }) el: ElementRef;

  private readonly awsUsRegions = [
    {
      lat: 40.367474,
      lng: -82.996216,
      label: 'US East (Ohio)'
    },
    {
      lat: 37.926868,
      lng: -78.024902,
      label: 'US East (N. Virginia)'
    },
    {
      lat: 36.778259,
      lng: -119.417931,
      label: 'US West (N. California)'
    },
    {
      lat: 44.000000,
      lng: -120.500000,
      label: 'US West (Oregon)'
    }
  ];

  constructor() { }
  ngAfterViewInit(): void {
    this.constructGlobe()
  }
  constructGlobe() {
    const globe = Globe();
    globe(this.el.nativeElement)
      .globeImageUrl('assets/earth-dark.jpg')
      .pointsData(this.awsUsRegions)
      .pointAltitude(0.0005)
      .pointColor(() => '#007FFF')
      .pointRadius(.8)
      .pointResolution(2000)
      .onPointClick(function (point, event) {
        console.log(point, event, this)
      }).onPointHover(function (point, prevPoint) {
        console.log(point, prevPoint, this);

      })
  }

  ngOnInit() {
  }

}
