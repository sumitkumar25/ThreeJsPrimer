import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from } from "rxjs";
import { OBJLoader } from "./../../../../node_modules/three/examples/jsm/loaders/OBJLoader";

@Injectable({
  providedIn: "root",
})
export class NetworkGraphRequestService {
  private GEOMETRY_URL = "assets/network-graph/geometry/node.obj";
  private MOCK_GROUPS_URL = "assets/network-graph/server/groups.json";
  constructor(private httpClient: HttpClient) {}

  getNodeMesh() {
    return from(new OBJLoader().loadAsync(this.GEOMETRY_URL));
  }

  getGroups() {
    return this.httpClient.get(this.MOCK_GROUPS_URL);
  }
}
