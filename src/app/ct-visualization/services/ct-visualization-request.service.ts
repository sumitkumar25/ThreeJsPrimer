import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CtVisualizationRequestService {
  STATE_CAPITALS_PATH: string ='assets/usa-capitals.geojson.json';
  private ASSET_GEO_JSON_PATH = 'assets/capitals.geojson.json';
  constructor(private httpClient: HttpClient) { }

  getAssetsGeoData() {
    return this.httpClient.get(this.ASSET_GEO_JSON_PATH);
  }
  getStateCapitals() {
    return this.httpClient.get(this.STATE_CAPITALS_PATH);
  }
}
