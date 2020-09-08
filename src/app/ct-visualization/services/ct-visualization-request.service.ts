import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CtVisualizationRequestService {
  private ASSET_GEO_JSON_PATH = 'assets/capitals.geojson.json';
  constructor(private httpClient: HttpClient) { }

  getAssetsGeoData() {
    return this.httpClient.get(this.ASSET_GEO_JSON_PATH);
  }
}
