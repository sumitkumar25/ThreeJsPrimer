import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-canvas-connected-nodes',
  templateUrl: './canvas-connected-nodes.component.html',
  styleUrls: ['./canvas-connected-nodes.component.scss']
})
export class CanvasConnectedNodesComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasEl', { static: false }) canvasEl: ElementRef;
  ctx;
  connections: Path2D[];
  constructor() { }
  nodes = [];
  ngOnInit() {
  }

  ngAfterViewInit() {
    this.ctx = this.canvasEl.nativeElement.getContext('2d');
    this.drawShapes();
  }
  drawShapes() {
    this.drawNodes();
    this.drawConnections();
  }
  drawNodes() {
    const circle = new Path2D();
    circle.arc(100, 100, 50, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'green';
    this.ctx.fill(circle);

    const circle2 = new Path2D();
    circle2.arc(400, 100, 50, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'blue';
    this.ctx.fill(circle2);
    this.nodes = [circle, circle2];

  }
  drawConnections() {
    const line = new Path2D();
    line.moveTo(160, 100);
    line.lineTo(340, 100)
    this.ctx.strokeStyle = 'red';
    this.ctx.stroke(line);
    this.connections = [line]
  }

  clickEventHandler($event) {
    this.connections.forEach(connection => {
      if(this.ctx.isPointInStroke(connection, $event.offsetX, $event.offsetY)){
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke(connection);
      }
    })
    this.nodes.forEach(n => {
      if(this.ctx.isPointInPath(n, $event.offsetX, $event.offsetY)){
        this.ctx.fillStyle = 'black';
        this.ctx.fill(n);
      }
    })
  }

  resetEventHandler(){
    this.drawShapes();
  }





}
