export interface GeoJsonResponse {
    features: Array<GeoJson>,
    type: string
}

export interface GeoJson {
    type: string;
    geometry: Geometry;
    properties: Properties;
}

export interface Geometry {
    type: string;
    coordinates: number[];
}

export interface Properties {
    name: string;
}
