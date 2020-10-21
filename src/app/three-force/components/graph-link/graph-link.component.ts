import ForceGraph3D from "3d-force-graph";
import { AfterViewInit, Component, OnInit } from "@angular/core";

@Component({
  selector: "app-graph-link",
  templateUrl: "./graph-link.component.html",
  styleUrls: ["./graph-link.component.scss"],
})
export class GraphLinkComponent implements OnInit, AfterViewInit {
  N = 2;
  gData = {
    nodes: [...Array(this.N).keys()].map((i) => ({ id: i })),
    links: [...Array(this.N).keys()]
      .filter((id) => id)
      .map((id) => ({
        source: id,
        target: Math.round(Math.random() * (id - 1)),
      })),
  };
  Graph: any;
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.renderGraph();
  }

  renderGraph() {
    // cross-link node objects
    this.gData["links"].forEach((link) => {
      const a = this.gData.nodes[link.source];
      const b = this.gData.nodes[link.target];
      !a["neighbors"] && (a["neighbors"] = []);
      !b["neighbors"] && (b["neighbors"] = []);
      a["neighbors"].push(b);
      b["neighbors"].push(a);

      !a["links"] && (a["links"] = []);
      !b["links"] && (b["links"] = []);
      a["links"].push(link);
      b["links"].push(link);
    });

    const highlightNodes = new Set();
    const highlightLinks = new Set();
    let hoverNode = null;

     this.Graph = ForceGraph3D()
     (document.getElementById('graph'))
      .graphData(this.gData)
      .nodeColor((node) =>
        highlightNodes.has(node)
          ? node === hoverNode
            ? "rgb(255,0,0,1)"
            : "rgba(255,160,0,0.8)"
          : "rgba(0,255,255,0.6)"
      )
      .linkWidth((link) => (highlightLinks.has(link) ? 4 : 1))
      .linkDirectionalParticles((link) => (highlightLinks.has(link) ? 4 : 0))
      .linkDirectionalParticleWidth(4)
      .onNodeHover((node) => {
        // no state change
        if ((!node && !highlightNodes.size) || (node && hoverNode === node))
          return;

        highlightNodes.clear();
        highlightLinks.clear();
        if (node) {
          highlightNodes.add(node);
          node["neighbors"].forEach((neighbor) => highlightNodes.add(neighbor));
          node["links"].forEach((link) => highlightLinks.add(link));
        }

        hoverNode = node || null;

        this.updateHighlight();
      })
      .onLinkHover((link) => {
        highlightNodes.clear();
        highlightLinks.clear();

        if (link) {
          highlightLinks.add(link);
          highlightNodes.add(link['source']);
          highlightNodes.add(link['target']);
        }

        this.updateHighlight();
      });
  }
  updateHighlight() {
    // trigger update of highlighted objects in scene
    this.Graph
      .nodeColor(this.Graph.nodeColor())
      .linkWidth(this.Graph.linkWidth())
      .linkDirectionalParticles(this.Graph.linkDirectionalParticles());
  }
}
