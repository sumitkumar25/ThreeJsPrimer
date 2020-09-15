import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import ForceGraph3D from '3d-force-graph';

@Component({
  selector: 'app-force-graph',
  templateUrl: './force-graph.component.html',
  styleUrls: ['./force-graph.component.scss']
})
export class ForceGraphComponent implements OnInit, AfterViewInit {
  @ViewChild('el', { static: false }) el: ElementRef;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.createForceGraph()
  }
  createForceGraph() {
    const N = 300;
    const gData = {
      nodes: [...Array(N).keys()].map(i => ({ id: i })),
      links: [...Array(N).keys()]
        .filter(id => id)
        .map(id => ({
          source: id,
          target: Math.round(Math.random() * (id-1))
        }))
    };
    const Graph = ForceGraph3D()
      (this.el.nativeElement)
        .graphData(gData);
  }

}
