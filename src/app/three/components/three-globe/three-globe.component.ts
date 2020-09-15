import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ThreeService } from '../../services/three.service';

@Component({
  selector: 'app-three-globe',
  templateUrl: './three-globe.component.html',
  styleUrls: ['./three-globe.component.scss']
})
export class ThreeGlobeComponent implements OnInit {
  @ViewChild('canvasEl', { static: true }) canvasEl:ElementRef;
  @ViewChild('canvasEl3d', { static: true }) canvasEl3d:ElementRef;
  responseData
  parsedData: { data: any[]; } & { min: any; max: any; };
  constructor(private threeService:ThreeService) { }

  ngOnInit() {
    this.fetchGlobeData()
      .then(res => {
        this.responseData = res;
        this.parseData();
        this.draw2DRepresentation();
      }).catch(e => console.error(e));
  }
  draw2DRepresentation() {
    const { min, max, data } = this.parsedData;
    const range = max - min;
    const ctx = this.canvasEl.nativeElement.getContext('2d');
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(5, 5, ctx.canvas.width-5, ctx.canvas.height-5);
    data.forEach((row,latNdx) =>{
      row.forEach((value,longNdx)=>{
        if(value === undefined){
          return;
        }
        const amount = (value - min)/range;
        const hue =1;
        const saturation =1;
        const lightness = amount;
        ctx.fillStyle = this.hsl(hue,saturation,lightness);
        ctx.fillRect(longNdx*2,latNdx*2,2,2);
      })
    })
  }
  parseData() {
    const text = this.responseData;
    const data = [];
    const settings = { data };
    let max;
    let min;
    // split into lines
    text.split('\n').forEach((line) => {
      // split the line by whitespace
      const parts = line.trim().split(/\s+/);
      if (parts.length === 2) {
        // only 2 parts, must be a key/value pair
        settings[parts[0]] = parseFloat(parts[1]);
      } else if (parts.length > 2) {
        // more than 2 parts, must be data
        const values = parts.map((v) => {
          const value = parseFloat(v);
          if (value === settings['NODATA_value']) {
            return undefined;
          }
          max = Math.max(max === undefined ? value : max, value);
          min = Math.min(min === undefined ? value : min, value);
          return value;
        });
        data.push(values);
      }
    });
    this.parsedData = Object.assign(settings, { min, max });
  }
  async fetchGlobeData() {
    const data = await fetch('assets/globe-data.asc')
    return data.text();
  }
  hsl(h,s,l){
    return `hsl(${h * 360 | 0},${s * 100 | 0}%,${l * 100 | 0}%)`;
  }
}
