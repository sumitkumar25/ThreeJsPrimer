(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~ct-visualization-ct-visualization-module-ngfactory~three-three-module-ngfactory"],{

/***/ "./node_modules/@turf/boolean-point-in-polygon/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@turf/boolean-point-in-polygon/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var invariant_1 = __webpack_require__(/*! @turf/invariant */ "./node_modules/@turf/invariant/index.js");
// http://en.wikipedia.org/wiki/Even%E2%80%93odd_rule
// modified from: https://github.com/substack/point-in-polygon/blob/master/index.js
// which was modified from http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
/**
 * Takes a {@link Point} and a {@link Polygon} or {@link MultiPolygon} and determines if the point
 * resides inside the polygon. The polygon can be convex or concave. The function accounts for holes.
 *
 * @name booleanPointInPolygon
 * @param {Coord} point input point
 * @param {Feature<Polygon|MultiPolygon>} polygon input polygon or multipolygon
 * @param {Object} [options={}] Optional parameters
 * @param {boolean} [options.ignoreBoundary=false] True if polygon boundary should be ignored when determining if
 * the point is inside the polygon otherwise false.
 * @returns {boolean} `true` if the Point is inside the Polygon; `false` if the Point is not inside the Polygon
 * @example
 * var pt = turf.point([-77, 44]);
 * var poly = turf.polygon([[
 *   [-81, 41],
 *   [-81, 47],
 *   [-72, 47],
 *   [-72, 41],
 *   [-81, 41]
 * ]]);
 *
 * turf.booleanPointInPolygon(pt, poly);
 * //= true
 */
function booleanPointInPolygon(point, polygon, options) {
    if (options === void 0) { options = {}; }
    // validation
    if (!point) {
        throw new Error("point is required");
    }
    if (!polygon) {
        throw new Error("polygon is required");
    }
    var pt = invariant_1.getCoord(point);
    var geom = invariant_1.getGeom(polygon);
    var type = geom.type;
    var bbox = polygon.bbox;
    var polys = geom.coordinates;
    // Quick elimination if point is not inside bbox
    if (bbox && inBBox(pt, bbox) === false) {
        return false;
    }
    // normalize to multipolygon
    if (type === "Polygon") {
        polys = [polys];
    }
    var insidePoly = false;
    for (var i = 0; i < polys.length && !insidePoly; i++) {
        // check if it is in the outer ring first
        if (inRing(pt, polys[i][0], options.ignoreBoundary)) {
            var inHole = false;
            var k = 1;
            // check for the point in any of the holes
            while (k < polys[i].length && !inHole) {
                if (inRing(pt, polys[i][k], !options.ignoreBoundary)) {
                    inHole = true;
                }
                k++;
            }
            if (!inHole) {
                insidePoly = true;
            }
        }
    }
    return insidePoly;
}
exports.default = booleanPointInPolygon;
/**
 * inRing
 *
 * @private
 * @param {Array<number>} pt [x,y]
 * @param {Array<Array<number>>} ring [[x,y], [x,y],..]
 * @param {boolean} ignoreBoundary ignoreBoundary
 * @returns {boolean} inRing
 */
function inRing(pt, ring, ignoreBoundary) {
    var isInside = false;
    if (ring[0][0] === ring[ring.length - 1][0] && ring[0][1] === ring[ring.length - 1][1]) {
        ring = ring.slice(0, ring.length - 1);
    }
    for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        var xi = ring[i][0];
        var yi = ring[i][1];
        var xj = ring[j][0];
        var yj = ring[j][1];
        var onBoundary = (pt[1] * (xi - xj) + yi * (xj - pt[0]) + yj * (pt[0] - xi) === 0) &&
            ((xi - pt[0]) * (xj - pt[0]) <= 0) && ((yi - pt[1]) * (yj - pt[1]) <= 0);
        if (onBoundary) {
            return !ignoreBoundary;
        }
        var intersect = ((yi > pt[1]) !== (yj > pt[1])) &&
            (pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi);
        if (intersect) {
            isInside = !isInside;
        }
    }
    return isInside;
}
/**
 * inBBox
 *
 * @private
 * @param {Position} pt point [x,y]
 * @param {BBox} bbox BBox [west, south, east, north]
 * @returns {boolean} true/false if point is inside BBox
 */
function inBBox(pt, bbox) {
    return bbox[0] <= pt[0] &&
        bbox[1] <= pt[1] &&
        bbox[2] >= pt[0] &&
        bbox[3] >= pt[1];
}


/***/ }),

/***/ "./node_modules/@turf/helpers/index.js":
/*!*********************************************!*\
  !*** ./node_modules/@turf/helpers/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module helpers
 */
/**
 * Earth Radius used with the Harvesine formula and approximates using a spherical (non-ellipsoid) Earth.
 *
 * @memberof helpers
 * @type {number}
 */
exports.earthRadius = 6371008.8;
/**
 * Unit of measurement factors using a spherical (non-ellipsoid) earth radius.
 *
 * @memberof helpers
 * @type {Object}
 */
exports.factors = {
    centimeters: exports.earthRadius * 100,
    centimetres: exports.earthRadius * 100,
    degrees: exports.earthRadius / 111325,
    feet: exports.earthRadius * 3.28084,
    inches: exports.earthRadius * 39.370,
    kilometers: exports.earthRadius / 1000,
    kilometres: exports.earthRadius / 1000,
    meters: exports.earthRadius,
    metres: exports.earthRadius,
    miles: exports.earthRadius / 1609.344,
    millimeters: exports.earthRadius * 1000,
    millimetres: exports.earthRadius * 1000,
    nauticalmiles: exports.earthRadius / 1852,
    radians: 1,
    yards: exports.earthRadius / 1.0936,
};
/**
 * Units of measurement factors based on 1 meter.
 *
 * @memberof helpers
 * @type {Object}
 */
exports.unitsFactors = {
    centimeters: 100,
    centimetres: 100,
    degrees: 1 / 111325,
    feet: 3.28084,
    inches: 39.370,
    kilometers: 1 / 1000,
    kilometres: 1 / 1000,
    meters: 1,
    metres: 1,
    miles: 1 / 1609.344,
    millimeters: 1000,
    millimetres: 1000,
    nauticalmiles: 1 / 1852,
    radians: 1 / exports.earthRadius,
    yards: 1 / 1.0936,
};
/**
 * Area of measurement factors based on 1 square meter.
 *
 * @memberof helpers
 * @type {Object}
 */
exports.areaFactors = {
    acres: 0.000247105,
    centimeters: 10000,
    centimetres: 10000,
    feet: 10.763910417,
    inches: 1550.003100006,
    kilometers: 0.000001,
    kilometres: 0.000001,
    meters: 1,
    metres: 1,
    miles: 3.86e-7,
    millimeters: 1000000,
    millimetres: 1000000,
    yards: 1.195990046,
};
/**
 * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
 *
 * @name feature
 * @param {Geometry} geometry input geometry
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature} a GeoJSON Feature
 * @example
 * var geometry = {
 *   "type": "Point",
 *   "coordinates": [110, 50]
 * };
 *
 * var feature = turf.feature(geometry);
 *
 * //=feature
 */
function feature(geom, properties, options) {
    if (options === void 0) { options = {}; }
    var feat = { type: "Feature" };
    if (options.id === 0 || options.id) {
        feat.id = options.id;
    }
    if (options.bbox) {
        feat.bbox = options.bbox;
    }
    feat.properties = properties || {};
    feat.geometry = geom;
    return feat;
}
exports.feature = feature;
/**
 * Creates a GeoJSON {@link Geometry} from a Geometry string type & coordinates.
 * For GeometryCollection type use `helpers.geometryCollection`
 *
 * @name geometry
 * @param {string} type Geometry Type
 * @param {Array<any>} coordinates Coordinates
 * @param {Object} [options={}] Optional Parameters
 * @returns {Geometry} a GeoJSON Geometry
 * @example
 * var type = "Point";
 * var coordinates = [110, 50];
 * var geometry = turf.geometry(type, coordinates);
 * // => geometry
 */
function geometry(type, coordinates, options) {
    if (options === void 0) { options = {}; }
    switch (type) {
        case "Point": return point(coordinates).geometry;
        case "LineString": return lineString(coordinates).geometry;
        case "Polygon": return polygon(coordinates).geometry;
        case "MultiPoint": return multiPoint(coordinates).geometry;
        case "MultiLineString": return multiLineString(coordinates).geometry;
        case "MultiPolygon": return multiPolygon(coordinates).geometry;
        default: throw new Error(type + " is invalid");
    }
}
exports.geometry = geometry;
/**
 * Creates a {@link Point} {@link Feature} from a Position.
 *
 * @name point
 * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Point>} a Point feature
 * @example
 * var point = turf.point([-75.343, 39.984]);
 *
 * //=point
 */
function point(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "Point",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.point = point;
/**
 * Creates a {@link Point} {@link FeatureCollection} from an Array of Point coordinates.
 *
 * @name points
 * @param {Array<Array<number>>} coordinates an array of Points
 * @param {Object} [properties={}] Translate these properties to each Feature
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
 * associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Point>} Point Feature
 * @example
 * var points = turf.points([
 *   [-75, 39],
 *   [-80, 45],
 *   [-78, 50]
 * ]);
 *
 * //=points
 */
function points(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return point(coords, properties);
    }), options);
}
exports.points = points;
/**
 * Creates a {@link Polygon} {@link Feature} from an Array of LinearRings.
 *
 * @name polygon
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Polygon>} Polygon Feature
 * @example
 * var polygon = turf.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
 *
 * //=polygon
 */
function polygon(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    for (var _i = 0, coordinates_1 = coordinates; _i < coordinates_1.length; _i++) {
        var ring = coordinates_1[_i];
        if (ring.length < 4) {
            throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
        }
        for (var j = 0; j < ring[ring.length - 1].length; j++) {
            // Check if first point of Polygon contains two numbers
            if (ring[ring.length - 1][j] !== ring[0][j]) {
                throw new Error("First and last Position are not equivalent.");
            }
        }
    }
    var geom = {
        type: "Polygon",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.polygon = polygon;
/**
 * Creates a {@link Polygon} {@link FeatureCollection} from an Array of Polygon coordinates.
 *
 * @name polygons
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygon coordinates
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Polygon>} Polygon FeatureCollection
 * @example
 * var polygons = turf.polygons([
 *   [[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]],
 *   [[[-15, 42], [-14, 46], [-12, 41], [-17, 44], [-15, 42]]],
 * ]);
 *
 * //=polygons
 */
function polygons(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return polygon(coords, properties);
    }), options);
}
exports.polygons = polygons;
/**
 * Creates a {@link LineString} {@link Feature} from an Array of Positions.
 *
 * @name lineString
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<LineString>} LineString Feature
 * @example
 * var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], {name: 'line 1'});
 * var linestring2 = turf.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], {name: 'line 2'});
 *
 * //=linestring1
 * //=linestring2
 */
function lineString(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    if (coordinates.length < 2) {
        throw new Error("coordinates must be an array of two or more positions");
    }
    var geom = {
        type: "LineString",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.lineString = lineString;
/**
 * Creates a {@link LineString} {@link FeatureCollection} from an Array of LineString coordinates.
 *
 * @name lineStrings
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
 * associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<LineString>} LineString FeatureCollection
 * @example
 * var linestrings = turf.lineStrings([
 *   [[-24, 63], [-23, 60], [-25, 65], [-20, 69]],
 *   [[-14, 43], [-13, 40], [-15, 45], [-10, 49]]
 * ]);
 *
 * //=linestrings
 */
function lineStrings(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return lineString(coords, properties);
    }), options);
}
exports.lineStrings = lineStrings;
/**
 * Takes one or more {@link Feature|Features} and creates a {@link FeatureCollection}.
 *
 * @name featureCollection
 * @param {Feature[]} features input features
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {FeatureCollection} FeatureCollection of Features
 * @example
 * var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});
 * var locationB = turf.point([-75.833, 39.284], {name: 'Location B'});
 * var locationC = turf.point([-75.534, 39.123], {name: 'Location C'});
 *
 * var collection = turf.featureCollection([
 *   locationA,
 *   locationB,
 *   locationC
 * ]);
 *
 * //=collection
 */
function featureCollection(features, options) {
    if (options === void 0) { options = {}; }
    var fc = { type: "FeatureCollection" };
    if (options.id) {
        fc.id = options.id;
    }
    if (options.bbox) {
        fc.bbox = options.bbox;
    }
    fc.features = features;
    return fc;
}
exports.featureCollection = featureCollection;
/**
 * Creates a {@link Feature<MultiLineString>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiLineString
 * @param {Array<Array<Array<number>>>} coordinates an array of LineStrings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiLineString>} a MultiLineString feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiLine = turf.multiLineString([[[0,0],[10,10]]]);
 *
 * //=multiLine
 */
function multiLineString(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiLineString",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.multiLineString = multiLineString;
/**
 * Creates a {@link Feature<MultiPoint>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPoint
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPoint>} a MultiPoint feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPt = turf.multiPoint([[0,0],[10,10]]);
 *
 * //=multiPt
 */
function multiPoint(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiPoint",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.multiPoint = multiPoint;
/**
 * Creates a {@link Feature<MultiPolygon>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPolygon
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygons
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPolygon>} a multipolygon feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPoly = turf.multiPolygon([[[[0,0],[0,10],[10,10],[10,0],[0,0]]]]);
 *
 * //=multiPoly
 *
 */
function multiPolygon(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiPolygon",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.multiPolygon = multiPolygon;
/**
 * Creates a {@link Feature<GeometryCollection>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name geometryCollection
 * @param {Array<Geometry>} geometries an array of GeoJSON Geometries
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<GeometryCollection>} a GeoJSON GeometryCollection Feature
 * @example
 * var pt = turf.geometry("Point", [100, 0]);
 * var line = turf.geometry("LineString", [[101, 0], [102, 1]]);
 * var collection = turf.geometryCollection([pt, line]);
 *
 * // => collection
 */
function geometryCollection(geometries, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "GeometryCollection",
        geometries: geometries,
    };
    return feature(geom, properties, options);
}
exports.geometryCollection = geometryCollection;
/**
 * Round number to precision
 *
 * @param {number} num Number
 * @param {number} [precision=0] Precision
 * @returns {number} rounded number
 * @example
 * turf.round(120.4321)
 * //=120
 *
 * turf.round(120.4321, 2)
 * //=120.43
 */
function round(num, precision) {
    if (precision === void 0) { precision = 0; }
    if (precision && !(precision >= 0)) {
        throw new Error("precision must be a positive number");
    }
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(num * multiplier) / multiplier;
}
exports.round = round;
/**
 * Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name radiansToLength
 * @param {number} radians in radians across the sphere
 * @param {string} [units="kilometers"] can be degrees, radians, miles, or kilometers inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} distance
 */
function radiansToLength(radians, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = exports.factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return radians * factor;
}
exports.radiansToLength = radiansToLength;
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name lengthToRadians
 * @param {number} distance in real units
 * @param {string} [units="kilometers"] can be degrees, radians, miles, or kilometers inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} radians
 */
function lengthToRadians(distance, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = exports.factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return distance / factor;
}
exports.lengthToRadians = lengthToRadians;
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into degrees
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, centimeters, kilometres, feet
 *
 * @name lengthToDegrees
 * @param {number} distance in real units
 * @param {string} [units="kilometers"] can be degrees, radians, miles, or kilometers inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} degrees
 */
function lengthToDegrees(distance, units) {
    return radiansToDegrees(lengthToRadians(distance, units));
}
exports.lengthToDegrees = lengthToDegrees;
/**
 * Converts any bearing angle from the north line direction (positive clockwise)
 * and returns an angle between 0-360 degrees (positive clockwise), 0 being the north line
 *
 * @name bearingToAzimuth
 * @param {number} bearing angle, between -180 and +180 degrees
 * @returns {number} angle between 0 and 360 degrees
 */
function bearingToAzimuth(bearing) {
    var angle = bearing % 360;
    if (angle < 0) {
        angle += 360;
    }
    return angle;
}
exports.bearingToAzimuth = bearingToAzimuth;
/**
 * Converts an angle in radians to degrees
 *
 * @name radiansToDegrees
 * @param {number} radians angle in radians
 * @returns {number} degrees between 0 and 360 degrees
 */
function radiansToDegrees(radians) {
    var degrees = radians % (2 * Math.PI);
    return degrees * 180 / Math.PI;
}
exports.radiansToDegrees = radiansToDegrees;
/**
 * Converts an angle in degrees to radians
 *
 * @name degreesToRadians
 * @param {number} degrees angle between 0 and 360 degrees
 * @returns {number} angle in radians
 */
function degreesToRadians(degrees) {
    var radians = degrees % 360;
    return radians * Math.PI / 180;
}
exports.degreesToRadians = degreesToRadians;
/**
 * Converts a length to the requested unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @param {number} length to be converted
 * @param {Units} [originalUnit="kilometers"] of the length
 * @param {Units} [finalUnit="kilometers"] returned unit
 * @returns {number} the converted length
 */
function convertLength(length, originalUnit, finalUnit) {
    if (originalUnit === void 0) { originalUnit = "kilometers"; }
    if (finalUnit === void 0) { finalUnit = "kilometers"; }
    if (!(length >= 0)) {
        throw new Error("length must be a positive number");
    }
    return radiansToLength(lengthToRadians(length, originalUnit), finalUnit);
}
exports.convertLength = convertLength;
/**
 * Converts a area to the requested unit.
 * Valid units: kilometers, kilometres, meters, metres, centimetres, millimeters, acres, miles, yards, feet, inches
 * @param {number} area to be converted
 * @param {Units} [originalUnit="meters"] of the distance
 * @param {Units} [finalUnit="kilometers"] returned unit
 * @returns {number} the converted distance
 */
function convertArea(area, originalUnit, finalUnit) {
    if (originalUnit === void 0) { originalUnit = "meters"; }
    if (finalUnit === void 0) { finalUnit = "kilometers"; }
    if (!(area >= 0)) {
        throw new Error("area must be a positive number");
    }
    var startFactor = exports.areaFactors[originalUnit];
    if (!startFactor) {
        throw new Error("invalid original units");
    }
    var finalFactor = exports.areaFactors[finalUnit];
    if (!finalFactor) {
        throw new Error("invalid final units");
    }
    return (area / startFactor) * finalFactor;
}
exports.convertArea = convertArea;
/**
 * isNumber
 *
 * @param {*} num Number to validate
 * @returns {boolean} true/false
 * @example
 * turf.isNumber(123)
 * //=true
 * turf.isNumber('foo')
 * //=false
 */
function isNumber(num) {
    return !isNaN(num) && num !== null && !Array.isArray(num) && !/^\s*$/.test(num);
}
exports.isNumber = isNumber;
/**
 * isObject
 *
 * @param {*} input variable to validate
 * @returns {boolean} true/false
 * @example
 * turf.isObject({elevation: 10})
 * //=true
 * turf.isObject('foo')
 * //=false
 */
function isObject(input) {
    return (!!input) && (input.constructor === Object);
}
exports.isObject = isObject;
/**
 * Validate BBox
 *
 * @private
 * @param {Array<number>} bbox BBox to validate
 * @returns {void}
 * @throws Error if BBox is not valid
 * @example
 * validateBBox([-180, -40, 110, 50])
 * //=OK
 * validateBBox([-180, -40])
 * //=Error
 * validateBBox('Foo')
 * //=Error
 * validateBBox(5)
 * //=Error
 * validateBBox(null)
 * //=Error
 * validateBBox(undefined)
 * //=Error
 */
function validateBBox(bbox) {
    if (!bbox) {
        throw new Error("bbox is required");
    }
    if (!Array.isArray(bbox)) {
        throw new Error("bbox must be an Array");
    }
    if (bbox.length !== 4 && bbox.length !== 6) {
        throw new Error("bbox must be an Array of 4 or 6 numbers");
    }
    bbox.forEach(function (num) {
        if (!isNumber(num)) {
            throw new Error("bbox must only contain numbers");
        }
    });
}
exports.validateBBox = validateBBox;
/**
 * Validate Id
 *
 * @private
 * @param {string|number} id Id to validate
 * @returns {void}
 * @throws Error if Id is not valid
 * @example
 * validateId([-180, -40, 110, 50])
 * //=Error
 * validateId([-180, -40])
 * //=Error
 * validateId('Foo')
 * //=OK
 * validateId(5)
 * //=OK
 * validateId(null)
 * //=Error
 * validateId(undefined)
 * //=Error
 */
function validateId(id) {
    if (!id) {
        throw new Error("id is required");
    }
    if (["string", "number"].indexOf(typeof id) === -1) {
        throw new Error("id must be a number or a string");
    }
}
exports.validateId = validateId;
// Deprecated methods
function radians2degrees() {
    throw new Error("method has been renamed to `radiansToDegrees`");
}
exports.radians2degrees = radians2degrees;
function degrees2radians() {
    throw new Error("method has been renamed to `degreesToRadians`");
}
exports.degrees2radians = degrees2radians;
function distanceToDegrees() {
    throw new Error("method has been renamed to `lengthToDegrees`");
}
exports.distanceToDegrees = distanceToDegrees;
function distanceToRadians() {
    throw new Error("method has been renamed to `lengthToRadians`");
}
exports.distanceToRadians = distanceToRadians;
function radiansToDistance() {
    throw new Error("method has been renamed to `radiansToLength`");
}
exports.radiansToDistance = radiansToDistance;
function bearingToAngle() {
    throw new Error("method has been renamed to `bearingToAzimuth`");
}
exports.bearingToAngle = bearingToAngle;
function convertDistance() {
    throw new Error("method has been renamed to `convertLength`");
}
exports.convertDistance = convertDistance;


/***/ }),

/***/ "./node_modules/@turf/invariant/index.js":
/*!***********************************************!*\
  !*** ./node_modules/@turf/invariant/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(/*! @turf/helpers */ "./node_modules/@turf/helpers/index.js");
/**
 * Unwrap a coordinate from a Point Feature, Geometry or a single coordinate.
 *
 * @name getCoord
 * @param {Array<number>|Geometry<Point>|Feature<Point>} coord GeoJSON Point or an Array of numbers
 * @returns {Array<number>} coordinates
 * @example
 * var pt = turf.point([10, 10]);
 *
 * var coord = turf.getCoord(pt);
 * //= [10, 10]
 */
function getCoord(coord) {
    if (!coord) {
        throw new Error("coord is required");
    }
    if (!Array.isArray(coord)) {
        if (coord.type === "Feature" && coord.geometry !== null && coord.geometry.type === "Point") {
            return coord.geometry.coordinates;
        }
        if (coord.type === "Point") {
            return coord.coordinates;
        }
    }
    if (Array.isArray(coord) && coord.length >= 2 && !Array.isArray(coord[0]) && !Array.isArray(coord[1])) {
        return coord;
    }
    throw new Error("coord must be GeoJSON Point or an Array of numbers");
}
exports.getCoord = getCoord;
/**
 * Unwrap coordinates from a Feature, Geometry Object or an Array
 *
 * @name getCoords
 * @param {Array<any>|Geometry|Feature} coords Feature, Geometry Object or an Array
 * @returns {Array<any>} coordinates
 * @example
 * var poly = turf.polygon([[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]);
 *
 * var coords = turf.getCoords(poly);
 * //= [[[119.32, -8.7], [119.55, -8.69], [119.51, -8.54], [119.32, -8.7]]]
 */
function getCoords(coords) {
    if (Array.isArray(coords)) {
        return coords;
    }
    // Feature
    if (coords.type === "Feature") {
        if (coords.geometry !== null) {
            return coords.geometry.coordinates;
        }
    }
    else {
        // Geometry
        if (coords.coordinates) {
            return coords.coordinates;
        }
    }
    throw new Error("coords must be GeoJSON Feature, Geometry Object or an Array");
}
exports.getCoords = getCoords;
/**
 * Checks if coordinates contains a number
 *
 * @name containsNumber
 * @param {Array<any>} coordinates GeoJSON Coordinates
 * @returns {boolean} true if Array contains a number
 */
function containsNumber(coordinates) {
    if (coordinates.length > 1 && helpers_1.isNumber(coordinates[0]) && helpers_1.isNumber(coordinates[1])) {
        return true;
    }
    if (Array.isArray(coordinates[0]) && coordinates[0].length) {
        return containsNumber(coordinates[0]);
    }
    throw new Error("coordinates must only contain numbers");
}
exports.containsNumber = containsNumber;
/**
 * Enforce expectations about types of GeoJSON objects for Turf.
 *
 * @name geojsonType
 * @param {GeoJSON} value any GeoJSON object
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} if value is not the expected type.
 */
function geojsonType(value, type, name) {
    if (!type || !name) {
        throw new Error("type and name required");
    }
    if (!value || value.type !== type) {
        throw new Error("Invalid input to " + name + ": must be a " + type + ", given " + value.type);
    }
}
exports.geojsonType = geojsonType;
/**
 * Enforce expectations about types of {@link Feature} inputs for Turf.
 * Internally this uses {@link geojsonType} to judge geometry types.
 *
 * @name featureOf
 * @param {Feature} feature a feature with an expected geometry type
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} error if value is not the expected type.
 */
function featureOf(feature, type, name) {
    if (!feature) {
        throw new Error("No feature passed");
    }
    if (!name) {
        throw new Error(".featureOf() requires a name");
    }
    if (!feature || feature.type !== "Feature" || !feature.geometry) {
        throw new Error("Invalid input to " + name + ", Feature with geometry required");
    }
    if (!feature.geometry || feature.geometry.type !== type) {
        throw new Error("Invalid input to " + name + ": must be a " + type + ", given " + feature.geometry.type);
    }
}
exports.featureOf = featureOf;
/**
 * Enforce expectations about types of {@link FeatureCollection} inputs for Turf.
 * Internally this uses {@link geojsonType} to judge geometry types.
 *
 * @name collectionOf
 * @param {FeatureCollection} featureCollection a FeatureCollection for which features will be judged
 * @param {string} type expected GeoJSON type
 * @param {string} name name of calling function
 * @throws {Error} if value is not the expected type.
 */
function collectionOf(featureCollection, type, name) {
    if (!featureCollection) {
        throw new Error("No featureCollection passed");
    }
    if (!name) {
        throw new Error(".collectionOf() requires a name");
    }
    if (!featureCollection || featureCollection.type !== "FeatureCollection") {
        throw new Error("Invalid input to " + name + ", FeatureCollection required");
    }
    for (var _i = 0, _a = featureCollection.features; _i < _a.length; _i++) {
        var feature = _a[_i];
        if (!feature || feature.type !== "Feature" || !feature.geometry) {
            throw new Error("Invalid input to " + name + ", Feature with geometry required");
        }
        if (!feature.geometry || feature.geometry.type !== type) {
            throw new Error("Invalid input to " + name + ": must be a " + type + ", given " + feature.geometry.type);
        }
    }
}
exports.collectionOf = collectionOf;
/**
 * Get Geometry from Feature or Geometry Object
 *
 * @param {Feature|Geometry} geojson GeoJSON Feature or Geometry Object
 * @returns {Geometry|null} GeoJSON Geometry Object
 * @throws {Error} if geojson is not a Feature or Geometry Object
 * @example
 * var point = {
 *   "type": "Feature",
 *   "properties": {},
 *   "geometry": {
 *     "type": "Point",
 *     "coordinates": [110, 40]
 *   }
 * }
 * var geom = turf.getGeom(point)
 * //={"type": "Point", "coordinates": [110, 40]}
 */
function getGeom(geojson) {
    if (geojson.type === "Feature") {
        return geojson.geometry;
    }
    return geojson;
}
exports.getGeom = getGeom;
/**
 * Get GeoJSON object's type, Geometry type is prioritize.
 *
 * @param {GeoJSON} geojson GeoJSON object
 * @param {string} [name="geojson"] name of the variable to display in error message
 * @returns {string} GeoJSON type
 * @example
 * var point = {
 *   "type": "Feature",
 *   "properties": {},
 *   "geometry": {
 *     "type": "Point",
 *     "coordinates": [110, 40]
 *   }
 * }
 * var geom = turf.getType(point)
 * //="Point"
 */
function getType(geojson, name) {
    if (geojson.type === "FeatureCollection") {
        return "FeatureCollection";
    }
    if (geojson.type === "GeometryCollection") {
        return "GeometryCollection";
    }
    if (geojson.type === "Feature" && geojson.geometry !== null) {
        return geojson.geometry.type;
    }
    return geojson.type;
}
exports.getType = getType;


/***/ }),

/***/ "./node_modules/d3-geo/src/adder.js":
/*!******************************************!*\
  !*** ./node_modules/d3-geo/src/adder.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Adds floating point numbers with twice the normal precision.
// Reference: J. R. Shewchuk, Adaptive Precision Floating-Point Arithmetic and
// Fast Robust Geometric Predicates, Discrete & Computational Geometry 18(3)
// 305–363 (1997).
// Code adapted from GeographicLib by Charles F. F. Karney,
// http://geographiclib.sourceforge.net/

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return new Adder;
});

function Adder() {
  this.reset();
}

Adder.prototype = {
  constructor: Adder,
  reset: function() {
    this.s = // rounded value
    this.t = 0; // exact error
  },
  add: function(y) {
    add(temp, y, this.t);
    add(this, temp.s, this.s);
    if (this.s) this.t += temp.t;
    else this.s = temp.t;
  },
  valueOf: function() {
    return this.s;
  }
};

var temp = new Adder;

function add(adder, a, b) {
  var x = adder.s = a + b,
      bv = x - a,
      av = x - bv;
  adder.t = (a - av) + (b - bv);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/area.js":
/*!*****************************************!*\
  !*** ./node_modules/d3-geo/src/area.js ***!
  \*****************************************/
/*! exports provided: areaRingSum, areaStream, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "areaRingSum", function() { return areaRingSum; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "areaStream", function() { return areaStream; });
/* harmony import */ var _adder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adder.js */ "./node_modules/d3-geo/src/adder.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./noop.js */ "./node_modules/d3-geo/src/noop.js");
/* harmony import */ var _stream_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stream.js */ "./node_modules/d3-geo/src/stream.js");





var areaRingSum = Object(_adder_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

var areaSum = Object(_adder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(),
    lambda00,
    phi00,
    lambda0,
    cosPhi0,
    sinPhi0;

var areaStream = {
  point: _noop_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  lineStart: _noop_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  lineEnd: _noop_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  polygonStart: function() {
    areaRingSum.reset();
    areaStream.lineStart = areaRingStart;
    areaStream.lineEnd = areaRingEnd;
  },
  polygonEnd: function() {
    var areaRing = +areaRingSum;
    areaSum.add(areaRing < 0 ? _math_js__WEBPACK_IMPORTED_MODULE_1__["tau"] + areaRing : areaRing);
    this.lineStart = this.lineEnd = this.point = _noop_js__WEBPACK_IMPORTED_MODULE_2__["default"];
  },
  sphere: function() {
    areaSum.add(_math_js__WEBPACK_IMPORTED_MODULE_1__["tau"]);
  }
};

function areaRingStart() {
  areaStream.point = areaPointFirst;
}

function areaRingEnd() {
  areaPoint(lambda00, phi00);
}

function areaPointFirst(lambda, phi) {
  areaStream.point = areaPoint;
  lambda00 = lambda, phi00 = phi;
  lambda *= _math_js__WEBPACK_IMPORTED_MODULE_1__["radians"], phi *= _math_js__WEBPACK_IMPORTED_MODULE_1__["radians"];
  lambda0 = lambda, cosPhi0 = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["cos"])(phi = phi / 2 + _math_js__WEBPACK_IMPORTED_MODULE_1__["quarterPi"]), sinPhi0 = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sin"])(phi);
}

function areaPoint(lambda, phi) {
  lambda *= _math_js__WEBPACK_IMPORTED_MODULE_1__["radians"], phi *= _math_js__WEBPACK_IMPORTED_MODULE_1__["radians"];
  phi = phi / 2 + _math_js__WEBPACK_IMPORTED_MODULE_1__["quarterPi"]; // half the angular distance from south pole

  // Spherical excess E for a spherical triangle with vertices: south pole,
  // previous point, current point.  Uses a formula derived from Cagnoli’s
  // theorem.  See Todhunter, Spherical Trig. (1871), Sec. 103, Eq. (2).
  var dLambda = lambda - lambda0,
      sdLambda = dLambda >= 0 ? 1 : -1,
      adLambda = sdLambda * dLambda,
      cosPhi = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["cos"])(phi),
      sinPhi = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sin"])(phi),
      k = sinPhi0 * sinPhi,
      u = cosPhi0 * cosPhi + k * Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["cos"])(adLambda),
      v = k * sdLambda * Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sin"])(adLambda);
  areaRingSum.add(Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["atan2"])(v, u));

  // Advance the previous points.
  lambda0 = lambda, cosPhi0 = cosPhi, sinPhi0 = sinPhi;
}

/* harmony default export */ __webpack_exports__["default"] = (function(object) {
  areaSum.reset();
  Object(_stream_js__WEBPACK_IMPORTED_MODULE_3__["default"])(object, areaStream);
  return areaSum * 2;
});


/***/ }),

/***/ "./node_modules/d3-geo/src/bounds.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-geo/src/bounds.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adder.js */ "./node_modules/d3-geo/src/adder.js");
/* harmony import */ var _area_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./area.js */ "./node_modules/d3-geo/src/area.js");
/* harmony import */ var _cartesian_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cartesian.js */ "./node_modules/d3-geo/src/cartesian.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _stream_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stream.js */ "./node_modules/d3-geo/src/stream.js");






var lambda0, phi0, lambda1, phi1, // bounds
    lambda2, // previous lambda-coordinate
    lambda00, phi00, // first point
    p0, // previous 3D point
    deltaSum = Object(_adder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(),
    ranges,
    range;

var boundsStream = {
  point: boundsPoint,
  lineStart: boundsLineStart,
  lineEnd: boundsLineEnd,
  polygonStart: function() {
    boundsStream.point = boundsRingPoint;
    boundsStream.lineStart = boundsRingStart;
    boundsStream.lineEnd = boundsRingEnd;
    deltaSum.reset();
    _area_js__WEBPACK_IMPORTED_MODULE_1__["areaStream"].polygonStart();
  },
  polygonEnd: function() {
    _area_js__WEBPACK_IMPORTED_MODULE_1__["areaStream"].polygonEnd();
    boundsStream.point = boundsPoint;
    boundsStream.lineStart = boundsLineStart;
    boundsStream.lineEnd = boundsLineEnd;
    if (_area_js__WEBPACK_IMPORTED_MODULE_1__["areaRingSum"] < 0) lambda0 = -(lambda1 = 180), phi0 = -(phi1 = 90);
    else if (deltaSum > _math_js__WEBPACK_IMPORTED_MODULE_3__["epsilon"]) phi1 = 90;
    else if (deltaSum < -_math_js__WEBPACK_IMPORTED_MODULE_3__["epsilon"]) phi0 = -90;
    range[0] = lambda0, range[1] = lambda1;
  },
  sphere: function() {
    lambda0 = -(lambda1 = 180), phi0 = -(phi1 = 90);
  }
};

function boundsPoint(lambda, phi) {
  ranges.push(range = [lambda0 = lambda, lambda1 = lambda]);
  if (phi < phi0) phi0 = phi;
  if (phi > phi1) phi1 = phi;
}

function linePoint(lambda, phi) {
  var p = Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_2__["cartesian"])([lambda * _math_js__WEBPACK_IMPORTED_MODULE_3__["radians"], phi * _math_js__WEBPACK_IMPORTED_MODULE_3__["radians"]]);
  if (p0) {
    var normal = Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_2__["cartesianCross"])(p0, p),
        equatorial = [normal[1], -normal[0], 0],
        inflection = Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_2__["cartesianCross"])(equatorial, normal);
    Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_2__["cartesianNormalizeInPlace"])(inflection);
    inflection = Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_2__["spherical"])(inflection);
    var delta = lambda - lambda2,
        sign = delta > 0 ? 1 : -1,
        lambdai = inflection[0] * _math_js__WEBPACK_IMPORTED_MODULE_3__["degrees"] * sign,
        phii,
        antimeridian = Object(_math_js__WEBPACK_IMPORTED_MODULE_3__["abs"])(delta) > 180;
    if (antimeridian ^ (sign * lambda2 < lambdai && lambdai < sign * lambda)) {
      phii = inflection[1] * _math_js__WEBPACK_IMPORTED_MODULE_3__["degrees"];
      if (phii > phi1) phi1 = phii;
    } else if (lambdai = (lambdai + 360) % 360 - 180, antimeridian ^ (sign * lambda2 < lambdai && lambdai < sign * lambda)) {
      phii = -inflection[1] * _math_js__WEBPACK_IMPORTED_MODULE_3__["degrees"];
      if (phii < phi0) phi0 = phii;
    } else {
      if (phi < phi0) phi0 = phi;
      if (phi > phi1) phi1 = phi;
    }
    if (antimeridian) {
      if (lambda < lambda2) {
        if (angle(lambda0, lambda) > angle(lambda0, lambda1)) lambda1 = lambda;
      } else {
        if (angle(lambda, lambda1) > angle(lambda0, lambda1)) lambda0 = lambda;
      }
    } else {
      if (lambda1 >= lambda0) {
        if (lambda < lambda0) lambda0 = lambda;
        if (lambda > lambda1) lambda1 = lambda;
      } else {
        if (lambda > lambda2) {
          if (angle(lambda0, lambda) > angle(lambda0, lambda1)) lambda1 = lambda;
        } else {
          if (angle(lambda, lambda1) > angle(lambda0, lambda1)) lambda0 = lambda;
        }
      }
    }
  } else {
    ranges.push(range = [lambda0 = lambda, lambda1 = lambda]);
  }
  if (phi < phi0) phi0 = phi;
  if (phi > phi1) phi1 = phi;
  p0 = p, lambda2 = lambda;
}

function boundsLineStart() {
  boundsStream.point = linePoint;
}

function boundsLineEnd() {
  range[0] = lambda0, range[1] = lambda1;
  boundsStream.point = boundsPoint;
  p0 = null;
}

function boundsRingPoint(lambda, phi) {
  if (p0) {
    var delta = lambda - lambda2;
    deltaSum.add(Object(_math_js__WEBPACK_IMPORTED_MODULE_3__["abs"])(delta) > 180 ? delta + (delta > 0 ? 360 : -360) : delta);
  } else {
    lambda00 = lambda, phi00 = phi;
  }
  _area_js__WEBPACK_IMPORTED_MODULE_1__["areaStream"].point(lambda, phi);
  linePoint(lambda, phi);
}

function boundsRingStart() {
  _area_js__WEBPACK_IMPORTED_MODULE_1__["areaStream"].lineStart();
}

function boundsRingEnd() {
  boundsRingPoint(lambda00, phi00);
  _area_js__WEBPACK_IMPORTED_MODULE_1__["areaStream"].lineEnd();
  if (Object(_math_js__WEBPACK_IMPORTED_MODULE_3__["abs"])(deltaSum) > _math_js__WEBPACK_IMPORTED_MODULE_3__["epsilon"]) lambda0 = -(lambda1 = 180);
  range[0] = lambda0, range[1] = lambda1;
  p0 = null;
}

// Finds the left-right distance between two longitudes.
// This is almost the same as (lambda1 - lambda0 + 360°) % 360°, except that we want
// the distance between ±180° to be 360°.
function angle(lambda0, lambda1) {
  return (lambda1 -= lambda0) < 0 ? lambda1 + 360 : lambda1;
}

function rangeCompare(a, b) {
  return a[0] - b[0];
}

function rangeContains(range, x) {
  return range[0] <= range[1] ? range[0] <= x && x <= range[1] : x < range[0] || range[1] < x;
}

/* harmony default export */ __webpack_exports__["default"] = (function(feature) {
  var i, n, a, b, merged, deltaMax, delta;

  phi1 = lambda1 = -(lambda0 = phi0 = Infinity);
  ranges = [];
  Object(_stream_js__WEBPACK_IMPORTED_MODULE_4__["default"])(feature, boundsStream);

  // First, sort ranges by their minimum longitudes.
  if (n = ranges.length) {
    ranges.sort(rangeCompare);

    // Then, merge any ranges that overlap.
    for (i = 1, a = ranges[0], merged = [a]; i < n; ++i) {
      b = ranges[i];
      if (rangeContains(a, b[0]) || rangeContains(a, b[1])) {
        if (angle(a[0], b[1]) > angle(a[0], a[1])) a[1] = b[1];
        if (angle(b[0], a[1]) > angle(a[0], a[1])) a[0] = b[0];
      } else {
        merged.push(a = b);
      }
    }

    // Finally, find the largest gap between the merged ranges.
    // The final bounding box will be the inverse of this gap.
    for (deltaMax = -Infinity, n = merged.length - 1, i = 0, a = merged[n]; i <= n; a = b, ++i) {
      b = merged[i];
      if ((delta = angle(a[1], b[0])) > deltaMax) deltaMax = delta, lambda0 = b[0], lambda1 = a[1];
    }
  }

  ranges = range = null;

  return lambda0 === Infinity || phi0 === Infinity
      ? [[NaN, NaN], [NaN, NaN]]
      : [[lambda0, phi0], [lambda1, phi1]];
});


/***/ }),

/***/ "./node_modules/d3-geo/src/cartesian.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-geo/src/cartesian.js ***!
  \**********************************************/
/*! exports provided: spherical, cartesian, cartesianDot, cartesianCross, cartesianAddInPlace, cartesianScale, cartesianNormalizeInPlace */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spherical", function() { return spherical; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cartesian", function() { return cartesian; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cartesianDot", function() { return cartesianDot; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cartesianCross", function() { return cartesianCross; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cartesianAddInPlace", function() { return cartesianAddInPlace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cartesianScale", function() { return cartesianScale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cartesianNormalizeInPlace", function() { return cartesianNormalizeInPlace; });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");


function spherical(cartesian) {
  return [Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["atan2"])(cartesian[1], cartesian[0]), Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["asin"])(cartesian[2])];
}

function cartesian(spherical) {
  var lambda = spherical[0], phi = spherical[1], cosPhi = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(phi);
  return [cosPhi * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(lambda), cosPhi * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(lambda), Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(phi)];
}

function cartesianDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cartesianCross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

// TODO return a
function cartesianAddInPlace(a, b) {
  a[0] += b[0], a[1] += b[1], a[2] += b[2];
}

function cartesianScale(vector, k) {
  return [vector[0] * k, vector[1] * k, vector[2] * k];
}

// TODO return d
function cartesianNormalizeInPlace(d) {
  var l = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  d[0] /= l, d[1] /= l, d[2] /= l;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/centroid.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-geo/src/centroid.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./noop.js */ "./node_modules/d3-geo/src/noop.js");
/* harmony import */ var _stream_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stream.js */ "./node_modules/d3-geo/src/stream.js");




var W0, W1,
    X0, Y0, Z0,
    X1, Y1, Z1,
    X2, Y2, Z2,
    lambda00, phi00, // first point
    x0, y0, z0; // previous point

var centroidStream = {
  sphere: _noop_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  point: centroidPoint,
  lineStart: centroidLineStart,
  lineEnd: centroidLineEnd,
  polygonStart: function() {
    centroidStream.lineStart = centroidRingStart;
    centroidStream.lineEnd = centroidRingEnd;
  },
  polygonEnd: function() {
    centroidStream.lineStart = centroidLineStart;
    centroidStream.lineEnd = centroidLineEnd;
  }
};

// Arithmetic mean of Cartesian vectors.
function centroidPoint(lambda, phi) {
  lambda *= _math_js__WEBPACK_IMPORTED_MODULE_0__["radians"], phi *= _math_js__WEBPACK_IMPORTED_MODULE_0__["radians"];
  var cosPhi = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(phi);
  centroidPointCartesian(cosPhi * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(lambda), cosPhi * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(lambda), Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(phi));
}

function centroidPointCartesian(x, y, z) {
  ++W0;
  X0 += (x - X0) / W0;
  Y0 += (y - Y0) / W0;
  Z0 += (z - Z0) / W0;
}

function centroidLineStart() {
  centroidStream.point = centroidLinePointFirst;
}

function centroidLinePointFirst(lambda, phi) {
  lambda *= _math_js__WEBPACK_IMPORTED_MODULE_0__["radians"], phi *= _math_js__WEBPACK_IMPORTED_MODULE_0__["radians"];
  var cosPhi = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(phi);
  x0 = cosPhi * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(lambda);
  y0 = cosPhi * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(lambda);
  z0 = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(phi);
  centroidStream.point = centroidLinePoint;
  centroidPointCartesian(x0, y0, z0);
}

function centroidLinePoint(lambda, phi) {
  lambda *= _math_js__WEBPACK_IMPORTED_MODULE_0__["radians"], phi *= _math_js__WEBPACK_IMPORTED_MODULE_0__["radians"];
  var cosPhi = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(phi),
      x = cosPhi * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(lambda),
      y = cosPhi * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(lambda),
      z = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(phi),
      w = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["atan2"])(Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sqrt"])((w = y0 * z - z0 * y) * w + (w = z0 * x - x0 * z) * w + (w = x0 * y - y0 * x) * w), x0 * x + y0 * y + z0 * z);
  W1 += w;
  X1 += w * (x0 + (x0 = x));
  Y1 += w * (y0 + (y0 = y));
  Z1 += w * (z0 + (z0 = z));
  centroidPointCartesian(x0, y0, z0);
}

function centroidLineEnd() {
  centroidStream.point = centroidPoint;
}

// See J. E. Brock, The Inertia Tensor for a Spherical Triangle,
// J. Applied Mechanics 42, 239 (1975).
function centroidRingStart() {
  centroidStream.point = centroidRingPointFirst;
}

function centroidRingEnd() {
  centroidRingPoint(lambda00, phi00);
  centroidStream.point = centroidPoint;
}

function centroidRingPointFirst(lambda, phi) {
  lambda00 = lambda, phi00 = phi;
  lambda *= _math_js__WEBPACK_IMPORTED_MODULE_0__["radians"], phi *= _math_js__WEBPACK_IMPORTED_MODULE_0__["radians"];
  centroidStream.point = centroidRingPoint;
  var cosPhi = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(phi);
  x0 = cosPhi * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(lambda);
  y0 = cosPhi * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(lambda);
  z0 = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(phi);
  centroidPointCartesian(x0, y0, z0);
}

function centroidRingPoint(lambda, phi) {
  lambda *= _math_js__WEBPACK_IMPORTED_MODULE_0__["radians"], phi *= _math_js__WEBPACK_IMPORTED_MODULE_0__["radians"];
  var cosPhi = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(phi),
      x = cosPhi * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(lambda),
      y = cosPhi * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(lambda),
      z = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(phi),
      cx = y0 * z - z0 * y,
      cy = z0 * x - x0 * z,
      cz = x0 * y - y0 * x,
      m = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(cx * cx + cy * cy + cz * cz),
      w = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["asin"])(m), // line weight = angle
      v = m && -w / m; // area weight multiplier
  X2 += v * cx;
  Y2 += v * cy;
  Z2 += v * cz;
  W1 += w;
  X1 += w * (x0 + (x0 = x));
  Y1 += w * (y0 + (y0 = y));
  Z1 += w * (z0 + (z0 = z));
  centroidPointCartesian(x0, y0, z0);
}

/* harmony default export */ __webpack_exports__["default"] = (function(object) {
  W0 = W1 =
  X0 = Y0 = Z0 =
  X1 = Y1 = Z1 =
  X2 = Y2 = Z2 = 0;
  Object(_stream_js__WEBPACK_IMPORTED_MODULE_2__["default"])(object, centroidStream);

  var x = X2,
      y = Y2,
      z = Z2,
      m = x * x + y * y + z * z;

  // If the area-weighted ccentroid is undefined, fall back to length-weighted ccentroid.
  if (m < _math_js__WEBPACK_IMPORTED_MODULE_0__["epsilon2"]) {
    x = X1, y = Y1, z = Z1;
    // If the feature has zero length, fall back to arithmetic mean of point vectors.
    if (W1 < _math_js__WEBPACK_IMPORTED_MODULE_0__["epsilon"]) x = X0, y = Y0, z = Z0;
    m = x * x + y * y + z * z;
    // If the feature still has an undefined ccentroid, then return.
    if (m < _math_js__WEBPACK_IMPORTED_MODULE_0__["epsilon2"]) return [NaN, NaN];
  }

  return [Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["atan2"])(y, x) * _math_js__WEBPACK_IMPORTED_MODULE_0__["degrees"], Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["asin"])(z / Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(m)) * _math_js__WEBPACK_IMPORTED_MODULE_0__["degrees"]];
});


/***/ }),

/***/ "./node_modules/d3-geo/src/circle.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-geo/src/circle.js ***!
  \*******************************************/
/*! exports provided: circleStream, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "circleStream", function() { return circleStream; });
/* harmony import */ var _cartesian_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cartesian.js */ "./node_modules/d3-geo/src/cartesian.js");
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constant.js */ "./node_modules/d3-geo/src/constant.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _rotation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rotation.js */ "./node_modules/d3-geo/src/rotation.js");





// Generates a circle centered at [0°, 0°], with a given radius and precision.
function circleStream(stream, radius, delta, direction, t0, t1) {
  if (!delta) return;
  var cosRadius = Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["cos"])(radius),
      sinRadius = Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["sin"])(radius),
      step = direction * delta;
  if (t0 == null) {
    t0 = radius + direction * _math_js__WEBPACK_IMPORTED_MODULE_2__["tau"];
    t1 = radius - step / 2;
  } else {
    t0 = circleRadius(cosRadius, t0);
    t1 = circleRadius(cosRadius, t1);
    if (direction > 0 ? t0 < t1 : t0 > t1) t0 += direction * _math_js__WEBPACK_IMPORTED_MODULE_2__["tau"];
  }
  for (var point, t = t0; direction > 0 ? t > t1 : t < t1; t -= step) {
    point = Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_0__["spherical"])([cosRadius, -sinRadius * Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["cos"])(t), -sinRadius * Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["sin"])(t)]);
    stream.point(point[0], point[1]);
  }
}

// Returns the signed angle of a cartesian point relative to [cosRadius, 0, 0].
function circleRadius(cosRadius, point) {
  point = Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_0__["cartesian"])(point), point[0] -= cosRadius;
  Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_0__["cartesianNormalizeInPlace"])(point);
  var radius = Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["acos"])(-point[1]);
  return ((-point[2] < 0 ? -radius : radius) + _math_js__WEBPACK_IMPORTED_MODULE_2__["tau"] - _math_js__WEBPACK_IMPORTED_MODULE_2__["epsilon"]) % _math_js__WEBPACK_IMPORTED_MODULE_2__["tau"];
}

/* harmony default export */ __webpack_exports__["default"] = (function() {
  var center = Object(_constant_js__WEBPACK_IMPORTED_MODULE_1__["default"])([0, 0]),
      radius = Object(_constant_js__WEBPACK_IMPORTED_MODULE_1__["default"])(90),
      precision = Object(_constant_js__WEBPACK_IMPORTED_MODULE_1__["default"])(6),
      ring,
      rotate,
      stream = {point: point};

  function point(x, y) {
    ring.push(x = rotate(x, y));
    x[0] *= _math_js__WEBPACK_IMPORTED_MODULE_2__["degrees"], x[1] *= _math_js__WEBPACK_IMPORTED_MODULE_2__["degrees"];
  }

  function circle() {
    var c = center.apply(this, arguments),
        r = radius.apply(this, arguments) * _math_js__WEBPACK_IMPORTED_MODULE_2__["radians"],
        p = precision.apply(this, arguments) * _math_js__WEBPACK_IMPORTED_MODULE_2__["radians"];
    ring = [];
    rotate = Object(_rotation_js__WEBPACK_IMPORTED_MODULE_3__["rotateRadians"])(-c[0] * _math_js__WEBPACK_IMPORTED_MODULE_2__["radians"], -c[1] * _math_js__WEBPACK_IMPORTED_MODULE_2__["radians"], 0).invert;
    circleStream(stream, r, p, 1);
    c = {type: "Polygon", coordinates: [ring]};
    ring = rotate = null;
    return c;
  }

  circle.center = function(_) {
    return arguments.length ? (center = typeof _ === "function" ? _ : Object(_constant_js__WEBPACK_IMPORTED_MODULE_1__["default"])([+_[0], +_[1]]), circle) : center;
  };

  circle.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : Object(_constant_js__WEBPACK_IMPORTED_MODULE_1__["default"])(+_), circle) : radius;
  };

  circle.precision = function(_) {
    return arguments.length ? (precision = typeof _ === "function" ? _ : Object(_constant_js__WEBPACK_IMPORTED_MODULE_1__["default"])(+_), circle) : precision;
  };

  return circle;
});


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/antimeridian.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-geo/src/clip/antimeridian.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/clip/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");



/* harmony default export */ __webpack_exports__["default"] = (Object(_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
  function() { return true; },
  clipAntimeridianLine,
  clipAntimeridianInterpolate,
  [-_math_js__WEBPACK_IMPORTED_MODULE_1__["pi"], -_math_js__WEBPACK_IMPORTED_MODULE_1__["halfPi"]]
));

// Takes a line and cuts into visible segments. Return values: 0 - there were
// intersections or the line was empty; 1 - no intersections; 2 - there were
// intersections, and the first and last segments should be rejoined.
function clipAntimeridianLine(stream) {
  var lambda0 = NaN,
      phi0 = NaN,
      sign0 = NaN,
      clean; // no intersections

  return {
    lineStart: function() {
      stream.lineStart();
      clean = 1;
    },
    point: function(lambda1, phi1) {
      var sign1 = lambda1 > 0 ? _math_js__WEBPACK_IMPORTED_MODULE_1__["pi"] : -_math_js__WEBPACK_IMPORTED_MODULE_1__["pi"],
          delta = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["abs"])(lambda1 - lambda0);
      if (Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["abs"])(delta - _math_js__WEBPACK_IMPORTED_MODULE_1__["pi"]) < _math_js__WEBPACK_IMPORTED_MODULE_1__["epsilon"]) { // line crosses a pole
        stream.point(lambda0, phi0 = (phi0 + phi1) / 2 > 0 ? _math_js__WEBPACK_IMPORTED_MODULE_1__["halfPi"] : -_math_js__WEBPACK_IMPORTED_MODULE_1__["halfPi"]);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        stream.point(lambda1, phi0);
        clean = 0;
      } else if (sign0 !== sign1 && delta >= _math_js__WEBPACK_IMPORTED_MODULE_1__["pi"]) { // line crosses antimeridian
        if (Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["abs"])(lambda0 - sign0) < _math_js__WEBPACK_IMPORTED_MODULE_1__["epsilon"]) lambda0 -= sign0 * _math_js__WEBPACK_IMPORTED_MODULE_1__["epsilon"]; // handle degeneracies
        if (Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["abs"])(lambda1 - sign1) < _math_js__WEBPACK_IMPORTED_MODULE_1__["epsilon"]) lambda1 -= sign1 * _math_js__WEBPACK_IMPORTED_MODULE_1__["epsilon"];
        phi0 = clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        clean = 0;
      }
      stream.point(lambda0 = lambda1, phi0 = phi1);
      sign0 = sign1;
    },
    lineEnd: function() {
      stream.lineEnd();
      lambda0 = phi0 = NaN;
    },
    clean: function() {
      return 2 - clean; // if intersections, rejoin first and last segments
    }
  };
}

function clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1) {
  var cosPhi0,
      cosPhi1,
      sinLambda0Lambda1 = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sin"])(lambda0 - lambda1);
  return Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["abs"])(sinLambda0Lambda1) > _math_js__WEBPACK_IMPORTED_MODULE_1__["epsilon"]
      ? Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["atan"])((Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sin"])(phi0) * (cosPhi1 = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["cos"])(phi1)) * Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sin"])(lambda1)
          - Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sin"])(phi1) * (cosPhi0 = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["cos"])(phi0)) * Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sin"])(lambda0))
          / (cosPhi0 * cosPhi1 * sinLambda0Lambda1))
      : (phi0 + phi1) / 2;
}

function clipAntimeridianInterpolate(from, to, direction, stream) {
  var phi;
  if (from == null) {
    phi = direction * _math_js__WEBPACK_IMPORTED_MODULE_1__["halfPi"];
    stream.point(-_math_js__WEBPACK_IMPORTED_MODULE_1__["pi"], phi);
    stream.point(0, phi);
    stream.point(_math_js__WEBPACK_IMPORTED_MODULE_1__["pi"], phi);
    stream.point(_math_js__WEBPACK_IMPORTED_MODULE_1__["pi"], 0);
    stream.point(_math_js__WEBPACK_IMPORTED_MODULE_1__["pi"], -phi);
    stream.point(0, -phi);
    stream.point(-_math_js__WEBPACK_IMPORTED_MODULE_1__["pi"], -phi);
    stream.point(-_math_js__WEBPACK_IMPORTED_MODULE_1__["pi"], 0);
    stream.point(-_math_js__WEBPACK_IMPORTED_MODULE_1__["pi"], phi);
  } else if (Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["abs"])(from[0] - to[0]) > _math_js__WEBPACK_IMPORTED_MODULE_1__["epsilon"]) {
    var lambda = from[0] < to[0] ? _math_js__WEBPACK_IMPORTED_MODULE_1__["pi"] : -_math_js__WEBPACK_IMPORTED_MODULE_1__["pi"];
    phi = direction * lambda / 2;
    stream.point(-lambda, phi);
    stream.point(0, phi);
    stream.point(lambda, phi);
  } else {
    stream.point(to[0], to[1]);
  }
}


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/buffer.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/clip/buffer.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../noop.js */ "./node_modules/d3-geo/src/noop.js");


/* harmony default export */ __webpack_exports__["default"] = (function() {
  var lines = [],
      line;
  return {
    point: function(x, y, m) {
      line.push([x, y, m]);
    },
    lineStart: function() {
      lines.push(line = []);
    },
    lineEnd: _noop_js__WEBPACK_IMPORTED_MODULE_0__["default"],
    rejoin: function() {
      if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
    },
    result: function() {
      var result = lines;
      lines = [];
      line = null;
      return result;
    }
  };
});


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/circle.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/clip/circle.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cartesian_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cartesian.js */ "./node_modules/d3-geo/src/cartesian.js");
/* harmony import */ var _circle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../circle.js */ "./node_modules/d3-geo/src/circle.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _pointEqual_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pointEqual.js */ "./node_modules/d3-geo/src/pointEqual.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/clip/index.js");






/* harmony default export */ __webpack_exports__["default"] = (function(radius) {
  var cr = Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["cos"])(radius),
      delta = 6 * _math_js__WEBPACK_IMPORTED_MODULE_2__["radians"],
      smallRadius = cr > 0,
      notHemisphere = Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["abs"])(cr) > _math_js__WEBPACK_IMPORTED_MODULE_2__["epsilon"]; // TODO optimise for this common case

  function interpolate(from, to, direction, stream) {
    Object(_circle_js__WEBPACK_IMPORTED_MODULE_1__["circleStream"])(stream, radius, delta, direction, from, to);
  }

  function visible(lambda, phi) {
    return Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["cos"])(lambda) * Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["cos"])(phi) > cr;
  }

  // Takes a line and cuts into visible segments. Return values used for polygon
  // clipping: 0 - there were intersections or the line was empty; 1 - no
  // intersections 2 - there were intersections, and the first and last segments
  // should be rejoined.
  function clipLine(stream) {
    var point0, // previous point
        c0, // code for previous point
        v0, // visibility of previous point
        v00, // visibility of first point
        clean; // no intersections
    return {
      lineStart: function() {
        v00 = v0 = false;
        clean = 1;
      },
      point: function(lambda, phi) {
        var point1 = [lambda, phi],
            point2,
            v = visible(lambda, phi),
            c = smallRadius
              ? v ? 0 : code(lambda, phi)
              : v ? code(lambda + (lambda < 0 ? _math_js__WEBPACK_IMPORTED_MODULE_2__["pi"] : -_math_js__WEBPACK_IMPORTED_MODULE_2__["pi"]), phi) : 0;
        if (!point0 && (v00 = v0 = v)) stream.lineStart();
        if (v !== v0) {
          point2 = intersect(point0, point1);
          if (!point2 || Object(_pointEqual_js__WEBPACK_IMPORTED_MODULE_3__["default"])(point0, point2) || Object(_pointEqual_js__WEBPACK_IMPORTED_MODULE_3__["default"])(point1, point2))
            point1[2] = 1;
        }
        if (v !== v0) {
          clean = 0;
          if (v) {
            // outside going in
            stream.lineStart();
            point2 = intersect(point1, point0);
            stream.point(point2[0], point2[1]);
          } else {
            // inside going out
            point2 = intersect(point0, point1);
            stream.point(point2[0], point2[1], 2);
            stream.lineEnd();
          }
          point0 = point2;
        } else if (notHemisphere && point0 && smallRadius ^ v) {
          var t;
          // If the codes for two points are different, or are both zero,
          // and there this segment intersects with the small circle.
          if (!(c & c0) && (t = intersect(point1, point0, true))) {
            clean = 0;
            if (smallRadius) {
              stream.lineStart();
              stream.point(t[0][0], t[0][1]);
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
            } else {
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
              stream.lineStart();
              stream.point(t[0][0], t[0][1], 3);
            }
          }
        }
        if (v && (!point0 || !Object(_pointEqual_js__WEBPACK_IMPORTED_MODULE_3__["default"])(point0, point1))) {
          stream.point(point1[0], point1[1]);
        }
        point0 = point1, v0 = v, c0 = c;
      },
      lineEnd: function() {
        if (v0) stream.lineEnd();
        point0 = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return clean | ((v00 && v0) << 1);
      }
    };
  }

  // Intersects the great circle between a and b with the clip circle.
  function intersect(a, b, two) {
    var pa = Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_0__["cartesian"])(a),
        pb = Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_0__["cartesian"])(b);

    // We have two planes, n1.p = d1 and n2.p = d2.
    // Find intersection line p(t) = c1 n1 + c2 n2 + t (n1 ⨯ n2).
    var n1 = [1, 0, 0], // normal
        n2 = Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_0__["cartesianCross"])(pa, pb),
        n2n2 = Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_0__["cartesianDot"])(n2, n2),
        n1n2 = n2[0], // cartesianDot(n1, n2),
        determinant = n2n2 - n1n2 * n1n2;

    // Two polar points.
    if (!determinant) return !two && a;

    var c1 =  cr * n2n2 / determinant,
        c2 = -cr * n1n2 / determinant,
        n1xn2 = Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_0__["cartesianCross"])(n1, n2),
        A = Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_0__["cartesianScale"])(n1, c1),
        B = Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_0__["cartesianScale"])(n2, c2);
    Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_0__["cartesianAddInPlace"])(A, B);

    // Solve |p(t)|^2 = 1.
    var u = n1xn2,
        w = Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_0__["cartesianDot"])(A, u),
        uu = Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_0__["cartesianDot"])(u, u),
        t2 = w * w - uu * (Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_0__["cartesianDot"])(A, A) - 1);

    if (t2 < 0) return;

    var t = Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["sqrt"])(t2),
        q = Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_0__["cartesianScale"])(u, (-w - t) / uu);
    Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_0__["cartesianAddInPlace"])(q, A);
    q = Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_0__["spherical"])(q);

    if (!two) return q;

    // Two intersection points.
    var lambda0 = a[0],
        lambda1 = b[0],
        phi0 = a[1],
        phi1 = b[1],
        z;

    if (lambda1 < lambda0) z = lambda0, lambda0 = lambda1, lambda1 = z;

    var delta = lambda1 - lambda0,
        polar = Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["abs"])(delta - _math_js__WEBPACK_IMPORTED_MODULE_2__["pi"]) < _math_js__WEBPACK_IMPORTED_MODULE_2__["epsilon"],
        meridian = polar || delta < _math_js__WEBPACK_IMPORTED_MODULE_2__["epsilon"];

    if (!polar && phi1 < phi0) z = phi0, phi0 = phi1, phi1 = z;

    // Check that the first point is between a and b.
    if (meridian
        ? polar
          ? phi0 + phi1 > 0 ^ q[1] < (Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["abs"])(q[0] - lambda0) < _math_js__WEBPACK_IMPORTED_MODULE_2__["epsilon"] ? phi0 : phi1)
          : phi0 <= q[1] && q[1] <= phi1
        : delta > _math_js__WEBPACK_IMPORTED_MODULE_2__["pi"] ^ (lambda0 <= q[0] && q[0] <= lambda1)) {
      var q1 = Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_0__["cartesianScale"])(u, (-w + t) / uu);
      Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_0__["cartesianAddInPlace"])(q1, A);
      return [q, Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_0__["spherical"])(q1)];
    }
  }

  // Generates a 4-bit vector representing the location of a point relative to
  // the small circle's bounding box.
  function code(lambda, phi) {
    var r = smallRadius ? radius : _math_js__WEBPACK_IMPORTED_MODULE_2__["pi"] - radius,
        code = 0;
    if (lambda < -r) code |= 1; // left
    else if (lambda > r) code |= 2; // right
    if (phi < -r) code |= 4; // below
    else if (phi > r) code |= 8; // above
    return code;
  }

  return Object(_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-_math_js__WEBPACK_IMPORTED_MODULE_2__["pi"], radius - _math_js__WEBPACK_IMPORTED_MODULE_2__["pi"]]);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/extent.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/clip/extent.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rectangle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rectangle.js */ "./node_modules/d3-geo/src/clip/rectangle.js");


/* harmony default export */ __webpack_exports__["default"] = (function() {
  var x0 = 0,
      y0 = 0,
      x1 = 960,
      y1 = 500,
      cache,
      cacheStream,
      clip;

  return clip = {
    stream: function(stream) {
      return cache && cacheStream === stream ? cache : cache = Object(_rectangle_js__WEBPACK_IMPORTED_MODULE_0__["default"])(x0, y0, x1, y1)(cacheStream = stream);
    },
    extent: function(_) {
      return arguments.length ? (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1], cache = cacheStream = null, clip) : [[x0, y0], [x1, y1]];
    }
  };
});


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/index.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-geo/src/clip/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _buffer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buffer.js */ "./node_modules/d3-geo/src/clip/buffer.js");
/* harmony import */ var _rejoin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rejoin.js */ "./node_modules/d3-geo/src/clip/rejoin.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _polygonContains_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../polygonContains.js */ "./node_modules/d3-geo/src/polygonContains.js");
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");






/* harmony default export */ __webpack_exports__["default"] = (function(pointVisible, clipLine, interpolate, start) {
  return function(sink) {
    var line = clipLine(sink),
        ringBuffer = Object(_buffer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(),
        ringSink = clipLine(ringBuffer),
        polygonStarted = false,
        polygon,
        segments,
        ring;

    var clip = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() {
        clip.point = pointRing;
        clip.lineStart = ringStart;
        clip.lineEnd = ringEnd;
        segments = [];
        polygon = [];
      },
      polygonEnd: function() {
        clip.point = point;
        clip.lineStart = lineStart;
        clip.lineEnd = lineEnd;
        segments = Object(d3_array__WEBPACK_IMPORTED_MODULE_4__["merge"])(segments);
        var startInside = Object(_polygonContains_js__WEBPACK_IMPORTED_MODULE_3__["default"])(polygon, start);
        if (segments.length) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          Object(_rejoin_js__WEBPACK_IMPORTED_MODULE_1__["default"])(segments, compareIntersection, startInside, interpolate, sink);
        } else if (startInside) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          interpolate(null, null, 1, sink);
          sink.lineEnd();
        }
        if (polygonStarted) sink.polygonEnd(), polygonStarted = false;
        segments = polygon = null;
      },
      sphere: function() {
        sink.polygonStart();
        sink.lineStart();
        interpolate(null, null, 1, sink);
        sink.lineEnd();
        sink.polygonEnd();
      }
    };

    function point(lambda, phi) {
      if (pointVisible(lambda, phi)) sink.point(lambda, phi);
    }

    function pointLine(lambda, phi) {
      line.point(lambda, phi);
    }

    function lineStart() {
      clip.point = pointLine;
      line.lineStart();
    }

    function lineEnd() {
      clip.point = point;
      line.lineEnd();
    }

    function pointRing(lambda, phi) {
      ring.push([lambda, phi]);
      ringSink.point(lambda, phi);
    }

    function ringStart() {
      ringSink.lineStart();
      ring = [];
    }

    function ringEnd() {
      pointRing(ring[0][0], ring[0][1]);
      ringSink.lineEnd();

      var clean = ringSink.clean(),
          ringSegments = ringBuffer.result(),
          i, n = ringSegments.length, m,
          segment,
          point;

      ring.pop();
      polygon.push(ring);
      ring = null;

      if (!n) return;

      // No intersections.
      if (clean & 1) {
        segment = ringSegments[0];
        if ((m = segment.length - 1) > 0) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          for (i = 0; i < m; ++i) sink.point((point = segment[i])[0], point[1]);
          sink.lineEnd();
        }
        return;
      }

      // Rejoin connected segments.
      // TODO reuse ringBuffer.rejoin()?
      if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));

      segments.push(ringSegments.filter(validSegment));
    }

    return clip;
  };
});

function validSegment(segment) {
  return segment.length > 1;
}

// Intersections are sorted along the clip edge. For both antimeridian cutting
// and circle clipping, the same comparison is used.
function compareIntersection(a, b) {
  return ((a = a.x)[0] < 0 ? a[1] - _math_js__WEBPACK_IMPORTED_MODULE_2__["halfPi"] - _math_js__WEBPACK_IMPORTED_MODULE_2__["epsilon"] : _math_js__WEBPACK_IMPORTED_MODULE_2__["halfPi"] - a[1])
       - ((b = b.x)[0] < 0 ? b[1] - _math_js__WEBPACK_IMPORTED_MODULE_2__["halfPi"] - _math_js__WEBPACK_IMPORTED_MODULE_2__["epsilon"] : _math_js__WEBPACK_IMPORTED_MODULE_2__["halfPi"] - b[1]);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/line.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-geo/src/clip/line.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(a, b, x0, y0, x1, y1) {
  var ax = a[0],
      ay = a[1],
      bx = b[0],
      by = b[1],
      t0 = 0,
      t1 = 1,
      dx = bx - ax,
      dy = by - ay,
      r;

  r = x0 - ax;
  if (!dx && r > 0) return;
  r /= dx;
  if (dx < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dx > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = x1 - ax;
  if (!dx && r < 0) return;
  r /= dx;
  if (dx < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dx > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  r = y0 - ay;
  if (!dy && r > 0) return;
  r /= dy;
  if (dy < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dy > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = y1 - ay;
  if (!dy && r < 0) return;
  r /= dy;
  if (dy < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dy > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  if (t0 > 0) a[0] = ax + t0 * dx, a[1] = ay + t0 * dy;
  if (t1 < 1) b[0] = ax + t1 * dx, b[1] = ay + t1 * dy;
  return true;
});


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/rectangle.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-geo/src/clip/rectangle.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return clipRectangle; });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _buffer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buffer.js */ "./node_modules/d3-geo/src/clip/buffer.js");
/* harmony import */ var _line_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./line.js */ "./node_modules/d3-geo/src/clip/line.js");
/* harmony import */ var _rejoin_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rejoin.js */ "./node_modules/d3-geo/src/clip/rejoin.js");
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");






var clipMax = 1e9, clipMin = -clipMax;

// TODO Use d3-polygon’s polygonContains here for the ring check?
// TODO Eliminate duplicate buffering in clipBuffer and polygon.push?

function clipRectangle(x0, y0, x1, y1) {

  function visible(x, y) {
    return x0 <= x && x <= x1 && y0 <= y && y <= y1;
  }

  function interpolate(from, to, direction, stream) {
    var a = 0, a1 = 0;
    if (from == null
        || (a = corner(from, direction)) !== (a1 = corner(to, direction))
        || comparePoint(from, to) < 0 ^ direction > 0) {
      do stream.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
      while ((a = (a + direction + 4) % 4) !== a1);
    } else {
      stream.point(to[0], to[1]);
    }
  }

  function corner(p, direction) {
    return Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["abs"])(p[0] - x0) < _math_js__WEBPACK_IMPORTED_MODULE_0__["epsilon"] ? direction > 0 ? 0 : 3
        : Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["abs"])(p[0] - x1) < _math_js__WEBPACK_IMPORTED_MODULE_0__["epsilon"] ? direction > 0 ? 2 : 1
        : Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["abs"])(p[1] - y0) < _math_js__WEBPACK_IMPORTED_MODULE_0__["epsilon"] ? direction > 0 ? 1 : 0
        : direction > 0 ? 3 : 2; // abs(p[1] - y1) < epsilon
  }

  function compareIntersection(a, b) {
    return comparePoint(a.x, b.x);
  }

  function comparePoint(a, b) {
    var ca = corner(a, 1),
        cb = corner(b, 1);
    return ca !== cb ? ca - cb
        : ca === 0 ? b[1] - a[1]
        : ca === 1 ? a[0] - b[0]
        : ca === 2 ? a[1] - b[1]
        : b[0] - a[0];
  }

  return function(stream) {
    var activeStream = stream,
        bufferStream = Object(_buffer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(),
        segments,
        polygon,
        ring,
        x__, y__, v__, // first point
        x_, y_, v_, // previous point
        first,
        clean;

    var clipStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: polygonStart,
      polygonEnd: polygonEnd
    };

    function point(x, y) {
      if (visible(x, y)) activeStream.point(x, y);
    }

    function polygonInside() {
      var winding = 0;

      for (var i = 0, n = polygon.length; i < n; ++i) {
        for (var ring = polygon[i], j = 1, m = ring.length, point = ring[0], a0, a1, b0 = point[0], b1 = point[1]; j < m; ++j) {
          a0 = b0, a1 = b1, point = ring[j], b0 = point[0], b1 = point[1];
          if (a1 <= y1) { if (b1 > y1 && (b0 - a0) * (y1 - a1) > (b1 - a1) * (x0 - a0)) ++winding; }
          else { if (b1 <= y1 && (b0 - a0) * (y1 - a1) < (b1 - a1) * (x0 - a0)) --winding; }
        }
      }

      return winding;
    }

    // Buffer geometry within a polygon and then clip it en masse.
    function polygonStart() {
      activeStream = bufferStream, segments = [], polygon = [], clean = true;
    }

    function polygonEnd() {
      var startInside = polygonInside(),
          cleanInside = clean && startInside,
          visible = (segments = Object(d3_array__WEBPACK_IMPORTED_MODULE_4__["merge"])(segments)).length;
      if (cleanInside || visible) {
        stream.polygonStart();
        if (cleanInside) {
          stream.lineStart();
          interpolate(null, null, 1, stream);
          stream.lineEnd();
        }
        if (visible) {
          Object(_rejoin_js__WEBPACK_IMPORTED_MODULE_3__["default"])(segments, compareIntersection, startInside, interpolate, stream);
        }
        stream.polygonEnd();
      }
      activeStream = stream, segments = polygon = ring = null;
    }

    function lineStart() {
      clipStream.point = linePoint;
      if (polygon) polygon.push(ring = []);
      first = true;
      v_ = false;
      x_ = y_ = NaN;
    }

    // TODO rather than special-case polygons, simply handle them separately.
    // Ideally, coincident intersection points should be jittered to avoid
    // clipping issues.
    function lineEnd() {
      if (segments) {
        linePoint(x__, y__);
        if (v__ && v_) bufferStream.rejoin();
        segments.push(bufferStream.result());
      }
      clipStream.point = point;
      if (v_) activeStream.lineEnd();
    }

    function linePoint(x, y) {
      var v = visible(x, y);
      if (polygon) ring.push([x, y]);
      if (first) {
        x__ = x, y__ = y, v__ = v;
        first = false;
        if (v) {
          activeStream.lineStart();
          activeStream.point(x, y);
        }
      } else {
        if (v && v_) activeStream.point(x, y);
        else {
          var a = [x_ = Math.max(clipMin, Math.min(clipMax, x_)), y_ = Math.max(clipMin, Math.min(clipMax, y_))],
              b = [x = Math.max(clipMin, Math.min(clipMax, x)), y = Math.max(clipMin, Math.min(clipMax, y))];
          if (Object(_line_js__WEBPACK_IMPORTED_MODULE_2__["default"])(a, b, x0, y0, x1, y1)) {
            if (!v_) {
              activeStream.lineStart();
              activeStream.point(a[0], a[1]);
            }
            activeStream.point(b[0], b[1]);
            if (!v) activeStream.lineEnd();
            clean = false;
          } else if (v) {
            activeStream.lineStart();
            activeStream.point(x, y);
            clean = false;
          }
        }
      }
      x_ = x, y_ = y, v_ = v;
    }

    return clipStream;
  };
}


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/rejoin.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/clip/rejoin.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pointEqual_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pointEqual.js */ "./node_modules/d3-geo/src/pointEqual.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");



function Intersection(point, points, other, entry) {
  this.x = point;
  this.z = points;
  this.o = other; // another intersection
  this.e = entry; // is an entry?
  this.v = false; // visited
  this.n = this.p = null; // next & previous
}

// A generalized polygon clipping algorithm: given a polygon that has been cut
// into its visible line segments, and rejoins the segments by interpolating
// along the clip edge.
/* harmony default export */ __webpack_exports__["default"] = (function(segments, compareIntersection, startInside, interpolate, stream) {
  var subject = [],
      clip = [],
      i,
      n;

  segments.forEach(function(segment) {
    if ((n = segment.length - 1) <= 0) return;
    var n, p0 = segment[0], p1 = segment[n], x;

    if (Object(_pointEqual_js__WEBPACK_IMPORTED_MODULE_0__["default"])(p0, p1)) {
      if (!p0[2] && !p1[2]) {
        stream.lineStart();
        for (i = 0; i < n; ++i) stream.point((p0 = segment[i])[0], p0[1]);
        stream.lineEnd();
        return;
      }
      // handle degenerate cases by moving the point
      p1[0] += 2 * _math_js__WEBPACK_IMPORTED_MODULE_1__["epsilon"];
    }

    subject.push(x = new Intersection(p0, segment, null, true));
    clip.push(x.o = new Intersection(p0, null, x, false));
    subject.push(x = new Intersection(p1, segment, null, false));
    clip.push(x.o = new Intersection(p1, null, x, true));
  });

  if (!subject.length) return;

  clip.sort(compareIntersection);
  link(subject);
  link(clip);

  for (i = 0, n = clip.length; i < n; ++i) {
    clip[i].e = startInside = !startInside;
  }

  var start = subject[0],
      points,
      point;

  while (1) {
    // Find first unvisited intersection.
    var current = start,
        isSubject = true;
    while (current.v) if ((current = current.n) === start) return;
    points = current.z;
    stream.lineStart();
    do {
      current.v = current.o.v = true;
      if (current.e) {
        if (isSubject) {
          for (i = 0, n = points.length; i < n; ++i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.n.x, 1, stream);
        }
        current = current.n;
      } else {
        if (isSubject) {
          points = current.p.z;
          for (i = points.length - 1; i >= 0; --i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.p.x, -1, stream);
        }
        current = current.p;
      }
      current = current.o;
      points = current.z;
      isSubject = !isSubject;
    } while (!current.v);
    stream.lineEnd();
  }
});

function link(array) {
  if (!(n = array.length)) return;
  var n,
      i = 0,
      a = array[0],
      b;
  while (++i < n) {
    a.n = b = array[i];
    b.p = a;
    a = b;
  }
  a.n = b = array[0];
  b.p = a;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/compose.js":
/*!********************************************!*\
  !*** ./node_modules/d3-geo/src/compose.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {

  function compose(x, y) {
    return x = a(x, y), b(x[0], x[1]);
  }

  if (a.invert && b.invert) compose.invert = function(x, y) {
    return x = b.invert(x, y), x && a.invert(x[0], x[1]);
  };

  return compose;
});


/***/ }),

/***/ "./node_modules/d3-geo/src/constant.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-geo/src/constant.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(x) {
  return function() {
    return x;
  };
});


/***/ }),

/***/ "./node_modules/d3-geo/src/contains.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-geo/src/contains.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _polygonContains_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polygonContains.js */ "./node_modules/d3-geo/src/polygonContains.js");
/* harmony import */ var _distance_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./distance.js */ "./node_modules/d3-geo/src/distance.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");




var containsObjectType = {
  Feature: function(object, point) {
    return containsGeometry(object.geometry, point);
  },
  FeatureCollection: function(object, point) {
    var features = object.features, i = -1, n = features.length;
    while (++i < n) if (containsGeometry(features[i].geometry, point)) return true;
    return false;
  }
};

var containsGeometryType = {
  Sphere: function() {
    return true;
  },
  Point: function(object, point) {
    return containsPoint(object.coordinates, point);
  },
  MultiPoint: function(object, point) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) if (containsPoint(coordinates[i], point)) return true;
    return false;
  },
  LineString: function(object, point) {
    return containsLine(object.coordinates, point);
  },
  MultiLineString: function(object, point) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) if (containsLine(coordinates[i], point)) return true;
    return false;
  },
  Polygon: function(object, point) {
    return containsPolygon(object.coordinates, point);
  },
  MultiPolygon: function(object, point) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) if (containsPolygon(coordinates[i], point)) return true;
    return false;
  },
  GeometryCollection: function(object, point) {
    var geometries = object.geometries, i = -1, n = geometries.length;
    while (++i < n) if (containsGeometry(geometries[i], point)) return true;
    return false;
  }
};

function containsGeometry(geometry, point) {
  return geometry && containsGeometryType.hasOwnProperty(geometry.type)
      ? containsGeometryType[geometry.type](geometry, point)
      : false;
}

function containsPoint(coordinates, point) {
  return Object(_distance_js__WEBPACK_IMPORTED_MODULE_1__["default"])(coordinates, point) === 0;
}

function containsLine(coordinates, point) {
  var ao, bo, ab;
  for (var i = 0, n = coordinates.length; i < n; i++) {
    bo = Object(_distance_js__WEBPACK_IMPORTED_MODULE_1__["default"])(coordinates[i], point);
    if (bo === 0) return true;
    if (i > 0) {
      ab = Object(_distance_js__WEBPACK_IMPORTED_MODULE_1__["default"])(coordinates[i], coordinates[i - 1]);
      if (
        ab > 0 &&
        ao <= ab &&
        bo <= ab &&
        (ao + bo - ab) * (1 - Math.pow((ao - bo) / ab, 2)) < _math_js__WEBPACK_IMPORTED_MODULE_2__["epsilon2"] * ab
      )
        return true;
    }
    ao = bo;
  }
  return false;
}

function containsPolygon(coordinates, point) {
  return !!Object(_polygonContains_js__WEBPACK_IMPORTED_MODULE_0__["default"])(coordinates.map(ringRadians), pointRadians(point));
}

function ringRadians(ring) {
  return ring = ring.map(pointRadians), ring.pop(), ring;
}

function pointRadians(point) {
  return [point[0] * _math_js__WEBPACK_IMPORTED_MODULE_2__["radians"], point[1] * _math_js__WEBPACK_IMPORTED_MODULE_2__["radians"]];
}

/* harmony default export */ __webpack_exports__["default"] = (function(object, point) {
  return (object && containsObjectType.hasOwnProperty(object.type)
      ? containsObjectType[object.type]
      : containsGeometry)(object, point);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/distance.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-geo/src/distance.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _length_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./length.js */ "./node_modules/d3-geo/src/length.js");


var coordinates = [null, null],
    object = {type: "LineString", coordinates: coordinates};

/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  coordinates[0] = a;
  coordinates[1] = b;
  return Object(_length_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/graticule.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-geo/src/graticule.js ***!
  \**********************************************/
/*! exports provided: default, graticule10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return graticule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graticule10", function() { return graticule10; });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");



function graticuleX(y0, y1, dy) {
  var y = Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["range"])(y0, y1 - _math_js__WEBPACK_IMPORTED_MODULE_1__["epsilon"], dy).concat(y1);
  return function(x) { return y.map(function(y) { return [x, y]; }); };
}

function graticuleY(x0, x1, dx) {
  var x = Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["range"])(x0, x1 - _math_js__WEBPACK_IMPORTED_MODULE_1__["epsilon"], dx).concat(x1);
  return function(y) { return x.map(function(x) { return [x, y]; }); };
}

function graticule() {
  var x1, x0, X1, X0,
      y1, y0, Y1, Y0,
      dx = 10, dy = dx, DX = 90, DY = 360,
      x, y, X, Y,
      precision = 2.5;

  function graticule() {
    return {type: "MultiLineString", coordinates: lines()};
  }

  function lines() {
    return Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["range"])(Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["ceil"])(X0 / DX) * DX, X1, DX).map(X)
        .concat(Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["range"])(Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["ceil"])(Y0 / DY) * DY, Y1, DY).map(Y))
        .concat(Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["range"])(Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["ceil"])(x0 / dx) * dx, x1, dx).filter(function(x) { return Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["abs"])(x % DX) > _math_js__WEBPACK_IMPORTED_MODULE_1__["epsilon"]; }).map(x))
        .concat(Object(d3_array__WEBPACK_IMPORTED_MODULE_0__["range"])(Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["ceil"])(y0 / dy) * dy, y1, dy).filter(function(y) { return Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["abs"])(y % DY) > _math_js__WEBPACK_IMPORTED_MODULE_1__["epsilon"]; }).map(y));
  }

  graticule.lines = function() {
    return lines().map(function(coordinates) { return {type: "LineString", coordinates: coordinates}; });
  };

  graticule.outline = function() {
    return {
      type: "Polygon",
      coordinates: [
        X(X0).concat(
        Y(Y1).slice(1),
        X(X1).reverse().slice(1),
        Y(Y0).reverse().slice(1))
      ]
    };
  };

  graticule.extent = function(_) {
    if (!arguments.length) return graticule.extentMinor();
    return graticule.extentMajor(_).extentMinor(_);
  };

  graticule.extentMajor = function(_) {
    if (!arguments.length) return [[X0, Y0], [X1, Y1]];
    X0 = +_[0][0], X1 = +_[1][0];
    Y0 = +_[0][1], Y1 = +_[1][1];
    if (X0 > X1) _ = X0, X0 = X1, X1 = _;
    if (Y0 > Y1) _ = Y0, Y0 = Y1, Y1 = _;
    return graticule.precision(precision);
  };

  graticule.extentMinor = function(_) {
    if (!arguments.length) return [[x0, y0], [x1, y1]];
    x0 = +_[0][0], x1 = +_[1][0];
    y0 = +_[0][1], y1 = +_[1][1];
    if (x0 > x1) _ = x0, x0 = x1, x1 = _;
    if (y0 > y1) _ = y0, y0 = y1, y1 = _;
    return graticule.precision(precision);
  };

  graticule.step = function(_) {
    if (!arguments.length) return graticule.stepMinor();
    return graticule.stepMajor(_).stepMinor(_);
  };

  graticule.stepMajor = function(_) {
    if (!arguments.length) return [DX, DY];
    DX = +_[0], DY = +_[1];
    return graticule;
  };

  graticule.stepMinor = function(_) {
    if (!arguments.length) return [dx, dy];
    dx = +_[0], dy = +_[1];
    return graticule;
  };

  graticule.precision = function(_) {
    if (!arguments.length) return precision;
    precision = +_;
    x = graticuleX(y0, y1, 90);
    y = graticuleY(x0, x1, precision);
    X = graticuleX(Y0, Y1, 90);
    Y = graticuleY(X0, X1, precision);
    return graticule;
  };

  return graticule
      .extentMajor([[-180, -90 + _math_js__WEBPACK_IMPORTED_MODULE_1__["epsilon"]], [180, 90 - _math_js__WEBPACK_IMPORTED_MODULE_1__["epsilon"]]])
      .extentMinor([[-180, -80 - _math_js__WEBPACK_IMPORTED_MODULE_1__["epsilon"]], [180, 80 + _math_js__WEBPACK_IMPORTED_MODULE_1__["epsilon"]]]);
}

function graticule10() {
  return graticule()();
}


/***/ }),

/***/ "./node_modules/d3-geo/src/identity.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-geo/src/identity.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(x) {
  return x;
});


/***/ }),

/***/ "./node_modules/d3-geo/src/index.js":
/*!******************************************!*\
  !*** ./node_modules/d3-geo/src/index.js ***!
  \******************************************/
/*! exports provided: geoArea, geoBounds, geoCentroid, geoCircle, geoClipAntimeridian, geoClipCircle, geoClipExtent, geoClipRectangle, geoContains, geoDistance, geoGraticule, geoGraticule10, geoInterpolate, geoLength, geoPath, geoAlbers, geoAlbersUsa, geoAzimuthalEqualArea, geoAzimuthalEqualAreaRaw, geoAzimuthalEquidistant, geoAzimuthalEquidistantRaw, geoConicConformal, geoConicConformalRaw, geoConicEqualArea, geoConicEqualAreaRaw, geoConicEquidistant, geoConicEquidistantRaw, geoEqualEarth, geoEqualEarthRaw, geoEquirectangular, geoEquirectangularRaw, geoGnomonic, geoGnomonicRaw, geoIdentity, geoProjection, geoProjectionMutator, geoMercator, geoMercatorRaw, geoNaturalEarth1, geoNaturalEarth1Raw, geoOrthographic, geoOrthographicRaw, geoStereographic, geoStereographicRaw, geoTransverseMercator, geoTransverseMercatorRaw, geoRotation, geoStream, geoTransform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _area_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./area.js */ "./node_modules/d3-geo/src/area.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoArea", function() { return _area_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _bounds_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bounds.js */ "./node_modules/d3-geo/src/bounds.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoBounds", function() { return _bounds_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _centroid_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./centroid.js */ "./node_modules/d3-geo/src/centroid.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoCentroid", function() { return _centroid_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _circle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./circle.js */ "./node_modules/d3-geo/src/circle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoCircle", function() { return _circle_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _clip_antimeridian_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./clip/antimeridian.js */ "./node_modules/d3-geo/src/clip/antimeridian.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoClipAntimeridian", function() { return _clip_antimeridian_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _clip_circle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./clip/circle.js */ "./node_modules/d3-geo/src/clip/circle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoClipCircle", function() { return _clip_circle_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _clip_extent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./clip/extent.js */ "./node_modules/d3-geo/src/clip/extent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoClipExtent", function() { return _clip_extent_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _clip_rectangle_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./clip/rectangle.js */ "./node_modules/d3-geo/src/clip/rectangle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoClipRectangle", function() { return _clip_rectangle_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./contains.js */ "./node_modules/d3-geo/src/contains.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoContains", function() { return _contains_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _distance_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./distance.js */ "./node_modules/d3-geo/src/distance.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoDistance", function() { return _distance_js__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _graticule_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./graticule.js */ "./node_modules/d3-geo/src/graticule.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoGraticule", function() { return _graticule_js__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoGraticule10", function() { return _graticule_js__WEBPACK_IMPORTED_MODULE_10__["graticule10"]; });

/* harmony import */ var _interpolate_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./interpolate.js */ "./node_modules/d3-geo/src/interpolate.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoInterpolate", function() { return _interpolate_js__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _length_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./length.js */ "./node_modules/d3-geo/src/length.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoLength", function() { return _length_js__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _path_index_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./path/index.js */ "./node_modules/d3-geo/src/path/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoPath", function() { return _path_index_js__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _projection_albers_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./projection/albers.js */ "./node_modules/d3-geo/src/projection/albers.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoAlbers", function() { return _projection_albers_js__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _projection_albersUsa_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./projection/albersUsa.js */ "./node_modules/d3-geo/src/projection/albersUsa.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoAlbersUsa", function() { return _projection_albersUsa_js__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony import */ var _projection_azimuthalEqualArea_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./projection/azimuthalEqualArea.js */ "./node_modules/d3-geo/src/projection/azimuthalEqualArea.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoAzimuthalEqualArea", function() { return _projection_azimuthalEqualArea_js__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoAzimuthalEqualAreaRaw", function() { return _projection_azimuthalEqualArea_js__WEBPACK_IMPORTED_MODULE_16__["azimuthalEqualAreaRaw"]; });

/* harmony import */ var _projection_azimuthalEquidistant_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./projection/azimuthalEquidistant.js */ "./node_modules/d3-geo/src/projection/azimuthalEquidistant.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoAzimuthalEquidistant", function() { return _projection_azimuthalEquidistant_js__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoAzimuthalEquidistantRaw", function() { return _projection_azimuthalEquidistant_js__WEBPACK_IMPORTED_MODULE_17__["azimuthalEquidistantRaw"]; });

/* harmony import */ var _projection_conicConformal_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./projection/conicConformal.js */ "./node_modules/d3-geo/src/projection/conicConformal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoConicConformal", function() { return _projection_conicConformal_js__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoConicConformalRaw", function() { return _projection_conicConformal_js__WEBPACK_IMPORTED_MODULE_18__["conicConformalRaw"]; });

/* harmony import */ var _projection_conicEqualArea_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./projection/conicEqualArea.js */ "./node_modules/d3-geo/src/projection/conicEqualArea.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoConicEqualArea", function() { return _projection_conicEqualArea_js__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoConicEqualAreaRaw", function() { return _projection_conicEqualArea_js__WEBPACK_IMPORTED_MODULE_19__["conicEqualAreaRaw"]; });

/* harmony import */ var _projection_conicEquidistant_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./projection/conicEquidistant.js */ "./node_modules/d3-geo/src/projection/conicEquidistant.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoConicEquidistant", function() { return _projection_conicEquidistant_js__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoConicEquidistantRaw", function() { return _projection_conicEquidistant_js__WEBPACK_IMPORTED_MODULE_20__["conicEquidistantRaw"]; });

/* harmony import */ var _projection_equalEarth_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./projection/equalEarth.js */ "./node_modules/d3-geo/src/projection/equalEarth.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoEqualEarth", function() { return _projection_equalEarth_js__WEBPACK_IMPORTED_MODULE_21__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoEqualEarthRaw", function() { return _projection_equalEarth_js__WEBPACK_IMPORTED_MODULE_21__["equalEarthRaw"]; });

/* harmony import */ var _projection_equirectangular_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./projection/equirectangular.js */ "./node_modules/d3-geo/src/projection/equirectangular.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoEquirectangular", function() { return _projection_equirectangular_js__WEBPACK_IMPORTED_MODULE_22__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoEquirectangularRaw", function() { return _projection_equirectangular_js__WEBPACK_IMPORTED_MODULE_22__["equirectangularRaw"]; });

/* harmony import */ var _projection_gnomonic_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./projection/gnomonic.js */ "./node_modules/d3-geo/src/projection/gnomonic.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoGnomonic", function() { return _projection_gnomonic_js__WEBPACK_IMPORTED_MODULE_23__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoGnomonicRaw", function() { return _projection_gnomonic_js__WEBPACK_IMPORTED_MODULE_23__["gnomonicRaw"]; });

/* harmony import */ var _projection_identity_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./projection/identity.js */ "./node_modules/d3-geo/src/projection/identity.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoIdentity", function() { return _projection_identity_js__WEBPACK_IMPORTED_MODULE_24__["default"]; });

/* harmony import */ var _projection_index_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./projection/index.js */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoProjection", function() { return _projection_index_js__WEBPACK_IMPORTED_MODULE_25__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoProjectionMutator", function() { return _projection_index_js__WEBPACK_IMPORTED_MODULE_25__["projectionMutator"]; });

/* harmony import */ var _projection_mercator_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./projection/mercator.js */ "./node_modules/d3-geo/src/projection/mercator.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoMercator", function() { return _projection_mercator_js__WEBPACK_IMPORTED_MODULE_26__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoMercatorRaw", function() { return _projection_mercator_js__WEBPACK_IMPORTED_MODULE_26__["mercatorRaw"]; });

/* harmony import */ var _projection_naturalEarth1_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./projection/naturalEarth1.js */ "./node_modules/d3-geo/src/projection/naturalEarth1.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoNaturalEarth1", function() { return _projection_naturalEarth1_js__WEBPACK_IMPORTED_MODULE_27__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoNaturalEarth1Raw", function() { return _projection_naturalEarth1_js__WEBPACK_IMPORTED_MODULE_27__["naturalEarth1Raw"]; });

/* harmony import */ var _projection_orthographic_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./projection/orthographic.js */ "./node_modules/d3-geo/src/projection/orthographic.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoOrthographic", function() { return _projection_orthographic_js__WEBPACK_IMPORTED_MODULE_28__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoOrthographicRaw", function() { return _projection_orthographic_js__WEBPACK_IMPORTED_MODULE_28__["orthographicRaw"]; });

/* harmony import */ var _projection_stereographic_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./projection/stereographic.js */ "./node_modules/d3-geo/src/projection/stereographic.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoStereographic", function() { return _projection_stereographic_js__WEBPACK_IMPORTED_MODULE_29__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoStereographicRaw", function() { return _projection_stereographic_js__WEBPACK_IMPORTED_MODULE_29__["stereographicRaw"]; });

/* harmony import */ var _projection_transverseMercator_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./projection/transverseMercator.js */ "./node_modules/d3-geo/src/projection/transverseMercator.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoTransverseMercator", function() { return _projection_transverseMercator_js__WEBPACK_IMPORTED_MODULE_30__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoTransverseMercatorRaw", function() { return _projection_transverseMercator_js__WEBPACK_IMPORTED_MODULE_30__["transverseMercatorRaw"]; });

/* harmony import */ var _rotation_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./rotation.js */ "./node_modules/d3-geo/src/rotation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoRotation", function() { return _rotation_js__WEBPACK_IMPORTED_MODULE_31__["default"]; });

/* harmony import */ var _stream_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./stream.js */ "./node_modules/d3-geo/src/stream.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoStream", function() { return _stream_js__WEBPACK_IMPORTED_MODULE_32__["default"]; });

/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./transform.js */ "./node_modules/d3-geo/src/transform.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "geoTransform", function() { return _transform_js__WEBPACK_IMPORTED_MODULE_33__["default"]; });







 // DEPRECATED! Use d3.geoIdentity().clipExtent(…).





























/***/ }),

/***/ "./node_modules/d3-geo/src/interpolate.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/interpolate.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");


/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  var x0 = a[0] * _math_js__WEBPACK_IMPORTED_MODULE_0__["radians"],
      y0 = a[1] * _math_js__WEBPACK_IMPORTED_MODULE_0__["radians"],
      x1 = b[0] * _math_js__WEBPACK_IMPORTED_MODULE_0__["radians"],
      y1 = b[1] * _math_js__WEBPACK_IMPORTED_MODULE_0__["radians"],
      cy0 = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(y0),
      sy0 = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(y0),
      cy1 = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(y1),
      sy1 = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(y1),
      kx0 = cy0 * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(x0),
      ky0 = cy0 * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(x0),
      kx1 = cy1 * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(x1),
      ky1 = cy1 * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(x1),
      d = 2 * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["asin"])(Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["haversin"])(y1 - y0) + cy0 * cy1 * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["haversin"])(x1 - x0))),
      k = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(d);

  var interpolate = d ? function(t) {
    var B = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(t *= d) / k,
        A = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(d - t) / k,
        x = A * kx0 + B * kx1,
        y = A * ky0 + B * ky1,
        z = A * sy0 + B * sy1;
    return [
      Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["atan2"])(y, x) * _math_js__WEBPACK_IMPORTED_MODULE_0__["degrees"],
      Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["atan2"])(z, Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(x * x + y * y)) * _math_js__WEBPACK_IMPORTED_MODULE_0__["degrees"]
    ];
  } : function() {
    return [x0 * _math_js__WEBPACK_IMPORTED_MODULE_0__["degrees"], y0 * _math_js__WEBPACK_IMPORTED_MODULE_0__["degrees"]];
  };

  interpolate.distance = d;

  return interpolate;
});


/***/ }),

/***/ "./node_modules/d3-geo/src/length.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-geo/src/length.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adder.js */ "./node_modules/d3-geo/src/adder.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./noop.js */ "./node_modules/d3-geo/src/noop.js");
/* harmony import */ var _stream_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stream.js */ "./node_modules/d3-geo/src/stream.js");





var lengthSum = Object(_adder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(),
    lambda0,
    sinPhi0,
    cosPhi0;

var lengthStream = {
  sphere: _noop_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  point: _noop_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  lineStart: lengthLineStart,
  lineEnd: _noop_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  polygonStart: _noop_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  polygonEnd: _noop_js__WEBPACK_IMPORTED_MODULE_2__["default"]
};

function lengthLineStart() {
  lengthStream.point = lengthPointFirst;
  lengthStream.lineEnd = lengthLineEnd;
}

function lengthLineEnd() {
  lengthStream.point = lengthStream.lineEnd = _noop_js__WEBPACK_IMPORTED_MODULE_2__["default"];
}

function lengthPointFirst(lambda, phi) {
  lambda *= _math_js__WEBPACK_IMPORTED_MODULE_1__["radians"], phi *= _math_js__WEBPACK_IMPORTED_MODULE_1__["radians"];
  lambda0 = lambda, sinPhi0 = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sin"])(phi), cosPhi0 = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["cos"])(phi);
  lengthStream.point = lengthPoint;
}

function lengthPoint(lambda, phi) {
  lambda *= _math_js__WEBPACK_IMPORTED_MODULE_1__["radians"], phi *= _math_js__WEBPACK_IMPORTED_MODULE_1__["radians"];
  var sinPhi = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sin"])(phi),
      cosPhi = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["cos"])(phi),
      delta = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["abs"])(lambda - lambda0),
      cosDelta = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["cos"])(delta),
      sinDelta = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sin"])(delta),
      x = cosPhi * sinDelta,
      y = cosPhi0 * sinPhi - sinPhi0 * cosPhi * cosDelta,
      z = sinPhi0 * sinPhi + cosPhi0 * cosPhi * cosDelta;
  lengthSum.add(Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["atan2"])(Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sqrt"])(x * x + y * y), z));
  lambda0 = lambda, sinPhi0 = sinPhi, cosPhi0 = cosPhi;
}

/* harmony default export */ __webpack_exports__["default"] = (function(object) {
  lengthSum.reset();
  Object(_stream_js__WEBPACK_IMPORTED_MODULE_3__["default"])(object, lengthStream);
  return +lengthSum;
});


/***/ }),

/***/ "./node_modules/d3-geo/src/math.js":
/*!*****************************************!*\
  !*** ./node_modules/d3-geo/src/math.js ***!
  \*****************************************/
/*! exports provided: epsilon, epsilon2, pi, halfPi, quarterPi, tau, degrees, radians, abs, atan, atan2, cos, ceil, exp, floor, log, pow, sin, sign, sqrt, tan, acos, asin, haversin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "epsilon", function() { return epsilon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "epsilon2", function() { return epsilon2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pi", function() { return pi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "halfPi", function() { return halfPi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quarterPi", function() { return quarterPi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tau", function() { return tau; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "degrees", function() { return degrees; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "radians", function() { return radians; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "abs", function() { return abs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "atan", function() { return atan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "atan2", function() { return atan2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cos", function() { return cos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ceil", function() { return ceil; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exp", function() { return exp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "floor", function() { return floor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pow", function() { return pow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sin", function() { return sin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sign", function() { return sign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sqrt", function() { return sqrt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tan", function() { return tan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "acos", function() { return acos; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asin", function() { return asin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "haversin", function() { return haversin; });
var epsilon = 1e-6;
var epsilon2 = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var quarterPi = pi / 4;
var tau = pi * 2;

var degrees = 180 / pi;
var radians = pi / 180;

var abs = Math.abs;
var atan = Math.atan;
var atan2 = Math.atan2;
var cos = Math.cos;
var ceil = Math.ceil;
var exp = Math.exp;
var floor = Math.floor;
var log = Math.log;
var pow = Math.pow;
var sin = Math.sin;
var sign = Math.sign || function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };
var sqrt = Math.sqrt;
var tan = Math.tan;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}

function asin(x) {
  return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);
}

function haversin(x) {
  return (x = sin(x / 2)) * x;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/noop.js":
/*!*****************************************!*\
  !*** ./node_modules/d3-geo/src/noop.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return noop; });
function noop() {}


/***/ }),

/***/ "./node_modules/d3-geo/src/path/area.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-geo/src/path/area.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../adder.js */ "./node_modules/d3-geo/src/adder.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../noop.js */ "./node_modules/d3-geo/src/noop.js");




var areaSum = Object(_adder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(),
    areaRingSum = Object(_adder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(),
    x00,
    y00,
    x0,
    y0;

var areaStream = {
  point: _noop_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  lineStart: _noop_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  lineEnd: _noop_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  polygonStart: function() {
    areaStream.lineStart = areaRingStart;
    areaStream.lineEnd = areaRingEnd;
  },
  polygonEnd: function() {
    areaStream.lineStart = areaStream.lineEnd = areaStream.point = _noop_js__WEBPACK_IMPORTED_MODULE_2__["default"];
    areaSum.add(Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["abs"])(areaRingSum));
    areaRingSum.reset();
  },
  result: function() {
    var area = areaSum / 2;
    areaSum.reset();
    return area;
  }
};

function areaRingStart() {
  areaStream.point = areaPointFirst;
}

function areaPointFirst(x, y) {
  areaStream.point = areaPoint;
  x00 = x0 = x, y00 = y0 = y;
}

function areaPoint(x, y) {
  areaRingSum.add(y0 * x - x0 * y);
  x0 = x, y0 = y;
}

function areaRingEnd() {
  areaPoint(x00, y00);
}

/* harmony default export */ __webpack_exports__["default"] = (areaStream);


/***/ }),

/***/ "./node_modules/d3-geo/src/path/bounds.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/path/bounds.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../noop.js */ "./node_modules/d3-geo/src/noop.js");


var x0 = Infinity,
    y0 = x0,
    x1 = -x0,
    y1 = x1;

var boundsStream = {
  point: boundsPoint,
  lineStart: _noop_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  lineEnd: _noop_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  polygonStart: _noop_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  polygonEnd: _noop_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  result: function() {
    var bounds = [[x0, y0], [x1, y1]];
    x1 = y1 = -(y0 = x0 = Infinity);
    return bounds;
  }
};

function boundsPoint(x, y) {
  if (x < x0) x0 = x;
  if (x > x1) x1 = x;
  if (y < y0) y0 = y;
  if (y > y1) y1 = y;
}

/* harmony default export */ __webpack_exports__["default"] = (boundsStream);


/***/ }),

/***/ "./node_modules/d3-geo/src/path/centroid.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-geo/src/path/centroid.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");


// TODO Enforce positive area for exterior, negative area for interior?

var X0 = 0,
    Y0 = 0,
    Z0 = 0,
    X1 = 0,
    Y1 = 0,
    Z1 = 0,
    X2 = 0,
    Y2 = 0,
    Z2 = 0,
    x00,
    y00,
    x0,
    y0;

var centroidStream = {
  point: centroidPoint,
  lineStart: centroidLineStart,
  lineEnd: centroidLineEnd,
  polygonStart: function() {
    centroidStream.lineStart = centroidRingStart;
    centroidStream.lineEnd = centroidRingEnd;
  },
  polygonEnd: function() {
    centroidStream.point = centroidPoint;
    centroidStream.lineStart = centroidLineStart;
    centroidStream.lineEnd = centroidLineEnd;
  },
  result: function() {
    var centroid = Z2 ? [X2 / Z2, Y2 / Z2]
        : Z1 ? [X1 / Z1, Y1 / Z1]
        : Z0 ? [X0 / Z0, Y0 / Z0]
        : [NaN, NaN];
    X0 = Y0 = Z0 =
    X1 = Y1 = Z1 =
    X2 = Y2 = Z2 = 0;
    return centroid;
  }
};

function centroidPoint(x, y) {
  X0 += x;
  Y0 += y;
  ++Z0;
}

function centroidLineStart() {
  centroidStream.point = centroidPointFirstLine;
}

function centroidPointFirstLine(x, y) {
  centroidStream.point = centroidPointLine;
  centroidPoint(x0 = x, y0 = y);
}

function centroidPointLine(x, y) {
  var dx = x - x0, dy = y - y0, z = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(dx * dx + dy * dy);
  X1 += z * (x0 + x) / 2;
  Y1 += z * (y0 + y) / 2;
  Z1 += z;
  centroidPoint(x0 = x, y0 = y);
}

function centroidLineEnd() {
  centroidStream.point = centroidPoint;
}

function centroidRingStart() {
  centroidStream.point = centroidPointFirstRing;
}

function centroidRingEnd() {
  centroidPointRing(x00, y00);
}

function centroidPointFirstRing(x, y) {
  centroidStream.point = centroidPointRing;
  centroidPoint(x00 = x0 = x, y00 = y0 = y);
}

function centroidPointRing(x, y) {
  var dx = x - x0,
      dy = y - y0,
      z = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(dx * dx + dy * dy);

  X1 += z * (x0 + x) / 2;
  Y1 += z * (y0 + y) / 2;
  Z1 += z;

  z = y0 * x - x0 * y;
  X2 += z * (x0 + x);
  Y2 += z * (y0 + y);
  Z2 += z * 3;
  centroidPoint(x0 = x, y0 = y);
}

/* harmony default export */ __webpack_exports__["default"] = (centroidStream);


/***/ }),

/***/ "./node_modules/d3-geo/src/path/context.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-geo/src/path/context.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PathContext; });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../noop.js */ "./node_modules/d3-geo/src/noop.js");



function PathContext(context) {
  this._context = context;
}

PathContext.prototype = {
  _radius: 4.5,
  pointRadius: function(_) {
    return this._radius = _, this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._context.closePath();
    this._point = NaN;
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(x, y);
        this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(x, y);
        break;
      }
      default: {
        this._context.moveTo(x + this._radius, y);
        this._context.arc(x, y, this._radius, 0, _math_js__WEBPACK_IMPORTED_MODULE_0__["tau"]);
        break;
      }
    }
  },
  result: _noop_js__WEBPACK_IMPORTED_MODULE_1__["default"]
};


/***/ }),

/***/ "./node_modules/d3-geo/src/path/index.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-geo/src/path/index.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../identity.js */ "./node_modules/d3-geo/src/identity.js");
/* harmony import */ var _stream_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stream.js */ "./node_modules/d3-geo/src/stream.js");
/* harmony import */ var _area_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./area.js */ "./node_modules/d3-geo/src/path/area.js");
/* harmony import */ var _bounds_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bounds.js */ "./node_modules/d3-geo/src/path/bounds.js");
/* harmony import */ var _centroid_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./centroid.js */ "./node_modules/d3-geo/src/path/centroid.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./context.js */ "./node_modules/d3-geo/src/path/context.js");
/* harmony import */ var _measure_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./measure.js */ "./node_modules/d3-geo/src/path/measure.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./string.js */ "./node_modules/d3-geo/src/path/string.js");









/* harmony default export */ __webpack_exports__["default"] = (function(projection, context) {
  var pointRadius = 4.5,
      projectionStream,
      contextStream;

  function path(object) {
    if (object) {
      if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
      Object(_stream_js__WEBPACK_IMPORTED_MODULE_1__["default"])(object, projectionStream(contextStream));
    }
    return contextStream.result();
  }

  path.area = function(object) {
    Object(_stream_js__WEBPACK_IMPORTED_MODULE_1__["default"])(object, projectionStream(_area_js__WEBPACK_IMPORTED_MODULE_2__["default"]));
    return _area_js__WEBPACK_IMPORTED_MODULE_2__["default"].result();
  };

  path.measure = function(object) {
    Object(_stream_js__WEBPACK_IMPORTED_MODULE_1__["default"])(object, projectionStream(_measure_js__WEBPACK_IMPORTED_MODULE_6__["default"]));
    return _measure_js__WEBPACK_IMPORTED_MODULE_6__["default"].result();
  };

  path.bounds = function(object) {
    Object(_stream_js__WEBPACK_IMPORTED_MODULE_1__["default"])(object, projectionStream(_bounds_js__WEBPACK_IMPORTED_MODULE_3__["default"]));
    return _bounds_js__WEBPACK_IMPORTED_MODULE_3__["default"].result();
  };

  path.centroid = function(object) {
    Object(_stream_js__WEBPACK_IMPORTED_MODULE_1__["default"])(object, projectionStream(_centroid_js__WEBPACK_IMPORTED_MODULE_4__["default"]));
    return _centroid_js__WEBPACK_IMPORTED_MODULE_4__["default"].result();
  };

  path.projection = function(_) {
    return arguments.length ? (projectionStream = _ == null ? (projection = null, _identity_js__WEBPACK_IMPORTED_MODULE_0__["default"]) : (projection = _).stream, path) : projection;
  };

  path.context = function(_) {
    if (!arguments.length) return context;
    contextStream = _ == null ? (context = null, new _string_js__WEBPACK_IMPORTED_MODULE_7__["default"]) : new _context_js__WEBPACK_IMPORTED_MODULE_5__["default"](context = _);
    if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
    return path;
  };

  path.pointRadius = function(_) {
    if (!arguments.length) return pointRadius;
    pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
    return path;
  };

  return path.projection(projection).context(context);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/path/measure.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-geo/src/path/measure.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../adder.js */ "./node_modules/d3-geo/src/adder.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../noop.js */ "./node_modules/d3-geo/src/noop.js");




var lengthSum = Object(_adder_js__WEBPACK_IMPORTED_MODULE_0__["default"])(),
    lengthRing,
    x00,
    y00,
    x0,
    y0;

var lengthStream = {
  point: _noop_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  lineStart: function() {
    lengthStream.point = lengthPointFirst;
  },
  lineEnd: function() {
    if (lengthRing) lengthPoint(x00, y00);
    lengthStream.point = _noop_js__WEBPACK_IMPORTED_MODULE_2__["default"];
  },
  polygonStart: function() {
    lengthRing = true;
  },
  polygonEnd: function() {
    lengthRing = null;
  },
  result: function() {
    var length = +lengthSum;
    lengthSum.reset();
    return length;
  }
};

function lengthPointFirst(x, y) {
  lengthStream.point = lengthPoint;
  x00 = x0 = x, y00 = y0 = y;
}

function lengthPoint(x, y) {
  x0 -= x, y0 -= y;
  lengthSum.add(Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sqrt"])(x0 * x0 + y0 * y0));
  x0 = x, y0 = y;
}

/* harmony default export */ __webpack_exports__["default"] = (lengthStream);


/***/ }),

/***/ "./node_modules/d3-geo/src/path/string.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/path/string.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PathString; });
function PathString() {
  this._string = [];
}

PathString.prototype = {
  _radius: 4.5,
  _circle: circle(4.5),
  pointRadius: function(_) {
    if ((_ = +_) !== this._radius) this._radius = _, this._circle = null;
    return this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._string.push("Z");
    this._point = NaN;
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._string.push("M", x, ",", y);
        this._point = 1;
        break;
      }
      case 1: {
        this._string.push("L", x, ",", y);
        break;
      }
      default: {
        if (this._circle == null) this._circle = circle(this._radius);
        this._string.push("M", x, ",", y, this._circle);
        break;
      }
    }
  },
  result: function() {
    if (this._string.length) {
      var result = this._string.join("");
      this._string = [];
      return result;
    } else {
      return null;
    }
  }
};

function circle(radius) {
  return "m0," + radius
      + "a" + radius + "," + radius + " 0 1,1 0," + -2 * radius
      + "a" + radius + "," + radius + " 0 1,1 0," + 2 * radius
      + "z";
}


/***/ }),

/***/ "./node_modules/d3-geo/src/pointEqual.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-geo/src/pointEqual.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");


/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  return Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["abs"])(a[0] - b[0]) < _math_js__WEBPACK_IMPORTED_MODULE_0__["epsilon"] && Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["abs"])(a[1] - b[1]) < _math_js__WEBPACK_IMPORTED_MODULE_0__["epsilon"];
});


/***/ }),

/***/ "./node_modules/d3-geo/src/polygonContains.js":
/*!****************************************************!*\
  !*** ./node_modules/d3-geo/src/polygonContains.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _adder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./adder.js */ "./node_modules/d3-geo/src/adder.js");
/* harmony import */ var _cartesian_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cartesian.js */ "./node_modules/d3-geo/src/cartesian.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");




var sum = Object(_adder_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

function longitude(point) {
  if (Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["abs"])(point[0]) <= _math_js__WEBPACK_IMPORTED_MODULE_2__["pi"])
    return point[0];
  else
    return Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["sign"])(point[0]) * ((Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["abs"])(point[0]) + _math_js__WEBPACK_IMPORTED_MODULE_2__["pi"]) % _math_js__WEBPACK_IMPORTED_MODULE_2__["tau"] - _math_js__WEBPACK_IMPORTED_MODULE_2__["pi"]);
}

/* harmony default export */ __webpack_exports__["default"] = (function(polygon, point) {
  var lambda = longitude(point),
      phi = point[1],
      sinPhi = Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["sin"])(phi),
      normal = [Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["sin"])(lambda), -Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["cos"])(lambda), 0],
      angle = 0,
      winding = 0;

  sum.reset();

  if (sinPhi === 1) phi = _math_js__WEBPACK_IMPORTED_MODULE_2__["halfPi"] + _math_js__WEBPACK_IMPORTED_MODULE_2__["epsilon"];
  else if (sinPhi === -1) phi = -_math_js__WEBPACK_IMPORTED_MODULE_2__["halfPi"] - _math_js__WEBPACK_IMPORTED_MODULE_2__["epsilon"];

  for (var i = 0, n = polygon.length; i < n; ++i) {
    if (!(m = (ring = polygon[i]).length)) continue;
    var ring,
        m,
        point0 = ring[m - 1],
        lambda0 = longitude(point0),
        phi0 = point0[1] / 2 + _math_js__WEBPACK_IMPORTED_MODULE_2__["quarterPi"],
        sinPhi0 = Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["sin"])(phi0),
        cosPhi0 = Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["cos"])(phi0);

    for (var j = 0; j < m; ++j, lambda0 = lambda1, sinPhi0 = sinPhi1, cosPhi0 = cosPhi1, point0 = point1) {
      var point1 = ring[j],
          lambda1 = longitude(point1),
          phi1 = point1[1] / 2 + _math_js__WEBPACK_IMPORTED_MODULE_2__["quarterPi"],
          sinPhi1 = Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["sin"])(phi1),
          cosPhi1 = Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["cos"])(phi1),
          delta = lambda1 - lambda0,
          sign = delta >= 0 ? 1 : -1,
          absDelta = sign * delta,
          antimeridian = absDelta > _math_js__WEBPACK_IMPORTED_MODULE_2__["pi"],
          k = sinPhi0 * sinPhi1;

      sum.add(Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["atan2"])(k * sign * Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["sin"])(absDelta), cosPhi0 * cosPhi1 + k * Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["cos"])(absDelta)));
      angle += antimeridian ? delta + sign * _math_js__WEBPACK_IMPORTED_MODULE_2__["tau"] : delta;

      // Are the longitudes either side of the point’s meridian (lambda),
      // and are the latitudes smaller than the parallel (phi)?
      if (antimeridian ^ lambda0 >= lambda ^ lambda1 >= lambda) {
        var arc = Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_1__["cartesianCross"])(Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_1__["cartesian"])(point0), Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_1__["cartesian"])(point1));
        Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_1__["cartesianNormalizeInPlace"])(arc);
        var intersection = Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_1__["cartesianCross"])(normal, arc);
        Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_1__["cartesianNormalizeInPlace"])(intersection);
        var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * Object(_math_js__WEBPACK_IMPORTED_MODULE_2__["asin"])(intersection[2]);
        if (phi > phiArc || phi === phiArc && (arc[0] || arc[1])) {
          winding += antimeridian ^ delta >= 0 ? 1 : -1;
        }
      }
    }
  }

  // First, determine whether the South pole is inside or outside:
  //
  // It is inside if:
  // * the polygon winds around it in a clockwise direction.
  // * the polygon does not (cumulatively) wind around it, but has a negative
  //   (counter-clockwise) area.
  //
  // Second, count the (signed) number of times a segment crosses a lambda
  // from the point to the South pole.  If it is zero, then the point is the
  // same side as the South pole.

  return (angle < -_math_js__WEBPACK_IMPORTED_MODULE_2__["epsilon"] || angle < _math_js__WEBPACK_IMPORTED_MODULE_2__["epsilon"] && sum < -_math_js__WEBPACK_IMPORTED_MODULE_2__["epsilon"]) ^ (winding & 1);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/albers.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/albers.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _conicEqualArea_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./conicEqualArea.js */ "./node_modules/d3-geo/src/projection/conicEqualArea.js");


/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Object(_conicEqualArea_js__WEBPACK_IMPORTED_MODULE_0__["default"])()
      .parallels([29.5, 45.5])
      .scale(1070)
      .translate([480, 250])
      .rotate([96, 0])
      .center([-0.6, 38.7]);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/albersUsa.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/albersUsa.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _albers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./albers.js */ "./node_modules/d3-geo/src/projection/albers.js");
/* harmony import */ var _conicEqualArea_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./conicEqualArea.js */ "./node_modules/d3-geo/src/projection/conicEqualArea.js");
/* harmony import */ var _fit_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fit.js */ "./node_modules/d3-geo/src/projection/fit.js");





// The projections must have mutually exclusive clip regions on the sphere,
// as this will avoid emitting interleaving lines and polygons.
function multiplex(streams) {
  var n = streams.length;
  return {
    point: function(x, y) { var i = -1; while (++i < n) streams[i].point(x, y); },
    sphere: function() { var i = -1; while (++i < n) streams[i].sphere(); },
    lineStart: function() { var i = -1; while (++i < n) streams[i].lineStart(); },
    lineEnd: function() { var i = -1; while (++i < n) streams[i].lineEnd(); },
    polygonStart: function() { var i = -1; while (++i < n) streams[i].polygonStart(); },
    polygonEnd: function() { var i = -1; while (++i < n) streams[i].polygonEnd(); }
  };
}

// A composite projection for the United States, configured by default for
// 960×500. The projection also works quite well at 960×600 if you change the
// scale to 1285 and adjust the translate accordingly. The set of standard
// parallels for each region comes from USGS, which is published here:
// http://egsc.usgs.gov/isb/pubs/MapProjections/projections.html#albers
/* harmony default export */ __webpack_exports__["default"] = (function() {
  var cache,
      cacheStream,
      lower48 = Object(_albers_js__WEBPACK_IMPORTED_MODULE_1__["default"])(), lower48Point,
      alaska = Object(_conicEqualArea_js__WEBPACK_IMPORTED_MODULE_2__["default"])().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]), alaskaPoint, // EPSG:3338
      hawaii = Object(_conicEqualArea_js__WEBPACK_IMPORTED_MODULE_2__["default"])().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]), hawaiiPoint, // ESRI:102007
      point, pointStream = {point: function(x, y) { point = [x, y]; }};

  function albersUsa(coordinates) {
    var x = coordinates[0], y = coordinates[1];
    return point = null,
        (lower48Point.point(x, y), point)
        || (alaskaPoint.point(x, y), point)
        || (hawaiiPoint.point(x, y), point);
  }

  albersUsa.invert = function(coordinates) {
    var k = lower48.scale(),
        t = lower48.translate(),
        x = (coordinates[0] - t[0]) / k,
        y = (coordinates[1] - t[1]) / k;
    return (y >= 0.120 && y < 0.234 && x >= -0.425 && x < -0.214 ? alaska
        : y >= 0.166 && y < 0.234 && x >= -0.214 && x < -0.115 ? hawaii
        : lower48).invert(coordinates);
  };

  albersUsa.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = multiplex([lower48.stream(cacheStream = stream), alaska.stream(stream), hawaii.stream(stream)]);
  };

  albersUsa.precision = function(_) {
    if (!arguments.length) return lower48.precision();
    lower48.precision(_), alaska.precision(_), hawaii.precision(_);
    return reset();
  };

  albersUsa.scale = function(_) {
    if (!arguments.length) return lower48.scale();
    lower48.scale(_), alaska.scale(_ * 0.35), hawaii.scale(_);
    return albersUsa.translate(lower48.translate());
  };

  albersUsa.translate = function(_) {
    if (!arguments.length) return lower48.translate();
    var k = lower48.scale(), x = +_[0], y = +_[1];

    lower48Point = lower48
        .translate(_)
        .clipExtent([[x - 0.455 * k, y - 0.238 * k], [x + 0.455 * k, y + 0.238 * k]])
        .stream(pointStream);

    alaskaPoint = alaska
        .translate([x - 0.307 * k, y + 0.201 * k])
        .clipExtent([[x - 0.425 * k + _math_js__WEBPACK_IMPORTED_MODULE_0__["epsilon"], y + 0.120 * k + _math_js__WEBPACK_IMPORTED_MODULE_0__["epsilon"]], [x - 0.214 * k - _math_js__WEBPACK_IMPORTED_MODULE_0__["epsilon"], y + 0.234 * k - _math_js__WEBPACK_IMPORTED_MODULE_0__["epsilon"]]])
        .stream(pointStream);

    hawaiiPoint = hawaii
        .translate([x - 0.205 * k, y + 0.212 * k])
        .clipExtent([[x - 0.214 * k + _math_js__WEBPACK_IMPORTED_MODULE_0__["epsilon"], y + 0.166 * k + _math_js__WEBPACK_IMPORTED_MODULE_0__["epsilon"]], [x - 0.115 * k - _math_js__WEBPACK_IMPORTED_MODULE_0__["epsilon"], y + 0.234 * k - _math_js__WEBPACK_IMPORTED_MODULE_0__["epsilon"]]])
        .stream(pointStream);

    return reset();
  };

  albersUsa.fitExtent = function(extent, object) {
    return Object(_fit_js__WEBPACK_IMPORTED_MODULE_3__["fitExtent"])(albersUsa, extent, object);
  };

  albersUsa.fitSize = function(size, object) {
    return Object(_fit_js__WEBPACK_IMPORTED_MODULE_3__["fitSize"])(albersUsa, size, object);
  };

  albersUsa.fitWidth = function(width, object) {
    return Object(_fit_js__WEBPACK_IMPORTED_MODULE_3__["fitWidth"])(albersUsa, width, object);
  };

  albersUsa.fitHeight = function(height, object) {
    return Object(_fit_js__WEBPACK_IMPORTED_MODULE_3__["fitHeight"])(albersUsa, height, object);
  };

  function reset() {
    cache = cacheStream = null;
    return albersUsa;
  }

  return albersUsa.scale(1070);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/azimuthal.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/azimuthal.js ***!
  \*********************************************************/
/*! exports provided: azimuthalRaw, azimuthalInvert */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "azimuthalRaw", function() { return azimuthalRaw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "azimuthalInvert", function() { return azimuthalInvert; });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");


function azimuthalRaw(scale) {
  return function(x, y) {
    var cx = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(x),
        cy = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(y),
        k = scale(cx * cy);
    return [
      k * cy * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(x),
      k * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(y)
    ];
  }
}

function azimuthalInvert(angle) {
  return function(x, y) {
    var z = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(x * x + y * y),
        c = angle(z),
        sc = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(c),
        cc = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(c);
    return [
      Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["atan2"])(x * sc, z * cc),
      Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["asin"])(z && y * sc / z)
    ];
  }
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/azimuthalEqualArea.js":
/*!******************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/azimuthalEqualArea.js ***!
  \******************************************************************/
/*! exports provided: azimuthalEqualAreaRaw, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "azimuthalEqualAreaRaw", function() { return azimuthalEqualAreaRaw; });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _azimuthal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./azimuthal.js */ "./node_modules/d3-geo/src/projection/azimuthal.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/projection/index.js");




var azimuthalEqualAreaRaw = Object(_azimuthal_js__WEBPACK_IMPORTED_MODULE_1__["azimuthalRaw"])(function(cxcy) {
  return Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(2 / (1 + cxcy));
});

azimuthalEqualAreaRaw.invert = Object(_azimuthal_js__WEBPACK_IMPORTED_MODULE_1__["azimuthalInvert"])(function(z) {
  return 2 * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["asin"])(z / 2);
});

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Object(_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(azimuthalEqualAreaRaw)
      .scale(124.75)
      .clipAngle(180 - 1e-3);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/azimuthalEquidistant.js":
/*!********************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/azimuthalEquidistant.js ***!
  \********************************************************************/
/*! exports provided: azimuthalEquidistantRaw, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "azimuthalEquidistantRaw", function() { return azimuthalEquidistantRaw; });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _azimuthal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./azimuthal.js */ "./node_modules/d3-geo/src/projection/azimuthal.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/projection/index.js");




var azimuthalEquidistantRaw = Object(_azimuthal_js__WEBPACK_IMPORTED_MODULE_1__["azimuthalRaw"])(function(c) {
  return (c = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["acos"])(c)) && c / Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(c);
});

azimuthalEquidistantRaw.invert = Object(_azimuthal_js__WEBPACK_IMPORTED_MODULE_1__["azimuthalInvert"])(function(z) {
  return z;
});

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Object(_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(azimuthalEquidistantRaw)
      .scale(79.4188)
      .clipAngle(180 - 1e-3);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/conic.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/conic.js ***!
  \*****************************************************/
/*! exports provided: conicProjection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conicProjection", function() { return conicProjection; });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/projection/index.js");



function conicProjection(projectAt) {
  var phi0 = 0,
      phi1 = _math_js__WEBPACK_IMPORTED_MODULE_0__["pi"] / 3,
      m = Object(_index_js__WEBPACK_IMPORTED_MODULE_1__["projectionMutator"])(projectAt),
      p = m(phi0, phi1);

  p.parallels = function(_) {
    return arguments.length ? m(phi0 = _[0] * _math_js__WEBPACK_IMPORTED_MODULE_0__["radians"], phi1 = _[1] * _math_js__WEBPACK_IMPORTED_MODULE_0__["radians"]) : [phi0 * _math_js__WEBPACK_IMPORTED_MODULE_0__["degrees"], phi1 * _math_js__WEBPACK_IMPORTED_MODULE_0__["degrees"]];
  };

  return p;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/conicConformal.js":
/*!**************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/conicConformal.js ***!
  \**************************************************************/
/*! exports provided: conicConformalRaw, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conicConformalRaw", function() { return conicConformalRaw; });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _conic_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./conic.js */ "./node_modules/d3-geo/src/projection/conic.js");
/* harmony import */ var _mercator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mercator.js */ "./node_modules/d3-geo/src/projection/mercator.js");




function tany(y) {
  return Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["tan"])((_math_js__WEBPACK_IMPORTED_MODULE_0__["halfPi"] + y) / 2);
}

function conicConformalRaw(y0, y1) {
  var cy0 = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(y0),
      n = y0 === y1 ? Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(y0) : Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["log"])(cy0 / Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(y1)) / Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["log"])(tany(y1) / tany(y0)),
      f = cy0 * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["pow"])(tany(y0), n) / n;

  if (!n) return _mercator_js__WEBPACK_IMPORTED_MODULE_2__["mercatorRaw"];

  function project(x, y) {
    if (f > 0) { if (y < -_math_js__WEBPACK_IMPORTED_MODULE_0__["halfPi"] + _math_js__WEBPACK_IMPORTED_MODULE_0__["epsilon"]) y = -_math_js__WEBPACK_IMPORTED_MODULE_0__["halfPi"] + _math_js__WEBPACK_IMPORTED_MODULE_0__["epsilon"]; }
    else { if (y > _math_js__WEBPACK_IMPORTED_MODULE_0__["halfPi"] - _math_js__WEBPACK_IMPORTED_MODULE_0__["epsilon"]) y = _math_js__WEBPACK_IMPORTED_MODULE_0__["halfPi"] - _math_js__WEBPACK_IMPORTED_MODULE_0__["epsilon"]; }
    var r = f / Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["pow"])(tany(y), n);
    return [r * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(n * x), f - r * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(n * x)];
  }

  project.invert = function(x, y) {
    var fy = f - y, r = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sign"])(n) * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(x * x + fy * fy),
      l = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["atan2"])(x, Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["abs"])(fy)) * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sign"])(fy);
    if (fy * n < 0)
      l -= _math_js__WEBPACK_IMPORTED_MODULE_0__["pi"] * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sign"])(x) * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sign"])(fy);
    return [l / n, 2 * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["atan"])(Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["pow"])(f / r, 1 / n)) - _math_js__WEBPACK_IMPORTED_MODULE_0__["halfPi"]];
  };

  return project;
}

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Object(_conic_js__WEBPACK_IMPORTED_MODULE_1__["conicProjection"])(conicConformalRaw)
      .scale(109.5)
      .parallels([30, 30]);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/conicEqualArea.js":
/*!**************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/conicEqualArea.js ***!
  \**************************************************************/
/*! exports provided: conicEqualAreaRaw, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conicEqualAreaRaw", function() { return conicEqualAreaRaw; });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _conic_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./conic.js */ "./node_modules/d3-geo/src/projection/conic.js");
/* harmony import */ var _cylindricalEqualArea_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cylindricalEqualArea.js */ "./node_modules/d3-geo/src/projection/cylindricalEqualArea.js");




function conicEqualAreaRaw(y0, y1) {
  var sy0 = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(y0), n = (sy0 + Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(y1)) / 2;

  // Are the parallels symmetrical around the Equator?
  if (Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["abs"])(n) < _math_js__WEBPACK_IMPORTED_MODULE_0__["epsilon"]) return Object(_cylindricalEqualArea_js__WEBPACK_IMPORTED_MODULE_2__["cylindricalEqualAreaRaw"])(y0);

  var c = 1 + sy0 * (2 * n - sy0), r0 = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(c) / n;

  function project(x, y) {
    var r = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(c - 2 * n * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(y)) / n;
    return [r * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(x *= n), r0 - r * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(x)];
  }

  project.invert = function(x, y) {
    var r0y = r0 - y,
        l = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["atan2"])(x, Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["abs"])(r0y)) * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sign"])(r0y);
    if (r0y * n < 0)
      l -= _math_js__WEBPACK_IMPORTED_MODULE_0__["pi"] * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sign"])(x) * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sign"])(r0y);
    return [l / n, Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["asin"])((c - (x * x + r0y * r0y) * n * n) / (2 * n))];
  };

  return project;
}

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Object(_conic_js__WEBPACK_IMPORTED_MODULE_1__["conicProjection"])(conicEqualAreaRaw)
      .scale(155.424)
      .center([0, 33.6442]);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/conicEquidistant.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/conicEquidistant.js ***!
  \****************************************************************/
/*! exports provided: conicEquidistantRaw, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "conicEquidistantRaw", function() { return conicEquidistantRaw; });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _conic_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./conic.js */ "./node_modules/d3-geo/src/projection/conic.js");
/* harmony import */ var _equirectangular_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./equirectangular.js */ "./node_modules/d3-geo/src/projection/equirectangular.js");




function conicEquidistantRaw(y0, y1) {
  var cy0 = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(y0),
      n = y0 === y1 ? Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(y0) : (cy0 - Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(y1)) / (y1 - y0),
      g = cy0 / n + y0;

  if (Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["abs"])(n) < _math_js__WEBPACK_IMPORTED_MODULE_0__["epsilon"]) return _equirectangular_js__WEBPACK_IMPORTED_MODULE_2__["equirectangularRaw"];

  function project(x, y) {
    var gy = g - y, nx = n * x;
    return [gy * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(nx), g - gy * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(nx)];
  }

  project.invert = function(x, y) {
    var gy = g - y,
        l = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["atan2"])(x, Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["abs"])(gy)) * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sign"])(gy);
    if (gy * n < 0)
      l -= _math_js__WEBPACK_IMPORTED_MODULE_0__["pi"] * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sign"])(x) * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sign"])(gy);
    return [l / n, g - Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sign"])(n) * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sqrt"])(x * x + gy * gy)];
  };

  return project;
}

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Object(_conic_js__WEBPACK_IMPORTED_MODULE_1__["conicProjection"])(conicEquidistantRaw)
      .scale(131.154)
      .center([0, 13.9389]);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/cylindricalEqualArea.js":
/*!********************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/cylindricalEqualArea.js ***!
  \********************************************************************/
/*! exports provided: cylindricalEqualAreaRaw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cylindricalEqualAreaRaw", function() { return cylindricalEqualAreaRaw; });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");


function cylindricalEqualAreaRaw(phi0) {
  var cosPhi0 = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(phi0);

  function forward(lambda, phi) {
    return [lambda * cosPhi0, Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(phi) / cosPhi0];
  }

  forward.invert = function(x, y) {
    return [x / cosPhi0, Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["asin"])(y * cosPhi0)];
  };

  return forward;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/equalEarth.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/equalEarth.js ***!
  \**********************************************************/
/*! exports provided: equalEarthRaw, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equalEarthRaw", function() { return equalEarthRaw; });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");



var A1 = 1.340264,
    A2 = -0.081106,
    A3 = 0.000893,
    A4 = 0.003796,
    M = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sqrt"])(3) / 2,
    iterations = 12;

function equalEarthRaw(lambda, phi) {
  var l = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["asin"])(M * Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sin"])(phi)), l2 = l * l, l6 = l2 * l2 * l2;
  return [
    lambda * Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["cos"])(l) / (M * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2))),
    l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2))
  ];
}

equalEarthRaw.invert = function(x, y) {
  var l = y, l2 = l * l, l6 = l2 * l2 * l2;
  for (var i = 0, delta, fy, fpy; i < iterations; ++i) {
    fy = l * (A1 + A2 * l2 + l6 * (A3 + A4 * l2)) - y;
    fpy = A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2);
    l -= delta = fy / fpy, l2 = l * l, l6 = l2 * l2 * l2;
    if (Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["abs"])(delta) < _math_js__WEBPACK_IMPORTED_MODULE_1__["epsilon2"]) break;
  }
  return [
    M * x * (A1 + 3 * A2 * l2 + l6 * (7 * A3 + 9 * A4 * l2)) / Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["cos"])(l),
    Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["asin"])(Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sin"])(l) / M)
  ];
};

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Object(_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(equalEarthRaw)
      .scale(177.158);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/equirectangular.js":
/*!***************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/equirectangular.js ***!
  \***************************************************************/
/*! exports provided: equirectangularRaw, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "equirectangularRaw", function() { return equirectangularRaw; });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/projection/index.js");


function equirectangularRaw(lambda, phi) {
  return [lambda, phi];
}

equirectangularRaw.invert = equirectangularRaw;

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Object(_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(equirectangularRaw)
      .scale(152.63);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/fit.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/fit.js ***!
  \***************************************************/
/*! exports provided: fitExtent, fitSize, fitWidth, fitHeight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fitExtent", function() { return fitExtent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fitSize", function() { return fitSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fitWidth", function() { return fitWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fitHeight", function() { return fitHeight; });
/* harmony import */ var _stream_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stream.js */ "./node_modules/d3-geo/src/stream.js");
/* harmony import */ var _path_bounds_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../path/bounds.js */ "./node_modules/d3-geo/src/path/bounds.js");



function fit(projection, fitBounds, object) {
  var clip = projection.clipExtent && projection.clipExtent();
  projection.scale(150).translate([0, 0]);
  if (clip != null) projection.clipExtent(null);
  Object(_stream_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object, projection.stream(_path_bounds_js__WEBPACK_IMPORTED_MODULE_1__["default"]));
  fitBounds(_path_bounds_js__WEBPACK_IMPORTED_MODULE_1__["default"].result());
  if (clip != null) projection.clipExtent(clip);
  return projection;
}

function fitExtent(projection, extent, object) {
  return fit(projection, function(b) {
    var w = extent[1][0] - extent[0][0],
        h = extent[1][1] - extent[0][1],
        k = Math.min(w / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1])),
        x = +extent[0][0] + (w - k * (b[1][0] + b[0][0])) / 2,
        y = +extent[0][1] + (h - k * (b[1][1] + b[0][1])) / 2;
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

function fitSize(projection, size, object) {
  return fitExtent(projection, [[0, 0], size], object);
}

function fitWidth(projection, width, object) {
  return fit(projection, function(b) {
    var w = +width,
        k = w / (b[1][0] - b[0][0]),
        x = (w - k * (b[1][0] + b[0][0])) / 2,
        y = -k * b[0][1];
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

function fitHeight(projection, height, object) {
  return fit(projection, function(b) {
    var h = +height,
        k = h / (b[1][1] - b[0][1]),
        x = -k * b[0][0],
        y = (h - k * (b[1][1] + b[0][1])) / 2;
    projection.scale(150 * k).translate([x, y]);
  }, object);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/gnomonic.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/gnomonic.js ***!
  \********************************************************/
/*! exports provided: gnomonicRaw, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gnomonicRaw", function() { return gnomonicRaw; });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _azimuthal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./azimuthal.js */ "./node_modules/d3-geo/src/projection/azimuthal.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/projection/index.js");




function gnomonicRaw(x, y) {
  var cy = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(y), k = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(x) * cy;
  return [cy * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(x) / k, Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(y) / k];
}

gnomonicRaw.invert = Object(_azimuthal_js__WEBPACK_IMPORTED_MODULE_1__["azimuthalInvert"])(_math_js__WEBPACK_IMPORTED_MODULE_0__["atan"]);

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Object(_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(gnomonicRaw)
      .scale(144.049)
      .clipAngle(60);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/identity.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/identity.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _clip_rectangle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../clip/rectangle.js */ "./node_modules/d3-geo/src/clip/rectangle.js");
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../identity.js */ "./node_modules/d3-geo/src/identity.js");
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../transform.js */ "./node_modules/d3-geo/src/transform.js");
/* harmony import */ var _fit_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fit.js */ "./node_modules/d3-geo/src/projection/fit.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");






/* harmony default export */ __webpack_exports__["default"] = (function() {
  var k = 1, tx = 0, ty = 0, sx = 1, sy = 1, // scale, translate and reflect
      alpha = 0, ca, sa, // angle
      x0 = null, y0, x1, y1, // clip extent
      kx = 1, ky = 1,
      transform = Object(_transform_js__WEBPACK_IMPORTED_MODULE_2__["transformer"])({
        point: function(x, y) {
          var p = projection([x, y])
          this.stream.point(p[0], p[1]);
        }
      }),
      postclip = _identity_js__WEBPACK_IMPORTED_MODULE_1__["default"],
      cache,
      cacheStream;

  function reset() {
    kx = k * sx;
    ky = k * sy;
    cache = cacheStream = null;
    return projection;
  }

  function projection (p) {
    var x = p[0] * kx, y = p[1] * ky;
    if (alpha) {
      var t = y * ca - x * sa;
      x = x * ca + y * sa;
      y = t;
    }    
    return [x + tx, y + ty];
  }
  projection.invert = function(p) {
    var x = p[0] - tx, y = p[1] - ty;
    if (alpha) {
      var t = y * ca + x * sa;
      x = x * ca - y * sa;
      y = t;
    }
    return [x / kx, y / ky];
  };
  projection.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = transform(postclip(cacheStream = stream));
  };
  projection.postclip = function(_) {
    return arguments.length ? (postclip = _, x0 = y0 = x1 = y1 = null, reset()) : postclip;
  };
  projection.clipExtent = function(_) {
    return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, _identity_js__WEBPACK_IMPORTED_MODULE_1__["default"]) : Object(_clip_rectangle_js__WEBPACK_IMPORTED_MODULE_0__["default"])(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };
  projection.scale = function(_) {
    return arguments.length ? (k = +_, reset()) : k;
  };
  projection.translate = function(_) {
    return arguments.length ? (tx = +_[0], ty = +_[1], reset()) : [tx, ty];
  }
  projection.angle = function(_) {
    return arguments.length ? (alpha = _ % 360 * _math_js__WEBPACK_IMPORTED_MODULE_4__["radians"], sa = Object(_math_js__WEBPACK_IMPORTED_MODULE_4__["sin"])(alpha), ca = Object(_math_js__WEBPACK_IMPORTED_MODULE_4__["cos"])(alpha), reset()) : alpha * _math_js__WEBPACK_IMPORTED_MODULE_4__["degrees"];
  };
  projection.reflectX = function(_) {
    return arguments.length ? (sx = _ ? -1 : 1, reset()) : sx < 0;
  };
  projection.reflectY = function(_) {
    return arguments.length ? (sy = _ ? -1 : 1, reset()) : sy < 0;
  };
  projection.fitExtent = function(extent, object) {
    return Object(_fit_js__WEBPACK_IMPORTED_MODULE_3__["fitExtent"])(projection, extent, object);
  };
  projection.fitSize = function(size, object) {
    return Object(_fit_js__WEBPACK_IMPORTED_MODULE_3__["fitSize"])(projection, size, object);
  };
  projection.fitWidth = function(width, object) {
    return Object(_fit_js__WEBPACK_IMPORTED_MODULE_3__["fitWidth"])(projection, width, object);
  };
  projection.fitHeight = function(height, object) {
    return Object(_fit_js__WEBPACK_IMPORTED_MODULE_3__["fitHeight"])(projection, height, object);
  };

  return projection;
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/index.js ***!
  \*****************************************************/
/*! exports provided: default, projectionMutator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return projection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "projectionMutator", function() { return projectionMutator; });
/* harmony import */ var _clip_antimeridian_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../clip/antimeridian.js */ "./node_modules/d3-geo/src/clip/antimeridian.js");
/* harmony import */ var _clip_circle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../clip/circle.js */ "./node_modules/d3-geo/src/clip/circle.js");
/* harmony import */ var _clip_rectangle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../clip/rectangle.js */ "./node_modules/d3-geo/src/clip/rectangle.js");
/* harmony import */ var _compose_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../compose.js */ "./node_modules/d3-geo/src/compose.js");
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../identity.js */ "./node_modules/d3-geo/src/identity.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _rotation_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../rotation.js */ "./node_modules/d3-geo/src/rotation.js");
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../transform.js */ "./node_modules/d3-geo/src/transform.js");
/* harmony import */ var _fit_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./fit.js */ "./node_modules/d3-geo/src/projection/fit.js");
/* harmony import */ var _resample_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./resample.js */ "./node_modules/d3-geo/src/projection/resample.js");











var transformRadians = Object(_transform_js__WEBPACK_IMPORTED_MODULE_7__["transformer"])({
  point: function(x, y) {
    this.stream.point(x * _math_js__WEBPACK_IMPORTED_MODULE_5__["radians"], y * _math_js__WEBPACK_IMPORTED_MODULE_5__["radians"]);
  }
});

function transformRotate(rotate) {
  return Object(_transform_js__WEBPACK_IMPORTED_MODULE_7__["transformer"])({
    point: function(x, y) {
      var r = rotate(x, y);
      return this.stream.point(r[0], r[1]);
    }
  });
}

function scaleTranslate(k, dx, dy, sx, sy) {
  function transform(x, y) {
    x *= sx; y *= sy;
    return [dx + k * x, dy - k * y];
  }
  transform.invert = function(x, y) {
    return [(x - dx) / k * sx, (dy - y) / k * sy];
  };
  return transform;
}

function scaleTranslateRotate(k, dx, dy, sx, sy, alpha) {
  var cosAlpha = Object(_math_js__WEBPACK_IMPORTED_MODULE_5__["cos"])(alpha),
      sinAlpha = Object(_math_js__WEBPACK_IMPORTED_MODULE_5__["sin"])(alpha),
      a = cosAlpha * k,
      b = sinAlpha * k,
      ai = cosAlpha / k,
      bi = sinAlpha / k,
      ci = (sinAlpha * dy - cosAlpha * dx) / k,
      fi = (sinAlpha * dx + cosAlpha * dy) / k;
  function transform(x, y) {
    x *= sx; y *= sy;
    return [a * x - b * y + dx, dy - b * x - a * y];
  }
  transform.invert = function(x, y) {
    return [sx * (ai * x - bi * y + ci), sy * (fi - bi * x - ai * y)];
  };
  return transform;
}

function projection(project) {
  return projectionMutator(function() { return project; })();
}

function projectionMutator(projectAt) {
  var project,
      k = 150, // scale
      x = 480, y = 250, // translate
      lambda = 0, phi = 0, // center
      deltaLambda = 0, deltaPhi = 0, deltaGamma = 0, rotate, // pre-rotate
      alpha = 0, // post-rotate angle
      sx = 1, // reflectX
      sy = 1, // reflectX
      theta = null, preclip = _clip_antimeridian_js__WEBPACK_IMPORTED_MODULE_0__["default"], // pre-clip angle
      x0 = null, y0, x1, y1, postclip = _identity_js__WEBPACK_IMPORTED_MODULE_4__["default"], // post-clip extent
      delta2 = 0.5, // precision
      projectResample,
      projectTransform,
      projectRotateTransform,
      cache,
      cacheStream;

  function projection(point) {
    return projectRotateTransform(point[0] * _math_js__WEBPACK_IMPORTED_MODULE_5__["radians"], point[1] * _math_js__WEBPACK_IMPORTED_MODULE_5__["radians"]);
  }

  function invert(point) {
    point = projectRotateTransform.invert(point[0], point[1]);
    return point && [point[0] * _math_js__WEBPACK_IMPORTED_MODULE_5__["degrees"], point[1] * _math_js__WEBPACK_IMPORTED_MODULE_5__["degrees"]];
  }

  projection.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = transformRadians(transformRotate(rotate)(preclip(projectResample(postclip(cacheStream = stream)))));
  };

  projection.preclip = function(_) {
    return arguments.length ? (preclip = _, theta = undefined, reset()) : preclip;
  };

  projection.postclip = function(_) {
    return arguments.length ? (postclip = _, x0 = y0 = x1 = y1 = null, reset()) : postclip;
  };

  projection.clipAngle = function(_) {
    return arguments.length ? (preclip = +_ ? Object(_clip_circle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(theta = _ * _math_js__WEBPACK_IMPORTED_MODULE_5__["radians"]) : (theta = null, _clip_antimeridian_js__WEBPACK_IMPORTED_MODULE_0__["default"]), reset()) : theta * _math_js__WEBPACK_IMPORTED_MODULE_5__["degrees"];
  };

  projection.clipExtent = function(_) {
    return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, _identity_js__WEBPACK_IMPORTED_MODULE_4__["default"]) : Object(_clip_rectangle_js__WEBPACK_IMPORTED_MODULE_2__["default"])(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  projection.scale = function(_) {
    return arguments.length ? (k = +_, recenter()) : k;
  };

  projection.translate = function(_) {
    return arguments.length ? (x = +_[0], y = +_[1], recenter()) : [x, y];
  };

  projection.center = function(_) {
    return arguments.length ? (lambda = _[0] % 360 * _math_js__WEBPACK_IMPORTED_MODULE_5__["radians"], phi = _[1] % 360 * _math_js__WEBPACK_IMPORTED_MODULE_5__["radians"], recenter()) : [lambda * _math_js__WEBPACK_IMPORTED_MODULE_5__["degrees"], phi * _math_js__WEBPACK_IMPORTED_MODULE_5__["degrees"]];
  };

  projection.rotate = function(_) {
    return arguments.length ? (deltaLambda = _[0] % 360 * _math_js__WEBPACK_IMPORTED_MODULE_5__["radians"], deltaPhi = _[1] % 360 * _math_js__WEBPACK_IMPORTED_MODULE_5__["radians"], deltaGamma = _.length > 2 ? _[2] % 360 * _math_js__WEBPACK_IMPORTED_MODULE_5__["radians"] : 0, recenter()) : [deltaLambda * _math_js__WEBPACK_IMPORTED_MODULE_5__["degrees"], deltaPhi * _math_js__WEBPACK_IMPORTED_MODULE_5__["degrees"], deltaGamma * _math_js__WEBPACK_IMPORTED_MODULE_5__["degrees"]];
  };

  projection.angle = function(_) {
    return arguments.length ? (alpha = _ % 360 * _math_js__WEBPACK_IMPORTED_MODULE_5__["radians"], recenter()) : alpha * _math_js__WEBPACK_IMPORTED_MODULE_5__["degrees"];
  };

  projection.reflectX = function(_) {
    return arguments.length ? (sx = _ ? -1 : 1, recenter()) : sx < 0;
  };

  projection.reflectY = function(_) {
    return arguments.length ? (sy = _ ? -1 : 1, recenter()) : sy < 0;
  };

  projection.precision = function(_) {
    return arguments.length ? (projectResample = Object(_resample_js__WEBPACK_IMPORTED_MODULE_9__["default"])(projectTransform, delta2 = _ * _), reset()) : Object(_math_js__WEBPACK_IMPORTED_MODULE_5__["sqrt"])(delta2);
  };

  projection.fitExtent = function(extent, object) {
    return Object(_fit_js__WEBPACK_IMPORTED_MODULE_8__["fitExtent"])(projection, extent, object);
  };

  projection.fitSize = function(size, object) {
    return Object(_fit_js__WEBPACK_IMPORTED_MODULE_8__["fitSize"])(projection, size, object);
  };

  projection.fitWidth = function(width, object) {
    return Object(_fit_js__WEBPACK_IMPORTED_MODULE_8__["fitWidth"])(projection, width, object);
  };

  projection.fitHeight = function(height, object) {
    return Object(_fit_js__WEBPACK_IMPORTED_MODULE_8__["fitHeight"])(projection, height, object);
  };

  function recenter() {
    var center = scaleTranslateRotate(k, 0, 0, sx, sy, alpha).apply(null, project(lambda, phi)),
        transform = (alpha ? scaleTranslateRotate : scaleTranslate)(k, x - center[0], y - center[1], sx, sy, alpha);
    rotate = Object(_rotation_js__WEBPACK_IMPORTED_MODULE_6__["rotateRadians"])(deltaLambda, deltaPhi, deltaGamma);
    projectTransform = Object(_compose_js__WEBPACK_IMPORTED_MODULE_3__["default"])(project, transform);
    projectRotateTransform = Object(_compose_js__WEBPACK_IMPORTED_MODULE_3__["default"])(rotate, projectTransform);
    projectResample = Object(_resample_js__WEBPACK_IMPORTED_MODULE_9__["default"])(projectTransform, delta2);
    return reset();
  }

  function reset() {
    cache = cacheStream = null;
    return projection;
  }

  return function() {
    project = projectAt.apply(this, arguments);
    projection.invert = project.invert && invert;
    return recenter();
  };
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/mercator.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/mercator.js ***!
  \********************************************************/
/*! exports provided: mercatorRaw, default, mercatorProjection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mercatorRaw", function() { return mercatorRaw; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mercatorProjection", function() { return mercatorProjection; });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _rotation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../rotation.js */ "./node_modules/d3-geo/src/rotation.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/projection/index.js");




function mercatorRaw(lambda, phi) {
  return [lambda, Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["log"])(Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["tan"])((_math_js__WEBPACK_IMPORTED_MODULE_0__["halfPi"] + phi) / 2))];
}

mercatorRaw.invert = function(x, y) {
  return [x, 2 * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["atan"])(Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["exp"])(y)) - _math_js__WEBPACK_IMPORTED_MODULE_0__["halfPi"]];
};

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return mercatorProjection(mercatorRaw)
      .scale(961 / _math_js__WEBPACK_IMPORTED_MODULE_0__["tau"]);
});

function mercatorProjection(project) {
  var m = Object(_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(project),
      center = m.center,
      scale = m.scale,
      translate = m.translate,
      clipExtent = m.clipExtent,
      x0 = null, y0, x1, y1; // clip extent

  m.scale = function(_) {
    return arguments.length ? (scale(_), reclip()) : scale();
  };

  m.translate = function(_) {
    return arguments.length ? (translate(_), reclip()) : translate();
  };

  m.center = function(_) {
    return arguments.length ? (center(_), reclip()) : center();
  };

  m.clipExtent = function(_) {
    return arguments.length ? ((_ == null ? x0 = y0 = x1 = y1 = null : (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1])), reclip()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  function reclip() {
    var k = _math_js__WEBPACK_IMPORTED_MODULE_0__["pi"] * scale(),
        t = m(Object(_rotation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(m.rotate()).invert([0, 0]));
    return clipExtent(x0 == null
        ? [[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]] : project === mercatorRaw
        ? [[Math.max(t[0] - k, x0), y0], [Math.min(t[0] + k, x1), y1]]
        : [[x0, Math.max(t[1] - k, y0)], [x1, Math.min(t[1] + k, y1)]]);
  }

  return reclip();
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/naturalEarth1.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/naturalEarth1.js ***!
  \*************************************************************/
/*! exports provided: naturalEarth1Raw, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "naturalEarth1Raw", function() { return naturalEarth1Raw; });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/projection/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");



function naturalEarth1Raw(lambda, phi) {
  var phi2 = phi * phi, phi4 = phi2 * phi2;
  return [
    lambda * (0.8707 - 0.131979 * phi2 + phi4 * (-0.013791 + phi4 * (0.003971 * phi2 - 0.001529 * phi4))),
    phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4)))
  ];
}

naturalEarth1Raw.invert = function(x, y) {
  var phi = y, i = 25, delta;
  do {
    var phi2 = phi * phi, phi4 = phi2 * phi2;
    phi -= delta = (phi * (1.007226 + phi2 * (0.015085 + phi4 * (-0.044475 + 0.028874 * phi2 - 0.005916 * phi4))) - y) /
        (1.007226 + phi2 * (0.015085 * 3 + phi4 * (-0.044475 * 7 + 0.028874 * 9 * phi2 - 0.005916 * 11 * phi4)));
  } while (Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["abs"])(delta) > _math_js__WEBPACK_IMPORTED_MODULE_1__["epsilon"] && --i > 0);
  return [
    x / (0.8707 + (phi2 = phi * phi) * (-0.131979 + phi2 * (-0.013791 + phi2 * phi2 * phi2 * (0.003971 - 0.001529 * phi2)))),
    phi
  ];
};

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Object(_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(naturalEarth1Raw)
      .scale(175.295);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/orthographic.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/orthographic.js ***!
  \************************************************************/
/*! exports provided: orthographicRaw, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "orthographicRaw", function() { return orthographicRaw; });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _azimuthal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./azimuthal.js */ "./node_modules/d3-geo/src/projection/azimuthal.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/projection/index.js");




function orthographicRaw(x, y) {
  return [Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(y) * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(x), Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(y)];
}

orthographicRaw.invert = Object(_azimuthal_js__WEBPACK_IMPORTED_MODULE_1__["azimuthalInvert"])(_math_js__WEBPACK_IMPORTED_MODULE_0__["asin"]);

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Object(_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(orthographicRaw)
      .scale(249.5)
      .clipAngle(90 + _math_js__WEBPACK_IMPORTED_MODULE_0__["epsilon"]);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/resample.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/resample.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cartesian_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cartesian.js */ "./node_modules/d3-geo/src/cartesian.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../transform.js */ "./node_modules/d3-geo/src/transform.js");




var maxDepth = 16, // maximum depth of subdivision
    cosMinDistance = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["cos"])(30 * _math_js__WEBPACK_IMPORTED_MODULE_1__["radians"]); // cos(minimum angular distance)

/* harmony default export */ __webpack_exports__["default"] = (function(project, delta2) {
  return +delta2 ? resample(project, delta2) : resampleNone(project);
});

function resampleNone(project) {
  return Object(_transform_js__WEBPACK_IMPORTED_MODULE_2__["transformer"])({
    point: function(x, y) {
      x = project(x, y);
      this.stream.point(x[0], x[1]);
    }
  });
}

function resample(project, delta2) {

  function resampleLineTo(x0, y0, lambda0, a0, b0, c0, x1, y1, lambda1, a1, b1, c1, depth, stream) {
    var dx = x1 - x0,
        dy = y1 - y0,
        d2 = dx * dx + dy * dy;
    if (d2 > 4 * delta2 && depth--) {
      var a = a0 + a1,
          b = b0 + b1,
          c = c0 + c1,
          m = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sqrt"])(a * a + b * b + c * c),
          phi2 = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["asin"])(c /= m),
          lambda2 = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["abs"])(Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["abs"])(c) - 1) < _math_js__WEBPACK_IMPORTED_MODULE_1__["epsilon"] || Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["abs"])(lambda0 - lambda1) < _math_js__WEBPACK_IMPORTED_MODULE_1__["epsilon"] ? (lambda0 + lambda1) / 2 : Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["atan2"])(b, a),
          p = project(lambda2, phi2),
          x2 = p[0],
          y2 = p[1],
          dx2 = x2 - x0,
          dy2 = y2 - y0,
          dz = dy * dx2 - dx * dy2;
      if (dz * dz / d2 > delta2 // perpendicular projected distance
          || Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["abs"])((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 // midpoint close to an end
          || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) { // angular distance
        resampleLineTo(x0, y0, lambda0, a0, b0, c0, x2, y2, lambda2, a /= m, b /= m, c, depth, stream);
        stream.point(x2, y2);
        resampleLineTo(x2, y2, lambda2, a, b, c, x1, y1, lambda1, a1, b1, c1, depth, stream);
      }
    }
  }
  return function(stream) {
    var lambda00, x00, y00, a00, b00, c00, // first point
        lambda0, x0, y0, a0, b0, c0; // previous point

    var resampleStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() { stream.polygonStart(); resampleStream.lineStart = ringStart; },
      polygonEnd: function() { stream.polygonEnd(); resampleStream.lineStart = lineStart; }
    };

    function point(x, y) {
      x = project(x, y);
      stream.point(x[0], x[1]);
    }

    function lineStart() {
      x0 = NaN;
      resampleStream.point = linePoint;
      stream.lineStart();
    }

    function linePoint(lambda, phi) {
      var c = Object(_cartesian_js__WEBPACK_IMPORTED_MODULE_0__["cartesian"])([lambda, phi]), p = project(lambda, phi);
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x0 = p[0], y0 = p[1], lambda0 = lambda, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
      stream.point(x0, y0);
    }

    function lineEnd() {
      resampleStream.point = point;
      stream.lineEnd();
    }

    function ringStart() {
      lineStart();
      resampleStream.point = ringPoint;
      resampleStream.lineEnd = ringEnd;
    }

    function ringPoint(lambda, phi) {
      linePoint(lambda00 = lambda, phi), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
      resampleStream.point = linePoint;
    }

    function ringEnd() {
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x00, y00, lambda00, a00, b00, c00, maxDepth, stream);
      resampleStream.lineEnd = lineEnd;
      lineEnd();
    }

    return resampleStream;
  };
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/stereographic.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/stereographic.js ***!
  \*************************************************************/
/*! exports provided: stereographicRaw, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stereographicRaw", function() { return stereographicRaw; });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _azimuthal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./azimuthal.js */ "./node_modules/d3-geo/src/projection/azimuthal.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/projection/index.js");




function stereographicRaw(x, y) {
  var cy = Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(y), k = 1 + Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["cos"])(x) * cy;
  return [cy * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(x) / k, Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["sin"])(y) / k];
}

stereographicRaw.invert = Object(_azimuthal_js__WEBPACK_IMPORTED_MODULE_1__["azimuthalInvert"])(function(z) {
  return 2 * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["atan"])(z);
});

/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Object(_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])(stereographicRaw)
      .scale(250)
      .clipAngle(142);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/transverseMercator.js":
/*!******************************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/transverseMercator.js ***!
  \******************************************************************/
/*! exports provided: transverseMercatorRaw, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transverseMercatorRaw", function() { return transverseMercatorRaw; });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _mercator_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mercator.js */ "./node_modules/d3-geo/src/projection/mercator.js");



function transverseMercatorRaw(lambda, phi) {
  return [Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["log"])(Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["tan"])((_math_js__WEBPACK_IMPORTED_MODULE_0__["halfPi"] + phi) / 2)), -lambda];
}

transverseMercatorRaw.invert = function(x, y) {
  return [-y, 2 * Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["atan"])(Object(_math_js__WEBPACK_IMPORTED_MODULE_0__["exp"])(x)) - _math_js__WEBPACK_IMPORTED_MODULE_0__["halfPi"]];
};

/* harmony default export */ __webpack_exports__["default"] = (function() {
  var m = Object(_mercator_js__WEBPACK_IMPORTED_MODULE_1__["mercatorProjection"])(transverseMercatorRaw),
      center = m.center,
      rotate = m.rotate;

  m.center = function(_) {
    return arguments.length ? center([-_[1], _[0]]) : (_ = center(), [_[1], -_[0]]);
  };

  m.rotate = function(_) {
    return arguments.length ? rotate([_[0], _[1], _.length > 2 ? _[2] + 90 : 90]) : (_ = rotate(), [_[0], _[1], _[2] - 90]);
  };

  return rotate([0, 0, 90])
      .scale(159.155);
});


/***/ }),

/***/ "./node_modules/d3-geo/src/rotation.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-geo/src/rotation.js ***!
  \*********************************************/
/*! exports provided: rotateRadians, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rotateRadians", function() { return rotateRadians; });
/* harmony import */ var _compose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./compose.js */ "./node_modules/d3-geo/src/compose.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");



function rotationIdentity(lambda, phi) {
  return [Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["abs"])(lambda) > _math_js__WEBPACK_IMPORTED_MODULE_1__["pi"] ? lambda + Math.round(-lambda / _math_js__WEBPACK_IMPORTED_MODULE_1__["tau"]) * _math_js__WEBPACK_IMPORTED_MODULE_1__["tau"] : lambda, phi];
}

rotationIdentity.invert = rotationIdentity;

function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
  return (deltaLambda %= _math_js__WEBPACK_IMPORTED_MODULE_1__["tau"]) ? (deltaPhi || deltaGamma ? Object(_compose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma))
    : rotationLambda(deltaLambda))
    : (deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma)
    : rotationIdentity);
}

function forwardRotationLambda(deltaLambda) {
  return function(lambda, phi) {
    return lambda += deltaLambda, [lambda > _math_js__WEBPACK_IMPORTED_MODULE_1__["pi"] ? lambda - _math_js__WEBPACK_IMPORTED_MODULE_1__["tau"] : lambda < -_math_js__WEBPACK_IMPORTED_MODULE_1__["pi"] ? lambda + _math_js__WEBPACK_IMPORTED_MODULE_1__["tau"] : lambda, phi];
  };
}

function rotationLambda(deltaLambda) {
  var rotation = forwardRotationLambda(deltaLambda);
  rotation.invert = forwardRotationLambda(-deltaLambda);
  return rotation;
}

function rotationPhiGamma(deltaPhi, deltaGamma) {
  var cosDeltaPhi = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["cos"])(deltaPhi),
      sinDeltaPhi = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sin"])(deltaPhi),
      cosDeltaGamma = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["cos"])(deltaGamma),
      sinDeltaGamma = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sin"])(deltaGamma);

  function rotation(lambda, phi) {
    var cosPhi = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["cos"])(phi),
        x = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["cos"])(lambda) * cosPhi,
        y = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sin"])(lambda) * cosPhi,
        z = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sin"])(phi),
        k = z * cosDeltaPhi + x * sinDeltaPhi;
    return [
      Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["atan2"])(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - z * sinDeltaPhi),
      Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["asin"])(k * cosDeltaGamma + y * sinDeltaGamma)
    ];
  }

  rotation.invert = function(lambda, phi) {
    var cosPhi = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["cos"])(phi),
        x = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["cos"])(lambda) * cosPhi,
        y = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sin"])(lambda) * cosPhi,
        z = Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["sin"])(phi),
        k = z * cosDeltaGamma - y * sinDeltaGamma;
    return [
      Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["atan2"])(y * cosDeltaGamma + z * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi),
      Object(_math_js__WEBPACK_IMPORTED_MODULE_1__["asin"])(k * cosDeltaPhi - x * sinDeltaPhi)
    ];
  };

  return rotation;
}

/* harmony default export */ __webpack_exports__["default"] = (function(rotate) {
  rotate = rotateRadians(rotate[0] * _math_js__WEBPACK_IMPORTED_MODULE_1__["radians"], rotate[1] * _math_js__WEBPACK_IMPORTED_MODULE_1__["radians"], rotate.length > 2 ? rotate[2] * _math_js__WEBPACK_IMPORTED_MODULE_1__["radians"] : 0);

  function forward(coordinates) {
    coordinates = rotate(coordinates[0] * _math_js__WEBPACK_IMPORTED_MODULE_1__["radians"], coordinates[1] * _math_js__WEBPACK_IMPORTED_MODULE_1__["radians"]);
    return coordinates[0] *= _math_js__WEBPACK_IMPORTED_MODULE_1__["degrees"], coordinates[1] *= _math_js__WEBPACK_IMPORTED_MODULE_1__["degrees"], coordinates;
  }

  forward.invert = function(coordinates) {
    coordinates = rotate.invert(coordinates[0] * _math_js__WEBPACK_IMPORTED_MODULE_1__["radians"], coordinates[1] * _math_js__WEBPACK_IMPORTED_MODULE_1__["radians"]);
    return coordinates[0] *= _math_js__WEBPACK_IMPORTED_MODULE_1__["degrees"], coordinates[1] *= _math_js__WEBPACK_IMPORTED_MODULE_1__["degrees"], coordinates;
  };

  return forward;
});


/***/ }),

/***/ "./node_modules/d3-geo/src/stream.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-geo/src/stream.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function streamGeometry(geometry, stream) {
  if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {
    streamGeometryType[geometry.type](geometry, stream);
  }
}

var streamObjectType = {
  Feature: function(object, stream) {
    streamGeometry(object.geometry, stream);
  },
  FeatureCollection: function(object, stream) {
    var features = object.features, i = -1, n = features.length;
    while (++i < n) streamGeometry(features[i].geometry, stream);
  }
};

var streamGeometryType = {
  Sphere: function(object, stream) {
    stream.sphere();
  },
  Point: function(object, stream) {
    object = object.coordinates;
    stream.point(object[0], object[1], object[2]);
  },
  MultiPoint: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) object = coordinates[i], stream.point(object[0], object[1], object[2]);
  },
  LineString: function(object, stream) {
    streamLine(object.coordinates, stream, 0);
  },
  MultiLineString: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamLine(coordinates[i], stream, 0);
  },
  Polygon: function(object, stream) {
    streamPolygon(object.coordinates, stream);
  },
  MultiPolygon: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamPolygon(coordinates[i], stream);
  },
  GeometryCollection: function(object, stream) {
    var geometries = object.geometries, i = -1, n = geometries.length;
    while (++i < n) streamGeometry(geometries[i], stream);
  }
};

function streamLine(coordinates, stream, closed) {
  var i = -1, n = coordinates.length - closed, coordinate;
  stream.lineStart();
  while (++i < n) coordinate = coordinates[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);
  stream.lineEnd();
}

function streamPolygon(coordinates, stream) {
  var i = -1, n = coordinates.length;
  stream.polygonStart();
  while (++i < n) streamLine(coordinates[i], stream, 1);
  stream.polygonEnd();
}

/* harmony default export */ __webpack_exports__["default"] = (function(object, stream) {
  if (object && streamObjectType.hasOwnProperty(object.type)) {
    streamObjectType[object.type](object, stream);
  } else {
    streamGeometry(object, stream);
  }
});


/***/ }),

/***/ "./node_modules/d3-geo/src/transform.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-geo/src/transform.js ***!
  \**********************************************/
/*! exports provided: default, transformer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformer", function() { return transformer; });
/* harmony default export */ __webpack_exports__["default"] = (function(methods) {
  return {
    stream: transformer(methods)
  };
});

function transformer(methods) {
  return function(stream) {
    var s = new TransformStream;
    for (var key in methods) s[key] = methods[key];
    s.stream = stream;
    return s;
  };
}

function TransformStream() {}

TransformStream.prototype = {
  constructor: TransformStream,
  point: function(x, y) { this.stream.point(x, y); },
  sphere: function() { this.stream.sphere(); },
  lineStart: function() { this.stream.lineStart(); },
  lineEnd: function() { this.stream.lineEnd(); },
  polygonStart: function() { this.stream.polygonStart(); },
  polygonEnd: function() { this.stream.polygonEnd(); }
};


/***/ }),

/***/ "./node_modules/delaunator/index.js":
/*!******************************************!*\
  !*** ./node_modules/delaunator/index.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Delaunator; });

const EPSILON = Math.pow(2, -52);
const EDGE_STACK = new Uint32Array(512);

class Delaunator {

    static from(points, getX = defaultGetX, getY = defaultGetY) {
        const n = points.length;
        const coords = new Float64Array(n * 2);

        for (let i = 0; i < n; i++) {
            const p = points[i];
            coords[2 * i] = getX(p);
            coords[2 * i + 1] = getY(p);
        }

        return new Delaunator(coords);
    }

    constructor(coords) {
        const n = coords.length >> 1;
        if (n > 0 && typeof coords[0] !== 'number') throw new Error('Expected coords to contain numbers.');

        this.coords = coords;

        // arrays that will store the triangulation graph
        const maxTriangles = Math.max(2 * n - 5, 0);
        this._triangles = new Uint32Array(maxTriangles * 3);
        this._halfedges = new Int32Array(maxTriangles * 3);

        // temporary arrays for tracking the edges of the advancing convex hull
        this._hashSize = Math.ceil(Math.sqrt(n));
        this._hullPrev = new Uint32Array(n); // edge to prev edge
        this._hullNext = new Uint32Array(n); // edge to next edge
        this._hullTri = new Uint32Array(n); // edge to adjacent triangle
        this._hullHash = new Int32Array(this._hashSize).fill(-1); // angular edge hash

        // temporary arrays for sorting points
        this._ids = new Uint32Array(n);
        this._dists = new Float64Array(n);

        this.update();
    }

    update() {
        const {coords, _hullPrev: hullPrev, _hullNext: hullNext, _hullTri: hullTri, _hullHash: hullHash} =  this;
        const n = coords.length >> 1;

        // populate an array of point indices; calculate input data bbox
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        for (let i = 0; i < n; i++) {
            const x = coords[2 * i];
            const y = coords[2 * i + 1];
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
            this._ids[i] = i;
        }
        const cx = (minX + maxX) / 2;
        const cy = (minY + maxY) / 2;

        let minDist = Infinity;
        let i0, i1, i2;

        // pick a seed point close to the center
        for (let i = 0; i < n; i++) {
            const d = dist(cx, cy, coords[2 * i], coords[2 * i + 1]);
            if (d < minDist) {
                i0 = i;
                minDist = d;
            }
        }
        const i0x = coords[2 * i0];
        const i0y = coords[2 * i0 + 1];

        minDist = Infinity;

        // find the point closest to the seed
        for (let i = 0; i < n; i++) {
            if (i === i0) continue;
            const d = dist(i0x, i0y, coords[2 * i], coords[2 * i + 1]);
            if (d < minDist && d > 0) {
                i1 = i;
                minDist = d;
            }
        }
        let i1x = coords[2 * i1];
        let i1y = coords[2 * i1 + 1];

        let minRadius = Infinity;

        // find the third point which forms the smallest circumcircle with the first two
        for (let i = 0; i < n; i++) {
            if (i === i0 || i === i1) continue;
            const r = circumradius(i0x, i0y, i1x, i1y, coords[2 * i], coords[2 * i + 1]);
            if (r < minRadius) {
                i2 = i;
                minRadius = r;
            }
        }
        let i2x = coords[2 * i2];
        let i2y = coords[2 * i2 + 1];

        if (minRadius === Infinity) {
            // order collinear points by dx (or dy if all x are identical)
            // and return the list as a hull
            for (let i = 0; i < n; i++) {
                this._dists[i] = (coords[2 * i] - coords[0]) || (coords[2 * i + 1] - coords[1]);
            }
            quicksort(this._ids, this._dists, 0, n - 1);
            const hull = new Uint32Array(n);
            let j = 0;
            for (let i = 0, d0 = -Infinity; i < n; i++) {
                const id = this._ids[i];
                if (this._dists[id] > d0) {
                    hull[j++] = id;
                    d0 = this._dists[id];
                }
            }
            this.hull = hull.subarray(0, j);
            this.triangles = new Uint32Array(0);
            this.halfedges = new Uint32Array(0);
            return;
        }

        // swap the order of the seed points for counter-clockwise orientation
        if (orient(i0x, i0y, i1x, i1y, i2x, i2y)) {
            const i = i1;
            const x = i1x;
            const y = i1y;
            i1 = i2;
            i1x = i2x;
            i1y = i2y;
            i2 = i;
            i2x = x;
            i2y = y;
        }

        const center = circumcenter(i0x, i0y, i1x, i1y, i2x, i2y);
        this._cx = center.x;
        this._cy = center.y;

        for (let i = 0; i < n; i++) {
            this._dists[i] = dist(coords[2 * i], coords[2 * i + 1], center.x, center.y);
        }

        // sort the points by distance from the seed triangle circumcenter
        quicksort(this._ids, this._dists, 0, n - 1);

        // set up the seed triangle as the starting hull
        this._hullStart = i0;
        let hullSize = 3;

        hullNext[i0] = hullPrev[i2] = i1;
        hullNext[i1] = hullPrev[i0] = i2;
        hullNext[i2] = hullPrev[i1] = i0;

        hullTri[i0] = 0;
        hullTri[i1] = 1;
        hullTri[i2] = 2;

        hullHash.fill(-1);
        hullHash[this._hashKey(i0x, i0y)] = i0;
        hullHash[this._hashKey(i1x, i1y)] = i1;
        hullHash[this._hashKey(i2x, i2y)] = i2;

        this.trianglesLen = 0;
        this._addTriangle(i0, i1, i2, -1, -1, -1);

        for (let k = 0, xp, yp; k < this._ids.length; k++) {
            const i = this._ids[k];
            const x = coords[2 * i];
            const y = coords[2 * i + 1];

            // skip near-duplicate points
            if (k > 0 && Math.abs(x - xp) <= EPSILON && Math.abs(y - yp) <= EPSILON) continue;
            xp = x;
            yp = y;

            // skip seed triangle points
            if (i === i0 || i === i1 || i === i2) continue;

            // find a visible edge on the convex hull using edge hash
            let start = 0;
            for (let j = 0, key = this._hashKey(x, y); j < this._hashSize; j++) {
                start = hullHash[(key + j) % this._hashSize];
                if (start !== -1 && start !== hullNext[start]) break;
            }

            start = hullPrev[start];
            let e = start, q;
            while (q = hullNext[e], !orient(x, y, coords[2 * e], coords[2 * e + 1], coords[2 * q], coords[2 * q + 1])) {
                e = q;
                if (e === start) {
                    e = -1;
                    break;
                }
            }
            if (e === -1) continue; // likely a near-duplicate point; skip it

            // add the first triangle from the point
            let t = this._addTriangle(e, i, hullNext[e], -1, -1, hullTri[e]);

            // recursively flip triangles from the point until they satisfy the Delaunay condition
            hullTri[i] = this._legalize(t + 2);
            hullTri[e] = t; // keep track of boundary triangles on the hull
            hullSize++;

            // walk forward through the hull, adding more triangles and flipping recursively
            let n = hullNext[e];
            while (q = hullNext[n], orient(x, y, coords[2 * n], coords[2 * n + 1], coords[2 * q], coords[2 * q + 1])) {
                t = this._addTriangle(n, i, q, hullTri[i], -1, hullTri[n]);
                hullTri[i] = this._legalize(t + 2);
                hullNext[n] = n; // mark as removed
                hullSize--;
                n = q;
            }

            // walk backward from the other side, adding more triangles and flipping
            if (e === start) {
                while (q = hullPrev[e], orient(x, y, coords[2 * q], coords[2 * q + 1], coords[2 * e], coords[2 * e + 1])) {
                    t = this._addTriangle(q, i, e, -1, hullTri[e], hullTri[q]);
                    this._legalize(t + 2);
                    hullTri[q] = t;
                    hullNext[e] = e; // mark as removed
                    hullSize--;
                    e = q;
                }
            }

            // update the hull indices
            this._hullStart = hullPrev[i] = e;
            hullNext[e] = hullPrev[n] = i;
            hullNext[i] = n;

            // save the two new edges in the hash table
            hullHash[this._hashKey(x, y)] = i;
            hullHash[this._hashKey(coords[2 * e], coords[2 * e + 1])] = e;
        }

        this.hull = new Uint32Array(hullSize);
        for (let i = 0, e = this._hullStart; i < hullSize; i++) {
            this.hull[i] = e;
            e = hullNext[e];
        }

        // trim typed triangle mesh arrays
        this.triangles = this._triangles.subarray(0, this.trianglesLen);
        this.halfedges = this._halfedges.subarray(0, this.trianglesLen);
    }

    _hashKey(x, y) {
        return Math.floor(pseudoAngle(x - this._cx, y - this._cy) * this._hashSize) % this._hashSize;
    }

    _legalize(a) {
        const {_triangles: triangles, _halfedges: halfedges, coords} = this;

        let i = 0;
        let ar = 0;

        // recursion eliminated with a fixed-size stack
        while (true) {
            const b = halfedges[a];

            /* if the pair of triangles doesn't satisfy the Delaunay condition
             * (p1 is inside the circumcircle of [p0, pl, pr]), flip them,
             * then do the same check/flip recursively for the new pair of triangles
             *
             *           pl                    pl
             *          /||\                  /  \
             *       al/ || \bl            al/    \a
             *        /  ||  \              /      \
             *       /  a||b  \    flip    /___ar___\
             *     p0\   ||   /p1   =>   p0\---bl---/p1
             *        \  ||  /              \      /
             *       ar\ || /br             b\    /br
             *          \||/                  \  /
             *           pr                    pr
             */
            const a0 = a - a % 3;
            ar = a0 + (a + 2) % 3;

            if (b === -1) { // convex hull edge
                if (i === 0) break;
                a = EDGE_STACK[--i];
                continue;
            }

            const b0 = b - b % 3;
            const al = a0 + (a + 1) % 3;
            const bl = b0 + (b + 2) % 3;

            const p0 = triangles[ar];
            const pr = triangles[a];
            const pl = triangles[al];
            const p1 = triangles[bl];

            const illegal = inCircle(
                coords[2 * p0], coords[2 * p0 + 1],
                coords[2 * pr], coords[2 * pr + 1],
                coords[2 * pl], coords[2 * pl + 1],
                coords[2 * p1], coords[2 * p1 + 1]);

            if (illegal) {
                triangles[a] = p1;
                triangles[b] = p0;

                const hbl = halfedges[bl];

                // edge swapped on the other side of the hull (rare); fix the halfedge reference
                if (hbl === -1) {
                    let e = this._hullStart;
                    do {
                        if (this._hullTri[e] === bl) {
                            this._hullTri[e] = a;
                            break;
                        }
                        e = this._hullPrev[e];
                    } while (e !== this._hullStart);
                }
                this._link(a, hbl);
                this._link(b, halfedges[ar]);
                this._link(ar, bl);

                const br = b0 + (b + 1) % 3;

                // don't worry about hitting the cap: it can only happen on extremely degenerate input
                if (i < EDGE_STACK.length) {
                    EDGE_STACK[i++] = br;
                }
            } else {
                if (i === 0) break;
                a = EDGE_STACK[--i];
            }
        }

        return ar;
    }

    _link(a, b) {
        this._halfedges[a] = b;
        if (b !== -1) this._halfedges[b] = a;
    }

    // add a new triangle given vertex indices and adjacent half-edge ids
    _addTriangle(i0, i1, i2, a, b, c) {
        const t = this.trianglesLen;

        this._triangles[t] = i0;
        this._triangles[t + 1] = i1;
        this._triangles[t + 2] = i2;

        this._link(t, a);
        this._link(t + 1, b);
        this._link(t + 2, c);

        this.trianglesLen += 3;

        return t;
    }
}

// monotonically increases with real angle, but doesn't need expensive trigonometry
function pseudoAngle(dx, dy) {
    const p = dx / (Math.abs(dx) + Math.abs(dy));
    return (dy > 0 ? 3 - p : 1 + p) / 4; // [0..1]
}

function dist(ax, ay, bx, by) {
    const dx = ax - bx;
    const dy = ay - by;
    return dx * dx + dy * dy;
}

// return 2d orientation sign if we're confident in it through J. Shewchuk's error bound check
function orientIfSure(px, py, rx, ry, qx, qy) {
    const l = (ry - py) * (qx - px);
    const r = (rx - px) * (qy - py);
    return Math.abs(l - r) >= 3.3306690738754716e-16 * Math.abs(l + r) ? l - r : 0;
}

// a more robust orientation test that's stable in a given triangle (to fix robustness issues)
function orient(rx, ry, qx, qy, px, py) {
    const sign = orientIfSure(px, py, rx, ry, qx, qy) ||
    orientIfSure(rx, ry, qx, qy, px, py) ||
    orientIfSure(qx, qy, px, py, rx, ry);
    return sign < 0;
}

function inCircle(ax, ay, bx, by, cx, cy, px, py) {
    const dx = ax - px;
    const dy = ay - py;
    const ex = bx - px;
    const ey = by - py;
    const fx = cx - px;
    const fy = cy - py;

    const ap = dx * dx + dy * dy;
    const bp = ex * ex + ey * ey;
    const cp = fx * fx + fy * fy;

    return dx * (ey * cp - bp * fy) -
           dy * (ex * cp - bp * fx) +
           ap * (ex * fy - ey * fx) < 0;
}

function circumradius(ax, ay, bx, by, cx, cy) {
    const dx = bx - ax;
    const dy = by - ay;
    const ex = cx - ax;
    const ey = cy - ay;

    const bl = dx * dx + dy * dy;
    const cl = ex * ex + ey * ey;
    const d = 0.5 / (dx * ey - dy * ex);

    const x = (ey * bl - dy * cl) * d;
    const y = (dx * cl - ex * bl) * d;

    return x * x + y * y;
}

function circumcenter(ax, ay, bx, by, cx, cy) {
    const dx = bx - ax;
    const dy = by - ay;
    const ex = cx - ax;
    const ey = cy - ay;

    const bl = dx * dx + dy * dy;
    const cl = ex * ex + ey * ey;
    const d = 0.5 / (dx * ey - dy * ex);

    const x = ax + (ey * bl - dy * cl) * d;
    const y = ay + (dx * cl - ex * bl) * d;

    return {x, y};
}

function quicksort(ids, dists, left, right) {
    if (right - left <= 20) {
        for (let i = left + 1; i <= right; i++) {
            const temp = ids[i];
            const tempDist = dists[temp];
            let j = i - 1;
            while (j >= left && dists[ids[j]] > tempDist) ids[j + 1] = ids[j--];
            ids[j + 1] = temp;
        }
    } else {
        const median = (left + right) >> 1;
        let i = left + 1;
        let j = right;
        swap(ids, median, i);
        if (dists[ids[left]] > dists[ids[right]]) swap(ids, left, right);
        if (dists[ids[i]] > dists[ids[right]]) swap(ids, i, right);
        if (dists[ids[left]] > dists[ids[i]]) swap(ids, left, i);

        const temp = ids[i];
        const tempDist = dists[temp];
        while (true) {
            do i++; while (dists[ids[i]] < tempDist);
            do j--; while (dists[ids[j]] > tempDist);
            if (j < i) break;
            swap(ids, i, j);
        }
        ids[left + 1] = ids[j];
        ids[j] = temp;

        if (right - i + 1 >= j - left) {
            quicksort(ids, dists, i, right);
            quicksort(ids, dists, left, j - 1);
        } else {
            quicksort(ids, dists, left, j - 1);
            quicksort(ids, dists, i, right);
        }
    }
}

function swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

function defaultGetX(p) {
    return p[0];
}
function defaultGetY(p) {
    return p[1];
}


/***/ }),

/***/ "./node_modules/earcut/src/earcut.js":
/*!*******************************************!*\
  !*** ./node_modules/earcut/src/earcut.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = earcut;
module.exports.default = earcut;

function earcut(data, holeIndices, dim) {

    dim = dim || 2;

    var hasHoles = holeIndices && holeIndices.length,
        outerLen = hasHoles ? holeIndices[0] * dim : data.length,
        outerNode = linkedList(data, 0, outerLen, dim, true),
        triangles = [];

    if (!outerNode || outerNode.next === outerNode.prev) return triangles;

    var minX, minY, maxX, maxY, x, y, invSize;

    if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim);

    // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
    if (data.length > 80 * dim) {
        minX = maxX = data[0];
        minY = maxY = data[1];

        for (var i = dim; i < outerLen; i += dim) {
            x = data[i];
            y = data[i + 1];
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
        }

        // minX, minY and invSize are later used to transform coords into integers for z-order calculation
        invSize = Math.max(maxX - minX, maxY - minY);
        invSize = invSize !== 0 ? 1 / invSize : 0;
    }

    earcutLinked(outerNode, triangles, dim, minX, minY, invSize);

    return triangles;
}

// create a circular doubly linked list from polygon points in the specified winding order
function linkedList(data, start, end, dim, clockwise) {
    var i, last;

    if (clockwise === (signedArea(data, start, end, dim) > 0)) {
        for (i = start; i < end; i += dim) last = insertNode(i, data[i], data[i + 1], last);
    } else {
        for (i = end - dim; i >= start; i -= dim) last = insertNode(i, data[i], data[i + 1], last);
    }

    if (last && equals(last, last.next)) {
        removeNode(last);
        last = last.next;
    }

    return last;
}

// eliminate colinear or duplicate points
function filterPoints(start, end) {
    if (!start) return start;
    if (!end) end = start;

    var p = start,
        again;
    do {
        again = false;

        if (!p.steiner && (equals(p, p.next) || area(p.prev, p, p.next) === 0)) {
            removeNode(p);
            p = end = p.prev;
            if (p === p.next) break;
            again = true;

        } else {
            p = p.next;
        }
    } while (again || p !== end);

    return end;
}

// main ear slicing loop which triangulates a polygon (given as a linked list)
function earcutLinked(ear, triangles, dim, minX, minY, invSize, pass) {
    if (!ear) return;

    // interlink polygon nodes in z-order
    if (!pass && invSize) indexCurve(ear, minX, minY, invSize);

    var stop = ear,
        prev, next;

    // iterate through ears, slicing them one by one
    while (ear.prev !== ear.next) {
        prev = ear.prev;
        next = ear.next;

        if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
            // cut off the triangle
            triangles.push(prev.i / dim);
            triangles.push(ear.i / dim);
            triangles.push(next.i / dim);

            removeNode(ear);

            // skipping the next vertex leads to less sliver triangles
            ear = next.next;
            stop = next.next;

            continue;
        }

        ear = next;

        // if we looped through the whole remaining polygon and can't find any more ears
        if (ear === stop) {
            // try filtering points and slicing again
            if (!pass) {
                earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1);

            // if this didn't work, try curing all small self-intersections locally
            } else if (pass === 1) {
                ear = cureLocalIntersections(filterPoints(ear), triangles, dim);
                earcutLinked(ear, triangles, dim, minX, minY, invSize, 2);

            // as a last resort, try splitting the remaining polygon into two
            } else if (pass === 2) {
                splitEarcut(ear, triangles, dim, minX, minY, invSize);
            }

            break;
        }
    }
}

// check whether a polygon node forms a valid ear with adjacent nodes
function isEar(ear) {
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // now make sure we don't have other points inside the potential ear
    var p = ear.next.next;

    while (p !== ear.prev) {
        if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.next;
    }

    return true;
}

function isEarHashed(ear, minX, minY, invSize) {
    var a = ear.prev,
        b = ear,
        c = ear.next;

    if (area(a, b, c) >= 0) return false; // reflex, can't be an ear

    // triangle bbox; min & max are calculated like this for speed
    var minTX = a.x < b.x ? (a.x < c.x ? a.x : c.x) : (b.x < c.x ? b.x : c.x),
        minTY = a.y < b.y ? (a.y < c.y ? a.y : c.y) : (b.y < c.y ? b.y : c.y),
        maxTX = a.x > b.x ? (a.x > c.x ? a.x : c.x) : (b.x > c.x ? b.x : c.x),
        maxTY = a.y > b.y ? (a.y > c.y ? a.y : c.y) : (b.y > c.y ? b.y : c.y);

    // z-order range for the current triangle bbox;
    var minZ = zOrder(minTX, minTY, minX, minY, invSize),
        maxZ = zOrder(maxTX, maxTY, minX, minY, invSize);

    var p = ear.prevZ,
        n = ear.nextZ;

    // look for points inside the triangle in both directions
    while (p && p.z >= minZ && n && n.z <= maxZ) {
        if (p !== ear.prev && p !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;

        if (n !== ear.prev && n !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) &&
            area(n.prev, n, n.next) >= 0) return false;
        n = n.nextZ;
    }

    // look for remaining points in decreasing z-order
    while (p && p.z >= minZ) {
        if (p !== ear.prev && p !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
            area(p.prev, p, p.next) >= 0) return false;
        p = p.prevZ;
    }

    // look for remaining points in increasing z-order
    while (n && n.z <= maxZ) {
        if (n !== ear.prev && n !== ear.next &&
            pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) &&
            area(n.prev, n, n.next) >= 0) return false;
        n = n.nextZ;
    }

    return true;
}

// go through all polygon nodes and cure small local self-intersections
function cureLocalIntersections(start, triangles, dim) {
    var p = start;
    do {
        var a = p.prev,
            b = p.next.next;

        if (!equals(a, b) && intersects(a, p, p.next, b) && locallyInside(a, b) && locallyInside(b, a)) {

            triangles.push(a.i / dim);
            triangles.push(p.i / dim);
            triangles.push(b.i / dim);

            // remove two nodes involved
            removeNode(p);
            removeNode(p.next);

            p = start = b;
        }
        p = p.next;
    } while (p !== start);

    return filterPoints(p);
}

// try splitting polygon into two and triangulate them independently
function splitEarcut(start, triangles, dim, minX, minY, invSize) {
    // look for a valid diagonal that divides the polygon into two
    var a = start;
    do {
        var b = a.next.next;
        while (b !== a.prev) {
            if (a.i !== b.i && isValidDiagonal(a, b)) {
                // split the polygon in two by the diagonal
                var c = splitPolygon(a, b);

                // filter colinear points around the cuts
                a = filterPoints(a, a.next);
                c = filterPoints(c, c.next);

                // run earcut on each half
                earcutLinked(a, triangles, dim, minX, minY, invSize);
                earcutLinked(c, triangles, dim, minX, minY, invSize);
                return;
            }
            b = b.next;
        }
        a = a.next;
    } while (a !== start);
}

// link every hole into the outer loop, producing a single-ring polygon without holes
function eliminateHoles(data, holeIndices, outerNode, dim) {
    var queue = [],
        i, len, start, end, list;

    for (i = 0, len = holeIndices.length; i < len; i++) {
        start = holeIndices[i] * dim;
        end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
        list = linkedList(data, start, end, dim, false);
        if (list === list.next) list.steiner = true;
        queue.push(getLeftmost(list));
    }

    queue.sort(compareX);

    // process holes from left to right
    for (i = 0; i < queue.length; i++) {
        eliminateHole(queue[i], outerNode);
        outerNode = filterPoints(outerNode, outerNode.next);
    }

    return outerNode;
}

function compareX(a, b) {
    return a.x - b.x;
}

// find a bridge between vertices that connects hole with an outer ring and and link it
function eliminateHole(hole, outerNode) {
    outerNode = findHoleBridge(hole, outerNode);
    if (outerNode) {
        var b = splitPolygon(outerNode, hole);

        // filter collinear points around the cuts
        filterPoints(outerNode, outerNode.next);
        filterPoints(b, b.next);
    }
}

// David Eberly's algorithm for finding a bridge between hole and outer polygon
function findHoleBridge(hole, outerNode) {
    var p = outerNode,
        hx = hole.x,
        hy = hole.y,
        qx = -Infinity,
        m;

    // find a segment intersected by a ray from the hole's leftmost point to the left;
    // segment's endpoint with lesser x will be potential connection point
    do {
        if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
            var x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y);
            if (x <= hx && x > qx) {
                qx = x;
                if (x === hx) {
                    if (hy === p.y) return p;
                    if (hy === p.next.y) return p.next;
                }
                m = p.x < p.next.x ? p : p.next;
            }
        }
        p = p.next;
    } while (p !== outerNode);

    if (!m) return null;

    if (hx === qx) return m; // hole touches outer segment; pick leftmost endpoint

    // look for points inside the triangle of hole point, segment intersection and endpoint;
    // if there are no points found, we have a valid connection;
    // otherwise choose the point of the minimum angle with the ray as connection point

    var stop = m,
        mx = m.x,
        my = m.y,
        tanMin = Infinity,
        tan;

    p = m;

    do {
        if (hx >= p.x && p.x >= mx && hx !== p.x &&
                pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {

            tan = Math.abs(hy - p.y) / (hx - p.x); // tangential

            if (locallyInside(p, hole) &&
                (tan < tanMin || (tan === tanMin && (p.x > m.x || (p.x === m.x && sectorContainsSector(m, p)))))) {
                m = p;
                tanMin = tan;
            }
        }

        p = p.next;
    } while (p !== stop);

    return m;
}

// whether sector in vertex m contains sector in vertex p in the same coordinates
function sectorContainsSector(m, p) {
    return area(m.prev, m, p.prev) < 0 && area(p.next, m, m.next) < 0;
}

// interlink polygon nodes in z-order
function indexCurve(start, minX, minY, invSize) {
    var p = start;
    do {
        if (p.z === null) p.z = zOrder(p.x, p.y, minX, minY, invSize);
        p.prevZ = p.prev;
        p.nextZ = p.next;
        p = p.next;
    } while (p !== start);

    p.prevZ.nextZ = null;
    p.prevZ = null;

    sortLinked(p);
}

// Simon Tatham's linked list merge sort algorithm
// http://www.chiark.greenend.org.uk/~sgtatham/algorithms/listsort.html
function sortLinked(list) {
    var i, p, q, e, tail, numMerges, pSize, qSize,
        inSize = 1;

    do {
        p = list;
        list = null;
        tail = null;
        numMerges = 0;

        while (p) {
            numMerges++;
            q = p;
            pSize = 0;
            for (i = 0; i < inSize; i++) {
                pSize++;
                q = q.nextZ;
                if (!q) break;
            }
            qSize = inSize;

            while (pSize > 0 || (qSize > 0 && q)) {

                if (pSize !== 0 && (qSize === 0 || !q || p.z <= q.z)) {
                    e = p;
                    p = p.nextZ;
                    pSize--;
                } else {
                    e = q;
                    q = q.nextZ;
                    qSize--;
                }

                if (tail) tail.nextZ = e;
                else list = e;

                e.prevZ = tail;
                tail = e;
            }

            p = q;
        }

        tail.nextZ = null;
        inSize *= 2;

    } while (numMerges > 1);

    return list;
}

// z-order of a point given coords and inverse of the longer side of data bbox
function zOrder(x, y, minX, minY, invSize) {
    // coords are transformed into non-negative 15-bit integer range
    x = 32767 * (x - minX) * invSize;
    y = 32767 * (y - minY) * invSize;

    x = (x | (x << 8)) & 0x00FF00FF;
    x = (x | (x << 4)) & 0x0F0F0F0F;
    x = (x | (x << 2)) & 0x33333333;
    x = (x | (x << 1)) & 0x55555555;

    y = (y | (y << 8)) & 0x00FF00FF;
    y = (y | (y << 4)) & 0x0F0F0F0F;
    y = (y | (y << 2)) & 0x33333333;
    y = (y | (y << 1)) & 0x55555555;

    return x | (y << 1);
}

// find the leftmost node of a polygon ring
function getLeftmost(start) {
    var p = start,
        leftmost = start;
    do {
        if (p.x < leftmost.x || (p.x === leftmost.x && p.y < leftmost.y)) leftmost = p;
        p = p.next;
    } while (p !== start);

    return leftmost;
}

// check if a point lies within a convex triangle
function pointInTriangle(ax, ay, bx, by, cx, cy, px, py) {
    return (cx - px) * (ay - py) - (ax - px) * (cy - py) >= 0 &&
           (ax - px) * (by - py) - (bx - px) * (ay - py) >= 0 &&
           (bx - px) * (cy - py) - (cx - px) * (by - py) >= 0;
}

// check if a diagonal between two polygon nodes is valid (lies in polygon interior)
function isValidDiagonal(a, b) {
    return a.next.i !== b.i && a.prev.i !== b.i && !intersectsPolygon(a, b) && // dones't intersect other edges
           (locallyInside(a, b) && locallyInside(b, a) && middleInside(a, b) && // locally visible
            (area(a.prev, a, b.prev) || area(a, b.prev, b)) || // does not create opposite-facing sectors
            equals(a, b) && area(a.prev, a, a.next) > 0 && area(b.prev, b, b.next) > 0); // special zero-length case
}

// signed area of a triangle
function area(p, q, r) {
    return (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
}

// check if two points are equal
function equals(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}

// check if two segments intersect
function intersects(p1, q1, p2, q2) {
    var o1 = sign(area(p1, q1, p2));
    var o2 = sign(area(p1, q1, q2));
    var o3 = sign(area(p2, q2, p1));
    var o4 = sign(area(p2, q2, q1));

    if (o1 !== o2 && o3 !== o4) return true; // general case

    if (o1 === 0 && onSegment(p1, p2, q1)) return true; // p1, q1 and p2 are collinear and p2 lies on p1q1
    if (o2 === 0 && onSegment(p1, q2, q1)) return true; // p1, q1 and q2 are collinear and q2 lies on p1q1
    if (o3 === 0 && onSegment(p2, p1, q2)) return true; // p2, q2 and p1 are collinear and p1 lies on p2q2
    if (o4 === 0 && onSegment(p2, q1, q2)) return true; // p2, q2 and q1 are collinear and q1 lies on p2q2

    return false;
}

// for collinear points p, q, r, check if point q lies on segment pr
function onSegment(p, q, r) {
    return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) && q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
}

function sign(num) {
    return num > 0 ? 1 : num < 0 ? -1 : 0;
}

// check if a polygon diagonal intersects any polygon segments
function intersectsPolygon(a, b) {
    var p = a;
    do {
        if (p.i !== a.i && p.next.i !== a.i && p.i !== b.i && p.next.i !== b.i &&
                intersects(p, p.next, a, b)) return true;
        p = p.next;
    } while (p !== a);

    return false;
}

// check if a polygon diagonal is locally inside the polygon
function locallyInside(a, b) {
    return area(a.prev, a, a.next) < 0 ?
        area(a, b, a.next) >= 0 && area(a, a.prev, b) >= 0 :
        area(a, b, a.prev) < 0 || area(a, a.next, b) < 0;
}

// check if the middle point of a polygon diagonal is inside the polygon
function middleInside(a, b) {
    var p = a,
        inside = false,
        px = (a.x + b.x) / 2,
        py = (a.y + b.y) / 2;
    do {
        if (((p.y > py) !== (p.next.y > py)) && p.next.y !== p.y &&
                (px < (p.next.x - p.x) * (py - p.y) / (p.next.y - p.y) + p.x))
            inside = !inside;
        p = p.next;
    } while (p !== a);

    return inside;
}

// link two polygon vertices with a bridge; if the vertices belong to the same ring, it splits polygon into two;
// if one belongs to the outer ring and another to a hole, it merges it into a single ring
function splitPolygon(a, b) {
    var a2 = new Node(a.i, a.x, a.y),
        b2 = new Node(b.i, b.x, b.y),
        an = a.next,
        bp = b.prev;

    a.next = b;
    b.prev = a;

    a2.next = an;
    an.prev = a2;

    b2.next = a2;
    a2.prev = b2;

    bp.next = b2;
    b2.prev = bp;

    return b2;
}

// create a node and optionally link it with previous one (in a circular doubly linked list)
function insertNode(i, x, y, last) {
    var p = new Node(i, x, y);

    if (!last) {
        p.prev = p;
        p.next = p;

    } else {
        p.next = last.next;
        p.prev = last;
        last.next.prev = p;
        last.next = p;
    }
    return p;
}

function removeNode(p) {
    p.next.prev = p.prev;
    p.prev.next = p.next;

    if (p.prevZ) p.prevZ.nextZ = p.nextZ;
    if (p.nextZ) p.nextZ.prevZ = p.prevZ;
}

function Node(i, x, y) {
    // vertex index in coordinates array
    this.i = i;

    // vertex coordinates
    this.x = x;
    this.y = y;

    // previous and next vertex nodes in a polygon ring
    this.prev = null;
    this.next = null;

    // z-order curve value
    this.z = null;

    // previous and next nodes in z-order
    this.prevZ = null;
    this.nextZ = null;

    // indicates whether this is a steiner point
    this.steiner = false;
}

// return a percentage difference between the polygon area and its triangulation area;
// used to verify correctness of triangulation
earcut.deviation = function (data, holeIndices, dim, triangles) {
    var hasHoles = holeIndices && holeIndices.length;
    var outerLen = hasHoles ? holeIndices[0] * dim : data.length;

    var polygonArea = Math.abs(signedArea(data, 0, outerLen, dim));
    if (hasHoles) {
        for (var i = 0, len = holeIndices.length; i < len; i++) {
            var start = holeIndices[i] * dim;
            var end = i < len - 1 ? holeIndices[i + 1] * dim : data.length;
            polygonArea -= Math.abs(signedArea(data, start, end, dim));
        }
    }

    var trianglesArea = 0;
    for (i = 0; i < triangles.length; i += 3) {
        var a = triangles[i] * dim;
        var b = triangles[i + 1] * dim;
        var c = triangles[i + 2] * dim;
        trianglesArea += Math.abs(
            (data[a] - data[c]) * (data[b + 1] - data[a + 1]) -
            (data[a] - data[b]) * (data[c + 1] - data[a + 1]));
    }

    return polygonArea === 0 && trianglesArea === 0 ? 0 :
        Math.abs((trianglesArea - polygonArea) / polygonArea);
};

function signedArea(data, start, end, dim) {
    var sum = 0;
    for (var i = start, j = end - dim; i < end; i += dim) {
        sum += (data[j] - data[i]) * (data[i + 1] + data[j + 1]);
        j = i;
    }
    return sum;
}

// turn a polygon in a multi-dimensional array form (e.g. as in GeoJSON) into a form Earcut accepts
earcut.flatten = function (data) {
    var dim = data[0][0].length,
        result = {vertices: [], holes: [], dimensions: dim},
        holeIndex = 0;

    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            for (var d = 0; d < dim; d++) result.vertices.push(data[i][j][d]);
        }
        if (i > 0) {
            holeIndex += data[i - 1].length;
            result.holes.push(holeIndex);
        }
    }
    return result;
};


/***/ }),

/***/ "./node_modules/frame-ticker/dist/FrameTicker.js":
/*!*******************************************************!*\
  !*** ./node_modules/frame-ticker/dist/FrameTicker.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():undefined}(this,function(){return function(e){function t(n){if(i[n])return i[n].exports;var r=i[n]={exports:{},id:n,loaded:!1};return e[n].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t,i){"use strict";var n=i(1),r=function(){function e(e,t,i){void 0===e&&(e=NaN),void 0===t&&(t=NaN),void 0===i&&(i=!1),this._minFPS=t,this._maxFPS=e,this._timeScale=1,this._currentTick=0,this._currentTime=0,this._tickDeltaTime=0,this._isRunning=!1,this._maxInterval=isNaN(this._minFPS)?NaN:1e3/this._minFPS,this._minInterval=isNaN(this._maxFPS)?NaN:1e3/this._maxFPS,this._onResume=new n.default,this._onPause=new n.default,this._onTick=new n.default,this._onTickOncePerFrame=new n.default,i||this.resume()}return e.prototype.updateOnce=function(e){e(this.currentTimeSeconds,this.tickDeltaTimeSeconds,this.currentTick)},e.prototype.resume=function(){this._isRunning||(this._isRunning=!0,this._lastTimeUpdated=this.getTimer(),this._onResume.dispatch(),this.animateOnce())},e.prototype.pause=function(){this._isRunning&&(this._isRunning=!1,this._onPause.dispatch(),window.cancelAnimationFrame(this._animationFrameHandle))},e.prototype.dispose=function(){this.pause(),this._onResume.removeAll(),this._onPause.removeAll(),this._onTick.removeAll()},Object.defineProperty(e.prototype,"currentTick",{get:function(){return this._currentTick},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"currentTimeSeconds",{get:function(){return this._currentTime/1e3},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"tickDeltaTimeSeconds",{get:function(){return this._tickDeltaTime/1e3},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"timeScale",{get:function(){return this._timeScale},set:function(e){this._timeScale!==e&&(this._timeScale=e)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"onResume",{get:function(){return this._onResume},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"onPause",{get:function(){return this._onPause},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"onTick",{get:function(){return this._onTick},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"onTickOncePerFrame",{get:function(){return this._onTickOncePerFrame},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isRunning",{get:function(){return this._isRunning},enumerable:!0,configurable:!0}),e.prototype.animateOnce=function(){var e=this;this._animationFrameHandle=window.requestAnimationFrame(function(){return e.onFrame()})},e.prototype.onFrame=function(){if(this._now=this.getTimer(),this._frameDeltaTime=this._now-this._lastTimeUpdated,isNaN(this._minInterval)||this._frameDeltaTime>=this._minInterval)if(isNaN(this._maxInterval))this.update(this._frameDeltaTime*this._timeScale,!0),this._lastTimeUpdated=this._now;else for(this._interval=Math.min(this._frameDeltaTime,this._maxInterval);this._now>=this._lastTimeUpdated+this._interval;)this.update(this._interval*this._timeScale,this._now<=this._lastTimeUpdated+2*this._maxInterval),this._lastTimeUpdated+=this._interval;this._isRunning&&this.animateOnce()},e.prototype.update=function(e,t){void 0===t&&(t=!0),this._currentTick++,this._currentTime+=e,this._tickDeltaTime=e,this._onTick.dispatch(this.currentTimeSeconds,this.tickDeltaTimeSeconds,this.currentTick),t&&this._onTickOncePerFrame.dispatch(this.currentTimeSeconds,this.tickDeltaTimeSeconds,this.currentTick)},e.prototype.getTimer=function(){return Date.now()},e}();Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},function(e,t,i){!function(t,i){e.exports=i()}(this,function(){return function(e){function t(n){if(i[n])return i[n].exports;var r=i[n]={exports:{},id:n,loaded:!1};return e[n].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t){"use strict";var i=function(){function e(){this.functions=[]}return e.prototype.add=function(e){return this.functions.indexOf(e)===-1&&(this.functions.push(e),!0)},e.prototype.remove=function(e){var t=this.functions.indexOf(e);return t>-1&&(this.functions.splice(t,1),!0)},e.prototype.removeAll=function(){return this.functions.length>0&&(this.functions.length=0,!0)},e.prototype.dispatch=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var i=this.functions.concat();i.forEach(function(t){t.apply(void 0,e)})},Object.defineProperty(e.prototype,"numItems",{get:function(){return this.functions.length},enumerable:!0,configurable:!0}),e}();Object.defineProperty(t,"__esModule",{value:!0}),t.default=i}])})}])});

/***/ }),

/***/ "./node_modules/h3-js/dist/browser/h3-js.es.js":
/*!*****************************************************!*\
  !*** ./node_modules/h3-js/dist/browser/h3-js.es.js ***!
  \*****************************************************/
/*! exports provided: UNITS, h3IsValid, h3IsPentagon, h3IsResClassIII, h3GetBaseCell, h3GetFaces, h3GetResolution, geoToH3, h3ToGeo, h3ToGeoBoundary, h3ToParent, h3ToChildren, h3ToCenterChild, kRing, kRingDistances, hexRing, polyfill, h3SetToMultiPolygon, compact, uncompact, h3IndexesAreNeighbors, getH3UnidirectionalEdge, getOriginH3IndexFromUnidirectionalEdge, getDestinationH3IndexFromUnidirectionalEdge, h3UnidirectionalEdgeIsValid, getH3IndexesFromUnidirectionalEdge, getH3UnidirectionalEdgesFromHexagon, getH3UnidirectionalEdgeBoundary, h3Distance, h3Line, experimentalH3ToLocalIj, experimentalLocalIjToH3, hexArea, edgeLength, numHexagons, getRes0Indexes, getPentagonIndexes, degsToRads, radsToDegs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UNITS", function() { return UNITS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h3IsValid", function() { return h3IsValid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h3IsPentagon", function() { return h3IsPentagon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h3IsResClassIII", function() { return h3IsResClassIII; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h3GetBaseCell", function() { return h3GetBaseCell; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h3GetFaces", function() { return h3GetFaces; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h3GetResolution", function() { return h3GetResolution; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "geoToH3", function() { return geoToH3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h3ToGeo", function() { return h3ToGeo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h3ToGeoBoundary", function() { return h3ToGeoBoundary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h3ToParent", function() { return h3ToParent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h3ToChildren", function() { return h3ToChildren; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h3ToCenterChild", function() { return h3ToCenterChild; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kRing", function() { return kRing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kRingDistances", function() { return kRingDistances; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hexRing", function() { return hexRing; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "polyfill", function() { return polyfill; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h3SetToMultiPolygon", function() { return h3SetToMultiPolygon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compact", function() { return compact; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uncompact", function() { return uncompact; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h3IndexesAreNeighbors", function() { return h3IndexesAreNeighbors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getH3UnidirectionalEdge", function() { return getH3UnidirectionalEdge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOriginH3IndexFromUnidirectionalEdge", function() { return getOriginH3IndexFromUnidirectionalEdge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDestinationH3IndexFromUnidirectionalEdge", function() { return getDestinationH3IndexFromUnidirectionalEdge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h3UnidirectionalEdgeIsValid", function() { return h3UnidirectionalEdgeIsValid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getH3IndexesFromUnidirectionalEdge", function() { return getH3IndexesFromUnidirectionalEdge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getH3UnidirectionalEdgesFromHexagon", function() { return getH3UnidirectionalEdgesFromHexagon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getH3UnidirectionalEdgeBoundary", function() { return getH3UnidirectionalEdgeBoundary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h3Distance", function() { return h3Distance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h3Line", function() { return h3Line; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "experimentalH3ToLocalIj", function() { return experimentalH3ToLocalIj; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "experimentalLocalIjToH3", function() { return experimentalLocalIjToH3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hexArea", function() { return hexArea; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "edgeLength", function() { return edgeLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numHexagons", function() { return numHexagons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRes0Indexes", function() { return getRes0Indexes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPentagonIndexes", function() { return getPentagonIndexes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "degsToRads", function() { return degsToRads; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "radsToDegs", function() { return radsToDegs; });
var libh3 = function (libh3) {
  libh3 = libh3 || {};
  var Module = typeof libh3 !== "undefined" ? libh3 : {};
  var moduleOverrides = {};
  var key;

  for (key in Module) {
    if (Module.hasOwnProperty(key)) {
      moduleOverrides[key] = Module[key];
    }
  }

  var arguments_ = [];
  var scriptDirectory = "";

  function locateFile(path) {
    if (Module["locateFile"]) {
      return Module["locateFile"](path, scriptDirectory);
    }

    return scriptDirectory + path;
  }

  var readAsync;

  {
    if (document.currentScript) {
      scriptDirectory = document.currentScript.src;
    }

    if (scriptDirectory.indexOf("blob:") !== 0) {
      scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf("/") + 1);
    } else {
      scriptDirectory = "";
    }

    readAsync = function readAsync(url, onload, onerror) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "arraybuffer";

      xhr.onload = function xhr_onload() {
        if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
          onload(xhr.response);
          return;
        }

        var data = tryParseAsDataURI(url);

        if (data) {
          onload(data.buffer);
          return;
        }

        onerror();
      };

      xhr.onerror = onerror;
      xhr.send(null);
    };
  }

  var out = Module["print"] || console.log.bind(console);
  var err = Module["printErr"] || console.warn.bind(console);

  for (key in moduleOverrides) {
    if (moduleOverrides.hasOwnProperty(key)) {
      Module[key] = moduleOverrides[key];
    }
  }

  moduleOverrides = null;
  if (Module["arguments"]) { arguments_ = Module["arguments"]; }

  var tempRet0 = 0;

  var setTempRet0 = function (value) {
    tempRet0 = value;
  };

  var getTempRet0 = function () {
    return tempRet0;
  };

  var GLOBAL_BASE = 8;

  function setValue(ptr, value, type, noSafe) {
    type = type || "i8";
    if (type.charAt(type.length - 1) === "*") { type = "i32"; }

    switch (type) {
      case "i1":
        HEAP8[ptr >> 0] = value;
        break;

      case "i8":
        HEAP8[ptr >> 0] = value;
        break;

      case "i16":
        HEAP16[ptr >> 1] = value;
        break;

      case "i32":
        HEAP32[ptr >> 2] = value;
        break;

      case "i64":
        tempI64 = [value >>> 0, (tempDouble = value, +Math_abs(tempDouble) >= +1 ? tempDouble > +0 ? (Math_min(+Math_floor(tempDouble / +4294967296), +4294967295) | 0) >>> 0 : ~~+Math_ceil((tempDouble - +(~~tempDouble >>> 0)) / +4294967296) >>> 0 : 0)], HEAP32[ptr >> 2] = tempI64[0], HEAP32[ptr + 4 >> 2] = tempI64[1];
        break;

      case "float":
        HEAPF32[ptr >> 2] = value;
        break;

      case "double":
        HEAPF64[ptr >> 3] = value;
        break;

      default:
        abort("invalid type for setValue: " + type);
    }
  }

  function getValue(ptr, type, noSafe) {
    type = type || "i8";
    if (type.charAt(type.length - 1) === "*") { type = "i32"; }

    switch (type) {
      case "i1":
        return HEAP8[ptr >> 0];

      case "i8":
        return HEAP8[ptr >> 0];

      case "i16":
        return HEAP16[ptr >> 1];

      case "i32":
        return HEAP32[ptr >> 2];

      case "i64":
        return HEAP32[ptr >> 2];

      case "float":
        return HEAPF32[ptr >> 2];

      case "double":
        return HEAPF64[ptr >> 3];

      default:
        abort("invalid type for getValue: " + type);
    }

    return null;
  }

  var ABORT = false;

  function assert(condition, text) {
    if (!condition) {
      abort("Assertion failed: " + text);
    }
  }

  function getCFunc(ident) {
    var func = Module["_" + ident];
    assert(func, "Cannot call unknown function " + ident + ", make sure it is exported");
    return func;
  }

  function ccall(ident, returnType, argTypes, args, opts) {
    var toC = {
      "string": function (str) {
        var ret = 0;

        if (str !== null && str !== undefined && str !== 0) {
          var len = (str.length << 2) + 1;
          ret = stackAlloc(len);
          stringToUTF8(str, ret, len);
        }

        return ret;
      },
      "array": function (arr) {
        var ret = stackAlloc(arr.length);
        writeArrayToMemory(arr, ret);
        return ret;
      }
    };

    function convertReturnValue(ret) {
      if (returnType === "string") { return UTF8ToString(ret); }
      if (returnType === "boolean") { return Boolean(ret); }
      return ret;
    }

    var func = getCFunc(ident);
    var cArgs = [];
    var stack = 0;

    if (args) {
      for (var i = 0; i < args.length; i++) {
        var converter = toC[argTypes[i]];

        if (converter) {
          if (stack === 0) { stack = stackSave(); }
          cArgs[i] = converter(args[i]);
        } else {
          cArgs[i] = args[i];
        }
      }
    }

    var ret = func.apply(null, cArgs);
    ret = convertReturnValue(ret);
    if (stack !== 0) { stackRestore(stack); }
    return ret;
  }

  function cwrap(ident, returnType, argTypes, opts) {
    argTypes = argTypes || [];
    var numericArgs = argTypes.every(function (type) {
      return type === "number";
    });
    var numericRet = returnType !== "string";

    if (numericRet && numericArgs && !opts) {
      return getCFunc(ident);
    }

    return function () {
      return ccall(ident, returnType, argTypes, arguments, opts);
    };
  }
  var UTF8Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf8") : undefined;

  function UTF8ArrayToString(u8Array, idx, maxBytesToRead) {
    var endIdx = idx + maxBytesToRead;
    var endPtr = idx;

    while (u8Array[endPtr] && !(endPtr >= endIdx)) { ++endPtr; }

    if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
      return UTF8Decoder.decode(u8Array.subarray(idx, endPtr));
    } else {
      var str = "";

      while (idx < endPtr) {
        var u0 = u8Array[idx++];

        if (!(u0 & 128)) {
          str += String.fromCharCode(u0);
          continue;
        }

        var u1 = u8Array[idx++] & 63;

        if ((u0 & 224) == 192) {
          str += String.fromCharCode((u0 & 31) << 6 | u1);
          continue;
        }

        var u2 = u8Array[idx++] & 63;

        if ((u0 & 240) == 224) {
          u0 = (u0 & 15) << 12 | u1 << 6 | u2;
        } else {
          u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | u8Array[idx++] & 63;
        }

        if (u0 < 65536) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 65536;
          str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
        }
      }
    }

    return str;
  }

  function UTF8ToString(ptr, maxBytesToRead) {
    return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
  }

  function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
    if (!(maxBytesToWrite > 0)) { return 0; }
    var startIdx = outIdx;
    var endIdx = outIdx + maxBytesToWrite - 1;

    for (var i = 0; i < str.length; ++i) {
      var u = str.charCodeAt(i);

      if (u >= 55296 && u <= 57343) {
        var u1 = str.charCodeAt(++i);
        u = 65536 + ((u & 1023) << 10) | u1 & 1023;
      }

      if (u <= 127) {
        if (outIdx >= endIdx) { break; }
        outU8Array[outIdx++] = u;
      } else if (u <= 2047) {
        if (outIdx + 1 >= endIdx) { break; }
        outU8Array[outIdx++] = 192 | u >> 6;
        outU8Array[outIdx++] = 128 | u & 63;
      } else if (u <= 65535) {
        if (outIdx + 2 >= endIdx) { break; }
        outU8Array[outIdx++] = 224 | u >> 12;
        outU8Array[outIdx++] = 128 | u >> 6 & 63;
        outU8Array[outIdx++] = 128 | u & 63;
      } else {
        if (outIdx + 3 >= endIdx) { break; }
        outU8Array[outIdx++] = 240 | u >> 18;
        outU8Array[outIdx++] = 128 | u >> 12 & 63;
        outU8Array[outIdx++] = 128 | u >> 6 & 63;
        outU8Array[outIdx++] = 128 | u & 63;
      }
    }

    outU8Array[outIdx] = 0;
    return outIdx - startIdx;
  }

  function stringToUTF8(str, outPtr, maxBytesToWrite) {
    return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
  }

  var UTF16Decoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-16le") : undefined;

  function writeArrayToMemory(array, buffer) {
    HEAP8.set(array, buffer);
  }

  function alignUp(x, multiple) {
    if (x % multiple > 0) {
      x += multiple - x % multiple;
    }

    return x;
  }

  var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;

  function updateGlobalBufferAndViews(buf) {
    buffer = buf;
    Module["HEAP8"] = HEAP8 = new Int8Array(buf);
    Module["HEAP16"] = HEAP16 = new Int16Array(buf);
    Module["HEAP32"] = HEAP32 = new Int32Array(buf);
    Module["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
    Module["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
    Module["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
    Module["HEAPF32"] = HEAPF32 = new Float32Array(buf);
    Module["HEAPF64"] = HEAPF64 = new Float64Array(buf);
  }

  var DYNAMIC_BASE = 5266576,
      DYNAMICTOP_PTR = 23664;
  var INITIAL_TOTAL_MEMORY = Module["TOTAL_MEMORY"] || 33554432;

  if (Module["buffer"]) {
    buffer = Module["buffer"];
  } else {
    buffer = new ArrayBuffer(INITIAL_TOTAL_MEMORY);
  }

  INITIAL_TOTAL_MEMORY = buffer.byteLength;
  updateGlobalBufferAndViews(buffer);
  HEAP32[DYNAMICTOP_PTR >> 2] = DYNAMIC_BASE;

  function callRuntimeCallbacks(callbacks) {
    while (callbacks.length > 0) {
      var callback = callbacks.shift();

      if (typeof callback == "function") {
        callback();
        continue;
      }

      var func = callback.func;

      if (typeof func === "number") {
        if (callback.arg === undefined) {
          Module["dynCall_v"](func);
        } else {
          Module["dynCall_vi"](func, callback.arg);
        }
      } else {
        func(callback.arg === undefined ? null : callback.arg);
      }
    }
  }

  var __ATPRERUN__ = [];
  var __ATINIT__ = [];
  var __ATMAIN__ = [];
  var __ATPOSTRUN__ = [];

  function preRun() {
    if (Module["preRun"]) {
      if (typeof Module["preRun"] == "function") { Module["preRun"] = [Module["preRun"]]; }

      while (Module["preRun"].length) {
        addOnPreRun(Module["preRun"].shift());
      }
    }

    callRuntimeCallbacks(__ATPRERUN__);
  }

  function initRuntime() {
    callRuntimeCallbacks(__ATINIT__);
  }

  function preMain() {
    callRuntimeCallbacks(__ATMAIN__);
  }

  function postRun() {
    if (Module["postRun"]) {
      if (typeof Module["postRun"] == "function") { Module["postRun"] = [Module["postRun"]]; }

      while (Module["postRun"].length) {
        addOnPostRun(Module["postRun"].shift());
      }
    }

    callRuntimeCallbacks(__ATPOSTRUN__);
  }

  function addOnPreRun(cb) {
    __ATPRERUN__.unshift(cb);
  }

  function addOnPostRun(cb) {
    __ATPOSTRUN__.unshift(cb);
  }

  var Math_abs = Math.abs;
  var Math_ceil = Math.ceil;
  var Math_floor = Math.floor;
  var Math_min = Math.min;
  var runDependencies = 0;
  var runDependencyWatcher = null;
  var dependenciesFulfilled = null;

  function addRunDependency(id) {
    runDependencies++;

    if (Module["monitorRunDependencies"]) {
      Module["monitorRunDependencies"](runDependencies);
    }
  }

  function removeRunDependency(id) {
    runDependencies--;

    if (Module["monitorRunDependencies"]) {
      Module["monitorRunDependencies"](runDependencies);
    }

    if (runDependencies == 0) {
      if (runDependencyWatcher !== null) {
        clearInterval(runDependencyWatcher);
        runDependencyWatcher = null;
      }

      if (dependenciesFulfilled) {
        var callback = dependenciesFulfilled;
        dependenciesFulfilled = null;
        callback();
      }
    }
  }

  Module["preloadedImages"] = {};
  Module["preloadedAudios"] = {};
  var memoryInitializer = null;
  var dataURIPrefix = "data:application/octet-stream;base64,";

  function isDataURI(filename) {
    return String.prototype.startsWith ? filename.startsWith(dataURIPrefix) : filename.indexOf(dataURIPrefix) === 0;
  }

  var tempDouble;
  var tempI64;
  memoryInitializer = "data:application/octet-stream;base64,AAAAAAAAAAACAAAAAwAAAAEAAAAFAAAABAAAAAYAAAAAAAAAAAAAAAAAAAABAAAAAgAAAAMAAAAEAAAABQAAAAYAAAABAAAABAAAAAMAAAAGAAAABQAAAAIAAAAAAAAAAgAAAAMAAAABAAAABAAAAAYAAAAAAAAABQAAAAMAAAAGAAAABAAAAAUAAAAAAAAAAQAAAAIAAAAEAAAABQAAAAYAAAAAAAAAAgAAAAMAAAABAAAABQAAAAIAAAAAAAAAAQAAAAMAAAAGAAAABAAAAAYAAAAAAAAABQAAAAIAAAABAAAABAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAgAAAAMAAAAAAAAAAAAAAAIAAAAAAAAAAQAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABgAAAAAAAAAFAAAAAAAAAAAAAAAEAAAABQAAAAAAAAAAAAAAAAAAAAIAAAAAAAAABgAAAAAAAAAGAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAACAAAAAwAAAAQAAAAFAAAABgAAAAEAAAACAAAAAwAAAAQAAAAFAAAABgAAAAAAAAACAAAAAwAAAAQAAAAFAAAABgAAAAAAAAABAAAAAwAAAAQAAAAFAAAABgAAAAAAAAABAAAAAgAAAAQAAAAFAAAABgAAAAAAAAABAAAAAgAAAAMAAAAFAAAABgAAAAAAAAABAAAAAgAAAAMAAAAEAAAABgAAAAAAAAABAAAAAgAAAAMAAAAEAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAADAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAACAAAAAgAAAAAAAAAAAAAABgAAAAAAAAADAAAAAgAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAUAAAAEAAAAAAAAAAEAAAAAAAAAAAAAAAUAAAAFAAAAAAAAAAAAAAAAAAAABgAAAAAAAAAEAAAAAAAAAAYAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAUAAAACAAAABAAAAAMAAAAIAAAAAQAAAAcAAAAGAAAACQAAAAAAAAADAAAAAgAAAAIAAAAGAAAACgAAAAsAAAAAAAAAAQAAAAUAAAADAAAADQAAAAEAAAAHAAAABAAAAAwAAAAAAAAABAAAAH8AAAAPAAAACAAAAAMAAAAAAAAADAAAAAUAAAACAAAAEgAAAAoAAAAIAAAAAAAAABAAAAAGAAAADgAAAAsAAAARAAAAAQAAAAkAAAACAAAABwAAABUAAAAJAAAAEwAAAAMAAAANAAAAAQAAAAgAAAAFAAAAFgAAABAAAAAEAAAAAAAAAA8AAAAJAAAAEwAAAA4AAAAUAAAAAQAAAAcAAAAGAAAACgAAAAsAAAAYAAAAFwAAAAUAAAACAAAAEgAAAAsAAAARAAAAFwAAABkAAAACAAAABgAAAAoAAAAMAAAAHAAAAA0AAAAaAAAABAAAAA8AAAADAAAADQAAABoAAAAVAAAAHQAAAAMAAAAMAAAABwAAAA4AAAB/AAAAEQAAABsAAAAJAAAAFAAAAAYAAAAPAAAAFgAAABwAAAAfAAAABAAAAAgAAAAMAAAAEAAAABIAAAAhAAAAHgAAAAgAAAAFAAAAFgAAABEAAAALAAAADgAAAAYAAAAjAAAAGQAAABsAAAASAAAAGAAAAB4AAAAgAAAABQAAAAoAAAAQAAAAEwAAACIAAAAUAAAAJAAAAAcAAAAVAAAACQAAABQAAAAOAAAAEwAAAAkAAAAoAAAAGwAAACQAAAAVAAAAJgAAABMAAAAiAAAADQAAAB0AAAAHAAAAFgAAABAAAAApAAAAIQAAAA8AAAAIAAAAHwAAABcAAAAYAAAACwAAAAoAAAAnAAAAJQAAABkAAAAYAAAAfwAAACAAAAAlAAAACgAAABcAAAASAAAAGQAAABcAAAARAAAACwAAAC0AAAAnAAAAIwAAABoAAAAqAAAAHQAAACsAAAAMAAAAHAAAAA0AAAAbAAAAKAAAACMAAAAuAAAADgAAABQAAAARAAAAHAAAAB8AAAAqAAAALAAAAAwAAAAPAAAAGgAAAB0AAAArAAAAJgAAAC8AAAANAAAAGgAAABUAAAAeAAAAIAAAADAAAAAyAAAAEAAAABIAAAAhAAAAHwAAACkAAAAsAAAANQAAAA8AAAAWAAAAHAAAACAAAAAeAAAAGAAAABIAAAA0AAAAMgAAACUAAAAhAAAAHgAAADEAAAAwAAAAFgAAABAAAAApAAAAIgAAABMAAAAmAAAAFQAAADYAAAAkAAAAMwAAACMAAAAuAAAALQAAADgAAAARAAAAGwAAABkAAAAkAAAAFAAAACIAAAATAAAANwAAACgAAAA2AAAAJQAAACcAAAA0AAAAOQAAABgAAAAXAAAAIAAAACYAAAB/AAAAIgAAADMAAAAdAAAALwAAABUAAAAnAAAAJQAAABkAAAAXAAAAOwAAADkAAAAtAAAAKAAAABsAAAAkAAAAFAAAADwAAAAuAAAANwAAACkAAAAxAAAANQAAAD0AAAAWAAAAIQAAAB8AAAAqAAAAOgAAACsAAAA+AAAAHAAAACwAAAAaAAAAKwAAAD4AAAAvAAAAQAAAABoAAAAqAAAAHQAAACwAAAA1AAAAOgAAAEEAAAAcAAAAHwAAACoAAAAtAAAAJwAAACMAAAAZAAAAPwAAADsAAAA4AAAALgAAADwAAAA4AAAARAAAABsAAAAoAAAAIwAAAC8AAAAmAAAAKwAAAB0AAABFAAAAMwAAAEAAAAAwAAAAMQAAAB4AAAAhAAAAQwAAAEIAAAAyAAAAMQAAAH8AAAA9AAAAQgAAACEAAAAwAAAAKQAAADIAAAAwAAAAIAAAAB4AAABGAAAAQwAAADQAAAAzAAAARQAAADYAAABHAAAAJgAAAC8AAAAiAAAANAAAADkAAABGAAAASgAAACAAAAAlAAAAMgAAADUAAAA9AAAAQQAAAEsAAAAfAAAAKQAAACwAAAA2AAAARwAAADcAAABJAAAAIgAAADMAAAAkAAAANwAAACgAAAA2AAAAJAAAAEgAAAA8AAAASQAAADgAAABEAAAAPwAAAE0AAAAjAAAALgAAAC0AAAA5AAAAOwAAAEoAAABOAAAAJQAAACcAAAA0AAAAOgAAAH8AAAA+AAAATAAAACwAAABBAAAAKgAAADsAAAA/AAAATgAAAE8AAAAnAAAALQAAADkAAAA8AAAASAAAAEQAAABQAAAAKAAAADcAAAAuAAAAPQAAADUAAAAxAAAAKQAAAFEAAABLAAAAQgAAAD4AAAArAAAAOgAAACoAAABSAAAAQAAAAEwAAAA/AAAAfwAAADgAAAAtAAAATwAAADsAAABNAAAAQAAAAC8AAAA+AAAAKwAAAFQAAABFAAAAUgAAAEEAAAA6AAAANQAAACwAAABWAAAATAAAAEsAAABCAAAAQwAAAFEAAABVAAAAMQAAADAAAAA9AAAAQwAAAEIAAAAyAAAAMAAAAFcAAABVAAAARgAAAEQAAAA4AAAAPAAAAC4AAABaAAAATQAAAFAAAABFAAAAMwAAAEAAAAAvAAAAWQAAAEcAAABUAAAARgAAAEMAAAA0AAAAMgAAAFMAAABXAAAASgAAAEcAAABZAAAASQAAAFsAAAAzAAAARQAAADYAAABIAAAAfwAAAEkAAAA3AAAAUAAAADwAAABYAAAASQAAAFsAAABIAAAAWAAAADYAAABHAAAANwAAAEoAAABOAAAAUwAAAFwAAAA0AAAAOQAAAEYAAABLAAAAQQAAAD0AAAA1AAAAXgAAAFYAAABRAAAATAAAAFYAAABSAAAAYAAAADoAAABBAAAAPgAAAE0AAAA/AAAARAAAADgAAABdAAAATwAAAFoAAABOAAAASgAAADsAAAA5AAAAXwAAAFwAAABPAAAATwAAAE4AAAA/AAAAOwAAAF0AAABfAAAATQAAAFAAAABEAAAASAAAADwAAABjAAAAWgAAAFgAAABRAAAAVQAAAF4AAABlAAAAPQAAAEIAAABLAAAAUgAAAGAAAABUAAAAYgAAAD4AAABMAAAAQAAAAFMAAAB/AAAASgAAAEYAAABkAAAAVwAAAFwAAABUAAAARQAAAFIAAABAAAAAYQAAAFkAAABiAAAAVQAAAFcAAABlAAAAZgAAAEIAAABDAAAAUQAAAFYAAABMAAAASwAAAEEAAABoAAAAYAAAAF4AAABXAAAAUwAAAGYAAABkAAAAQwAAAEYAAABVAAAAWAAAAEgAAABbAAAASQAAAGMAAABQAAAAaQAAAFkAAABhAAAAWwAAAGcAAABFAAAAVAAAAEcAAABaAAAATQAAAFAAAABEAAAAagAAAF0AAABjAAAAWwAAAEkAAABZAAAARwAAAGkAAABYAAAAZwAAAFwAAABTAAAATgAAAEoAAABsAAAAZAAAAF8AAABdAAAATwAAAFoAAABNAAAAbQAAAF8AAABqAAAAXgAAAFYAAABRAAAASwAAAGsAAABoAAAAZQAAAF8AAABcAAAATwAAAE4AAABtAAAAbAAAAF0AAABgAAAAaAAAAGIAAABuAAAATAAAAFYAAABSAAAAYQAAAH8AAABiAAAAVAAAAGcAAABZAAAAbwAAAGIAAABuAAAAYQAAAG8AAABSAAAAYAAAAFQAAABjAAAAUAAAAGkAAABYAAAAagAAAFoAAABxAAAAZAAAAGYAAABTAAAAVwAAAGwAAAByAAAAXAAAAGUAAABmAAAAawAAAHAAAABRAAAAVQAAAF4AAABmAAAAZQAAAFcAAABVAAAAcgAAAHAAAABkAAAAZwAAAFsAAABhAAAAWQAAAHQAAABpAAAAbwAAAGgAAABrAAAAbgAAAHMAAABWAAAAXgAAAGAAAABpAAAAWAAAAGcAAABbAAAAcQAAAGMAAAB0AAAAagAAAF0AAABjAAAAWgAAAHUAAABtAAAAcQAAAGsAAAB/AAAAZQAAAF4AAABzAAAAaAAAAHAAAABsAAAAZAAAAF8AAABcAAAAdgAAAHIAAABtAAAAbQAAAGwAAABdAAAAXwAAAHUAAAB2AAAAagAAAG4AAABiAAAAaAAAAGAAAAB3AAAAbwAAAHMAAABvAAAAYQAAAG4AAABiAAAAdAAAAGcAAAB3AAAAcAAAAGsAAABmAAAAZQAAAHgAAABzAAAAcgAAAHEAAABjAAAAdAAAAGkAAAB1AAAAagAAAHkAAAByAAAAcAAAAGQAAABmAAAAdgAAAHgAAABsAAAAcwAAAG4AAABrAAAAaAAAAHgAAAB3AAAAcAAAAHQAAABnAAAAdwAAAG8AAABxAAAAaQAAAHkAAAB1AAAAfwAAAG0AAAB2AAAAcQAAAHkAAABqAAAAdgAAAHgAAABsAAAAcgAAAHUAAAB5AAAAbQAAAHcAAABvAAAAcwAAAG4AAAB5AAAAdAAAAHgAAAB4AAAAcwAAAHIAAABwAAAAeQAAAHcAAAB2AAAAeQAAAHQAAAB4AAAAdwAAAHUAAABxAAAAdgAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAEAAAAFAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAIAAAAFAAAAAQAAAAAAAAD/////AQAAAAAAAAADAAAABAAAAAIAAAAAAAAAAAAAAAEAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAwAAAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAUAAAABAAAAAAAAAAAAAAABAAAAAwAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAAwAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAMAAAAFAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAEAAAAAAAAA/////wMAAAAAAAAABQAAAAIAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAQAAAAFAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAwAAAAMAAAADAAAAAwAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAwAAAAUAAAAFAAAAAAAAAAAAAAADAAAAAwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAMAAAADAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAUAAAAFAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAEAAAAAAAAAAwAAAAMAAAADAAAAAAAAAAMAAAAAAAAAAAAAAP////8DAAAAAAAAAAUAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAADAAAAAwAAAAAAAAAAAAAAAQAAAAAAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAEAAAADAAAAAAAAAAAAAAABAAAAAAAAAAMAAAADAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAwAAAAMAAAADAAAAAwAAAAAAAAADAAAAAAAAAAAAAAABAAAAAwAAAAAAAAAAAAAAAQAAAAAAAAADAAAAAwAAAAMAAAADAAAAAAAAAAMAAAAAAAAAAAAAAAMAAAAAAAAAAwAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAwAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAwAAAAMAAAAAAAAA/////wMAAAAAAAAABQAAAAIAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAMAAAADAAAAAAAAAAAAAAADAAAAAAAAAAAAAAADAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAADAAAABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAUAAAAFAAAAAAAAAAAAAAADAAAAAwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAADAAAAAAAAAAAAAAABAAAAAAAAAAAAAAADAAAAAAAAAAAAAAADAAAAAwAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAwAAAAAAAAAAAAAAAwAAAAMAAAADAAAAAAAAAAMAAAAAAAAAAAAAAAMAAAADAAAAAwAAAAAAAAADAAAAAAAAAAAAAAD/////AwAAAAAAAAAFAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAADAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAADAAAAAwAAAAAAAAAAAAAAAwAAAAAAAAADAAAAAAAAAAMAAAAAAAAAAwAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAMAAAAAAAAAAwAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAwAAAAMAAAAAAAAAAwAAAAMAAAADAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAADAAAAAAAAAAAAAAD/////AwAAAAAAAAAFAAAAAgAAAAAAAAAAAAAAAwAAAAMAAAADAAAAAwAAAAMAAAAAAAAAAAAAAAMAAAADAAAAAwAAAAMAAAADAAAAAAAAAAAAAAADAAAAAwAAAAMAAAADAAAAAAAAAAMAAAAAAAAAAwAAAAMAAAADAAAAAwAAAAAAAAADAAAAAAAAAP////8DAAAAAAAAAAUAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAMAAAAAAAAAAwAAAAMAAAADAAAAAAAAAAMAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAAAAAADAAAAAwAAAAAAAAADAAAAAAAAAAAAAAADAAAAAwAAAAAAAAAAAAAAAwAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAwAAAAMAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAMAAAAAAAAAAAAAAP////8DAAAAAAAAAAUAAAACAAAAAAAAAAAAAAADAAAAAwAAAAMAAAAAAAAAAAAAAAMAAAAAAAAAAwAAAAMAAAADAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAwAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAwAAAAMAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAUAAAAAAAAAAAAAAAMAAAADAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAMAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAEAAAADAAAAAQAAAAAAAAABAAAAAAAAAAAAAAADAAAAAAAAAAMAAAAAAAAAAwAAAAAAAAAAAAAAAwAAAAAAAAADAAAAAAAAAAMAAAAAAAAA/////wMAAAAAAAAABQAAAAIAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAADAAAAAwAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAwAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAwAAAAMAAAAAAAAAAAAAAAMAAAADAAAAAwAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAABQAAAAAAAAAAAAAAAwAAAAMAAAADAAAAAwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAADAAAAAwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAUAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAUAAAAFAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAADAAAAAAAAAAAAAAD/////AwAAAAAAAAAFAAAAAgAAAAAAAAAAAAAAAwAAAAMAAAADAAAAAAAAAAAAAAADAAAAAAAAAAUAAAAAAAAAAAAAAAUAAAAFAAAAAAAAAAAAAAAAAAAAAQAAAAMAAAABAAAAAAAAAAEAAAAAAAAAAwAAAAMAAAADAAAAAAAAAAAAAAADAAAAAAAAAAMAAAADAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAMAAAABAAAAAAAAAAEAAAAAAAAAAwAAAAMAAAADAAAAAwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAAAAAADAAAABQAAAAEAAAAAAAAA/////wMAAAAAAAAABQAAAAIAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAUAAAAFAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAEAAAABQAAAAEAAAAAAAAAAwAAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAgAAAAUAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAMAAAABAAAAAAAAAAEAAAAAAAAABQAAAAAAAAAAAAAABQAAAAUAAAAAAAAAAAAAAP////8BAAAAAAAAAAMAAAAEAAAAAgAAAAAAAAAAAAAAAQAAAAAAAAAAAAAABQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAUAAAAAAAAAAAAAAAUAAAAFAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAABAAAABQAAAAEAAAAAAAAAAAAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAQAAAP//////////AQAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAMAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAIAAAAAAAAAAAAAAAEAAAACAAAABgAAAAQAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAEAAAABAAAAAAAAAAAAAAAAAAAABwAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAABgAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAoAAAACAAAAAAAAAAAAAAABAAAAAQAAAAUAAAAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAIAAAAAAAAAAAAAAAEAAAADAAAABwAAAAYAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAHAAAAAQAAAAAAAAABAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAMAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAEAAAABAAAAAAAAAAAAAAAAAAAABAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAOAAAAAgAAAAAAAAAAAAAAAQAAAAAAAAAJAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAwAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANAAAAAgAAAAAAAAAAAAAAAQAAAAQAAAAIAAAACgAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAsAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAJAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAACAAAAAAAAAAAAAAABAAAACwAAAA8AAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAA4AAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAgAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAFAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAACAAAAAAAAAAAAAAABAAAADAAAABAAAAAMAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAA8AAAAAAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAPAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAANAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAIAAAAAAAAAAAAAAAEAAAAKAAAAEwAAAAgAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAAAEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAEAAAABAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAABAAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAJAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAgAAAAAAAAAAAAAAAQAAAA0AAAARAAAADQAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAABEAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAATAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAABMAAAAAAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAADQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAABEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQAAAAIAAAAAAAAAAAAAAAEAAAAOAAAAEgAAAA8AAAABAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAPAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAAAAAAAABAAAAAQAAAAAAAAAAAAAAAAAAABIAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAATAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAEQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAEgAAAAEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAABMAAAACAAAAAAAAAAAAAAABAAAA//////////8TAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAASAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAABIAAAAAAAAAGAAAAAAAAAAhAAAAAAAAAB4AAAAAAAAAIAAAAAMAAAAxAAAAAQAAADAAAAADAAAAMgAAAAMAAAAIAAAAAAAAAAUAAAAFAAAACgAAAAUAAAAWAAAAAAAAABAAAAAAAAAAEgAAAAAAAAApAAAAAQAAACEAAAAAAAAAHgAAAAAAAAAEAAAAAAAAAAAAAAAFAAAAAgAAAAUAAAAPAAAAAQAAAAgAAAAAAAAABQAAAAUAAAAfAAAAAQAAABYAAAAAAAAAEAAAAAAAAAACAAAAAAAAAAYAAAAAAAAADgAAAAAAAAAKAAAAAAAAAAsAAAAAAAAAEQAAAAMAAAAYAAAAAQAAABcAAAADAAAAGQAAAAMAAAAAAAAAAAAAAAEAAAAFAAAACQAAAAUAAAAFAAAAAAAAAAIAAAAAAAAABgAAAAAAAAASAAAAAQAAAAoAAAAAAAAACwAAAAAAAAAEAAAAAQAAAAMAAAAFAAAABwAAAAUAAAAIAAAAAQAAAAAAAAAAAAAAAQAAAAUAAAAQAAAAAQAAAAUAAAAAAAAAAgAAAAAAAAAHAAAAAAAAABUAAAAAAAAAJgAAAAAAAAAJAAAAAAAAABMAAAAAAAAAIgAAAAMAAAAOAAAAAQAAABQAAAADAAAAJAAAAAMAAAADAAAAAAAAAA0AAAAFAAAAHQAAAAUAAAABAAAAAAAAAAcAAAAAAAAAFQAAAAAAAAAGAAAAAQAAAAkAAAAAAAAAEwAAAAAAAAAEAAAAAgAAAAwAAAAFAAAAGgAAAAUAAAAAAAAAAQAAAAMAAAAAAAAADQAAAAUAAAACAAAAAQAAAAEAAAAAAAAABwAAAAAAAAAaAAAAAAAAACoAAAAAAAAAOgAAAAAAAAAdAAAAAAAAACsAAAAAAAAAPgAAAAMAAAAmAAAAAQAAAC8AAAADAAAAQAAAAAMAAAAMAAAAAAAAABwAAAAFAAAALAAAAAUAAAANAAAAAAAAABoAAAAAAAAAKgAAAAAAAAAVAAAAAQAAAB0AAAAAAAAAKwAAAAAAAAAEAAAAAwAAAA8AAAAFAAAAHwAAAAUAAAADAAAAAQAAAAwAAAAAAAAAHAAAAAUAAAAHAAAAAQAAAA0AAAAAAAAAGgAAAAAAAAAfAAAAAAAAACkAAAAAAAAAMQAAAAAAAAAsAAAAAAAAADUAAAAAAAAAPQAAAAMAAAA6AAAAAQAAAEEAAAADAAAASwAAAAMAAAAPAAAAAAAAABYAAAAFAAAAIQAAAAUAAAAcAAAAAAAAAB8AAAAAAAAAKQAAAAAAAAAqAAAAAQAAACwAAAAAAAAANQAAAAAAAAAEAAAABAAAAAgAAAAFAAAAEAAAAAUAAAAMAAAAAQAAAA8AAAAAAAAAFgAAAAUAAAAaAAAAAQAAABwAAAAAAAAAHwAAAAAAAAAyAAAAAAAAADAAAAAAAAAAMQAAAAMAAAAgAAAAAAAAAB4AAAADAAAAIQAAAAMAAAAYAAAAAwAAABIAAAADAAAAEAAAAAMAAABGAAAAAAAAAEMAAAAAAAAAQgAAAAMAAAA0AAAAAwAAADIAAAAAAAAAMAAAAAAAAAAlAAAAAwAAACAAAAAAAAAAHgAAAAMAAABTAAAAAAAAAFcAAAADAAAAVQAAAAMAAABKAAAAAwAAAEYAAAAAAAAAQwAAAAAAAAA5AAAAAQAAADQAAAADAAAAMgAAAAAAAAAZAAAAAAAAABcAAAAAAAAAGAAAAAMAAAARAAAAAAAAAAsAAAADAAAACgAAAAMAAAAOAAAAAwAAAAYAAAADAAAAAgAAAAMAAAAtAAAAAAAAACcAAAAAAAAAJQAAAAMAAAAjAAAAAwAAABkAAAAAAAAAFwAAAAAAAAAbAAAAAwAAABEAAAAAAAAACwAAAAMAAAA/AAAAAAAAADsAAAADAAAAOQAAAAMAAAA4AAAAAwAAAC0AAAAAAAAAJwAAAAAAAAAuAAAAAwAAACMAAAADAAAAGQAAAAAAAAAkAAAAAAAAABQAAAAAAAAADgAAAAMAAAAiAAAAAAAAABMAAAADAAAACQAAAAMAAAAmAAAAAwAAABUAAAADAAAABwAAAAMAAAA3AAAAAAAAACgAAAAAAAAAGwAAAAMAAAA2AAAAAwAAACQAAAAAAAAAFAAAAAAAAAAzAAAAAwAAACIAAAAAAAAAEwAAAAMAAABIAAAAAAAAADwAAAADAAAALgAAAAMAAABJAAAAAwAAADcAAAAAAAAAKAAAAAAAAABHAAAAAwAAADYAAAADAAAAJAAAAAAAAABAAAAAAAAAAC8AAAAAAAAAJgAAAAMAAAA+AAAAAAAAACsAAAADAAAAHQAAAAMAAAA6AAAAAwAAACoAAAADAAAAGgAAAAMAAABUAAAAAAAAAEUAAAAAAAAAMwAAAAMAAABSAAAAAwAAAEAAAAAAAAAALwAAAAAAAABMAAAAAwAAAD4AAAAAAAAAKwAAAAMAAABhAAAAAAAAAFkAAAADAAAARwAAAAMAAABiAAAAAwAAAFQAAAAAAAAARQAAAAAAAABgAAAAAwAAAFIAAAADAAAAQAAAAAAAAABLAAAAAAAAAEEAAAAAAAAAOgAAAAMAAAA9AAAAAAAAADUAAAADAAAALAAAAAMAAAAxAAAAAwAAACkAAAADAAAAHwAAAAMAAABeAAAAAAAAAFYAAAAAAAAATAAAAAMAAABRAAAAAwAAAEsAAAAAAAAAQQAAAAAAAABCAAAAAwAAAD0AAAAAAAAANQAAAAMAAABrAAAAAAAAAGgAAAADAAAAYAAAAAMAAABlAAAAAwAAAF4AAAAAAAAAVgAAAAAAAABVAAAAAwAAAFEAAAADAAAASwAAAAAAAAA5AAAAAAAAADsAAAAAAAAAPwAAAAMAAABKAAAAAAAAAE4AAAADAAAATwAAAAMAAABTAAAAAwAAAFwAAAADAAAAXwAAAAMAAAAlAAAAAAAAACcAAAADAAAALQAAAAMAAAA0AAAAAAAAADkAAAAAAAAAOwAAAAAAAABGAAAAAwAAAEoAAAAAAAAATgAAAAMAAAAYAAAAAAAAABcAAAADAAAAGQAAAAMAAAAgAAAAAwAAACUAAAAAAAAAJwAAAAMAAAAyAAAAAwAAADQAAAAAAAAAOQAAAAAAAAAuAAAAAAAAADwAAAAAAAAASAAAAAMAAAA4AAAAAAAAAEQAAAADAAAAUAAAAAMAAAA/AAAAAwAAAE0AAAADAAAAWgAAAAMAAAAbAAAAAAAAACgAAAADAAAANwAAAAMAAAAjAAAAAAAAAC4AAAAAAAAAPAAAAAAAAAAtAAAAAwAAADgAAAAAAAAARAAAAAMAAAAOAAAAAAAAABQAAAADAAAAJAAAAAMAAAARAAAAAwAAABsAAAAAAAAAKAAAAAMAAAAZAAAAAwAAACMAAAAAAAAALgAAAAAAAABHAAAAAAAAAFkAAAAAAAAAYQAAAAMAAABJAAAAAAAAAFsAAAADAAAAZwAAAAMAAABIAAAAAwAAAFgAAAADAAAAaQAAAAMAAAAzAAAAAAAAAEUAAAADAAAAVAAAAAMAAAA2AAAAAAAAAEcAAAAAAAAAWQAAAAAAAAA3AAAAAwAAAEkAAAAAAAAAWwAAAAMAAAAmAAAAAAAAAC8AAAADAAAAQAAAAAMAAAAiAAAAAwAAADMAAAAAAAAARQAAAAMAAAAkAAAAAwAAADYAAAAAAAAARwAAAAAAAABgAAAAAAAAAGgAAAAAAAAAawAAAAMAAABiAAAAAAAAAG4AAAADAAAAcwAAAAMAAABhAAAAAwAAAG8AAAADAAAAdwAAAAMAAABMAAAAAAAAAFYAAAADAAAAXgAAAAMAAABSAAAAAAAAAGAAAAAAAAAAaAAAAAAAAABUAAAAAwAAAGIAAAAAAAAAbgAAAAMAAAA6AAAAAAAAAEEAAAADAAAASwAAAAMAAAA+AAAAAwAAAEwAAAAAAAAAVgAAAAMAAABAAAAAAwAAAFIAAAAAAAAAYAAAAAAAAABVAAAAAAAAAFcAAAAAAAAAUwAAAAMAAABlAAAAAAAAAGYAAAADAAAAZAAAAAMAAABrAAAAAwAAAHAAAAADAAAAcgAAAAMAAABCAAAAAAAAAEMAAAADAAAARgAAAAMAAABRAAAAAAAAAFUAAAAAAAAAVwAAAAAAAABeAAAAAwAAAGUAAAAAAAAAZgAAAAMAAAAxAAAAAAAAADAAAAADAAAAMgAAAAMAAAA9AAAAAwAAAEIAAAAAAAAAQwAAAAMAAABLAAAAAwAAAFEAAAAAAAAAVQAAAAAAAABfAAAAAAAAAFwAAAAAAAAAUwAAAAAAAABPAAAAAAAAAE4AAAAAAAAASgAAAAMAAAA/AAAAAQAAADsAAAADAAAAOQAAAAMAAABtAAAAAAAAAGwAAAAAAAAAZAAAAAUAAABdAAAAAQAAAF8AAAAAAAAAXAAAAAAAAABNAAAAAQAAAE8AAAAAAAAATgAAAAAAAAB1AAAABAAAAHYAAAAFAAAAcgAAAAUAAABqAAAAAQAAAG0AAAAAAAAAbAAAAAAAAABaAAAAAQAAAF0AAAABAAAAXwAAAAAAAABaAAAAAAAAAE0AAAAAAAAAPwAAAAAAAABQAAAAAAAAAEQAAAAAAAAAOAAAAAMAAABIAAAAAQAAADwAAAADAAAALgAAAAMAAABqAAAAAAAAAF0AAAAAAAAATwAAAAUAAABjAAAAAQAAAFoAAAAAAAAATQAAAAAAAABYAAAAAQAAAFAAAAAAAAAARAAAAAAAAAB1AAAAAwAAAG0AAAAFAAAAXwAAAAUAAABxAAAAAQAAAGoAAAAAAAAAXQAAAAAAAABpAAAAAQAAAGMAAAABAAAAWgAAAAAAAABpAAAAAAAAAFgAAAAAAAAASAAAAAAAAABnAAAAAAAAAFsAAAAAAAAASQAAAAMAAABhAAAAAQAAAFkAAAADAAAARwAAAAMAAABxAAAAAAAAAGMAAAAAAAAAUAAAAAUAAAB0AAAAAQAAAGkAAAAAAAAAWAAAAAAAAABvAAAAAQAAAGcAAAAAAAAAWwAAAAAAAAB1AAAAAgAAAGoAAAAFAAAAWgAAAAUAAAB5AAAAAQAAAHEAAAAAAAAAYwAAAAAAAAB3AAAAAQAAAHQAAAABAAAAaQAAAAAAAAB3AAAAAAAAAG8AAAAAAAAAYQAAAAAAAABzAAAAAAAAAG4AAAAAAAAAYgAAAAMAAABrAAAAAQAAAGgAAAADAAAAYAAAAAMAAAB5AAAAAAAAAHQAAAAAAAAAZwAAAAUAAAB4AAAAAQAAAHcAAAAAAAAAbwAAAAAAAABwAAAAAQAAAHMAAAAAAAAAbgAAAAAAAAB1AAAAAQAAAHEAAAAFAAAAaQAAAAUAAAB2AAAAAQAAAHkAAAAAAAAAdAAAAAAAAAByAAAAAQAAAHgAAAABAAAAdwAAAAAAAAByAAAAAAAAAHAAAAAAAAAAawAAAAAAAABkAAAAAAAAAGYAAAAAAAAAZQAAAAMAAABTAAAAAQAAAFcAAAADAAAAVQAAAAMAAAB2AAAAAAAAAHgAAAAAAAAAcwAAAAUAAABsAAAAAQAAAHIAAAAAAAAAcAAAAAAAAABcAAAAAQAAAGQAAAAAAAAAZgAAAAAAAAB1AAAAAAAAAHkAAAAFAAAAdwAAAAUAAABtAAAAAQAAAHYAAAAAAAAAeAAAAAAAAABfAAAAAQAAAGwAAAABAAAAcgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAQAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAAAAAAAAAAABAAAAAAAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAB+ogX28rbpPxqumpJv+fM/165tC4ns9D+XaEnTqUsEQFrOtNlC4PA/3U+0XG6P9b9TdUUBxTTjP4PUp8ex1ty/B1rD/EN43z+lcDi6LLrZP/a45NWEHMY/oJ5ijLDZ+j/xw3rjxWPjP2B8A46ioQdAotff3wla2z+FMSpA1jj+v6b5Y1mtPbS/cIu8K0F457/2esiyJpDNv98k5Ts2NeA/pvljWa09tD88ClUJ60MDQPZ6yLImkM0/4ONKxa0UBcD2uOTVhBzGv5G7JRxGave/8cN648Vj47+HCwtkjAXIv6LX398JWtu/qyheaCAL9D9TdUUBxTTjv4gyTxslhwVAB1rD/EN4378EH/28teoFwH6iBfbytum/F6ztFYdK/r/Xrm0Liez0vwcS6wNGWeO/Ws602ULg8L9TCtRLiLT8P8pi5RexJsw/BlIKPVwR5T95Wyu0/QjnP5PjoT7YYcu/mBhKZ6zrwj8wRYS7NebuP3qW6geh+Ls/SLrixebL3r+pcyymN9XrPwmkNHp7xec/GWNMZVAA17+82s+x2BLiPwn2ytbJ9ek/LgEH1sMS1j8yp/2LhTfeP+SnWwtQBbu/d38gkp5X7z8ytsuHaADGPzUYObdf1+m/7IauECWhwz+cjSACjzniP76Z+wUhN9K/1+GEKzup67+/GYr/04baPw6idWOvsuc/ZedTWsRa5b/EJQOuRzi0v/OncYhHPes/h49PixY53j+i8wWfC03Nvw2idWOvsue/ZedTWsRa5T/EJQOuRzi0P/KncYhHPeu/iY9PixY53r+i8wWfC03NP9anWwtQBbs/d38gkp5X778ytsuHaADGvzUYObdf1+k/74auECWhw7+cjSACjzniv8CZ+wUhN9I/1uGEKzup6z+/GYr/04bavwmkNHp7xee/F2NMZVAA1z+82s+x2BLivwr2ytbJ9em/KwEH1sMS1r8yp/2LhTfev81i5RexJsy/BlIKPVwR5b95Wyu0/Qjnv5DjoT7YYcs/nBhKZ6zrwr8wRYS7Nebuv3OW6geh+Lu/SLrixebL3j+pcyymN9Xrv8rHIFfWehZAMBwUdlo0DECTUc17EOb2PxpVB1SWChdAzjbhb9pTDUDQhmdvECX5P9FlMKCC9+g/IIAzjELgE0DajDngMv8GQFhWDmDPjNs/y1guLh96EkAxPi8k7DIEQJCc4URlhRhA3eLKKLwkEECqpNAyTBD/P6xpjXcDiwVAFtl//cQm4z+Ibt3XKiYTQM7mCLUb3QdAoM1t8yVv7D8aLZv2Nk8UQEAJPV5nQwxAtSsfTCoE9z9TPjXLXIIWQBVanC5W9AtAYM3d7Adm9j++5mQz1FoWQBUThyaVBghAwH5muQsV7T89Q1qv82MUQJoWGOfNuBdAzrkClkmwDkDQjKq77t37Py+g0dtitsE/ZwAMTwVPEUBojepluNwBQGYbtuW+t9w/HNWIJs6MEkDTNuQUSlgEQKxktPP5TcQ/ixbLB8JjEUCwuWjXMQYCQAS/R09FkRdAowpiZjhhDkB7LmlczD/7P01iQmhhsAVAnrtTwDy84z/Z6jfQ2TgTQChOCXMnWwpAhrW3daoz8z/HYJvVPI4VQLT3ik5FcA5Angi7LOZd+z+NNVzDy5gXQBXdvVTFUA1AYNMgOeYe+T8+qHXGCwkXQKQTOKwa5AJA8gFVoEMW0T+FwzJyttIRQAEAAAD/////BwAAAP////8xAAAA/////1cBAAD/////YQkAAP////+nQQAA/////5HLAQD/////95AMAP/////B9lcAAAAAAAAAAAAAAAAAAgAAAP////8OAAAA/////2IAAAD/////rgIAAP/////CEgAA/////06DAAD/////IpcDAP/////uIRkA/////4LtrwAAAAAAAAAAAAAAAAAAAAAAAgAAAP//////////AQAAAAMAAAD//////////////////////////////////////////////////////////////////////////wEAAAAAAAAAAgAAAP///////////////wMAAAD//////////////////////////////////////////////////////////////////////////wEAAAAAAAAAAgAAAP///////////////wMAAAD//////////////////////////////////////////////////////////////////////////wEAAAAAAAAAAgAAAP///////////////wMAAAD//////////////////////////////////////////////////////////wIAAAD//////////wEAAAAAAAAA/////////////////////wMAAAD/////////////////////////////////////////////////////AwAAAP////////////////////8AAAAA/////////////////////wEAAAD///////////////8CAAAA////////////////////////////////AwAAAP////////////////////8AAAAA////////////////AgAAAAEAAAD/////////////////////////////////////////////////////AwAAAP////////////////////8AAAAA////////////////AgAAAAEAAAD/////////////////////////////////////////////////////AwAAAP////////////////////8AAAAA////////////////AgAAAAEAAAD/////////////////////////////////////////////////////AwAAAP////////////////////8AAAAA////////////////AgAAAAEAAAD/////////////////////////////////////////////////////AQAAAAIAAAD///////////////8AAAAA/////////////////////wMAAAD/////////////////////////////////////////////////////AQAAAAIAAAD///////////////8AAAAA/////////////////////wMAAAD/////////////////////////////////////////////////////AQAAAAIAAAD///////////////8AAAAA/////////////////////wMAAAD/////////////////////////////////////////////////////AQAAAAIAAAD///////////////8AAAAA/////////////////////wMAAAD///////////////////////////////8CAAAA////////////////AQAAAP////////////////////8AAAAA/////////////////////wMAAAD/////////////////////////////////////////////////////AwAAAP////////////////////8AAAAAAQAAAP//////////AgAAAP//////////////////////////////////////////////////////////AwAAAP///////////////wIAAAAAAAAAAQAAAP//////////////////////////////////////////////////////////////////////////AwAAAP///////////////wIAAAAAAAAAAQAAAP//////////////////////////////////////////////////////////////////////////AwAAAP///////////////wIAAAAAAAAAAQAAAP//////////////////////////////////////////////////////////////////////////AwAAAAEAAAD//////////wIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAgAAAAAAAAACAAAAAQAAAAEAAAACAAAAAgAAAAAAAAAFAAAABQAAAAAAAAACAAAAAgAAAAMAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAIAAAABAAAAAgAAAAIAAAACAAAAAAAAAAUAAAAGAAAAAAAAAAIAAAACAAAAAwAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAIAAAAAAAAAAgAAAAEAAAADAAAAAgAAAAIAAAAAAAAABQAAAAcAAAAAAAAAAgAAAAIAAAADAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAgAAAAAAAAACAAAAAQAAAAQAAAACAAAAAgAAAAAAAAAFAAAACAAAAAAAAAACAAAAAgAAAAMAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAACAAAAAAAAAAIAAAABAAAAAAAAAAIAAAACAAAAAAAAAAUAAAAJAAAAAAAAAAIAAAACAAAAAwAAAAUAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAIAAAACAAAAAAAAAAMAAAAOAAAAAgAAAAAAAAACAAAAAwAAAAAAAAAAAAAAAgAAAAIAAAADAAAABgAAAAAAAAAAAAAAAAAAAAAAAAALAAAAAgAAAAIAAAAAAAAAAwAAAAoAAAACAAAAAAAAAAIAAAADAAAAAQAAAAAAAAACAAAAAgAAAAMAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAACAAAAAgAAAAAAAAADAAAACwAAAAIAAAAAAAAAAgAAAAMAAAACAAAAAAAAAAIAAAACAAAAAwAAAAgAAAAAAAAAAAAAAAAAAAAAAAAADQAAAAIAAAACAAAAAAAAAAMAAAAMAAAAAgAAAAAAAAACAAAAAwAAAAMAAAAAAAAAAgAAAAIAAAADAAAACQAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAgAAAAIAAAAAAAAAAwAAAA0AAAACAAAAAAAAAAIAAAADAAAABAAAAAAAAAACAAAAAgAAAAMAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAACAAAAAgAAAAAAAAADAAAABgAAAAIAAAAAAAAAAgAAAAMAAAAPAAAAAAAAAAIAAAACAAAAAwAAAAsAAAAAAAAAAAAAAAAAAAAAAAAABgAAAAIAAAACAAAAAAAAAAMAAAAHAAAAAgAAAAAAAAACAAAAAwAAABAAAAAAAAAAAgAAAAIAAAADAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAgAAAAIAAAAAAAAAAwAAAAgAAAACAAAAAAAAAAIAAAADAAAAEQAAAAAAAAACAAAAAgAAAAMAAAANAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAACAAAAAgAAAAAAAAADAAAACQAAAAIAAAAAAAAAAgAAAAMAAAASAAAAAAAAAAIAAAACAAAAAwAAAA4AAAAAAAAAAAAAAAAAAAAAAAAACQAAAAIAAAACAAAAAAAAAAMAAAAFAAAAAgAAAAAAAAACAAAAAwAAABMAAAAAAAAAAgAAAAIAAAADAAAADwAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAgAAAAAAAAACAAAAAQAAABMAAAACAAAAAgAAAAAAAAAFAAAACgAAAAAAAAACAAAAAgAAAAMAAAAQAAAAAAAAAAAAAAAAAAAAAAAAABEAAAACAAAAAAAAAAIAAAABAAAADwAAAAIAAAACAAAAAAAAAAUAAAALAAAAAAAAAAIAAAACAAAAAwAAABEAAAAAAAAAAAAAAAAAAAAAAAAAEgAAAAIAAAAAAAAAAgAAAAEAAAAQAAAAAgAAAAIAAAAAAAAABQAAAAwAAAAAAAAAAgAAAAIAAAADAAAAEgAAAAAAAAAAAAAAAAAAAAAAAAATAAAAAgAAAAAAAAACAAAAAQAAABEAAAACAAAAAgAAAAAAAAAFAAAADQAAAAAAAAACAAAAAgAAAAMAAAATAAAAAAAAAAAAAAAAAAAAAAAAAA8AAAACAAAAAAAAAAIAAAABAAAAEgAAAAIAAAACAAAAAAAAAAUAAAAOAAAAAAAAAAIAAAACAAAAAwAAAAIAAAABAAAAAAAAAAEAAAACAAAAAAAAAAAAAAACAAAAAQAAAAAAAAABAAAAAgAAAAEAAAAAAAAAAgAAAAAAAAAFAAAABAAAAAAAAAABAAAABQAAAAAAAAAAAAAABQAAAAQAAAAAAAAAAQAAAAUAAAAEAAAAAAAAAAUAAAAAAAAAAgAAAAEAAAAAAAAAAQAAAAIAAAAAAAAAAAAAAAIAAAABAAAAAAAAAAEAAAACAAAAAQAAAAAAAAACAAAAAgAAAAAAAAABAAAAAAAAAAAAAAAFAAAABAAAAAAAAAABAAAABQAAAAAAAAAAAAAABQAAAAQAAAAAAAAAAQAAAAUAAAAEAAAAAAAAAAUAAAAFAAAAAAAAAAEAAAAAAAAAAAAAAMuhRbbsNlBBYqHW9OmHIkF9XBuqnS31QAK37uYhNMhAOSo3UUupm0DC+6pc6JxvQHV9eseEEEJAzURsCyqlFEB8BQ4NMJjnPyy3tBoS97o/xawXQznRjj89J2K2CZxhP6vX43RIIDQ/S8isgygEBz+LvFHQkmzaPjFFFO7wMq4+AADMLkTtjkIAAOgkJqxhQgAAU7B0MjRCAADwpBcVB0IAAACYP2HaQQAAAIn/Ja5BzczM4Eg6gUHNzMxMU7BTQTMzMzNfgCZBAAAAAEi3+UAAAAAAwGPNQDMzMzMzy6BAmpmZmZkxc0AzMzMzM/NFQDMzMzMzMxlAzczMzMzM7D+ygXSx2U6RQKimJOvQKnpA23hmONTHY0A/AGcxyudNQNb3K647mzZA+S56rrwWIUAm4kUQ+9UJQKre9hGzh/M/BLvoy9WG3T+LmqMf8VHGP2m3nYNV37A/gbFHcyeCmT+cBPWBckiDP61tZACjKW0/q2RbYVUYVj8uDypVyLNAP6jGS5cA5zBBwcqhBdCNGUEGEhQ/JVEDQT6WPnRbNO1AB/AWSJgT1kDfUWNCNLDAQNk+5C33OqlAchWL34QSk0DKvtDIrNV8QNF0G3kFzGVASSeWhBl6UED+/0mNGuk4QGjA/dm/1CJALPLPMql6DEDSHoDrwpP1P2jouzWST+A/egAAAAAAAABKAwAAAAAAAPoWAAAAAAAAyqAAAAAAAAB6ZQQAAAAAAErGHgAAAAAA+mvXAAAAAADK8+MFAAAAAHqqOykAAAAASqmhIAEAAAD6oGvkBwAAAMpm8T43AAAAes+ZuIIBAABKrDQMkwoAAPq1cFUFSgAAyvkUViUGAgAAAAAAAwAAAAYAAAACAAAABQAAAAEAAAAEAAAAAAAAAAAAAAAFAAAAAwAAAAEAAAAGAAAABAAAAAIAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAP////////////////////////////////////8AAAAA/////wAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAP////8AAAAAAAAAAAEAAAABAAAAAAAAAAAAAAD/////AAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAA/////wUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAP////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/////////////////////////////////////AAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/////////////////////////////////////wAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAUAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////////////////////////////8AAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAABAAAAAAAAAAAAAAABAAAAAQAAAAEAAAAAAAAAAQAAAAAAAAAFAAAAAQAAAAEAAAAAAAAAAAAAAAEAAAABAAAAAAAAAAEAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAAAAAABAAEAAAEBAAAAAAABAAAAAQAAAAEAAQAAAAAAAAAAAAAAAAAAAABhbGdvcy5jAF9wb2x5ZmlsbEludGVybmFsAGFkamFjZW50RmFjZURpclt0bXBGaWprLmZhY2VdW2ZpamsuZmFjZV0gPT0gS0kAZmFjZWlqay5jAF9mYWNlSWprUGVudFRvR2VvQm91bmRhcnkAYWRqYWNlbnRGYWNlRGlyW2NlbnRlcklKSy5mYWNlXVtmYWNlMl0gPT0gS0kAX2ZhY2VJamtUb0dlb0JvdW5kYXJ5AHBvbHlnb24tPm5leHQgPT0gTlVMTABsaW5rZWRHZW8uYwBhZGROZXdMaW5rZWRQb2x5Z29uAG5leHQgIT0gTlVMTABsb29wICE9IE5VTEwAYWRkTmV3TGlua2VkTG9vcABwb2x5Z29uLT5maXJzdCA9PSBOVUxMAGFkZExpbmtlZExvb3AAY29vcmQgIT0gTlVMTABhZGRMaW5rZWRDb29yZABsb29wLT5maXJzdCA9PSBOVUxMAGlubmVyTG9vcHMgIT0gTlVMTABub3JtYWxpemVNdWx0aVBvbHlnb24AYmJveGVzICE9IE5VTEwAY2FuZGlkYXRlcyAhPSBOVUxMAGZpbmRQb2x5Z29uRm9ySG9sZQBjYW5kaWRhdGVCQm94ZXMgIT0gTlVMTAByZXZEaXIgIT0gSU5WQUxJRF9ESUdJVABsb2NhbGlqLmMAaDNUb0xvY2FsSWprAGJhc2VDZWxsICE9IG9yaWdpbkJhc2VDZWxsACEob3JpZ2luT25QZW50ICYmIGluZGV4T25QZW50KQBwZW50YWdvblJvdGF0aW9ucyA+PSAwAGRpcmVjdGlvblJvdGF0aW9ucyA+PSAwAGJhc2VDZWxsID09IG9yaWdpbkJhc2VDZWxsAGJhc2VDZWxsICE9IElOVkFMSURfQkFTRV9DRUxMAGxvY2FsSWprVG9IMwAhX2lzQmFzZUNlbGxQZW50YWdvbihiYXNlQ2VsbCkAYmFzZUNlbGxSb3RhdGlvbnMgPj0gMAB3aXRoaW5QZW50YWdvblJvdGF0aW9ucyA+PSAwAGdyYXBoLT5idWNrZXRzICE9IE5VTEwAdmVydGV4R3JhcGguYwBpbml0VmVydGV4R3JhcGgAbm9kZSAhPSBOVUxMAGFkZFZlcnRleE5vZGU=";
  var tempDoublePtr = 23680;

  function demangle(func) {
    return func;
  }

  function demangleAll(text) {
    var regex = /\b__Z[\w\d_]+/g;
    return text.replace(regex, function (x) {
      var y = demangle(x);
      return x === y ? x : y + " [" + x + "]";
    });
  }

  function jsStackTrace() {
    var err = new Error();

    if (!err.stack) {
      try {
        throw new Error(0);
      } catch (e) {
        err = e;
      }

      if (!err.stack) {
        return "(no stack trace available)";
      }
    }

    return err.stack.toString();
  }

  function stackTrace() {
    var js = jsStackTrace();
    if (Module["extraStackTrace"]) { js += "\n" + Module["extraStackTrace"](); }
    return demangleAll(js);
  }

  function ___assert_fail(condition, filename, line, func) {
    abort("Assertion failed: " + UTF8ToString(condition) + ", at: " + [filename ? UTF8ToString(filename) : "unknown filename", line, func ? UTF8ToString(func) : "unknown function"]);
  }

  function _emscripten_get_heap_size() {
    return HEAP8.length;
  }

  function _emscripten_memcpy_big(dest, src, num) {
    HEAPU8.set(HEAPU8.subarray(src, src + num), dest);
  }

  function ___setErrNo(value) {
    if (Module["___errno_location"]) { HEAP32[Module["___errno_location"]() >> 2] = value; }
    return value;
  }

  function abortOnCannotGrowMemory(requestedSize) {
    abort("OOM");
  }

  function emscripten_realloc_buffer(size) {
    try {
      var newBuffer = new ArrayBuffer(size);
      if (newBuffer.byteLength != size) { return; }
      new Int8Array(newBuffer).set(HEAP8);

      _emscripten_replace_memory(newBuffer);

      updateGlobalBufferAndViews(newBuffer);
      return 1;
    } catch (e) {}
  }

  function _emscripten_resize_heap(requestedSize) {
    var oldSize = _emscripten_get_heap_size();

    var PAGE_MULTIPLE = 16777216;
    var LIMIT = 2147483648 - PAGE_MULTIPLE;

    if (requestedSize > LIMIT) {
      return false;
    }

    var MIN_TOTAL_MEMORY = 16777216;
    var newSize = Math.max(oldSize, MIN_TOTAL_MEMORY);

    while (newSize < requestedSize) {
      if (newSize <= 536870912) {
        newSize = alignUp(2 * newSize, PAGE_MULTIPLE);
      } else {
        newSize = Math.min(alignUp((3 * newSize + 2147483648) / 4, PAGE_MULTIPLE), LIMIT);
      }
    }

    var replacement = emscripten_realloc_buffer(newSize);

    if (!replacement) {
      return false;
    }

    return true;
  }

  var decodeBase64 = typeof atob === "function" ? atob : function (input) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    do {
      enc1 = keyStr.indexOf(input.charAt(i++));
      enc2 = keyStr.indexOf(input.charAt(i++));
      enc3 = keyStr.indexOf(input.charAt(i++));
      enc4 = keyStr.indexOf(input.charAt(i++));
      chr1 = enc1 << 2 | enc2 >> 4;
      chr2 = (enc2 & 15) << 4 | enc3 >> 2;
      chr3 = (enc3 & 3) << 6 | enc4;
      output = output + String.fromCharCode(chr1);

      if (enc3 !== 64) {
        output = output + String.fromCharCode(chr2);
      }

      if (enc4 !== 64) {
        output = output + String.fromCharCode(chr3);
      }
    } while (i < input.length);

    return output;
  };

  function intArrayFromBase64(s) {
    try {
      var decoded = decodeBase64(s);
      var bytes = new Uint8Array(decoded.length);

      for (var i = 0; i < decoded.length; ++i) {
        bytes[i] = decoded.charCodeAt(i);
      }

      return bytes;
    } catch (_) {
      throw new Error("Converting base64 string to bytes failed.");
    }
  }

  function tryParseAsDataURI(filename) {
    if (!isDataURI(filename)) {
      return;
    }

    return intArrayFromBase64(filename.slice(dataURIPrefix.length));
  }

  var asmGlobalArg = {
    "Math": Math,
    "Int8Array": Int8Array,
    "Int32Array": Int32Array,
    "Uint8Array": Uint8Array,
    "Float32Array": Float32Array,
    "Float64Array": Float64Array
  };
  var asmLibraryArg = {
    "a": abort,
    "b": setTempRet0,
    "c": getTempRet0,
    "d": ___assert_fail,
    "e": ___setErrNo,
    "f": _emscripten_get_heap_size,
    "g": _emscripten_memcpy_big,
    "h": _emscripten_resize_heap,
    "i": abortOnCannotGrowMemory,
    "j": demangle,
    "k": demangleAll,
    "l": emscripten_realloc_buffer,
    "m": jsStackTrace,
    "n": stackTrace,
    "o": tempDoublePtr,
    "p": DYNAMICTOP_PTR
  }; // EMSCRIPTEN_START_ASM

  var asm =
  /** @suppress {uselessCode} */
  function (global, env, buffer) {
    "almost asm";

    var a = new global.Int8Array(buffer),
        b = new global.Int32Array(buffer),
        c = new global.Uint8Array(buffer),
        d = new global.Float32Array(buffer),
        e = new global.Float64Array(buffer),
        g = env.p | 0,
        p = global.Math.floor,
        q = global.Math.abs,
        r = global.Math.sqrt,
        s = global.Math.pow,
        t = global.Math.cos,
        u = global.Math.sin,
        v = global.Math.tan,
        w = global.Math.acos,
        x = global.Math.asin,
        y = global.Math.atan,
        z = global.Math.atan2,
        A = global.Math.ceil,
        B = global.Math.imul,
        C = global.Math.min,
        D = global.Math.clz32,
        F = env.b,
        G = env.c,
        H = env.d,
        I = env.e,
        J = env.f,
        K = env.g,
        L = env.h,
        M = env.i,
        S = 23696;

    function V(newBuffer) {
      a = new Int8Array(newBuffer);
      c = new Uint8Array(newBuffer);
      b = new Int32Array(newBuffer);
      d = new Float32Array(newBuffer);
      e = new Float64Array(newBuffer);
      buffer = newBuffer;
      return true;
    } // EMSCRIPTEN_START_FUNCS


    function W(a) {
      a = a | 0;
      var b = 0;
      b = S;
      S = S + a | 0;
      S = S + 15 & -16;
      return b | 0;
    }

    function X() {
      return S | 0;
    }

    function Y(a) {
      a = a | 0;
      S = a;
    }

    function Z(a, b) {
      a = a | 0;
      b = b | 0;
      S = a;
    }

    function _(a) {
      a = a | 0;
      return (B(a * 3 | 0, a + 1 | 0) | 0) + 1 | 0;
    }

    function $(a, b, c, d) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      var e = 0,
          f = 0;
      if (!(ba(a, b, c, d, 0) | 0)) { return; }
      f = (B(c * 3 | 0, c + 1 | 0) | 0) + 1 | 0;
      Wc(d | 0, 0, f << 3 | 0) | 0;
      e = Lc(f, 4) | 0;
      if (!e) { return; }
      ca(a, b, c, d, e, f, 0);
      Kc(e);
      return;
    }

    function aa(a, b, c, d, e) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      var f = 0;
      if (!(ba(a, b, c, d, e) | 0)) { return; }
      f = (B(c * 3 | 0, c + 1 | 0) | 0) + 1 | 0;
      Wc(d | 0, 0, f << 3 | 0) | 0;

      if (e | 0) {
        Wc(e | 0, 0, f << 2 | 0) | 0;
        ca(a, b, c, d, e, f, 0);
        return;
      }

      e = Lc(f, 4) | 0;
      if (!e) { return; }
      ca(a, b, c, d, e, f, 0);
      Kc(e);
      return;
    }

    function ba(a, c, d, e, f) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
          h = 0,
          i = 0,
          j = 0,
          k = 0,
          l = 0,
          m = 0,
          n = 0,
          o = 0;
      o = S;
      S = S + 16 | 0;
      n = o;
      g = e;
      b[g >> 2] = a;
      b[g + 4 >> 2] = c;
      g = (f | 0) != 0;
      if (g) { b[f >> 2] = 0; }

      if (ub(a, c) | 0) {
        n = 1;
        S = o;
        return n | 0;
      }

      b[n >> 2] = 0;

      a: do { if ((d | 0) >= 1) {
        if (g) {
          k = 0;
          l = 1;
          m = 1;
          h = 0;
          g = a;

          while (1) {
            if (!(h | k)) {
              g = da(g, c, 4, n) | 0;
              c = G() | 0;

              if ((g | 0) == 0 & (c | 0) == 0) {
                g = 2;
                break a;
              }

              if (ub(g, c) | 0) {
                g = 1;
                break a;
              }
            }

            g = da(g, c, b[16 + (k << 2) >> 2] | 0, n) | 0;
            c = G() | 0;

            if ((g | 0) == 0 & (c | 0) == 0) {
              g = 2;
              break a;
            }

            a = e + (m << 3) | 0;
            b[a >> 2] = g;
            b[a + 4 >> 2] = c;
            b[f + (m << 2) >> 2] = l;
            h = h + 1 | 0;
            a = (h | 0) == (l | 0);
            i = k + 1 | 0;
            j = (i | 0) == 6;

            if (ub(g, c) | 0) {
              g = 1;
              break a;
            }

            l = l + (j & a & 1) | 0;

            if ((l | 0) > (d | 0)) {
              g = 0;
              break;
            } else {
              k = a ? j ? 0 : i : k;
              m = m + 1 | 0;
              h = a ? 0 : h;
            }
          }
        } else {
          k = 0;
          l = 1;
          m = 1;
          h = 0;
          g = a;

          while (1) {
            if (!(h | k)) {
              g = da(g, c, 4, n) | 0;
              c = G() | 0;

              if ((g | 0) == 0 & (c | 0) == 0) {
                g = 2;
                break a;
              }

              if (ub(g, c) | 0) {
                g = 1;
                break a;
              }
            }

            g = da(g, c, b[16 + (k << 2) >> 2] | 0, n) | 0;
            c = G() | 0;

            if ((g | 0) == 0 & (c | 0) == 0) {
              g = 2;
              break a;
            }

            a = e + (m << 3) | 0;
            b[a >> 2] = g;
            b[a + 4 >> 2] = c;
            h = h + 1 | 0;
            a = (h | 0) == (l | 0);
            i = k + 1 | 0;
            j = (i | 0) == 6;

            if (ub(g, c) | 0) {
              g = 1;
              break a;
            }

            l = l + (j & a & 1) | 0;

            if ((l | 0) > (d | 0)) {
              g = 0;
              break;
            } else {
              k = a ? j ? 0 : i : k;
              m = m + 1 | 0;
              h = a ? 0 : h;
            }
          }
        }
      } else { g = 0; } } while (0);

      n = g;
      S = o;
      return n | 0;
    }

    function ca(a, c, d, e, f, g, h) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      var i = 0,
          j = 0,
          k = 0,
          l = 0,
          m = 0,
          n = 0,
          o = 0;
      m = S;
      S = S + 16 | 0;
      l = m;

      if ((a | 0) == 0 & (c | 0) == 0) {
        S = m;
        return;
      }

      i = Qc(a | 0, c | 0, g | 0, ((g | 0) < 0) << 31 >> 31 | 0) | 0;
      G() | 0;
      j = e + (i << 3) | 0;
      n = j;
      o = b[n >> 2] | 0;
      n = b[n + 4 >> 2] | 0;
      k = (o | 0) == (a | 0) & (n | 0) == (c | 0);
      if (!((o | 0) == 0 & (n | 0) == 0 | k)) { do {
        i = (i + 1 | 0) % (g | 0) | 0;
        j = e + (i << 3) | 0;
        o = j;
        n = b[o >> 2] | 0;
        o = b[o + 4 >> 2] | 0;
        k = (n | 0) == (a | 0) & (o | 0) == (c | 0);
      } while (!((n | 0) == 0 & (o | 0) == 0 | k)); }
      i = f + (i << 2) | 0;

      if (k ? (b[i >> 2] | 0) <= (h | 0) : 0) {
        S = m;
        return;
      }

      o = j;
      b[o >> 2] = a;
      b[o + 4 >> 2] = c;
      b[i >> 2] = h;

      if ((h | 0) >= (d | 0)) {
        S = m;
        return;
      }

      o = h + 1 | 0;
      b[l >> 2] = 0;
      n = da(a, c, 2, l) | 0;
      ca(n, G() | 0, d, e, f, g, o);
      b[l >> 2] = 0;
      n = da(a, c, 3, l) | 0;
      ca(n, G() | 0, d, e, f, g, o);
      b[l >> 2] = 0;
      n = da(a, c, 1, l) | 0;
      ca(n, G() | 0, d, e, f, g, o);
      b[l >> 2] = 0;
      n = da(a, c, 5, l) | 0;
      ca(n, G() | 0, d, e, f, g, o);
      b[l >> 2] = 0;
      n = da(a, c, 4, l) | 0;
      ca(n, G() | 0, d, e, f, g, o);
      b[l >> 2] = 0;
      n = da(a, c, 6, l) | 0;
      ca(n, G() | 0, d, e, f, g, o);
      S = m;
      return;
    }

    function da(a, c, d, e) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      var f = 0,
          g = 0,
          h = 0,
          i = 0,
          j = 0,
          k = 0,
          l = 0,
          m = 0,
          n = 0,
          o = 0;

      if ((b[e >> 2] | 0) > 0) {
        f = 0;

        do {
          d = Na(d) | 0;
          f = f + 1 | 0;
        } while ((f | 0) < (b[e >> 2] | 0));
      }

      i = Rc(a | 0, c | 0, 45) | 0;
      G() | 0;
      j = i & 127;
      g = Ab(a, c) | 0;
      f = Rc(a | 0, c | 0, 52) | 0;
      G() | 0;
      f = f & 15;

      a: do { if (!f) { h = 6; }else { while (1) {
        m = (15 - f | 0) * 3 | 0;
        n = Rc(a | 0, c | 0, m | 0) | 0;
        G() | 0;
        n = n & 7;
        o = (Gb(f) | 0) == 0;
        f = f + -1 | 0;
        l = Sc(7, 0, m | 0) | 0;
        c = c & ~(G() | 0);
        m = Sc(b[(o ? 464 : 48) + (n * 28 | 0) + (d << 2) >> 2] | 0, 0, m | 0) | 0;
        k = G() | 0;
        d = b[(o ? 672 : 256) + (n * 28 | 0) + (d << 2) >> 2] | 0;
        a = m | a & ~l;
        c = k | c;

        if (!d) {
          d = 0;
          break a;
        }

        if (!f) {
          h = 6;
          break;
        }
      } } } while (0);

      if ((h | 0) == 6) {
        o = b[880 + (j * 28 | 0) + (d << 2) >> 2] | 0;
        n = Sc(o | 0, 0, 45) | 0;
        a = n | a;
        c = G() | 0 | c & -1040385;
        d = b[4304 + (j * 28 | 0) + (d << 2) >> 2] | 0;

        if ((o & 127 | 0) == 127) {
          o = Sc(b[880 + (j * 28 | 0) + 20 >> 2] | 0, 0, 45) | 0;
          c = G() | 0 | c & -1040385;
          d = b[4304 + (j * 28 | 0) + 20 >> 2] | 0;
          a = Cb(o | a, c) | 0;
          c = G() | 0;
          b[e >> 2] = (b[e >> 2] | 0) + 1;
        }
      }

      h = Rc(a | 0, c | 0, 45) | 0;
      G() | 0;
      h = h & 127;

      b: do { if (!(la(h) | 0)) {
        if ((d | 0) > 0) {
          f = 0;

          do {
            a = Cb(a, c) | 0;
            c = G() | 0;
            f = f + 1 | 0;
          } while ((f | 0) != (d | 0));
        }
      } else {
        c: do { if ((Ab(a, c) | 0) == 1) {
          if ((j | 0) != (h | 0)) { if (pa(h, b[7728 + (j * 28 | 0) >> 2] | 0) | 0) {
            a = Eb(a, c) | 0;
            g = 1;
            c = G() | 0;
            break;
          } else {
            a = Cb(a, c) | 0;
            g = 1;
            c = G() | 0;
            break;
          } }

          switch (g | 0) {
            case 5:
              {
                a = Eb(a, c) | 0;
                c = G() | 0;
                b[e >> 2] = (b[e >> 2] | 0) + 5;
                g = 0;
                break c;
              }

            case 3:
              {
                a = Cb(a, c) | 0;
                c = G() | 0;
                b[e >> 2] = (b[e >> 2] | 0) + 1;
                g = 0;
                break c;
              }

            default:
              {
                n = 0;
                o = 0;
                F(n | 0);
                return o | 0;
              }
          }
        } else { g = 0; } } while (0);

        if ((d | 0) > 0) {
          f = 0;

          do {
            a = Bb(a, c) | 0;
            c = G() | 0;
            f = f + 1 | 0;
          } while ((f | 0) != (d | 0));
        }

        if ((j | 0) != (h | 0)) {
          if (!(ma(h) | 0)) {
            if ((g | 0) != 0 | (Ab(a, c) | 0) != 5) { break; }
            b[e >> 2] = (b[e >> 2] | 0) + 1;
            break;
          }

          switch (i & 127) {
            case 8:
            case 118:
              break b;

            default:

          }

          if ((Ab(a, c) | 0) != 3) { b[e >> 2] = (b[e >> 2] | 0) + 1; }
        }
      } } while (0);

      b[e >> 2] = ((b[e >> 2] | 0) + d | 0) % 6 | 0;
      n = c;
      o = a;
      F(n | 0);
      return o | 0;
    }

    function ea(a, c, d, e) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      var f = 0,
          g = 0,
          h = 0,
          i = 0,
          j = 0,
          k = 0,
          l = 0,
          m = 0;
      m = S;
      S = S + 16 | 0;
      l = m;

      if (!d) {
        l = e;
        b[l >> 2] = a;
        b[l + 4 >> 2] = c;
        l = 0;
        S = m;
        return l | 0;
      }

      b[l >> 2] = 0;

      a: do { if (!(ub(a, c) | 0)) {
        g = (d | 0) > 0;

        if (g) {
          f = 0;
          k = a;

          do {
            k = da(k, c, 4, l) | 0;
            c = G() | 0;

            if ((k | 0) == 0 & (c | 0) == 0) {
              a = 2;
              break a;
            }

            f = f + 1 | 0;

            if (ub(k, c) | 0) {
              a = 1;
              break a;
            }
          } while ((f | 0) < (d | 0));

          j = e;
          b[j >> 2] = k;
          b[j + 4 >> 2] = c;
          j = d + -1 | 0;

          if (g) {
            g = 0;
            h = 1;
            f = k;
            a = c;

            do {
              f = da(f, a, 2, l) | 0;
              a = G() | 0;

              if ((f | 0) == 0 & (a | 0) == 0) {
                a = 2;
                break a;
              }

              i = e + (h << 3) | 0;
              b[i >> 2] = f;
              b[i + 4 >> 2] = a;
              h = h + 1 | 0;

              if (ub(f, a) | 0) {
                a = 1;
                break a;
              }

              g = g + 1 | 0;
            } while ((g | 0) < (d | 0));

            i = 0;
            g = h;

            do {
              f = da(f, a, 3, l) | 0;
              a = G() | 0;

              if ((f | 0) == 0 & (a | 0) == 0) {
                a = 2;
                break a;
              }

              h = e + (g << 3) | 0;
              b[h >> 2] = f;
              b[h + 4 >> 2] = a;
              g = g + 1 | 0;

              if (ub(f, a) | 0) {
                a = 1;
                break a;
              }

              i = i + 1 | 0;
            } while ((i | 0) < (d | 0));

            h = 0;

            do {
              f = da(f, a, 1, l) | 0;
              a = G() | 0;

              if ((f | 0) == 0 & (a | 0) == 0) {
                a = 2;
                break a;
              }

              i = e + (g << 3) | 0;
              b[i >> 2] = f;
              b[i + 4 >> 2] = a;
              g = g + 1 | 0;

              if (ub(f, a) | 0) {
                a = 1;
                break a;
              }

              h = h + 1 | 0;
            } while ((h | 0) < (d | 0));

            h = 0;

            do {
              f = da(f, a, 5, l) | 0;
              a = G() | 0;

              if ((f | 0) == 0 & (a | 0) == 0) {
                a = 2;
                break a;
              }

              i = e + (g << 3) | 0;
              b[i >> 2] = f;
              b[i + 4 >> 2] = a;
              g = g + 1 | 0;

              if (ub(f, a) | 0) {
                a = 1;
                break a;
              }

              h = h + 1 | 0;
            } while ((h | 0) < (d | 0));

            h = 0;

            do {
              f = da(f, a, 4, l) | 0;
              a = G() | 0;

              if ((f | 0) == 0 & (a | 0) == 0) {
                a = 2;
                break a;
              }

              i = e + (g << 3) | 0;
              b[i >> 2] = f;
              b[i + 4 >> 2] = a;
              g = g + 1 | 0;

              if (ub(f, a) | 0) {
                a = 1;
                break a;
              }

              h = h + 1 | 0;
            } while ((h | 0) < (d | 0));

            h = 0;

            while (1) {
              f = da(f, a, 6, l) | 0;
              a = G() | 0;

              if ((f | 0) == 0 & (a | 0) == 0) {
                a = 2;
                break a;
              }

              if ((h | 0) != (j | 0)) {
                i = e + (g << 3) | 0;
                b[i >> 2] = f;
                b[i + 4 >> 2] = a;
                if (!(ub(f, a) | 0)) { g = g + 1 | 0; }else {
                  a = 1;
                  break a;
                }
              }

              h = h + 1 | 0;

              if ((h | 0) >= (d | 0)) {
                h = k;
                g = c;
                break;
              }
            }
          } else {
            h = k;
            f = k;
            g = c;
            a = c;
          }
        } else {
          h = e;
          b[h >> 2] = a;
          b[h + 4 >> 2] = c;
          h = a;
          f = a;
          g = c;
          a = c;
        }

        a = ((h | 0) != (f | 0) | (g | 0) != (a | 0)) & 1;
      } else { a = 1; } } while (0);

      l = a;
      S = m;
      return l | 0;
    }

    function fa(a, c) {
      a = a | 0;
      c = c | 0;
      var d = 0,
          e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0;
      g = S;
      S = S + 48 | 0;
      f = g + 8 | 0;
      e = g;
      i = a;
      h = b[i + 4 >> 2] | 0;
      d = e;
      b[d >> 2] = b[i >> 2];
      b[d + 4 >> 2] = h;
      kc(e, f);
      f = wa(f, c) | 0;
      c = b[e >> 2] | 0;
      e = b[a + 8 >> 2] | 0;

      if ((e | 0) <= 0) {
        i = c;
        h = (f | 0) < (i | 0);
        i = h ? i : f;
        i = i + 12 | 0;
        S = g;
        return i | 0;
      }

      d = b[a + 12 >> 2] | 0;
      a = 0;

      do {
        c = (b[d + (a << 3) >> 2] | 0) + c | 0;
        a = a + 1 | 0;
      } while ((a | 0) < (e | 0));

      i = (f | 0) < (c | 0);
      i = i ? c : f;
      i = i + 12 | 0;
      S = g;
      return i | 0;
    }

    function ga(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      var e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0,
          j = 0;
      i = S;
      S = S + 48 | 0;
      e = i + 8 | 0;
      f = i;

      if (!(ha(a, c, d) | 0)) {
        S = i;
        return;
      }

      j = a;
      g = b[j + 4 >> 2] | 0;
      h = f;
      b[h >> 2] = b[j >> 2];
      b[h + 4 >> 2] = g;
      kc(f, e);
      h = wa(e, c) | 0;
      c = b[f >> 2] | 0;
      g = b[a + 8 >> 2] | 0;

      if ((g | 0) > 0) {
        f = b[a + 12 >> 2] | 0;
        e = 0;

        do {
          c = (b[f + (e << 3) >> 2] | 0) + c | 0;
          e = e + 1 | 0;
        } while ((e | 0) != (g | 0));
      }

      c = (h | 0) < (c | 0) ? c : h;

      if ((c | 0) <= -12) {
        S = i;
        return;
      }

      j = c + 11 | 0;
      Wc(d | 0, 0, (((j | 0) > 0 ? j : 0) << 3) + 8 | 0) | 0;
      S = i;
      return;
    }

    function ha(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      var e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0,
          j = 0,
          k = 0,
          l = 0,
          m = 0,
          n = 0,
          o = 0,
          p = 0,
          q = 0,
          r = 0,
          s = 0,
          t = 0,
          u = 0,
          v = 0,
          w = 0,
          x = 0,
          y = 0,
          z = 0,
          A = 0,
          B = 0,
          C = 0,
          D = 0,
          E = 0,
          F = 0,
          I = 0,
          J = 0;
      J = S;
      S = S + 112 | 0;
      D = J + 80 | 0;
      j = J + 72 | 0;
      E = J;
      F = J + 56 | 0;
      k = a + 8 | 0;
      I = Jc((b[k >> 2] << 5) + 32 | 0) | 0;
      if (!I) { H(22496, 22096, 800, 22104); }
      lc(a, I);
      g = a;
      e = b[g + 4 >> 2] | 0;
      i = j;
      b[i >> 2] = b[g >> 2];
      b[i + 4 >> 2] = e;
      kc(j, D);
      i = wa(D, c) | 0;
      e = b[j >> 2] | 0;
      g = b[k >> 2] | 0;

      if ((g | 0) > 0) {
        h = b[a + 12 >> 2] | 0;
        f = 0;

        do {
          e = (b[h + (f << 3) >> 2] | 0) + e | 0;
          f = f + 1 | 0;
        } while ((f | 0) != (g | 0));
      }

      i = (i | 0) < (e | 0) ? e : i;
      C = i + 12 | 0;
      f = Lc(C, 8) | 0;
      l = Lc(C, 8) | 0;
      b[D >> 2] = 0;
      A = a;
      B = b[A + 4 >> 2] | 0;
      e = j;
      b[e >> 2] = b[A >> 2];
      b[e + 4 >> 2] = B;
      e = ia(j, C, c, D, f, l) | 0;

      if (e | 0) {
        Kc(f);
        Kc(l);
        Kc(I);
        I = e;
        S = J;
        return I | 0;
      }

      a: do { if ((b[k >> 2] | 0) > 0) {
        g = a + 12 | 0;
        e = 0;

        while (1) {
          h = ia((b[g >> 2] | 0) + (e << 3) | 0, C, c, D, f, l) | 0;
          e = e + 1 | 0;
          if (h | 0) { break; }
          if ((e | 0) >= (b[k >> 2] | 0)) { break a; }
        }

        Kc(f);
        Kc(l);
        Kc(I);
        I = h;
        S = J;
        return I | 0;
      } } while (0);

      if ((i | 0) > -12) { Wc(l | 0, 0, ((C | 0) > 1 ? C : 1) << 3 | 0) | 0; }

      b: do { if ((b[D >> 2] | 0) > 0) {
        B = ((C | 0) < 0) << 31 >> 31;
        v = f;
        w = l;
        x = f;
        y = f;
        z = l;
        A = f;
        e = f;
        r = f;
        s = l;
        t = l;
        u = l;
        f = l;

        c: while (1) {
          q = b[D >> 2] | 0;
          o = 0;
          p = 0;
          g = 0;

          while (1) {
            h = E;
            i = h + 56 | 0;

            do {
              b[h >> 2] = 0;
              h = h + 4 | 0;
            } while ((h | 0) < (i | 0));

            c = v + (o << 3) | 0;
            j = b[c >> 2] | 0;
            c = b[c + 4 >> 2] | 0;

            if (ba(j, c, 1, E, 0) | 0) {
              h = E;
              i = h + 56 | 0;

              do {
                b[h >> 2] = 0;
                h = h + 4 | 0;
              } while ((h | 0) < (i | 0));

              h = Lc(7, 4) | 0;

              if (h | 0) {
                ca(j, c, 1, E, h, 7, 0);
                Kc(h);
              }
            }

            n = 0;

            do {
              m = E + (n << 3) | 0;
              l = b[m >> 2] | 0;
              m = b[m + 4 >> 2] | 0;

              d: do { if (!((l | 0) == 0 & (m | 0) == 0)) {
                j = Qc(l | 0, m | 0, C | 0, B | 0) | 0;
                G() | 0;
                h = d + (j << 3) | 0;
                i = h;
                c = b[i >> 2] | 0;
                i = b[i + 4 >> 2] | 0;

                if (!((c | 0) == 0 & (i | 0) == 0)) {
                  k = 0;

                  while (1) {
                    if ((k | 0) > (C | 0)) { break c; }
                    if ((c | 0) == (l | 0) & (i | 0) == (m | 0)) { break d; }
                    j = (j + 1 | 0) % (C | 0) | 0;
                    h = d + (j << 3) | 0;
                    i = h;
                    c = b[i >> 2] | 0;
                    i = b[i + 4 >> 2] | 0;
                    if ((c | 0) == 0 & (i | 0) == 0) { break; }else { k = k + 1 | 0; }
                  }
                }

                if (!((l | 0) == 0 & (m | 0) == 0)) {
                  Kb(l, m, F);

                  if (mc(a, I, F) | 0) {
                    k = h;
                    b[k >> 2] = l;
                    b[k + 4 >> 2] = m;
                    k = w + (g << 3) | 0;
                    b[k >> 2] = l;
                    b[k + 4 >> 2] = m;
                    g = g + 1 | 0;
                  }
                }
              } } while (0);

              n = n + 1 | 0;
            } while (n >>> 0 < 7);

            p = p + 1 | 0;
            if ((p | 0) >= (q | 0)) { break; }else { o = o + 1 | 0; }
          }

          if ((q | 0) > 0) { Wc(x | 0, 0, q << 3 | 0) | 0; }
          b[D >> 2] = g;

          if ((g | 0) > 0) {
            l = f;
            m = u;
            n = A;
            o = t;
            p = s;
            q = w;
            f = r;
            u = e;
            t = y;
            s = x;
            r = l;
            e = m;
            A = z;
            z = n;
            y = o;
            x = p;
            w = v;
            v = q;
          } else { break b; }
        }

        Kc(y);
        Kc(z);
        Kc(I);
        I = -1;
        S = J;
        return I | 0;
      } else { e = l; } } while (0);

      Kc(I);
      Kc(f);
      Kc(e);
      I = 0;
      S = J;
      return I | 0;
    }

    function ia(a, c, d, f, g, h) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      f = f | 0;
      g = g | 0;
      h = h | 0;
      var i = 0,
          j = 0,
          k = 0,
          l = 0,
          m = 0,
          n = 0,
          o = 0,
          p = 0,
          q = 0,
          r = 0.0,
          s = 0,
          t = 0,
          u = 0,
          v = 0,
          w = 0,
          x = 0,
          y = 0,
          z = 0,
          A = 0,
          B = 0,
          C = 0,
          D = 0.0,
          E = 0.0;
      C = S;
      S = S + 48 | 0;
      y = C + 32 | 0;
      z = C + 16 | 0;
      A = C;
      i = b[a >> 2] | 0;

      if ((i | 0) <= 0) {
        B = 0;
        S = C;
        return B | 0;
      }

      t = a + 4 | 0;
      u = y + 8 | 0;
      v = z + 8 | 0;
      w = A + 8 | 0;
      x = ((c | 0) < 0) << 31 >> 31;
      s = 0;

      a: while (1) {
        j = b[t >> 2] | 0;
        q = j + (s << 4) | 0;
        b[y >> 2] = b[q >> 2];
        b[y + 4 >> 2] = b[q + 4 >> 2];
        b[y + 8 >> 2] = b[q + 8 >> 2];
        b[y + 12 >> 2] = b[q + 12 >> 2];

        if ((s | 0) == (i + -1 | 0)) {
          b[z >> 2] = b[j >> 2];
          b[z + 4 >> 2] = b[j + 4 >> 2];
          b[z + 8 >> 2] = b[j + 8 >> 2];
          b[z + 12 >> 2] = b[j + 12 >> 2];
        } else {
          q = j + (s + 1 << 4) | 0;
          b[z >> 2] = b[q >> 2];
          b[z + 4 >> 2] = b[q + 4 >> 2];
          b[z + 8 >> 2] = b[q + 8 >> 2];
          b[z + 12 >> 2] = b[q + 12 >> 2];
        }

        q = xa(y, z, d) | 0;

        b: do { if ((q | 0) > 0) {
          r = +(q | 0);
          p = 0;

          c: while (1) {
            E = +(q - p | 0);
            D = +(p | 0);
            e[A >> 3] = +e[y >> 3] * E / r + +e[z >> 3] * D / r;
            e[w >> 3] = +e[u >> 3] * E / r + +e[v >> 3] * D / r;
            n = Hb(A, d) | 0;
            o = G() | 0;
            j = Qc(n | 0, o | 0, c | 0, x | 0) | 0;
            G() | 0;
            i = h + (j << 3) | 0;
            k = i;
            l = b[k >> 2] | 0;
            k = b[k + 4 >> 2] | 0;

            d: do { if ((l | 0) == 0 & (k | 0) == 0) { B = 14; }else {
              m = 0;

              while (1) {
                if ((m | 0) > (c | 0)) {
                  i = 1;
                  break d;
                }

                if ((l | 0) == (n | 0) & (k | 0) == (o | 0)) {
                  i = 7;
                  break d;
                }

                j = (j + 1 | 0) % (c | 0) | 0;
                i = h + (j << 3) | 0;
                k = i;
                l = b[k >> 2] | 0;
                k = b[k + 4 >> 2] | 0;

                if ((l | 0) == 0 & (k | 0) == 0) {
                  B = 14;
                  break;
                } else { m = m + 1 | 0; }
              }
            } } while (0);

            if ((B | 0) == 14) {
              B = 0;
              if ((n | 0) == 0 & (o | 0) == 0) { i = 7; }else {
                b[i >> 2] = n;
                b[i + 4 >> 2] = o;
                i = b[f >> 2] | 0;
                m = g + (i << 3) | 0;
                b[m >> 2] = n;
                b[m + 4 >> 2] = o;
                b[f >> 2] = i + 1;
                i = 0;
              }
            }

            switch (i & 7) {
              case 7:
              case 0:
                break;

              default:
                break c;
            }

            p = p + 1 | 0;

            if ((q | 0) <= (p | 0)) {
              B = 8;
              break b;
            }
          }

          if (i | 0) {
            i = -1;
            B = 20;
            break a;
          }
        } else { B = 8; } } while (0);

        if ((B | 0) == 8) { B = 0; }
        s = s + 1 | 0;
        i = b[a >> 2] | 0;

        if ((s | 0) >= (i | 0)) {
          i = 0;
          B = 20;
          break;
        }
      }

      if ((B | 0) == 20) {
        S = C;
        return i | 0;
      }

      return 0;
    }

    function ja(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      var e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0,
          j = 0,
          k = 0;
      k = S;
      S = S + 176 | 0;
      j = k;

      if ((c | 0) < 1) {
        zc(d, 0, 0);
        S = k;
        return;
      }

      h = a;
      h = Rc(b[h >> 2] | 0, b[h + 4 >> 2] | 0, 52) | 0;
      G() | 0;
      zc(d, (c | 0) > 6 ? c : 6, h & 15);
      h = 0;

      do {
        e = a + (h << 3) | 0;
        Lb(b[e >> 2] | 0, b[e + 4 >> 2] | 0, j);
        e = b[j >> 2] | 0;

        if ((e | 0) > 0) {
          i = 0;

          do {
            g = j + 8 + (i << 4) | 0;
            i = i + 1 | 0;
            e = j + 8 + (((i | 0) % (e | 0) | 0) << 4) | 0;
            f = Ec(d, e, g) | 0;
            if (!f) { Dc(d, g, e) | 0; }else { Cc(d, f) | 0; }
            e = b[j >> 2] | 0;
          } while ((i | 0) < (e | 0));
        }

        h = h + 1 | 0;
      } while ((h | 0) != (c | 0));

      S = k;
      return;
    }

    function ka(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      var e = 0,
          f = 0,
          g = 0,
          h = 0;
      g = S;
      S = S + 32 | 0;
      e = g;
      f = g + 16 | 0;
      ja(a, c, f);
      b[d >> 2] = 0;
      b[d + 4 >> 2] = 0;
      b[d + 8 >> 2] = 0;
      a = Bc(f) | 0;

      if (!a) {
        $b(d) | 0;
        Ac(f);
        S = g;
        return;
      }

      do {
        c = Yb(d) | 0;

        do {
          Zb(c, a) | 0;
          h = a + 16 | 0;
          b[e >> 2] = b[h >> 2];
          b[e + 4 >> 2] = b[h + 4 >> 2];
          b[e + 8 >> 2] = b[h + 8 >> 2];
          b[e + 12 >> 2] = b[h + 12 >> 2];
          Cc(f, a) | 0;
          a = Fc(f, e) | 0;
        } while ((a | 0) != 0);

        a = Bc(f) | 0;
      } while ((a | 0) != 0);

      $b(d) | 0;
      Ac(f);
      S = g;
      return;
    }

    function la(a) {
      a = a | 0;
      return b[7728 + (a * 28 | 0) + 16 >> 2] | 0;
    }

    function ma(a) {
      a = a | 0;
      return (a | 0) == 4 | (a | 0) == 117 | 0;
    }

    function na(a) {
      a = a | 0;
      return b[11152 + ((b[a >> 2] | 0) * 216 | 0) + ((b[a + 4 >> 2] | 0) * 72 | 0) + ((b[a + 8 >> 2] | 0) * 24 | 0) + (b[a + 12 >> 2] << 3) >> 2] | 0;
    }

    function oa(a) {
      a = a | 0;
      return b[11152 + ((b[a >> 2] | 0) * 216 | 0) + ((b[a + 4 >> 2] | 0) * 72 | 0) + ((b[a + 8 >> 2] | 0) * 24 | 0) + (b[a + 12 >> 2] << 3) + 4 >> 2] | 0;
    }

    function pa(a, c) {
      a = a | 0;
      c = c | 0;

      if ((b[7728 + (a * 28 | 0) + 20 >> 2] | 0) == (c | 0)) {
        c = 1;
        return c | 0;
      }

      c = (b[7728 + (a * 28 | 0) + 24 >> 2] | 0) == (c | 0);
      return c | 0;
    }

    function qa(a, c) {
      a = a | 0;
      c = c | 0;
      return b[880 + (a * 28 | 0) + (c << 2) >> 2] | 0;
    }

    function ra(a, c) {
      a = a | 0;
      c = c | 0;

      if ((b[880 + (a * 28 | 0) >> 2] | 0) == (c | 0)) {
        c = 0;
        return c | 0;
      }

      if ((b[880 + (a * 28 | 0) + 4 >> 2] | 0) == (c | 0)) {
        c = 1;
        return c | 0;
      }

      if ((b[880 + (a * 28 | 0) + 8 >> 2] | 0) == (c | 0)) {
        c = 2;
        return c | 0;
      }

      if ((b[880 + (a * 28 | 0) + 12 >> 2] | 0) == (c | 0)) {
        c = 3;
        return c | 0;
      }

      if ((b[880 + (a * 28 | 0) + 16 >> 2] | 0) == (c | 0)) {
        c = 4;
        return c | 0;
      }

      if ((b[880 + (a * 28 | 0) + 20 >> 2] | 0) == (c | 0)) {
        c = 5;
        return c | 0;
      } else { return ((b[880 + (a * 28 | 0) + 24 >> 2] | 0) == (c | 0) ? 6 : 7) | 0; }

      return 0;
    }

    function sa() {
      return 122;
    }

    function ta(a) {
      a = a | 0;
      var c = 0,
          d = 0,
          e = 0;
      c = 0;

      do {
        Sc(c | 0, 0, 45) | 0;
        e = G() | 0 | 134225919;
        d = a + (c << 3) | 0;
        b[d >> 2] = -1;
        b[d + 4 >> 2] = e;
        c = c + 1 | 0;
      } while ((c | 0) != 122);

      return;
    }

    function ua(a) {
      a = a | 0;
      return +e[a + 16 >> 3] < +e[a + 24 >> 3] | 0;
    }

    function va(a, b) {
      a = a | 0;
      b = b | 0;
      var c = 0.0,
          d = 0.0,
          f = 0.0;
      c = +e[b >> 3];

      if (!(c >= +e[a + 8 >> 3])) {
        b = 0;
        return b | 0;
      }

      if (!(c <= +e[a >> 3])) {
        b = 0;
        return b | 0;
      }

      d = +e[a + 16 >> 3];
      c = +e[a + 24 >> 3];
      f = +e[b + 8 >> 3];
      b = f >= c;
      a = f <= d & 1;

      if (d < c) {
        if (b) { a = 1; }
      } else if (!b) { a = 0; }

      b = (a | 0) != 0;
      return b | 0;
    }

    function wa(a, c) {
      a = a | 0;
      c = c | 0;
      var d = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0,
          j = 0,
          k = 0.0,
          l = 0.0;
      i = S;
      S = S + 288 | 0;
      d = i + 264 | 0;
      f = i + 96 | 0;
      g = i;
      h = g;
      j = h + 96 | 0;

      do {
        b[h >> 2] = 0;
        h = h + 4 | 0;
      } while ((h | 0) < (j | 0));

      Pb(c, g);
      h = g;
      j = b[h >> 2] | 0;
      h = b[h + 4 >> 2] | 0;
      Kb(j, h, d);
      Lb(j, h, f);
      k = +hb(d, f + 8 | 0);
      e[d >> 3] = +e[a >> 3];
      h = d + 8 | 0;
      e[h >> 3] = +e[a + 16 >> 3];
      e[f >> 3] = +e[a + 8 >> 3];
      j = f + 8 | 0;
      e[j >> 3] = +e[a + 24 >> 3];
      l = +hb(d, f);
      j = ~~+A(+(l * l / +Tc(+ +q(+((+e[h >> 3] - +e[j >> 3]) / (+e[d >> 3] - +e[f >> 3]))), 3.0) / (k * (k * 2.59807621135) * .8)));
      S = i;
      return ((j | 0) == 0 ? 1 : j) | 0;
    }

    function xa(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      var e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0,
          j = 0,
          k = 0.0;
      i = S;
      S = S + 288 | 0;
      e = i + 264 | 0;
      f = i + 96 | 0;
      g = i;
      h = g;
      j = h + 96 | 0;

      do {
        b[h >> 2] = 0;
        h = h + 4 | 0;
      } while ((h | 0) < (j | 0));

      Pb(d, g);
      j = g;
      h = b[j >> 2] | 0;
      j = b[j + 4 >> 2] | 0;
      Kb(h, j, e);
      Lb(h, j, f);
      k = +hb(e, f + 8 | 0);
      j = ~~+A(+(+hb(a, c) / (k * 2.0)));
      S = i;
      return ((j | 0) == 0 ? 1 : j) | 0;
    }

    function ya(a, c, d, e) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      b[a >> 2] = c;
      b[a + 4 >> 2] = d;
      b[a + 8 >> 2] = e;
      return;
    }

    function za(a, c) {
      a = a | 0;
      c = c | 0;
      var d = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0.0,
          j = 0.0,
          k = 0.0,
          l = 0.0,
          m = 0,
          n = 0,
          o = 0.0;
      n = c + 8 | 0;
      b[n >> 2] = 0;
      k = +e[a >> 3];
      i = +q(+k);
      l = +e[a + 8 >> 3];
      j = +q(+l) / .8660254037844386;
      i = i + j * .5;
      d = ~~i;
      a = ~~j;
      i = i - +(d | 0);
      j = j - +(a | 0);

      do { if (i < .5) {
        if (i < .3333333333333333) {
          b[c >> 2] = d;

          if (j < (i + 1.0) * .5) {
            b[c + 4 >> 2] = a;
            break;
          } else {
            a = a + 1 | 0;
            b[c + 4 >> 2] = a;
            break;
          }
        } else {
          o = 1.0 - i;
          a = (!(j < o) & 1) + a | 0;
          b[c + 4 >> 2] = a;

          if (o <= j & j < i * 2.0) {
            d = d + 1 | 0;
            b[c >> 2] = d;
            break;
          } else {
            b[c >> 2] = d;
            break;
          }
        }
      } else {
        if (!(i < .6666666666666666)) {
          d = d + 1 | 0;
          b[c >> 2] = d;

          if (j < i * .5) {
            b[c + 4 >> 2] = a;
            break;
          } else {
            a = a + 1 | 0;
            b[c + 4 >> 2] = a;
            break;
          }
        }

        if (j < 1.0 - i) {
          b[c + 4 >> 2] = a;

          if (i * 2.0 + -1.0 < j) {
            b[c >> 2] = d;
            break;
          }
        } else {
          a = a + 1 | 0;
          b[c + 4 >> 2] = a;
        }

        d = d + 1 | 0;
        b[c >> 2] = d;
      } } while (0);

      do { if (k < 0.0) { if (!(a & 1)) {
        m = (a | 0) / 2 | 0;
        m = Nc(d | 0, ((d | 0) < 0) << 31 >> 31 | 0, m | 0, ((m | 0) < 0) << 31 >> 31 | 0) | 0;
        d = ~~(+(d | 0) - (+(m >>> 0) + 4294967296.0 * +(G() | 0)) * 2.0);
        b[c >> 2] = d;
        break;
      } else {
        m = (a + 1 | 0) / 2 | 0;
        m = Nc(d | 0, ((d | 0) < 0) << 31 >> 31 | 0, m | 0, ((m | 0) < 0) << 31 >> 31 | 0) | 0;
        d = ~~(+(d | 0) - ((+(m >>> 0) + 4294967296.0 * +(G() | 0)) * 2.0 + 1.0));
        b[c >> 2] = d;
        break;
      } } } while (0);

      m = c + 4 | 0;

      if (l < 0.0) {
        d = d - ((a << 1 | 1 | 0) / 2 | 0) | 0;
        b[c >> 2] = d;
        a = 0 - a | 0;
        b[m >> 2] = a;
      }

      f = a - d | 0;

      if ((d | 0) < 0) {
        g = 0 - d | 0;
        b[m >> 2] = f;
        b[n >> 2] = g;
        b[c >> 2] = 0;
        a = f;
        d = 0;
      } else { g = 0; }

      if ((a | 0) < 0) {
        d = d - a | 0;
        b[c >> 2] = d;
        g = g - a | 0;
        b[n >> 2] = g;
        b[m >> 2] = 0;
        a = 0;
      }

      h = d - g | 0;
      f = a - g | 0;

      if ((g | 0) < 0) {
        b[c >> 2] = h;
        b[m >> 2] = f;
        b[n >> 2] = 0;
        a = f;
        d = h;
        g = 0;
      }

      f = (a | 0) < (d | 0) ? a : d;
      f = (g | 0) < (f | 0) ? g : f;
      if ((f | 0) <= 0) { return; }
      b[c >> 2] = d - f;
      b[m >> 2] = a - f;
      b[n >> 2] = g - f;
      return;
    }

    function Aa(a) {
      a = a | 0;
      var c = 0,
          d = 0,
          e = 0,
          f = 0,
          g = 0,
          h = 0;
      c = b[a >> 2] | 0;
      h = a + 4 | 0;
      d = b[h >> 2] | 0;

      if ((c | 0) < 0) {
        d = d - c | 0;
        b[h >> 2] = d;
        g = a + 8 | 0;
        b[g >> 2] = (b[g >> 2] | 0) - c;
        b[a >> 2] = 0;
        c = 0;
      }

      if ((d | 0) < 0) {
        c = c - d | 0;
        b[a >> 2] = c;
        g = a + 8 | 0;
        f = (b[g >> 2] | 0) - d | 0;
        b[g >> 2] = f;
        b[h >> 2] = 0;
        d = 0;
      } else {
        f = a + 8 | 0;
        g = f;
        f = b[f >> 2] | 0;
      }

      if ((f | 0) < 0) {
        c = c - f | 0;
        b[a >> 2] = c;
        d = d - f | 0;
        b[h >> 2] = d;
        b[g >> 2] = 0;
        f = 0;
      }

      e = (d | 0) < (c | 0) ? d : c;
      e = (f | 0) < (e | 0) ? f : e;
      if ((e | 0) <= 0) { return; }
      b[a >> 2] = c - e;
      b[h >> 2] = d - e;
      b[g >> 2] = f - e;
      return;
    }

    function Ba(a, c) {
      a = a | 0;
      c = c | 0;
      var d = 0.0,
          f = 0;
      f = b[a + 8 >> 2] | 0;
      d = +((b[a + 4 >> 2] | 0) - f | 0);
      e[c >> 3] = +((b[a >> 2] | 0) - f | 0) - d * .5;
      e[c + 8 >> 3] = d * .8660254037844386;
      return;
    }

    function Ca(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      b[d >> 2] = (b[c >> 2] | 0) + (b[a >> 2] | 0);
      b[d + 4 >> 2] = (b[c + 4 >> 2] | 0) + (b[a + 4 >> 2] | 0);
      b[d + 8 >> 2] = (b[c + 8 >> 2] | 0) + (b[a + 8 >> 2] | 0);
      return;
    }

    function Da(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      b[d >> 2] = (b[a >> 2] | 0) - (b[c >> 2] | 0);
      b[d + 4 >> 2] = (b[a + 4 >> 2] | 0) - (b[c + 4 >> 2] | 0);
      b[d + 8 >> 2] = (b[a + 8 >> 2] | 0) - (b[c + 8 >> 2] | 0);
      return;
    }

    function Ea(a, c) {
      a = a | 0;
      c = c | 0;
      var d = 0,
          e = 0;
      d = B(b[a >> 2] | 0, c) | 0;
      b[a >> 2] = d;
      d = a + 4 | 0;
      e = B(b[d >> 2] | 0, c) | 0;
      b[d >> 2] = e;
      a = a + 8 | 0;
      c = B(b[a >> 2] | 0, c) | 0;
      b[a >> 2] = c;
      return;
    }

    function Fa(a) {
      a = a | 0;
      var c = 0,
          d = 0,
          e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0;
      h = b[a >> 2] | 0;
      i = (h | 0) < 0;
      e = (b[a + 4 >> 2] | 0) - (i ? h : 0) | 0;
      g = (e | 0) < 0;
      f = (g ? 0 - e | 0 : 0) + ((b[a + 8 >> 2] | 0) - (i ? h : 0)) | 0;
      d = (f | 0) < 0;
      a = d ? 0 : f;
      c = (g ? 0 : e) - (d ? f : 0) | 0;
      f = (i ? 0 : h) - (g ? e : 0) - (d ? f : 0) | 0;
      d = (c | 0) < (f | 0) ? c : f;
      d = (a | 0) < (d | 0) ? a : d;
      e = (d | 0) > 0;
      a = a - (e ? d : 0) | 0;
      c = c - (e ? d : 0) | 0;

      a: do { switch (f - (e ? d : 0) | 0) {
        case 0:
          switch (c | 0) {
            case 0:
              {
                i = (a | 0) == 0 ? 0 : (a | 0) == 1 ? 1 : 7;
                return i | 0;
              }

            case 1:
              {
                i = (a | 0) == 0 ? 2 : (a | 0) == 1 ? 3 : 7;
                return i | 0;
              }

            default:
              break a;
          }

        case 1:
          switch (c | 0) {
            case 0:
              {
                i = (a | 0) == 0 ? 4 : (a | 0) == 1 ? 5 : 7;
                return i | 0;
              }

            case 1:
              {
                if (!a) { a = 6; }else { break a; }
                return a | 0;
              }

            default:
              break a;
          }

        default:

      } } while (0);

      i = 7;
      return i | 0;
    }

    function Ga(a) {
      a = a | 0;
      var c = 0,
          d = 0,
          e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0;
      h = a + 8 | 0;
      d = b[h >> 2] | 0;
      c = (b[a >> 2] | 0) - d | 0;
      i = a + 4 | 0;
      d = (b[i >> 2] | 0) - d | 0;
      e = Ic(+((c * 3 | 0) - d | 0) / 7.0) | 0;
      b[a >> 2] = e;
      c = Ic(+((d << 1) + c | 0) / 7.0) | 0;
      b[i >> 2] = c;
      b[h >> 2] = 0;
      d = c - e | 0;

      if ((e | 0) < 0) {
        g = 0 - e | 0;
        b[i >> 2] = d;
        b[h >> 2] = g;
        b[a >> 2] = 0;
        c = d;
        e = 0;
        d = g;
      } else { d = 0; }

      if ((c | 0) < 0) {
        e = e - c | 0;
        b[a >> 2] = e;
        d = d - c | 0;
        b[h >> 2] = d;
        b[i >> 2] = 0;
        c = 0;
      }

      g = e - d | 0;
      f = c - d | 0;

      if ((d | 0) < 0) {
        b[a >> 2] = g;
        b[i >> 2] = f;
        b[h >> 2] = 0;
        c = f;
        f = g;
        d = 0;
      } else { f = e; }

      e = (c | 0) < (f | 0) ? c : f;
      e = (d | 0) < (e | 0) ? d : e;
      if ((e | 0) <= 0) { return; }
      b[a >> 2] = f - e;
      b[i >> 2] = c - e;
      b[h >> 2] = d - e;
      return;
    }

    function Ha(a) {
      a = a | 0;
      var c = 0,
          d = 0,
          e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0;
      h = a + 8 | 0;
      d = b[h >> 2] | 0;
      c = (b[a >> 2] | 0) - d | 0;
      i = a + 4 | 0;
      d = (b[i >> 2] | 0) - d | 0;
      e = Ic(+((c << 1) + d | 0) / 7.0) | 0;
      b[a >> 2] = e;
      c = Ic(+((d * 3 | 0) - c | 0) / 7.0) | 0;
      b[i >> 2] = c;
      b[h >> 2] = 0;
      d = c - e | 0;

      if ((e | 0) < 0) {
        g = 0 - e | 0;
        b[i >> 2] = d;
        b[h >> 2] = g;
        b[a >> 2] = 0;
        c = d;
        e = 0;
        d = g;
      } else { d = 0; }

      if ((c | 0) < 0) {
        e = e - c | 0;
        b[a >> 2] = e;
        d = d - c | 0;
        b[h >> 2] = d;
        b[i >> 2] = 0;
        c = 0;
      }

      g = e - d | 0;
      f = c - d | 0;

      if ((d | 0) < 0) {
        b[a >> 2] = g;
        b[i >> 2] = f;
        b[h >> 2] = 0;
        c = f;
        f = g;
        d = 0;
      } else { f = e; }

      e = (c | 0) < (f | 0) ? c : f;
      e = (d | 0) < (e | 0) ? d : e;
      if ((e | 0) <= 0) { return; }
      b[a >> 2] = f - e;
      b[i >> 2] = c - e;
      b[h >> 2] = d - e;
      return;
    }

    function Ia(a) {
      a = a | 0;
      var c = 0,
          d = 0,
          e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0;
      c = b[a >> 2] | 0;
      h = a + 4 | 0;
      d = b[h >> 2] | 0;
      i = a + 8 | 0;
      e = b[i >> 2] | 0;
      f = d + (c * 3 | 0) | 0;
      b[a >> 2] = f;
      d = e + (d * 3 | 0) | 0;
      b[h >> 2] = d;
      c = (e * 3 | 0) + c | 0;
      b[i >> 2] = c;
      e = d - f | 0;

      if ((f | 0) < 0) {
        c = c - f | 0;
        b[h >> 2] = e;
        b[i >> 2] = c;
        b[a >> 2] = 0;
        d = e;
        e = 0;
      } else { e = f; }

      if ((d | 0) < 0) {
        e = e - d | 0;
        b[a >> 2] = e;
        c = c - d | 0;
        b[i >> 2] = c;
        b[h >> 2] = 0;
        d = 0;
      }

      g = e - c | 0;
      f = d - c | 0;

      if ((c | 0) < 0) {
        b[a >> 2] = g;
        b[h >> 2] = f;
        b[i >> 2] = 0;
        e = g;
        c = 0;
      } else { f = d; }

      d = (f | 0) < (e | 0) ? f : e;
      d = (c | 0) < (d | 0) ? c : d;
      if ((d | 0) <= 0) { return; }
      b[a >> 2] = e - d;
      b[h >> 2] = f - d;
      b[i >> 2] = c - d;
      return;
    }

    function Ja(a) {
      a = a | 0;
      var c = 0,
          d = 0,
          e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0;
      f = b[a >> 2] | 0;
      h = a + 4 | 0;
      c = b[h >> 2] | 0;
      i = a + 8 | 0;
      d = b[i >> 2] | 0;
      e = (c * 3 | 0) + f | 0;
      f = d + (f * 3 | 0) | 0;
      b[a >> 2] = f;
      b[h >> 2] = e;
      c = (d * 3 | 0) + c | 0;
      b[i >> 2] = c;
      d = e - f | 0;

      if ((f | 0) < 0) {
        c = c - f | 0;
        b[h >> 2] = d;
        b[i >> 2] = c;
        b[a >> 2] = 0;
        f = 0;
      } else { d = e; }

      if ((d | 0) < 0) {
        f = f - d | 0;
        b[a >> 2] = f;
        c = c - d | 0;
        b[i >> 2] = c;
        b[h >> 2] = 0;
        d = 0;
      }

      g = f - c | 0;
      e = d - c | 0;

      if ((c | 0) < 0) {
        b[a >> 2] = g;
        b[h >> 2] = e;
        b[i >> 2] = 0;
        f = g;
        c = 0;
      } else { e = d; }

      d = (e | 0) < (f | 0) ? e : f;
      d = (c | 0) < (d | 0) ? c : d;
      if ((d | 0) <= 0) { return; }
      b[a >> 2] = f - d;
      b[h >> 2] = e - d;
      b[i >> 2] = c - d;
      return;
    }

    function Ka(a, c) {
      a = a | 0;
      c = c | 0;
      var d = 0,
          e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0;
      if ((c + -1 | 0) >>> 0 >= 6) { return; }
      f = (b[15472 + (c * 12 | 0) >> 2] | 0) + (b[a >> 2] | 0) | 0;
      b[a >> 2] = f;
      i = a + 4 | 0;
      e = (b[15472 + (c * 12 | 0) + 4 >> 2] | 0) + (b[i >> 2] | 0) | 0;
      b[i >> 2] = e;
      h = a + 8 | 0;
      c = (b[15472 + (c * 12 | 0) + 8 >> 2] | 0) + (b[h >> 2] | 0) | 0;
      b[h >> 2] = c;
      d = e - f | 0;

      if ((f | 0) < 0) {
        c = c - f | 0;
        b[i >> 2] = d;
        b[h >> 2] = c;
        b[a >> 2] = 0;
        e = 0;
      } else {
        d = e;
        e = f;
      }

      if ((d | 0) < 0) {
        e = e - d | 0;
        b[a >> 2] = e;
        c = c - d | 0;
        b[h >> 2] = c;
        b[i >> 2] = 0;
        d = 0;
      }

      g = e - c | 0;
      f = d - c | 0;

      if ((c | 0) < 0) {
        b[a >> 2] = g;
        b[i >> 2] = f;
        b[h >> 2] = 0;
        e = g;
        c = 0;
      } else { f = d; }

      d = (f | 0) < (e | 0) ? f : e;
      d = (c | 0) < (d | 0) ? c : d;
      if ((d | 0) <= 0) { return; }
      b[a >> 2] = e - d;
      b[i >> 2] = f - d;
      b[h >> 2] = c - d;
      return;
    }

    function La(a) {
      a = a | 0;
      var c = 0,
          d = 0,
          e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0;
      f = b[a >> 2] | 0;
      h = a + 4 | 0;
      c = b[h >> 2] | 0;
      i = a + 8 | 0;
      d = b[i >> 2] | 0;
      e = c + f | 0;
      f = d + f | 0;
      b[a >> 2] = f;
      b[h >> 2] = e;
      c = d + c | 0;
      b[i >> 2] = c;
      d = e - f | 0;

      if ((f | 0) < 0) {
        c = c - f | 0;
        b[h >> 2] = d;
        b[i >> 2] = c;
        b[a >> 2] = 0;
        e = 0;
      } else {
        d = e;
        e = f;
      }

      if ((d | 0) < 0) {
        e = e - d | 0;
        b[a >> 2] = e;
        c = c - d | 0;
        b[i >> 2] = c;
        b[h >> 2] = 0;
        d = 0;
      }

      g = e - c | 0;
      f = d - c | 0;

      if ((c | 0) < 0) {
        b[a >> 2] = g;
        b[h >> 2] = f;
        b[i >> 2] = 0;
        e = g;
        c = 0;
      } else { f = d; }

      d = (f | 0) < (e | 0) ? f : e;
      d = (c | 0) < (d | 0) ? c : d;
      if ((d | 0) <= 0) { return; }
      b[a >> 2] = e - d;
      b[h >> 2] = f - d;
      b[i >> 2] = c - d;
      return;
    }

    function Ma(a) {
      a = a | 0;
      var c = 0,
          d = 0,
          e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0;
      c = b[a >> 2] | 0;
      h = a + 4 | 0;
      e = b[h >> 2] | 0;
      i = a + 8 | 0;
      d = b[i >> 2] | 0;
      f = e + c | 0;
      b[a >> 2] = f;
      e = d + e | 0;
      b[h >> 2] = e;
      c = d + c | 0;
      b[i >> 2] = c;
      d = e - f | 0;

      if ((f | 0) < 0) {
        c = c - f | 0;
        b[h >> 2] = d;
        b[i >> 2] = c;
        b[a >> 2] = 0;
        e = 0;
      } else {
        d = e;
        e = f;
      }

      if ((d | 0) < 0) {
        e = e - d | 0;
        b[a >> 2] = e;
        c = c - d | 0;
        b[i >> 2] = c;
        b[h >> 2] = 0;
        d = 0;
      }

      g = e - c | 0;
      f = d - c | 0;

      if ((c | 0) < 0) {
        b[a >> 2] = g;
        b[h >> 2] = f;
        b[i >> 2] = 0;
        e = g;
        c = 0;
      } else { f = d; }

      d = (f | 0) < (e | 0) ? f : e;
      d = (c | 0) < (d | 0) ? c : d;
      if ((d | 0) <= 0) { return; }
      b[a >> 2] = e - d;
      b[h >> 2] = f - d;
      b[i >> 2] = c - d;
      return;
    }

    function Na(a) {
      a = a | 0;

      switch (a | 0) {
        case 1:
          {
            a = 5;
            break;
          }

        case 5:
          {
            a = 4;
            break;
          }

        case 4:
          {
            a = 6;
            break;
          }

        case 6:
          {
            a = 2;
            break;
          }

        case 2:
          {
            a = 3;
            break;
          }

        case 3:
          {
            a = 1;
            break;
          }

        default:

      }

      return a | 0;
    }

    function Oa(a) {
      a = a | 0;

      switch (a | 0) {
        case 1:
          {
            a = 3;
            break;
          }

        case 3:
          {
            a = 2;
            break;
          }

        case 2:
          {
            a = 6;
            break;
          }

        case 6:
          {
            a = 4;
            break;
          }

        case 4:
          {
            a = 5;
            break;
          }

        case 5:
          {
            a = 1;
            break;
          }

        default:

      }

      return a | 0;
    }

    function Pa(a) {
      a = a | 0;
      var c = 0,
          d = 0,
          e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0;
      c = b[a >> 2] | 0;
      h = a + 4 | 0;
      d = b[h >> 2] | 0;
      i = a + 8 | 0;
      e = b[i >> 2] | 0;
      f = d + (c << 1) | 0;
      b[a >> 2] = f;
      d = e + (d << 1) | 0;
      b[h >> 2] = d;
      c = (e << 1) + c | 0;
      b[i >> 2] = c;
      e = d - f | 0;

      if ((f | 0) < 0) {
        c = c - f | 0;
        b[h >> 2] = e;
        b[i >> 2] = c;
        b[a >> 2] = 0;
        d = e;
        e = 0;
      } else { e = f; }

      if ((d | 0) < 0) {
        e = e - d | 0;
        b[a >> 2] = e;
        c = c - d | 0;
        b[i >> 2] = c;
        b[h >> 2] = 0;
        d = 0;
      }

      g = e - c | 0;
      f = d - c | 0;

      if ((c | 0) < 0) {
        b[a >> 2] = g;
        b[h >> 2] = f;
        b[i >> 2] = 0;
        e = g;
        c = 0;
      } else { f = d; }

      d = (f | 0) < (e | 0) ? f : e;
      d = (c | 0) < (d | 0) ? c : d;
      if ((d | 0) <= 0) { return; }
      b[a >> 2] = e - d;
      b[h >> 2] = f - d;
      b[i >> 2] = c - d;
      return;
    }

    function Qa(a) {
      a = a | 0;
      var c = 0,
          d = 0,
          e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0;
      f = b[a >> 2] | 0;
      h = a + 4 | 0;
      c = b[h >> 2] | 0;
      i = a + 8 | 0;
      d = b[i >> 2] | 0;
      e = (c << 1) + f | 0;
      f = d + (f << 1) | 0;
      b[a >> 2] = f;
      b[h >> 2] = e;
      c = (d << 1) + c | 0;
      b[i >> 2] = c;
      d = e - f | 0;

      if ((f | 0) < 0) {
        c = c - f | 0;
        b[h >> 2] = d;
        b[i >> 2] = c;
        b[a >> 2] = 0;
        f = 0;
      } else { d = e; }

      if ((d | 0) < 0) {
        f = f - d | 0;
        b[a >> 2] = f;
        c = c - d | 0;
        b[i >> 2] = c;
        b[h >> 2] = 0;
        d = 0;
      }

      g = f - c | 0;
      e = d - c | 0;

      if ((c | 0) < 0) {
        b[a >> 2] = g;
        b[h >> 2] = e;
        b[i >> 2] = 0;
        f = g;
        c = 0;
      } else { e = d; }

      d = (e | 0) < (f | 0) ? e : f;
      d = (c | 0) < (d | 0) ? c : d;
      if ((d | 0) <= 0) { return; }
      b[a >> 2] = f - d;
      b[h >> 2] = e - d;
      b[i >> 2] = c - d;
      return;
    }

    function Ra(a, c) {
      a = a | 0;
      c = c | 0;
      var d = 0,
          e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0;
      h = (b[a >> 2] | 0) - (b[c >> 2] | 0) | 0;
      i = (h | 0) < 0;
      e = (b[a + 4 >> 2] | 0) - (b[c + 4 >> 2] | 0) - (i ? h : 0) | 0;
      g = (e | 0) < 0;
      f = (i ? 0 - h | 0 : 0) + (b[a + 8 >> 2] | 0) - (b[c + 8 >> 2] | 0) + (g ? 0 - e | 0 : 0) | 0;
      a = (f | 0) < 0;
      c = a ? 0 : f;
      d = (g ? 0 : e) - (a ? f : 0) | 0;
      f = (i ? 0 : h) - (g ? e : 0) - (a ? f : 0) | 0;
      a = (d | 0) < (f | 0) ? d : f;
      a = (c | 0) < (a | 0) ? c : a;
      e = (a | 0) > 0;
      c = c - (e ? a : 0) | 0;
      d = d - (e ? a : 0) | 0;
      a = f - (e ? a : 0) | 0;
      a = (a | 0) > -1 ? a : 0 - a | 0;
      d = (d | 0) > -1 ? d : 0 - d | 0;
      c = (c | 0) > -1 ? c : 0 - c | 0;
      c = (d | 0) > (c | 0) ? d : c;
      return ((a | 0) > (c | 0) ? a : c) | 0;
    }

    function Sa(a, c) {
      a = a | 0;
      c = c | 0;
      var d = 0;
      d = b[a + 8 >> 2] | 0;
      b[c >> 2] = (b[a >> 2] | 0) - d;
      b[c + 4 >> 2] = (b[a + 4 >> 2] | 0) - d;
      return;
    }

    function Ta(a, c) {
      a = a | 0;
      c = c | 0;
      var d = 0,
          e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0;
      e = b[a >> 2] | 0;
      b[c >> 2] = e;
      a = b[a + 4 >> 2] | 0;
      h = c + 4 | 0;
      b[h >> 2] = a;
      i = c + 8 | 0;
      b[i >> 2] = 0;
      d = a - e | 0;

      if ((e | 0) < 0) {
        a = 0 - e | 0;
        b[h >> 2] = d;
        b[i >> 2] = a;
        b[c >> 2] = 0;
        e = 0;
      } else {
        d = a;
        a = 0;
      }

      if ((d | 0) < 0) {
        e = e - d | 0;
        b[c >> 2] = e;
        a = a - d | 0;
        b[i >> 2] = a;
        b[h >> 2] = 0;
        d = 0;
      }

      g = e - a | 0;
      f = d - a | 0;

      if ((a | 0) < 0) {
        b[c >> 2] = g;
        b[h >> 2] = f;
        b[i >> 2] = 0;
        d = f;
        f = g;
        a = 0;
      } else { f = e; }

      e = (d | 0) < (f | 0) ? d : f;
      e = (a | 0) < (e | 0) ? a : e;
      if ((e | 0) <= 0) { return; }
      b[c >> 2] = f - e;
      b[h >> 2] = d - e;
      b[i >> 2] = a - e;
      return;
    }

    function Ua(a) {
      a = a | 0;
      var c = 0,
          d = 0,
          e = 0,
          f = 0;
      c = a + 8 | 0;
      f = b[c >> 2] | 0;
      d = f - (b[a >> 2] | 0) | 0;
      b[a >> 2] = d;
      e = a + 4 | 0;
      a = (b[e >> 2] | 0) - f | 0;
      b[e >> 2] = a;
      b[c >> 2] = 0 - (a + d);
      return;
    }

    function Va(a) {
      a = a | 0;
      var c = 0,
          d = 0,
          e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0;
      d = b[a >> 2] | 0;
      c = 0 - d | 0;
      b[a >> 2] = c;
      h = a + 8 | 0;
      b[h >> 2] = 0;
      i = a + 4 | 0;
      e = b[i >> 2] | 0;
      f = e + d | 0;

      if ((d | 0) > 0) {
        b[i >> 2] = f;
        b[h >> 2] = d;
        b[a >> 2] = 0;
        c = 0;
        e = f;
      } else { d = 0; }

      if ((e | 0) < 0) {
        g = c - e | 0;
        b[a >> 2] = g;
        d = d - e | 0;
        b[h >> 2] = d;
        b[i >> 2] = 0;
        f = g - d | 0;
        c = 0 - d | 0;

        if ((d | 0) < 0) {
          b[a >> 2] = f;
          b[i >> 2] = c;
          b[h >> 2] = 0;
          e = c;
          d = 0;
        } else {
          e = 0;
          f = g;
        }
      } else { f = c; }

      c = (e | 0) < (f | 0) ? e : f;
      c = (d | 0) < (c | 0) ? d : c;
      if ((c | 0) <= 0) { return; }
      b[a >> 2] = f - c;
      b[i >> 2] = e - c;
      b[h >> 2] = d - c;
      return;
    }

    function Wa(a, b, c) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      var d = 0,
          e = 0;
      d = S;
      S = S + 16 | 0;
      e = d;
      Xa(a, b, c, e);
      za(e, c + 4 | 0);
      S = d;
      return;
    }

    function Xa(a, c, d, f) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      f = f | 0;
      var g = 0.0,
          h = 0,
          i = 0.0,
          j = 0.0,
          k = 0;
      k = S;
      S = S + 32 | 0;
      h = k;
      yc(a, h);
      b[d >> 2] = 0;
      g = +xc(15888, h);
      i = +xc(15912, h);

      if (i < g) {
        b[d >> 2] = 1;
        g = i;
      }

      i = +xc(15936, h);

      if (i < g) {
        b[d >> 2] = 2;
        g = i;
      }

      i = +xc(15960, h);

      if (i < g) {
        b[d >> 2] = 3;
        g = i;
      }

      i = +xc(15984, h);

      if (i < g) {
        b[d >> 2] = 4;
        g = i;
      }

      i = +xc(16008, h);

      if (i < g) {
        b[d >> 2] = 5;
        g = i;
      }

      i = +xc(16032, h);

      if (i < g) {
        b[d >> 2] = 6;
        g = i;
      }

      i = +xc(16056, h);

      if (i < g) {
        b[d >> 2] = 7;
        g = i;
      }

      i = +xc(16080, h);

      if (i < g) {
        b[d >> 2] = 8;
        g = i;
      }

      i = +xc(16104, h);

      if (i < g) {
        b[d >> 2] = 9;
        g = i;
      }

      i = +xc(16128, h);

      if (i < g) {
        b[d >> 2] = 10;
        g = i;
      }

      i = +xc(16152, h);

      if (i < g) {
        b[d >> 2] = 11;
        g = i;
      }

      i = +xc(16176, h);

      if (i < g) {
        b[d >> 2] = 12;
        g = i;
      }

      i = +xc(16200, h);

      if (i < g) {
        b[d >> 2] = 13;
        g = i;
      }

      i = +xc(16224, h);

      if (i < g) {
        b[d >> 2] = 14;
        g = i;
      }

      i = +xc(16248, h);

      if (i < g) {
        b[d >> 2] = 15;
        g = i;
      }

      i = +xc(16272, h);

      if (i < g) {
        b[d >> 2] = 16;
        g = i;
      }

      i = +xc(16296, h);

      if (i < g) {
        b[d >> 2] = 17;
        g = i;
      }

      i = +xc(16320, h);

      if (i < g) {
        b[d >> 2] = 18;
        g = i;
      }

      i = +xc(16344, h);

      if (i < g) {
        b[d >> 2] = 19;
        g = i;
      }

      i = +w(+(1.0 - g * .5));

      if (i < 1.0e-16) {
        b[f >> 2] = 0;
        b[f + 4 >> 2] = 0;
        b[f + 8 >> 2] = 0;
        b[f + 12 >> 2] = 0;
        S = k;
        return;
      }

      d = b[d >> 2] | 0;
      g = +e[16368 + (d * 24 | 0) >> 3];
      g = +eb(g - +eb(+ib(15568 + (d << 4) | 0, a)));
      if (!(Gb(c) | 0)) { j = g; }else { j = +eb(g + -.3334731722518321); }
      g = +v(+i) / .381966011250105;

      if ((c | 0) > 0) {
        h = 0;

        do {
          g = g * 2.6457513110645907;
          h = h + 1 | 0;
        } while ((h | 0) != (c | 0));
      }

      i = +t(+j) * g;
      e[f >> 3] = i;
      j = +u(+j) * g;
      e[f + 8 >> 3] = j;
      S = k;
      return;
    }

    function Ya(a, c, d, f, g) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      f = f | 0;
      g = g | 0;
      var h = 0.0,
          i = 0.0;
      h = +uc(a);

      if (h < 1.0e-16) {
        c = 15568 + (c << 4) | 0;
        b[g >> 2] = b[c >> 2];
        b[g + 4 >> 2] = b[c + 4 >> 2];
        b[g + 8 >> 2] = b[c + 8 >> 2];
        b[g + 12 >> 2] = b[c + 12 >> 2];
        return;
      }

      i = +z(+ +e[a + 8 >> 3], + +e[a >> 3]);

      if ((d | 0) > 0) {
        a = 0;

        do {
          h = h / 2.6457513110645907;
          a = a + 1 | 0;
        } while ((a | 0) != (d | 0));
      }

      if (!f) {
        h = +y(+(h * .381966011250105));
        if (Gb(d) | 0) { i = +eb(i + .3334731722518321); }
      } else {
        h = h / 3.0;
        d = (Gb(d) | 0) == 0;
        h = +y(+((d ? h : h / 2.6457513110645907) * .381966011250105));
      }

      jb(15568 + (c << 4) | 0, +eb(+e[16368 + (c * 24 | 0) >> 3] - i), h, g);
      return;
    }

    function Za(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      var e = 0,
          f = 0;
      e = S;
      S = S + 16 | 0;
      f = e;
      Ba(a + 4 | 0, f);
      Ya(f, b[a >> 2] | 0, c, 0, d);
      S = e;
      return;
    }

    function _a(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      var f = 0,
          g = 0,
          h = 0,
          i = 0,
          j = 0,
          k = 0,
          l = 0,
          m = 0,
          n = 0,
          o = 0,
          p = 0,
          q = 0,
          r = 0,
          s = 0,
          t = 0,
          u = 0,
          v = 0,
          w = 0,
          x = 0,
          y = 0,
          z = 0,
          A = 0,
          B = 0,
          C = 0,
          D = 0,
          E = 0.0,
          F = 0.0;
      D = S;
      S = S + 272 | 0;
      j = D + 256 | 0;
      k = D + 240 | 0;
      y = D;
      z = D + 224 | 0;
      A = D + 208 | 0;
      B = D + 176 | 0;
      C = D + 160 | 0;
      s = D + 192 | 0;
      t = D + 144 | 0;
      u = D + 128 | 0;
      v = D + 112 | 0;
      w = D + 96 | 0;
      x = D + 80 | 0;
      b[j >> 2] = c;
      b[k >> 2] = b[a >> 2];
      b[k + 4 >> 2] = b[a + 4 >> 2];
      b[k + 8 >> 2] = b[a + 8 >> 2];
      b[k + 12 >> 2] = b[a + 12 >> 2];
      $a(k, j, y);
      b[d >> 2] = 0;
      j = b[j >> 2] | 0;
      k = z + 4 | 0;
      l = B + 4 | 0;
      m = 16848 + (j << 2) | 0;
      n = 16928 + (j << 2) | 0;
      o = u + 8 | 0;
      p = v + 8 | 0;
      q = w + 8 | 0;
      r = A + 4 | 0;
      i = 0;

      a: while (1) {
        h = y + (((i >>> 0) % 5 | 0) << 4) | 0;
        b[A >> 2] = b[h >> 2];
        b[A + 4 >> 2] = b[h + 4 >> 2];
        b[A + 8 >> 2] = b[h + 8 >> 2];
        b[A + 12 >> 2] = b[h + 12 >> 2];

        do {} while ((ab(A, j, 0, 1) | 0) == 2);

        if ((i | 0) != 0 & (Gb(c) | 0) != 0) {
          b[B >> 2] = b[A >> 2];
          b[B + 4 >> 2] = b[A + 4 >> 2];
          b[B + 8 >> 2] = b[A + 8 >> 2];
          b[B + 12 >> 2] = b[A + 12 >> 2];
          Ba(k, C);
          f = b[B >> 2] | 0;
          g = b[17008 + (f * 80 | 0) + (b[z >> 2] << 2) >> 2] | 0;
          b[B >> 2] = b[18608 + (f * 80 | 0) + (g * 20 | 0) >> 2];
          h = b[18608 + (f * 80 | 0) + (g * 20 | 0) + 16 >> 2] | 0;

          if ((h | 0) > 0) {
            a = 0;

            do {
              La(l);
              a = a + 1 | 0;
            } while ((a | 0) < (h | 0));
          }

          h = 18608 + (f * 80 | 0) + (g * 20 | 0) + 4 | 0;
          b[s >> 2] = b[h >> 2];
          b[s + 4 >> 2] = b[h + 4 >> 2];
          b[s + 8 >> 2] = b[h + 8 >> 2];
          Ea(s, (b[m >> 2] | 0) * 3 | 0);
          Ca(l, s, l);
          Aa(l);
          Ba(l, t);
          E = +(b[n >> 2] | 0);
          e[u >> 3] = E * 3.0;
          e[o >> 3] = 0.0;
          F = E * -1.5;
          e[v >> 3] = F;
          e[p >> 3] = E * 2.598076211353316;
          e[w >> 3] = F;
          e[q >> 3] = E * -2.598076211353316;

          switch (b[17008 + ((b[B >> 2] | 0) * 80 | 0) + (b[A >> 2] << 2) >> 2] | 0) {
            case 1:
              {
                a = v;
                f = u;
                break;
              }

            case 3:
              {
                a = w;
                f = v;
                break;
              }

            case 2:
              {
                a = u;
                f = w;
                break;
              }

            default:
              {
                a = 11;
                break a;
              }
          }

          vc(C, t, f, a, x);
          Ya(x, b[B >> 2] | 0, j, 1, d + 8 + (b[d >> 2] << 4) | 0);
          b[d >> 2] = (b[d >> 2] | 0) + 1;
        }

        if (i >>> 0 < 5) {
          Ba(r, B);
          Ya(B, b[A >> 2] | 0, j, 1, d + 8 + (b[d >> 2] << 4) | 0);
          b[d >> 2] = (b[d >> 2] | 0) + 1;
        }
        b[z >> 2] = b[A >> 2];
        b[z + 4 >> 2] = b[A + 4 >> 2];
        b[z + 8 >> 2] = b[A + 8 >> 2];
        b[z + 12 >> 2] = b[A + 12 >> 2];
        i = i + 1 | 0;

        if (i >>> 0 >= 6) {
          a = 2;
          break;
        }
      }

      if ((a | 0) == 2) {
        S = D;
        return;
      } else if ((a | 0) == 11) { H(22122, 22169, 573, 22179); }
    }

    function $a(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      var e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0,
          j = 0;
      j = S;
      S = S + 128 | 0;
      e = j + 64 | 0;
      f = j;
      g = e;
      h = 20208;
      i = g + 60 | 0;

      do {
        b[g >> 2] = b[h >> 2];
        g = g + 4 | 0;
        h = h + 4 | 0;
      } while ((g | 0) < (i | 0));

      g = f;
      h = 20272;
      i = g + 60 | 0;

      do {
        b[g >> 2] = b[h >> 2];
        g = g + 4 | 0;
        h = h + 4 | 0;
      } while ((g | 0) < (i | 0));

      i = (Gb(b[c >> 2] | 0) | 0) == 0;
      e = i ? e : f;
      f = a + 4 | 0;
      Pa(f);
      Qa(f);

      if (Gb(b[c >> 2] | 0) | 0) {
        Ja(f);
        b[c >> 2] = (b[c >> 2] | 0) + 1;
      }

      b[d >> 2] = b[a >> 2];
      c = d + 4 | 0;
      Ca(f, e, c);
      Aa(c);
      b[d + 16 >> 2] = b[a >> 2];
      c = d + 20 | 0;
      Ca(f, e + 12 | 0, c);
      Aa(c);
      b[d + 32 >> 2] = b[a >> 2];
      c = d + 36 | 0;
      Ca(f, e + 24 | 0, c);
      Aa(c);
      b[d + 48 >> 2] = b[a >> 2];
      c = d + 52 | 0;
      Ca(f, e + 36 | 0, c);
      Aa(c);
      b[d + 64 >> 2] = b[a >> 2];
      d = d + 68 | 0;
      Ca(f, e + 48 | 0, d);
      Aa(d);
      S = j;
      return;
    }

    function ab(a, c, d, e) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      var f = 0,
          g = 0,
          h = 0,
          i = 0,
          j = 0,
          k = 0,
          l = 0,
          m = 0,
          n = 0,
          o = 0,
          p = 0;
      p = S;
      S = S + 32 | 0;
      n = p + 12 | 0;
      i = p;
      o = a + 4 | 0;
      m = b[16928 + (c << 2) >> 2] | 0;
      l = (e | 0) != 0;
      m = l ? m * 3 | 0 : m;
      f = b[o >> 2] | 0;
      k = a + 8 | 0;
      h = b[k >> 2] | 0;

      if (l) {
        g = a + 12 | 0;
        e = b[g >> 2] | 0;
        f = h + f + e | 0;

        if ((f | 0) == (m | 0)) {
          o = 1;
          S = p;
          return o | 0;
        } else { j = g; }
      } else {
        j = a + 12 | 0;
        e = b[j >> 2] | 0;
        f = h + f + e | 0;
      }

      if ((f | 0) <= (m | 0)) {
        o = 0;
        S = p;
        return o | 0;
      }

      do { if ((e | 0) > 0) {
        e = b[a >> 2] | 0;

        if ((h | 0) > 0) {
          g = 18608 + (e * 80 | 0) + 60 | 0;
          e = a;
          break;
        }

        e = 18608 + (e * 80 | 0) + 40 | 0;

        if (!d) {
          g = e;
          e = a;
        } else {
          ya(n, m, 0, 0);
          Da(o, n, i);
          Ma(i);
          Ca(i, n, o);
          g = e;
          e = a;
        }
      } else {
        g = 18608 + ((b[a >> 2] | 0) * 80 | 0) + 20 | 0;
        e = a;
      } } while (0);

      b[e >> 2] = b[g >> 2];
      f = g + 16 | 0;

      if ((b[f >> 2] | 0) > 0) {
        e = 0;

        do {
          La(o);
          e = e + 1 | 0;
        } while ((e | 0) < (b[f >> 2] | 0));
      }

      a = g + 4 | 0;
      b[n >> 2] = b[a >> 2];
      b[n + 4 >> 2] = b[a + 4 >> 2];
      b[n + 8 >> 2] = b[a + 8 >> 2];
      c = b[16848 + (c << 2) >> 2] | 0;
      Ea(n, l ? c * 3 | 0 : c);
      Ca(o, n, o);
      Aa(o);
      if (l) { e = ((b[k >> 2] | 0) + (b[o >> 2] | 0) + (b[j >> 2] | 0) | 0) == (m | 0) ? 1 : 2; }else { e = 2; }
      o = e;
      S = p;
      return o | 0;
    }

    function bb(a, b) {
      a = a | 0;
      b = b | 0;
      var c = 0;

      do { c = ab(a, b, 0, 1) | 0; } while ((c | 0) == 2);

      return c | 0;
    }

    function cb(a, c, d, f) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      f = f | 0;
      var g = 0,
          h = 0,
          i = 0,
          j = 0,
          k = 0,
          l = 0,
          m = 0,
          n = 0,
          o = 0,
          p = 0,
          q = 0,
          r = 0,
          s = 0,
          t = 0,
          u = 0,
          v = 0,
          w = 0,
          x = 0,
          y = 0,
          z = 0,
          A = 0.0,
          B = 0.0;
      z = S;
      S = S + 240 | 0;
      g = z + 224 | 0;
      t = z + 208 | 0;
      u = z;
      v = z + 192 | 0;
      w = z + 176 | 0;
      x = z + 160 | 0;
      p = z + 144 | 0;
      q = z + 128 | 0;
      r = z + 112 | 0;
      s = z + 96 | 0;

      if (d | 0) {
        _a(a, c, f);

        S = z;
        return;
      }

      b[g >> 2] = c;
      b[t >> 2] = b[a >> 2];
      b[t + 4 >> 2] = b[a + 4 >> 2];
      b[t + 8 >> 2] = b[a + 8 >> 2];
      b[t + 12 >> 2] = b[a + 12 >> 2];
      db(t, g, u);
      b[f >> 2] = 0;
      j = b[g >> 2] | 0;
      k = 16928 + (j << 2) | 0;
      l = p + 8 | 0;
      m = q + 8 | 0;
      n = r + 8 | 0;
      o = v + 4 | 0;
      h = 0;
      i = 0;
      d = -1;

      a: while (1) {
        g = (i >>> 0) % 6 | 0;
        a = u + (g << 4) | 0;
        b[v >> 2] = b[a >> 2];
        b[v + 4 >> 2] = b[a + 4 >> 2];
        b[v + 8 >> 2] = b[a + 8 >> 2];
        b[v + 12 >> 2] = b[a + 12 >> 2];
        a = h;
        h = ab(v, j, 0, 1) | 0;

        if ((i | 0) != 0 & (Gb(c) | 0) != 0 ? (a | 0) != 1 ? (b[v >> 2] | 0) != (d | 0) : 0 : 0) {
          Ba(u + ((((g + 5 | 0) >>> 0) % 6 | 0) << 4) + 4 | 0, w);
          Ba(u + (g << 4) + 4 | 0, x);
          A = +(b[k >> 2] | 0);
          e[p >> 3] = A * 3.0;
          e[l >> 3] = 0.0;
          B = A * -1.5;
          e[q >> 3] = B;
          e[m >> 3] = A * 2.598076211353316;
          e[r >> 3] = B;
          e[n >> 3] = A * -2.598076211353316;
          g = b[t >> 2] | 0;

          switch (b[17008 + (g * 80 | 0) + (((d | 0) == (g | 0) ? b[v >> 2] | 0 : d) << 2) >> 2] | 0) {
            case 1:
              {
                a = q;
                d = p;
                break;
              }

            case 3:
              {
                a = r;
                d = q;
                break;
              }

            case 2:
              {
                a = p;
                d = r;
                break;
              }

            default:
              {
                y = 9;
                break a;
              }
          }

          vc(w, x, d, a, s);

          if (!(wc(w, s) | 0) ? !(wc(x, s) | 0) : 0) {
            Ya(s, b[t >> 2] | 0, j, 1, f + 8 + (b[f >> 2] << 4) | 0);
            b[f >> 2] = (b[f >> 2] | 0) + 1;
          }
        }

        if (i >>> 0 < 6) {
          Ba(o, w);
          Ya(w, b[v >> 2] | 0, j, 1, f + 8 + (b[f >> 2] << 4) | 0);
          b[f >> 2] = (b[f >> 2] | 0) + 1;
        }

        i = i + 1 | 0;
        if (i >>> 0 >= 7) { break; }else { d = b[v >> 2] | 0; }
      }

      if ((y | 0) == 9) { H(22205, 22169, 737, 22250); }
      S = z;
      return;
    }

    function db(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      var e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0,
          j = 0;
      j = S;
      S = S + 160 | 0;
      e = j + 80 | 0;
      f = j;
      g = e;
      h = 20336;
      i = g + 72 | 0;

      do {
        b[g >> 2] = b[h >> 2];
        g = g + 4 | 0;
        h = h + 4 | 0;
      } while ((g | 0) < (i | 0));

      g = f;
      h = 20416;
      i = g + 72 | 0;

      do {
        b[g >> 2] = b[h >> 2];
        g = g + 4 | 0;
        h = h + 4 | 0;
      } while ((g | 0) < (i | 0));

      i = (Gb(b[c >> 2] | 0) | 0) == 0;
      e = i ? e : f;
      f = a + 4 | 0;
      Pa(f);
      Qa(f);

      if (Gb(b[c >> 2] | 0) | 0) {
        Ja(f);
        b[c >> 2] = (b[c >> 2] | 0) + 1;
      }

      b[d >> 2] = b[a >> 2];
      c = d + 4 | 0;
      Ca(f, e, c);
      Aa(c);
      b[d + 16 >> 2] = b[a >> 2];
      c = d + 20 | 0;
      Ca(f, e + 12 | 0, c);
      Aa(c);
      b[d + 32 >> 2] = b[a >> 2];
      c = d + 36 | 0;
      Ca(f, e + 24 | 0, c);
      Aa(c);
      b[d + 48 >> 2] = b[a >> 2];
      c = d + 52 | 0;
      Ca(f, e + 36 | 0, c);
      Aa(c);
      b[d + 64 >> 2] = b[a >> 2];
      c = d + 68 | 0;
      Ca(f, e + 48 | 0, c);
      Aa(c);
      b[d + 80 >> 2] = b[a >> 2];
      d = d + 84 | 0;
      Ca(f, e + 60 | 0, d);
      Aa(d);
      S = j;
      return;
    }

    function eb(a) {
      a = +a;
      var b = 0.0;
      b = a < 0.0 ? a + 6.283185307179586 : a;
      return +(!(a >= 6.283185307179586) ? b : b + -6.283185307179586);
    }

    function fb(a, b, c) {
      a = a | 0;
      b = b | 0;
      c = +c;

      if (!(+q(+(+e[a >> 3] - +e[b >> 3])) < c)) {
        b = 0;
        return b | 0;
      }

      b = +q(+(+e[a + 8 >> 3] - +e[b + 8 >> 3])) < c;
      return b | 0;
    }

    function gb(a, b) {
      a = a | 0;
      b = b | 0;

      if (!(+q(+(+e[a >> 3] - +e[b >> 3])) < 1.7453292519943298e-11)) {
        b = 0;
        return b | 0;
      }

      b = +q(+(+e[a + 8 >> 3] - +e[b + 8 >> 3])) < 1.7453292519943298e-11;
      return b | 0;
    }

    function hb(a, b) {
      a = a | 0;
      b = b | 0;
      var c = 0.0,
          d = 0.0,
          f = 0.0;
      d = +e[b + 8 >> 3];
      f = +e[a + 8 >> 3];
      c = +q(+(d - f));
      if (c > 3.141592653589793) { c = +q(+((d < 0.0 ? d + 6.283185307179586 : d) - (f < 0.0 ? f + 6.283185307179586 : f))); }
      d = 1.5707963267948966 - +e[a >> 3];
      f = 1.5707963267948966 - +e[b >> 3];
      f = +t(+d) * +t(+f) + +t(+c) * (+u(+d) * +u(+f));
      f = f > 1.0 ? 1.0 : f;
      return +(+w(+(f < -1.0 ? -1.0 : f)) * 6371.007180918475);
    }

    function ib(a, b) {
      a = a | 0;
      b = b | 0;
      var c = 0.0,
          d = 0.0,
          f = 0.0,
          g = 0.0,
          h = 0.0;
      g = +e[b >> 3];
      d = +t(+g);
      f = +e[b + 8 >> 3] - +e[a + 8 >> 3];
      h = d * +u(+f);
      c = +e[a >> 3];
      return + +z(+h, +(+u(+g) * +t(+c) - +t(+f) * (d * +u(+c))));
    }

    function jb(a, c, d, f) {
      a = a | 0;
      c = +c;
      d = +d;
      f = f | 0;
      var g = 0,
          h = 0.0,
          i = 0.0,
          j = 0.0;

      if (d < 1.0e-16) {
        b[f >> 2] = b[a >> 2];
        b[f + 4 >> 2] = b[a + 4 >> 2];
        b[f + 8 >> 2] = b[a + 8 >> 2];
        b[f + 12 >> 2] = b[a + 12 >> 2];
        return;
      }

      h = c < 0.0 ? c + 6.283185307179586 : c;
      h = !(c >= 6.283185307179586) ? h : h + -6.283185307179586;

      do { if (h < 1.0e-16) {
        c = +e[a >> 3] + d;
        e[f >> 3] = c;
        g = f;
      } else {
        g = +q(+(h + -3.141592653589793)) < 1.0e-16;
        c = +e[a >> 3];

        if (g) {
          c = c - d;
          e[f >> 3] = c;
          g = f;
          break;
        }

        i = +t(+d);
        d = +u(+d);
        c = i * +u(+c) + +t(+h) * (d * +t(+c));
        c = c > 1.0 ? 1.0 : c;
        c = +x(+(c < -1.0 ? -1.0 : c));
        e[f >> 3] = c;

        if (+q(+(c + -1.5707963267948966)) < 1.0e-16) {
          e[f >> 3] = 1.5707963267948966;
          e[f + 8 >> 3] = 0.0;
          return;
        }

        if (+q(+(c + 1.5707963267948966)) < 1.0e-16) {
          e[f >> 3] = -1.5707963267948966;
          e[f + 8 >> 3] = 0.0;
          return;
        }

        j = +t(+c);
        h = d * +u(+h) / j;
        d = +e[a >> 3];
        c = (i - +u(+c) * +u(+d)) / +t(+d) / j;
        i = h > 1.0 ? 1.0 : h;
        c = c > 1.0 ? 1.0 : c;
        c = +e[a + 8 >> 3] + +z(+(i < -1.0 ? -1.0 : i), +(c < -1.0 ? -1.0 : c));
        if (c > 3.141592653589793) { do { c = c + -6.283185307179586; } while (c > 3.141592653589793); }
        if (c < -3.141592653589793) { do { c = c + 6.283185307179586; } while (c < -3.141592653589793); }
        e[f + 8 >> 3] = c;
        return;
      } } while (0);

      if (+q(+(c + -1.5707963267948966)) < 1.0e-16) {
        e[g >> 3] = 1.5707963267948966;
        e[f + 8 >> 3] = 0.0;
        return;
      }

      if (+q(+(c + 1.5707963267948966)) < 1.0e-16) {
        e[g >> 3] = -1.5707963267948966;
        e[f + 8 >> 3] = 0.0;
        return;
      }

      c = +e[a + 8 >> 3];
      if (c > 3.141592653589793) { do { c = c + -6.283185307179586; } while (c > 3.141592653589793); }
      if (c < -3.141592653589793) { do { c = c + 6.283185307179586; } while (c < -3.141592653589793); }
      e[f + 8 >> 3] = c;
      return;
    }

    function kb(a) {
      a = a | 0;
      return + +e[20496 + (a << 3) >> 3];
    }

    function lb(a) {
      a = a | 0;
      return + +e[20624 + (a << 3) >> 3];
    }

    function mb(a) {
      a = a | 0;
      return + +e[20752 + (a << 3) >> 3];
    }

    function nb(a) {
      a = a | 0;
      return + +e[20880 + (a << 3) >> 3];
    }

    function ob(a) {
      a = a | 0;
      var c = 0;
      c = 21008 + (a << 3) | 0;
      a = b[c >> 2] | 0;
      F(b[c + 4 >> 2] | 0);
      return a | 0;
    }

    function pb(a, b) {
      a = a | 0;
      b = b | 0;
      b = Rc(a | 0, b | 0, 45) | 0;
      G() | 0;
      return b & 127 | 0;
    }

    function qb(a, b) {
      a = a | 0;
      b = b | 0;
      var c = 0,
          d = 0,
          e = 0,
          f = 0,
          g = 0,
          h = 0;

      if (!(0 == 0 & (b & -16777216 | 0) == 134217728)) {
        b = 0;
        return b | 0;
      }

      g = Rc(a | 0, b | 0, 45) | 0;
      G() | 0;
      g = g & 127;

      if (g >>> 0 > 121) {
        b = 0;
        return b | 0;
      }

      c = Rc(a | 0, b | 0, 52) | 0;
      G() | 0;
      c = c & 15;

      do { if (c | 0) {
        e = 1;
        d = 0;

        while (1) {
          f = Rc(a | 0, b | 0, (15 - e | 0) * 3 | 0) | 0;
          G() | 0;
          f = f & 7;
          if ((f | 0) != 0 & (d ^ 1)) { if ((f | 0) == 1 & (la(g) | 0) != 0) {
            h = 0;
            d = 13;
            break;
          } else { d = 1; } }

          if ((f | 0) == 7) {
            h = 0;
            d = 13;
            break;
          }

          if (e >>> 0 < c >>> 0) { e = e + 1 | 0; }else {
            d = 9;
            break;
          }
        }

        if ((d | 0) == 9) {
          if ((c | 0) == 15) { h = 1; }else { break; }
          return h | 0;
        } else if ((d | 0) == 13) { return h | 0; }
      } } while (0);

      while (1) {
        h = Rc(a | 0, b | 0, (14 - c | 0) * 3 | 0) | 0;
        G() | 0;

        if (!((h & 7 | 0) == 7 & 0 == 0)) {
          h = 0;
          d = 13;
          break;
        }

        if (c >>> 0 < 14) { c = c + 1 | 0; }else {
          h = 1;
          d = 13;
          break;
        }
      }

      if ((d | 0) == 13) { return h | 0; }
      return 0;
    }

    function rb(a, b, c) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      var d = 0,
          e = 0;
      d = Rc(a | 0, b | 0, 52) | 0;
      G() | 0;
      d = d & 15;

      if ((d | 0) >= (c | 0)) {
        if ((d | 0) != (c | 0)) { if (c >>> 0 <= 15) {
          e = Sc(c | 0, 0, 52) | 0;
          a = e | a;
          b = G() | 0 | b & -15728641;
          if ((d | 0) > (c | 0)) { do {
            e = Sc(7, 0, (14 - c | 0) * 3 | 0) | 0;
            c = c + 1 | 0;
            a = e | a;
            b = G() | 0 | b;
          } while ((c | 0) < (d | 0)); }
        } else {
          b = 0;
          a = 0;
        } }
      } else {
        b = 0;
        a = 0;
      }

      F(b | 0);
      return a | 0;
    }

    function sb(a, b, c) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      a = Rc(a | 0, b | 0, 52) | 0;
      G() | 0;
      a = a & 15;

      if (!((c | 0) < 16 & (a | 0) <= (c | 0))) {
        c = 0;
        return c | 0;
      }

      c = ic(7, c - a | 0) | 0;
      return c | 0;
    }

    function tb(a, c, d, e) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      var f = 0,
          g = 0,
          h = 0,
          i = 0,
          j = 0,
          k = 0,
          l = 0;
      h = Rc(a | 0, c | 0, 52) | 0;
      G() | 0;
      h = h & 15;
      if (!((d | 0) < 16 & (h | 0) <= (d | 0))) { return; }

      if ((h | 0) == (d | 0)) {
        d = e;
        b[d >> 2] = a;
        b[d + 4 >> 2] = c;
        return;
      }

      j = ic(7, d - h | 0) | 0;
      k = (j | 0) / 7 | 0;
      i = Rc(a | 0, c | 0, 45) | 0;
      G() | 0;
      if (!(la(i & 127) | 0)) { g = 0; }else {
        a: do { if (!h) { f = 0; }else {
          g = 1;

          while (1) {
            f = Rc(a | 0, c | 0, (15 - g | 0) * 3 | 0) | 0;
            G() | 0;
            f = f & 7;
            if (f | 0) { break a; }
            if (g >>> 0 < h >>> 0) { g = g + 1 | 0; }else {
              f = 0;
              break;
            }
          }
        } } while (0);

        g = (f | 0) == 0;
      }
      l = Sc(h + 1 | 0, 0, 52) | 0;
      f = G() | 0 | c & -15728641;
      i = (14 - h | 0) * 3 | 0;
      c = Sc(7, 0, i | 0) | 0;
      c = (l | a) & ~c;
      h = f & ~(G() | 0);
      tb(c, h, d, e);
      f = e + (k << 3) | 0;

      if (!g) {
        l = Sc(1, 0, i | 0) | 0;
        tb(l | c, G() | 0 | h, d, f);
        l = f + (k << 3) | 0;
        j = Sc(2, 0, i | 0) | 0;
        tb(j | c, G() | 0 | h, d, l);
        l = l + (k << 3) | 0;
        j = Sc(3, 0, i | 0) | 0;
        tb(j | c, G() | 0 | h, d, l);
        l = l + (k << 3) | 0;
        j = Sc(4, 0, i | 0) | 0;
        tb(j | c, G() | 0 | h, d, l);
        l = l + (k << 3) | 0;
        j = Sc(5, 0, i | 0) | 0;
        tb(j | c, G() | 0 | h, d, l);
        j = Sc(6, 0, i | 0) | 0;
        tb(j | c, G() | 0 | h, d, l + (k << 3) | 0);
        return;
      }

      g = f + (k << 3) | 0;

      if ((j | 0) > 6) {
        j = f + 8 | 0;
        l = (g >>> 0 > j >>> 0 ? g : j) + -1 + (0 - f) | 0;
        Wc(f | 0, 0, l + 8 & -8 | 0) | 0;
        f = j + (l >>> 3 << 3) | 0;
      }

      l = Sc(2, 0, i | 0) | 0;
      tb(l | c, G() | 0 | h, d, f);
      l = f + (k << 3) | 0;
      j = Sc(3, 0, i | 0) | 0;
      tb(j | c, G() | 0 | h, d, l);
      l = l + (k << 3) | 0;
      j = Sc(4, 0, i | 0) | 0;
      tb(j | c, G() | 0 | h, d, l);
      l = l + (k << 3) | 0;
      j = Sc(5, 0, i | 0) | 0;
      tb(j | c, G() | 0 | h, d, l);
      j = Sc(6, 0, i | 0) | 0;
      tb(j | c, G() | 0 | h, d, l + (k << 3) | 0);
      return;
    }

    function ub(a, b) {
      a = a | 0;
      b = b | 0;
      var c = 0,
          d = 0,
          e = 0;
      e = Rc(a | 0, b | 0, 45) | 0;
      G() | 0;

      if (!(la(e & 127) | 0)) {
        e = 0;
        return e | 0;
      }

      e = Rc(a | 0, b | 0, 52) | 0;
      G() | 0;
      e = e & 15;

      a: do { if (!e) { c = 0; }else {
        d = 1;

        while (1) {
          c = Rc(a | 0, b | 0, (15 - d | 0) * 3 | 0) | 0;
          G() | 0;
          c = c & 7;
          if (c | 0) { break a; }
          if (d >>> 0 < e >>> 0) { d = d + 1 | 0; }else {
            c = 0;
            break;
          }
        }
      } } while (0);

      e = (c | 0) == 0 & 1;
      return e | 0;
    }

    function vb(a, b, c) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      var d = 0,
          e = 0;
      d = Rc(a | 0, b | 0, 52) | 0;
      G() | 0;
      d = d & 15;

      if ((c | 0) < 16 & (d | 0) <= (c | 0)) {
        if ((d | 0) != (c | 0)) {
          e = Sc(c | 0, 0, 52) | 0;
          a = e | a;
          b = G() | 0 | b & -15728641;
          if ((d | 0) < (c | 0)) { do {
            e = Sc(7, 0, (14 - d | 0) * 3 | 0) | 0;
            d = d + 1 | 0;
            a = a & ~e;
            b = b & ~(G() | 0);
          } while ((d | 0) < (c | 0)); }
        }
      } else {
        b = 0;
        a = 0;
      }

      F(b | 0);
      return a | 0;
    }

    function wb(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      var e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0,
          j = 0,
          k = 0,
          l = 0,
          m = 0,
          n = 0,
          o = 0,
          p = 0,
          q = 0,
          r = 0,
          s = 0,
          t = 0,
          u = 0,
          v = 0,
          w = 0,
          x = 0,
          y = 0,
          z = 0;

      if (!d) {
        y = 0;
        return y | 0;
      }

      f = a;
      e = b[f >> 2] | 0;
      f = b[f + 4 >> 2] | 0;

      if (0 == 0 & (f & 15728640 | 0) == 0) {
        if ((d | 0) <= 0) {
          y = 0;
          return y | 0;
        }

        y = c;
        b[y >> 2] = e;
        b[y + 4 >> 2] = f;

        if ((d | 0) == 1) {
          y = 0;
          return y | 0;
        }

        e = 1;

        do {
          w = a + (e << 3) | 0;
          x = b[w + 4 >> 2] | 0;
          y = c + (e << 3) | 0;
          b[y >> 2] = b[w >> 2];
          b[y + 4 >> 2] = x;
          e = e + 1 | 0;
        } while ((e | 0) != (d | 0));

        e = 0;
        return e | 0;
      }

      w = d << 3;
      x = Jc(w) | 0;

      if (!x) {
        y = -3;
        return y | 0;
      }

      Vc(x | 0, a | 0, w | 0) | 0;
      v = Lc(d, 8) | 0;

      if (!v) {
        Kc(x);
        y = -3;
        return y | 0;
      }

      e = d;

      a: while (1) {
        h = x;
        l = b[h >> 2] | 0;
        h = b[h + 4 >> 2] | 0;
        t = Rc(l | 0, h | 0, 52) | 0;
        G() | 0;
        t = t & 15;
        u = t + -1 | 0;
        s = (e | 0) > 0;

        b: do { if (s) {
          r = ((e | 0) < 0) << 31 >> 31;
          p = Sc(u | 0, 0, 52) | 0;
          q = G() | 0;

          if (u >>> 0 > 15) {
            f = 0;
            a = l;
            d = h;

            while (1) {
              if (!((a | 0) == 0 & (d | 0) == 0)) {
                g = Rc(a | 0, d | 0, 52) | 0;
                G() | 0;
                g = g & 15;
                i = (g | 0) < (u | 0);
                g = (g | 0) == (u | 0);
                k = i ? 0 : g ? a : 0;
                a = i ? 0 : g ? d : 0;
                d = Qc(k | 0, a | 0, e | 0, r | 0) | 0;
                G() | 0;
                g = v + (d << 3) | 0;
                i = g;
                j = b[i >> 2] | 0;
                i = b[i + 4 >> 2] | 0;
                if ((j | 0) == 0 & (i | 0) == 0) { d = k; }else {
                  p = 0;
                  o = d;
                  n = i;
                  d = k;

                  while (1) {
                    if ((p | 0) > (e | 0)) {
                      y = 41;
                      break a;
                    }

                    if ((j | 0) == (d | 0) & (n & -117440513 | 0) == (a | 0)) {
                      k = Rc(j | 0, n | 0, 56) | 0;
                      G() | 0;
                      k = k & 7;
                      m = k + 1 | 0;
                      q = Rc(j | 0, n | 0, 45) | 0;
                      G() | 0;

                      c: do { if (!(la(q & 127) | 0)) { i = 7; }else {
                        j = Rc(j | 0, n | 0, 52) | 0;
                        G() | 0;
                        j = j & 15;

                        if (!j) {
                          i = 6;
                          break;
                        }

                        i = 1;

                        while (1) {
                          q = Sc(7, 0, (15 - i | 0) * 3 | 0) | 0;

                          if (!((q & d | 0) == 0 & ((G() | 0) & a | 0) == 0)) {
                            i = 7;
                            break c;
                          }

                          if (i >>> 0 < j >>> 0) { i = i + 1 | 0; }else {
                            i = 6;
                            break;
                          }
                        }
                      } } while (0);

                      if ((k + 2 | 0) >>> 0 > i >>> 0) {
                        y = 51;
                        break a;
                      }

                      q = Sc(m | 0, 0, 56) | 0;
                      a = G() | 0 | a & -117440513;
                      i = g;
                      b[i >> 2] = 0;
                      b[i + 4 >> 2] = 0;
                      i = o;
                      d = q | d;
                    } else { i = (o + 1 | 0) % (e | 0) | 0; }

                    g = v + (i << 3) | 0;
                    n = g;
                    j = b[n >> 2] | 0;
                    n = b[n + 4 >> 2] | 0;
                    if ((j | 0) == 0 & (n | 0) == 0) { break; }else {
                      p = p + 1 | 0;
                      o = i;
                    }
                  }
                }
                q = g;
                b[q >> 2] = d;
                b[q + 4 >> 2] = a;
              }

              f = f + 1 | 0;
              if ((f | 0) >= (e | 0)) { break b; }
              d = x + (f << 3) | 0;
              a = b[d >> 2] | 0;
              d = b[d + 4 >> 2] | 0;
            }
          }

          f = 0;
          a = l;
          d = h;

          while (1) {
            if (!((a | 0) == 0 & (d | 0) == 0)) {
              i = Rc(a | 0, d | 0, 52) | 0;
              G() | 0;
              i = i & 15;

              if ((i | 0) >= (u | 0)) {
                if ((i | 0) != (u | 0)) {
                  a = a | p;
                  d = d & -15728641 | q;

                  if (i >>> 0 >= t >>> 0) {
                    g = u;

                    do {
                      o = Sc(7, 0, (14 - g | 0) * 3 | 0) | 0;
                      g = g + 1 | 0;
                      a = o | a;
                      d = G() | 0 | d;
                    } while (g >>> 0 < i >>> 0);
                  }
                }
              } else {
                a = 0;
                d = 0;
              }

              i = Qc(a | 0, d | 0, e | 0, r | 0) | 0;
              G() | 0;
              g = v + (i << 3) | 0;
              j = g;
              k = b[j >> 2] | 0;
              j = b[j + 4 >> 2] | 0;

              if (!((k | 0) == 0 & (j | 0) == 0)) {
                o = 0;

                while (1) {
                  if ((o | 0) > (e | 0)) {
                    y = 41;
                    break a;
                  }

                  if ((k | 0) == (a | 0) & (j & -117440513 | 0) == (d | 0)) {
                    m = Rc(k | 0, j | 0, 56) | 0;
                    G() | 0;
                    m = m & 7;
                    n = m + 1 | 0;
                    z = Rc(k | 0, j | 0, 45) | 0;
                    G() | 0;

                    d: do { if (!(la(z & 127) | 0)) { j = 7; }else {
                      k = Rc(k | 0, j | 0, 52) | 0;
                      G() | 0;
                      k = k & 15;

                      if (!k) {
                        j = 6;
                        break;
                      }

                      j = 1;

                      while (1) {
                        z = Sc(7, 0, (15 - j | 0) * 3 | 0) | 0;

                        if (!((z & a | 0) == 0 & ((G() | 0) & d | 0) == 0)) {
                          j = 7;
                          break d;
                        }

                        if (j >>> 0 < k >>> 0) { j = j + 1 | 0; }else {
                          j = 6;
                          break;
                        }
                      }
                    } } while (0);

                    if ((m + 2 | 0) >>> 0 > j >>> 0) {
                      y = 51;
                      break a;
                    }

                    z = Sc(n | 0, 0, 56) | 0;
                    d = G() | 0 | d & -117440513;
                    n = g;
                    b[n >> 2] = 0;
                    b[n + 4 >> 2] = 0;
                    a = z | a;
                  } else { i = (i + 1 | 0) % (e | 0) | 0; }

                  g = v + (i << 3) | 0;
                  j = g;
                  k = b[j >> 2] | 0;
                  j = b[j + 4 >> 2] | 0;
                  if ((k | 0) == 0 & (j | 0) == 0) { break; }else { o = o + 1 | 0; }
                }
              }

              z = g;
              b[z >> 2] = a;
              b[z + 4 >> 2] = d;
            }

            f = f + 1 | 0;
            if ((f | 0) >= (e | 0)) { break b; }
            d = x + (f << 3) | 0;
            a = b[d >> 2] | 0;
            d = b[d + 4 >> 2] | 0;
          }
        } } while (0);

        if ((e + 5 | 0) >>> 0 < 11) {
          y = 99;
          break;
        }

        q = Lc((e | 0) / 6 | 0, 8) | 0;

        if (!q) {
          y = 58;
          break;
        }

        e: do { if (s) {
          o = 0;
          n = 0;

          do {
            i = v + (o << 3) | 0;
            a = i;
            f = b[a >> 2] | 0;
            a = b[a + 4 >> 2] | 0;

            if (!((f | 0) == 0 & (a | 0) == 0)) {
              j = Rc(f | 0, a | 0, 56) | 0;
              G() | 0;
              j = j & 7;
              d = j + 1 | 0;
              k = a & -117440513;
              z = Rc(f | 0, a | 0, 45) | 0;
              G() | 0;

              f: do { if (la(z & 127) | 0) {
                m = Rc(f | 0, a | 0, 52) | 0;
                G() | 0;
                m = m & 15;

                if (m | 0) {
                  g = 1;

                  while (1) {
                    z = Sc(7, 0, (15 - g | 0) * 3 | 0) | 0;
                    if (!((f & z | 0) == 0 & (k & (G() | 0) | 0) == 0)) { break f; }
                    if (g >>> 0 < m >>> 0) { g = g + 1 | 0; }else { break; }
                  }
                }

                a = Sc(d | 0, 0, 56) | 0;
                f = a | f;
                a = G() | 0 | k;
                d = i;
                b[d >> 2] = f;
                b[d + 4 >> 2] = a;
                d = j + 2 | 0;
              } } while (0);

              if ((d | 0) == 7) {
                z = q + (n << 3) | 0;
                b[z >> 2] = f;
                b[z + 4 >> 2] = a & -117440513;
                n = n + 1 | 0;
              }
            }

            o = o + 1 | 0;
          } while ((o | 0) != (e | 0));

          if (s) {
            p = ((e | 0) < 0) << 31 >> 31;
            m = Sc(u | 0, 0, 52) | 0;
            o = G() | 0;

            if (u >>> 0 > 15) {
              a = 0;
              f = 0;

              while (1) {
                do { if (!((l | 0) == 0 & (h | 0) == 0)) {
                  j = Rc(l | 0, h | 0, 52) | 0;
                  G() | 0;
                  j = j & 15;
                  g = (j | 0) < (u | 0);
                  j = (j | 0) == (u | 0);
                  i = g ? 0 : j ? l : 0;
                  j = g ? 0 : j ? h : 0;
                  g = Qc(i | 0, j | 0, e | 0, p | 0) | 0;
                  G() | 0;
                  d = 0;

                  while (1) {
                    if ((d | 0) > (e | 0)) {
                      y = 98;
                      break a;
                    }

                    z = v + (g << 3) | 0;
                    k = b[z + 4 >> 2] | 0;

                    if ((k & -117440513 | 0) == (j | 0) ? (b[z >> 2] | 0) == (i | 0) : 0) {
                      y = 70;
                      break;
                    }

                    g = (g + 1 | 0) % (e | 0) | 0;
                    z = v + (g << 3) | 0;
                    if ((b[z >> 2] | 0) == (i | 0) ? (b[z + 4 >> 2] | 0) == (j | 0) : 0) { break; }else { d = d + 1 | 0; }
                  }

                  if ((y | 0) == 70 ? (y = 0, 0 == 0 & (k & 117440512 | 0) == 100663296) : 0) { break; }
                  z = c + (f << 3) | 0;
                  b[z >> 2] = l;
                  b[z + 4 >> 2] = h;
                  f = f + 1 | 0;
                } } while (0);

                a = a + 1 | 0;

                if ((a | 0) >= (e | 0)) {
                  e = n;
                  break e;
                }

                h = x + (a << 3) | 0;
                l = b[h >> 2] | 0;
                h = b[h + 4 >> 2] | 0;
              }
            }

            a = 0;
            f = 0;

            while (1) {
              do { if (!((l | 0) == 0 & (h | 0) == 0)) {
                j = Rc(l | 0, h | 0, 52) | 0;
                G() | 0;
                j = j & 15;
                if ((j | 0) >= (u | 0)) {
                  if ((j | 0) != (u | 0)) {
                    d = l | m;
                    g = h & -15728641 | o;
                    if (j >>> 0 < t >>> 0) { j = g; }else {
                      i = u;

                      do {
                        z = Sc(7, 0, (14 - i | 0) * 3 | 0) | 0;
                        i = i + 1 | 0;
                        d = z | d;
                        g = G() | 0 | g;
                      } while (i >>> 0 < j >>> 0);

                      j = g;
                    }
                  } else {
                    d = l;
                    j = h;
                  }
                } else {
                  d = 0;
                  j = 0;
                }
                i = Qc(d | 0, j | 0, e | 0, p | 0) | 0;
                G() | 0;
                g = 0;

                while (1) {
                  if ((g | 0) > (e | 0)) {
                    y = 98;
                    break a;
                  }

                  z = v + (i << 3) | 0;
                  k = b[z + 4 >> 2] | 0;

                  if ((k & -117440513 | 0) == (j | 0) ? (b[z >> 2] | 0) == (d | 0) : 0) {
                    y = 93;
                    break;
                  }

                  i = (i + 1 | 0) % (e | 0) | 0;
                  z = v + (i << 3) | 0;
                  if ((b[z >> 2] | 0) == (d | 0) ? (b[z + 4 >> 2] | 0) == (j | 0) : 0) { break; }else { g = g + 1 | 0; }
                }

                if ((y | 0) == 93 ? (y = 0, 0 == 0 & (k & 117440512 | 0) == 100663296) : 0) { break; }
                z = c + (f << 3) | 0;
                b[z >> 2] = l;
                b[z + 4 >> 2] = h;
                f = f + 1 | 0;
              } } while (0);

              a = a + 1 | 0;

              if ((a | 0) >= (e | 0)) {
                e = n;
                break e;
              }

              h = x + (a << 3) | 0;
              l = b[h >> 2] | 0;
              h = b[h + 4 >> 2] | 0;
            }
          } else {
            f = 0;
            e = n;
          }
        } else {
          f = 0;
          e = 0;
        } } while (0);

        Wc(v | 0, 0, w | 0) | 0;
        Vc(x | 0, q | 0, e << 3 | 0) | 0;
        Kc(q);
        if (!e) { break; }else { c = c + (f << 3) | 0; }
      }

      if ((y | 0) == 41) {
        Kc(x);
        Kc(v);
        z = -1;
        return z | 0;
      } else if ((y | 0) == 51) {
        Kc(x);
        Kc(v);
        z = -2;
        return z | 0;
      } else if ((y | 0) == 58) {
        Kc(x);
        Kc(v);
        z = -3;
        return z | 0;
      } else if ((y | 0) == 98) {
        Kc(q);
        Kc(x);
        Kc(v);
        z = -1;
        return z | 0;
      } else if ((y | 0) == 99) { Vc(c | 0, x | 0, e << 3 | 0) | 0; }

      Kc(x);
      Kc(v);
      z = 0;
      return z | 0;
    }

    function xb(a, c, d, e, f) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
          h = 0,
          i = 0,
          j = 0,
          k = 0,
          l = 0;

      if ((c | 0) <= 0) {
        f = 0;
        return f | 0;
      }

      if ((f | 0) >= 16) {
        g = 0;

        while (1) {
          l = a + (g << 3) | 0;

          if (!((b[l >> 2] | 0) == 0 & (b[l + 4 >> 2] | 0) == 0)) {
            g = 14;
            break;
          }

          g = g + 1 | 0;

          if ((g | 0) >= (c | 0)) {
            h = 0;
            g = 16;
            break;
          }
        }

        if ((g | 0) == 14) { return ((e | 0) > 0 ? -2 : -1) | 0; }else if ((g | 0) == 16) { return h | 0; }
      }

      g = 0;
      l = 0;

      a: while (1) {
        k = a + (l << 3) | 0;
        i = k;
        h = b[i >> 2] | 0;
        i = b[i + 4 >> 2] | 0;

        do { if (!((h | 0) == 0 & (i | 0) == 0)) {
          if ((g | 0) >= (e | 0)) {
            h = -1;
            g = 16;
            break a;
          }

          j = Rc(h | 0, i | 0, 52) | 0;
          G() | 0;
          j = j & 15;

          if ((j | 0) > (f | 0)) {
            h = -2;
            g = 16;
            break a;
          }

          if ((j | 0) == (f | 0)) {
            k = d + (g << 3) | 0;
            b[k >> 2] = h;
            b[k + 4 >> 2] = i;
            g = g + 1 | 0;
            break;
          }

          h = (ic(7, f - j | 0) | 0) + g | 0;

          if ((h | 0) > (e | 0)) {
            h = -1;
            g = 16;
            break a;
          }

          tb(b[k >> 2] | 0, b[k + 4 >> 2] | 0, f, d + (g << 3) | 0);
          g = h;
        } } while (0);

        l = l + 1 | 0;

        if ((l | 0) >= (c | 0)) {
          h = 0;
          g = 16;
          break;
        }
      }

      if ((g | 0) == 16) { return h | 0; }
      return 0;
    }

    function yb(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      var e = 0,
          f = 0,
          g = 0,
          h = 0;

      if ((c | 0) <= 0) {
        d = 0;
        return d | 0;
      }

      if ((d | 0) >= 16) {
        e = 0;

        while (1) {
          h = a + (e << 3) | 0;

          if (!((b[h >> 2] | 0) == 0 & (b[h + 4 >> 2] | 0) == 0)) {
            e = -1;
            f = 13;
            break;
          }

          e = e + 1 | 0;

          if ((e | 0) >= (c | 0)) {
            e = 0;
            f = 13;
            break;
          }
        }

        if ((f | 0) == 13) { return e | 0; }
      }

      e = 0;
      h = 0;

      a: while (1) {
        f = a + (h << 3) | 0;
        g = b[f >> 2] | 0;
        f = b[f + 4 >> 2] | 0;

        do { if (!((g | 0) == 0 & (f | 0) == 0)) {
          f = Rc(g | 0, f | 0, 52) | 0;
          G() | 0;
          f = f & 15;

          if ((f | 0) > (d | 0)) {
            e = -1;
            f = 13;
            break a;
          }

          if ((f | 0) == (d | 0)) {
            e = e + 1 | 0;
            break;
          } else {
            e = (ic(7, d - f | 0) | 0) + e | 0;
            break;
          }
        } } while (0);

        h = h + 1 | 0;

        if ((h | 0) >= (c | 0)) {
          f = 13;
          break;
        }
      }

      if ((f | 0) == 13) { return e | 0; }
      return 0;
    }

    function zb(a, b) {
      a = a | 0;
      b = b | 0;
      b = Rc(a | 0, b | 0, 52) | 0;
      G() | 0;
      return b & 1 | 0;
    }

    function Ab(a, b) {
      a = a | 0;
      b = b | 0;
      var c = 0,
          d = 0,
          e = 0;
      e = Rc(a | 0, b | 0, 52) | 0;
      G() | 0;
      e = e & 15;

      if (!e) {
        e = 0;
        return e | 0;
      }

      d = 1;

      while (1) {
        c = Rc(a | 0, b | 0, (15 - d | 0) * 3 | 0) | 0;
        G() | 0;
        c = c & 7;

        if (c | 0) {
          d = 5;
          break;
        }

        if (d >>> 0 < e >>> 0) { d = d + 1 | 0; }else {
          c = 0;
          d = 5;
          break;
        }
      }

      if ((d | 0) == 5) { return c | 0; }
      return 0;
    }

    function Bb(a, b) {
      a = a | 0;
      b = b | 0;
      var c = 0,
          d = 0,
          e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0;
      i = Rc(a | 0, b | 0, 52) | 0;
      G() | 0;
      i = i & 15;

      if (!i) {
        h = b;
        i = a;
        F(h | 0);
        return i | 0;
      }

      h = 1;
      c = 0;

      while (1) {
        f = (15 - h | 0) * 3 | 0;
        d = Sc(7, 0, f | 0) | 0;
        e = G() | 0;
        g = Rc(a | 0, b | 0, f | 0) | 0;
        G() | 0;
        f = Sc(Na(g & 7) | 0, 0, f | 0) | 0;
        g = G() | 0;
        a = f | a & ~d;
        b = g | b & ~e;

        a: do { if (!c) { if (!((f & d | 0) == 0 & (g & e | 0) == 0)) {
          d = Rc(a | 0, b | 0, 52) | 0;
          G() | 0;
          d = d & 15;
          if (!d) { c = 1; }else {
            c = 1;

            b: while (1) {
              g = Rc(a | 0, b | 0, (15 - c | 0) * 3 | 0) | 0;
              G() | 0;

              switch (g & 7) {
                case 1:
                  break b;

                case 0:
                  break;

                default:
                  {
                    c = 1;
                    break a;
                  }
              }

              if (c >>> 0 < d >>> 0) { c = c + 1 | 0; }else {
                c = 1;
                break a;
              }
            }

            c = 1;

            while (1) {
              g = (15 - c | 0) * 3 | 0;
              e = Rc(a | 0, b | 0, g | 0) | 0;
              G() | 0;
              f = Sc(7, 0, g | 0) | 0;
              b = b & ~(G() | 0);
              g = Sc(Na(e & 7) | 0, 0, g | 0) | 0;
              a = a & ~f | g;
              b = b | (G() | 0);
              if (c >>> 0 < d >>> 0) { c = c + 1 | 0; }else {
                c = 1;
                break;
              }
            }
          }
        } else { c = 0; } } } while (0);

        if (h >>> 0 < i >>> 0) { h = h + 1 | 0; }else { break; }
      }

      F(b | 0);
      return a | 0;
    }

    function Cb(a, b) {
      a = a | 0;
      b = b | 0;
      var c = 0,
          d = 0,
          e = 0,
          f = 0,
          g = 0;
      d = Rc(a | 0, b | 0, 52) | 0;
      G() | 0;
      d = d & 15;

      if (!d) {
        c = b;
        d = a;
        F(c | 0);
        return d | 0;
      }

      c = 1;

      while (1) {
        f = (15 - c | 0) * 3 | 0;
        g = Rc(a | 0, b | 0, f | 0) | 0;
        G() | 0;
        e = Sc(7, 0, f | 0) | 0;
        b = b & ~(G() | 0);
        f = Sc(Na(g & 7) | 0, 0, f | 0) | 0;
        a = f | a & ~e;
        b = G() | 0 | b;
        if (c >>> 0 < d >>> 0) { c = c + 1 | 0; }else { break; }
      }

      F(b | 0);
      return a | 0;
    }

    function Db(a, b) {
      a = a | 0;
      b = b | 0;
      var c = 0,
          d = 0,
          e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0;
      i = Rc(a | 0, b | 0, 52) | 0;
      G() | 0;
      i = i & 15;

      if (!i) {
        h = b;
        i = a;
        F(h | 0);
        return i | 0;
      }

      h = 1;
      c = 0;

      while (1) {
        f = (15 - h | 0) * 3 | 0;
        d = Sc(7, 0, f | 0) | 0;
        e = G() | 0;
        g = Rc(a | 0, b | 0, f | 0) | 0;
        G() | 0;
        f = Sc(Oa(g & 7) | 0, 0, f | 0) | 0;
        g = G() | 0;
        a = f | a & ~d;
        b = g | b & ~e;

        a: do { if (!c) { if (!((f & d | 0) == 0 & (g & e | 0) == 0)) {
          d = Rc(a | 0, b | 0, 52) | 0;
          G() | 0;
          d = d & 15;
          if (!d) { c = 1; }else {
            c = 1;

            b: while (1) {
              g = Rc(a | 0, b | 0, (15 - c | 0) * 3 | 0) | 0;
              G() | 0;

              switch (g & 7) {
                case 1:
                  break b;

                case 0:
                  break;

                default:
                  {
                    c = 1;
                    break a;
                  }
              }

              if (c >>> 0 < d >>> 0) { c = c + 1 | 0; }else {
                c = 1;
                break a;
              }
            }

            c = 1;

            while (1) {
              e = (15 - c | 0) * 3 | 0;
              f = Sc(7, 0, e | 0) | 0;
              g = b & ~(G() | 0);
              b = Rc(a | 0, b | 0, e | 0) | 0;
              G() | 0;
              b = Sc(Oa(b & 7) | 0, 0, e | 0) | 0;
              a = a & ~f | b;
              b = g | (G() | 0);
              if (c >>> 0 < d >>> 0) { c = c + 1 | 0; }else {
                c = 1;
                break;
              }
            }
          }
        } else { c = 0; } } } while (0);

        if (h >>> 0 < i >>> 0) { h = h + 1 | 0; }else { break; }
      }

      F(b | 0);
      return a | 0;
    }

    function Eb(a, b) {
      a = a | 0;
      b = b | 0;
      var c = 0,
          d = 0,
          e = 0,
          f = 0,
          g = 0;
      d = Rc(a | 0, b | 0, 52) | 0;
      G() | 0;
      d = d & 15;

      if (!d) {
        c = b;
        d = a;
        F(c | 0);
        return d | 0;
      }

      c = 1;

      while (1) {
        g = (15 - c | 0) * 3 | 0;
        f = Sc(7, 0, g | 0) | 0;
        e = b & ~(G() | 0);
        b = Rc(a | 0, b | 0, g | 0) | 0;
        G() | 0;
        b = Sc(Oa(b & 7) | 0, 0, g | 0) | 0;
        a = b | a & ~f;
        b = G() | 0 | e;
        if (c >>> 0 < d >>> 0) { c = c + 1 | 0; }else { break; }
      }

      F(b | 0);
      return a | 0;
    }

    function Fb(a, c) {
      a = a | 0;
      c = c | 0;
      var d = 0,
          e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0,
          j = 0,
          k = 0,
          l = 0;
      j = S;
      S = S + 64 | 0;
      i = j + 40 | 0;
      e = j + 24 | 0;
      f = j + 12 | 0;
      g = j;
      Sc(c | 0, 0, 52) | 0;
      d = G() | 0 | 134225919;

      if (!c) {
        if ((b[a + 4 >> 2] | 0) > 2) {
          h = 0;
          i = 0;
          F(h | 0);
          S = j;
          return i | 0;
        }

        if ((b[a + 8 >> 2] | 0) > 2) {
          h = 0;
          i = 0;
          F(h | 0);
          S = j;
          return i | 0;
        }

        if ((b[a + 12 >> 2] | 0) > 2) {
          h = 0;
          i = 0;
          F(h | 0);
          S = j;
          return i | 0;
        }

        Sc(na(a) | 0, 0, 45) | 0;
        h = G() | 0 | d;
        i = -1;
        F(h | 0);
        S = j;
        return i | 0;
      }
      b[i >> 2] = b[a >> 2];
      b[i + 4 >> 2] = b[a + 4 >> 2];
      b[i + 8 >> 2] = b[a + 8 >> 2];
      b[i + 12 >> 2] = b[a + 12 >> 2];
      h = i + 4 | 0;

      if ((c | 0) > 0) {
        a = -1;

        while (1) {
          b[e >> 2] = b[h >> 2];
          b[e + 4 >> 2] = b[h + 4 >> 2];
          b[e + 8 >> 2] = b[h + 8 >> 2];

          if (!(c & 1)) {
            Ha(h);
            b[f >> 2] = b[h >> 2];
            b[f + 4 >> 2] = b[h + 4 >> 2];
            b[f + 8 >> 2] = b[h + 8 >> 2];
            Ja(f);
          } else {
            Ga(h);
            b[f >> 2] = b[h >> 2];
            b[f + 4 >> 2] = b[h + 4 >> 2];
            b[f + 8 >> 2] = b[h + 8 >> 2];
            Ia(f);
          }

          Da(e, f, g);
          Aa(g);
          l = (15 - c | 0) * 3 | 0;
          k = Sc(7, 0, l | 0) | 0;
          d = d & ~(G() | 0);
          l = Sc(Fa(g) | 0, 0, l | 0) | 0;
          a = l | a & ~k;
          d = G() | 0 | d;
          if ((c | 0) > 1) { c = c + -1 | 0; }else { break; }
        }
      } else { a = -1; }

      a: do { if (((b[h >> 2] | 0) <= 2 ? (b[i + 8 >> 2] | 0) <= 2 : 0) ? (b[i + 12 >> 2] | 0) <= 2 : 0) {
        e = na(i) | 0;
        c = Sc(e | 0, 0, 45) | 0;
        c = c | a;
        a = G() | 0 | d & -1040385;
        g = oa(i) | 0;

        if (!(la(e) | 0)) {
          if ((g | 0) <= 0) { break; }
          f = 0;

          while (1) {
            e = Rc(c | 0, a | 0, 52) | 0;
            G() | 0;
            e = e & 15;

            if (e) {
              d = 1;

              while (1) {
                l = (15 - d | 0) * 3 | 0;
                i = Rc(c | 0, a | 0, l | 0) | 0;
                G() | 0;
                k = Sc(7, 0, l | 0) | 0;
                a = a & ~(G() | 0);
                l = Sc(Na(i & 7) | 0, 0, l | 0) | 0;
                c = c & ~k | l;
                a = a | (G() | 0);
                if (d >>> 0 < e >>> 0) { d = d + 1 | 0; }else { break; }
              }
            }

            f = f + 1 | 0;
            if ((f | 0) == (g | 0)) { break a; }
          }
        }

        f = Rc(c | 0, a | 0, 52) | 0;
        G() | 0;
        f = f & 15;

        b: do { if (f) {
          d = 1;

          c: while (1) {
            l = Rc(c | 0, a | 0, (15 - d | 0) * 3 | 0) | 0;
            G() | 0;

            switch (l & 7) {
              case 1:
                break c;

              case 0:
                break;

              default:
                break b;
            }

            if (d >>> 0 < f >>> 0) { d = d + 1 | 0; }else { break b; }
          }

          if (pa(e, b[i >> 2] | 0) | 0) {
            d = 1;

            while (1) {
              i = (15 - d | 0) * 3 | 0;
              k = Sc(7, 0, i | 0) | 0;
              l = a & ~(G() | 0);
              a = Rc(c | 0, a | 0, i | 0) | 0;
              G() | 0;
              a = Sc(Oa(a & 7) | 0, 0, i | 0) | 0;
              c = c & ~k | a;
              a = l | (G() | 0);
              if (d >>> 0 < f >>> 0) { d = d + 1 | 0; }else { break; }
            }
          } else {
            d = 1;

            while (1) {
              l = (15 - d | 0) * 3 | 0;
              i = Rc(c | 0, a | 0, l | 0) | 0;
              G() | 0;
              k = Sc(7, 0, l | 0) | 0;
              a = a & ~(G() | 0);
              l = Sc(Na(i & 7) | 0, 0, l | 0) | 0;
              c = c & ~k | l;
              a = a | (G() | 0);
              if (d >>> 0 < f >>> 0) { d = d + 1 | 0; }else { break; }
            }
          }
        } } while (0);

        if ((g | 0) > 0) {
          d = 0;

          do {
            c = Bb(c, a) | 0;
            a = G() | 0;
            d = d + 1 | 0;
          } while ((d | 0) != (g | 0));
        }
      } else {
        c = 0;
        a = 0;
      } } while (0);

      k = a;
      l = c;
      F(k | 0);
      S = j;
      return l | 0;
    }

    function Gb(a) {
      a = a | 0;
      return (a | 0) % 2 | 0 | 0;
    }

    function Hb(a, c) {
      a = a | 0;
      c = c | 0;
      var d = 0,
          e = 0;
      e = S;
      S = S + 16 | 0;
      d = e;

      if ((c >>> 0 <= 15 ? !((b[a + 4 >> 2] & 2146435072 | 0) == 2146435072) : 0) ? !((b[a + 8 + 4 >> 2] & 2146435072 | 0) == 2146435072) : 0) {
        Wa(a, c, d);
        c = Fb(d, c) | 0;
        a = G() | 0;
      } else {
        a = 0;
        c = 0;
      }

      F(a | 0);
      S = e;
      return c | 0;
    }

    function Ib(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      var e = 0,
          f = 0,
          g = 0,
          h = 0;
      f = d + 4 | 0;
      g = Rc(a | 0, c | 0, 52) | 0;
      G() | 0;
      g = g & 15;
      h = Rc(a | 0, c | 0, 45) | 0;
      G() | 0;
      e = (g | 0) == 0;

      if (!(la(h & 127) | 0)) {
        if (e) {
          h = 0;
          return h | 0;
        }

        if ((b[f >> 2] | 0) == 0 ? (b[d + 8 >> 2] | 0) == 0 : 0) { e = (b[d + 12 >> 2] | 0) != 0 & 1; }else { e = 1; }
      } else if (e) {
        h = 1;
        return h | 0;
      } else { e = 1; }

      d = 1;

      while (1) {
        if (!(d & 1)) { Ja(f); }else { Ia(f); }
        h = Rc(a | 0, c | 0, (15 - d | 0) * 3 | 0) | 0;
        G() | 0;
        Ka(f, h & 7);
        if (d >>> 0 < g >>> 0) { d = d + 1 | 0; }else { break; }
      }

      return e | 0;
    }

    function Jb(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      var e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0,
          j = 0,
          k = 0,
          l = 0;
      l = S;
      S = S + 16 | 0;
      j = l;
      k = Rc(a | 0, c | 0, 45) | 0;
      G() | 0;
      k = k & 127;

      a: do { if ((la(k) | 0) != 0 ? (g = Rc(a | 0, c | 0, 52) | 0, G() | 0, g = g & 15, (g | 0) != 0) : 0) {
        e = 1;

        b: while (1) {
          i = Rc(a | 0, c | 0, (15 - e | 0) * 3 | 0) | 0;
          G() | 0;

          switch (i & 7) {
            case 5:
              break b;

            case 0:
              break;

            default:
              {
                e = c;
                break a;
              }
          }

          if (e >>> 0 < g >>> 0) { e = e + 1 | 0; }else {
            e = c;
            break a;
          }
        }

        f = 1;
        e = c;

        while (1) {
          c = (15 - f | 0) * 3 | 0;
          h = Sc(7, 0, c | 0) | 0;
          i = e & ~(G() | 0);
          e = Rc(a | 0, e | 0, c | 0) | 0;
          G() | 0;
          e = Sc(Oa(e & 7) | 0, 0, c | 0) | 0;
          a = a & ~h | e;
          e = i | (G() | 0);
          if (f >>> 0 < g >>> 0) { f = f + 1 | 0; }else { break; }
        }
      } else { e = c; } } while (0);

      i = 7728 + (k * 28 | 0) | 0;
      b[d >> 2] = b[i >> 2];
      b[d + 4 >> 2] = b[i + 4 >> 2];
      b[d + 8 >> 2] = b[i + 8 >> 2];
      b[d + 12 >> 2] = b[i + 12 >> 2];

      if (!(Ib(a, e, d) | 0)) {
        S = l;
        return;
      }

      h = d + 4 | 0;
      b[j >> 2] = b[h >> 2];
      b[j + 4 >> 2] = b[h + 4 >> 2];
      b[j + 8 >> 2] = b[h + 8 >> 2];
      g = Rc(a | 0, e | 0, 52) | 0;
      G() | 0;
      i = g & 15;
      if (!(g & 1)) { g = i; }else {
        Ja(h);
        g = i + 1 | 0;
      }
      if (!(la(k) | 0)) { e = 0; }else {
        c: do { if (!i) { e = 0; }else {
          c = 1;

          while (1) {
            f = Rc(a | 0, e | 0, (15 - c | 0) * 3 | 0) | 0;
            G() | 0;
            f = f & 7;

            if (f | 0) {
              e = f;
              break c;
            }

            if (c >>> 0 < i >>> 0) { c = c + 1 | 0; }else {
              e = 0;
              break;
            }
          }
        } } while (0);

        e = (e | 0) == 4 & 1;
      }

      if (!(ab(d, g, e, 0) | 0)) {
        if ((g | 0) != (i | 0)) {
          b[h >> 2] = b[j >> 2];
          b[h + 4 >> 2] = b[j + 4 >> 2];
          b[h + 8 >> 2] = b[j + 8 >> 2];
        }
      } else {
        if (la(k) | 0) { do {} while ((ab(d, g, 0, 0) | 0) != 0); }
        if ((g | 0) != (i | 0)) { Ha(h); }
      }

      S = l;
      return;
    }

    function Kb(a, b, c) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      var d = 0,
          e = 0;
      d = S;
      S = S + 16 | 0;
      e = d;
      Jb(a, b, e);
      b = Rc(a | 0, b | 0, 52) | 0;
      G() | 0;
      Za(e, b & 15, c);
      S = d;
      return;
    }

    function Lb(a, b, c) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      var d = 0,
          e = 0,
          f = 0,
          g = 0,
          h = 0;
      h = S;
      S = S + 16 | 0;
      f = h;
      Jb(a, b, f);
      g = Rc(a | 0, b | 0, 52) | 0;
      G() | 0;
      g = g & 15;
      e = Rc(a | 0, b | 0, 45) | 0;
      G() | 0;

      if (!(la(e & 127) | 0)) {
        b = 0;
        cb(f, g, b, c);
        S = h;
        return;
      }

      a: do { if (!g) { d = 0; }else {
        e = 1;

        while (1) {
          d = Rc(a | 0, b | 0, (15 - e | 0) * 3 | 0) | 0;
          G() | 0;
          d = d & 7;
          if (d | 0) { break a; }
          if (e >>> 0 < g >>> 0) { e = e + 1 | 0; }else {
            d = 0;
            break;
          }
        }
      } } while (0);

      b = (d | 0) == 0 & 1;
      cb(f, g, b, c);
      S = h;
      return;
    }

    function Mb(a, b) {
      a = a | 0;
      b = b | 0;
      var c = 0,
          d = 0,
          e = 0;
      d = Rc(a | 0, b | 0, 45) | 0;
      G() | 0;

      if (!(la(d & 127) | 0)) {
        d = 2;
        return d | 0;
      }

      d = Rc(a | 0, b | 0, 52) | 0;
      G() | 0;
      d = d & 15;

      if (!d) {
        d = 5;
        return d | 0;
      }

      c = 1;

      while (1) {
        e = Sc(7, 0, (15 - c | 0) * 3 | 0) | 0;

        if (!((e & a | 0) == 0 & ((G() | 0) & b | 0) == 0)) {
          c = 2;
          a = 6;
          break;
        }

        if (c >>> 0 < d >>> 0) { c = c + 1 | 0; }else {
          c = 5;
          a = 6;
          break;
        }
      }

      if ((a | 0) == 6) { return c | 0; }
      return 0;
    }

    function Nb(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      var e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0,
          j = 0,
          k = 0,
          l = 0,
          m = 0;
      m = S;
      S = S + 128 | 0;
      k = m + 112 | 0;
      g = m + 96 | 0;
      l = m;
      f = Rc(a | 0, c | 0, 52) | 0;
      G() | 0;
      i = f & 15;
      b[k >> 2] = i;
      h = Rc(a | 0, c | 0, 45) | 0;
      G() | 0;
      h = h & 127;

      a: do { if (la(h) | 0) {
        if (i | 0) {
          e = 1;

          while (1) {
            j = Sc(7, 0, (15 - e | 0) * 3 | 0) | 0;

            if (!((j & a | 0) == 0 & ((G() | 0) & c | 0) == 0)) {
              f = 0;
              break a;
            }

            if (e >>> 0 < i >>> 0) { e = e + 1 | 0; }else { break; }
          }
        }

        if (!(f & 1)) {
          j = Sc(i + 1 | 0, 0, 52) | 0;
          l = G() | 0 | c & -15728641;
          k = Sc(7, 0, (14 - i | 0) * 3 | 0) | 0;
          Nb((j | a) & ~k, l & ~(G() | 0), d);
          S = m;
          return;
        } else { f = 1; }
      } else { f = 0; } } while (0);

      Jb(a, c, g);

      if (f) {
        $a(g, k, l);
        j = 5;
      } else {
        db(g, k, l);
        j = 6;
      }

      b: do { if (la(h) | 0) {
        if (!i) { e = 20; }else {
          e = 1;

          while (1) {
            h = Sc(7, 0, (15 - e | 0) * 3 | 0) | 0;

            if (!((h & a | 0) == 0 & ((G() | 0) & c | 0) == 0)) {
              e = 8;
              break b;
            }

            if (e >>> 0 < i >>> 0) { e = e + 1 | 0; }else {
              e = 20;
              break;
            }
          }
        }
      } else { e = 8; } } while (0);

      Wc(d | 0, -1, e | 0) | 0;

      if (f) {
        f = 0;

        do {
          g = l + (f << 4) | 0;
          bb(g, b[k >> 2] | 0) | 0;
          g = b[g >> 2] | 0;
          e = 0;

          while (1) {
            h = d + (e << 2) | 0;
            i = b[h >> 2] | 0;
            if ((i | 0) == -1 | (i | 0) == (g | 0)) { break; }else { e = e + 1 | 0; }
          }

          b[h >> 2] = g;
          f = f + 1 | 0;
        } while ((f | 0) != (j | 0));
      } else {
        f = 0;

        do {
          g = l + (f << 4) | 0;
          ab(g, b[k >> 2] | 0, 0, 1) | 0;
          g = b[g >> 2] | 0;
          e = 0;

          while (1) {
            h = d + (e << 2) | 0;
            i = b[h >> 2] | 0;
            if ((i | 0) == -1 | (i | 0) == (g | 0)) { break; }else { e = e + 1 | 0; }
          }

          b[h >> 2] = g;
          f = f + 1 | 0;
        } while ((f | 0) != (j | 0));
      }

      S = m;
      return;
    }

    function Ob() {
      return 12;
    }

    function Pb(a, c) {
      a = a | 0;
      c = c | 0;
      var d = 0,
          e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0,
          j = 0;
      Sc(a | 0, 0, 52) | 0;
      i = G() | 0 | 134225919;

      if ((a | 0) < 1) {
        e = 0;
        d = 0;

        do {
          if (la(e) | 0) {
            Sc(e | 0, 0, 45) | 0;
            h = i | (G() | 0);
            a = c + (d << 3) | 0;
            b[a >> 2] = -1;
            b[a + 4 >> 2] = h;
            d = d + 1 | 0;
          }

          e = e + 1 | 0;
        } while ((e | 0) != 122);

        return;
      }

      h = 0;
      d = 0;

      do {
        if (la(h) | 0) {
          Sc(h | 0, 0, 45) | 0;
          e = 1;
          f = -1;
          g = i | (G() | 0);

          while (1) {
            j = Sc(7, 0, (15 - e | 0) * 3 | 0) | 0;
            f = f & ~j;
            g = g & ~(G() | 0);
            if ((e | 0) == (a | 0)) { break; }else { e = e + 1 | 0; }
          }

          j = c + (d << 3) | 0;
          b[j >> 2] = f;
          b[j + 4 >> 2] = g;
          d = d + 1 | 0;
        }

        h = h + 1 | 0;
      } while ((h | 0) != 122);

      return;
    }

    function Qb(a, c, d, e) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      var f = 0,
          g = 0,
          h = 0,
          i = 0,
          j = 0,
          k = 0;
      i = S;
      S = S + 64 | 0;
      h = i;

      if ((a | 0) == (d | 0) & (c | 0) == (e | 0) | (0 != 0 | (c & 2013265920 | 0) != 134217728 | (0 != 0 | (e & 2013265920 | 0) != 134217728))) {
        h = 0;
        S = i;
        return h | 0;
      }

      f = Rc(a | 0, c | 0, 52) | 0;
      G() | 0;
      f = f & 15;
      g = Rc(d | 0, e | 0, 52) | 0;
      G() | 0;

      if ((f | 0) != (g & 15 | 0)) {
        h = 0;
        S = i;
        return h | 0;
      }

      g = f + -1 | 0;

      if (f >>> 0 > 1 ? (k = rb(a, c, g) | 0, j = G() | 0, g = rb(d, e, g) | 0, (k | 0) == (g | 0) & (j | 0) == (G() | 0)) : 0) {
        g = (f ^ 15) * 3 | 0;
        f = Rc(a | 0, c | 0, g | 0) | 0;
        G() | 0;
        f = f & 7;
        g = Rc(d | 0, e | 0, g | 0) | 0;
        G() | 0;
        g = g & 7;

        if ((f | 0) == 0 | (g | 0) == 0) {
          k = 1;
          S = i;
          return k | 0;
        }

        if ((b[21136 + (f << 2) >> 2] | 0) == (g | 0)) {
          k = 1;
          S = i;
          return k | 0;
        }

        if ((b[21168 + (f << 2) >> 2] | 0) == (g | 0)) {
          k = 1;
          S = i;
          return k | 0;
        }
      }

      f = h;
      g = f + 56 | 0;

      do {
        b[f >> 2] = 0;
        f = f + 4 | 0;
      } while ((f | 0) < (g | 0));

      $(a, c, 1, h);
      k = h;

      if (((((!((b[k >> 2] | 0) == (d | 0) ? (b[k + 4 >> 2] | 0) == (e | 0) : 0) ? (k = h + 8 | 0, !((b[k >> 2] | 0) == (d | 0) ? (b[k + 4 >> 2] | 0) == (e | 0) : 0)) : 0) ? (k = h + 16 | 0, !((b[k >> 2] | 0) == (d | 0) ? (b[k + 4 >> 2] | 0) == (e | 0) : 0)) : 0) ? (k = h + 24 | 0, !((b[k >> 2] | 0) == (d | 0) ? (b[k + 4 >> 2] | 0) == (e | 0) : 0)) : 0) ? (k = h + 32 | 0, !((b[k >> 2] | 0) == (d | 0) ? (b[k + 4 >> 2] | 0) == (e | 0) : 0)) : 0) ? (k = h + 40 | 0, !((b[k >> 2] | 0) == (d | 0) ? (b[k + 4 >> 2] | 0) == (e | 0) : 0)) : 0) {
        f = h + 48 | 0;
        f = ((b[f >> 2] | 0) == (d | 0) ? (b[f + 4 >> 2] | 0) == (e | 0) : 0) & 1;
      } else { f = 1; }

      k = f;
      S = i;
      return k | 0;
    }

    function Rb(a, c, d, e) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      var f = 0,
          g = 0,
          h = 0,
          i = 0;
      h = S;
      S = S + 16 | 0;
      f = h;

      if (!(Qb(a, c, d, e) | 0)) {
        a = 0;
        g = 0;
        F(a | 0);
        S = h;
        return g | 0;
      }

      g = c & -2130706433;
      b[f >> 2] = 0;
      i = da(a, c, 1, f) | 0;

      if (!((i | 0) == (d | 0) & (G() | 0) == (e | 0))) {
        b[f >> 2] = 0;
        i = da(a, c, 2, f) | 0;

        if (!((i | 0) == (d | 0) & (G() | 0) == (e | 0))) {
          b[f >> 2] = 0;
          i = da(a, c, 3, f) | 0;

          if (!((i | 0) == (d | 0) & (G() | 0) == (e | 0))) {
            b[f >> 2] = 0;
            i = da(a, c, 4, f) | 0;

            if (!((i | 0) == (d | 0) & (G() | 0) == (e | 0))) {
              b[f >> 2] = 0;
              i = da(a, c, 5, f) | 0;

              if (!((i | 0) == (d | 0) & (G() | 0) == (e | 0))) {
                b[f >> 2] = 0;
                i = da(a, c, 6, f) | 0;

                if ((i | 0) == (d | 0) & (G() | 0) == (e | 0)) {
                  c = 0;
                  d = 100663296;
                } else {
                  g = 0;
                  i = 0;
                  F(g | 0);
                  S = h;
                  return i | 0;
                }
              } else {
                c = 0;
                d = 83886080;
              }
            } else {
              c = 0;
              d = 67108864;
            }
          } else {
            c = 0;
            d = 50331648;
          }
        } else {
          c = 0;
          d = 33554432;
        }
      } else {
        c = 0;
        d = 16777216;
      }

      g = g | d | 268435456;
      i = a | c;
      F(g | 0);
      S = h;
      return i | 0;
    }

    function Sb(a, b) {
      a = a | 0;
      b = b | 0;
      var c = 0;
      c = 0 == 0 & (b & 2013265920 | 0) == 268435456;
      F((c ? b & -2130706433 | 134217728 : 0) | 0);
      return (c ? a : 0) | 0;
    }

    function Tb(a, c) {
      a = a | 0;
      c = c | 0;
      var d = 0,
          e = 0,
          f = 0;
      e = S;
      S = S + 16 | 0;
      d = e;

      if (!(0 == 0 & (c & 2013265920 | 0) == 268435456)) {
        c = 0;
        d = 0;
        F(c | 0);
        S = e;
        return d | 0;
      }

      f = Rc(a | 0, c | 0, 56) | 0;
      G() | 0;
      b[d >> 2] = 0;
      d = da(a, c & -2130706433 | 134217728, f & 7, d) | 0;
      c = G() | 0;
      F(c | 0);
      S = e;
      return d | 0;
    }

    function Ub(a, b) {
      a = a | 0;
      b = b | 0;
      var c = 0;

      if (!(0 == 0 & (b & 2013265920 | 0) == 268435456)) {
        c = 0;
        return c | 0;
      }

      c = Rc(a | 0, b | 0, 56) | 0;
      G() | 0;

      switch (c & 7) {
        case 0:
        case 7:
          {
            c = 0;
            return c | 0;
          }

        default:

      }

      c = b & -2130706433 | 134217728;

      if (0 == 0 & (b & 117440512 | 0) == 16777216 & (ub(a, c) | 0) != 0) {
        c = 0;
        return c | 0;
      }

      c = qb(a, c) | 0;
      return c | 0;
    }

    function Vb(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      var e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0;
      g = S;
      S = S + 16 | 0;
      e = g;
      h = 0 == 0 & (c & 2013265920 | 0) == 268435456;
      f = c & -2130706433 | 134217728;
      i = d;
      b[i >> 2] = h ? a : 0;
      b[i + 4 >> 2] = h ? f : 0;

      if (h) {
        c = Rc(a | 0, c | 0, 56) | 0;
        G() | 0;
        b[e >> 2] = 0;
        a = da(a, f, c & 7, e) | 0;
        c = G() | 0;
      } else {
        a = 0;
        c = 0;
      }

      i = d + 8 | 0;
      b[i >> 2] = a;
      b[i + 4 >> 2] = c;
      S = g;
      return;
    }

    function Wb(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      var e = 0,
          f = 0;
      f = (ub(a, c) | 0) == 0;
      c = c & -2130706433;
      e = d;
      b[e >> 2] = f ? a : 0;
      b[e + 4 >> 2] = f ? c | 285212672 : 0;
      e = d + 8 | 0;
      b[e >> 2] = a;
      b[e + 4 >> 2] = c | 301989888;
      e = d + 16 | 0;
      b[e >> 2] = a;
      b[e + 4 >> 2] = c | 318767104;
      e = d + 24 | 0;
      b[e >> 2] = a;
      b[e + 4 >> 2] = c | 335544320;
      e = d + 32 | 0;
      b[e >> 2] = a;
      b[e + 4 >> 2] = c | 352321536;
      d = d + 40 | 0;
      b[d >> 2] = a;
      b[d + 4 >> 2] = c | 369098752;
      return;
    }

    function Xb(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      var e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0,
          j = 0,
          k = 0,
          l = 0;
      l = S;
      S = S + 368 | 0;
      f = l + 352 | 0;
      i = l + 184 | 0;
      j = l + 16 | 0;
      k = l;
      Wc(i | 0, 0, 168) | 0;
      Wc(j | 0, 0, 168) | 0;
      b[k >> 2] = 0;
      b[k + 4 >> 2] = 0;
      b[k + 8 >> 2] = 0;
      b[k + 12 >> 2] = 0;
      h = 0 == 0 & (c & 2013265920 | 0) == 268435456;
      e = c & -2130706433 | 134217728;
      Lb(h ? a : 0, h ? e : 0, i);

      if (h) {
        c = Rc(a | 0, c | 0, 56) | 0;
        G() | 0;
        b[f >> 2] = 0;
        a = da(a, e, c & 7, f) | 0;
        c = G() | 0;
      } else {
        a = 0;
        c = 0;
      }

      Lb(a, c, j);

      if ((b[i >> 2] | 0) <= 0) {
        k = 0;
        b[d >> 2] = k;
        S = l;
        return;
      }

      h = i + 24 | 0;
      a = 0;
      c = 0;
      g = 0;

      do {
        f = i + 8 + (g << 4) | 0;

        a: do { if ((b[j >> 2] | 0) > 0) {
          e = 0;

          while (1) {
            if (fb(f, j + 8 + (e << 4) | 0, 1.0e-06) | 0) { break; }
            e = e + 1 | 0;
            if ((e | 0) >= (b[j >> 2] | 0)) { break a; }
          }

          b: do { if (!g) {
            if ((b[j >> 2] | 0) > 0) {
              e = 0;

              do {
                if (fb(h, j + 8 + (e << 4) | 0, 1.0e-06) | 0) { break b; }
                e = e + 1 | 0;
              } while ((e | 0) < (b[j >> 2] | 0));
            }
            b[k >> 2] = b[f >> 2];
            b[k + 4 >> 2] = b[f + 4 >> 2];
            b[k + 8 >> 2] = b[f + 8 >> 2];
            b[k + 12 >> 2] = b[f + 12 >> 2];
            c = 1;
            break a;
          } } while (0);

          e = d + 8 + (a << 4) | 0;
          b[e >> 2] = b[f >> 2];
          b[e + 4 >> 2] = b[f + 4 >> 2];
          b[e + 8 >> 2] = b[f + 8 >> 2];
          b[e + 12 >> 2] = b[f + 12 >> 2];
          a = a + 1 | 0;
        } } while (0);

        g = g + 1 | 0;
      } while ((g | 0) < (b[i >> 2] | 0));

      if (!c) {
        k = a;
        b[d >> 2] = k;
        S = l;
        return;
      }

      j = d + 8 + (a << 4) | 0;
      b[j >> 2] = b[k >> 2];
      b[j + 4 >> 2] = b[k + 4 >> 2];
      b[j + 8 >> 2] = b[k + 8 >> 2];
      b[j + 12 >> 2] = b[k + 12 >> 2];
      k = a + 1 | 0;
      b[d >> 2] = k;
      S = l;
      return;
    }

    function Yb(a) {
      a = a | 0;
      var c = 0,
          d = 0,
          e = 0;
      c = Lc(1, 12) | 0;
      if (!c) { H(22339, 22294, 49, 22352); }
      d = a + 4 | 0;
      e = b[d >> 2] | 0;

      if (e | 0) {
        e = e + 8 | 0;
        b[e >> 2] = c;
        b[d >> 2] = c;
        return c | 0;
      }

      if (b[a >> 2] | 0) { H(22369, 22294, 61, 22392); }
      e = a;
      b[e >> 2] = c;
      b[d >> 2] = c;
      return c | 0;
    }

    function Zb(a, c) {
      a = a | 0;
      c = c | 0;
      var d = 0,
          e = 0;
      e = Jc(24) | 0;
      if (!e) { H(22406, 22294, 78, 22420); }
      b[e >> 2] = b[c >> 2];
      b[e + 4 >> 2] = b[c + 4 >> 2];
      b[e + 8 >> 2] = b[c + 8 >> 2];
      b[e + 12 >> 2] = b[c + 12 >> 2];
      b[e + 16 >> 2] = 0;
      c = a + 4 | 0;
      d = b[c >> 2] | 0;

      if (d | 0) {
        b[d + 16 >> 2] = e;
        b[c >> 2] = e;
        return e | 0;
      }

      if (b[a >> 2] | 0) { H(22435, 22294, 82, 22420); }
      b[a >> 2] = e;
      b[c >> 2] = e;
      return e | 0;
    }

    function _b(a) {
      a = a | 0;
      var c = 0,
          d = 0,
          e = 0,
          f = 0;
      if (!a) { return; }
      e = 1;

      while (1) {
        c = b[a >> 2] | 0;
        if (c | 0) { do {
          d = b[c >> 2] | 0;
          if (d | 0) { do {
            f = d;
            d = b[d + 16 >> 2] | 0;
            Kc(f);
          } while ((d | 0) != 0); }
          f = c;
          c = b[c + 8 >> 2] | 0;
          Kc(f);
        } while ((c | 0) != 0); }
        c = a;
        a = b[a + 8 >> 2] | 0;
        if (!e) { Kc(c); }
        if (!a) { break; }else { e = 0; }
      }

      return;
    }

    function $b(a) {
      a = a | 0;
      var c = 0,
          d = 0,
          f = 0,
          g = 0,
          h = 0.0,
          i = 0,
          j = 0.0,
          k = 0.0,
          l = 0,
          m = 0,
          n = 0,
          o = 0,
          p = 0,
          r = 0,
          s = 0.0,
          t = 0.0,
          u = 0.0,
          v = 0.0,
          w = 0.0,
          x = 0.0,
          y = 0,
          z = 0,
          A = 0,
          B = 0,
          C = 0,
          D = 0,
          E = 0,
          F = 0,
          G = 0,
          I = 0,
          J = 0,
          K = 0;
      g = a + 8 | 0;

      if (b[g >> 2] | 0) {
        K = 1;
        return K | 0;
      }

      f = b[a >> 2] | 0;

      if (!f) {
        K = 0;
        return K | 0;
      }

      c = f;
      d = 0;

      do {
        d = d + 1 | 0;
        c = b[c + 8 >> 2] | 0;
      } while ((c | 0) != 0);

      if (d >>> 0 < 2) {
        K = 0;
        return K | 0;
      }

      I = Jc(d << 2) | 0;
      if (!I) { H(22455, 22294, 317, 22474); }
      G = Jc(d << 5) | 0;
      if (!G) { H(22496, 22294, 321, 22474); }
      b[a >> 2] = 0;
      z = a + 4 | 0;
      b[z >> 2] = 0;
      b[g >> 2] = 0;
      d = 0;
      F = 0;
      y = 0;
      n = 0;

      a: while (1) {
        m = b[f >> 2] | 0;

        if (m) {
          h = 0.0;
          i = m;

          do {
            k = +e[i + 8 >> 3];
            c = i;
            i = b[i + 16 >> 2] | 0;
            l = (i | 0) == 0;
            g = l ? m : i;
            j = +e[g + 8 >> 3];

            if (+q(+(k - j)) > 3.141592653589793) {
              K = 14;
              break;
            }

            h = h + (j - k) * (+e[c >> 3] + +e[g >> 3]);
          } while (!l);

          if ((K | 0) == 14) {
            K = 0;
            h = 0.0;
            c = m;

            do {
              x = +e[c + 8 >> 3];
              E = c + 16 | 0;
              D = b[E >> 2] | 0;
              D = (D | 0) == 0 ? m : D;
              w = +e[D + 8 >> 3];
              h = h + (+e[c >> 3] + +e[D >> 3]) * ((w < 0.0 ? w + 6.283185307179586 : w) - (x < 0.0 ? x + 6.283185307179586 : x));
              c = b[((c | 0) == 0 ? f : E) >> 2] | 0;
            } while ((c | 0) != 0);
          }

          if (h > 0.0) {
            b[I + (F << 2) >> 2] = f;
            F = F + 1 | 0;
            g = y;
            c = n;
          } else { K = 19; }
        } else { K = 19; }

        if ((K | 0) == 19) {
          K = 0;

          do { if (!d) {
            if (!n) {
              if (!(b[a >> 2] | 0)) {
                g = z;
                i = a;
                c = f;
                d = a;
                break;
              } else {
                K = 27;
                break a;
              }
            } else {
              g = z;
              i = n + 8 | 0;
              c = f;
              d = a;
              break;
            }
          } else {
            c = d + 8 | 0;

            if (b[c >> 2] | 0) {
              K = 21;
              break a;
            }

            d = Lc(1, 12) | 0;

            if (!d) {
              K = 23;
              break a;
            }

            b[c >> 2] = d;
            g = d + 4 | 0;
            i = d;
            c = n;
          } } while (0);

          b[i >> 2] = f;
          b[g >> 2] = f;
          i = G + (y << 5) | 0;
          l = b[f >> 2] | 0;

          if (l) {
            m = G + (y << 5) + 8 | 0;
            e[m >> 3] = 1797693134862315708145274.0e284;
            n = G + (y << 5) + 24 | 0;
            e[n >> 3] = 1797693134862315708145274.0e284;
            e[i >> 3] = -1797693134862315708145274.0e284;
            o = G + (y << 5) + 16 | 0;
            e[o >> 3] = -1797693134862315708145274.0e284;
            u = 1797693134862315708145274.0e284;
            v = -1797693134862315708145274.0e284;
            g = 0;
            p = l;
            k = 1797693134862315708145274.0e284;
            s = 1797693134862315708145274.0e284;
            t = -1797693134862315708145274.0e284;
            j = -1797693134862315708145274.0e284;

            while (1) {
              h = +e[p >> 3];
              x = +e[p + 8 >> 3];
              p = b[p + 16 >> 2] | 0;
              r = (p | 0) == 0;
              w = +e[(r ? l : p) + 8 >> 3];

              if (h < k) {
                e[m >> 3] = h;
                k = h;
              }

              if (x < s) {
                e[n >> 3] = x;
                s = x;
              }

              if (h > t) { e[i >> 3] = h; }else { h = t; }

              if (x > j) {
                e[o >> 3] = x;
                j = x;
              }

              u = x > 0.0 & x < u ? x : u;
              v = x < 0.0 & x > v ? x : v;
              g = g | +q(+(x - w)) > 3.141592653589793;
              if (r) { break; }else { t = h; }
            }

            if (g) {
              e[o >> 3] = v;
              e[n >> 3] = u;
            }
          } else {
            b[i >> 2] = 0;
            b[i + 4 >> 2] = 0;
            b[i + 8 >> 2] = 0;
            b[i + 12 >> 2] = 0;
            b[i + 16 >> 2] = 0;
            b[i + 20 >> 2] = 0;
            b[i + 24 >> 2] = 0;
            b[i + 28 >> 2] = 0;
          }

          g = y + 1 | 0;
        }

        E = f + 8 | 0;
        f = b[E >> 2] | 0;
        b[E >> 2] = 0;

        if (!f) {
          K = 45;
          break;
        } else {
          y = g;
          n = c;
        }
      }

      if ((K | 0) == 21) { H(22272, 22294, 35, 22306); }else if ((K | 0) == 23) { H(22326, 22294, 37, 22306); }else if ((K | 0) == 27) { H(22369, 22294, 61, 22392); }else if ((K | 0) == 45) {
        b: do { if ((F | 0) > 0) {
          E = (g | 0) == 0;
          C = g << 2;
          D = (a | 0) == 0;
          B = 0;
          c = 0;

          while (1) {
            A = b[I + (B << 2) >> 2] | 0;

            if (!E) {
              y = Jc(C) | 0;

              if (!y) {
                K = 50;
                break;
              }

              z = Jc(C) | 0;

              if (!z) {
                K = 52;
                break;
              }

              c: do { if (!D) {
                g = 0;
                d = 0;
                i = a;

                while (1) {
                  f = G + (g << 5) | 0;

                  if (ac(b[i >> 2] | 0, f, b[A >> 2] | 0) | 0) {
                    b[y + (d << 2) >> 2] = i;
                    b[z + (d << 2) >> 2] = f;
                    r = d + 1 | 0;
                  } else { r = d; }

                  i = b[i + 8 >> 2] | 0;
                  if (!i) { break; }else {
                    g = g + 1 | 0;
                    d = r;
                  }
                }

                if ((r | 0) > 0) {
                  f = b[y >> 2] | 0;
                  if ((r | 0) == 1) { d = f; }else {
                    o = 0;
                    p = -1;
                    d = f;
                    n = f;

                    while (1) {
                      l = b[n >> 2] | 0;
                      f = 0;
                      i = 0;

                      while (1) {
                        g = b[b[y + (i << 2) >> 2] >> 2] | 0;
                        if ((g | 0) == (l | 0)) { m = f; }else { m = f + ((ac(g, b[z + (i << 2) >> 2] | 0, b[l >> 2] | 0) | 0) & 1) | 0; }
                        i = i + 1 | 0;
                        if ((i | 0) == (r | 0)) { break; }else { f = m; }
                      }

                      g = (m | 0) > (p | 0);
                      d = g ? n : d;
                      f = o + 1 | 0;
                      if ((f | 0) == (r | 0)) { break c; }
                      o = f;
                      p = g ? m : p;
                      n = b[y + (f << 2) >> 2] | 0;
                    }
                  }
                } else { d = 0; }
              } else { d = 0; } } while (0);

              Kc(y);
              Kc(z);

              if (d) {
                g = d + 4 | 0;
                f = b[g >> 2] | 0;

                if (!f) {
                  if (b[d >> 2] | 0) {
                    K = 70;
                    break;
                  }
                } else { d = f + 8 | 0; }

                b[d >> 2] = A;
                b[g >> 2] = A;
              } else { K = 73; }
            } else { K = 73; }

            if ((K | 0) == 73) {
              K = 0;
              c = b[A >> 2] | 0;
              if (c | 0) { do {
                z = c;
                c = b[c + 16 >> 2] | 0;
                Kc(z);
              } while ((c | 0) != 0); }
              Kc(A);
              c = 2;
            }

            B = B + 1 | 0;

            if ((B | 0) >= (F | 0)) {
              J = c;
              break b;
            }
          }

          if ((K | 0) == 50) { H(22511, 22294, 249, 22530); }else if ((K | 0) == 52) { H(22549, 22294, 252, 22530); }else if ((K | 0) == 70) { H(22369, 22294, 61, 22392); }
        } else { J = 0; } } while (0);

        Kc(I);
        Kc(G);
        K = J;
        return K | 0;
      }
      return 0;
    }

    function ac(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      var f = 0.0,
          g = 0.0,
          h = 0.0,
          i = 0.0,
          j = 0.0,
          k = 0.0,
          l = 0.0,
          m = 0;

      if (!(va(c, d) | 0)) {
        a = 0;
        return a | 0;
      }

      c = ua(c) | 0;
      l = +e[d >> 3];
      f = +e[d + 8 >> 3];
      f = c & f < 0.0 ? f + 6.283185307179586 : f;
      a = b[a >> 2] | 0;

      if (!a) {
        a = 0;
        return a | 0;
      }

      if (c) {
        c = 0;
        d = a;

        a: while (1) {
          while (1) {
            i = +e[d >> 3];
            k = +e[d + 8 >> 3];
            d = d + 16 | 0;
            m = b[d >> 2] | 0;
            m = (m | 0) == 0 ? a : m;
            h = +e[m >> 3];
            g = +e[m + 8 >> 3];

            if (i > h) {
              j = i;
              i = k;
            } else {
              j = h;
              h = i;
              i = g;
              g = k;
            }

            if (!(l < h | l > j)) { break; }
            d = b[d >> 2] | 0;

            if (!d) {
              d = 22;
              break a;
            }
          }

          k = g < 0.0 ? g + 6.283185307179586 : g;
          i = i < 0.0 ? i + 6.283185307179586 : i;
          f = i == f | k == f ? f + -2.220446049250313e-16 : f;
          k = k + (l - h) / (j - h) * (i - k);
          if ((k < 0.0 ? k + 6.283185307179586 : k) > f) { c = c ^ 1; }
          d = b[d >> 2] | 0;

          if (!d) {
            d = 22;
            break;
          }
        }

        if ((d | 0) == 22) { return c | 0; }
      } else {
        c = 0;
        d = a;

        b: while (1) {
          while (1) {
            i = +e[d >> 3];
            k = +e[d + 8 >> 3];
            d = d + 16 | 0;
            m = b[d >> 2] | 0;
            m = (m | 0) == 0 ? a : m;
            h = +e[m >> 3];
            g = +e[m + 8 >> 3];

            if (i > h) {
              j = i;
              i = k;
            } else {
              j = h;
              h = i;
              i = g;
              g = k;
            }

            if (!(l < h | l > j)) { break; }
            d = b[d >> 2] | 0;

            if (!d) {
              d = 22;
              break b;
            }
          }

          f = i == f | g == f ? f + -2.220446049250313e-16 : f;
          if (g + (l - h) / (j - h) * (i - g) > f) { c = c ^ 1; }
          d = b[d >> 2] | 0;

          if (!d) {
            d = 22;
            break;
          }
        }

        if ((d | 0) == 22) { return c | 0; }
      }

      return 0;
    }

    function bc(c, d, e, f, g) {
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      g = g | 0;
      var h = 0,
          i = 0,
          j = 0,
          k = 0,
          l = 0,
          m = 0,
          n = 0,
          o = 0,
          p = 0,
          q = 0,
          r = 0,
          s = 0,
          t = 0,
          u = 0;
      u = S;
      S = S + 32 | 0;
      t = u + 16 | 0;
      s = u;
      h = Rc(c | 0, d | 0, 52) | 0;
      G() | 0;
      h = h & 15;
      p = Rc(e | 0, f | 0, 52) | 0;
      G() | 0;

      if ((h | 0) != (p & 15 | 0)) {
        t = 1;
        S = u;
        return t | 0;
      }

      l = Rc(c | 0, d | 0, 45) | 0;
      G() | 0;
      l = l & 127;
      m = Rc(e | 0, f | 0, 45) | 0;
      G() | 0;
      m = m & 127;
      p = (l | 0) != (m | 0);

      if (p) {
        j = ra(l, m) | 0;

        if ((j | 0) == 7) {
          t = 2;
          S = u;
          return t | 0;
        }

        k = ra(m, l) | 0;
        if ((k | 0) == 7) { H(22573, 22597, 151, 22607); }else {
          q = j;
          i = k;
        }
      } else {
        q = 0;
        i = 0;
      }

      n = la(l) | 0;
      o = la(m) | 0;
      b[t >> 2] = 0;
      b[t + 4 >> 2] = 0;
      b[t + 8 >> 2] = 0;
      b[t + 12 >> 2] = 0;

      do { if (!q) {
        Ib(e, f, t) | 0;

        if ((n | 0) != 0 & (o | 0) != 0) {
          if ((m | 0) != (l | 0)) { H(22725, 22597, 243, 22607); }
          i = Ab(c, d) | 0;
          h = Ab(e, f) | 0;

          if (!(a[22032 + (i * 7 | 0) + h >> 0] | 0)) {
            i = b[21200 + (i * 28 | 0) + (h << 2) >> 2] | 0;

            if ((i | 0) > 0) {
              j = t + 4 | 0;
              h = 0;

              do {
                Ma(j);
                h = h + 1 | 0;
              } while ((h | 0) != (i | 0));

              r = 50;
            } else { r = 50; }
          } else { h = 5; }
        } else { r = 50; }
      } else {
        m = b[4304 + (l * 28 | 0) + (q << 2) >> 2] | 0;
        j = (m | 0) > 0;
        if (!o) {
          if (j) {
            l = 0;
            k = e;
            j = f;

            do {
              k = Eb(k, j) | 0;
              j = G() | 0;
              i = Oa(i) | 0;
              l = l + 1 | 0;
            } while ((l | 0) != (m | 0));

            m = i;
            l = k;
            k = j;
          } else {
            m = i;
            l = e;
            k = f;
          }
        } else if (j) {
          l = 0;
          k = e;
          j = f;

          do {
            k = Db(k, j) | 0;
            j = G() | 0;
            i = Oa(i) | 0;
            if ((i | 0) == 1) { i = Oa(1) | 0; }
            l = l + 1 | 0;
          } while ((l | 0) != (m | 0));

          m = i;
          l = k;
          k = j;
        } else {
          m = i;
          l = e;
          k = f;
        }
        Ib(l, k, t) | 0;
        if (!p) { H(22620, 22597, 181, 22607); }
        j = (n | 0) != 0;
        i = (o | 0) != 0;
        if (j & i) { H(22647, 22597, 182, 22607); }
        if (!j) {
          if (i) {
            i = Ab(l, k) | 0;

            if (a[22032 + (i * 7 | 0) + m >> 0] | 0) {
              h = 4;
              break;
            }

            l = 0;
            k = b[21200 + (m * 28 | 0) + (i << 2) >> 2] | 0;
            r = 26;
          } else { i = 0; }
        } else {
          i = Ab(c, d) | 0;

          if (a[22032 + (i * 7 | 0) + q >> 0] | 0) {
            h = 3;
            break;
          }

          k = b[21200 + (i * 28 | 0) + (q << 2) >> 2] | 0;
          l = k;
          r = 26;
        }

        if ((r | 0) == 26) {
          if ((k | 0) <= -1) { H(22678, 22597, 212, 22607); }
          if ((l | 0) <= -1) { H(22701, 22597, 213, 22607); }

          if ((k | 0) > 0) {
            j = t + 4 | 0;
            i = 0;

            do {
              Ma(j);
              i = i + 1 | 0;
            } while ((i | 0) != (k | 0));

            i = l;
          } else { i = l; }
        }
        b[s >> 2] = 0;
        b[s + 4 >> 2] = 0;
        b[s + 8 >> 2] = 0;
        Ka(s, q);
        if (h | 0) { while (1) {
          if (!(Gb(h) | 0)) { Ja(s); }else { Ia(s); }
          if ((h | 0) > 1) { h = h + -1 | 0; }else { break; }
        } }

        if ((i | 0) > 0) {
          h = 0;

          do {
            Ma(s);
            h = h + 1 | 0;
          } while ((h | 0) != (i | 0));
        }

        r = t + 4 | 0;
        Ca(r, s, r);
        Aa(r);
        r = 50;
      } } while (0);

      if ((r | 0) == 50) {
        h = t + 4 | 0;
        b[g >> 2] = b[h >> 2];
        b[g + 4 >> 2] = b[h + 4 >> 2];
        b[g + 8 >> 2] = b[h + 8 >> 2];
        h = 0;
      }

      t = h;
      S = u;
      return t | 0;
    }

    function cc(a, c, d, e) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      var f = 0,
          g = 0,
          h = 0,
          i = 0,
          j = 0,
          k = 0,
          l = 0,
          m = 0,
          n = 0,
          o = 0,
          p = 0,
          q = 0,
          r = 0,
          s = 0,
          t = 0;
      p = S;
      S = S + 48 | 0;
      h = p + 36 | 0;
      i = p + 24 | 0;
      j = p + 12 | 0;
      k = p;
      g = Rc(a | 0, c | 0, 52) | 0;
      G() | 0;
      g = g & 15;
      n = Rc(a | 0, c | 0, 45) | 0;
      G() | 0;
      n = n & 127;
      l = la(n) | 0;
      Sc(g | 0, 0, 52) | 0;
      r = G() | 0 | 134225919;
      q = e;
      b[q >> 2] = -1;
      b[q + 4 >> 2] = r;

      if (!g) {
        if ((b[d >> 2] | 0) > 1) {
          r = 1;
          S = p;
          return r | 0;
        }

        if ((b[d + 4 >> 2] | 0) > 1) {
          r = 1;
          S = p;
          return r | 0;
        }

        if ((b[d + 8 >> 2] | 0) > 1) {
          r = 1;
          S = p;
          return r | 0;
        }

        f = qa(n, Fa(d) | 0) | 0;

        if ((f | 0) == 127) {
          r = 1;
          S = p;
          return r | 0;
        }

        o = Sc(f | 0, 0, 45) | 0;
        q = G() | 0;
        n = e;
        q = b[n + 4 >> 2] & -1040385 | q;
        r = e;
        b[r >> 2] = b[n >> 2] | o;
        b[r + 4 >> 2] = q;
        r = 0;
        S = p;
        return r | 0;
      }
      b[h >> 2] = b[d >> 2];
      b[h + 4 >> 2] = b[d + 4 >> 2];
      b[h + 8 >> 2] = b[d + 8 >> 2];

      while (1) {
        b[i >> 2] = b[h >> 2];
        b[i + 4 >> 2] = b[h + 4 >> 2];
        b[i + 8 >> 2] = b[h + 8 >> 2];

        if (!(Gb(g) | 0)) {
          Ha(h);
          b[j >> 2] = b[h >> 2];
          b[j + 4 >> 2] = b[h + 4 >> 2];
          b[j + 8 >> 2] = b[h + 8 >> 2];
          Ja(j);
        } else {
          Ga(h);
          b[j >> 2] = b[h >> 2];
          b[j + 4 >> 2] = b[h + 4 >> 2];
          b[j + 8 >> 2] = b[h + 8 >> 2];
          Ia(j);
        }

        Da(i, j, k);
        Aa(k);
        q = e;
        s = b[q >> 2] | 0;
        q = b[q + 4 >> 2] | 0;
        t = (15 - g | 0) * 3 | 0;
        d = Sc(7, 0, t | 0) | 0;
        q = q & ~(G() | 0);
        t = Sc(Fa(k) | 0, 0, t | 0) | 0;
        q = G() | 0 | q;
        r = e;
        b[r >> 2] = t | s & ~d;
        b[r + 4 >> 2] = q;
        if ((g | 0) > 1) { g = g + -1 | 0; }else { break; }
      }

      a: do { if (((b[h >> 2] | 0) <= 1 ? (b[h + 4 >> 2] | 0) <= 1 : 0) ? (b[h + 8 >> 2] | 0) <= 1 : 0) {
        g = Fa(h) | 0;
        i = qa(n, g) | 0;
        if ((i | 0) == 127) { k = 0; }else { k = la(i) | 0; }

        b: do { if (!g) {
          if ((l | 0) != 0 & (k | 0) != 0) {
            t = Ab(a, c) | 0;
            g = e;
            g = 21408 + (t * 28 | 0) + ((Ab(b[g >> 2] | 0, b[g + 4 >> 2] | 0) | 0) << 2) | 0;
            g = b[g >> 2] | 0;
            if ((g | 0) <= -1) { H(22849, 22597, 433, 22782); }

            if (!g) {
              f = i;
              g = 55;
            } else {
              h = e;
              f = 0;
              d = b[h >> 2] | 0;
              h = b[h + 4 >> 2] | 0;

              do {
                d = Cb(d, h) | 0;
                h = G() | 0;
                t = e;
                b[t >> 2] = d;
                b[t + 4 >> 2] = h;
                f = f + 1 | 0;
              } while ((f | 0) < (g | 0));

              f = i;
              g = 54;
            }
          } else {
            f = i;
            g = 54;
          }
        } else {
          if (l) {
            h = 21408 + ((Ab(a, c) | 0) * 28 | 0) + (g << 2) | 0;
            h = b[h >> 2] | 0;

            if ((h | 0) > 0) {
              d = 0;

              do {
                g = Na(g) | 0;
                d = d + 1 | 0;
              } while ((d | 0) != (h | 0));
            }

            if ((g | 0) == 1) {
              f = 3;
              break a;
            }

            d = qa(n, g) | 0;
            if ((d | 0) == 127) { H(22752, 22597, 376, 22782); }

            if (!(la(d) | 0)) {
              o = h;
              m = g;
              f = d;
            } else { H(22795, 22597, 377, 22782); }
          } else {
            o = 0;
            m = g;
            f = i;
          }

          j = b[4304 + (n * 28 | 0) + (m << 2) >> 2] | 0;
          if ((j | 0) <= -1) { H(22826, 22597, 384, 22782); }

          if (!k) {
            if ((o | 0) <= -1) { H(22678, 22597, 417, 22782); }

            if (o | 0) {
              h = e;
              g = 0;
              d = b[h >> 2] | 0;
              h = b[h + 4 >> 2] | 0;

              do {
                d = Cb(d, h) | 0;
                h = G() | 0;
                t = e;
                b[t >> 2] = d;
                b[t + 4 >> 2] = h;
                g = g + 1 | 0;
              } while ((g | 0) < (o | 0));
            }

            if ((j | 0) <= 0) {
              g = 54;
              break;
            }

            h = e;
            g = 0;
            d = b[h >> 2] | 0;
            h = b[h + 4 >> 2] | 0;

            while (1) {
              d = Cb(d, h) | 0;
              h = G() | 0;
              t = e;
              b[t >> 2] = d;
              b[t + 4 >> 2] = h;
              g = g + 1 | 0;

              if ((g | 0) == (j | 0)) {
                g = 54;
                break b;
              }
            }
          }

          i = ra(f, n) | 0;
          if ((i | 0) == 7) { H(22573, 22597, 393, 22782); }
          g = e;
          d = b[g >> 2] | 0;
          g = b[g + 4 >> 2] | 0;

          if ((j | 0) > 0) {
            h = 0;

            do {
              d = Cb(d, g) | 0;
              g = G() | 0;
              t = e;
              b[t >> 2] = d;
              b[t + 4 >> 2] = g;
              h = h + 1 | 0;
            } while ((h | 0) != (j | 0));
          }

          d = Ab(d, g) | 0;
          t = ma(f) | 0;
          d = b[(t ? 21824 : 21616) + (i * 28 | 0) + (d << 2) >> 2] | 0;
          if ((d | 0) <= -1) { H(22678, 22597, 412, 22782); }
          if (!d) { g = 54; }else {
            i = e;
            g = 0;
            h = b[i >> 2] | 0;
            i = b[i + 4 >> 2] | 0;

            do {
              h = Bb(h, i) | 0;
              i = G() | 0;
              t = e;
              b[t >> 2] = h;
              b[t + 4 >> 2] = i;
              g = g + 1 | 0;
            } while ((g | 0) < (d | 0));

            g = 54;
          }
        } } while (0);

        if ((g | 0) == 54) { if (k) { g = 55; } }

        if ((g | 0) == 55) {
          t = e;

          if ((Ab(b[t >> 2] | 0, b[t + 4 >> 2] | 0) | 0) == 1) {
            f = 4;
            break;
          }
        }

        t = e;
        r = b[t >> 2] | 0;
        t = b[t + 4 >> 2] & -1040385;
        s = Sc(f | 0, 0, 45) | 0;
        t = t | (G() | 0);
        f = e;
        b[f >> 2] = r | s;
        b[f + 4 >> 2] = t;
        f = 0;
      } else { f = 2; } } while (0);

      t = f;
      S = p;
      return t | 0;
    }

    function dc(a, b, c, d, e) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      var f = 0,
          g = 0;
      g = S;
      S = S + 16 | 0;
      f = g;
      a = bc(a, b, c, d, f) | 0;

      if (!a) {
        Sa(f, e);
        a = 0;
      }

      S = g;
      return a | 0;
    }

    function ec(a, b, c, d) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      var e = 0,
          f = 0;
      e = S;
      S = S + 16 | 0;
      f = e;
      Ta(c, f);
      d = cc(a, b, f, d) | 0;
      S = e;
      return d | 0;
    }

    function fc(a, b, c, d) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      var e = 0,
          f = 0,
          g = 0;
      g = S;
      S = S + 32 | 0;
      e = g + 12 | 0;
      f = g;
      if ((bc(a, b, a, b, e) | 0) == 0 ? (bc(a, b, c, d, f) | 0) == 0 : 0) { a = Ra(e, f) | 0; }else { a = -1; }
      S = g;
      return a | 0;
    }

    function gc(a, b, c, d) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      var e = 0,
          f = 0,
          g = 0;
      g = S;
      S = S + 32 | 0;
      e = g + 12 | 0;
      f = g;
      if ((bc(a, b, a, b, e) | 0) == 0 ? (bc(a, b, c, d, f) | 0) == 0 : 0) { a = Ra(e, f) | 0; }else { a = -1; }
      S = g;
      return (a >>> 31 ^ 1) + a | 0;
    }

    function hc(a, c, d, e, f) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
          h = 0,
          i = 0.0,
          j = 0.0,
          k = 0,
          l = 0,
          m = 0,
          n = 0,
          o = 0.0,
          p = 0.0,
          r = 0.0,
          s = 0,
          t = 0,
          u = 0,
          v = 0,
          w = 0,
          x = 0,
          y = 0.0;
      x = S;
      S = S + 48 | 0;
      g = x + 24 | 0;
      h = x + 12 | 0;
      w = x;

      if ((bc(a, c, a, c, g) | 0) == 0 ? (bc(a, c, d, e, h) | 0) == 0 : 0) {
        v = Ra(g, h) | 0;

        if ((v | 0) < 0) {
          w = v;
          S = x;
          return w | 0;
        }
        b[g >> 2] = 0;
        b[g + 4 >> 2] = 0;
        b[g + 8 >> 2] = 0;
        b[h >> 2] = 0;
        b[h + 4 >> 2] = 0;
        b[h + 8 >> 2] = 0;
        bc(a, c, a, c, g) | 0;
        bc(a, c, d, e, h) | 0;
        Ua(g);
        Ua(h);

        if (!v) {
          e = g + 4 | 0;
          n = g + 8 | 0;
          s = e;
          t = n;
          u = g;
          d = b[g >> 2] | 0;
          e = b[e >> 2] | 0;
          g = b[n >> 2] | 0;
          p = 0.0;
          r = 0.0;
          o = 0.0;
        } else {
          l = b[g >> 2] | 0;
          o = +(v | 0);
          s = g + 4 | 0;
          m = b[s >> 2] | 0;
          t = g + 8 | 0;
          n = b[t >> 2] | 0;
          u = g;
          d = l;
          e = m;
          g = n;
          p = +((b[h >> 2] | 0) - l | 0) / o;
          r = +((b[h + 4 >> 2] | 0) - m | 0) / o;
          o = +((b[h + 8 >> 2] | 0) - n | 0) / o;
        }

        b[w >> 2] = d;
        n = w + 4 | 0;
        b[n >> 2] = e;
        m = w + 8 | 0;
        b[m >> 2] = g;
        l = 0;

        while (1) {
          j = +(l | 0);
          y = p * j + +(d | 0);
          i = r * j + +(b[s >> 2] | 0);
          j = o * j + +(b[t >> 2] | 0);
          e = ~~+Uc(+y);
          h = ~~+Uc(+i);
          d = ~~+Uc(+j);
          y = +q(+(+(e | 0) - y));
          i = +q(+(+(h | 0) - i));
          j = +q(+(+(d | 0) - j));

          do { if (!(y > i & y > j)) {
            k = 0 - e | 0;

            if (i > j) {
              g = k - d | 0;
              break;
            } else {
              g = h;
              d = k - h | 0;
              break;
            }
          } else {
            e = 0 - (h + d) | 0;
            g = h;
          } } while (0);

          b[w >> 2] = e;
          b[n >> 2] = g;
          b[m >> 2] = d;
          Va(w);
          cc(a, c, w, f + (l << 3) | 0) | 0;
          if ((l | 0) == (v | 0)) { break; }
          l = l + 1 | 0;
          d = b[u >> 2] | 0;
        }

        w = 0;
        S = x;
        return w | 0;
      }

      w = -1;
      S = x;
      return w | 0;
    }

    function ic(a, b) {
      a = a | 0;
      b = b | 0;
      var c = 0;

      if (!b) {
        c = 1;
        return c | 0;
      }

      c = a;
      a = 1;

      do {
        a = B((b & 1 | 0) == 0 ? 1 : c, a) | 0;
        b = b >> 1;
        c = B(c, c) | 0;
      } while ((b | 0) != 0);

      return a | 0;
    }

    function jc(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      var f = 0.0,
          g = 0.0,
          h = 0.0,
          i = 0.0,
          j = 0.0,
          k = 0.0,
          l = 0,
          m = 0,
          n = 0,
          o = 0.0;

      if (!(va(c, d) | 0)) {
        n = 0;
        return n | 0;
      }

      c = ua(c) | 0;
      o = +e[d >> 3];
      f = +e[d + 8 >> 3];
      f = c & f < 0.0 ? f + 6.283185307179586 : f;
      n = b[a >> 2] | 0;

      if ((n | 0) <= 0) {
        n = 0;
        return n | 0;
      }

      m = b[a + 4 >> 2] | 0;

      if (c) {
        c = 0;
        d = -1;
        a = 0;

        a: while (1) {
          l = a;

          while (1) {
            i = +e[m + (l << 4) >> 3];
            k = +e[m + (l << 4) + 8 >> 3];
            a = (d + 2 | 0) % (n | 0) | 0;
            h = +e[m + (a << 4) >> 3];
            g = +e[m + (a << 4) + 8 >> 3];

            if (i > h) {
              j = i;
              i = k;
            } else {
              j = h;
              h = i;
              i = g;
              g = k;
            }

            if (!(o < h | o > j)) { break; }
            d = l + 1 | 0;

            if ((d | 0) < (n | 0)) {
              a = l;
              l = d;
              d = a;
            } else {
              d = 22;
              break a;
            }
          }

          k = g < 0.0 ? g + 6.283185307179586 : g;
          i = i < 0.0 ? i + 6.283185307179586 : i;
          f = i == f | k == f ? f + -2.220446049250313e-16 : f;
          k = k + (o - h) / (j - h) * (i - k);
          if ((k < 0.0 ? k + 6.283185307179586 : k) > f) { c = c ^ 1; }
          a = l + 1 | 0;

          if ((a | 0) >= (n | 0)) {
            d = 22;
            break;
          } else { d = l; }
        }

        if ((d | 0) == 22) { return c | 0; }
      } else {
        c = 0;
        d = -1;
        a = 0;

        b: while (1) {
          l = a;

          while (1) {
            i = +e[m + (l << 4) >> 3];
            k = +e[m + (l << 4) + 8 >> 3];
            a = (d + 2 | 0) % (n | 0) | 0;
            h = +e[m + (a << 4) >> 3];
            g = +e[m + (a << 4) + 8 >> 3];

            if (i > h) {
              j = i;
              i = k;
            } else {
              j = h;
              h = i;
              i = g;
              g = k;
            }

            if (!(o < h | o > j)) { break; }
            d = l + 1 | 0;

            if ((d | 0) < (n | 0)) {
              a = l;
              l = d;
              d = a;
            } else {
              d = 22;
              break b;
            }
          }

          f = i == f | g == f ? f + -2.220446049250313e-16 : f;
          if (g + (o - h) / (j - h) * (i - g) > f) { c = c ^ 1; }
          a = l + 1 | 0;

          if ((a | 0) >= (n | 0)) {
            d = 22;
            break;
          } else { d = l; }
        }

        if ((d | 0) == 22) { return c | 0; }
      }

      return 0;
    }

    function kc(a, c) {
      a = a | 0;
      c = c | 0;
      var d = 0.0,
          f = 0.0,
          g = 0.0,
          h = 0.0,
          i = 0.0,
          j = 0.0,
          k = 0.0,
          l = 0.0,
          m = 0.0,
          n = 0,
          o = 0,
          p = 0,
          r = 0,
          s = 0,
          t = 0,
          u = 0,
          v = 0;
      r = b[a >> 2] | 0;

      if (!r) {
        b[c >> 2] = 0;
        b[c + 4 >> 2] = 0;
        b[c + 8 >> 2] = 0;
        b[c + 12 >> 2] = 0;
        b[c + 16 >> 2] = 0;
        b[c + 20 >> 2] = 0;
        b[c + 24 >> 2] = 0;
        b[c + 28 >> 2] = 0;
        return;
      }

      s = c + 8 | 0;
      e[s >> 3] = 1797693134862315708145274.0e284;
      t = c + 24 | 0;
      e[t >> 3] = 1797693134862315708145274.0e284;
      e[c >> 3] = -1797693134862315708145274.0e284;
      u = c + 16 | 0;
      e[u >> 3] = -1797693134862315708145274.0e284;
      if ((r | 0) <= 0) { return; }
      o = b[a + 4 >> 2] | 0;
      l = 1797693134862315708145274.0e284;
      m = -1797693134862315708145274.0e284;
      n = 0;
      a = -1;
      h = 1797693134862315708145274.0e284;
      i = 1797693134862315708145274.0e284;
      k = -1797693134862315708145274.0e284;
      f = -1797693134862315708145274.0e284;
      p = 0;

      while (1) {
        d = +e[o + (p << 4) >> 3];
        j = +e[o + (p << 4) + 8 >> 3];
        a = a + 2 | 0;
        g = +e[o + (((a | 0) == (r | 0) ? 0 : a) << 4) + 8 >> 3];

        if (d < h) {
          e[s >> 3] = d;
          h = d;
        }

        if (j < i) {
          e[t >> 3] = j;
          i = j;
        }

        if (d > k) { e[c >> 3] = d; }else { d = k; }

        if (j > f) {
          e[u >> 3] = j;
          f = j;
        }

        l = j > 0.0 & j < l ? j : l;
        m = j < 0.0 & j > m ? j : m;
        n = n | +q(+(j - g)) > 3.141592653589793;
        a = p + 1 | 0;
        if ((a | 0) == (r | 0)) { break; }else {
          v = p;
          k = d;
          p = a;
          a = v;
        }
      }

      if (!n) { return; }
      e[u >> 3] = m;
      e[t >> 3] = l;
      return;
    }

    function lc(a, c) {
      a = a | 0;
      c = c | 0;
      var d = 0,
          f = 0,
          g = 0,
          h = 0.0,
          i = 0.0,
          j = 0.0,
          k = 0.0,
          l = 0.0,
          m = 0.0,
          n = 0.0,
          o = 0.0,
          p = 0.0,
          r = 0,
          s = 0,
          t = 0,
          u = 0,
          v = 0,
          w = 0,
          x = 0,
          y = 0,
          z = 0,
          A = 0;
      r = b[a >> 2] | 0;

      if (r) {
        s = c + 8 | 0;
        e[s >> 3] = 1797693134862315708145274.0e284;
        t = c + 24 | 0;
        e[t >> 3] = 1797693134862315708145274.0e284;
        e[c >> 3] = -1797693134862315708145274.0e284;
        u = c + 16 | 0;
        e[u >> 3] = -1797693134862315708145274.0e284;

        if ((r | 0) > 0) {
          g = b[a + 4 >> 2] | 0;
          o = 1797693134862315708145274.0e284;
          p = -1797693134862315708145274.0e284;
          f = 0;
          d = -1;
          k = 1797693134862315708145274.0e284;
          l = 1797693134862315708145274.0e284;
          n = -1797693134862315708145274.0e284;
          i = -1797693134862315708145274.0e284;
          v = 0;

          while (1) {
            h = +e[g + (v << 4) >> 3];
            m = +e[g + (v << 4) + 8 >> 3];
            z = d + 2 | 0;
            j = +e[g + (((z | 0) == (r | 0) ? 0 : z) << 4) + 8 >> 3];

            if (h < k) {
              e[s >> 3] = h;
              k = h;
            }

            if (m < l) {
              e[t >> 3] = m;
              l = m;
            }

            if (h > n) { e[c >> 3] = h; }else { h = n; }

            if (m > i) {
              e[u >> 3] = m;
              i = m;
            }

            o = m > 0.0 & m < o ? m : o;
            p = m < 0.0 & m > p ? m : p;
            f = f | +q(+(m - j)) > 3.141592653589793;
            d = v + 1 | 0;
            if ((d | 0) == (r | 0)) { break; }else {
              z = v;
              n = h;
              v = d;
              d = z;
            }
          }

          if (f) {
            e[u >> 3] = p;
            e[t >> 3] = o;
          }
        }
      } else {
        b[c >> 2] = 0;
        b[c + 4 >> 2] = 0;
        b[c + 8 >> 2] = 0;
        b[c + 12 >> 2] = 0;
        b[c + 16 >> 2] = 0;
        b[c + 20 >> 2] = 0;
        b[c + 24 >> 2] = 0;
        b[c + 28 >> 2] = 0;
      }

      z = a + 8 | 0;
      d = b[z >> 2] | 0;
      if ((d | 0) <= 0) { return; }
      y = a + 12 | 0;
      x = 0;

      do {
        g = b[y >> 2] | 0;
        f = x;
        x = x + 1 | 0;
        t = c + (x << 5) | 0;
        u = b[g + (f << 3) >> 2] | 0;

        if (u) {
          v = c + (x << 5) + 8 | 0;
          e[v >> 3] = 1797693134862315708145274.0e284;
          a = c + (x << 5) + 24 | 0;
          e[a >> 3] = 1797693134862315708145274.0e284;
          e[t >> 3] = -1797693134862315708145274.0e284;
          w = c + (x << 5) + 16 | 0;
          e[w >> 3] = -1797693134862315708145274.0e284;

          if ((u | 0) > 0) {
            r = b[g + (f << 3) + 4 >> 2] | 0;
            o = 1797693134862315708145274.0e284;
            p = -1797693134862315708145274.0e284;
            g = 0;
            f = -1;
            s = 0;
            k = 1797693134862315708145274.0e284;
            l = 1797693134862315708145274.0e284;
            m = -1797693134862315708145274.0e284;
            i = -1797693134862315708145274.0e284;

            while (1) {
              h = +e[r + (s << 4) >> 3];
              n = +e[r + (s << 4) + 8 >> 3];
              f = f + 2 | 0;
              j = +e[r + (((f | 0) == (u | 0) ? 0 : f) << 4) + 8 >> 3];

              if (h < k) {
                e[v >> 3] = h;
                k = h;
              }

              if (n < l) {
                e[a >> 3] = n;
                l = n;
              }

              if (h > m) { e[t >> 3] = h; }else { h = m; }

              if (n > i) {
                e[w >> 3] = n;
                i = n;
              }

              o = n > 0.0 & n < o ? n : o;
              p = n < 0.0 & n > p ? n : p;
              g = g | +q(+(n - j)) > 3.141592653589793;
              f = s + 1 | 0;
              if ((f | 0) == (u | 0)) { break; }else {
                A = s;
                s = f;
                m = h;
                f = A;
              }
            }

            if (g) {
              e[w >> 3] = p;
              e[a >> 3] = o;
            }
          }
        } else {
          b[t >> 2] = 0;
          b[t + 4 >> 2] = 0;
          b[t + 8 >> 2] = 0;
          b[t + 12 >> 2] = 0;
          b[t + 16 >> 2] = 0;
          b[t + 20 >> 2] = 0;
          b[t + 24 >> 2] = 0;
          b[t + 28 >> 2] = 0;
          d = b[z >> 2] | 0;
        }
      } while ((x | 0) < (d | 0));

      return;
    }

    function mc(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      var e = 0,
          f = 0,
          g = 0;

      if (!(jc(a, c, d) | 0)) {
        f = 0;
        return f | 0;
      }

      f = a + 8 | 0;

      if ((b[f >> 2] | 0) <= 0) {
        f = 1;
        return f | 0;
      }

      e = a + 12 | 0;
      a = 0;

      while (1) {
        g = a;
        a = a + 1 | 0;

        if (jc((b[e >> 2] | 0) + (g << 3) | 0, c + (a << 5) | 0, d) | 0) {
          a = 0;
          e = 6;
          break;
        }

        if ((a | 0) >= (b[f >> 2] | 0)) {
          a = 1;
          e = 6;
          break;
        }
      }

      if ((e | 0) == 6) { return a | 0; }
      return 0;
    }

    function nc() {
      return 8;
    }

    function oc() {
      return 16;
    }

    function pc() {
      return 168;
    }

    function qc() {
      return 8;
    }

    function rc() {
      return 16;
    }

    function sc() {
      return 12;
    }

    function tc() {
      return 8;
    }

    function uc(a) {
      a = a | 0;
      var b = 0.0,
          c = 0.0;
      c = +e[a >> 3];
      b = +e[a + 8 >> 3];
      return + +r(+(c * c + b * b));
    }

    function vc(a, b, c, d, f) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      f = f | 0;
      var g = 0.0,
          h = 0.0,
          i = 0.0,
          j = 0.0,
          k = 0.0,
          l = 0.0,
          m = 0.0,
          n = 0.0;
      k = +e[a >> 3];
      j = +e[b >> 3] - k;
      i = +e[a + 8 >> 3];
      h = +e[b + 8 >> 3] - i;
      m = +e[c >> 3];
      g = +e[d >> 3] - m;
      n = +e[c + 8 >> 3];
      l = +e[d + 8 >> 3] - n;
      g = (g * (i - n) - (k - m) * l) / (j * l - h * g);
      e[f >> 3] = k + j * g;
      e[f + 8 >> 3] = i + h * g;
      return;
    }

    function wc(a, b) {
      a = a | 0;
      b = b | 0;

      if (!(+e[a >> 3] == +e[b >> 3])) {
        b = 0;
        return b | 0;
      }

      b = +e[a + 8 >> 3] == +e[b + 8 >> 3];
      return b | 0;
    }

    function xc(a, b) {
      a = a | 0;
      b = b | 0;
      var c = 0.0,
          d = 0.0,
          f = 0.0;
      f = +e[a >> 3] - +e[b >> 3];
      d = +e[a + 8 >> 3] - +e[b + 8 >> 3];
      c = +e[a + 16 >> 3] - +e[b + 16 >> 3];
      return +(f * f + d * d + c * c);
    }

    function yc(a, b) {
      a = a | 0;
      b = b | 0;
      var c = 0.0,
          d = 0.0,
          f = 0.0;
      c = +e[a >> 3];
      d = +t(+c);
      c = +u(+c);
      e[b + 16 >> 3] = c;
      c = +e[a + 8 >> 3];
      f = d * +t(+c);
      e[b >> 3] = f;
      c = d * +u(+c);
      e[b + 8 >> 3] = c;
      return;
    }

    function zc(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      var e = 0;

      if ((c | 0) > 0) {
        e = Lc(c, 4) | 0;
        b[a >> 2] = e;
        if (!e) { H(22878, 22901, 40, 22915); }
      } else { b[a >> 2] = 0; }

      b[a + 4 >> 2] = c;
      b[a + 8 >> 2] = 0;
      b[a + 12 >> 2] = d;
      return;
    }

    function Ac(a) {
      a = a | 0;
      var c = 0,
          d = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0,
          j = 0;
      g = a + 4 | 0;
      h = a + 12 | 0;
      i = a + 8 | 0;

      a: while (1) {
        d = b[g >> 2] | 0;
        c = 0;

        while (1) {
          if ((c | 0) >= (d | 0)) { break a; }
          f = b[a >> 2] | 0;
          j = b[f + (c << 2) >> 2] | 0;
          if (!j) { c = c + 1 | 0; }else { break; }
        }

        c = f + (~~(+q(+(+s(10.0, + +(15 - (b[h >> 2] | 0) | 0)) * (+e[j >> 3] + +e[j + 8 >> 3]))) % +(d | 0)) >>> 0 << 2) | 0;
        d = b[c >> 2] | 0;

        b: do { if (d | 0) {
          f = j + 32 | 0;
          if ((d | 0) == (j | 0)) { b[c >> 2] = b[f >> 2]; }else {
            d = d + 32 | 0;
            c = b[d >> 2] | 0;
            if (!c) { break; }

            while (1) {
              if ((c | 0) == (j | 0)) { break; }
              d = c + 32 | 0;
              c = b[d >> 2] | 0;
              if (!c) { break b; }
            }

            b[d >> 2] = b[f >> 2];
          }
          Kc(j);
          b[i >> 2] = (b[i >> 2] | 0) + -1;
        } } while (0);
      }

      Kc(b[a >> 2] | 0);
      return;
    }

    function Bc(a) {
      a = a | 0;
      var c = 0,
          d = 0,
          e = 0;
      e = b[a + 4 >> 2] | 0;
      d = 0;

      while (1) {
        if ((d | 0) >= (e | 0)) {
          c = 0;
          d = 4;
          break;
        }

        c = b[(b[a >> 2] | 0) + (d << 2) >> 2] | 0;
        if (!c) { d = d + 1 | 0; }else {
          d = 4;
          break;
        }
      }

      if ((d | 0) == 4) { return c | 0; }
      return 0;
    }

    function Cc(a, c) {
      a = a | 0;
      c = c | 0;
      var d = 0,
          f = 0,
          g = 0,
          h = 0;
      d = ~~(+q(+(+s(10.0, + +(15 - (b[a + 12 >> 2] | 0) | 0)) * (+e[c >> 3] + +e[c + 8 >> 3]))) % +(b[a + 4 >> 2] | 0)) >>> 0;
      d = (b[a >> 2] | 0) + (d << 2) | 0;
      f = b[d >> 2] | 0;

      if (!f) {
        h = 1;
        return h | 0;
      }

      h = c + 32 | 0;

      do { if ((f | 0) != (c | 0)) {
        d = b[f + 32 >> 2] | 0;

        if (!d) {
          h = 1;
          return h | 0;
        }

        g = d;

        while (1) {
          if ((g | 0) == (c | 0)) {
            g = 8;
            break;
          }

          d = b[g + 32 >> 2] | 0;

          if (!d) {
            d = 1;
            g = 10;
            break;
          } else {
            f = g;
            g = d;
          }
        }

        if ((g | 0) == 8) {
          b[f + 32 >> 2] = b[h >> 2];
          break;
        } else if ((g | 0) == 10) { return d | 0; }
      } else { b[d >> 2] = b[h >> 2]; } } while (0);

      Kc(c);
      h = a + 8 | 0;
      b[h >> 2] = (b[h >> 2] | 0) + -1;
      h = 0;
      return h | 0;
    }

    function Dc(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      var f = 0,
          g = 0,
          h = 0,
          i = 0;
      h = Jc(40) | 0;
      if (!h) { H(22931, 22901, 98, 22944); }
      b[h >> 2] = b[c >> 2];
      b[h + 4 >> 2] = b[c + 4 >> 2];
      b[h + 8 >> 2] = b[c + 8 >> 2];
      b[h + 12 >> 2] = b[c + 12 >> 2];
      g = h + 16 | 0;
      b[g >> 2] = b[d >> 2];
      b[g + 4 >> 2] = b[d + 4 >> 2];
      b[g + 8 >> 2] = b[d + 8 >> 2];
      b[g + 12 >> 2] = b[d + 12 >> 2];
      b[h + 32 >> 2] = 0;
      g = ~~(+q(+(+s(10.0, + +(15 - (b[a + 12 >> 2] | 0) | 0)) * (+e[c >> 3] + +e[c + 8 >> 3]))) % +(b[a + 4 >> 2] | 0)) >>> 0;
      g = (b[a >> 2] | 0) + (g << 2) | 0;
      f = b[g >> 2] | 0;

      do { if (!f) { b[g >> 2] = h; }else {
        while (1) {
          if (gb(f, c) | 0 ? gb(f + 16 | 0, d) | 0 : 0) { break; }
          g = b[f + 32 >> 2] | 0;
          f = (g | 0) == 0 ? f : g;

          if (!(b[f + 32 >> 2] | 0)) {
            i = 10;
            break;
          }
        }

        if ((i | 0) == 10) {
          b[f + 32 >> 2] = h;
          break;
        }

        Kc(h);
        i = f;
        return i | 0;
      } } while (0);

      i = a + 8 | 0;
      b[i >> 2] = (b[i >> 2] | 0) + 1;
      i = h;
      return i | 0;
    }

    function Ec(a, c, d) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      var f = 0,
          g = 0;
      g = ~~(+q(+(+s(10.0, + +(15 - (b[a + 12 >> 2] | 0) | 0)) * (+e[c >> 3] + +e[c + 8 >> 3]))) % +(b[a + 4 >> 2] | 0)) >>> 0;
      g = b[(b[a >> 2] | 0) + (g << 2) >> 2] | 0;

      if (!g) {
        d = 0;
        return d | 0;
      }

      if (!d) {
        a = g;

        while (1) {
          if (gb(a, c) | 0) {
            f = 10;
            break;
          }

          a = b[a + 32 >> 2] | 0;

          if (!a) {
            a = 0;
            f = 10;
            break;
          }
        }

        if ((f | 0) == 10) { return a | 0; }
      }

      a = g;

      while (1) {
        if (gb(a, c) | 0 ? gb(a + 16 | 0, d) | 0 : 0) {
          f = 10;
          break;
        }

        a = b[a + 32 >> 2] | 0;

        if (!a) {
          a = 0;
          f = 10;
          break;
        }
      }

      if ((f | 0) == 10) { return a | 0; }
      return 0;
    }

    function Fc(a, c) {
      a = a | 0;
      c = c | 0;
      var d = 0;
      d = ~~(+q(+(+s(10.0, + +(15 - (b[a + 12 >> 2] | 0) | 0)) * (+e[c >> 3] + +e[c + 8 >> 3]))) % +(b[a + 4 >> 2] | 0)) >>> 0;
      a = b[(b[a >> 2] | 0) + (d << 2) >> 2] | 0;

      if (!a) {
        d = 0;
        return d | 0;
      }

      while (1) {
        if (gb(a, c) | 0) {
          c = 5;
          break;
        }

        a = b[a + 32 >> 2] | 0;

        if (!a) {
          a = 0;
          c = 5;
          break;
        }
      }

      if ((c | 0) == 5) { return a | 0; }
      return 0;
    }

    function Gc() {
      return 22960;
    }

    function Hc(a) {
      a = +a;
      return + +Xc(+a);
    }

    function Ic(a) {
      a = +a;
      return ~~+Hc(a) | 0;
    }

    function Jc(a) {
      a = a | 0;
      var c = 0,
          d = 0,
          e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0,
          j = 0,
          k = 0,
          l = 0,
          m = 0,
          n = 0,
          o = 0,
          p = 0,
          q = 0,
          r = 0,
          s = 0,
          t = 0,
          u = 0,
          v = 0,
          w = 0;
      w = S;
      S = S + 16 | 0;
      n = w;

      do { if (a >>> 0 < 245) {
        k = a >>> 0 < 11 ? 16 : a + 11 & -8;
        a = k >>> 3;
        m = b[5741] | 0;
        d = m >>> a;

        if (d & 3 | 0) {
          c = (d & 1 ^ 1) + a | 0;
          a = 23004 + (c << 1 << 2) | 0;
          d = a + 8 | 0;
          e = b[d >> 2] | 0;
          f = e + 8 | 0;
          g = b[f >> 2] | 0;
          if ((g | 0) == (a | 0)) { b[5741] = m & ~(1 << c); }else {
            b[g + 12 >> 2] = a;
            b[d >> 2] = g;
          }
          v = c << 3;
          b[e + 4 >> 2] = v | 3;
          v = e + v + 4 | 0;
          b[v >> 2] = b[v >> 2] | 1;
          v = f;
          S = w;
          return v | 0;
        }

        l = b[5743] | 0;

        if (k >>> 0 > l >>> 0) {
          if (d | 0) {
            c = 2 << a;
            c = d << a & (c | 0 - c);
            c = (c & 0 - c) + -1 | 0;
            i = c >>> 12 & 16;
            c = c >>> i;
            d = c >>> 5 & 8;
            c = c >>> d;
            g = c >>> 2 & 4;
            c = c >>> g;
            a = c >>> 1 & 2;
            c = c >>> a;
            e = c >>> 1 & 1;
            e = (d | i | g | a | e) + (c >>> e) | 0;
            c = 23004 + (e << 1 << 2) | 0;
            a = c + 8 | 0;
            g = b[a >> 2] | 0;
            i = g + 8 | 0;
            d = b[i >> 2] | 0;

            if ((d | 0) == (c | 0)) {
              a = m & ~(1 << e);
              b[5741] = a;
            } else {
              b[d + 12 >> 2] = c;
              b[a >> 2] = d;
              a = m;
            }

            v = e << 3;
            h = v - k | 0;
            b[g + 4 >> 2] = k | 3;
            f = g + k | 0;
            b[f + 4 >> 2] = h | 1;
            b[g + v >> 2] = h;

            if (l | 0) {
              e = b[5746] | 0;
              c = l >>> 3;
              d = 23004 + (c << 1 << 2) | 0;
              c = 1 << c;

              if (!(a & c)) {
                b[5741] = a | c;
                c = d;
                a = d + 8 | 0;
              } else {
                a = d + 8 | 0;
                c = b[a >> 2] | 0;
              }

              b[a >> 2] = e;
              b[c + 12 >> 2] = e;
              b[e + 8 >> 2] = c;
              b[e + 12 >> 2] = d;
            }

            b[5743] = h;
            b[5746] = f;
            v = i;
            S = w;
            return v | 0;
          }

          g = b[5742] | 0;

          if (g) {
            d = (g & 0 - g) + -1 | 0;
            f = d >>> 12 & 16;
            d = d >>> f;
            e = d >>> 5 & 8;
            d = d >>> e;
            h = d >>> 2 & 4;
            d = d >>> h;
            i = d >>> 1 & 2;
            d = d >>> i;
            j = d >>> 1 & 1;
            j = b[23268 + ((e | f | h | i | j) + (d >>> j) << 2) >> 2] | 0;
            d = j;
            i = j;
            j = (b[j + 4 >> 2] & -8) - k | 0;

            while (1) {
              a = b[d + 16 >> 2] | 0;

              if (!a) {
                a = b[d + 20 >> 2] | 0;
                if (!a) { break; }
              }

              h = (b[a + 4 >> 2] & -8) - k | 0;
              f = h >>> 0 < j >>> 0;
              d = a;
              i = f ? a : i;
              j = f ? h : j;
            }

            h = i + k | 0;

            if (h >>> 0 > i >>> 0) {
              f = b[i + 24 >> 2] | 0;
              c = b[i + 12 >> 2] | 0;

              do { if ((c | 0) == (i | 0)) {
                a = i + 20 | 0;
                c = b[a >> 2] | 0;

                if (!c) {
                  a = i + 16 | 0;
                  c = b[a >> 2] | 0;

                  if (!c) {
                    d = 0;
                    break;
                  }
                }

                while (1) {
                  e = c + 20 | 0;
                  d = b[e >> 2] | 0;

                  if (!d) {
                    e = c + 16 | 0;
                    d = b[e >> 2] | 0;
                    if (!d) { break; }else {
                      c = d;
                      a = e;
                    }
                  } else {
                    c = d;
                    a = e;
                  }
                }

                b[a >> 2] = 0;
                d = c;
              } else {
                d = b[i + 8 >> 2] | 0;
                b[d + 12 >> 2] = c;
                b[c + 8 >> 2] = d;
                d = c;
              } } while (0);

              do { if (f | 0) {
                c = b[i + 28 >> 2] | 0;
                a = 23268 + (c << 2) | 0;

                if ((i | 0) == (b[a >> 2] | 0)) {
                  b[a >> 2] = d;

                  if (!d) {
                    b[5742] = g & ~(1 << c);
                    break;
                  }
                } else {
                  v = f + 16 | 0;
                  b[((b[v >> 2] | 0) == (i | 0) ? v : f + 20 | 0) >> 2] = d;
                  if (!d) { break; }
                }

                b[d + 24 >> 2] = f;
                c = b[i + 16 >> 2] | 0;

                if (c | 0) {
                  b[d + 16 >> 2] = c;
                  b[c + 24 >> 2] = d;
                }

                c = b[i + 20 >> 2] | 0;

                if (c | 0) {
                  b[d + 20 >> 2] = c;
                  b[c + 24 >> 2] = d;
                }
              } } while (0);

              if (j >>> 0 < 16) {
                v = j + k | 0;
                b[i + 4 >> 2] = v | 3;
                v = i + v + 4 | 0;
                b[v >> 2] = b[v >> 2] | 1;
              } else {
                b[i + 4 >> 2] = k | 3;
                b[h + 4 >> 2] = j | 1;
                b[h + j >> 2] = j;

                if (l | 0) {
                  e = b[5746] | 0;
                  c = l >>> 3;
                  d = 23004 + (c << 1 << 2) | 0;
                  c = 1 << c;

                  if (!(c & m)) {
                    b[5741] = c | m;
                    c = d;
                    a = d + 8 | 0;
                  } else {
                    a = d + 8 | 0;
                    c = b[a >> 2] | 0;
                  }

                  b[a >> 2] = e;
                  b[c + 12 >> 2] = e;
                  b[e + 8 >> 2] = c;
                  b[e + 12 >> 2] = d;
                }

                b[5743] = j;
                b[5746] = h;
              }

              v = i + 8 | 0;
              S = w;
              return v | 0;
            } else { m = k; }
          } else { m = k; }
        } else { m = k; }
      } else if (a >>> 0 <= 4294967231) {
        a = a + 11 | 0;
        k = a & -8;
        e = b[5742] | 0;

        if (e) {
          f = 0 - k | 0;
          a = a >>> 8;
          if (a) {
            if (k >>> 0 > 16777215) { j = 31; }else {
              m = (a + 1048320 | 0) >>> 16 & 8;
              q = a << m;
              i = (q + 520192 | 0) >>> 16 & 4;
              q = q << i;
              j = (q + 245760 | 0) >>> 16 & 2;
              j = 14 - (i | m | j) + (q << j >>> 15) | 0;
              j = k >>> (j + 7 | 0) & 1 | j << 1;
            }
          } else { j = 0; }
          d = b[23268 + (j << 2) >> 2] | 0;

          a: do { if (!d) {
            d = 0;
            a = 0;
            q = 61;
          } else {
            a = 0;
            i = k << ((j | 0) == 31 ? 0 : 25 - (j >>> 1) | 0);
            g = 0;

            while (1) {
              h = (b[d + 4 >> 2] & -8) - k | 0;
              if (h >>> 0 < f >>> 0) { if (!h) {
                a = d;
                f = 0;
                q = 65;
                break a;
              } else {
                a = d;
                f = h;
              } }
              q = b[d + 20 >> 2] | 0;
              d = b[d + 16 + (i >>> 31 << 2) >> 2] | 0;
              g = (q | 0) == 0 | (q | 0) == (d | 0) ? g : q;

              if (!d) {
                d = g;
                q = 61;
                break;
              } else { i = i << 1; }
            }
          } } while (0);

          if ((q | 0) == 61) {
            if ((d | 0) == 0 & (a | 0) == 0) {
              a = 2 << j;
              a = (a | 0 - a) & e;

              if (!a) {
                m = k;
                break;
              }

              m = (a & 0 - a) + -1 | 0;
              h = m >>> 12 & 16;
              m = m >>> h;
              g = m >>> 5 & 8;
              m = m >>> g;
              i = m >>> 2 & 4;
              m = m >>> i;
              j = m >>> 1 & 2;
              m = m >>> j;
              d = m >>> 1 & 1;
              a = 0;
              d = b[23268 + ((g | h | i | j | d) + (m >>> d) << 2) >> 2] | 0;
            }

            if (!d) {
              i = a;
              h = f;
            } else { q = 65; }
          }

          if ((q | 0) == 65) {
            g = d;

            while (1) {
              m = (b[g + 4 >> 2] & -8) - k | 0;
              d = m >>> 0 < f >>> 0;
              f = d ? m : f;
              a = d ? g : a;
              d = b[g + 16 >> 2] | 0;
              if (!d) { d = b[g + 20 >> 2] | 0; }

              if (!d) {
                i = a;
                h = f;
                break;
              } else { g = d; }
            }
          }

          if (((i | 0) != 0 ? h >>> 0 < ((b[5743] | 0) - k | 0) >>> 0 : 0) ? (l = i + k | 0, l >>> 0 > i >>> 0) : 0) {
            g = b[i + 24 >> 2] | 0;
            c = b[i + 12 >> 2] | 0;

            do { if ((c | 0) == (i | 0)) {
              a = i + 20 | 0;
              c = b[a >> 2] | 0;

              if (!c) {
                a = i + 16 | 0;
                c = b[a >> 2] | 0;

                if (!c) {
                  c = 0;
                  break;
                }
              }

              while (1) {
                f = c + 20 | 0;
                d = b[f >> 2] | 0;

                if (!d) {
                  f = c + 16 | 0;
                  d = b[f >> 2] | 0;
                  if (!d) { break; }else {
                    c = d;
                    a = f;
                  }
                } else {
                  c = d;
                  a = f;
                }
              }

              b[a >> 2] = 0;
            } else {
              v = b[i + 8 >> 2] | 0;
              b[v + 12 >> 2] = c;
              b[c + 8 >> 2] = v;
            } } while (0);

            do { if (g) {
              a = b[i + 28 >> 2] | 0;
              d = 23268 + (a << 2) | 0;

              if ((i | 0) == (b[d >> 2] | 0)) {
                b[d >> 2] = c;

                if (!c) {
                  e = e & ~(1 << a);
                  b[5742] = e;
                  break;
                }
              } else {
                v = g + 16 | 0;
                b[((b[v >> 2] | 0) == (i | 0) ? v : g + 20 | 0) >> 2] = c;
                if (!c) { break; }
              }

              b[c + 24 >> 2] = g;
              a = b[i + 16 >> 2] | 0;

              if (a | 0) {
                b[c + 16 >> 2] = a;
                b[a + 24 >> 2] = c;
              }

              a = b[i + 20 >> 2] | 0;

              if (a) {
                b[c + 20 >> 2] = a;
                b[a + 24 >> 2] = c;
              }
            } } while (0);

            b: do { if (h >>> 0 < 16) {
              v = h + k | 0;
              b[i + 4 >> 2] = v | 3;
              v = i + v + 4 | 0;
              b[v >> 2] = b[v >> 2] | 1;
            } else {
              b[i + 4 >> 2] = k | 3;
              b[l + 4 >> 2] = h | 1;
              b[l + h >> 2] = h;
              c = h >>> 3;

              if (h >>> 0 < 256) {
                d = 23004 + (c << 1 << 2) | 0;
                a = b[5741] | 0;
                c = 1 << c;

                if (!(a & c)) {
                  b[5741] = a | c;
                  c = d;
                  a = d + 8 | 0;
                } else {
                  a = d + 8 | 0;
                  c = b[a >> 2] | 0;
                }

                b[a >> 2] = l;
                b[c + 12 >> 2] = l;
                b[l + 8 >> 2] = c;
                b[l + 12 >> 2] = d;
                break;
              }

              c = h >>> 8;
              if (c) {
                if (h >>> 0 > 16777215) { d = 31; }else {
                  u = (c + 1048320 | 0) >>> 16 & 8;
                  v = c << u;
                  t = (v + 520192 | 0) >>> 16 & 4;
                  v = v << t;
                  d = (v + 245760 | 0) >>> 16 & 2;
                  d = 14 - (t | u | d) + (v << d >>> 15) | 0;
                  d = h >>> (d + 7 | 0) & 1 | d << 1;
                }
              } else { d = 0; }
              c = 23268 + (d << 2) | 0;
              b[l + 28 >> 2] = d;
              a = l + 16 | 0;
              b[a + 4 >> 2] = 0;
              b[a >> 2] = 0;
              a = 1 << d;

              if (!(e & a)) {
                b[5742] = e | a;
                b[c >> 2] = l;
                b[l + 24 >> 2] = c;
                b[l + 12 >> 2] = l;
                b[l + 8 >> 2] = l;
                break;
              }

              c = b[c >> 2] | 0;

              c: do { if ((b[c + 4 >> 2] & -8 | 0) != (h | 0)) {
                e = h << ((d | 0) == 31 ? 0 : 25 - (d >>> 1) | 0);

                while (1) {
                  d = c + 16 + (e >>> 31 << 2) | 0;
                  a = b[d >> 2] | 0;
                  if (!a) { break; }

                  if ((b[a + 4 >> 2] & -8 | 0) == (h | 0)) {
                    c = a;
                    break c;
                  } else {
                    e = e << 1;
                    c = a;
                  }
                }

                b[d >> 2] = l;
                b[l + 24 >> 2] = c;
                b[l + 12 >> 2] = l;
                b[l + 8 >> 2] = l;
                break b;
              } } while (0);

              u = c + 8 | 0;
              v = b[u >> 2] | 0;
              b[v + 12 >> 2] = l;
              b[u >> 2] = l;
              b[l + 8 >> 2] = v;
              b[l + 12 >> 2] = c;
              b[l + 24 >> 2] = 0;
            } } while (0);

            v = i + 8 | 0;
            S = w;
            return v | 0;
          } else { m = k; }
        } else { m = k; }
      } else { m = -1; } } while (0);

      d = b[5743] | 0;

      if (d >>> 0 >= m >>> 0) {
        c = d - m | 0;
        a = b[5746] | 0;

        if (c >>> 0 > 15) {
          v = a + m | 0;
          b[5746] = v;
          b[5743] = c;
          b[v + 4 >> 2] = c | 1;
          b[a + d >> 2] = c;
          b[a + 4 >> 2] = m | 3;
        } else {
          b[5743] = 0;
          b[5746] = 0;
          b[a + 4 >> 2] = d | 3;
          v = a + d + 4 | 0;
          b[v >> 2] = b[v >> 2] | 1;
        }

        v = a + 8 | 0;
        S = w;
        return v | 0;
      }

      h = b[5744] | 0;

      if (h >>> 0 > m >>> 0) {
        t = h - m | 0;
        b[5744] = t;
        v = b[5747] | 0;
        u = v + m | 0;
        b[5747] = u;
        b[u + 4 >> 2] = t | 1;
        b[v + 4 >> 2] = m | 3;
        v = v + 8 | 0;
        S = w;
        return v | 0;
      }

      if (!(b[5859] | 0)) {
        b[5861] = 4096;
        b[5860] = 4096;
        b[5862] = -1;
        b[5863] = -1;
        b[5864] = 0;
        b[5852] = 0;
        b[5859] = n & -16 ^ 1431655768;
        a = 4096;
      } else { a = b[5861] | 0; }

      i = m + 48 | 0;
      j = m + 47 | 0;
      g = a + j | 0;
      f = 0 - a | 0;
      k = g & f;

      if (k >>> 0 <= m >>> 0) {
        v = 0;
        S = w;
        return v | 0;
      }

      a = b[5851] | 0;

      if (a | 0 ? (l = b[5849] | 0, n = l + k | 0, n >>> 0 <= l >>> 0 | n >>> 0 > a >>> 0) : 0) {
        v = 0;
        S = w;
        return v | 0;
      }

      d: do { if (!(b[5852] & 4)) {
        d = b[5747] | 0;

        e: do { if (d) {
          e = 23412;

          while (1) {
            n = b[e >> 2] | 0;
            if (n >>> 0 <= d >>> 0 ? (n + (b[e + 4 >> 2] | 0) | 0) >>> 0 > d >>> 0 : 0) { break; }
            a = b[e + 8 >> 2] | 0;

            if (!a) {
              q = 128;
              break e;
            } else { e = a; }
          }

          c = g - h & f;

          if (c >>> 0 < 2147483647) {
            a = Yc(c | 0) | 0;

            if ((a | 0) == ((b[e >> 2] | 0) + (b[e + 4 >> 2] | 0) | 0)) {
              if ((a | 0) != (-1 | 0)) {
                h = c;
                g = a;
                q = 145;
                break d;
              }
            } else {
              e = a;
              q = 136;
            }
          } else { c = 0; }
        } else { q = 128; } } while (0);

        do { if ((q | 0) == 128) {
          d = Yc(0) | 0;

          if ((d | 0) != (-1 | 0) ? (c = d, o = b[5860] | 0, p = o + -1 | 0, c = ((p & c | 0) == 0 ? 0 : (p + c & 0 - o) - c | 0) + k | 0, o = b[5849] | 0, p = c + o | 0, c >>> 0 > m >>> 0 & c >>> 0 < 2147483647) : 0) {
            n = b[5851] | 0;

            if (n | 0 ? p >>> 0 <= o >>> 0 | p >>> 0 > n >>> 0 : 0) {
              c = 0;
              break;
            }

            a = Yc(c | 0) | 0;

            if ((a | 0) == (d | 0)) {
              h = c;
              g = d;
              q = 145;
              break d;
            } else {
              e = a;
              q = 136;
            }
          } else { c = 0; }
        } } while (0);

        do { if ((q | 0) == 136) {
          d = 0 - c | 0;
          if (!(i >>> 0 > c >>> 0 & (c >>> 0 < 2147483647 & (e | 0) != (-1 | 0)))) { if ((e | 0) == (-1 | 0)) {
            c = 0;
            break;
          } else {
            h = c;
            g = e;
            q = 145;
            break d;
          } }
          a = b[5861] | 0;
          a = j - c + a & 0 - a;

          if (a >>> 0 >= 2147483647) {
            h = c;
            g = e;
            q = 145;
            break d;
          }

          if ((Yc(a | 0) | 0) == (-1 | 0)) {
            Yc(d | 0) | 0;
            c = 0;
            break;
          } else {
            h = a + c | 0;
            g = e;
            q = 145;
            break d;
          }
        } } while (0);

        b[5852] = b[5852] | 4;
        q = 143;
      } else {
        c = 0;
        q = 143;
      } } while (0);

      if (((q | 0) == 143 ? k >>> 0 < 2147483647 : 0) ? (t = Yc(k | 0) | 0, p = Yc(0) | 0, r = p - t | 0, s = r >>> 0 > (m + 40 | 0) >>> 0, !((t | 0) == (-1 | 0) | s ^ 1 | t >>> 0 < p >>> 0 & ((t | 0) != (-1 | 0) & (p | 0) != (-1 | 0)) ^ 1)) : 0) {
        h = s ? r : c;
        g = t;
        q = 145;
      }

      if ((q | 0) == 145) {
        c = (b[5849] | 0) + h | 0;
        b[5849] = c;
        if (c >>> 0 > (b[5850] | 0) >>> 0) { b[5850] = c; }
        j = b[5747] | 0;

        f: do { if (j) {
          c = 23412;

          while (1) {
            a = b[c >> 2] | 0;
            d = b[c + 4 >> 2] | 0;

            if ((g | 0) == (a + d | 0)) {
              q = 154;
              break;
            }

            e = b[c + 8 >> 2] | 0;
            if (!e) { break; }else { c = e; }
          }

          if (((q | 0) == 154 ? (u = c + 4 | 0, (b[c + 12 >> 2] & 8 | 0) == 0) : 0) ? g >>> 0 > j >>> 0 & a >>> 0 <= j >>> 0 : 0) {
            b[u >> 2] = d + h;
            v = (b[5744] | 0) + h | 0;
            t = j + 8 | 0;
            t = (t & 7 | 0) == 0 ? 0 : 0 - t & 7;
            u = j + t | 0;
            t = v - t | 0;
            b[5747] = u;
            b[5744] = t;
            b[u + 4 >> 2] = t | 1;
            b[j + v + 4 >> 2] = 40;
            b[5748] = b[5863];
            break;
          }

          if (g >>> 0 < (b[5745] | 0) >>> 0) { b[5745] = g; }
          d = g + h | 0;
          c = 23412;

          while (1) {
            if ((b[c >> 2] | 0) == (d | 0)) {
              q = 162;
              break;
            }

            a = b[c + 8 >> 2] | 0;
            if (!a) { break; }else { c = a; }
          }

          if ((q | 0) == 162 ? (b[c + 12 >> 2] & 8 | 0) == 0 : 0) {
            b[c >> 2] = g;
            l = c + 4 | 0;
            b[l >> 2] = (b[l >> 2] | 0) + h;
            l = g + 8 | 0;
            l = g + ((l & 7 | 0) == 0 ? 0 : 0 - l & 7) | 0;
            c = d + 8 | 0;
            c = d + ((c & 7 | 0) == 0 ? 0 : 0 - c & 7) | 0;
            k = l + m | 0;
            i = c - l - m | 0;
            b[l + 4 >> 2] = m | 3;

            g: do { if ((j | 0) == (c | 0)) {
              v = (b[5744] | 0) + i | 0;
              b[5744] = v;
              b[5747] = k;
              b[k + 4 >> 2] = v | 1;
            } else {
              if ((b[5746] | 0) == (c | 0)) {
                v = (b[5743] | 0) + i | 0;
                b[5743] = v;
                b[5746] = k;
                b[k + 4 >> 2] = v | 1;
                b[k + v >> 2] = v;
                break;
              }

              a = b[c + 4 >> 2] | 0;

              if ((a & 3 | 0) == 1) {
                h = a & -8;
                e = a >>> 3;

                h: do { if (a >>> 0 < 256) {
                  a = b[c + 8 >> 2] | 0;
                  d = b[c + 12 >> 2] | 0;

                  if ((d | 0) == (a | 0)) {
                    b[5741] = b[5741] & ~(1 << e);
                    break;
                  } else {
                    b[a + 12 >> 2] = d;
                    b[d + 8 >> 2] = a;
                    break;
                  }
                } else {
                  g = b[c + 24 >> 2] | 0;
                  a = b[c + 12 >> 2] | 0;

                  do { if ((a | 0) == (c | 0)) {
                    d = c + 16 | 0;
                    e = d + 4 | 0;
                    a = b[e >> 2] | 0;

                    if (!a) {
                      a = b[d >> 2] | 0;

                      if (!a) {
                        a = 0;
                        break;
                      }
                    } else { d = e; }

                    while (1) {
                      f = a + 20 | 0;
                      e = b[f >> 2] | 0;

                      if (!e) {
                        f = a + 16 | 0;
                        e = b[f >> 2] | 0;
                        if (!e) { break; }else {
                          a = e;
                          d = f;
                        }
                      } else {
                        a = e;
                        d = f;
                      }
                    }

                    b[d >> 2] = 0;
                  } else {
                    v = b[c + 8 >> 2] | 0;
                    b[v + 12 >> 2] = a;
                    b[a + 8 >> 2] = v;
                  } } while (0);

                  if (!g) { break; }
                  d = b[c + 28 >> 2] | 0;
                  e = 23268 + (d << 2) | 0;

                  do { if ((b[e >> 2] | 0) != (c | 0)) {
                    v = g + 16 | 0;
                    b[((b[v >> 2] | 0) == (c | 0) ? v : g + 20 | 0) >> 2] = a;
                    if (!a) { break h; }
                  } else {
                    b[e >> 2] = a;
                    if (a | 0) { break; }
                    b[5742] = b[5742] & ~(1 << d);
                    break h;
                  } } while (0);

                  b[a + 24 >> 2] = g;
                  d = c + 16 | 0;
                  e = b[d >> 2] | 0;

                  if (e | 0) {
                    b[a + 16 >> 2] = e;
                    b[e + 24 >> 2] = a;
                  }

                  d = b[d + 4 >> 2] | 0;
                  if (!d) { break; }
                  b[a + 20 >> 2] = d;
                  b[d + 24 >> 2] = a;
                } } while (0);

                c = c + h | 0;
                f = h + i | 0;
              } else { f = i; }

              c = c + 4 | 0;
              b[c >> 2] = b[c >> 2] & -2;
              b[k + 4 >> 2] = f | 1;
              b[k + f >> 2] = f;
              c = f >>> 3;

              if (f >>> 0 < 256) {
                d = 23004 + (c << 1 << 2) | 0;
                a = b[5741] | 0;
                c = 1 << c;

                if (!(a & c)) {
                  b[5741] = a | c;
                  c = d;
                  a = d + 8 | 0;
                } else {
                  a = d + 8 | 0;
                  c = b[a >> 2] | 0;
                }

                b[a >> 2] = k;
                b[c + 12 >> 2] = k;
                b[k + 8 >> 2] = c;
                b[k + 12 >> 2] = d;
                break;
              }

              c = f >>> 8;

              do { if (!c) { e = 0; }else {
                if (f >>> 0 > 16777215) {
                  e = 31;
                  break;
                }

                u = (c + 1048320 | 0) >>> 16 & 8;
                v = c << u;
                t = (v + 520192 | 0) >>> 16 & 4;
                v = v << t;
                e = (v + 245760 | 0) >>> 16 & 2;
                e = 14 - (t | u | e) + (v << e >>> 15) | 0;
                e = f >>> (e + 7 | 0) & 1 | e << 1;
              } } while (0);

              c = 23268 + (e << 2) | 0;
              b[k + 28 >> 2] = e;
              a = k + 16 | 0;
              b[a + 4 >> 2] = 0;
              b[a >> 2] = 0;
              a = b[5742] | 0;
              d = 1 << e;

              if (!(a & d)) {
                b[5742] = a | d;
                b[c >> 2] = k;
                b[k + 24 >> 2] = c;
                b[k + 12 >> 2] = k;
                b[k + 8 >> 2] = k;
                break;
              }

              c = b[c >> 2] | 0;

              i: do { if ((b[c + 4 >> 2] & -8 | 0) != (f | 0)) {
                e = f << ((e | 0) == 31 ? 0 : 25 - (e >>> 1) | 0);

                while (1) {
                  d = c + 16 + (e >>> 31 << 2) | 0;
                  a = b[d >> 2] | 0;
                  if (!a) { break; }

                  if ((b[a + 4 >> 2] & -8 | 0) == (f | 0)) {
                    c = a;
                    break i;
                  } else {
                    e = e << 1;
                    c = a;
                  }
                }

                b[d >> 2] = k;
                b[k + 24 >> 2] = c;
                b[k + 12 >> 2] = k;
                b[k + 8 >> 2] = k;
                break g;
              } } while (0);

              u = c + 8 | 0;
              v = b[u >> 2] | 0;
              b[v + 12 >> 2] = k;
              b[u >> 2] = k;
              b[k + 8 >> 2] = v;
              b[k + 12 >> 2] = c;
              b[k + 24 >> 2] = 0;
            } } while (0);

            v = l + 8 | 0;
            S = w;
            return v | 0;
          }

          c = 23412;

          while (1) {
            a = b[c >> 2] | 0;
            if (a >>> 0 <= j >>> 0 ? (v = a + (b[c + 4 >> 2] | 0) | 0, v >>> 0 > j >>> 0) : 0) { break; }
            c = b[c + 8 >> 2] | 0;
          }

          f = v + -47 | 0;
          a = f + 8 | 0;
          a = f + ((a & 7 | 0) == 0 ? 0 : 0 - a & 7) | 0;
          f = j + 16 | 0;
          a = a >>> 0 < f >>> 0 ? j : a;
          c = a + 8 | 0;
          d = h + -40 | 0;
          t = g + 8 | 0;
          t = (t & 7 | 0) == 0 ? 0 : 0 - t & 7;
          u = g + t | 0;
          t = d - t | 0;
          b[5747] = u;
          b[5744] = t;
          b[u + 4 >> 2] = t | 1;
          b[g + d + 4 >> 2] = 40;
          b[5748] = b[5863];
          d = a + 4 | 0;
          b[d >> 2] = 27;
          b[c >> 2] = b[5853];
          b[c + 4 >> 2] = b[5854];
          b[c + 8 >> 2] = b[5855];
          b[c + 12 >> 2] = b[5856];
          b[5853] = g;
          b[5854] = h;
          b[5856] = 0;
          b[5855] = c;
          c = a + 24 | 0;

          do {
            u = c;
            c = c + 4 | 0;
            b[c >> 2] = 7;
          } while ((u + 8 | 0) >>> 0 < v >>> 0);

          if ((a | 0) != (j | 0)) {
            g = a - j | 0;
            b[d >> 2] = b[d >> 2] & -2;
            b[j + 4 >> 2] = g | 1;
            b[a >> 2] = g;
            c = g >>> 3;

            if (g >>> 0 < 256) {
              d = 23004 + (c << 1 << 2) | 0;
              a = b[5741] | 0;
              c = 1 << c;

              if (!(a & c)) {
                b[5741] = a | c;
                c = d;
                a = d + 8 | 0;
              } else {
                a = d + 8 | 0;
                c = b[a >> 2] | 0;
              }

              b[a >> 2] = j;
              b[c + 12 >> 2] = j;
              b[j + 8 >> 2] = c;
              b[j + 12 >> 2] = d;
              break;
            }

            c = g >>> 8;
            if (c) {
              if (g >>> 0 > 16777215) { e = 31; }else {
                u = (c + 1048320 | 0) >>> 16 & 8;
                v = c << u;
                t = (v + 520192 | 0) >>> 16 & 4;
                v = v << t;
                e = (v + 245760 | 0) >>> 16 & 2;
                e = 14 - (t | u | e) + (v << e >>> 15) | 0;
                e = g >>> (e + 7 | 0) & 1 | e << 1;
              }
            } else { e = 0; }
            d = 23268 + (e << 2) | 0;
            b[j + 28 >> 2] = e;
            b[j + 20 >> 2] = 0;
            b[f >> 2] = 0;
            c = b[5742] | 0;
            a = 1 << e;

            if (!(c & a)) {
              b[5742] = c | a;
              b[d >> 2] = j;
              b[j + 24 >> 2] = d;
              b[j + 12 >> 2] = j;
              b[j + 8 >> 2] = j;
              break;
            }

            c = b[d >> 2] | 0;

            j: do { if ((b[c + 4 >> 2] & -8 | 0) != (g | 0)) {
              e = g << ((e | 0) == 31 ? 0 : 25 - (e >>> 1) | 0);

              while (1) {
                d = c + 16 + (e >>> 31 << 2) | 0;
                a = b[d >> 2] | 0;
                if (!a) { break; }

                if ((b[a + 4 >> 2] & -8 | 0) == (g | 0)) {
                  c = a;
                  break j;
                } else {
                  e = e << 1;
                  c = a;
                }
              }

              b[d >> 2] = j;
              b[j + 24 >> 2] = c;
              b[j + 12 >> 2] = j;
              b[j + 8 >> 2] = j;
              break f;
            } } while (0);

            u = c + 8 | 0;
            v = b[u >> 2] | 0;
            b[v + 12 >> 2] = j;
            b[u >> 2] = j;
            b[j + 8 >> 2] = v;
            b[j + 12 >> 2] = c;
            b[j + 24 >> 2] = 0;
          }
        } else {
          v = b[5745] | 0;
          if ((v | 0) == 0 | g >>> 0 < v >>> 0) { b[5745] = g; }
          b[5853] = g;
          b[5854] = h;
          b[5856] = 0;
          b[5750] = b[5859];
          b[5749] = -1;
          b[5754] = 23004;
          b[5753] = 23004;
          b[5756] = 23012;
          b[5755] = 23012;
          b[5758] = 23020;
          b[5757] = 23020;
          b[5760] = 23028;
          b[5759] = 23028;
          b[5762] = 23036;
          b[5761] = 23036;
          b[5764] = 23044;
          b[5763] = 23044;
          b[5766] = 23052;
          b[5765] = 23052;
          b[5768] = 23060;
          b[5767] = 23060;
          b[5770] = 23068;
          b[5769] = 23068;
          b[5772] = 23076;
          b[5771] = 23076;
          b[5774] = 23084;
          b[5773] = 23084;
          b[5776] = 23092;
          b[5775] = 23092;
          b[5778] = 23100;
          b[5777] = 23100;
          b[5780] = 23108;
          b[5779] = 23108;
          b[5782] = 23116;
          b[5781] = 23116;
          b[5784] = 23124;
          b[5783] = 23124;
          b[5786] = 23132;
          b[5785] = 23132;
          b[5788] = 23140;
          b[5787] = 23140;
          b[5790] = 23148;
          b[5789] = 23148;
          b[5792] = 23156;
          b[5791] = 23156;
          b[5794] = 23164;
          b[5793] = 23164;
          b[5796] = 23172;
          b[5795] = 23172;
          b[5798] = 23180;
          b[5797] = 23180;
          b[5800] = 23188;
          b[5799] = 23188;
          b[5802] = 23196;
          b[5801] = 23196;
          b[5804] = 23204;
          b[5803] = 23204;
          b[5806] = 23212;
          b[5805] = 23212;
          b[5808] = 23220;
          b[5807] = 23220;
          b[5810] = 23228;
          b[5809] = 23228;
          b[5812] = 23236;
          b[5811] = 23236;
          b[5814] = 23244;
          b[5813] = 23244;
          b[5816] = 23252;
          b[5815] = 23252;
          v = h + -40 | 0;
          t = g + 8 | 0;
          t = (t & 7 | 0) == 0 ? 0 : 0 - t & 7;
          u = g + t | 0;
          t = v - t | 0;
          b[5747] = u;
          b[5744] = t;
          b[u + 4 >> 2] = t | 1;
          b[g + v + 4 >> 2] = 40;
          b[5748] = b[5863];
        } } while (0);

        c = b[5744] | 0;

        if (c >>> 0 > m >>> 0) {
          t = c - m | 0;
          b[5744] = t;
          v = b[5747] | 0;
          u = v + m | 0;
          b[5747] = u;
          b[u + 4 >> 2] = t | 1;
          b[v + 4 >> 2] = m | 3;
          v = v + 8 | 0;
          S = w;
          return v | 0;
        }
      }

      v = Gc() | 0;
      b[v >> 2] = 12;
      v = 0;
      S = w;
      return v | 0;
    }

    function Kc(a) {
      a = a | 0;
      var c = 0,
          d = 0,
          e = 0,
          f = 0,
          g = 0,
          h = 0,
          i = 0,
          j = 0;
      if (!a) { return; }
      d = a + -8 | 0;
      f = b[5745] | 0;
      a = b[a + -4 >> 2] | 0;
      c = a & -8;
      j = d + c | 0;

      do { if (!(a & 1)) {
        e = b[d >> 2] | 0;
        if (!(a & 3)) { return; }
        h = d + (0 - e) | 0;
        g = e + c | 0;
        if (h >>> 0 < f >>> 0) { return; }

        if ((b[5746] | 0) == (h | 0)) {
          a = j + 4 | 0;
          c = b[a >> 2] | 0;

          if ((c & 3 | 0) != 3) {
            i = h;
            c = g;
            break;
          }

          b[5743] = g;
          b[a >> 2] = c & -2;
          b[h + 4 >> 2] = g | 1;
          b[h + g >> 2] = g;
          return;
        }

        d = e >>> 3;

        if (e >>> 0 < 256) {
          a = b[h + 8 >> 2] | 0;
          c = b[h + 12 >> 2] | 0;

          if ((c | 0) == (a | 0)) {
            b[5741] = b[5741] & ~(1 << d);
            i = h;
            c = g;
            break;
          } else {
            b[a + 12 >> 2] = c;
            b[c + 8 >> 2] = a;
            i = h;
            c = g;
            break;
          }
        }

        f = b[h + 24 >> 2] | 0;
        a = b[h + 12 >> 2] | 0;

        do { if ((a | 0) == (h | 0)) {
          c = h + 16 | 0;
          d = c + 4 | 0;
          a = b[d >> 2] | 0;

          if (!a) {
            a = b[c >> 2] | 0;

            if (!a) {
              a = 0;
              break;
            }
          } else { c = d; }

          while (1) {
            e = a + 20 | 0;
            d = b[e >> 2] | 0;

            if (!d) {
              e = a + 16 | 0;
              d = b[e >> 2] | 0;
              if (!d) { break; }else {
                a = d;
                c = e;
              }
            } else {
              a = d;
              c = e;
            }
          }

          b[c >> 2] = 0;
        } else {
          i = b[h + 8 >> 2] | 0;
          b[i + 12 >> 2] = a;
          b[a + 8 >> 2] = i;
        } } while (0);

        if (f) {
          c = b[h + 28 >> 2] | 0;
          d = 23268 + (c << 2) | 0;

          if ((b[d >> 2] | 0) == (h | 0)) {
            b[d >> 2] = a;

            if (!a) {
              b[5742] = b[5742] & ~(1 << c);
              i = h;
              c = g;
              break;
            }
          } else {
            i = f + 16 | 0;
            b[((b[i >> 2] | 0) == (h | 0) ? i : f + 20 | 0) >> 2] = a;

            if (!a) {
              i = h;
              c = g;
              break;
            }
          }

          b[a + 24 >> 2] = f;
          c = h + 16 | 0;
          d = b[c >> 2] | 0;

          if (d | 0) {
            b[a + 16 >> 2] = d;
            b[d + 24 >> 2] = a;
          }

          c = b[c + 4 >> 2] | 0;

          if (c) {
            b[a + 20 >> 2] = c;
            b[c + 24 >> 2] = a;
            i = h;
            c = g;
          } else {
            i = h;
            c = g;
          }
        } else {
          i = h;
          c = g;
        }
      } else {
        i = d;
        h = d;
      } } while (0);

      if (h >>> 0 >= j >>> 0) { return; }
      a = j + 4 | 0;
      e = b[a >> 2] | 0;
      if (!(e & 1)) { return; }

      if (!(e & 2)) {
        if ((b[5747] | 0) == (j | 0)) {
          j = (b[5744] | 0) + c | 0;
          b[5744] = j;
          b[5747] = i;
          b[i + 4 >> 2] = j | 1;
          if ((i | 0) != (b[5746] | 0)) { return; }
          b[5746] = 0;
          b[5743] = 0;
          return;
        }

        if ((b[5746] | 0) == (j | 0)) {
          j = (b[5743] | 0) + c | 0;
          b[5743] = j;
          b[5746] = h;
          b[i + 4 >> 2] = j | 1;
          b[h + j >> 2] = j;
          return;
        }

        f = (e & -8) + c | 0;
        d = e >>> 3;

        do { if (e >>> 0 < 256) {
          c = b[j + 8 >> 2] | 0;
          a = b[j + 12 >> 2] | 0;

          if ((a | 0) == (c | 0)) {
            b[5741] = b[5741] & ~(1 << d);
            break;
          } else {
            b[c + 12 >> 2] = a;
            b[a + 8 >> 2] = c;
            break;
          }
        } else {
          g = b[j + 24 >> 2] | 0;
          a = b[j + 12 >> 2] | 0;

          do { if ((a | 0) == (j | 0)) {
            c = j + 16 | 0;
            d = c + 4 | 0;
            a = b[d >> 2] | 0;

            if (!a) {
              a = b[c >> 2] | 0;

              if (!a) {
                d = 0;
                break;
              }
            } else { c = d; }

            while (1) {
              e = a + 20 | 0;
              d = b[e >> 2] | 0;

              if (!d) {
                e = a + 16 | 0;
                d = b[e >> 2] | 0;
                if (!d) { break; }else {
                  a = d;
                  c = e;
                }
              } else {
                a = d;
                c = e;
              }
            }

            b[c >> 2] = 0;
            d = a;
          } else {
            d = b[j + 8 >> 2] | 0;
            b[d + 12 >> 2] = a;
            b[a + 8 >> 2] = d;
            d = a;
          } } while (0);

          if (g | 0) {
            a = b[j + 28 >> 2] | 0;
            c = 23268 + (a << 2) | 0;

            if ((b[c >> 2] | 0) == (j | 0)) {
              b[c >> 2] = d;

              if (!d) {
                b[5742] = b[5742] & ~(1 << a);
                break;
              }
            } else {
              e = g + 16 | 0;
              b[((b[e >> 2] | 0) == (j | 0) ? e : g + 20 | 0) >> 2] = d;
              if (!d) { break; }
            }

            b[d + 24 >> 2] = g;
            a = j + 16 | 0;
            c = b[a >> 2] | 0;

            if (c | 0) {
              b[d + 16 >> 2] = c;
              b[c + 24 >> 2] = d;
            }

            a = b[a + 4 >> 2] | 0;

            if (a | 0) {
              b[d + 20 >> 2] = a;
              b[a + 24 >> 2] = d;
            }
          }
        } } while (0);

        b[i + 4 >> 2] = f | 1;
        b[h + f >> 2] = f;

        if ((i | 0) == (b[5746] | 0)) {
          b[5743] = f;
          return;
        }
      } else {
        b[a >> 2] = e & -2;
        b[i + 4 >> 2] = c | 1;
        b[h + c >> 2] = c;
        f = c;
      }

      a = f >>> 3;

      if (f >>> 0 < 256) {
        d = 23004 + (a << 1 << 2) | 0;
        c = b[5741] | 0;
        a = 1 << a;

        if (!(c & a)) {
          b[5741] = c | a;
          a = d;
          c = d + 8 | 0;
        } else {
          c = d + 8 | 0;
          a = b[c >> 2] | 0;
        }

        b[c >> 2] = i;
        b[a + 12 >> 2] = i;
        b[i + 8 >> 2] = a;
        b[i + 12 >> 2] = d;
        return;
      }

      a = f >>> 8;
      if (a) {
        if (f >>> 0 > 16777215) { e = 31; }else {
          h = (a + 1048320 | 0) >>> 16 & 8;
          j = a << h;
          g = (j + 520192 | 0) >>> 16 & 4;
          j = j << g;
          e = (j + 245760 | 0) >>> 16 & 2;
          e = 14 - (g | h | e) + (j << e >>> 15) | 0;
          e = f >>> (e + 7 | 0) & 1 | e << 1;
        }
      } else { e = 0; }
      a = 23268 + (e << 2) | 0;
      b[i + 28 >> 2] = e;
      b[i + 20 >> 2] = 0;
      b[i + 16 >> 2] = 0;
      c = b[5742] | 0;
      d = 1 << e;

      a: do { if (!(c & d)) {
        b[5742] = c | d;
        b[a >> 2] = i;
        b[i + 24 >> 2] = a;
        b[i + 12 >> 2] = i;
        b[i + 8 >> 2] = i;
      } else {
        a = b[a >> 2] | 0;

        b: do { if ((b[a + 4 >> 2] & -8 | 0) != (f | 0)) {
          e = f << ((e | 0) == 31 ? 0 : 25 - (e >>> 1) | 0);

          while (1) {
            d = a + 16 + (e >>> 31 << 2) | 0;
            c = b[d >> 2] | 0;
            if (!c) { break; }

            if ((b[c + 4 >> 2] & -8 | 0) == (f | 0)) {
              a = c;
              break b;
            } else {
              e = e << 1;
              a = c;
            }
          }

          b[d >> 2] = i;
          b[i + 24 >> 2] = a;
          b[i + 12 >> 2] = i;
          b[i + 8 >> 2] = i;
          break a;
        } } while (0);

        h = a + 8 | 0;
        j = b[h >> 2] | 0;
        b[j + 12 >> 2] = i;
        b[h >> 2] = i;
        b[i + 8 >> 2] = j;
        b[i + 12 >> 2] = a;
        b[i + 24 >> 2] = 0;
      } } while (0);

      j = (b[5749] | 0) + -1 | 0;
      b[5749] = j;
      if (j | 0) { return; }
      a = 23420;

      while (1) {
        a = b[a >> 2] | 0;
        if (!a) { break; }else { a = a + 8 | 0; }
      }

      b[5749] = -1;
      return;
    }

    function Lc(a, c) {
      a = a | 0;
      c = c | 0;
      var d = 0;

      if (a) {
        d = B(c, a) | 0;
        if ((c | a) >>> 0 > 65535) { d = ((d >>> 0) / (a >>> 0) | 0 | 0) == (c | 0) ? d : -1; }
      } else { d = 0; }

      a = Jc(d) | 0;
      if (!a) { return a | 0; }
      if (!(b[a + -4 >> 2] & 3)) { return a | 0; }
      Wc(a | 0, 0, d | 0) | 0;
      return a | 0;
    }

    function Mc(a, b, c, d) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      c = a + c >>> 0;
      return (F(b + d + (c >>> 0 < a >>> 0 | 0) >>> 0 | 0), c | 0) | 0;
    }

    function Nc(a, b, c, d) {
      a = a | 0;
      b = b | 0;
      c = c | 0;
      d = d | 0;
      d = b - d - (c >>> 0 > a >>> 0 | 0) >>> 0;
      return (F(d | 0), a - c >>> 0 | 0) | 0;
    }

    function Oc(a) {
      a = a | 0;
      return (a ? 31 - (D(a ^ a - 1) | 0) | 0 : 32) | 0;
    }

    function Pc(a, c, d, e, f) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      f = f | 0;
      var g = 0,
          h = 0,
          i = 0,
          j = 0,
          k = 0,
          l = 0,
          m = 0,
          n = 0,
          o = 0,
          p = 0;
      l = a;
      j = c;
      k = j;
      h = d;
      n = e;
      i = n;

      if (!k) {
        g = (f | 0) != 0;

        if (!i) {
          if (g) {
            b[f >> 2] = (l >>> 0) % (h >>> 0);
            b[f + 4 >> 2] = 0;
          }

          n = 0;
          f = (l >>> 0) / (h >>> 0) >>> 0;
          return (F(n | 0), f) | 0;
        } else {
          if (!g) {
            n = 0;
            f = 0;
            return (F(n | 0), f) | 0;
          }

          b[f >> 2] = a | 0;
          b[f + 4 >> 2] = c & 0;
          n = 0;
          f = 0;
          return (F(n | 0), f) | 0;
        }
      }

      g = (i | 0) == 0;

      do { if (h) {
        if (!g) {
          g = (D(i | 0) | 0) - (D(k | 0) | 0) | 0;

          if (g >>> 0 <= 31) {
            m = g + 1 | 0;
            i = 31 - g | 0;
            c = g - 31 >> 31;
            h = m;
            a = l >>> (m >>> 0) & c | k << i;
            c = k >>> (m >>> 0) & c;
            g = 0;
            i = l << i;
            break;
          }

          if (!f) {
            n = 0;
            f = 0;
            return (F(n | 0), f) | 0;
          }

          b[f >> 2] = a | 0;
          b[f + 4 >> 2] = j | c & 0;
          n = 0;
          f = 0;
          return (F(n | 0), f) | 0;
        }

        g = h - 1 | 0;

        if (g & h | 0) {
          i = (D(h | 0) | 0) + 33 - (D(k | 0) | 0) | 0;
          p = 64 - i | 0;
          m = 32 - i | 0;
          j = m >> 31;
          o = i - 32 | 0;
          c = o >> 31;
          h = i;
          a = m - 1 >> 31 & k >>> (o >>> 0) | (k << m | l >>> (i >>> 0)) & c;
          c = c & k >>> (i >>> 0);
          g = l << p & j;
          i = (k << p | l >>> (o >>> 0)) & j | l << m & i - 33 >> 31;
          break;
        }

        if (f | 0) {
          b[f >> 2] = g & l;
          b[f + 4 >> 2] = 0;
        }

        if ((h | 0) == 1) {
          o = j | c & 0;
          p = a | 0 | 0;
          return (F(o | 0), p) | 0;
        } else {
          p = Oc(h | 0) | 0;
          o = k >>> (p >>> 0) | 0;
          p = k << 32 - p | l >>> (p >>> 0) | 0;
          return (F(o | 0), p) | 0;
        }
      } else {
        if (g) {
          if (f | 0) {
            b[f >> 2] = (k >>> 0) % (h >>> 0);
            b[f + 4 >> 2] = 0;
          }

          o = 0;
          p = (k >>> 0) / (h >>> 0) >>> 0;
          return (F(o | 0), p) | 0;
        }

        if (!l) {
          if (f | 0) {
            b[f >> 2] = 0;
            b[f + 4 >> 2] = (k >>> 0) % (i >>> 0);
          }

          o = 0;
          p = (k >>> 0) / (i >>> 0) >>> 0;
          return (F(o | 0), p) | 0;
        }

        g = i - 1 | 0;

        if (!(g & i)) {
          if (f | 0) {
            b[f >> 2] = a | 0;
            b[f + 4 >> 2] = g & k | c & 0;
          }

          o = 0;
          p = k >>> ((Oc(i | 0) | 0) >>> 0);
          return (F(o | 0), p) | 0;
        }

        g = (D(i | 0) | 0) - (D(k | 0) | 0) | 0;

        if (g >>> 0 <= 30) {
          c = g + 1 | 0;
          i = 31 - g | 0;
          h = c;
          a = k << i | l >>> (c >>> 0);
          c = k >>> (c >>> 0);
          g = 0;
          i = l << i;
          break;
        }

        if (!f) {
          o = 0;
          p = 0;
          return (F(o | 0), p) | 0;
        }

        b[f >> 2] = a | 0;
        b[f + 4 >> 2] = j | c & 0;
        o = 0;
        p = 0;
        return (F(o | 0), p) | 0;
      } } while (0);

      if (!h) {
        k = i;
        j = 0;
        i = 0;
      } else {
        m = d | 0 | 0;
        l = n | e & 0;
        k = Mc(m | 0, l | 0, -1, -1) | 0;
        d = G() | 0;
        j = i;
        i = 0;

        do {
          e = j;
          j = g >>> 31 | j << 1;
          g = i | g << 1;
          e = a << 1 | e >>> 31 | 0;
          n = a >>> 31 | c << 1 | 0;
          Nc(k | 0, d | 0, e | 0, n | 0) | 0;
          p = G() | 0;
          o = p >> 31 | ((p | 0) < 0 ? -1 : 0) << 1;
          i = o & 1;
          a = Nc(e | 0, n | 0, o & m | 0, (((p | 0) < 0 ? -1 : 0) >> 31 | ((p | 0) < 0 ? -1 : 0) << 1) & l | 0) | 0;
          c = G() | 0;
          h = h - 1 | 0;
        } while ((h | 0) != 0);

        k = j;
        j = 0;
      }

      h = 0;

      if (f | 0) {
        b[f >> 2] = a;
        b[f + 4 >> 2] = c;
      }

      o = (g | 0) >>> 31 | (k | h) << 1 | (h << 1 | g >>> 31) & 0 | j;
      p = (g << 1 | 0 >>> 31) & -2 | i;
      return (F(o | 0), p) | 0;
    }

    function Qc(a, c, d, e) {
      a = a | 0;
      c = c | 0;
      d = d | 0;
      e = e | 0;
      var f = 0,
          g = 0;
      g = S;
      S = S + 16 | 0;
      f = g | 0;
      Pc(a, c, d, e, f) | 0;
      S = g;
      return (F(b[f + 4 >> 2] | 0), b[f >> 2] | 0) | 0;
    }

    function Rc(a, b, c) {
      a = a | 0;
      b = b | 0;
      c = c | 0;

      if ((c | 0) < 32) {
        F(b >>> c | 0);
        return a >>> c | (b & (1 << c) - 1) << 32 - c;
      }

      F(0);
      return b >>> c - 32 | 0;
    }

    function Sc(a, b, c) {
      a = a | 0;
      b = b | 0;
      c = c | 0;

      if ((c | 0) < 32) {
        F(b << c | (a & (1 << c) - 1 << 32 - c) >>> 32 - c | 0);
        return a << c;
      }

      F(a << c - 32 | 0);
      return 0;
    }

    function Tc(a, b) {
      a = +a;
      b = +b;
      if (a != a) { return +b; }
      if (b != b) { return +a; }
      return +C(+a, +b);
    }

    function Uc(a) {
      a = +a;
      return a >= 0.0 ? +p(a + .5) : +A(a - .5);
    }

    function Vc(c, d, e) {
      c = c | 0;
      d = d | 0;
      e = e | 0;
      var f = 0,
          g = 0,
          h = 0;

      if ((e | 0) >= 8192) {
        K(c | 0, d | 0, e | 0) | 0;
        return c | 0;
      }

      h = c | 0;
      g = c + e | 0;

      if ((c & 3) == (d & 3)) {
        while (c & 3) {
          if (!e) { return h | 0; }
          a[c >> 0] = a[d >> 0] | 0;
          c = c + 1 | 0;
          d = d + 1 | 0;
          e = e - 1 | 0;
        }

        e = g & -4 | 0;
        f = e - 64 | 0;

        while ((c | 0) <= (f | 0)) {
          b[c >> 2] = b[d >> 2];
          b[c + 4 >> 2] = b[d + 4 >> 2];
          b[c + 8 >> 2] = b[d + 8 >> 2];
          b[c + 12 >> 2] = b[d + 12 >> 2];
          b[c + 16 >> 2] = b[d + 16 >> 2];
          b[c + 20 >> 2] = b[d + 20 >> 2];
          b[c + 24 >> 2] = b[d + 24 >> 2];
          b[c + 28 >> 2] = b[d + 28 >> 2];
          b[c + 32 >> 2] = b[d + 32 >> 2];
          b[c + 36 >> 2] = b[d + 36 >> 2];
          b[c + 40 >> 2] = b[d + 40 >> 2];
          b[c + 44 >> 2] = b[d + 44 >> 2];
          b[c + 48 >> 2] = b[d + 48 >> 2];
          b[c + 52 >> 2] = b[d + 52 >> 2];
          b[c + 56 >> 2] = b[d + 56 >> 2];
          b[c + 60 >> 2] = b[d + 60 >> 2];
          c = c + 64 | 0;
          d = d + 64 | 0;
        }

        while ((c | 0) < (e | 0)) {
          b[c >> 2] = b[d >> 2];
          c = c + 4 | 0;
          d = d + 4 | 0;
        }
      } else {
        e = g - 4 | 0;

        while ((c | 0) < (e | 0)) {
          a[c >> 0] = a[d >> 0] | 0;
          a[c + 1 >> 0] = a[d + 1 >> 0] | 0;
          a[c + 2 >> 0] = a[d + 2 >> 0] | 0;
          a[c + 3 >> 0] = a[d + 3 >> 0] | 0;
          c = c + 4 | 0;
          d = d + 4 | 0;
        }
      }

      while ((c | 0) < (g | 0)) {
        a[c >> 0] = a[d >> 0] | 0;
        c = c + 1 | 0;
        d = d + 1 | 0;
      }

      return h | 0;
    }

    function Wc(c, d, e) {
      c = c | 0;
      d = d | 0;
      e = e | 0;
      var f = 0,
          g = 0,
          h = 0,
          i = 0;
      h = c + e | 0;
      d = d & 255;

      if ((e | 0) >= 67) {
        while (c & 3) {
          a[c >> 0] = d;
          c = c + 1 | 0;
        }

        f = h & -4 | 0;
        i = d | d << 8 | d << 16 | d << 24;
        g = f - 64 | 0;

        while ((c | 0) <= (g | 0)) {
          b[c >> 2] = i;
          b[c + 4 >> 2] = i;
          b[c + 8 >> 2] = i;
          b[c + 12 >> 2] = i;
          b[c + 16 >> 2] = i;
          b[c + 20 >> 2] = i;
          b[c + 24 >> 2] = i;
          b[c + 28 >> 2] = i;
          b[c + 32 >> 2] = i;
          b[c + 36 >> 2] = i;
          b[c + 40 >> 2] = i;
          b[c + 44 >> 2] = i;
          b[c + 48 >> 2] = i;
          b[c + 52 >> 2] = i;
          b[c + 56 >> 2] = i;
          b[c + 60 >> 2] = i;
          c = c + 64 | 0;
        }

        while ((c | 0) < (f | 0)) {
          b[c >> 2] = i;
          c = c + 4 | 0;
        }
      }

      while ((c | 0) < (h | 0)) {
        a[c >> 0] = d;
        c = c + 1 | 0;
      }

      return h - e | 0;
    }

    function Xc(a) {
      a = +a;
      return a >= 0.0 ? +p(a + .5) : +A(a - .5);
    }

    function Yc(a) {
      a = a | 0;
      var c = 0,
          d = 0,
          e = 0;
      e = J() | 0;
      d = b[g >> 2] | 0;
      c = d + a | 0;

      if ((a | 0) > 0 & (c | 0) < (d | 0) | (c | 0) < 0) {
        M(c | 0) | 0;
        I(12);
        return -1;
      }

      if ((c | 0) > (e | 0)) { if (!(L(c | 0) | 0)) {
        I(12);
        return -1;
      } }
      b[g >> 2] = c;
      return d | 0;
    } // EMSCRIPTEN_END_FUNCS


    return {
      ___uremdi3: Qc,
      _bitshift64Lshr: Rc,
      _bitshift64Shl: Sc,
      _calloc: Lc,
      _compact: wb,
      _destroyLinkedPolygon: _b,
      _edgeLengthKm: mb,
      _edgeLengthM: nb,
      _emscripten_replace_memory: V,
      _experimentalH3ToLocalIj: dc,
      _experimentalLocalIjToH3: ec,
      _free: Kc,
      _geoToH3: Hb,
      _getDestinationH3IndexFromUnidirectionalEdge: Tb,
      _getH3IndexesFromUnidirectionalEdge: Vb,
      _getH3UnidirectionalEdge: Rb,
      _getH3UnidirectionalEdgeBoundary: Xb,
      _getH3UnidirectionalEdgesFromHexagon: Wb,
      _getOriginH3IndexFromUnidirectionalEdge: Sb,
      _getPentagonIndexes: Pb,
      _getRes0Indexes: ta,
      _h3Distance: fc,
      _h3GetBaseCell: pb,
      _h3GetFaces: Nb,
      _h3IndexesAreNeighbors: Qb,
      _h3IsPentagon: ub,
      _h3IsResClassIII: zb,
      _h3IsValid: qb,
      _h3Line: hc,
      _h3LineSize: gc,
      _h3SetToLinkedGeo: ka,
      _h3ToCenterChild: vb,
      _h3ToChildren: tb,
      _h3ToGeo: Kb,
      _h3ToGeoBoundary: Lb,
      _h3ToParent: rb,
      _h3UnidirectionalEdgeIsValid: Ub,
      _hexAreaKm2: kb,
      _hexAreaM2: lb,
      _hexRing: ea,
      _i64Subtract: Nc,
      _kRing: $,
      _kRingDistances: aa,
      _llvm_minnum_f64: Tc,
      _llvm_round_f64: Uc,
      _malloc: Jc,
      _maxFaceCount: Mb,
      _maxH3ToChildrenSize: sb,
      _maxKringSize: _,
      _maxPolyfillSize: fa,
      _maxUncompactSize: yb,
      _memcpy: Vc,
      _memset: Wc,
      _numHexagons: ob,
      _pentagonIndexCount: Ob,
      _polyfill: ga,
      _res0IndexCount: sa,
      _round: Xc,
      _sbrk: Yc,
      _sizeOfCoordIJ: tc,
      _sizeOfGeoBoundary: pc,
      _sizeOfGeoCoord: oc,
      _sizeOfGeoPolygon: rc,
      _sizeOfGeofence: qc,
      _sizeOfH3Index: nc,
      _sizeOfLinkedGeoPolygon: sc,
      _uncompact: xb,
      establishStackSpace: Z,
      stackAlloc: W,
      stackRestore: Y,
      stackSave: X
    };
  }( // EMSCRIPTEN_END_ASM
  asmGlobalArg, asmLibraryArg, buffer);

  var ___uremdi3 = Module["___uremdi3"] = asm["___uremdi3"];

  var _bitshift64Lshr = Module["_bitshift64Lshr"] = asm["_bitshift64Lshr"];

  var _bitshift64Shl = Module["_bitshift64Shl"] = asm["_bitshift64Shl"];

  var _calloc = Module["_calloc"] = asm["_calloc"];

  var _compact = Module["_compact"] = asm["_compact"];

  var _destroyLinkedPolygon = Module["_destroyLinkedPolygon"] = asm["_destroyLinkedPolygon"];

  var _edgeLengthKm = Module["_edgeLengthKm"] = asm["_edgeLengthKm"];

  var _edgeLengthM = Module["_edgeLengthM"] = asm["_edgeLengthM"];

  var _emscripten_replace_memory = Module["_emscripten_replace_memory"] = asm["_emscripten_replace_memory"];

  var _experimentalH3ToLocalIj = Module["_experimentalH3ToLocalIj"] = asm["_experimentalH3ToLocalIj"];

  var _experimentalLocalIjToH3 = Module["_experimentalLocalIjToH3"] = asm["_experimentalLocalIjToH3"];

  var _free = Module["_free"] = asm["_free"];

  var _geoToH3 = Module["_geoToH3"] = asm["_geoToH3"];

  var _getDestinationH3IndexFromUnidirectionalEdge = Module["_getDestinationH3IndexFromUnidirectionalEdge"] = asm["_getDestinationH3IndexFromUnidirectionalEdge"];

  var _getH3IndexesFromUnidirectionalEdge = Module["_getH3IndexesFromUnidirectionalEdge"] = asm["_getH3IndexesFromUnidirectionalEdge"];

  var _getH3UnidirectionalEdge = Module["_getH3UnidirectionalEdge"] = asm["_getH3UnidirectionalEdge"];

  var _getH3UnidirectionalEdgeBoundary = Module["_getH3UnidirectionalEdgeBoundary"] = asm["_getH3UnidirectionalEdgeBoundary"];

  var _getH3UnidirectionalEdgesFromHexagon = Module["_getH3UnidirectionalEdgesFromHexagon"] = asm["_getH3UnidirectionalEdgesFromHexagon"];

  var _getOriginH3IndexFromUnidirectionalEdge = Module["_getOriginH3IndexFromUnidirectionalEdge"] = asm["_getOriginH3IndexFromUnidirectionalEdge"];

  var _getPentagonIndexes = Module["_getPentagonIndexes"] = asm["_getPentagonIndexes"];

  var _getRes0Indexes = Module["_getRes0Indexes"] = asm["_getRes0Indexes"];

  var _h3Distance = Module["_h3Distance"] = asm["_h3Distance"];

  var _h3GetBaseCell = Module["_h3GetBaseCell"] = asm["_h3GetBaseCell"];

  var _h3GetFaces = Module["_h3GetFaces"] = asm["_h3GetFaces"];

  var _h3IndexesAreNeighbors = Module["_h3IndexesAreNeighbors"] = asm["_h3IndexesAreNeighbors"];

  var _h3IsPentagon = Module["_h3IsPentagon"] = asm["_h3IsPentagon"];

  var _h3IsResClassIII = Module["_h3IsResClassIII"] = asm["_h3IsResClassIII"];

  var _h3IsValid = Module["_h3IsValid"] = asm["_h3IsValid"];

  var _h3Line = Module["_h3Line"] = asm["_h3Line"];

  var _h3LineSize = Module["_h3LineSize"] = asm["_h3LineSize"];

  var _h3SetToLinkedGeo = Module["_h3SetToLinkedGeo"] = asm["_h3SetToLinkedGeo"];

  var _h3ToCenterChild = Module["_h3ToCenterChild"] = asm["_h3ToCenterChild"];

  var _h3ToChildren = Module["_h3ToChildren"] = asm["_h3ToChildren"];

  var _h3ToGeo = Module["_h3ToGeo"] = asm["_h3ToGeo"];

  var _h3ToGeoBoundary = Module["_h3ToGeoBoundary"] = asm["_h3ToGeoBoundary"];

  var _h3ToParent = Module["_h3ToParent"] = asm["_h3ToParent"];

  var _h3UnidirectionalEdgeIsValid = Module["_h3UnidirectionalEdgeIsValid"] = asm["_h3UnidirectionalEdgeIsValid"];

  var _hexAreaKm2 = Module["_hexAreaKm2"] = asm["_hexAreaKm2"];

  var _hexAreaM2 = Module["_hexAreaM2"] = asm["_hexAreaM2"];

  var _hexRing = Module["_hexRing"] = asm["_hexRing"];

  var _i64Subtract = Module["_i64Subtract"] = asm["_i64Subtract"];

  var _kRing = Module["_kRing"] = asm["_kRing"];

  var _kRingDistances = Module["_kRingDistances"] = asm["_kRingDistances"];

  var _llvm_minnum_f64 = Module["_llvm_minnum_f64"] = asm["_llvm_minnum_f64"];

  var _llvm_round_f64 = Module["_llvm_round_f64"] = asm["_llvm_round_f64"];

  var _malloc = Module["_malloc"] = asm["_malloc"];

  var _maxFaceCount = Module["_maxFaceCount"] = asm["_maxFaceCount"];

  var _maxH3ToChildrenSize = Module["_maxH3ToChildrenSize"] = asm["_maxH3ToChildrenSize"];

  var _maxKringSize = Module["_maxKringSize"] = asm["_maxKringSize"];

  var _maxPolyfillSize = Module["_maxPolyfillSize"] = asm["_maxPolyfillSize"];

  var _maxUncompactSize = Module["_maxUncompactSize"] = asm["_maxUncompactSize"];

  var _memcpy = Module["_memcpy"] = asm["_memcpy"];

  var _memset = Module["_memset"] = asm["_memset"];

  var _numHexagons = Module["_numHexagons"] = asm["_numHexagons"];

  var _pentagonIndexCount = Module["_pentagonIndexCount"] = asm["_pentagonIndexCount"];

  var _polyfill = Module["_polyfill"] = asm["_polyfill"];

  var _res0IndexCount = Module["_res0IndexCount"] = asm["_res0IndexCount"];

  var _round = Module["_round"] = asm["_round"];

  var _sbrk = Module["_sbrk"] = asm["_sbrk"];

  var _sizeOfCoordIJ = Module["_sizeOfCoordIJ"] = asm["_sizeOfCoordIJ"];

  var _sizeOfGeoBoundary = Module["_sizeOfGeoBoundary"] = asm["_sizeOfGeoBoundary"];

  var _sizeOfGeoCoord = Module["_sizeOfGeoCoord"] = asm["_sizeOfGeoCoord"];

  var _sizeOfGeoPolygon = Module["_sizeOfGeoPolygon"] = asm["_sizeOfGeoPolygon"];

  var _sizeOfGeofence = Module["_sizeOfGeofence"] = asm["_sizeOfGeofence"];

  var _sizeOfH3Index = Module["_sizeOfH3Index"] = asm["_sizeOfH3Index"];

  var _sizeOfLinkedGeoPolygon = Module["_sizeOfLinkedGeoPolygon"] = asm["_sizeOfLinkedGeoPolygon"];

  var _uncompact = Module["_uncompact"] = asm["_uncompact"];

  var establishStackSpace = Module["establishStackSpace"] = asm["establishStackSpace"];
  var stackAlloc = Module["stackAlloc"] = asm["stackAlloc"];
  var stackRestore = Module["stackRestore"] = asm["stackRestore"];
  var stackSave = Module["stackSave"] = asm["stackSave"];
  Module["asm"] = asm;
  Module["cwrap"] = cwrap;
  Module["setValue"] = setValue;
  Module["getValue"] = getValue;
  Module["getTempRet0"] = getTempRet0;

  if (memoryInitializer) {
    if (!isDataURI(memoryInitializer)) {
      memoryInitializer = locateFile(memoryInitializer);
    }

    {
      addRunDependency("memory initializer");

      var applyMemoryInitializer = function (data) {
        if (data.byteLength) { data = new Uint8Array(data); }
        HEAPU8.set(data, GLOBAL_BASE);
        if (Module["memoryInitializerRequest"]) { delete Module["memoryInitializerRequest"].response; }
        removeRunDependency("memory initializer");
      };

      var doBrowserLoad = function () {
        readAsync(memoryInitializer, applyMemoryInitializer, function () {
          throw "could not load memory initializer " + memoryInitializer;
        });
      };

      var memoryInitializerBytes = tryParseAsDataURI(memoryInitializer);

      if (memoryInitializerBytes) {
        applyMemoryInitializer(memoryInitializerBytes.buffer);
      } else if (Module["memoryInitializerRequest"]) {
        var useRequest = function () {
          var request = Module["memoryInitializerRequest"];
          var response = request.response;

          if (request.status !== 200 && request.status !== 0) {
            var data = tryParseAsDataURI(Module["memoryInitializerRequestURL"]);

            if (data) {
              response = data.buffer;
            } else {
              console.warn("a problem seems to have happened with Module.memoryInitializerRequest, status: " + request.status + ", retrying " + memoryInitializer);
              doBrowserLoad();
              return;
            }
          }

          applyMemoryInitializer(response);
        };

        if (Module["memoryInitializerRequest"].response) {
          setTimeout(useRequest, 0);
        } else {
          Module["memoryInitializerRequest"].addEventListener("load", useRequest);
        }
      } else {
        doBrowserLoad();
      }
    }
  }

  var calledRun;

  dependenciesFulfilled = function runCaller() {
    if (!calledRun) { run(); }
    if (!calledRun) { dependenciesFulfilled = runCaller; }
  };

  function run(args) {
    args = args || arguments_;

    if (runDependencies > 0) {
      return;
    }

    preRun();
    if (runDependencies > 0) { return; }

    function doRun() {
      if (calledRun) { return; }
      calledRun = true;
      if (ABORT) { return; }
      initRuntime();
      preMain();
      if (Module["onRuntimeInitialized"]) { Module["onRuntimeInitialized"](); }
      postRun();
    }

    if (Module["setStatus"]) {
      Module["setStatus"]("Running...");
      setTimeout(function () {
        setTimeout(function () {
          Module["setStatus"]("");
        }, 1);
        doRun();
      }, 1);
    } else {
      doRun();
    }
  }

  Module["run"] = run;

  function abort(what) {
    if (Module["onAbort"]) {
      Module["onAbort"](what);
    }

    what += "";
    out(what);
    err(what);
    ABORT = true;
    throw "abort(" + what + "). Build with -s ASSERTIONS=1 for more info.";
  }

  Module["abort"] = abort;

  if (Module["preInit"]) {
    if (typeof Module["preInit"] == "function") { Module["preInit"] = [Module["preInit"]]; }

    while (Module["preInit"].length > 0) {
      Module["preInit"].pop()();
    }
  }
  run();
  return libh3;
}(typeof libh3 === 'object' ? libh3 : {});

/*
 * Copyright 2018-2019 Uber Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Define the C bindings for the h3 library
// Add some aliases to make the function definitions more intelligible
var NUMBER = 'number';
var BOOLEAN = NUMBER;
var H3_LOWER = NUMBER;
var H3_UPPER = NUMBER;
var RESOLUTION = NUMBER;
var POINTER = NUMBER; // Define the bindings to functions in the C lib. Functions are defined as
// [name, return type, [arg types]]. You must run `npm run build-emscripten`
// before new functions added here will be available.

var BINDINGS = [// The size functions are inserted via build/sizes.h
['sizeOfH3Index', NUMBER], ['sizeOfGeoCoord', NUMBER], ['sizeOfGeoBoundary', NUMBER], ['sizeOfGeoPolygon', NUMBER], ['sizeOfGeofence', NUMBER], ['sizeOfLinkedGeoPolygon', NUMBER], ['sizeOfCoordIJ', NUMBER], // The remaining functions are defined in the core lib in h3Api.h
['h3IsValid', BOOLEAN, [H3_LOWER, H3_UPPER]], ['geoToH3', H3_LOWER, [NUMBER, NUMBER, RESOLUTION]], ['h3ToGeo', null, [H3_LOWER, H3_UPPER, POINTER]], ['h3ToGeoBoundary', null, [H3_LOWER, H3_UPPER, POINTER]], ['maxKringSize', NUMBER, [NUMBER]], ['kRing', null, [H3_LOWER, H3_UPPER, NUMBER, POINTER]], ['kRingDistances', null, [H3_LOWER, H3_UPPER, NUMBER, POINTER, POINTER]], ['hexRing', null, [H3_LOWER, H3_UPPER, NUMBER, POINTER]], ['maxPolyfillSize', NUMBER, [POINTER, RESOLUTION]], ['polyfill', null, [POINTER, RESOLUTION, POINTER]], ['h3SetToLinkedGeo', null, [POINTER, NUMBER, POINTER]], ['destroyLinkedPolygon', null, [POINTER]], ['compact', NUMBER, [POINTER, POINTER, NUMBER]], ['uncompact', NUMBER, [POINTER, NUMBER, POINTER, NUMBER, RESOLUTION]], ['maxUncompactSize', NUMBER, [POINTER, NUMBER, RESOLUTION]], ['h3IsPentagon', BOOLEAN, [H3_LOWER, H3_UPPER]], ['h3IsResClassIII', BOOLEAN, [H3_LOWER, H3_UPPER]], ['h3GetBaseCell', NUMBER, [H3_LOWER, H3_UPPER]], ['maxFaceCount', NUMBER, [H3_LOWER, H3_UPPER]], ['h3GetFaces', null, [H3_LOWER, H3_UPPER, POINTER]], ['h3ToParent', H3_LOWER, [H3_LOWER, H3_UPPER, RESOLUTION]], ['h3ToChildren', null, [H3_LOWER, H3_UPPER, RESOLUTION, POINTER]], ['h3ToCenterChild', H3_LOWER, [H3_LOWER, H3_UPPER, RESOLUTION]], ['maxH3ToChildrenSize', NUMBER, [H3_LOWER, H3_UPPER, RESOLUTION]], ['h3IndexesAreNeighbors', BOOLEAN, [H3_LOWER, H3_UPPER, H3_LOWER, H3_UPPER]], ['getH3UnidirectionalEdge', H3_LOWER, [H3_LOWER, H3_UPPER, H3_LOWER, H3_UPPER]], ['getOriginH3IndexFromUnidirectionalEdge', H3_LOWER, [H3_LOWER, H3_UPPER]], ['getDestinationH3IndexFromUnidirectionalEdge', H3_LOWER, [H3_LOWER, H3_UPPER]], ['h3UnidirectionalEdgeIsValid', BOOLEAN, [H3_LOWER, H3_UPPER]], ['getH3IndexesFromUnidirectionalEdge', null, [H3_LOWER, H3_UPPER, POINTER]], ['getH3UnidirectionalEdgesFromHexagon', null, [H3_LOWER, H3_UPPER, POINTER]], ['getH3UnidirectionalEdgeBoundary', null, [H3_LOWER, H3_UPPER, POINTER]], ['h3Distance', NUMBER, [H3_LOWER, H3_UPPER, H3_LOWER, H3_UPPER]], ['h3Line', NUMBER, [H3_LOWER, H3_UPPER, H3_LOWER, H3_UPPER, POINTER]], ['h3LineSize', NUMBER, [H3_LOWER, H3_UPPER, H3_LOWER, H3_UPPER]], ['experimentalH3ToLocalIj', NUMBER, [H3_LOWER, H3_UPPER, H3_LOWER, H3_UPPER, POINTER]], ['experimentalLocalIjToH3', NUMBER, [H3_LOWER, H3_UPPER, POINTER, POINTER]], ['hexAreaM2', NUMBER, [RESOLUTION]], ['hexAreaKm2', NUMBER, [RESOLUTION]], ['edgeLengthM', NUMBER, [RESOLUTION]], ['edgeLengthKm', NUMBER, [RESOLUTION]], ['numHexagons', NUMBER, [RESOLUTION]], ['getRes0Indexes', null, [POINTER]], ['res0IndexCount', NUMBER], ['getPentagonIndexes', null, [NUMBER, POINTER]], ['pentagonIndexCount', NUMBER]];

/*
 * Copyright 2018-2019 Uber Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var H3 = {}; // Create the bound functions themselves

BINDINGS.forEach(function bind(def) {
  H3[def[0]] = libh3.cwrap.apply(libh3, def);
}); // Alias the hexidecimal base for legibility

var BASE_16 = 16; // ----------------------------------------------------------------------------
// Byte size imports

var SZ_INT = 4;
var SZ_PTR = 4;
var SZ_DBL = 8;
var SZ_H3INDEX = H3.sizeOfH3Index();
var SZ_GEOCOORD = H3.sizeOfGeoCoord();
var SZ_GEOBOUNDARY = H3.sizeOfGeoBoundary();
var SZ_GEOPOLYGON = H3.sizeOfGeoPolygon();
var SZ_GEOFENCE = H3.sizeOfGeofence();
var SZ_LINKED_GEOPOLYGON = H3.sizeOfLinkedGeoPolygon();
var SZ_COORDIJ = H3.sizeOfCoordIJ(); // ----------------------------------------------------------------------------
// Custom types

/**
 * 64-bit hexidecimal string representation of an H3 index
 * @static
 * @typedef {string} H3Index
 */

/**
 * Coordinates as an `{i, j}` pair
 * @static
 * @typedef CoordIJ
 * @type {Object}
 * @property {number} i
 * @property {number} j
 */
// ----------------------------------------------------------------------------
// Unit constants

var UNITS = {
  m: 'm',
  km: 'km',
  m2: 'm2',
  km2: 'km2'
}; // ----------------------------------------------------------------------------
// Utilities and helpers

/**
 * Validate a resolution, throwing an error if invalid
 * @private
 * @param  {mixed} res Value to validate
 * @throws {Error}     Error if invalid
 */

function validateRes(res) {
  if (typeof res !== 'number' || res < 0 || res > 15 || Math.floor(res) !== res) {
    throw new Error(("Invalid resolution: " + res));
  }
}

var INVALID_HEXIDECIMAL_CHAR = /[^0-9a-fA-F]/;
/**
 * Convert an H3 index (64-bit hexidecimal string) into a "split long" - a pair of 32-bit ints
 * @private
 * @param  {H3Index} h3Index  H3 index to check
 * @return {number[]}         A two-element array with 32 lower bits and 32 upper bits
 */

function h3IndexToSplitLong(h3Index) {
  if (typeof h3Index !== 'string' || INVALID_HEXIDECIMAL_CHAR.test(h3Index)) {
    return [0, 0];
  }

  var upper = parseInt(h3Index.substring(0, h3Index.length - 8), BASE_16);
  var lower = parseInt(h3Index.substring(h3Index.length - 8), BASE_16);
  return [lower, upper];
}
/**
 * Convert a 32-bit int to a hexdecimal string
 * @private
 * @param  {number} num  Integer to convert
 * @return {H3Index}     Hexidecimal string
 */


function hexFrom32Bit(num) {
  if (num >= 0) {
    return num.toString(BASE_16);
  } // Handle negative numbers


  num = num & 0x7fffffff;
  var tempStr = zeroPad(8, num.toString(BASE_16));
  var topNum = (parseInt(tempStr[0], BASE_16) + 8).toString(BASE_16);
  tempStr = topNum + tempStr.substring(1);
  return tempStr;
}
/**
 * Get a H3 index from a split long (pair of 32-bit ints)
 * @private
 * @param  {number} lower Lower 32 bits
 * @param  {number} upper Upper 32 bits
 * @return {H3Index}       H3 index
 */


function splitLongToh3Index(lower, upper) {
  return hexFrom32Bit(upper) + zeroPad(8, hexFrom32Bit(lower));
}
/**
 * Zero-pad a string to a given length
 * @private
 * @param  {number} fullLen Target length
 * @param  {string} numStr  String to zero-pad
 * @return {string}         Zero-padded string
 */


function zeroPad(fullLen, numStr) {
  var numZeroes = fullLen - numStr.length;
  var outStr = '';

  for (var i = 0; i < numZeroes; i++) {
    outStr += '0';
  }

  outStr = outStr + numStr;
  return outStr;
}
/**
 * Populate a C-appropriate Geofence struct from a polygon array
 * @private
 * @param  {Array[]} polygonArray Polygon, as an array of coordinate pairs
 * @param  {number}  geofence     C pointer to a Geofence struct
 * @param  {boolean} isGeoJson    Whether coordinates are in [lng, lat] order per GeoJSON spec
 * @return {number}               C pointer to populated Geofence struct
 */


function polygonArrayToGeofence(polygonArray, geofence, isGeoJson) {
  var numVerts = polygonArray.length;

  var geoCoordArray = libh3._calloc(numVerts, SZ_GEOCOORD); // Support [lng, lat] pairs if GeoJSON is specified


  var latIndex = isGeoJson ? 1 : 0;
  var lngIndex = isGeoJson ? 0 : 1;

  for (var i = 0; i < numVerts * 2; i += 2) {
    libh3.HEAPF64.set([polygonArray[i / 2][latIndex], polygonArray[i / 2][lngIndex]].map(degsToRads), geoCoordArray / SZ_DBL + i);
  }

  libh3.HEAPU32.set([numVerts, geoCoordArray], geofence / SZ_INT);
  return geofence;
}
/**
 * Create a C-appropriate GeoPolygon struct from an array of polygons
 * @private
 * @param  {Array[]} coordinates  Array of polygons, each an array of coordinate pairs
 * @param  {boolean} isGeoJson    Whether coordinates are in [lng, lat] order per GeoJSON spec
 * @return {number}               C pointer to populated GeoPolygon struct
 */


function coordinatesToGeoPolygon(coordinates, isGeoJson) {
  // Any loops beyond the first loop are holes
  var numHoles = coordinates.length - 1;

  var geoPolygon = libh3._calloc(SZ_GEOPOLYGON); // Byte positions within the struct


  var geofenceOffset = 0;
  var numHolesOffset = geofenceOffset + SZ_GEOFENCE;
  var holesOffset = numHolesOffset + SZ_INT; // geofence is first part of struct

  polygonArrayToGeofence(coordinates[0], geoPolygon + geofenceOffset, isGeoJson);
  var holes;

  if (numHoles > 0) {
    holes = libh3._calloc(numHoles, SZ_GEOFENCE);

    for (var i = 0; i < numHoles; i++) {
      polygonArrayToGeofence(coordinates[i + 1], holes + SZ_GEOFENCE * i, isGeoJson);
    }
  }

  libh3.setValue(geoPolygon + numHolesOffset, numHoles, 'i32');
  libh3.setValue(geoPolygon + holesOffset, holes, 'i32');
  return geoPolygon;
}
/**
 * Free memory allocated for a GeoPolygon struct. It is an error to access the struct
 * after passing it to this method.
 * @private
 * @return {number} geoPolygon C pointer to populated GeoPolygon struct
 */


function destroyGeoPolygon(geoPolygon) {
  // Byte positions within the struct
  var geofenceOffset = 0;
  var numHolesOffset = geofenceOffset + SZ_GEOFENCE;
  var holesOffset = numHolesOffset + SZ_INT; // Free the outer loop

  libh3._free(libh3.getValue(geoPolygon + geofenceOffset, 'i8*')); // Free the holes, if any


  var numHoles = libh3.getValue(geoPolygon + numHolesOffset, 'i32');

  for (var i = 0; i < numHoles; i++) {
    libh3._free(libh3.getValue(geoPolygon + holesOffset + SZ_GEOFENCE * i, 'i8*'));
  }

  libh3._free(geoPolygon);
}
/**
 * Read a long value, returning the lower and upper portions as separate 32-bit integers.
 * Because the upper bits are returned via side effect, the argument to this function is
 * intended to be the invocation that caused the side effect, e.g. readLong(H3.getSomeLong())
 * @private
 * @param  {number} invocation Invoked function returning a long value. The actual return
 *                             value of these functions is a 32-bit integer.
 * @return {number}            Long value as a [lower, upper] pair
 */


function readLong(invocation) {
  // Upper 32-bits of the long set via side-effect
  var upper = libh3.getTempRet0();
  return [invocation, upper];
}
/**
 * Read an H3 index from a C return value. As with readLong, the argument to this function
 * is intended to be an invocation, e.g. readH3Index(H3.getSomeAddress()), to help ensure that
 * the temp value storing the upper bits of the long is still set.
 * @private
 * @param  {number} invocation  Invoked function returning a single H3 index
 * @return {H3Index}            H3 index, or null if index was invalid
 */


function readH3Index(invocation) {
  var ref = readLong(invocation);
  var lower = ref[0];
  var upper = ref[1]; // The lower bits are allowed to be 0s, but if the upper bits are 0
  // this represents an invalid H3 index

  return upper ? splitLongToh3Index(lower, upper) : null;
}
/**
 * Read an H3 index from a pointer to C memory.
 * @private
 * @param  {number} cAddress  Pointer to allocated C memory
 * @param {number} offset     Offset, in number of H3 indexes, in case we're
 *                            reading an array
 * @return {H3Index}          H3 index, or null if index was invalid
 */


function readH3IndexFromPointer(cAddress, offset) {
  if ( offset === void 0 ) offset = 0;

  var lower = libh3.getValue(cAddress + SZ_INT * offset * 2, 'i32');
  var upper = libh3.getValue(cAddress + SZ_INT * (offset * 2 + 1), 'i32'); // The lower bits are allowed to be 0s, but if the upper bits are 0
  // this represents an invalid H3 index

  return upper ? splitLongToh3Index(lower, upper) : null;
}
/**
 * Store an H3 index in C memory. Primarily used as an efficient way to
 * write sets of hexagons.
 * @private
 * @param  {H3Index} h3Index  H3 index to store
 * @param  {number} cAddress  Pointer to allocated C memory
 * @param {number} offset     Offset, in number of H3 indexes from beginning
 *                            of the current array
 */


function storeH3Index(h3Index, cAddress, offset) {
  // HEAPU32 is a typed array projection on the index space
  // as unsigned 32-bit integers. This means the index needs
  // to be divided by SZ_INT (4) to access correctly. Also,
  // the H3 index is 64 bits, so we skip by twos as we're writing
  // to 32-bit integers in the proper order.
  libh3.HEAPU32.set(h3IndexToSplitLong(h3Index), cAddress / SZ_INT + 2 * offset);
}
/**
 * Read an array of 64-bit H3 indexes from C and convert to a JS array of
 * H3 index strings
 * @private
 * @param  {number} cAddress    Pointer to C ouput array
 * @param  {number} maxCount    Max number of hexagons in array. Hexagons with
 *                              the value 0 will be skipped, so this isn't
 *                              necessarily the length of the output array.
 * @return {H3Index[]}          Array of H3 indexes
 */


function readArrayOfHexagons(cAddress, maxCount) {
  var out = [];

  for (var i = 0; i < maxCount; i++) {
    var h3Index = readH3IndexFromPointer(cAddress, i);

    if (h3Index !== null) {
      out.push(h3Index);
    }
  }

  return out;
}
/**
 * Store an array of H3 index strings as a C array of 64-bit integers.
 * @private
 * @param  {number} cAddress    Pointer to C input array
 * @param  {H3Index[]} hexagons H3 indexes to pass to the C lib
 */


function storeArrayOfHexagons(cAddress, hexagons) {
  // Assuming the cAddress points to an already appropriately
  // allocated space
  var count = hexagons.length;

  for (var i = 0; i < count; i++) {
    storeH3Index(hexagons[i], cAddress, i);
  }
}

function readSingleCoord(cAddress) {
  return radsToDegs(libh3.getValue(cAddress, 'double'));
}
/**
 * Read a GeoCoord from C and return a [lat, lng] pair.
 * @private
 * @param  {number} cAddress    Pointer to C struct
 * @return {number[]}           [lat, lng] pair
 */


function readGeoCoord(cAddress) {
  return [readSingleCoord(cAddress), readSingleCoord(cAddress + SZ_DBL)];
}
/**
 * Read a GeoCoord from C and return a GeoJSON-style [lng, lat] pair.
 * @private
 * @param  {number} cAddress    Pointer to C struct
 * @return {number[]}           [lng, lat] pair
 */


function readGeoCoordGeoJson(cAddress) {
  return [readSingleCoord(cAddress + SZ_DBL), readSingleCoord(cAddress)];
}
/**
 * Read the GeoBoundary structure into a list of geo coordinate pairs
 * @private
 * @param {number}  geoBoundary     C pointer to GeoBoundary struct
 * @param {boolean} geoJsonCoords   Whether to provide GeoJSON coordinate order: [lng, lat]
 * @param {boolean} closedLoop      Whether to close the loop
 * @return {Array[]}                Array of geo coordinate pairs
 */


function readGeoBoundary(geoBoundary, geoJsonCoords, closedLoop) {
  var numVerts = libh3.getValue(geoBoundary, 'i32'); // Note that though numVerts is an int, the coordinate doubles have to be
  // aligned to 8 bytes, hence the 8-byte offset here

  var vertsPos = geoBoundary + SZ_DBL;
  var out = []; // Support [lng, lat] pairs if GeoJSON is specified

  var readCoord = geoJsonCoords ? readGeoCoordGeoJson : readGeoCoord;

  for (var i = 0; i < numVerts * 2; i += 2) {
    out.push(readCoord(vertsPos + SZ_DBL * i));
  }

  if (closedLoop) {
    // Close loop if GeoJSON is specified
    out.push(out[0]);
  }

  return out;
}
/**
 * Read the LinkedGeoPolygon structure into a nested array of MultiPolygon coordinates
 * @private
 * @param {number}  polygon         C pointer to LinkedGeoPolygon struct
 * @param {boolean} formatAsGeoJson Whether to provide GeoJSON output: [lng, lat], closed loops
 * @return {number[][][][]}         MultiPolygon-style output.
 */


function readMultiPolygon(polygon, formatAsGeoJson) {
  var output = [];
  var readCoord = formatAsGeoJson ? readGeoCoordGeoJson : readGeoCoord;
  var loops;
  var loop;
  var coords;
  var coord; // Loop through the linked structure, building the output

  while (polygon) {
    output.push(loops = []); // Follow ->first pointer

    loop = libh3.getValue(polygon, 'i8*');

    while (loop) {
      loops.push(coords = []); // Follow ->first pointer

      coord = libh3.getValue(loop, 'i8*');

      while (coord) {
        coords.push(readCoord(coord)); // Follow ->next pointer

        coord = libh3.getValue(coord + SZ_DBL * 2, 'i8*');
      }

      if (formatAsGeoJson) {
        // Close loop if GeoJSON is requested
        coords.push(coords[0]);
      } // Follow ->next pointer


      loop = libh3.getValue(loop + SZ_PTR * 2, 'i8*');
    } // Follow ->next pointer


    polygon = libh3.getValue(polygon + SZ_PTR * 2, 'i8*');
  }

  return output;
}
/**
 * Read a CoordIJ from C and return an {i, j} pair.
 * @private
 * @param  {number} cAddress    Pointer to C struct
 * @return {CoordIJ}            {i, j} pair
 */


function readCoordIJ(cAddress) {
  return {
    i: libh3.getValue(cAddress, 'i32'),
    j: libh3.getValue(cAddress + SZ_INT, 'i32')
  };
}
/**
 * Store an {i, j} pair to a C CoordIJ struct.
 * @private
 * @param  {number} cAddress    Pointer to C struct
 * @return {CoordIJ}            {i, j} pair
 */


function storeCoordIJ(cAddress, ref) {
  var i = ref.i;
  var j = ref.j;

  libh3.setValue(cAddress, i, 'i32');
  libh3.setValue(cAddress + SZ_INT, j, 'i32');
}
/**
 * Read an array of positive integers array from C. Negative
 * values are considered invalid and ignored in output.
 * @private
 * @param  {number} cAddress    Pointer to C array
 * @param  {number} count       Length of C array
 * @return {number[]}           Javascript integer array
 */


function readArrayOfPositiveIntegers(cAddress, count) {
  var out = [];

  for (var i = 0; i < count; i++) {
    var int = libh3.getValue(cAddress + SZ_INT * i, 'i32');

    if (int >= 0) {
      out.push(int);
    }
  }

  return out;
} // ----------------------------------------------------------------------------
// Public API functions: Core

/**
 * Whether a given string represents a valid H3 index
 * @static
 * @param  {H3Index} h3Index  H3 index to check
 * @return {boolean}          Whether the index is valid
 */


function h3IsValid(h3Index) {
  var ref = h3IndexToSplitLong(h3Index);
  var lower = ref[0];
  var upper = ref[1];
  return Boolean(H3.h3IsValid(lower, upper));
}
/**
 * Whether the given H3 index is a pentagon
 * @static
 * @param  {H3Index} h3Index  H3 index to check
 * @return {boolean}          isPentagon
 */

function h3IsPentagon(h3Index) {
  var ref = h3IndexToSplitLong(h3Index);
  var lower = ref[0];
  var upper = ref[1];
  return Boolean(H3.h3IsPentagon(lower, upper));
}
/**
 * Whether the given H3 index is in a Class III resolution (rotated versus
 * the icosahedron and subject to shape distortion adding extra points on
 * icosahedron edges, making them not true hexagons).
 * @static
 * @param  {H3Index} h3Index  H3 index to check
 * @return {boolean}          isResClassIII
 */

function h3IsResClassIII(h3Index) {
  var ref = h3IndexToSplitLong(h3Index);
  var lower = ref[0];
  var upper = ref[1];
  return Boolean(H3.h3IsResClassIII(lower, upper));
}
/**
 * Get the number of the base cell for a given H3 index
 * @static
 * @param  {H3Index} h3Index  H3 index to get the base cell for
 * @return {number}           Index of the base cell (0-121)
 */

function h3GetBaseCell(h3Index) {
  var ref = h3IndexToSplitLong(h3Index);
  var lower = ref[0];
  var upper = ref[1];
  return H3.h3GetBaseCell(lower, upper);
}
/**
 * Get the indices of all icosahedron faces intersected by a given H3 index
 * @static
 * @param  {H3Index} h3Index  H3 index to get faces for
 * @return {number[]}         Indices (0-19) of all intersected faces
 */

function h3GetFaces(h3Index) {
  var ref = h3IndexToSplitLong(h3Index);
  var lower = ref[0];
  var upper = ref[1];
  var count = H3.maxFaceCount(lower, upper);

  var faces = libh3._malloc(SZ_INT * count);

  H3.h3GetFaces(lower, upper, faces);
  var out = readArrayOfPositiveIntegers(faces, count);

  libh3._free(faces);

  return out;
}
/**
 * Returns the resolution of an H3 index
 * @static
 * @param  {H3Index} h3Index H3 index to get resolution
 * @return {number}          The number (0-15) resolution, or -1 if invalid
 */

function h3GetResolution(h3Index) {
  if (typeof h3Index !== 'string') {
    return -1;
  }

  return parseInt(h3Index.charAt(1), BASE_16);
}
/**
 * Get the hexagon containing a lat,lon point
 * @static
 * @param  {number} lat Latitude of point
 * @param  {number} lng Longtitude of point
 * @param  {number} res Resolution of hexagons to return
 * @return {H3Index}    H3 index
 */

function geoToH3(lat, lng, res) {
  var latlng = libh3._malloc(SZ_GEOCOORD); // Slightly more efficient way to set the memory


  libh3.HEAPF64.set([lat, lng].map(degsToRads), latlng / SZ_DBL); // Read value as a split long

  var h3Index = readH3Index(H3.geoToH3(latlng, res));

  libh3._free(latlng);

  return h3Index;
}
/**
 * Get the lat,lon center of a given hexagon
 * @static
 * @param  {H3Index} h3Index  H3 index
 * @return {number[]}         Point as a [lat, lng] pair
 */

function h3ToGeo(h3Index) {
  var latlng = libh3._malloc(SZ_GEOCOORD);

  var ref = h3IndexToSplitLong(h3Index);
  var lower = ref[0];
  var upper = ref[1];
  H3.h3ToGeo(lower, upper, latlng);
  var out = readGeoCoord(latlng);

  libh3._free(latlng);

  return out;
}
/**
 * Get the vertices of a given hexagon (or pentagon), as an array of [lat, lng]
 * points. For pentagons and hexagons on the edge of an icosahedron face, this
 * function may return up to 10 vertices.
 * @static
 * @param  {H3Index} h3Index          H3 index
 * @param {boolean} [formatAsGeoJson] Whether to provide GeoJSON output: [lng, lat], closed loops
 * @return {number[][]}               Array of [lat, lng] pairs
 */

function h3ToGeoBoundary(h3Index, formatAsGeoJson) {
  var geoBoundary = libh3._malloc(SZ_GEOBOUNDARY);

  var ref = h3IndexToSplitLong(h3Index);
  var lower = ref[0];
  var upper = ref[1];
  H3.h3ToGeoBoundary(lower, upper, geoBoundary);
  var out = readGeoBoundary(geoBoundary, formatAsGeoJson, formatAsGeoJson);

  libh3._free(geoBoundary);

  return out;
} // ----------------------------------------------------------------------------
// Public API functions: Algorithms

/**
 * Get the parent of the given hexagon at a particular resolution
 * @static
 * @param  {H3Index} h3Index  H3 index to get parent for
 * @param  {number} res       Resolution of hexagon to return
 * @return {H3Index}          H3 index of parent, or null for invalid input
 */

function h3ToParent(h3Index, res) {
  var ref = h3IndexToSplitLong(h3Index);
  var lower = ref[0];
  var upper = ref[1];
  return readH3Index(H3.h3ToParent(lower, upper, res));
}
/**
 * Get the children/descendents of the given hexagon at a particular resolution
 * @static
 * @param  {H3Index} h3Index  H3 index to get children for
 * @param  {number} res       Resolution of hexagons to return
 * @return {H3Index[]}        H3 indexes of children, or empty array for invalid input
 */

function h3ToChildren(h3Index, res) {
  // Bad input in this case can potentially result in high computation volume
  // using the current C algorithm. Validate and return an empty array on failure.
  if (!h3IsValid(h3Index)) {
    return [];
  }

  var ref = h3IndexToSplitLong(h3Index);
  var lower = ref[0];
  var upper = ref[1];
  var maxCount = H3.maxH3ToChildrenSize(lower, upper, res);

  var hexagons = libh3._calloc(maxCount, SZ_H3INDEX);

  H3.h3ToChildren(lower, upper, res, hexagons);
  var out = readArrayOfHexagons(hexagons, maxCount);

  libh3._free(hexagons);

  return out;
}
/**
 * Get the center child of the given hexagon at a particular resolution
 * @static
 * @param  {H3Index} h3Index  H3 index to get center child for
 * @param  {number} res       Resolution of hexagon to return
 * @return {H3Index}          H3 index of child, or null for invalid input
 */

function h3ToCenterChild(h3Index, res) {
  var ref = h3IndexToSplitLong(h3Index);
  var lower = ref[0];
  var upper = ref[1];
  return readH3Index(H3.h3ToCenterChild(lower, upper, res));
}
/**
 * Get all hexagons in a k-ring around a given center. The order of the hexagons is undefined.
 * @static
 * @param  {H3Index} h3Index  H3 index of center hexagon
 * @param  {number} ringSize  Radius of k-ring
 * @return {H3Index[]}        H3 indexes for all hexagons in ring
 */

function kRing(h3Index, ringSize) {
  var ref = h3IndexToSplitLong(h3Index);
  var lower = ref[0];
  var upper = ref[1];
  var maxCount = H3.maxKringSize(ringSize);

  var hexagons = libh3._calloc(maxCount, SZ_H3INDEX);

  H3.kRing(lower, upper, ringSize, hexagons);
  var out = readArrayOfHexagons(hexagons, maxCount);

  libh3._free(hexagons);

  return out;
}
/**
 * Get all hexagons in a k-ring around a given center, in an array of arrays
 * ordered by distance from the origin. The order of the hexagons within each ring is undefined.
 * @static
 * @param  {H3Index} h3Index  H3 index of center hexagon
 * @param  {number} ringSize  Radius of k-ring
 * @return {H3Index[][]}      Array of arrays with H3 indexes for all hexagons each ring
 */

function kRingDistances(h3Index, ringSize) {
  var ref = h3IndexToSplitLong(h3Index);
  var lower = ref[0];
  var upper = ref[1];
  var maxCount = H3.maxKringSize(ringSize);

  var kRings = libh3._calloc(maxCount, SZ_H3INDEX);

  var distances = libh3._calloc(maxCount, SZ_INT);

  H3.kRingDistances(lower, upper, ringSize, kRings, distances); // Create an array of empty arrays to hold the output

  var out = [];

  for (var i = 0; i < ringSize + 1; i++) {
    out.push([]);
  } // Read the array of hexagons, putting them into the appropriate rings


  for (var i$1 = 0; i$1 < maxCount * 2; i$1 += 2) {
    var hexLower = libh3.getValue(kRings + SZ_INT * i$1, 'i32');
    var hexUpper = libh3.getValue(kRings + SZ_INT * (i$1 + 1), 'i32');
    var index = libh3.getValue(distances + SZ_INT * (i$1 / 2), 'i32');

    if (hexLower !== 0 || hexUpper !== 0) {
      out[index].push(splitLongToh3Index(hexLower, hexUpper));
    }
  }

  libh3._free(kRings);

  libh3._free(distances);

  return out;
}
/**
 * Get all hexagons in a hollow hexagonal ring centered at origin with sides of a given length.
 * Unlike kRing, this function will throw an error if there is a pentagon anywhere in the ring.
 * @static
 * @param  {H3Index} h3Index  H3 index of center hexagon
 * @param  {number} ringSize  Radius of ring
 * @return {H3Index[]}        H3 indexes for all hexagons in ring
 * @throws {Error}            If the algorithm could not calculate the ring
 */

function hexRing(h3Index, ringSize) {
  var maxCount = ringSize === 0 ? 1 : 6 * ringSize;

  var hexagons = libh3._calloc(maxCount, SZ_H3INDEX);

  var retVal = H3.hexRing.apply(H3, h3IndexToSplitLong(h3Index).concat( [ringSize], [hexagons] ));

  if (retVal !== 0) {
    libh3._free(hexagons);

    throw new Error('Failed to get hexRing (encountered a pentagon?)');
  }

  var out = readArrayOfHexagons(hexagons, maxCount);

  libh3._free(hexagons);

  return out;
}
/**
 * Get all hexagons with centers contained in a given polygon. The polygon
 * is specified with GeoJson semantics as an array of loops. Each loop is
 * an array of [lat, lng] pairs (or [lng, lat] if isGeoJson is specified).
 * The first loop is the perimeter of the polygon, and subsequent loops are
 * expected to be holes.
 * @static
 * @param  {number[][] | number[][][]} coordinates
 *                                  Array of loops, or a single loop
 * @param  {number} res             Resolution of hexagons to return
 * @param  {boolean} [isGeoJson]    Whether to expect GeoJson-style [lng, lat]
 *                                  pairs instead of [lat, lng]
 * @return {H3Index[]}              H3 indexes for all hexagons in polygon
 */

function polyfill(coordinates, res, isGeoJson) {
  validateRes(res);
  isGeoJson = Boolean(isGeoJson); // Guard against empty input

  if (coordinates.length === 0 || coordinates[0].length === 0) {
    return [];
  } // Wrap to expected format if a single loop is provided


  if (typeof coordinates[0][0] === 'number') {
    coordinates = [coordinates];
  }

  var geoPolygon = coordinatesToGeoPolygon(coordinates, isGeoJson);
  var arrayLen = H3.maxPolyfillSize(geoPolygon, res);

  var hexagons = libh3._calloc(arrayLen, SZ_H3INDEX);

  H3.polyfill(geoPolygon, res, hexagons);
  var out = readArrayOfHexagons(hexagons, arrayLen);

  libh3._free(hexagons);

  destroyGeoPolygon(geoPolygon);
  return out;
}
/**
 * Get the outlines of a set of H3 hexagons, returned in GeoJSON MultiPolygon
 * format (an array of polygons, each with an array of loops, each an array of
 * coordinates). Coordinates are returned as [lat, lng] pairs unless GeoJSON
 * is requested.
 * @static
 * @param {H3Index[]} h3Indexes       H3 indexes to get outlines for
 * @param {boolean} [formatAsGeoJson] Whether to provide GeoJSON output:
 *                                    [lng, lat], closed loops
 * @return {number[][][][]}           MultiPolygon-style output.
 */

function h3SetToMultiPolygon(h3Indexes, formatAsGeoJson) {
  // Early exit on empty input
  if (!h3Indexes || !h3Indexes.length) {
    return [];
  } // Set up input set


  var indexCount = h3Indexes.length;

  var set = libh3._calloc(indexCount, SZ_H3INDEX);

  storeArrayOfHexagons(set, h3Indexes); // Allocate memory for output linked polygon

  var polygon = libh3._calloc(SZ_LINKED_GEOPOLYGON); // Store a reference to the first polygon - that's the one we need for
  // memory deallocation


  var originalPolygon = polygon;
  H3.h3SetToLinkedGeo(set, indexCount, polygon);
  var multiPolygon = readMultiPolygon(polygon, formatAsGeoJson); // Clean up

  H3.destroyLinkedPolygon(originalPolygon);

  libh3._free(originalPolygon);

  libh3._free(set);

  return multiPolygon;
}
/**
 * Compact a set of hexagons of the same resolution into a set of hexagons across
 * multiple levels that represents the same area.
 * @static
 * @param  {H3Index[]} h3Set H3 indexes to compact
 * @return {H3Index[]}       Compacted H3 indexes
 * @throws {Error}           If the input is invalid (e.g. duplicate hexagons)
 */

function compact(h3Set) {
  if (!h3Set || !h3Set.length) {
    return [];
  } // Set up input set


  var count = h3Set.length;

  var set = libh3._calloc(count, SZ_H3INDEX);

  storeArrayOfHexagons(set, h3Set); // Allocate memory for compacted hexagons, worst-case is no compaction

  var compactedSet = libh3._calloc(count, SZ_H3INDEX);

  var retVal = H3.compact(set, compactedSet, count);

  if (retVal !== 0) {
    libh3._free(set);

    libh3._free(compactedSet);

    throw new Error('Failed to compact, malformed input data (duplicate hexagons?)');
  }

  var out = readArrayOfHexagons(compactedSet, count);

  libh3._free(set);

  libh3._free(compactedSet);

  return out;
}
/**
 * Uncompact a compacted set of hexagons to hexagons of the same resolution
 * @static
 * @param  {H3Index[]} compactedSet H3 indexes to uncompact
 * @param  {number}    res          The resolution to uncompact to
 * @return {H3Index[]}              The uncompacted H3 indexes
 * @throws {Error}                  If the input is invalid (e.g. invalid resolution)
 */

function uncompact(compactedSet, res) {
  validateRes(res);

  if (!compactedSet || !compactedSet.length) {
    return [];
  } // Set up input set


  var count = compactedSet.length;

  var set = libh3._calloc(count, SZ_H3INDEX);

  storeArrayOfHexagons(set, compactedSet); // Estimate how many hexagons we need (always overestimates if in error)

  var maxUncompactedNum = H3.maxUncompactSize(set, count, res); // Allocate memory for uncompacted hexagons

  var uncompactedSet = libh3._calloc(maxUncompactedNum, SZ_H3INDEX);

  var retVal = H3.uncompact(set, count, uncompactedSet, maxUncompactedNum, res);

  if (retVal !== 0) {
    libh3._free(set);

    libh3._free(uncompactedSet);

    throw new Error('Failed to uncompact (bad resolution?)');
  }

  var out = readArrayOfHexagons(uncompactedSet, maxUncompactedNum);

  libh3._free(set);

  libh3._free(uncompactedSet);

  return out;
} // ----------------------------------------------------------------------------
// Public API functions: Unidirectional edges

/**
 * Whether two H3 indexes are neighbors (share an edge)
 * @static
 * @param  {H3Index} origin      Origin hexagon index
 * @param  {H3Index} destination Destination hexagon index
 * @return {boolean}             Whether the hexagons share an edge
 */

function h3IndexesAreNeighbors(origin, destination) {
  var ref = h3IndexToSplitLong(origin);
  var oLower = ref[0];
  var oUpper = ref[1];
  var ref$1 = h3IndexToSplitLong(destination);
  var dLower = ref$1[0];
  var dUpper = ref$1[1];
  return Boolean(H3.h3IndexesAreNeighbors(oLower, oUpper, dLower, dUpper));
}
/**
 * Get an H3 index representing a unidirectional edge for a given origin and destination
 * @static
 * @param  {H3Index} origin      Origin hexagon index
 * @param  {H3Index} destination Destination hexagon index
 * @return {H3Index}             H3 index of the edge, or null if no edge is shared
 */

function getH3UnidirectionalEdge(origin, destination) {
  var ref = h3IndexToSplitLong(origin);
  var oLower = ref[0];
  var oUpper = ref[1];
  var ref$1 = h3IndexToSplitLong(destination);
  var dLower = ref$1[0];
  var dUpper = ref$1[1];
  return readH3Index(H3.getH3UnidirectionalEdge(oLower, oUpper, dLower, dUpper));
}
/**
 * Get the origin hexagon from an H3 index representing a unidirectional edge
 * @static
 * @param  {H3Index} edgeIndex H3 index of the edge
 * @return {H3Index}           H3 index of the edge origin
 */

function getOriginH3IndexFromUnidirectionalEdge(edgeIndex) {
  var ref = h3IndexToSplitLong(edgeIndex);
  var lower = ref[0];
  var upper = ref[1];
  return readH3Index(H3.getOriginH3IndexFromUnidirectionalEdge(lower, upper));
}
/**
 * Get the destination hexagon from an H3 index representing a unidirectional edge
 * @static
 * @param  {H3Index} edgeIndex H3 index of the edge
 * @return {H3Index}           H3 index of the edge destination
 */

function getDestinationH3IndexFromUnidirectionalEdge(edgeIndex) {
  var ref = h3IndexToSplitLong(edgeIndex);
  var lower = ref[0];
  var upper = ref[1];
  return readH3Index(H3.getDestinationH3IndexFromUnidirectionalEdge(lower, upper));
}
/**
 * Whether the input is a valid unidirectional edge
 * @static
 * @param  {H3Index} edgeIndex H3 index of the edge
 * @return {boolean}           Whether the index is valid
 */

function h3UnidirectionalEdgeIsValid(edgeIndex) {
  var ref = h3IndexToSplitLong(edgeIndex);
  var lower = ref[0];
  var upper = ref[1];
  return Boolean(H3.h3UnidirectionalEdgeIsValid(lower, upper));
}
/**
 * Get the [origin, destination] pair represented by a unidirectional edge
 * @static
 * @param  {H3Index} edgeIndex H3 index of the edge
 * @return {H3Index[]}         [origin, destination] pair as H3 indexes
 */

function getH3IndexesFromUnidirectionalEdge(edgeIndex) {
  var ref = h3IndexToSplitLong(edgeIndex);
  var lower = ref[0];
  var upper = ref[1];
  var count = 2;

  var hexagons = libh3._calloc(count, SZ_H3INDEX);

  H3.getH3IndexesFromUnidirectionalEdge(lower, upper, hexagons);
  var out = readArrayOfHexagons(hexagons, count);

  libh3._free(hexagons);

  return out;
}
/**
 * Get all of the unidirectional edges with the given H3 index as the origin (i.e. an edge to
 * every neighbor)
 * @static
 * @param  {H3Index} h3Index   H3 index of the origin hexagon
 * @return {H3Index[]}         List of unidirectional edges
 */

function getH3UnidirectionalEdgesFromHexagon(h3Index) {
  var ref = h3IndexToSplitLong(h3Index);
  var lower = ref[0];
  var upper = ref[1];
  var count = 6;

  var edges = libh3._calloc(count, SZ_H3INDEX);

  H3.getH3UnidirectionalEdgesFromHexagon(lower, upper, edges);
  var out = readArrayOfHexagons(edges, count);

  libh3._free(edges);

  return out;
}
/**
 * Get the vertices of a given edge as an array of [lat, lng] points. Note that for edges that
 * cross the edge of an icosahedron face, this may return 3 coordinates.
 * @static
 * @param  {H3Index} edgeIndex        H3 index of the edge
 * @param {boolean} [formatAsGeoJson] Whether to provide GeoJSON output: [lng, lat]
 * @return {number[][]}               Array of geo coordinate pairs
 */

function getH3UnidirectionalEdgeBoundary(edgeIndex, formatAsGeoJson) {
  var geoBoundary = libh3._malloc(SZ_GEOBOUNDARY);

  var ref = h3IndexToSplitLong(edgeIndex);
  var lower = ref[0];
  var upper = ref[1];
  H3.getH3UnidirectionalEdgeBoundary(lower, upper, geoBoundary);
  var out = readGeoBoundary(geoBoundary, formatAsGeoJson);

  libh3._free(geoBoundary);

  return out;
}
/**
 * Get the grid distance between two hex indexes. This function may fail
 * to find the distance between two indexes if they are very far apart or
 * on opposite sides of a pentagon.
 * @static
 * @param  {H3Index} origin      Origin hexagon index
 * @param  {H3Index} destination Destination hexagon index
 * @return {number}              Distance between hexagons, or a negative
 *                               number if the distance could not be computed
 */

function h3Distance(origin, destination) {
  var ref = h3IndexToSplitLong(origin);
  var oLower = ref[0];
  var oUpper = ref[1];
  var ref$1 = h3IndexToSplitLong(destination);
  var dLower = ref$1[0];
  var dUpper = ref$1[1];
  return H3.h3Distance(oLower, oUpper, dLower, dUpper);
}
/**
 * Given two H3 indexes, return the line of indexes between them (inclusive).
 *
 * This function may fail to find the line between two indexes, for
 * example if they are very far apart. It may also fail when finding
 * distances for indexes on opposite sides of a pentagon.
 *
 * Notes:
 *
 *  - The specific output of this function should not be considered stable
 *    across library versions. The only guarantees the library provides are
 *    that the line length will be `h3Distance(start, end) + 1` and that
 *    every index in the line will be a neighbor of the preceding index.
 *  - Lines are drawn in grid space, and may not correspond exactly to either
 *    Cartesian lines or great arcs.
 *
 * @static
 * @param  {H3Index} origin      Origin hexagon index
 * @param  {H3Index} destination Destination hexagon index
 * @return {H3Index[]}           H3 indexes connecting origin and destination
 * @throws {Error}               If the line cannot be calculated
 */

function h3Line(origin, destination) {
  var ref = h3IndexToSplitLong(origin);
  var oLower = ref[0];
  var oUpper = ref[1];
  var ref$1 = h3IndexToSplitLong(destination);
  var dLower = ref$1[0];
  var dUpper = ref$1[1];
  var count = H3.h3LineSize(oLower, oUpper, dLower, dUpper);

  if (count < 0) {
    // We can't get the specific error code here - may be any of
    // the errors possible in experimentalH3ToLocalIj
    throw new Error('Line cannot be calculated');
  }

  var hexagons = libh3._calloc(count, SZ_H3INDEX);

  H3.h3Line(oLower, oUpper, dLower, dUpper, hexagons);
  var out = readArrayOfHexagons(hexagons, count);

  libh3._free(hexagons);

  return out;
}
/**
 * Produces IJ coordinates for an H3 index anchored by an origin.
 *
 * - The coordinate space used by this function may have deleted
 * regions or warping due to pentagonal distortion.
 * - Coordinates are only comparable if they come from the same
 * origin index.
 * - Failure may occur if the index is too far away from the origin
 * or if the index is on the other side of a pentagon.
 * - This function is experimental, and its output is not guaranteed
 * to be compatible across different versions of H3.
 * @static
 * @param  {H3Index} origin      Origin H3 index
 * @param  {H3Index} destination H3 index for which to find relative coordinates
 * @return {CoordIJ}             Coordinates as an `{i, j}` pair
 * @throws {Error}               If the IJ coordinates cannot be calculated
 */

function experimentalH3ToLocalIj(origin, destination) {
  var ij = libh3._malloc(SZ_COORDIJ);

  var retVal = H3.experimentalH3ToLocalIj.apply(H3, h3IndexToSplitLong(origin).concat( h3IndexToSplitLong(destination), [ij] ));
  var coords = readCoordIJ(ij);

  libh3._free(ij); // Return the pair, or throw if an error code was returned.
  // Switch statement and error codes cribbed from h3-java's implementation.


  switch (retVal) {
    case 0:
      return coords;

    case 1:
      throw new Error('Incompatible origin and index.');

    case 2:
    default:
      throw new Error('Local IJ coordinates undefined for this origin and index pair. ' + 'The index may be too far from the origin.');

    case 3:
    case 4:
    case 5:
      throw new Error('Encountered possible pentagon distortion');
  }
}
/**
 * Produces an H3 index for IJ coordinates anchored by an origin.
 *
 * - The coordinate space used by this function may have deleted
 * regions or warping due to pentagonal distortion.
 * - Coordinates are only comparable if they come from the same
 * origin index.
 * - Failure may occur if the index is too far away from the origin
 * or if the index is on the other side of a pentagon.
 * - This function is experimental, and its output is not guaranteed
 * to be compatible across different versions of H3.
 * @static
 * @param  {H3Index} origin     Origin H3 index
 * @param  {CoordIJ} coords     Coordinates as an `{i, j}` pair
 * @return {H3Index}            H3 index at the relative coordinates
 * @throws {Error}              If the H3 index cannot be calculated
 */

function experimentalLocalIjToH3(origin, coords) {
  // Validate input coords
  if (!coords || typeof coords.i !== 'number' || typeof coords.j !== 'number') {
    throw new Error('Coordinates must be provided as an {i, j} object');
  } // Allocate memory for the CoordIJ struct and an H3 index to hold the return value


  var ij = libh3._malloc(SZ_COORDIJ);

  var out = libh3._malloc(SZ_H3INDEX);

  storeCoordIJ(ij, coords);
  var retVal = H3.experimentalLocalIjToH3.apply(H3, h3IndexToSplitLong(origin).concat( [ij], [out] ));
  var h3Index = readH3IndexFromPointer(out);

  libh3._free(ij);

  libh3._free(out);

  if (retVal !== 0) {
    throw new Error('Index not defined for this origin and IJ coordinates pair. ' + 'IJ coordinates may be too far from origin, or ' + 'a pentagon distortion was encountered.');
  }

  return h3Index;
} // ----------------------------------------------------------------------------
// Public informational utilities

/**
 * Average hexagon area at a given resolution
 * @static
 * @param  {number} res  Hexagon resolution
 * @param  {string} unit Area unit (either UNITS.m2 or UNITS.km2)
 * @return {number}      Average area
 * @throws {Error}       If the unit is invalid
 */

function hexArea(res, unit) {
  validateRes(res);

  switch (unit) {
    case UNITS.m2:
      return H3.hexAreaM2(res);

    case UNITS.km2:
      return H3.hexAreaKm2(res);

    default:
      throw new Error(("Unknown unit: " + unit));
  }
}
/**
 * Average hexagon edge length at a given resolution
 * @static
 * @param  {number} res  Hexagon resolution
 * @param  {string} unit Area unit (either UNITS.m or UNITS.km)
 * @return {number}      Average edge length
 * @throws {Error}       If the unit is invalid
 */

function edgeLength(res, unit) {
  validateRes(res);

  switch (unit) {
    case UNITS.m:
      return H3.edgeLengthM(res);

    case UNITS.km:
      return H3.edgeLengthKm(res);

    default:
      throw new Error(("Unknown unit: " + unit));
  }
}
/**
 * The total count of hexagons in the world at a given resolution. Note that above
 * resolution 8 the exact count cannot be represented in a JavaScript 32-bit number,
 * so consumers should use caution when applying further operations to the output.
 * @static
 * @param  {number} res  Hexagon resolution
 * @return {number}      Count
 */

function numHexagons(res) {
  validateRes(res); // Get number as a long value

  var ref = readLong(H3.numHexagons(res));
  var lower = ref[0];
  var upper = ref[1]; // If we're using <= 32 bits we can use normal JS numbers

  if (!upper) {
    return lower;
  } // Above 32 bit, make a JS number that's correct in order of magnitude


  return upper * Math.pow(2, 32) + lower;
}
/**
 * Get all H3 indexes at resolution 0. As every index at every resolution > 0 is
 * the descendant of a res 0 index, this can be used with h3ToChildren to iterate
 * over H3 indexes at any resolution.
 * @static
 * @return {H3Index[]}  All H3 indexes at res 0
 */

function getRes0Indexes() {
  var count = H3.res0IndexCount();

  var hexagons = libh3._malloc(SZ_H3INDEX * count);

  H3.getRes0Indexes(hexagons);
  var out = readArrayOfHexagons(hexagons, count);

  libh3._free(hexagons);

  return out;
}
/**
 * Get the twelve pentagon indexes at a given resolution.
 * @static
 * @param  {number} res  Hexagon resolution
 * @return {H3Index[]}  All H3 pentagon indexes at res
 */

function getPentagonIndexes(res) {
  validateRes(res);
  var count = H3.pentagonIndexCount();

  var hexagons = libh3._malloc(SZ_H3INDEX * count);

  H3.getPentagonIndexes(res, hexagons);
  var out = readArrayOfHexagons(hexagons, count);

  libh3._free(hexagons);

  return out;
}
/**
 * Convert degrees to radians
 * @static
 * @param  {number} deg Value in degrees
 * @return {number}     Value in radians
 */

function degsToRads(deg) {
  return deg * Math.PI / 180;
}
/**
 * Convert radians to degrees
 * @static
 * @param  {number} rad Value in radians
 * @return {number}     Value in degrees
 */

function radsToDegs(rad) {
  return rad * 180 / Math.PI;
}


//# sourceMappingURL=h3-js.es.js.map


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/dist/three-conic-polygon-geometry.module.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/dist/three-conic-polygon-geometry.module.js ***!
  \***********************************************************************************************/
/*! exports provided: ConicPolygonBufferGeometry, ConicPolygonGeometry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConicPolygonBufferGeometry", function() { return ConicPolygonBufferGeometry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConicPolygonGeometry", function() { return ConicPolygonGeometry; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var delaunator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! delaunator */ "./node_modules/delaunator/index.js");
/* harmony import */ var earcut__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! earcut */ "./node_modules/earcut/src/earcut.js");
/* harmony import */ var earcut__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(earcut__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _turf_boolean_point_in_polygon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @turf/boolean-point-in-polygon */ "./node_modules/@turf/boolean-point-in-polygon/index.js");
/* harmony import */ var _turf_boolean_point_in_polygon__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_turf_boolean_point_in_polygon__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/index.js");
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3-array */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/index.js");







function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var THREE = window.THREE ? window.THREE // Prefer consumption from global THREE, if exists
: {
  BufferGeometry: three__WEBPACK_IMPORTED_MODULE_0__["BufferGeometry"],
  Float32BufferAttribute: three__WEBPACK_IMPORTED_MODULE_0__["Float32BufferAttribute"],
  Geometry: three__WEBPACK_IMPORTED_MODULE_0__["Geometry"]
};

var setAttributeFn = new THREE.BufferGeometry().setAttribute ? 'setAttribute' : 'addAttribute';

function ConicPolygonGeometry(polygonGeoJson, startHeight, endHeight, closedBottom, closedTop, includeSides, curvatureResolution) {
  THREE.Geometry.call(this);
  this.type = 'ConicPolygonGeometry';
  this.parameters = {
    polygonGeoJson: polygonGeoJson,
    startHeight: startHeight,
    endHeight: endHeight,
    closedBottom: closedBottom,
    closedTop: closedTop,
    includeSides: includeSides,
    curvatureResolution: curvatureResolution
  };
  this.fromBufferGeometry(new ConicPolygonBufferGeometry(polygonGeoJson, startHeight, endHeight, closedBottom, closedTop, includeSides, curvatureResolution));
  this.mergeVertices();
}

ConicPolygonGeometry.prototype = Object.create(THREE.Geometry.prototype);
ConicPolygonGeometry.prototype.constructor = ConicPolygonGeometry;

function ConicPolygonBufferGeometry(polygonGeoJson, startHeight, endHeight, closedBottom, closedTop, includeSides, curvatureResolution) {
  var _this = this;

  THREE.BufferGeometry.call(this);
  this.type = 'ConicPolygonBufferGeometry';
  this.parameters = {
    polygonGeoJson: polygonGeoJson,
    startHeight: startHeight,
    endHeight: endHeight,
    closedBottom: closedBottom,
    closedTop: closedTop,
    includeSides: includeSides,
    curvatureResolution: curvatureResolution
  }; // defaults

  startHeight = startHeight || 0;
  endHeight = endHeight || 1;
  closedBottom = closedBottom !== undefined ? closedBottom : true;
  closedTop = closedTop !== undefined ? closedTop : true;
  includeSides = includeSides !== undefined ? includeSides : true;
  curvatureResolution = curvatureResolution || 5; // in angular degrees
  // pre-calculate contour and triangulation

  var contourGeoJson = interpolateContourPoints(polygonGeoJson, curvatureResolution);
  var geoTriangles = (closedTop || closedBottom) && triangulateGeoSurface();
  var vertices = [];
  var indices = [];
  var groupCnt = 0; // add groups to apply different materials to torso / caps

  var addGroup = function addGroup(groupData) {
    var prevVertCnt = Math.round(vertices.length / 3);
    var prevIndCnt = indices.length;
    vertices = vertices.concat(groupData.vertices);
    indices = indices.concat(!prevVertCnt ? groupData.indices : groupData.indices.map(function (ind) {
      return ind + prevVertCnt;
    }));

    _this.addGroup(prevIndCnt, indices.length - prevIndCnt, groupCnt++);
  };

  includeSides && addGroup(generateTorso());
  closedBottom && addGroup(generateCap(startHeight, false));
  closedTop && addGroup(generateCap(endHeight, true)); // build geometry

  this.setIndex(indices);
  this[setAttributeFn]('position', new THREE.Float32BufferAttribute(vertices, 3)); // auto-calculate normals

  this.computeFaceNormals();
  this.computeVertexNormals(); //

  function generateVertices(polygon, altitude) {
    var coords3d = polygon.map(function (coords) {
      return coords.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            lng = _ref2[0],
            lat = _ref2[1];

        return polar2Cartesian(lat, lng, altitude);
      });
    }); // returns { vertices, holes, coordinates }. Each point generates 3 vertice items (x,y,z).

    return earcut__WEBPACK_IMPORTED_MODULE_2___default.a.flatten(coords3d);
  }

  function generateTorso() {
    var _generateVertices = generateVertices(contourGeoJson, startHeight),
        bottomVerts = _generateVertices.vertices,
        holes = _generateVertices.holes;

    var _generateVertices2 = generateVertices(contourGeoJson, endHeight),
        topVerts = _generateVertices2.vertices;

    var vertices = Object(d3_array__WEBPACK_IMPORTED_MODULE_5__["merge"])([topVerts, bottomVerts]);
    var numPoints = Math.round(topVerts.length / 3);
    var holesIdx = new Set(holes);
    var lastHoleIdx = 0;
    var indices = [];

    for (var v0Idx = 0; v0Idx < numPoints; v0Idx++) {
      var v1Idx = v0Idx + 1; // next point

      if (v1Idx === numPoints) {
        v1Idx = lastHoleIdx; // close final loop
      } else if (holesIdx.has(v1Idx)) {
        var holeIdx = v1Idx;
        v1Idx = lastHoleIdx; // close hole loop

        lastHoleIdx = holeIdx;
      } // Each pair of coords generates two triangles (faces)


      indices.push(v0Idx, v0Idx + numPoints, v1Idx + numPoints);
      indices.push(v1Idx + numPoints, v1Idx, v0Idx);
    }

    return {
      indices: indices,
      vertices: vertices
    };
  }

  function generateCap(radius) {
    var isTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return {
      // need to reverse-wind the bottom triangles to make them face outwards
      indices: isTop ? geoTriangles.indices : geoTriangles.indices.slice().reverse(),
      vertices: generateVertices([geoTriangles.points], radius).vertices
    };
  }

  function triangulateGeoSurface() {
    var edgePnts = Object(d3_array__WEBPACK_IMPORTED_MODULE_5__["merge"])(contourGeoJson);
    var innerPoints = getInnerGeoPoints(polygonGeoJson, curvatureResolution);
    var points = [].concat(_toConsumableArray(edgePnts), _toConsumableArray(innerPoints));
    var indices = [];

    if (!innerPoints.length) {
      // earcut triangulation slightly more performant if it's only using the polygon perimeter
      var _earcut$flatten = earcut__WEBPACK_IMPORTED_MODULE_2___default.a.flatten(contourGeoJson),
          _vertices = _earcut$flatten.vertices,
          _earcut$flatten$holes = _earcut$flatten.holes,
          holes = _earcut$flatten$holes === void 0 ? [] : _earcut$flatten$holes;

      indices = earcut__WEBPACK_IMPORTED_MODULE_2___default()(_vertices, holes, 2);
    } else {
      (function () {
        var delaunay = delaunator__WEBPACK_IMPORTED_MODULE_1__["default"].from(points);
        var boundariesGeojson = {
          type: 'Polygon',
          coordinates: polygonGeoJson
        };

        var _loop = function _loop(i, len) {
          var _indices;

          var inds = [2, 1, 0].map(function (idx) {
            return delaunay.triangles[i + idx];
          }); // reverse wound to have same orientation as earcut

          var triangle = inds.map(function (indice) {
            return points[indice];
          }); // exclude edge triangles outside polygon perimeter or through holes

          if (inds.some(function (ind) {
            return ind < edgePnts.length;
          })) {
            var triangleCentroid = [0, 1].map(function (coordIdx) {
              return Object(d3_array__WEBPACK_IMPORTED_MODULE_5__["mean"])(triangle, function (p) {
                return p[coordIdx];
              });
            });
            if (!pointInside(triangleCentroid, boundariesGeojson)) return "continue";
          }

          (_indices = indices).push.apply(_indices, _toConsumableArray(inds));
        };

        for (var i = 0, len = delaunay.triangles.length; i < len; i += 3) {
          var _ret = _loop(i);

          if (_ret === "continue") continue;
        }
      })();
    }

    return {
      points: points,
      indices: indices
    };
  }
}

ConicPolygonBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
ConicPolygonBufferGeometry.prototype.constructor = ConicPolygonBufferGeometry; //

function polar2Cartesian(lat, lng) {
  var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var phi = (90 - lat) * Math.PI / 180;
  var theta = (90 - lng) * Math.PI / 180;
  return [r * Math.sin(phi) * Math.cos(theta), // x
  r * Math.cos(phi), // y
  r * Math.sin(phi) * Math.sin(theta) // z
  ];
}

function pointInside(pnt, polygonGeoJson) {
  return _turf_boolean_point_in_polygon__WEBPACK_IMPORTED_MODULE_3___default()(pnt, polygonGeoJson);
}

function interpolateContourPoints(polygonGeoJson, maxDistance) {
  // add interpolated points for segments that are further apart than the max distance
  return polygonGeoJson.map(function (coords) {
    var pnts = [];
    var prevPnt;
    coords.forEach(function (pnt) {
      if (prevPnt) {
        var dist = Object(d3_geo__WEBPACK_IMPORTED_MODULE_4__["geoDistance"])(pnt, prevPnt) * 180 / Math.PI;

        if (dist > maxDistance) {
          var interpol = Object(d3_geo__WEBPACK_IMPORTED_MODULE_4__["geoInterpolate"])(prevPnt, pnt);
          var tStep = 1 / Math.ceil(dist / maxDistance);
          var t = tStep;

          while (t < 1) {
            pnts.push(interpol(t));
            t += tStep;
          }
        }
      }

      pnts.push(prevPnt = pnt);
    });
    return pnts;
  });
}

function getInnerGeoPoints(polygonGeoJson, maxDistance) {
  var _extent = Object(d3_array__WEBPACK_IMPORTED_MODULE_5__["extent"])(polygonGeoJson[0], function (p) {
    return p[0];
  }),
      _extent2 = _slicedToArray(_extent, 2),
      minLng = _extent2[0],
      maxLng = _extent2[1];

  var _extent3 = Object(d3_array__WEBPACK_IMPORTED_MODULE_5__["extent"])(polygonGeoJson[0], function (p) {
    return p[1];
  }),
      _extent4 = _slicedToArray(_extent3, 2),
      minLat = _extent4[0],
      maxLat = _extent4[1]; // polygon smaller than maxDistance -> no inner points


  if (Math.min(maxLng - minLng, maxLat - minLat) < maxDistance) return []; // distribute grid remainder equally on both sides

  var startLng = minLng + (maxLng - minLng) % maxDistance / 2;
  var startLat = minLat + (maxLat - minLat) % maxDistance / 2;
  var pnts = [];
  var boundariesGeojson = {
    type: 'Polygon',
    coordinates: polygonGeoJson
  }; // iterate through grid

  var lng = startLng;
  var lat;

  while (lng < maxLng) {
    lat = startLat;

    while (lat < maxLat) {
      var pnt = [lng, lat];
      pointInside(pnt, boundariesGeojson) && pnts.push(pnt);
      lat += maxDistance;
    }

    lng += maxDistance;
  }

  return pnts;
}




/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/array.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/array.js ***!
  \**************************************************************************************/
/*! exports provided: slice, map */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slice", function() { return slice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
var array = Array.prototype;

var slice = array.slice;
var map = array.map;


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/ascending.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/ascending.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
});


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/bin.js":
/*!************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/bin.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./array.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/array.js");
/* harmony import */ var _bisect_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bisect.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/bisect.js");
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constant.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/constant.js");
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./extent.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/extent.js");
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./identity.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/identity.js");
/* harmony import */ var _ticks_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ticks.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/ticks.js");
/* harmony import */ var _threshold_sturges_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./threshold/sturges.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/threshold/sturges.js");








/* harmony default export */ __webpack_exports__["default"] = (function() {
  var value = _identity_js__WEBPACK_IMPORTED_MODULE_4__["default"],
      domain = _extent_js__WEBPACK_IMPORTED_MODULE_3__["default"],
      threshold = _threshold_sturges_js__WEBPACK_IMPORTED_MODULE_6__["default"];

  function histogram(data) {
    if (!Array.isArray(data)) data = Array.from(data);

    var i,
        n = data.length,
        x,
        values = new Array(n);

    for (i = 0; i < n; ++i) {
      values[i] = value(data[i], i, data);
    }

    var xz = domain(values),
        x0 = xz[0],
        x1 = xz[1],
        tz = threshold(values, x0, x1);

    // Convert number of thresholds into uniform thresholds.
    if (!Array.isArray(tz)) {
      tz = Object(_ticks_js__WEBPACK_IMPORTED_MODULE_5__["default"])(x0, x1, tz);
      if (tz[tz.length - 1] === x1) tz.pop(); // exclusive
    }

    // Remove any thresholds outside the domain.
    var m = tz.length;
    while (tz[0] <= x0) tz.shift(), --m;
    while (tz[m - 1] > x1) tz.pop(), --m;

    var bins = new Array(m + 1),
        bin;

    // Initialize bins.
    for (i = 0; i <= m; ++i) {
      bin = bins[i] = [];
      bin.x0 = i > 0 ? tz[i - 1] : x0;
      bin.x1 = i < m ? tz[i] : x1;
    }

    // Assign data to bins by value, ignoring any outside the domain.
    for (i = 0; i < n; ++i) {
      x = values[i];
      if (x0 <= x && x <= x1) {
        bins[Object(_bisect_js__WEBPACK_IMPORTED_MODULE_1__["default"])(tz, x, 0, m)].push(data[i]);
      }
    }

    return bins;
  }

  histogram.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : Object(_constant_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_), histogram) : value;
  };

  histogram.domain = function(_) {
    return arguments.length ? (domain = typeof _ === "function" ? _ : Object(_constant_js__WEBPACK_IMPORTED_MODULE_2__["default"])([_[0], _[1]]), histogram) : domain;
  };

  histogram.thresholds = function(_) {
    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? Object(_constant_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_array_js__WEBPACK_IMPORTED_MODULE_0__["slice"].call(_)) : Object(_constant_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_), histogram) : threshold;
  };

  return histogram;
});


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/bisect.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/bisect.js ***!
  \***************************************************************************************/
/*! exports provided: bisectRight, bisectLeft, bisectCenter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bisectRight", function() { return bisectRight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bisectLeft", function() { return bisectLeft; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bisectCenter", function() { return bisectCenter; });
/* harmony import */ var _ascending_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ascending.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/ascending.js");
/* harmony import */ var _bisector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bisector.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/bisector.js");
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./number.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/number.js");




const ascendingBisect = Object(_bisector_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_ascending_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
const bisectRight = ascendingBisect.right;
const bisectLeft = ascendingBisect.left;
const bisectCenter = Object(_bisector_js__WEBPACK_IMPORTED_MODULE_1__["default"])(_number_js__WEBPACK_IMPORTED_MODULE_2__["default"]).center;
/* harmony default export */ __webpack_exports__["default"] = (bisectRight);


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/bisector.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/bisector.js ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ascending_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ascending.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/ascending.js");


/* harmony default export */ __webpack_exports__["default"] = (function(f) {
  let delta = f;
  let compare = f;

  if (f.length === 1) {
    delta = (d, x) => f(d) - x;
    compare = ascendingComparator(f);
  }

  function left(a, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (compare(a[mid], x) < 0) lo = mid + 1;
      else hi = mid;
    }
    return lo;
  }

  function right(a, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a.length;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (compare(a[mid], x) > 0) hi = mid;
      else lo = mid + 1;
    }
    return lo;
  }

  function center(a, x, lo, hi) {
    if (lo == null) lo = 0;
    if (hi == null) hi = a.length;
    const i = left(a, x, lo, hi - 1);
    return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
  }

  return {left, center, right};
});

function ascendingComparator(f) {
  return (d, x) => Object(_ascending_js__WEBPACK_IMPORTED_MODULE_0__["default"])(f(d), x);
}


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/constant.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/constant.js ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(x) {
  return function() {
    return x;
  };
});


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/count.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/count.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return count; });
function count(values, valueof) {
  let count = 0;
  if (valueof === undefined) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        ++count;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
        ++count;
      }
    }
  }
  return count;
}


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/cross.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/cross.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return cross; });
function length(array) {
  return array.length | 0;
}

function empty(length) {
  return !(length > 0);
}

function arrayify(values) {
  return typeof values !== "object" || "length" in values ? values : Array.from(values);
}

function reducer(reduce) {
  return values => reduce(...values);
}

function cross(...values) {
  const reduce = typeof values[values.length - 1] === "function" && reducer(values.pop());
  values = values.map(arrayify);
  const lengths = values.map(length);
  const j = values.length - 1;
  const index = new Array(j + 1).fill(0);
  const product = [];
  if (j < 0 || lengths.some(empty)) return product;
  while (true) {
    product.push(index.map((j, i) => values[i][j]));
    let i = j;
    while (++index[i] === lengths[i]) {
      if (i === 0) return reduce ? product.map(reduce) : product;
      index[i--] = 0;
    }
  }
}


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/cumsum.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/cumsum.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return cumsum; });
function cumsum(values, valueof) {
  var sum = 0, index = 0;
  return Float64Array.from(values, valueof === undefined
    ? v => (sum += +v || 0)
    : v => (sum += +valueof(v, index++, values) || 0));
}

/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/descending.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/descending.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
});


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/deviation.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/deviation.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return deviation; });
/* harmony import */ var _variance_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./variance.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/variance.js");


function deviation(values, valueof) {
  const v = Object(_variance_js__WEBPACK_IMPORTED_MODULE_0__["default"])(values, valueof);
  return v ? Math.sqrt(v) : v;
}


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/extent.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/extent.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(values, valueof) {
  let min;
  let max;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null) {
        if (min === undefined) {
          if (value >= value) min = max = value;
        } else {
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null) {
        if (min === undefined) {
          if (value >= value) min = max = value;
        } else {
          if (min > value) min = value;
          if (max < value) max = value;
        }
      }
    }
  }
  return [min, max];
});


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/fsum.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/fsum.js ***!
  \*************************************************************************************/
/*! exports provided: Adder, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Adder", function() { return Adder; });
// https://github.com/python/cpython/blob/a74eea238f5baba15797e2e8b570d153bc8690a7/Modules/mathmodule.c#L1423
class Adder {
  constructor() {
    this._partials = new Float64Array(32);
    this._n = 0;
  }
  add(x) {
    const p = this._partials;
    let i = 0;
    for (let j = 0; j < this._n && j < 32; j++) {
      const y = p[j],
        hi = x + y,
        lo = Math.abs(x) < Math.abs(y) ? x - (hi - y) : y - (hi - x);
      if (lo) p[i++] = lo;
      x = hi;
    }
    p[i] = x;
    this._n = i + 1;
    return this;
  }
  valueOf() {
    const p = this._partials;
    let n = this._n, x, y, lo, hi = 0;
    if (n > 0) {
      hi = p[--n];
      while (n > 0) {
        x = hi;
        y = p[--n];
        hi = x + y;
        lo = y - (hi - x);
        if (lo) break;
      }
      if (n > 0 && ((lo < 0 && p[n - 1] < 0) || (lo > 0 && p[n - 1] > 0))) {
        y = lo * 2;
        x = hi + y;
        if (y == x - hi) hi = x;
      }
    }
    return hi;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (function(values, valueof) {
  const adder = new Adder();
  if (valueof === undefined) {
    for (let value of values) {
      if (value = +value) {
        adder.add(value);
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if (value = +valueof(value, ++index, values)) {
        adder.add(value);
      }
    }
  }
  return +adder;
});


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/greatest.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/greatest.js ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return greatest; });
/* harmony import */ var _ascending_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ascending.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/ascending.js");


function greatest(values, compare = _ascending_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
  let max;
  let defined = false;
  if (compare.length === 1) {
    let maxValue;
    for (const element of values) {
      const value = compare(element);
      if (defined
          ? Object(_ascending_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value, maxValue) > 0
          : Object(_ascending_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value, value) === 0) {
        max = element;
        maxValue = value;
        defined = true;
      }
    }
  } else {
    for (const value of values) {
      if (defined
          ? compare(value, max) > 0
          : compare(value, value) === 0) {
        max = value;
        defined = true;
      }
    }
  }
  return max;
}


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/greatestIndex.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/greatestIndex.js ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return greatestIndex; });
/* harmony import */ var _ascending_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ascending.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/ascending.js");
/* harmony import */ var _maxIndex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./maxIndex.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/maxIndex.js");



function greatestIndex(values, compare = _ascending_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
  if (compare.length === 1) return Object(_maxIndex_js__WEBPACK_IMPORTED_MODULE_1__["default"])(values, compare);
  let maxValue;
  let max = -1;
  let index = -1;
  for (const value of values) {
    ++index;
    if (max < 0
        ? compare(value, value) === 0
        : compare(value, maxValue) > 0) {
      maxValue = value;
      max = index;
    }
  }
  return max;
}


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/group.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/group.js ***!
  \**************************************************************************************/
/*! exports provided: default, groups, rollup, rollups, index, indexes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return group; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "groups", function() { return groups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rollup", function() { return rollup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rollups", function() { return rollups; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "index", function() { return index; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "indexes", function() { return indexes; });
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./identity.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/identity.js");


function group(values, ...keys) {
  return nest(values, _identity_js__WEBPACK_IMPORTED_MODULE_0__["default"], _identity_js__WEBPACK_IMPORTED_MODULE_0__["default"], keys);
}

function groups(values, ...keys) {
  return nest(values, Array.from, _identity_js__WEBPACK_IMPORTED_MODULE_0__["default"], keys);
}

function rollup(values, reduce, ...keys) {
  return nest(values, _identity_js__WEBPACK_IMPORTED_MODULE_0__["default"], reduce, keys);
}

function rollups(values, reduce, ...keys) {
  return nest(values, Array.from, reduce, keys);
}

function index(values, ...keys) {
  return nest(values, _identity_js__WEBPACK_IMPORTED_MODULE_0__["default"], unique, keys);
}

function indexes(values, ...keys) {
  return nest(values, Array.from, unique, keys);
}

function unique(values) {
  if (values.length !== 1) throw new Error("duplicate key");
  return values[0];
}

function nest(values, map, reduce, keys) {
  return (function regroup(values, i) {
    if (i >= keys.length) return reduce(values);
    const groups = new Map();
    const keyof = keys[i++];
    let index = -1;
    for (const value of values) {
      const key = keyof(value, ++index, values);
      const group = groups.get(key);
      if (group) group.push(value);
      else groups.set(key, [value]);
    }
    for (const [key, values] of groups) {
      groups.set(key, regroup(values, i));
    }
    return map(groups);
  })(values, 0);
}


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/identity.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/identity.js ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(x) {
  return x;
});


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/index.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/index.js ***!
  \**************************************************************************************/
/*! exports provided: bisect, bisectRight, bisectLeft, bisectCenter, ascending, bisector, count, cross, cumsum, descending, deviation, extent, fsum, Adder, group, groups, index, indexes, rollup, rollups, bin, histogram, thresholdFreedmanDiaconis, thresholdScott, thresholdSturges, max, maxIndex, mean, median, merge, min, minIndex, pairs, permute, quantile, quantileSorted, quickselect, range, least, leastIndex, greatest, greatestIndex, scan, shuffle, shuffler, sum, ticks, tickIncrement, tickStep, transpose, variance, zip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bisect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bisect.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/bisect.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bisect", function() { return _bisect_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bisectRight", function() { return _bisect_js__WEBPACK_IMPORTED_MODULE_0__["bisectRight"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bisectLeft", function() { return _bisect_js__WEBPACK_IMPORTED_MODULE_0__["bisectLeft"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bisectCenter", function() { return _bisect_js__WEBPACK_IMPORTED_MODULE_0__["bisectCenter"]; });

/* harmony import */ var _ascending_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ascending.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/ascending.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ascending", function() { return _ascending_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _bisector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bisector.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/bisector.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bisector", function() { return _bisector_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _count_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./count.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/count.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "count", function() { return _count_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _cross_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cross.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/cross.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cross", function() { return _cross_js__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _cumsum_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cumsum.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/cumsum.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cumsum", function() { return _cumsum_js__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _descending_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./descending.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/descending.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "descending", function() { return _descending_js__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _deviation_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./deviation.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/deviation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deviation", function() { return _deviation_js__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./extent.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/extent.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "extent", function() { return _extent_js__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _fsum_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./fsum.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/fsum.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "fsum", function() { return _fsum_js__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Adder", function() { return _fsum_js__WEBPACK_IMPORTED_MODULE_9__["Adder"]; });

/* harmony import */ var _group_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./group.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/group.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "group", function() { return _group_js__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "groups", function() { return _group_js__WEBPACK_IMPORTED_MODULE_10__["groups"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "index", function() { return _group_js__WEBPACK_IMPORTED_MODULE_10__["index"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "indexes", function() { return _group_js__WEBPACK_IMPORTED_MODULE_10__["indexes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rollup", function() { return _group_js__WEBPACK_IMPORTED_MODULE_10__["rollup"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rollups", function() { return _group_js__WEBPACK_IMPORTED_MODULE_10__["rollups"]; });

/* harmony import */ var _bin_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./bin.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/bin.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "bin", function() { return _bin_js__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "histogram", function() { return _bin_js__WEBPACK_IMPORTED_MODULE_11__["default"]; });

/* harmony import */ var _threshold_freedmanDiaconis_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./threshold/freedmanDiaconis.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/threshold/freedmanDiaconis.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "thresholdFreedmanDiaconis", function() { return _threshold_freedmanDiaconis_js__WEBPACK_IMPORTED_MODULE_12__["default"]; });

/* harmony import */ var _threshold_scott_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./threshold/scott.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/threshold/scott.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "thresholdScott", function() { return _threshold_scott_js__WEBPACK_IMPORTED_MODULE_13__["default"]; });

/* harmony import */ var _threshold_sturges_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./threshold/sturges.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/threshold/sturges.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "thresholdSturges", function() { return _threshold_sturges_js__WEBPACK_IMPORTED_MODULE_14__["default"]; });

/* harmony import */ var _max_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./max.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/max.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "max", function() { return _max_js__WEBPACK_IMPORTED_MODULE_15__["default"]; });

/* harmony import */ var _maxIndex_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./maxIndex.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/maxIndex.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "maxIndex", function() { return _maxIndex_js__WEBPACK_IMPORTED_MODULE_16__["default"]; });

/* harmony import */ var _mean_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./mean.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/mean.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mean", function() { return _mean_js__WEBPACK_IMPORTED_MODULE_17__["default"]; });

/* harmony import */ var _median_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./median.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/median.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "median", function() { return _median_js__WEBPACK_IMPORTED_MODULE_18__["default"]; });

/* harmony import */ var _merge_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./merge.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/merge.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "merge", function() { return _merge_js__WEBPACK_IMPORTED_MODULE_19__["default"]; });

/* harmony import */ var _min_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./min.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/min.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "min", function() { return _min_js__WEBPACK_IMPORTED_MODULE_20__["default"]; });

/* harmony import */ var _minIndex_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./minIndex.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/minIndex.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "minIndex", function() { return _minIndex_js__WEBPACK_IMPORTED_MODULE_21__["default"]; });

/* harmony import */ var _pairs_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./pairs.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/pairs.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pairs", function() { return _pairs_js__WEBPACK_IMPORTED_MODULE_22__["default"]; });

/* harmony import */ var _permute_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./permute.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/permute.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "permute", function() { return _permute_js__WEBPACK_IMPORTED_MODULE_23__["default"]; });

/* harmony import */ var _quantile_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./quantile.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/quantile.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "quantile", function() { return _quantile_js__WEBPACK_IMPORTED_MODULE_24__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "quantileSorted", function() { return _quantile_js__WEBPACK_IMPORTED_MODULE_24__["quantileSorted"]; });

/* harmony import */ var _quickselect_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./quickselect.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/quickselect.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "quickselect", function() { return _quickselect_js__WEBPACK_IMPORTED_MODULE_25__["default"]; });

/* harmony import */ var _range_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./range.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/range.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "range", function() { return _range_js__WEBPACK_IMPORTED_MODULE_26__["default"]; });

/* harmony import */ var _least_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./least.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/least.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "least", function() { return _least_js__WEBPACK_IMPORTED_MODULE_27__["default"]; });

/* harmony import */ var _leastIndex_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./leastIndex.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/leastIndex.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "leastIndex", function() { return _leastIndex_js__WEBPACK_IMPORTED_MODULE_28__["default"]; });

/* harmony import */ var _greatest_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./greatest.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/greatest.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "greatest", function() { return _greatest_js__WEBPACK_IMPORTED_MODULE_29__["default"]; });

/* harmony import */ var _greatestIndex_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./greatestIndex.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/greatestIndex.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "greatestIndex", function() { return _greatestIndex_js__WEBPACK_IMPORTED_MODULE_30__["default"]; });

/* harmony import */ var _scan_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./scan.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/scan.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scan", function() { return _scan_js__WEBPACK_IMPORTED_MODULE_31__["default"]; });

/* harmony import */ var _shuffle_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./shuffle.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/shuffle.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shuffle", function() { return _shuffle_js__WEBPACK_IMPORTED_MODULE_32__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shuffler", function() { return _shuffle_js__WEBPACK_IMPORTED_MODULE_32__["shuffler"]; });

/* harmony import */ var _sum_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./sum.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/sum.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "sum", function() { return _sum_js__WEBPACK_IMPORTED_MODULE_33__["default"]; });

/* harmony import */ var _ticks_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./ticks.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/ticks.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ticks", function() { return _ticks_js__WEBPACK_IMPORTED_MODULE_34__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tickIncrement", function() { return _ticks_js__WEBPACK_IMPORTED_MODULE_34__["tickIncrement"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "tickStep", function() { return _ticks_js__WEBPACK_IMPORTED_MODULE_34__["tickStep"]; });

/* harmony import */ var _transpose_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./transpose.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/transpose.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "transpose", function() { return _transpose_js__WEBPACK_IMPORTED_MODULE_35__["default"]; });

/* harmony import */ var _variance_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./variance.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/variance.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "variance", function() { return _variance_js__WEBPACK_IMPORTED_MODULE_36__["default"]; });

/* harmony import */ var _zip_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./zip.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/zip.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "zip", function() { return _zip_js__WEBPACK_IMPORTED_MODULE_37__["default"]; });












 // Deprecated; use bin.



















 // Deprecated; use leastIndex.








/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/least.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/least.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return least; });
/* harmony import */ var _ascending_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ascending.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/ascending.js");


function least(values, compare = _ascending_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
  let min;
  let defined = false;
  if (compare.length === 1) {
    let minValue;
    for (const element of values) {
      const value = compare(element);
      if (defined
          ? Object(_ascending_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value, minValue) < 0
          : Object(_ascending_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value, value) === 0) {
        min = element;
        minValue = value;
        defined = true;
      }
    }
  } else {
    for (const value of values) {
      if (defined
          ? compare(value, min) < 0
          : compare(value, value) === 0) {
        min = value;
        defined = true;
      }
    }
  }
  return min;
}


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/leastIndex.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/leastIndex.js ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return leastIndex; });
/* harmony import */ var _ascending_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ascending.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/ascending.js");
/* harmony import */ var _minIndex_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./minIndex.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/minIndex.js");



function leastIndex(values, compare = _ascending_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
  if (compare.length === 1) return Object(_minIndex_js__WEBPACK_IMPORTED_MODULE_1__["default"])(values, compare);
  let minValue;
  let min = -1;
  let index = -1;
  for (const value of values) {
    ++index;
    if (min < 0
        ? compare(value, value) === 0
        : compare(value, minValue) < 0) {
      minValue = value;
      min = index;
    }
  }
  return min;
}


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/max.js":
/*!************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/max.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return max; });
function max(values, valueof) {
  let max;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null
          && (max < value || (max === undefined && value >= value))) {
        max = value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null
          && (max < value || (max === undefined && value >= value))) {
        max = value;
      }
    }
  }
  return max;
}


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/maxIndex.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/maxIndex.js ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return maxIndex; });
function maxIndex(values, valueof) {
  let max;
  let maxIndex = -1;
  let index = -1;
  if (valueof === undefined) {
    for (const value of values) {
      ++index;
      if (value != null
          && (max < value || (max === undefined && value >= value))) {
        max = value, maxIndex = index;
      }
    }
  } else {
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null
          && (max < value || (max === undefined && value >= value))) {
        max = value, maxIndex = index;
      }
    }
  }
  return maxIndex;
}


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/mean.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/mean.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return mean; });
function mean(values, valueof) {
  let count = 0;
  let sum = 0;
  if (valueof === undefined) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        ++count, sum += value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
        ++count, sum += value;
      }
    }
  }
  if (count) return sum / count;
}


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/median.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/median.js ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _quantile_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./quantile.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/quantile.js");


/* harmony default export */ __webpack_exports__["default"] = (function(values, valueof) {
  return Object(_quantile_js__WEBPACK_IMPORTED_MODULE_0__["default"])(values, 0.5, valueof);
});


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/merge.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/merge.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return merge; });
function* flatten(arrays) {
  for (const array of arrays) {
    yield* array;
  }
}

function merge(arrays) {
  return Array.from(flatten(arrays));
}


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/min.js":
/*!************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/min.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return min; });
function min(values, valueof) {
  let min;
  if (valueof === undefined) {
    for (const value of values) {
      if (value != null
          && (min > value || (min === undefined && value >= value))) {
        min = value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null
          && (min > value || (min === undefined && value >= value))) {
        min = value;
      }
    }
  }
  return min;
}


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/minIndex.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/minIndex.js ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return minIndex; });
function minIndex(values, valueof) {
  let min;
  let minIndex = -1;
  let index = -1;
  if (valueof === undefined) {
    for (const value of values) {
      ++index;
      if (value != null
          && (min > value || (min === undefined && value >= value))) {
        min = value, minIndex = index;
      }
    }
  } else {
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null
          && (min > value || (min === undefined && value >= value))) {
        min = value, minIndex = index;
      }
    }
  }
  return minIndex;
}


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/number.js":
/*!***************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/number.js ***!
  \***************************************************************************************/
/*! exports provided: default, numbers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "numbers", function() { return numbers; });
/* harmony default export */ __webpack_exports__["default"] = (function(x) {
  return x === null ? NaN : +x;
});

function* numbers(values, valueof) {
  if (valueof === undefined) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        yield value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
        yield value;
      }
    }
  }
}


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/pairs.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/pairs.js ***!
  \**************************************************************************************/
/*! exports provided: default, pair */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return pairs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pair", function() { return pair; });
function pairs(values, pairof = pair) {
  const pairs = [];
  let previous;
  let first = false;
  for (const value of values) {
    if (first) pairs.push(pairof(previous, value));
    previous = value;
    first = true;
  }
  return pairs;
}

function pair(a, b) {
  return [a, b];
}


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/permute.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/permute.js ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(source, keys) {
  return Array.from(keys, key => source[key]);
});


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/quantile.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/quantile.js ***!
  \*****************************************************************************************/
/*! exports provided: default, quantileSorted */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return quantile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "quantileSorted", function() { return quantileSorted; });
/* harmony import */ var _max_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./max.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/max.js");
/* harmony import */ var _min_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./min.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/min.js");
/* harmony import */ var _quickselect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./quickselect.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/quickselect.js");
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./number.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/number.js");





function quantile(values, p, valueof) {
  values = Float64Array.from(Object(_number_js__WEBPACK_IMPORTED_MODULE_3__["numbers"])(values, valueof));
  if (!(n = values.length)) return;
  if ((p = +p) <= 0 || n < 2) return Object(_min_js__WEBPACK_IMPORTED_MODULE_1__["default"])(values);
  if (p >= 1) return Object(_max_js__WEBPACK_IMPORTED_MODULE_0__["default"])(values);
  var n,
      i = (n - 1) * p,
      i0 = Math.floor(i),
      value0 = Object(_max_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Object(_quickselect_js__WEBPACK_IMPORTED_MODULE_2__["default"])(values, i0).subarray(0, i0 + 1)),
      value1 = Object(_min_js__WEBPACK_IMPORTED_MODULE_1__["default"])(values.subarray(i0 + 1));
  return value0 + (value1 - value0) * (i - i0);
}

function quantileSorted(values, p, valueof = _number_js__WEBPACK_IMPORTED_MODULE_3__["default"]) {
  if (!(n = values.length)) return;
  if ((p = +p) <= 0 || n < 2) return +valueof(values[0], 0, values);
  if (p >= 1) return +valueof(values[n - 1], n - 1, values);
  var n,
      i = (n - 1) * p,
      i0 = Math.floor(i),
      value0 = +valueof(values[i0], i0, values),
      value1 = +valueof(values[i0 + 1], i0 + 1, values);
  return value0 + (value1 - value0) * (i - i0);
}


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/quickselect.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/quickselect.js ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return quickselect; });
/* harmony import */ var _ascending_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ascending.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/ascending.js");


// Based on https://github.com/mourner/quickselect
// ISC license, Copyright 2018 Vladimir Agafonkin.
function quickselect(array, k, left = 0, right = array.length - 1, compare = _ascending_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
  while (right > left) {
    if (right - left > 600) {
      const n = right - left + 1;
      const m = k - left + 1;
      const z = Math.log(n);
      const s = 0.5 * Math.exp(2 * z / 3);
      const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
      const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
      const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
      quickselect(array, k, newLeft, newRight, compare);
    }

    const t = array[k];
    let i = left;
    let j = right;

    swap(array, left, k);
    if (compare(array[right], t) > 0) swap(array, left, right);

    while (i < j) {
      swap(array, i, j), ++i, --j;
      while (compare(array[i], t) < 0) ++i;
      while (compare(array[j], t) > 0) --j;
    }

    if (compare(array[left], t) === 0) swap(array, left, j);
    else ++j, swap(array, j, right);

    if (j <= k) left = j + 1;
    if (k <= j) right = j - 1;
  }
  return array;
}

function swap(array, i, j) {
  const t = array[i];
  array[i] = array[j];
  array[j] = t;
}


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/range.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/range.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function(start, stop, step) {
  start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;

  var i = -1,
      n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
      range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }

  return range;
});


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/scan.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/scan.js ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return scan; });
/* harmony import */ var _leastIndex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./leastIndex.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/leastIndex.js");


function scan(values, compare) {
  const index = Object(_leastIndex_js__WEBPACK_IMPORTED_MODULE_0__["default"])(values, compare);
  return index < 0 ? undefined : index;
}


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/shuffle.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/shuffle.js ***!
  \****************************************************************************************/
/*! exports provided: default, shuffler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shuffler", function() { return shuffler; });
/* harmony default export */ __webpack_exports__["default"] = (shuffler(Math.random));

function shuffler(random) {
  return function shuffle(array, i0 = 0, i1 = array.length) {
    let m = i1 - (i0 = +i0);
    while (m) {
      const i = random() * m-- | 0, t = array[m + i0];
      array[m + i0] = array[i + i0];
      array[i + i0] = t;
    }
    return array;
  };
}


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/sum.js":
/*!************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/sum.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return sum; });
function sum(values, valueof) {
  let sum = 0;
  if (valueof === undefined) {
    for (let value of values) {
      if (value = +value) {
        sum += value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if (value = +valueof(value, ++index, values)) {
        sum += value;
      }
    }
  }
  return sum;
}


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/threshold/freedmanDiaconis.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/threshold/freedmanDiaconis.js ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _count_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../count.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/count.js");
/* harmony import */ var _quantile_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../quantile.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/quantile.js");



/* harmony default export */ __webpack_exports__["default"] = (function(values, min, max) {
  return Math.ceil((max - min) / (2 * (Object(_quantile_js__WEBPACK_IMPORTED_MODULE_1__["default"])(values, 0.75) - Object(_quantile_js__WEBPACK_IMPORTED_MODULE_1__["default"])(values, 0.25)) * Math.pow(Object(_count_js__WEBPACK_IMPORTED_MODULE_0__["default"])(values), -1 / 3)));
});


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/threshold/scott.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/threshold/scott.js ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _count_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../count.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/count.js");
/* harmony import */ var _deviation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../deviation.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/deviation.js");



/* harmony default export */ __webpack_exports__["default"] = (function(values, min, max) {
  return Math.ceil((max - min) / (3.5 * Object(_deviation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(values) * Math.pow(Object(_count_js__WEBPACK_IMPORTED_MODULE_0__["default"])(values), -1 / 3)));
});


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/threshold/sturges.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/threshold/sturges.js ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _count_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../count.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/count.js");


/* harmony default export */ __webpack_exports__["default"] = (function(values) {
  return Math.ceil(Math.log(Object(_count_js__WEBPACK_IMPORTED_MODULE_0__["default"])(values)) / Math.LN2) + 1;
});


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/ticks.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/ticks.js ***!
  \**************************************************************************************/
/*! exports provided: default, tickIncrement, tickStep */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tickIncrement", function() { return tickIncrement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tickStep", function() { return tickStep; });
var e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

/* harmony default export */ __webpack_exports__["default"] = (function(start, stop, count) {
  var reverse,
      i = -1,
      n,
      ticks,
      step;

  stop = +stop, start = +start, count = +count;
  if (start === stop && count > 0) return [start];
  if (reverse = stop < start) n = start, start = stop, stop = n;
  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

  if (step > 0) {
    start = Math.ceil(start / step);
    stop = Math.floor(stop / step);
    ticks = new Array(n = Math.ceil(stop - start + 1));
    while (++i < n) ticks[i] = (start + i) * step;
  } else {
    step = -step;
    start = Math.ceil(start * step);
    stop = Math.floor(stop * step);
    ticks = new Array(n = Math.ceil(stop - start + 1));
    while (++i < n) ticks[i] = (start + i) / step;
  }

  if (reverse) ticks.reverse();

  return ticks;
});

function tickIncrement(start, stop, count) {
  var step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log(step) / Math.LN10),
      error = step / Math.pow(10, power);
  return power >= 0
      ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
      : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}

function tickStep(start, stop, count) {
  var step0 = Math.abs(stop - start) / Math.max(0, count),
      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
      error = step0 / step1;
  if (error >= e10) step1 *= 10;
  else if (error >= e5) step1 *= 5;
  else if (error >= e2) step1 *= 2;
  return stop < start ? -step1 : step1;
}


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/transpose.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/transpose.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./min.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/min.js");


/* harmony default export */ __webpack_exports__["default"] = (function(matrix) {
  if (!(n = matrix.length)) return [];
  for (var i = -1, m = Object(_min_js__WEBPACK_IMPORTED_MODULE_0__["default"])(matrix, length), transpose = new Array(m); ++i < m;) {
    for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
      row[j] = matrix[j][i];
    }
  }
  return transpose;
});

function length(d) {
  return d.length;
}


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/variance.js":
/*!*****************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/variance.js ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return variance; });
function variance(values, valueof) {
  let count = 0;
  let delta;
  let mean = 0;
  let sum = 0;
  if (valueof === undefined) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        delta = value - mean;
        mean += delta / ++count;
        sum += delta * (value - mean);
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
        delta = value - mean;
        mean += delta / ++count;
        sum += delta * (value - mean);
      }
    }
  }
  if (count > 1) return sum / (count - 1);
}


/***/ }),

/***/ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/zip.js":
/*!************************************************************************************!*\
  !*** ./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/zip.js ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _transpose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transpose.js */ "./node_modules/three-conic-polygon-geometry/node_modules/d3-array/src/transpose.js");


/* harmony default export */ __webpack_exports__["default"] = (function() {
  return Object(_transpose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arguments);
});


/***/ }),

/***/ "./node_modules/three-fatline/dist/three-fatline.module.js":
/*!*****************************************************************!*\
  !*** ./node_modules/three-fatline/dist/three-fatline.module.js ***!
  \*****************************************************************/
/*! exports provided: Line2, LineGeometry, LineMaterial, LineSegments2, LineSegmentsGeometry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Line2", function() { return Line2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineGeometry", function() { return LineGeometry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineMaterial", function() { return LineMaterial; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineSegments2", function() { return LineSegments2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineSegmentsGeometry", function() { return LineSegmentsGeometry; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");


/**
 * @author WestLangley / http://github.com/WestLangley
 *
 */
const THREE = window.THREE ? window.THREE // Prefer consumption from global THREE, if exists
: {
  Box3: three__WEBPACK_IMPORTED_MODULE_0__["Box3"],
  BufferGeometry: three__WEBPACK_IMPORTED_MODULE_0__["BufferGeometry"],
  Float32BufferAttribute: three__WEBPACK_IMPORTED_MODULE_0__["Float32BufferAttribute"],
  InstancedBufferGeometry: three__WEBPACK_IMPORTED_MODULE_0__["InstancedBufferGeometry"],
  InstancedInterleavedBuffer: three__WEBPACK_IMPORTED_MODULE_0__["InstancedInterleavedBuffer"],
  InterleavedBufferAttribute: three__WEBPACK_IMPORTED_MODULE_0__["InterleavedBufferAttribute"],
  Sphere: three__WEBPACK_IMPORTED_MODULE_0__["Sphere"],
  Vector3: three__WEBPACK_IMPORTED_MODULE_0__["Vector3"],
  WireframeGeometry: three__WEBPACK_IMPORTED_MODULE_0__["WireframeGeometry"]
}; // support multiple method names for backwards threejs compatibility

var setAttributeFn = new THREE.BufferGeometry().setAttribute ? 'setAttribute' : 'addAttribute';

var LineSegmentsGeometry = function () {
  THREE.InstancedBufferGeometry.call(this);
  this.type = 'LineSegmentsGeometry';
  var positions = [-1, 2, 0, 1, 2, 0, -1, 1, 0, 1, 1, 0, -1, 0, 0, 1, 0, 0, -1, -1, 0, 1, -1, 0];
  var uvs = [-1, 2, 1, 2, -1, 1, 1, 1, -1, -1, 1, -1, -1, -2, 1, -2];
  var index = [0, 2, 1, 2, 3, 1, 2, 4, 3, 4, 5, 3, 4, 6, 5, 6, 7, 5];
  this.setIndex(index);
  this[setAttributeFn]('position', new THREE.Float32BufferAttribute(positions, 3));
  this[setAttributeFn]('uv', new THREE.Float32BufferAttribute(uvs, 2));
};

LineSegmentsGeometry.prototype = Object.assign(Object.create(THREE.InstancedBufferGeometry.prototype), {
  constructor: LineSegmentsGeometry,
  isLineSegmentsGeometry: true,
  applyMatrix: function (matrix) {
    console.warn('THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4().');
    return this.applyMatrix4(matrix);
  },
  applyMatrix4: function (matrix) {
    var start = this.attributes.instanceStart;
    var end = this.attributes.instanceEnd;

    if (start !== undefined) {
      matrix.applyToBufferAttribute(start);
      matrix.applyToBufferAttribute(end);
      start.data.needsUpdate = true;
    }

    if (this.boundingBox !== null) {
      this.computeBoundingBox();
    }

    if (this.boundingSphere !== null) {
      this.computeBoundingSphere();
    }

    return this;
  },
  setPositions: function (array) {
    var lineSegments;

    if (array instanceof Float32Array) {
      lineSegments = array;
    } else if (Array.isArray(array)) {
      lineSegments = new Float32Array(array);
    }

    var instanceBuffer = new THREE.InstancedInterleavedBuffer(lineSegments, 6, 1); // xyz, xyz

    this[setAttributeFn]('instanceStart', new THREE.InterleavedBufferAttribute(instanceBuffer, 3, 0)); // xyz

    this[setAttributeFn]('instanceEnd', new THREE.InterleavedBufferAttribute(instanceBuffer, 3, 3)); // xyz
    //

    this.computeBoundingBox();
    this.computeBoundingSphere();
    return this;
  },
  setColors: function (array) {
    var colors;

    if (array instanceof Float32Array) {
      colors = array;
    } else if (Array.isArray(array)) {
      colors = new Float32Array(array);
    }

    var instanceColorBuffer = new THREE.InstancedInterleavedBuffer(colors, 6, 1); // rgb, rgb

    this[setAttributeFn]('instanceColorStart', new THREE.InterleavedBufferAttribute(instanceColorBuffer, 3, 0)); // rgb

    this[setAttributeFn]('instanceColorEnd', new THREE.InterleavedBufferAttribute(instanceColorBuffer, 3, 3)); // rgb

    return this;
  },
  fromWireframeGeometry: function (geometry) {
    this.setPositions(geometry.attributes.position.array);
    return this;
  },
  fromEdgesGeometry: function (geometry) {
    this.setPositions(geometry.attributes.position.array);
    return this;
  },
  fromMesh: function (mesh) {
    this.fromWireframeGeometry(new THREE.WireframeGeometry(mesh.geometry)); // set colors, maybe

    return this;
  },
  fromLineSegements: function (lineSegments) {
    var geometry = lineSegments.geometry;

    if (geometry.isGeometry) {
      this.setPositions(geometry.vertices);
    } else if (geometry.isBufferGeometry) {
      this.setPositions(geometry.position.array); // assumes non-indexed
    } // set colors, maybe


    return this;
  },
  computeBoundingBox: function () {
    var box = new THREE.Box3();
    return function computeBoundingBox() {
      if (this.boundingBox === null) {
        this.boundingBox = new THREE.Box3();
      }

      var start = this.attributes.instanceStart;
      var end = this.attributes.instanceEnd;

      if (start !== undefined && end !== undefined) {
        this.boundingBox.setFromBufferAttribute(start);
        box.setFromBufferAttribute(end);
        this.boundingBox.union(box);
      }
    };
  }(),
  computeBoundingSphere: function () {
    var vector = new THREE.Vector3();
    return function computeBoundingSphere() {
      if (this.boundingSphere === null) {
        this.boundingSphere = new THREE.Sphere();
      }

      if (this.boundingBox === null) {
        this.computeBoundingBox();
      }

      var start = this.attributes.instanceStart;
      var end = this.attributes.instanceEnd;

      if (start !== undefined && end !== undefined) {
        var center = this.boundingSphere.center;
        this.boundingBox.getCenter(center);
        var maxRadiusSq = 0;

        for (var i = 0, il = start.count; i < il; i++) {
          vector.fromBufferAttribute(start, i);
          maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(vector));
          vector.fromBufferAttribute(end, i);
          maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(vector));
        }

        this.boundingSphere.radius = Math.sqrt(maxRadiusSq);

        if (isNaN(this.boundingSphere.radius)) {
          console.error('THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.', this);
        }
      }
    };
  }(),
  toJSON: function () {// todo
  },
  clone: function () {// todo
  },
  copy: function ()
  /* source */
  {
    // todo
    return this;
  }
});

/**
 * @author WestLangley / http://github.com/WestLangley
 *
 * parameters = {
 *  color: <hex>,
 *  linewidth: <float>,
 *  dashed: <boolean>,
 *  dashScale: <float>,
 *  dashSize: <float>,
 *  gapSize: <float>,
 *  resolution: <Vector2>, // to be set by renderer
 * }
 */
const THREE$1 = window.THREE ? window.THREE // Prefer consumption from global THREE, if exists
: {
  ShaderLib: three__WEBPACK_IMPORTED_MODULE_0__["ShaderLib"],
  ShaderMaterial: three__WEBPACK_IMPORTED_MODULE_0__["ShaderMaterial"],
  UniformsLib: three__WEBPACK_IMPORTED_MODULE_0__["UniformsLib"],
  UniformsUtils: three__WEBPACK_IMPORTED_MODULE_0__["UniformsUtils"],
  Vector2: three__WEBPACK_IMPORTED_MODULE_0__["Vector2"]
};
THREE$1.UniformsLib.line = {
  linewidth: {
    value: 1
  },
  resolution: {
    value: new three__WEBPACK_IMPORTED_MODULE_0__["Vector2"](1, 1)
  },
  dashScale: {
    value: 1
  },
  dashSize: {
    value: 1
  },
  gapSize: {
    value: 1
  } // todo FIX - maybe change to totalSize

};
THREE$1.ShaderLib['line'] = {
  uniforms: THREE$1.UniformsUtils.merge([THREE$1.UniformsLib.common, THREE$1.UniformsLib.fog, THREE$1.UniformsLib.line]),
  vertexShader: `
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		varying vec2 vUv;

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;

			#endif

			float aspect = resolution.x / resolution.y;

			vUv = uv;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec2 ndcStart = clipStart.xy / clipStart.w;
			vec2 ndcEnd = clipEnd.xy / clipEnd.w;

			// direction
			vec2 dir = ndcEnd - ndcStart;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			// perpendicular to dir
			vec2 offset = vec2( dir.y, - dir.x );

			// undo aspect ratio adjustment
			dir.x /= aspect;
			offset.x /= aspect;

			// sign flip
			if ( position.x < 0.0 ) offset *= - 1.0;

			// endcaps
			if ( position.y < 0.0 ) {

				offset += - dir;

			} else if ( position.y > 1.0 ) {

				offset += dir;

			}

			// adjust for linewidth
			offset *= linewidth;

			// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
			offset /= resolution.y;

			// select end
			vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

			// back to clip space
			offset *= clip.w;

			clip.xy += offset;

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,
  fragmentShader: `
		uniform vec3 diffuse;
		uniform float opacity;

		#ifdef USE_DASH

			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		varying vec2 vUv;

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			if ( abs( vUv.y ) > 1.0 ) {

				float a = vUv.x;
				float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
				float len2 = a * a + b * b;

				if ( len2 > 1.0 ) discard;

			}

			vec4 diffuseColor = vec4( diffuse, opacity );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, diffuseColor.a );

			#include <premultiplied_alpha_fragment>
			#include <tonemapping_fragment>
			#include <encodings_fragment>
			#include <fog_fragment>

		}
		`
};

var LineMaterial = function (parameters) {
  THREE$1.ShaderMaterial.call(this, {
    type: 'LineMaterial',
    uniforms: THREE$1.UniformsUtils.clone(THREE$1.ShaderLib['line'].uniforms),
    vertexShader: THREE$1.ShaderLib['line'].vertexShader,
    fragmentShader: THREE$1.ShaderLib['line'].fragmentShader
  });
  this.dashed = false;
  Object.defineProperties(this, {
    color: {
      enumerable: true,
      get: function () {
        return this.uniforms.diffuse.value;
      },
      set: function (value) {
        this.uniforms.diffuse.value = value;
      }
    },
    linewidth: {
      enumerable: true,
      get: function () {
        return this.uniforms.linewidth.value;
      },
      set: function (value) {
        this.uniforms.linewidth.value = value;
      }
    },
    dashScale: {
      enumerable: true,
      get: function () {
        return this.uniforms.dashScale.value;
      },
      set: function (value) {
        this.uniforms.dashScale.value = value;
      }
    },
    dashSize: {
      enumerable: true,
      get: function () {
        return this.uniforms.dashSize.value;
      },
      set: function (value) {
        this.uniforms.dashSize.value = value;
      }
    },
    gapSize: {
      enumerable: true,
      get: function () {
        return this.uniforms.gapSize.value;
      },
      set: function (value) {
        this.uniforms.gapSize.value = value;
      }
    },
    resolution: {
      enumerable: true,
      get: function () {
        return this.uniforms.resolution.value;
      },
      set: function (value) {
        this.uniforms.resolution.value.copy(value);
      }
    }
  });
  this.setValues(parameters);
};

LineMaterial.prototype = Object.create(THREE$1.ShaderMaterial.prototype);
LineMaterial.prototype.constructor = LineMaterial;
LineMaterial.prototype.isLineMaterial = true;

LineMaterial.prototype.copy = function (source) {
  THREE$1.ShaderMaterial.prototype.copy.call(this, source);
  this.color.copy(source.color);
  this.linewidth = source.linewidth;
  this.resolution = source.resolution; // todo

  return this;
};

/**
 * @author WestLangley / http://github.com/WestLangley
 *
 */
const THREE$2 = window.THREE ? window.THREE // Prefer consumption from global THREE, if exists
: {
  BufferGeometry: three__WEBPACK_IMPORTED_MODULE_0__["BufferGeometry"],
  InstancedInterleavedBuffer: three__WEBPACK_IMPORTED_MODULE_0__["InstancedInterleavedBuffer"],
  InterleavedBufferAttribute: three__WEBPACK_IMPORTED_MODULE_0__["InterleavedBufferAttribute"],
  Mesh: three__WEBPACK_IMPORTED_MODULE_0__["Mesh"],
  Vector3: three__WEBPACK_IMPORTED_MODULE_0__["Vector3"]
};

var setAttributeFn$1 = new THREE$2.BufferGeometry().setAttribute ? 'setAttribute' : 'addAttribute';

var LineSegments2 = function (geometry, material) {
  THREE$2.Mesh.call(this);
  this.type = 'LineSegments2';
  this.geometry = geometry !== undefined ? geometry : new LineSegmentsGeometry();
  this.material = material !== undefined ? material : new LineMaterial({
    color: Math.random() * 0xffffff
  });
};

LineSegments2.prototype = Object.assign(Object.create(THREE$2.Mesh.prototype), {
  constructor: LineSegments2,
  isLineSegments2: true,
  computeLineDistances: function () {
    // for backwards-compatability, but could be a method of LineSegmentsGeometry...
    var start = new THREE$2.Vector3();
    var end = new THREE$2.Vector3();
    return function computeLineDistances() {
      var geometry = this.geometry;
      var instanceStart = geometry.attributes.instanceStart;
      var instanceEnd = geometry.attributes.instanceEnd;
      var lineDistances = new Float32Array(2 * instanceStart.data.count);

      for (var i = 0, j = 0, l = instanceStart.data.count; i < l; i++, j += 2) {
        start.fromBufferAttribute(instanceStart, i);
        end.fromBufferAttribute(instanceEnd, i);
        lineDistances[j] = j === 0 ? 0 : lineDistances[j - 1];
        lineDistances[j + 1] = lineDistances[j] + start.distanceTo(end);
      }

      var instanceDistanceBuffer = new THREE$2.InstancedInterleavedBuffer(lineDistances, 2, 1); // d0, d1

      geometry[setAttributeFn$1]('instanceDistanceStart', new THREE$2.InterleavedBufferAttribute(instanceDistanceBuffer, 1, 0)); // d0

      geometry[setAttributeFn$1]('instanceDistanceEnd', new THREE$2.InterleavedBufferAttribute(instanceDistanceBuffer, 1, 1)); // d1

      return this;
    };
  }(),
  copy: function ()
  /* source */
  {
    // todo
    return this;
  }
});

/**
 * @author WestLangley / http://github.com/WestLangley
 *
 */

var LineGeometry = function () {
  LineSegmentsGeometry.call(this);
  this.type = 'LineGeometry';
};

LineGeometry.prototype = Object.assign(Object.create(LineSegmentsGeometry.prototype), {
  constructor: LineGeometry,
  isLineGeometry: true,
  setPositions: function (array) {
    // converts [ x1, y1, z1,  x2, y2, z2, ... ] to pairs format
    var length = array.length - 3;
    var points = new Float32Array(2 * length);

    for (var i = 0; i < length; i += 3) {
      points[2 * i] = array[i];
      points[2 * i + 1] = array[i + 1];
      points[2 * i + 2] = array[i + 2];
      points[2 * i + 3] = array[i + 3];
      points[2 * i + 4] = array[i + 4];
      points[2 * i + 5] = array[i + 5];
    }

    LineSegmentsGeometry.prototype.setPositions.call(this, points);
    return this;
  },
  setColors: function (array) {
    // converts [ r1, g1, b1,  r2, g2, b2, ... ] to pairs format
    var length = array.length - 3;
    var colors = new Float32Array(2 * length);

    for (var i = 0; i < length; i += 3) {
      colors[2 * i] = array[i];
      colors[2 * i + 1] = array[i + 1];
      colors[2 * i + 2] = array[i + 2];
      colors[2 * i + 3] = array[i + 3];
      colors[2 * i + 4] = array[i + 4];
      colors[2 * i + 5] = array[i + 5];
    }

    LineSegmentsGeometry.prototype.setColors.call(this, colors);
    return this;
  },
  fromLine: function (line) {
    var geometry = line.geometry;

    if (geometry.isGeometry) {
      this.setPositions(geometry.vertices);
    } else if (geometry.isBufferGeometry) {
      this.setPositions(geometry.position.array); // assumes non-indexed
    } // set colors, maybe


    return this;
  },
  copy: function ()
  /* source */
  {
    // todo
    return this;
  }
});

/**
 * @author WestLangley / http://github.com/WestLangley
 *
 */

var Line2 = function (geometry, material) {
  LineSegments2.call(this);
  this.type = 'Line2';
  this.geometry = geometry !== undefined ? geometry : new LineGeometry();
  this.material = material !== undefined ? material : new LineMaterial({
    color: Math.random() * 0xffffff
  });
};

Line2.prototype = Object.assign(Object.create(LineSegments2.prototype), {
  constructor: Line2,
  isLine2: true,
  copy: function ()
  /* source */
  {
    // todo
    return this;
  }
});




/***/ }),

/***/ "./node_modules/three-geojson-geometry/dist/three-geojson-geometry.module.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/three-geojson-geometry/dist/three-geojson-geometry.module.js ***!
  \***********************************************************************************/
/*! exports provided: GeoJsonGeometry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeoJsonGeometry", function() { return GeoJsonGeometry; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var earcut__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! earcut */ "./node_modules/earcut/src/earcut.js");
/* harmony import */ var earcut__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(earcut__WEBPACK_IMPORTED_MODULE_1__);



function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var getInterpolatedVals = function getInterpolatedVals(start, end, numPnts) {
  var result = [];

  for (var i = 1; i <= numPnts; i++) {
    result.push(start + (end - start) * i / (numPnts + 1));
  }

  return result;
};

var interpolateLine = function interpolateLine() {
  var lineCoords = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var maxDegDistance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var result = [];
  var prevPnt = null;
  lineCoords.forEach(function (pnt) {
    if (prevPnt) {
      var dist = Math.sqrt(Math.pow(pnt[0] - prevPnt[0], 2) + Math.pow(pnt[1] - prevPnt[1], 2));

      if (dist > maxDegDistance) {
        var numAdditionalPnts = Math.floor(dist / maxDegDistance);
        var lngs = getInterpolatedVals(prevPnt[0], pnt[0], numAdditionalPnts);
        var lats = getInterpolatedVals(prevPnt[1], pnt[1], numAdditionalPnts);

        for (var i = 0, len = lngs.length; i < len; i++) {
          result.push([lngs[i], lats[i]]);
        }
      }
    }

    result.push(prevPnt = pnt);
  });
  return result;
};

var THREE = window.THREE ? window.THREE // Prefer consumption from global THREE, if exists
: {
  BufferGeometry: three__WEBPACK_IMPORTED_MODULE_0__["BufferGeometry"],
  Float32BufferAttribute: three__WEBPACK_IMPORTED_MODULE_0__["Float32BufferAttribute"],
  Geometry: three__WEBPACK_IMPORTED_MODULE_0__["Geometry"]
};

var setAttributeFn = new THREE.BufferGeometry().setAttribute ? 'setAttribute' : 'addAttribute';

function GeoJsonGeometry(geoJson) {
  var _this = this;

  var radius = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var resolution = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5;
  THREE.BufferGeometry.call(this);
  this.type = 'GeoJsonGeometry';
  this.parameters = {
    geoJson: geoJson,
    radius: radius,
    resolution: resolution
  }; // process various geometry types

  var groups = ({
    Point: genPoint,
    MultiPoint: genMultiPoint,
    LineString: genLineString,
    MultiLineString: genMultiLineString,
    Polygon: genPolygon,
    MultiPolygon: genMultiPolygon
  }[geoJson.type] || function () {
    return [];
  })(geoJson.coordinates, radius); // concat groups


  var indices = [],
      vertices = [];
  var groupCnt = 0;
  groups.forEach(function (newG) {
    var prevIndCnt = indices.length;
    concatGroup({
      indices: indices,
      vertices: vertices
    }, newG);

    _this.addGroup(prevIndCnt, indices.length - prevIndCnt, groupCnt++);
  }); // build geometry

  indices.length && this.setIndex(indices);
  vertices.length && this[setAttributeFn]('position', new THREE.Float32BufferAttribute(vertices, 3)); //

  function genPoint(coords, r) {
    var vertices = polar2Cartesian(coords[1], coords[0], r);
    var indices = [];
    return [{
      vertices: vertices,
      indices: indices
    }];
  }

  function genMultiPoint(coords, r) {
    var result = {
      vertices: [],
      indices: []
    };
    coords.map(function (c) {
      return genPoint(c, r);
    }).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          newPnt = _ref2[0];

      concatGroup(result, newPnt);
    });
    return [result];
  }

  function genLineString(coords, r) {
    var coords3d = interpolateLine(coords, resolution).map(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          lng = _ref4[0],
          lat = _ref4[1];

      return polar2Cartesian(lat, lng, r);
    });

    var _earcut$flatten = earcut__WEBPACK_IMPORTED_MODULE_1___default.a.flatten([coords3d]),
        vertices = _earcut$flatten.vertices;

    var numPoints = Math.round(vertices.length / 3);
    var indices = [];

    for (var vIdx = 1; vIdx < numPoints; vIdx++) {
      indices.push(vIdx - 1, vIdx);
    }

    return [{
      vertices: vertices,
      indices: indices
    }];
  }

  function genMultiLineString(coords, r) {
    var result = {
      vertices: [],
      indices: []
    };
    coords.map(function (c) {
      return genLineString(c, r);
    }).forEach(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 1),
          newLine = _ref6[0];

      concatGroup(result, newLine);
    });
    return [result];
  }

  function genPolygon(coords, r) {
    var coords3d = coords.map(function (coordsSegment) {
      return interpolateLine(coordsSegment, resolution).map(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            lng = _ref8[0],
            lat = _ref8[1];

        return polar2Cartesian(lat, lng, r);
      });
    }); // Each point generates 3 vertice items (x,y,z).

    var _earcut$flatten2 = earcut__WEBPACK_IMPORTED_MODULE_1___default.a.flatten(coords3d),
        vertices = _earcut$flatten2.vertices,
        holes = _earcut$flatten2.holes;

    var firstHoleIdx = holes[0] || Infinity;
    var outerVertices = vertices.slice(0, firstHoleIdx);
    var holeVertices = vertices.slice(firstHoleIdx);
    var holesIdx = new Set(holes);
    var numPoints = Math.round(vertices.length / 3);
    var outerIndices = [],
        holeIndices = [];

    for (var vIdx = 1; vIdx < numPoints; vIdx++) {
      if (!holesIdx.has(vIdx)) {
        if (vIdx < firstHoleIdx) {
          outerIndices.push(vIdx - 1, vIdx);
        } else {
          holeIndices.push(vIdx - 1 - firstHoleIdx, vIdx - firstHoleIdx);
        }
      }
    }

    var groups = [{
      indices: outerIndices,
      vertices: outerVertices
    }];

    if (holes.length) {
      groups.push({
        indices: holeIndices,
        vertices: holeVertices
      });
    }

    return groups;
  }

  function genMultiPolygon(coords, r) {
    var outer = {
      vertices: [],
      indices: []
    };
    var holes = {
      vertices: [],
      indices: []
    };
    coords.map(function (c) {
      return genPolygon(c, r);
    }).forEach(function (_ref9) {
      var _ref10 = _slicedToArray(_ref9, 2),
          newOuter = _ref10[0],
          newHoles = _ref10[1];

      concatGroup(outer, newOuter);
      newHoles && concatGroup(holes, newHoles);
    });
    var groups = [outer];
    holes.vertices.length && groups.push(holes);
    return groups;
  }
}

GeoJsonGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
GeoJsonGeometry.prototype.constructor = GeoJsonGeometry; //

function concatGroup(main, extra) {
  var prevVertCnt = Math.round(main.vertices.length / 3);
  concatArr(main.vertices, extra.vertices);
  concatArr(main.indices, extra.indices.map(function (ind) {
    return ind + prevVertCnt;
  }));
}

function concatArr(target, src) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = src[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var e = _step.value;
      target.push(e);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function polar2Cartesian(lat, lng) {
  var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var phi = (90 - lat) * Math.PI / 180;
  var theta = (90 - lng) * Math.PI / 180;
  return [r * Math.sin(phi) * Math.cos(theta), // x
  r * Math.cos(phi), // y
  r * Math.sin(phi) * Math.sin(theta) // z
  ];
}




/***/ }),

/***/ "./node_modules/three-globe/dist/three-globe.module.js":
/*!*************************************************************!*\
  !*** ./node_modules/three-globe/dist/three-globe.module.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var kapsule__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! kapsule */ "./node_modules/kapsule/dist/kapsule.module.js");
/* harmony import */ var _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tweenjs/tween.js */ "./node_modules/@tweenjs/tween.js/dist/tween.esm.js");
/* harmony import */ var three_geojson_geometry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three-geojson-geometry */ "./node_modules/three-geojson-geometry/dist/three-geojson-geometry.module.js");
/* harmony import */ var three_glow_mesh__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three-glow-mesh */ "./node_modules/three-glow-mesh/dist/index.module.js");
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/index.js");
/* harmony import */ var accessor_fn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! accessor-fn */ "./node_modules/accessor-fn/dist/accessor-fn.module.js");
/* harmony import */ var tinycolor2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tinycolor2 */ "./node_modules/tinycolor2/tinycolor.js");
/* harmony import */ var tinycolor2__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(tinycolor2__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var data_joint__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! data-joint */ "./node_modules/data-joint/dist/data-joint.module.js");
/* harmony import */ var frame_ticker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! frame-ticker */ "./node_modules/frame-ticker/dist/FrameTicker.js");
/* harmony import */ var frame_ticker__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(frame_ticker__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var d3_scale__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! d3-scale */ "./node_modules/d3-scale/src/index.js");
/* harmony import */ var three_conic_polygon_geometry__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! three-conic-polygon-geometry */ "./node_modules/three-conic-polygon-geometry/dist/three-conic-polygon-geometry.module.js");
/* harmony import */ var index_array_by__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! index-array-by */ "./node_modules/index-array-by/dist/index-array-by.module.js");
/* harmony import */ var h3_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! h3-js */ "./node_modules/h3-js/dist/browser/h3-js.es.js");
/* harmony import */ var three_fatline__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! three-fatline */ "./node_modules/three-fatline/dist/three-fatline.module.js");
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! d3-interpolate */ "./node_modules/d3-interpolate/src/index.js");

















function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var materialDispose = function materialDispose(material) {
  if (material instanceof Array) {
    material.forEach(materialDispose);
  } else {
    if (material.map) {
      material.map.dispose();
    }

    material.dispose();
  }
};

var deallocate = function deallocate(obj) {
  if (obj.geometry) {
    obj.geometry.dispose();
  }

  if (obj.material) {
    materialDispose(obj.material);
  }

  if (obj.texture) {
    obj.texture.dispose();
  }

  if (obj.children) {
    obj.children.forEach(deallocate);
  }
};

var emptyObject = function emptyObject(obj) {
  while (obj.children.length) {
    var childObj = obj.children[0];
    obj.remove(childObj);
    deallocate(childObj);
  }
};

function linkKapsule (kapsulePropName, kapsuleType) {
  var dummyK = new kapsuleType(); // To extract defaults

  return {
    linkProp: function linkProp(prop) {
      // link property config
      return {
        "default": dummyK[prop](),
        onChange: function onChange(v, state) {
          state[kapsulePropName][prop](v);
        },
        triggerUpdate: false
      };
    },
    linkMethod: function linkMethod(method) {
      // link method pass-through
      return function (state) {
        var kapsuleInstance = state[kapsulePropName];

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var returnVal = kapsuleInstance[method].apply(kapsuleInstance, args);
        return returnVal === kapsuleInstance ? this // chain based on the parent object, not the inner kapsule
        : returnVal;
      };
    }
  };
}

var GLOBE_RADIUS = 100;

function polar2Cartesian(lat, lng) {
  var relAltitude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var phi = (90 - lat) * Math.PI / 180;
  var theta = (90 - lng) * Math.PI / 180;
  var r = GLOBE_RADIUS * (1 + relAltitude);
  return {
    x: r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.cos(phi),
    z: r * Math.sin(phi) * Math.sin(theta)
  };
}

function cartesian2Polar(_ref) {
  var x = _ref.x,
      y = _ref.y,
      z = _ref.z;
  var r = Math.sqrt(x * x + y * y + z * z);
  var phi = Math.acos(y / r);
  var theta = Math.atan2(z, x);
  return {
    lat: 90 - phi * 180 / Math.PI,
    lng: 90 - theta * 180 / Math.PI - (theta < -Math.PI / 2 ? 360 : 0),
    // keep within [-180, 180] boundaries
    altitude: r / GLOBE_RADIUS - 1
  };
}

var THREE = window.THREE ? _objectSpread2(_objectSpread2({}, window.THREE), {}, {
  SphereGeometry: three__WEBPACK_IMPORTED_MODULE_0__["SphereGeometry"] // keep SphereGeometry from module for instance matching with three-glow-mesh

}) : {
  Color: three__WEBPACK_IMPORTED_MODULE_0__["Color"],
  LineBasicMaterial: three__WEBPACK_IMPORTED_MODULE_0__["LineBasicMaterial"],
  LineSegments: three__WEBPACK_IMPORTED_MODULE_0__["LineSegments"],
  Mesh: three__WEBPACK_IMPORTED_MODULE_0__["Mesh"],
  MeshPhongMaterial: three__WEBPACK_IMPORTED_MODULE_0__["MeshPhongMaterial"],
  SphereGeometry: three__WEBPACK_IMPORTED_MODULE_0__["SphereGeometry"],
  TextureLoader: three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]
};

var GlobeLayerKapsule = Object(kapsule__WEBPACK_IMPORTED_MODULE_1__["default"])({
  props: {
    globeImageUrl: {},
    bumpImageUrl: {},
    showAtmosphere: {
      "default": true,
      onChange: function onChange(showAtmosphere, state) {
        state.atmosphereObj.visible = !!showAtmosphere;
      },
      triggerUpdate: false
    },
    showGraticules: {
      "default": false,
      onChange: function onChange(showGraticules, state) {
        state.graticulesObj.visible = !!showGraticules;
      },
      triggerUpdate: false
    },
    onReady: {
      "default": function _default() {},
      triggerUpdate: false
    }
  },
  methods: {
    globeMaterial: function globeMaterial(state) {
      return state.globeObj.material;
    }
  },
  stateInit: function stateInit() {
    // create globe
    var globeGeometry = new THREE.SphereGeometry(GLOBE_RADIUS, 75, 75);
    var globeObj = new THREE.Mesh(globeGeometry, new THREE.MeshPhongMaterial({
      color: 0x000000,
      transparent: true
    }));
    globeObj.rotation.y = -Math.PI / 2; // face prime meridian along Z axis

    globeObj.__globeObjType = 'globe'; // Add object type
    // create atmosphere

    var atmosphereObj = Object(three_glow_mesh__WEBPACK_IMPORTED_MODULE_4__["createGlowMesh"])(globeObj.geometry, {
      backside: true,
      color: 'lightskyblue',
      size: GLOBE_RADIUS * 0.15,
      power: 3.5,
      // dispersion
      coefficient: 0.1
    });
    atmosphereObj.__globeObjType = 'atmosphere'; // Add object type
    // create graticules

    var graticulesObj = new THREE.LineSegments(new three_geojson_geometry__WEBPACK_IMPORTED_MODULE_3__["GeoJsonGeometry"](Object(d3_geo__WEBPACK_IMPORTED_MODULE_5__["geoGraticule10"])(), GLOBE_RADIUS, 2), new THREE.LineBasicMaterial({
      color: 'lightgrey',
      transparent: true,
      opacity: 0.1
    }));
    return {
      globeObj: globeObj,
      atmosphereObj: atmosphereObj,
      graticulesObj: graticulesObj
    };
  },
  init: function init(threeObj, state) {
    // Clear the scene
    emptyObject(threeObj); // Main three object to manipulate

    state.scene = threeObj;
    state.scene.add(state.globeObj); // add globe

    state.scene.add(state.atmosphereObj); // add atmosphere

    state.scene.add(state.graticulesObj); // add graticules

    state.ready = false;
  },
  update: function update(state, changedProps) {
    var globeMaterial = state.globeObj.material;

    if (changedProps.hasOwnProperty('globeImageUrl')) {
      if (!state.globeImageUrl) {
        // Black globe if no image
        !globeMaterial.color && (globeMaterial.color = new THREE.Color(0x000000));
      } else {
        new THREE.TextureLoader().load(state.globeImageUrl, function (texture) {
          globeMaterial.map = texture;
          globeMaterial.color = null;
          globeMaterial.needsUpdate = true; // ready when first globe image finishes loading (asynchronously to allow 1 frame to load texture)

          !state.ready && (state.ready = true) && setTimeout(state.onReady);
        });
      }
    }

    if (changedProps.hasOwnProperty('bumpImageUrl')) {
      if (!state.bumpImageUrl) {
        globeMaterial.bumpMap = null;
        globeMaterial.needsUpdate = true;
      } else {
        state.bumpImageUrl && new THREE.TextureLoader().load(state.bumpImageUrl, function (texture) {
          globeMaterial.bumpMap = texture;
          globeMaterial.needsUpdate = true;
        });
      }
    }

    if (!state.ready && !state.globeImageUrl) {
      // ready immediately if there's no globe image
      state.ready = true;
      state.onReady();
    }
  }
});

var colorStr2Hex = function colorStr2Hex(str) {
  return isNaN(str) ? parseInt(tinycolor2__WEBPACK_IMPORTED_MODULE_7___default()(str).toHex(), 16) : str;
};

var colorAlpha = function colorAlpha(str) {
  return isNaN(str) ? tinycolor2__WEBPACK_IMPORTED_MODULE_7___default()(str).getAlpha() : 1;
};

var color2ShaderArr = function color2ShaderArr(str) {
  var includeAlpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var rgba = tinycolor2__WEBPACK_IMPORTED_MODULE_7___default()(str).toRgb();
  var rgbArr = ['r', 'g', 'b'].map(function (d) {
    return rgba[d] / 255;
  });
  return includeAlpha ? [].concat(_toConsumableArray(rgbArr), [rgba.a]) : rgbArr;
};

function threeDigest(data, scene) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return Object(data_joint__WEBPACK_IMPORTED_MODULE_8__["default"])(data, scene.children, function (obj) {
    return scene.add(obj);
  }, function (obj) {
    scene.remove(obj);
    emptyObject(obj);
  }, _objectSpread2({
    objBindAttr: '__threeObj'
  }, options));
}

var THREE$1 = window.THREE ? window.THREE // Prefer consumption from global THREE, if exists
: {
  BufferGeometry: three__WEBPACK_IMPORTED_MODULE_0__["BufferGeometry"],
  Color: three__WEBPACK_IMPORTED_MODULE_0__["Color"],
  CylinderGeometry: three__WEBPACK_IMPORTED_MODULE_0__["CylinderGeometry"],
  CylinderBufferGeometry: three__WEBPACK_IMPORTED_MODULE_0__["CylinderBufferGeometry"],
  FaceColors: three__WEBPACK_IMPORTED_MODULE_0__["FaceColors"],
  Geometry: three__WEBPACK_IMPORTED_MODULE_0__["Geometry"],
  Matrix4: three__WEBPACK_IMPORTED_MODULE_0__["Matrix4"],
  Mesh: three__WEBPACK_IMPORTED_MODULE_0__["Mesh"],
  MeshBasicMaterial: three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"],
  MeshLambertMaterial: three__WEBPACK_IMPORTED_MODULE_0__["MeshLambertMaterial"],
  Object3D: three__WEBPACK_IMPORTED_MODULE_0__["Object3D"],
  Vector3: three__WEBPACK_IMPORTED_MODULE_0__["Vector3"]
};
// support multiple method names for backwards threejs compatibility

var applyMatrix4Fn = new THREE$1.BufferGeometry().applyMatrix4 ? 'applyMatrix4' : 'applyMatrix';
var PointsLayerKapsule = Object(kapsule__WEBPACK_IMPORTED_MODULE_1__["default"])({
  props: {
    pointsData: {
      "default": []
    },
    pointLat: {
      "default": 'lat'
    },
    pointLng: {
      "default": 'lng'
    },
    pointColor: {
      "default": function _default() {
        return '#ffffaa';
      }
    },
    pointAltitude: {
      "default": 0.1
    },
    // in units of globe radius
    pointRadius: {
      "default": 0.25
    },
    // in deg
    pointResolution: {
      "default": 12,
      triggerUpdate: false
    },
    // how many slice segments in the cylinder's circumference
    pointsMerge: {
      "default": false
    },
    // boolean. Whether to merge all points into a single mesh for rendering performance
    pointsTransitionDuration: {
      "default": 1000,
      triggerUpdate: false
    } // ms

  },
  init: function init(threeObj, state) {
    // Clear the scene
    emptyObject(threeObj); // Main three object to manipulate

    state.scene = threeObj;
  },
  update: function update(state) {
    // Data accessors
    var latAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.pointLat);
    var lngAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.pointLng);
    var altitudeAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.pointAltitude);
    var radiusAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.pointRadius);
    var colorAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.pointColor); // shared geometry

    var pointGeometry = new THREE$1[state.pointsMerge ? 'CylinderGeometry' : 'CylinderBufferGeometry'](1, 1, 1, state.pointResolution);
    pointGeometry[applyMatrix4Fn](new THREE$1.Matrix4().makeRotationX(Math.PI / 2));
    pointGeometry[applyMatrix4Fn](new THREE$1.Matrix4().makeTranslation(0, 0, -0.5));
    var pxPerDeg = 2 * Math.PI * GLOBE_RADIUS / 360;
    var pointMaterials = {}; // indexed by color

    var scene = state.pointsMerge ? new THREE$1.Object3D() : state.scene; // use fake scene if merging points

    threeDigest(state.pointsData, scene, {
      createObj: createObj,
      updateObj: updateObj
    });

    if (state.pointsMerge) {
      // merge points into a single mesh
      var pointsGeometry = new THREE$1.Geometry();
      state.pointsData.forEach(function (d) {
        var obj = d.__threeObj;
        d.__threeObj = undefined; // unbind merged points
        // color faces

        var color = new THREE$1.Color(colorAccessor(d));
        obj.geometry.faces.forEach(function (face) {
          return face.color = color;
        });
        obj.updateMatrix();
        pointsGeometry.merge(obj.geometry, obj.matrix);
      });
      var points = new THREE$1.Mesh(pointsGeometry, new THREE$1.MeshBasicMaterial({
        color: 0xffffff,
        vertexColors: THREE$1.FaceColors,
        morphTargets: false
      }));
      points.__globeObjType = 'points'; // Add object type

      points.__data = state.pointsData; // Attach obj data

      emptyObject(state.scene);
      state.scene.add(points);
    } //


    function createObj() {
      var obj = new THREE$1.Mesh(pointGeometry);
      obj.__globeObjType = 'point'; // Add object type

      return obj;
    }

    function updateObj(obj, d) {
      var applyUpdate = function applyUpdate(td) {
        var _obj$__currentTargetD = obj.__currentTargetD = td,
            r = _obj$__currentTargetD.r,
            alt = _obj$__currentTargetD.alt,
            lat = _obj$__currentTargetD.lat,
            lng = _obj$__currentTargetD.lng; // position cylinder ground


        Object.assign(obj.position, polar2Cartesian(lat, lng)); // orientate outwards

        var globeCenter = state.pointsMerge ? new THREE$1.Vector3(0, 0, 0) : state.scene.localToWorld(new THREE$1.Vector3(0, 0, 0)); // translate from local to world coords

        obj.lookAt(globeCenter); // scale radius and altitude

        obj.scale.x = obj.scale.y = Math.min(30, r) * pxPerDeg;
        obj.scale.z = Math.max(alt * GLOBE_RADIUS, 0.1); // avoid non-invertible matrix
      };

      var targetD = {
        alt: +altitudeAccessor(d),
        r: +radiusAccessor(d),
        lat: +latAccessor(d),
        lng: +lngAccessor(d)
      };
      var currentTargetD = obj.__currentTargetD || Object.assign({}, targetD, {
        alt: -1e-3
      });

      if (Object.keys(targetD).some(function (k) {
        return currentTargetD[k] !== targetD[k];
      })) {
        if (state.pointsMerge || !state.pointsTransitionDuration || state.pointsTransitionDuration < 0) {
          // set final position
          applyUpdate(targetD);
        } else {
          // animate
          new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].Tween(currentTargetD).to(targetD, state.pointsTransitionDuration).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].Easing.Quadratic.InOut).onUpdate(applyUpdate).start();
        }
      }

      if (!state.pointsMerge) {
        // Update materials on individual points
        var color = colorAccessor(d);
        var opacity = colorAlpha(color);

        if (!pointMaterials.hasOwnProperty(color)) {
          pointMaterials[color] = new THREE$1.MeshLambertMaterial({
            color: colorStr2Hex(color),
            transparent: opacity < 1,
            opacity: opacity
          });
        }

        obj.material = pointMaterials[color];
      }
    }
  }
});

var THREE$2 = window.THREE ? window.THREE // Prefer consumption from global THREE, if exists
: {
  AdditiveBlending: three__WEBPACK_IMPORTED_MODULE_0__["AdditiveBlending"],
  BufferGeometry: three__WEBPACK_IMPORTED_MODULE_0__["BufferGeometry"],
  CubicBezierCurve3: three__WEBPACK_IMPORTED_MODULE_0__["CubicBezierCurve3"],
  Curve: three__WEBPACK_IMPORTED_MODULE_0__["Curve"],
  Float32BufferAttribute: three__WEBPACK_IMPORTED_MODULE_0__["Float32BufferAttribute"],
  Group: three__WEBPACK_IMPORTED_MODULE_0__["Group"],
  Line: three__WEBPACK_IMPORTED_MODULE_0__["Line"],
  Mesh: three__WEBPACK_IMPORTED_MODULE_0__["Mesh"],
  QuadraticBezierCurve3: three__WEBPACK_IMPORTED_MODULE_0__["QuadraticBezierCurve3"],
  ShaderMaterial: three__WEBPACK_IMPORTED_MODULE_0__["ShaderMaterial"],
  TubeBufferGeometry: three__WEBPACK_IMPORTED_MODULE_0__["TubeBufferGeometry"],
  Vector3: three__WEBPACK_IMPORTED_MODULE_0__["Vector3"]
};
// support both modes for backwards threejs compatibility

var setAttributeFn = new THREE$2.BufferGeometry().setAttribute ? 'setAttribute' : 'addAttribute';
var gradientShaders = {
  uniforms: {
    // dash param defaults, all relative to full length
    dashOffset: {
      value: 0
    },
    dashSize: {
      value: 1
    },
    gapSize: {
      value: 0
    },
    dashTranslate: {
      value: 0
    } // used for animating the dash

  },
  vertexShader: "\n    uniform float dashTranslate; \n\n    attribute vec4 vertexColor;\n    varying vec4 vColor;\n    \n    attribute float vertexRelDistance;\n    varying float vRelDistance;\n\n    void main() {\n      // pass through colors and distances\n      vColor = vertexColor;\n      vRelDistance = vertexRelDistance + dashTranslate;\n      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n    }\n  ",
  fragmentShader: "\n    uniform float dashOffset; \n    uniform float dashSize;\n    uniform float gapSize; \n    \n    varying vec4 vColor;\n    varying float vRelDistance;\n    \n    void main() {\n      // ignore pixels in the gap\n      if (vRelDistance < dashOffset) discard;\n      if (mod(vRelDistance - dashOffset, dashSize + gapSize) > dashSize) discard;\n    \n      // set px color: [r, g, b, a], interpolated between vertices \n      gl_FragColor = vColor; \n    }\n  "
};
var ArcsLayerKapsule = Object(kapsule__WEBPACK_IMPORTED_MODULE_1__["default"])({
  props: {
    arcsData: {
      "default": []
    },
    arcStartLat: {
      "default": 'startLat'
    },
    arcStartLng: {
      "default": 'startLng'
    },
    arcEndLat: {
      "default": 'endLat'
    },
    arcEndLng: {
      "default": 'endLng'
    },
    arcColor: {
      "default": function _default() {
        return '#ffffaa';
      }
    },
    arcAltitude: {},
    // in units of globe radius
    arcAltitudeAutoScale: {
      "default": 0.5
    },
    // scale altitude proportional to great-arc distance between the two points
    arcStroke: {},
    // in deg
    arcCurveResolution: {
      "default": 64,
      triggerUpdate: false
    },
    // how many straight segments in the curve
    arcCircularResolution: {
      "default": 6,
      triggerUpdate: false
    },
    // how many slice segments in the tube's circumference
    arcDashLength: {
      "default": 1
    },
    // in units of line length
    arcDashGap: {
      "default": 0
    },
    arcDashInitialGap: {
      "default": 0
    },
    arcDashAnimateTime: {
      "default": 0
    },
    // ms
    arcsTransitionDuration: {
      "default": 1000,
      triggerUpdate: false
    } // ms

  },
  init: function init(threeObj, state) {
    // Clear the scene
    emptyObject(threeObj); // Main three object to manipulate

    state.scene = threeObj; // Kick-off dash animations

    new frame_ticker__WEBPACK_IMPORTED_MODULE_9___default.a().onTick.add(function (_, timeDelta) {
      state.arcsData.filter(function (d) {
        return d.__threeObj && d.__threeObj.children.length && d.__threeObj.children[0].material && d.__threeObj.children[0].__dashAnimateStep;
      }).forEach(function (d) {
        var obj = d.__threeObj.children[0];
        var step = obj.__dashAnimateStep * timeDelta;
        var curTranslate = obj.material.uniforms.dashTranslate.value % 1e9; // reset after 1B loops

        obj.material.uniforms.dashTranslate.value = curTranslate + step;
      });
    });
  },
  update: function update(state) {
    // Data accessors
    var startLatAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.arcStartLat);
    var startLngAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.arcStartLng);
    var endLatAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.arcEndLat);
    var endLngAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.arcEndLng);
    var altitudeAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.arcAltitude);
    var altitudeAutoScaleAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.arcAltitudeAutoScale);
    var strokeAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.arcStroke);
    var colorAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.arcColor);
    var dashLengthAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.arcDashLength);
    var dashGapAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.arcDashGap);
    var dashInitialGapAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.arcDashInitialGap);
    var dashAnimateTimeAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.arcDashAnimateTime);
    var sharedMaterial = new THREE$2.ShaderMaterial(_objectSpread2(_objectSpread2({}, gradientShaders), {}, {
      transparent: true,
      blending: THREE$2.AdditiveBlending
    }));
    threeDigest(state.arcsData, state.scene, {
      createObj: function createObj() {
        var obj = new THREE$2.Group(); // populated in updateObj

        obj.__globeObjType = 'arc'; // Add object type

        return obj;
      },
      updateObj: function updateObj(group, arc) {
        var stroke = strokeAccessor(arc);
        var useTube = stroke !== null && stroke !== undefined;

        if (!group.children.length || useTube !== (group.children[0].type === 'Mesh')) {
          // create or swap object types
          emptyObject(group);

          var _obj = useTube ? new THREE$2.Mesh() : new THREE$2.Line(new THREE$2.BufferGeometry());

          _obj.material = sharedMaterial.clone(); // Separate material instance per object to have dedicated uniforms (but shared shaders)

          group.add(_obj);
        }

        var obj = group.children[0]; // set dash uniforms

        Object.assign(obj.material.uniforms, {
          dashSize: {
            value: dashLengthAccessor(arc)
          },
          gapSize: {
            value: dashGapAccessor(arc)
          },
          dashOffset: {
            value: dashInitialGapAccessor(arc)
          }
        }); // set dash animation step

        var dashAnimateTime = dashAnimateTimeAccessor(arc);
        obj.__dashAnimateStep = dashAnimateTime > 0 ? 1000 / dashAnimateTime : 0; // per second
        // calculate vertex colors (to create gradient)

        var vertexColorArray = calcColorVertexArray(colorAccessor(arc), // single or array of colors
        state.arcCurveResolution, // numSegments
        useTube ? state.arcCircularResolution + 1 : 1 // num vertices per segment
        ); // calculate vertex relative distances (for dashed lines)

        var vertexRelDistanceArray = calcVertexRelDistances(state.arcCurveResolution, // numSegments
        useTube ? state.arcCircularResolution + 1 : 1, // num vertices per segment
        true // run from end to start, to animate in the correct direction
        );
        obj.geometry[setAttributeFn]('vertexColor', vertexColorArray);
        obj.geometry[setAttributeFn]('vertexRelDistance', vertexRelDistanceArray);

        var applyUpdate = function applyUpdate(td) {
          var _arc$__currentTargetD = arc.__currentTargetD = td,
              stroke = _arc$__currentTargetD.stroke,
              curveD = _objectWithoutProperties(_arc$__currentTargetD, ["stroke"]);

          var curve = calcCurve(curveD);

          if (useTube) {
            obj.geometry && obj.geometry.dispose();
            obj.geometry = new THREE$2.TubeBufferGeometry(curve, state.arcCurveResolution, stroke / 2, state.arcCircularResolution);
            obj.geometry[setAttributeFn]('vertexColor', vertexColorArray);
            obj.geometry[setAttributeFn]('vertexRelDistance', vertexRelDistanceArray);
          } else {
            obj.geometry.setFromPoints(curve.getPoints(state.arcCurveResolution));
          }
        };

        var targetD = {
          stroke: stroke,
          alt: altitudeAccessor(arc),
          altAutoScale: +altitudeAutoScaleAccessor(arc),
          startLat: +startLatAccessor(arc),
          startLng: +startLngAccessor(arc),
          endLat: +endLatAccessor(arc),
          endLng: +endLngAccessor(arc)
        };
        var currentTargetD = arc.__currentTargetD || Object.assign({}, targetD, {
          altAutoScale: -1e-3
        });

        if (Object.keys(targetD).some(function (k) {
          return currentTargetD[k] !== targetD[k];
        })) {
          if (!state.arcsTransitionDuration || state.arcsTransitionDuration < 0) {
            // set final position
            applyUpdate(targetD);
          } else {
            // animate
            new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].Tween(currentTargetD).to(targetD, state.arcsTransitionDuration).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].Easing.Quadratic.InOut).onUpdate(applyUpdate).start();
          }
        }
      }
    }); //

    function calcCurve(_ref) {
      var alt = _ref.alt,
          altAutoScale = _ref.altAutoScale,
          startLat = _ref.startLat,
          startLng = _ref.startLng,
          endLat = _ref.endLat,
          endLng = _ref.endLng;

      var getVec = function getVec(_ref2) {
        var _ref3 = _slicedToArray(_ref2, 3),
            lng = _ref3[0],
            lat = _ref3[1],
            alt = _ref3[2];

        var _polar2Cartesian = polar2Cartesian(lat, lng, alt),
            x = _polar2Cartesian.x,
            y = _polar2Cartesian.y,
            z = _polar2Cartesian.z;

        return new THREE$2.Vector3(x, y, z);
      }; //calculate curve


      var startPnt = [startLng, startLat];
      var endPnt = [endLng, endLat];
      var altitude = alt;
      (altitude === null || altitude === undefined) && ( // by default set altitude proportional to the great-arc distance
      altitude = Object(d3_geo__WEBPACK_IMPORTED_MODULE_5__["geoDistance"])(startPnt, endPnt) / 2 * altAutoScale);

      if (altitude) {
        var interpolate = Object(d3_geo__WEBPACK_IMPORTED_MODULE_5__["geoInterpolate"])(startPnt, endPnt);

        var _map = [0.25, 0.75].map(function (t) {
          return [].concat(_toConsumableArray(interpolate(t)), [altitude * 1.5]);
        }),
            _map2 = _slicedToArray(_map, 2),
            m1Pnt = _map2[0],
            m2Pnt = _map2[1];

        var curve = _construct(THREE$2.CubicBezierCurve3, _toConsumableArray([startPnt, m1Pnt, m2Pnt, endPnt].map(getVec))); //const mPnt = [...interpolate(0.5), altitude * 2];
        //curve = new THREE.QuadraticBezierCurve3(...[startPnt, mPnt, endPnt].map(getVec));


        return curve;
      } else {
        // ground line
        var _alt = 0.001; // slightly above the ground to prevent occlusion

        return calcSphereArc.apply(void 0, _toConsumableArray([[].concat(startPnt, [_alt]), [].concat(endPnt, [_alt])].map(getVec)));
      } //


      function calcSphereArc(startVec, endVec) {
        var angle = startVec.angleTo(endVec);

        var getGreatCirclePoint = function getGreatCirclePoint(t) {
          return new THREE$2.Vector3().addVectors(startVec.clone().multiplyScalar(Math.sin((1 - t) * angle)), endVec.clone().multiplyScalar(Math.sin(t * angle))).divideScalar(Math.sin(angle));
        };

        var sphereArc = new THREE$2.Curve();
        sphereArc.getPoint = getGreatCirclePoint;
        return sphereArc;
      }
    }

    function calcColorVertexArray(colors, numSegments) {
      var numVerticesPerSegment = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var numVerticesGroup = numSegments + 1; // one between every two segments and two at the ends

      var getVertexColor;

      if (colors instanceof Array) {
        // array of colors, interpolate at each step
        var colorScale = Object(d3_scale__WEBPACK_IMPORTED_MODULE_10__["scaleLinear"])().domain(colors.map(function (_, idx) {
          return idx / (colors.length - 1);
        })) // same number of stops as colors
        .range(colors);

        getVertexColor = function getVertexColor(t) {
          return color2ShaderArr(colorScale(t));
        };
      } else {
        // single color, use constant
        var vertexColor = color2ShaderArr(colors);

        getVertexColor = function getVertexColor() {
          return vertexColor;
        };
      }

      var vertexColorArray = new THREE$2.Float32BufferAttribute(numVerticesGroup * 4 * numVerticesPerSegment, 4);

      for (var v = 0, l = numVerticesGroup; v < l; v++) {
        var _vertexColor = getVertexColor(v / (l - 1));

        for (var s = 0; s < numVerticesPerSegment; s++) {
          vertexColorArray.set(_vertexColor, (v * numVerticesPerSegment + s) * 4);
        }
      }

      return vertexColorArray;
    }

    function calcVertexRelDistances(numSegments) {
      var numVerticesPerSegment = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var invert = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var numVerticesGroup = numSegments + 1; // one between every two segments and two at the ends

      var arrLen = numVerticesGroup * numVerticesPerSegment;
      var vertexDistanceArray = new THREE$2.Float32BufferAttribute(arrLen, 1);

      for (var v = 0, l = numVerticesGroup; v < l; v++) {
        var relDistance = v / (l - 1);

        for (var s = 0; s < numVerticesPerSegment; s++) {
          var idx = v * numVerticesPerSegment + s;
          var pos = invert ? arrLen - 1 - idx : idx;
          vertexDistanceArray.setX(pos, relDistance);
        }
      }

      return vertexDistanceArray;
    }
  }
});

var THREE$3 = window.THREE ? window.THREE // Prefer consumption from global THREE, if exists
: {
  Color: three__WEBPACK_IMPORTED_MODULE_0__["Color"],
  FaceColors: three__WEBPACK_IMPORTED_MODULE_0__["FaceColors"],
  Geometry: three__WEBPACK_IMPORTED_MODULE_0__["Geometry"],
  Mesh: three__WEBPACK_IMPORTED_MODULE_0__["Mesh"],
  MeshBasicMaterial: three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"],
  MeshLambertMaterial: three__WEBPACK_IMPORTED_MODULE_0__["MeshLambertMaterial"],
  Object3D: three__WEBPACK_IMPORTED_MODULE_0__["Object3D"]
};

var HexBinLayerKapsule = Object(kapsule__WEBPACK_IMPORTED_MODULE_1__["default"])({
  props: {
    hexBinPointsData: {
      "default": []
    },
    hexBinPointLat: {
      "default": 'lat'
    },
    hexBinPointLng: {
      "default": 'lng'
    },
    hexBinPointWeight: {
      "default": 1
    },
    hexBinResolution: {
      "default": 4
    },
    // 0-15. Level 0 partitions the earth in 122 (mostly) hexagonal cells. Each subsequent level sub-divides the previous in roughly 7 hexagons.
    hexMargin: {
      "default": 0.2
    },
    // in fraction of diameter
    hexTopCurvatureResolution: {
      "default": 5
    },
    // in angular degrees
    hexTopColor: {
      "default": function _default() {
        return '#ffffaa';
      }
    },
    hexSideColor: {
      "default": function _default() {
        return '#ffffaa';
      }
    },
    hexAltitude: {
      "default": function _default(_ref) {
        var sumWeight = _ref.sumWeight;
        return sumWeight * 0.01;
      }
    },
    // in units of globe radius
    hexBinMerge: {
      "default": false
    },
    // boolean. Whether to merge all hex geometries into a single mesh for rendering performance
    hexTransitionDuration: {
      "default": 1000,
      triggerUpdate: false
    } // ms

  },
  init: function init(threeObj, state) {
    // Clear the scene
    emptyObject(threeObj); // Main three object to manipulate

    state.scene = threeObj;
  },
  update: function update(state) {
    // Accessors
    var latAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.hexBinPointLat);
    var lngAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.hexBinPointLng);
    var weightAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.hexBinPointWeight);
    var altitudeAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.hexAltitude);
    var topColorAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.hexTopColor);
    var sideColorAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.hexSideColor);
    var marginAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.hexMargin);
    var byH3Idx = Object(index_array_by__WEBPACK_IMPORTED_MODULE_12__["default"])(state.hexBinPointsData.map(function (d) {
      return _objectSpread2(_objectSpread2({}, d), {}, {
        h3Idx: Object(h3_js__WEBPACK_IMPORTED_MODULE_13__["geoToH3"])(latAccessor(d), lngAccessor(d), state.hexBinResolution)
      });
    }), 'h3Idx');
    var hexBins = Object.entries(byH3Idx).map(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          h3Idx = _ref3[0],
          points = _ref3[1];

      return {
        h3Idx: h3Idx,
        points: points,
        sumWeight: points.reduce(function (agg, d) {
          return agg + +weightAccessor(d);
        }, 0)
      };
    });
    var hexMaterials = {}; // indexed by color

    var scene = state.hexBinMerge ? new THREE$3.Object3D() : state.scene; // use fake scene if merging hex points

    threeDigest(hexBins, scene, {
      createObj: createObj,
      updateObj: updateObj,
      idAccessor: function idAccessor(d) {
        return d.h3Idx;
      }
    });

    if (state.hexBinMerge) {
      // merge points into a single mesh
      var hexPointsGeometry = new THREE$3.Geometry();
      hexBins.forEach(function (d) {
        var obj = d.__threeObj;
        d.__threeObj = undefined; // unbind merged points
        // color faces

        var topColor = new THREE$3.Color(topColorAccessor(d));
        var sideColor = new THREE$3.Color(sideColorAccessor(d));
        var topFaceIdx = obj.geometry.faces.length - 4;
        obj.geometry.faces.forEach(function (face, idx) {
          return face.color = idx >= topFaceIdx ? topColor : sideColor;
        });
        obj.updateMatrix();
        hexPointsGeometry.merge(obj.geometry, obj.matrix);
      });
      var hexPoints = new THREE$3.Mesh(hexPointsGeometry, new THREE$3.MeshBasicMaterial({
        color: 0xffffff,
        vertexColors: THREE$3.FaceColors,
        morphTargets: false
      }));
      hexPoints.__globeObjType = 'hexBinPoints'; // Add object type

      hexPoints.__data = hexBins; // Attach obj data

      emptyObject(state.scene);
      state.scene.add(hexPoints);
    } //


    function createObj(d) {
      var obj = new THREE$3.Mesh();
      obj.__hexCenter = Object(h3_js__WEBPACK_IMPORTED_MODULE_13__["h3ToGeo"])(d.h3Idx);
      obj.__hexGeoJson = Object(h3_js__WEBPACK_IMPORTED_MODULE_13__["h3ToGeoBoundary"])(d.h3Idx, true); // stitch longitudes at the anti-meridian

      var centerLng = obj.__hexCenter[1];

      obj.__hexGeoJson.forEach(function (d) {
        var edgeLng = d[0];

        if (Math.abs(centerLng - edgeLng) > 170) {
          // normalize large lng distances
          d[0] += centerLng > edgeLng ? 360 : -360;
        }
      });

      obj.__globeObjType = 'hexbin'; // Add object type

      return obj;
    }

    function updateObj(obj, d) {
      var GeometryClass = state.hexBinMerge ? three_conic_polygon_geometry__WEBPACK_IMPORTED_MODULE_11__["ConicPolygonGeometry"] : three_conic_polygon_geometry__WEBPACK_IMPORTED_MODULE_11__["ConicPolygonGeometry"];
      var targetD = {
        alt: +altitudeAccessor(d),
        margin: Math.max(0, Math.min(1, +marginAccessor(d))),
        hexTopCurvatureResolution: state.hexTopCurvatureResolution
      };

      var applyUpdate = function applyUpdate(td) {
        var _obj$__currentTargetD = obj.__currentTargetD = td,
            alt = _obj$__currentTargetD.alt,
            margin = _obj$__currentTargetD.margin,
            hexTopCurvatureResolution = _obj$__currentTargetD.hexTopCurvatureResolution;

        var _final = Math.abs(alt - targetD.alt) < 1e-9 && Math.abs(margin - targetD.margin) < 1e-9;

        var topRes = _final ? hexTopCurvatureResolution : 180; // use lower resolution for transitory states
        // compute new geojson with relative margin

        var relNum = function relNum(st, end, rat) {
          return st - (st - end) * rat;
        };

        var _obj$__hexCenter = _slicedToArray(obj.__hexCenter, 2),
            clat = _obj$__hexCenter[0],
            clng = _obj$__hexCenter[1];

        var geoJson = margin === 0 ? obj.__hexGeoJson : obj.__hexGeoJson.map(function (_ref4) {
          var _ref5 = _slicedToArray(_ref4, 2),
              elng = _ref5[0],
              elat = _ref5[1];

          return [[elng, clng], [elat, clat]].map(function (_ref6) {
            var _ref7 = _slicedToArray(_ref6, 2),
                st = _ref7[0],
                end = _ref7[1];

            return relNum(st, end, margin);
          });
        });
        obj.geometry = new GeometryClass([geoJson], GLOBE_RADIUS, GLOBE_RADIUS * (1 + alt), false, true, true, topRes);
      };

      var currentTargetD = obj.__currentTargetD || Object.assign({}, targetD, {
        alt: -1e-3
      });

      if (Object.keys(targetD).some(function (k) {
        return currentTargetD[k] !== targetD[k];
      })) {
        if (state.hexBinMerge || !state.hexTransitionDuration || state.hexTransitionDuration < 0) {
          // set final position
          applyUpdate(targetD);
        } else {
          // animate
          new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].Tween(currentTargetD).to(targetD, state.hexTransitionDuration).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].Easing.Quadratic.InOut).onUpdate(applyUpdate).start();
        }
      }

      if (!state.hexBinMerge) {
        // Update materials on individual hex points
        var sideColor = sideColorAccessor(d);
        var topColor = topColorAccessor(d);
        [sideColor, topColor].forEach(function (color) {
          if (!hexMaterials.hasOwnProperty(color)) {
            var opacity = colorAlpha(color);
            hexMaterials[color] = new THREE$3.MeshLambertMaterial({
              color: colorStr2Hex(color),
              transparent: opacity < 1,
              opacity: opacity
            });
          }
        });
        obj.material = [sideColor, topColor].map(function (color) {
          return hexMaterials[color];
        });
      }
    }
  }
});

var THREE$4 = window.THREE ? window.THREE // Prefer consumption from global THREE, if exists
: {
  DoubleSide: three__WEBPACK_IMPORTED_MODULE_0__["DoubleSide"],
  Group: three__WEBPACK_IMPORTED_MODULE_0__["Group"],
  Line: three__WEBPACK_IMPORTED_MODULE_0__["Line"],
  LineBasicMaterial: three__WEBPACK_IMPORTED_MODULE_0__["LineBasicMaterial"],
  Mesh: three__WEBPACK_IMPORTED_MODULE_0__["Mesh"],
  MeshBasicMaterial: three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]
};

var PolygonsLayerKapsule = Object(kapsule__WEBPACK_IMPORTED_MODULE_1__["default"])({
  props: {
    polygonsData: {
      "default": []
    },
    polygonGeoJsonGeometry: {
      "default": 'geometry'
    },
    polygonSideColor: {
      "default": function _default() {
        return '#ffffaa';
      }
    },
    polygonCapColor: {
      "default": function _default() {
        return '#ffffaa';
      }
    },
    polygonStrokeColor: {},
    polygonAltitude: {
      "default": 0.01
    },
    // in units of globe radius
    polygonCapCurvatureResolution: {
      "default": 5
    },
    // in angular degrees
    polygonsTransitionDuration: {
      "default": 1000,
      triggerUpdate: false
    } // ms

  },
  init: function init(threeObj, state) {
    // Clear the scene
    emptyObject(threeObj); // Main three object to manipulate

    state.scene = threeObj;
  },
  update: function update(state) {
    // Data accessors
    var geoJsonAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.polygonGeoJsonGeometry);
    var altitudeAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.polygonAltitude);
    var capCurvatureResolutionAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.polygonCapCurvatureResolution);
    var capColorAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.polygonCapColor);
    var sideColorAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.polygonSideColor);
    var strokeColorAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.polygonStrokeColor);
    var singlePolygons = [];
    state.polygonsData.forEach(function (polygon) {
      var objAttrs = {
        data: polygon,
        capColor: capColorAccessor(polygon),
        sideColor: sideColorAccessor(polygon),
        strokeColor: strokeColorAccessor(polygon),
        altitude: +altitudeAccessor(polygon),
        capCurvatureResolution: +capCurvatureResolutionAccessor(polygon)
      };
      var geoJson = geoJsonAccessor(polygon);
      var geoId = polygon.__id || "".concat(Math.round(Math.random() * 1e9)); // generate and stamp polygon ids to keep track in digest

      polygon.__id = geoId;

      if (geoJson.type === 'Polygon') {
        singlePolygons.push(_objectSpread2({
          id: "".concat(geoId, "_0"),
          coords: geoJson.coordinates
        }, objAttrs));
      } else if (geoJson.type === 'MultiPolygon') {
        singlePolygons.push.apply(singlePolygons, _toConsumableArray(geoJson.coordinates.map(function (coords, idx) {
          return _objectSpread2({
            id: "".concat(geoId, "_").concat(idx),
            coords: coords
          }, objAttrs);
        })));
      } else {
        console.warn("Unsupported GeoJson geometry type: ".concat(geoJson.type, ". Skipping geometry..."));
      }
    });
    threeDigest(singlePolygons, state.scene, {
      idAccessor: function idAccessor(d) {
        return d.id;
      },
      createObj: function createObj() {
        var obj = new THREE$4.Group(); // conic geometry

        obj.add(new THREE$4.Mesh(undefined, [new THREE$4.MeshBasicMaterial({
          side: THREE$4.DoubleSide,
          depthWrite: true
        }), // side material
        new THREE$4.MeshBasicMaterial({
          side: THREE$4.DoubleSide,
          depthWrite: true
        }) // cap material
        ])); // polygon stroke

        obj.add(new THREE$4.Line(undefined, new THREE$4.LineBasicMaterial()));
        obj.__globeObjType = 'polygon'; // Add object type

        return obj;
      },
      updateObj: function updateObj(obj, _ref) {
        var coords = _ref.coords,
            capColor = _ref.capColor,
            sideColor = _ref.sideColor,
            strokeColor = _ref.strokeColor,
            altitude = _ref.altitude,
            capCurvatureResolution = _ref.capCurvatureResolution;

        var _obj$children = _slicedToArray(obj.children, 2),
            conicObj = _obj$children[0],
            strokeObj = _obj$children[1]; // hide stroke if no color set


        var addStroke = !!strokeColor;
        strokeObj.visible = addStroke; // update materials

        [sideColor, capColor].forEach(function (color, materialIdx) {
          // conic object
          var material = conicObj.material[materialIdx];
          var opacity = colorAlpha(color);
          material.color.set(colorStr2Hex(color));
          material.transparent = opacity < 1;
          material.opacity = opacity;
        });

        if (addStroke) {
          // stroke object
          var material = strokeObj.material;
          var opacity = colorAlpha(strokeColor);
          material.color.set(colorStr2Hex(strokeColor));
          material.transparent = opacity < 1;
          material.opacity = opacity;
        }

        var geoJsonGeometry = {
          type: 'Polygon',
          coordinates: coords
        };
        var targetD = {
          alt: altitude,
          capCurvatureResolution: capCurvatureResolution
        };

        var applyUpdate = function applyUpdate(td) {
          var _obj$__currentTargetD = obj.__currentTargetD = td,
              alt = _obj$__currentTargetD.alt,
              capCurvatureResolution = _obj$__currentTargetD.capCurvatureResolution;

          var _final = Math.abs(alt - targetD.alt) < 1e-9;

          var res = _final ? capCurvatureResolution : 180; // use lower resolution for transitory states

          conicObj.geometry = new three_conic_polygon_geometry__WEBPACK_IMPORTED_MODULE_11__["ConicPolygonBufferGeometry"](coords, GLOBE_RADIUS, GLOBE_RADIUS * (1 + alt), false, true, true, res);
          addStroke && (strokeObj.geometry = new three_geojson_geometry__WEBPACK_IMPORTED_MODULE_3__["GeoJsonGeometry"](geoJsonGeometry, GLOBE_RADIUS * (1 + alt + 1e-4), res)); // stroke slightly above the conic mesh
        };

        var currentTargetD = obj.__currentTargetD || Object.assign({}, targetD, {
          alt: -1e-3
        });

        if (Object.keys(targetD).some(function (k) {
          return currentTargetD[k] !== targetD[k];
        })) {
          if (!state.polygonsTransitionDuration || state.polygonsTransitionDuration < 0 || currentTargetD.alt === targetD.alt) {
            // set final position
            applyUpdate(targetD);
          } else {
            // animate
            new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].Tween(currentTargetD).to(targetD, state.polygonsTransitionDuration).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].Easing.Quadratic.InOut).onUpdate(applyUpdate).start();
          }
        }
      }
    });
  }
});

var THREE$5 = window.THREE ? window.THREE // Prefer consumption from global THREE, if exists
: {
  Geometry: three__WEBPACK_IMPORTED_MODULE_0__["Geometry"],
  Mesh: three__WEBPACK_IMPORTED_MODULE_0__["Mesh"],
  MeshLambertMaterial: three__WEBPACK_IMPORTED_MODULE_0__["MeshLambertMaterial"]
};

var HexedPolygonsLayerKapsule = Object(kapsule__WEBPACK_IMPORTED_MODULE_1__["default"])({
  props: {
    hexPolygonsData: {
      "default": []
    },
    hexPolygonGeoJsonGeometry: {
      "default": 'geometry'
    },
    hexPolygonColor: {
      "default": function _default() {
        return '#ffffaa';
      }
    },
    hexPolygonAltitude: {
      "default": 0.001
    },
    // in units of globe radius
    hexPolygonResolution: {
      "default": 3
    },
    // 0-15. Level 0 partitions the earth in 122 (mostly) hexagonal cells. Each subsequent level sub-divides the previous in roughly 7 hexagons.
    hexPolygonMargin: {
      "default": 0.2
    },
    // in fraction of hex diameter
    hexPolygonCurvatureResolution: {
      "default": 5
    },
    // in angular degrees
    hexPolygonsTransitionDuration: {
      "default": 0,
      triggerUpdate: false
    } // ms

  },
  init: function init(threeObj, state) {
    // Clear the scene
    emptyObject(threeObj); // Main three object to manipulate

    state.scene = threeObj;
  },
  update: function update(state) {
    // Accessors
    var geoJsonAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.hexPolygonGeoJsonGeometry);
    var colorAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.hexPolygonColor);
    var altitudeAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.hexPolygonAltitude);
    var resolutionAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.hexPolygonResolution);
    var marginAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.hexPolygonMargin);
    var curvatureResolutionAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.hexPolygonCurvatureResolution);
    threeDigest(state.hexPolygonsData, state.scene, {
      createObj: function createObj(d) {
        var obj = new THREE$5.Mesh(undefined, new THREE$5.MeshLambertMaterial());
        obj.__globeObjType = 'hexPolygon'; // Add object type

        return obj;
      },
      updateObj: function updateObj(obj, d) {
        var geoJson = geoJsonAccessor(d);
        var h3Res = resolutionAccessor(d);
        var alt = altitudeAccessor(d);
        var margin = Math.max(0, Math.min(1, +marginAccessor(d)));
        var curvatureResolution = curvatureResolutionAccessor(d); // update material

        var color = colorAccessor(d);
        var opacity = colorAlpha(color);
        obj.material.color.set(colorStr2Hex(color));
        obj.material.transparent = opacity < 1;
        obj.material.opacity = opacity;
        var h3Idxs = [];

        if (geoJson.type === 'Polygon') {
          h3Idxs.push.apply(h3Idxs, _toConsumableArray(Object(h3_js__WEBPACK_IMPORTED_MODULE_13__["polyfill"])(geoJson.coordinates, h3Res, true)));
        } else if (geoJson.type === 'MultiPolygon') {
          geoJson.coordinates.forEach(function (coords) {
            return h3Idxs.push.apply(h3Idxs, _toConsumableArray(Object(h3_js__WEBPACK_IMPORTED_MODULE_13__["polyfill"])(coords, h3Res, true)));
          });
        } else {
          console.warn("Unsupported GeoJson geometry type: ".concat(geoJson.type, ". Skipping geometry..."));
        }

        var hexBins = h3Idxs.map(function (h3Idx) {
          var hexCenter = Object(h3_js__WEBPACK_IMPORTED_MODULE_13__["h3ToGeo"])(h3Idx);
          var hexGeoJson = Object(h3_js__WEBPACK_IMPORTED_MODULE_13__["h3ToGeoBoundary"])(h3Idx, true); // stitch longitudes at the anti-meridian

          var centerLng = hexCenter[1];
          hexGeoJson.forEach(function (d) {
            var edgeLng = d[0];

            if (Math.abs(centerLng - edgeLng) > 170) {
              // normalize large lng distances
              d[0] += centerLng > edgeLng ? 360 : -360;
            }
          });
          return {
            h3Idx: h3Idx,
            hexCenter: hexCenter,
            hexGeoJson: hexGeoJson
          };
        });
        var targetD = {
          alt: alt,
          margin: margin,
          curvatureResolution: curvatureResolution
        };

        var applyUpdate = function applyUpdate(td) {
          var _obj$__currentTargetD = obj.__currentTargetD = td,
              alt = _obj$__currentTargetD.alt,
              margin = _obj$__currentTargetD.margin,
              curvatureResolution = _obj$__currentTargetD.curvatureResolution;

          obj.geometry = new THREE$5.Geometry();
          hexBins.forEach(function (h) {
            // compute new geojson with relative margin
            var relNum = function relNum(st, end, rat) {
              return st - (st - end) * rat;
            };

            var _h$hexCenter = _slicedToArray(h.hexCenter, 2),
                clat = _h$hexCenter[0],
                clng = _h$hexCenter[1];

            var geoJson = margin === 0 ? h.hexGeoJson : h.hexGeoJson.map(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 2),
                  elng = _ref2[0],
                  elat = _ref2[1];

              return [[elng, clng], [elat, clat]].map(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 2),
                    st = _ref4[0],
                    end = _ref4[1];

                return relNum(st, end, margin);
              });
            });
            var hexGeom = new three_conic_polygon_geometry__WEBPACK_IMPORTED_MODULE_11__["ConicPolygonGeometry"]([geoJson], GLOBE_RADIUS, GLOBE_RADIUS * (1 + alt), false, true, false, curvatureResolution);
            obj.geometry.merge(hexGeom);
          });
        };

        var currentTargetD = obj.__currentTargetD || Object.assign({}, targetD, {
          alt: -1e-3
        });

        if (Object.keys(targetD).some(function (k) {
          return currentTargetD[k] !== targetD[k];
        })) {
          if (!state.hexPolygonsTransitionDuration || state.hexPolygonsTransitionDuration < 0) {
            // set final position
            applyUpdate(targetD);
          } else {
            // animate
            new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].Tween(currentTargetD).to(targetD, state.hexPolygonsTransitionDuration).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].Easing.Quadratic.InOut).onUpdate(applyUpdate).start();
          }
        }
      }
    });
  }
});

var THREE$6 = window.THREE ? window.THREE // Prefer consumption from global THREE, if exists
: {
  Vector3: three__WEBPACK_IMPORTED_MODULE_0__["Vector3"]
};
function interpolateVectors(fromPnts, toPnts) {
  var extendArr = function extendArr(arr, length) {
    var repeatItem = arr[arr.length - 1];
    return [].concat(_toConsumableArray(arr), _toConsumableArray(_toConsumableArray(new Array(length - arr.length)).map(function () {
      return repeatItem;
    })));
  };

  var arrLength = Math.max(fromPnts.length, toPnts.length);
  var interpolator = d3_interpolate__WEBPACK_IMPORTED_MODULE_15__["interpolateArray"].apply(void 0, _toConsumableArray([fromPnts, toPnts].map(function (pnts) {
    return pnts.map(function (_ref) {
      var x = _ref.x,
          y = _ref.y,
          z = _ref.z;
      return [x, y, z];
    });
  }).map(function (arr) {
    return extendArr(arr, arrLength);
  })));
  return function (k) {
    return k === 0 ? fromPnts : k === 1 ? toPnts : interpolator(k).map(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 3),
          x = _ref3[0],
          y = _ref3[1],
          z = _ref3[2];

      return new THREE$6.Vector3(x, y, z);
    });
  };
}

var THREE$7 = window.THREE ? window.THREE // Prefer consumption from global THREE, if exists
: {
  AdditiveBlending: three__WEBPACK_IMPORTED_MODULE_0__["AdditiveBlending"],
  BufferGeometry: three__WEBPACK_IMPORTED_MODULE_0__["BufferGeometry"],
  Color: three__WEBPACK_IMPORTED_MODULE_0__["Color"],
  Float32BufferAttribute: three__WEBPACK_IMPORTED_MODULE_0__["Float32BufferAttribute"],
  Group: three__WEBPACK_IMPORTED_MODULE_0__["Group"],
  Line: three__WEBPACK_IMPORTED_MODULE_0__["Line"],
  NoColors: three__WEBPACK_IMPORTED_MODULE_0__["NoColors"],
  ShaderMaterial: three__WEBPACK_IMPORTED_MODULE_0__["ShaderMaterial"],
  Vector3: three__WEBPACK_IMPORTED_MODULE_0__["Vector3"],
  VertexColors: three__WEBPACK_IMPORTED_MODULE_0__["VertexColors"]
};
// support both modes for backwards threejs compatibility

var setAttributeFn$1 = new THREE$7.BufferGeometry().setAttribute ? 'setAttribute' : 'addAttribute';
var gradientShaders$1 = {
  uniforms: {
    // dash param defaults, all relative to full length
    dashOffset: {
      value: 0
    },
    dashSize: {
      value: 1
    },
    gapSize: {
      value: 0
    },
    dashTranslate: {
      value: 0
    } // used for animating the dash

  },
  vertexShader: "\n    uniform float dashTranslate;\n\n    attribute vec4 vertexColor;\n    varying vec4 vColor;\n\n    attribute float vertexRelDistance;\n    varying float vRelDistance;\n\n    void main() {\n      // pass through colors and distances\n      vColor = vertexColor;\n      vRelDistance = vertexRelDistance + dashTranslate;\n      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n    }\n  ",
  fragmentShader: "\n    uniform float dashOffset;\n    uniform float dashSize;\n    uniform float gapSize;\n\n    varying vec4 vColor;\n    varying float vRelDistance;\n\n    void main() {\n      // ignore pixels in the gap\n      if (vRelDistance < dashOffset) discard;\n      if (mod(vRelDistance - dashOffset, dashSize + gapSize) > dashSize) discard;\n\n      // set px color: [r, g, b, a], interpolated between vertices\n      gl_FragColor = vColor;\n    }\n  "
};
var PathsLayerKapsule = Object(kapsule__WEBPACK_IMPORTED_MODULE_1__["default"])({
  props: {
    pathsData: {
      "default": []
    },
    pathPoints: {
      "default": function _default(pnts) {
        return pnts;
      }
    },
    pathPointLat: {
      "default": function _default(arr) {
        return arr[0];
      }
    },
    pathPointLng: {
      "default": function _default(arr) {
        return arr[1];
      }
    },
    pathPointAlt: {
      "default": 1e-3
    },
    pathResolution: {
      "default": 2
    },
    // in deg
    pathColor: {
      "default": function _default() {
        return '#ffffaa';
      }
    },
    pathStroke: {},
    // in deg
    pathDashLength: {
      "default": 1
    },
    // in units of line length
    pathDashGap: {
      "default": 0
    },
    pathDashInitialGap: {
      "default": 0
    },
    pathDashAnimateTime: {
      "default": 0
    },
    // ms
    pathTransitionDuration: {
      "default": 1000,
      triggerUpdate: false
    },
    // ms
    rendererSize: {} // necessary to set correct fatline proportions

  },
  init: function init(threeObj, state) {
    // Clear the scene
    emptyObject(threeObj); // Main three object to manipulate

    state.scene = threeObj; // Kick-off dash animations

    new frame_ticker__WEBPACK_IMPORTED_MODULE_9___default.a().onTick.add(function (_, timeDelta) {
      state.pathsData.filter(function (d) {
        return d.__threeObj && d.__threeObj.children.length && d.__threeObj.children[0].material && d.__threeObj.children[0].__dashAnimateStep;
      }).forEach(function (d) {
        var obj = d.__threeObj.children[0];
        var step = obj.__dashAnimateStep * timeDelta;
        var curTranslate = obj.material.uniforms.dashTranslate.value % 1e9; // reset after 1B loops

        obj.material.uniforms.dashTranslate.value = curTranslate + step;
      });
    });
  },
  update: function update(state) {
    // Data accessors
    var pointsAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.pathPoints);
    var pointLatAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.pathPointLat);
    var pointLngAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.pathPointLng);
    var pointAltAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.pathPointAlt);
    var strokeAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.pathStroke);
    var colorAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.pathColor);
    var dashLengthAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.pathDashLength);
    var dashGapAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.pathDashGap);
    var dashInitialGapAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.pathDashInitialGap);
    var dashAnimateTimeAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.pathDashAnimateTime);
    var sharedShaderMaterial = new THREE$7.ShaderMaterial(_objectSpread2(_objectSpread2({}, gradientShaders$1), {}, {
      transparent: true,
      blending: THREE$7.AdditiveBlending
    }));
    threeDigest(state.pathsData, state.scene, {
      createObj: function createObj() {
        var obj = new THREE$7.Group(); // populated in updateObj

        obj.__globeObjType = 'path'; // Add object type

        return obj;
      },
      updateObj: function updateObj(group, path) {
        var stroke = strokeAccessor(path);
        var useFatLine = stroke !== null && stroke !== undefined;

        if (!group.children.length || useFatLine === (group.children[0].type === 'Line')) {
          // create or swap object types
          emptyObject(group);

          var _obj = useFatLine ? new three_fatline__WEBPACK_IMPORTED_MODULE_14__["Line2"](new three_fatline__WEBPACK_IMPORTED_MODULE_14__["LineGeometry"](), new three_fatline__WEBPACK_IMPORTED_MODULE_14__["LineMaterial"]()) : new THREE$7.Line(new THREE$7.BufferGeometry(), sharedShaderMaterial.clone() // Separate material instance per object to have dedicated uniforms (but shared shaders)
          );

          group.add(_obj);
        }

        var obj = group.children[0];
        var points = calcPath(pointsAccessor(path), pointLatAccessor, pointLngAccessor, pointAltAccessor, state.pathResolution);

        if (!useFatLine) {
          // set dash animation step
          var dashAnimateTime = dashAnimateTimeAccessor(path);
          obj.__dashAnimateStep = dashAnimateTime > 0 ? 1000 / dashAnimateTime : 0; // per second
          // set dash uniforms

          Object.assign(obj.material.uniforms, {
            dashSize: {
              value: dashLengthAccessor(path)
            },
            gapSize: {
              value: dashGapAccessor(path)
            },
            dashOffset: {
              value: dashInitialGapAccessor(path)
            }
          }); // calculate vertex colors (to create gradient)

          var vertexColorArray = calcColorVertexArray(colorAccessor(path), // single or array of colors
          points.length // numSegments
          ); // calculate vertex relative distances (for dashed lines)

          var vertexRelDistanceArray = calcVertexRelDistances(points.length, // numSegments
          1, // num vertices per segment
          true // run from end to start, to animate in the correct direction
          );
          obj.geometry[setAttributeFn$1]('vertexColor', vertexColorArray);
          obj.geometry[setAttributeFn$1]('vertexRelDistance', vertexRelDistanceArray);
        } else {
          // fat lines
          obj.material.resolution = state.rendererSize;
          {
            // set dash styling
            obj.__dashAnimateStep = 0; // can't animate dashes on fat lines (no initial gap)

            var dashLength = dashLengthAccessor(path);
            var dashGap = dashGapAccessor(path);
            obj.material.dashed = dashGap > 0; // temp hack to activate line dashes

            obj.material.dashed ? obj.material.defines.USE_DASH = "" : delete obj.material.defines.USE_DASH;

            if (obj.material.dashed) {
              obj.material.dashScale = 1 / calcLineDistance(points); // dash sizes relative to full line length

              obj.material.dashSize = dashLength;
              obj.material.gapSize = dashGap;
            }
          }
          {
            // set line colors
            var colors = colorAccessor(path);

            if (colors instanceof Array) {
              // calculate vertex colors (to create gradient)
              var _vertexColorArray = calcColorVertexArray(colorAccessor(path), // single or array of colors
              points.length - 1, // numSegments
              1, // num vertices per segment
              false);

              obj.geometry.setColors(_vertexColorArray.array);
              obj.material.vertexColors = THREE$7.VertexColors;
            } else {
              // single color
              var color = colors;
              var opacity = colorAlpha(color);
              obj.material.color = new THREE$7.Color(colorStr2Hex(color));
              obj.material.transparent = opacity < 1;
              obj.material.opacity = opacity;
              obj.material.vertexColors = THREE$7.NoColors;
            }
          }
          obj.material.needsUpdate = true;
        } // animate from start to finish by default


        var pointsInterpolator = interpolateVectors(path.__currentTargetD && path.__currentTargetD.points || [points[0]], points);

        var applyUpdate = function applyUpdate(td) {
          var _path$__currentTarget = path.__currentTargetD = td,
              stroke = _path$__currentTarget.stroke,
              interpolK = _path$__currentTarget.interpolK;

          var kPoints = path.__currentTargetD.points = pointsInterpolator(interpolK);

          if (useFatLine) {
            var _ref;

            obj.geometry.setPositions((_ref = []).concat.apply(_ref, _toConsumableArray(kPoints.map(function (_ref2) {
              var x = _ref2.x,
                  y = _ref2.y,
                  z = _ref2.z;
              return [x, y, z];
            }))));
            obj.material.linewidth = stroke; // necessary for dashed lines

            obj.material.dashed && obj.computeLineDistances();
          } else {
            obj.geometry.setFromPoints(kPoints);
            obj.geometry.computeBoundingSphere();
          }
        };

        var targetD = {
          stroke: stroke,
          interpolK: 1
        };
        var currentTargetD = Object.assign({}, path.__currentTargetD || targetD, {
          interpolK: 0
        });

        if (Object.keys(targetD).some(function (k) {
          return currentTargetD[k] !== targetD[k];
        })) {
          if (!state.pathTransitionDuration || state.pathTransitionDuration < 0) {
            // set final position
            applyUpdate(targetD);
          } else {
            // animate
            new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].Tween(currentTargetD).to(targetD, state.pathTransitionDuration).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].Easing.Quadratic.InOut).onUpdate(applyUpdate).start();
          }
        }
      }
    }); //

    function calcLineDistance(pnts) {
      var totalDist = 0;
      var prevPnt;
      pnts.forEach(function (pnt) {
        prevPnt && (totalDist += prevPnt.distanceTo(pnt));
        prevPnt = pnt;
      });
      return totalDist;
    }

    function calcPath(points, latAccessor, lngAccessor, altAccessor, angularResolution) {
      var getInterpolatedVals = function getInterpolatedVals(start, end, numPnts) {
        var result = [];

        for (var i = 1; i <= numPnts; i++) {
          result.push(start + (end - start) * i / (numPnts + 1));
        }

        return result;
      };

      var interpolateLine = function interpolateLine() {
        var lineCoords = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var maxDegDistance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var result = [];
        var prevPnt = null;
        lineCoords.forEach(function (pnt) {
          if (prevPnt) {
            var dist = Math.sqrt(Math.pow(pnt[0] - prevPnt[0], 2) + Math.pow(pnt[1] - prevPnt[1], 2));

            if (dist > maxDegDistance) {
              var numAdditionalPnts = Math.floor(dist / maxDegDistance);
              var lats = getInterpolatedVals(prevPnt[0], pnt[0], numAdditionalPnts);
              var lngs = getInterpolatedVals(prevPnt[1], pnt[1], numAdditionalPnts);
              var alts = getInterpolatedVals(prevPnt[2], pnt[2], numAdditionalPnts);

              for (var i = 0, len = lats.length; i < len; i++) {
                result.push([lats[i], lngs[i], alts[i]]);
              }
            }
          }

          result.push(prevPnt = pnt);
        });
        return result;
      };

      var getVec = function getVec(_ref3) {
        var _ref4 = _slicedToArray(_ref3, 3),
            lat = _ref4[0],
            lng = _ref4[1],
            alt = _ref4[2];

        var _polar2Cartesian = polar2Cartesian(lat, lng, alt),
            x = _polar2Cartesian.x,
            y = _polar2Cartesian.y,
            z = _polar2Cartesian.z;

        return new THREE$7.Vector3(x, y, z);
      };

      return interpolateLine(points.map(function (pnt) {
        return [latAccessor(pnt), lngAccessor(pnt), altAccessor(pnt)];
      }), angularResolution).map(getVec);
    }

    function calcColorVertexArray(colors, numSegments) {
      var numVerticesPerSegment = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var includeAlpha = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var numVerticesGroup = numSegments + 1; // one between every two segments and two at the ends

      var getVertexColor;

      if (colors instanceof Array) {
        // array of colors, interpolate at each step
        var colorScale = Object(d3_scale__WEBPACK_IMPORTED_MODULE_10__["scaleLinear"])().domain(colors.map(function (_, idx) {
          return idx / (colors.length - 1);
        })) // same number of stops as colors
        .range(colors);

        getVertexColor = function getVertexColor(t) {
          return color2ShaderArr(colorScale(t), includeAlpha);
        };
      } else {
        // single color, use constant
        var vertexColor = color2ShaderArr(colors, includeAlpha);

        getVertexColor = function getVertexColor() {
          return vertexColor;
        };
      }

      var numArgs = includeAlpha ? 4 : 3;
      var vertexColorArray = new THREE$7.Float32BufferAttribute(numVerticesGroup * numArgs * numVerticesPerSegment, numArgs);

      for (var v = 0, l = numVerticesGroup; v < l; v++) {
        var _vertexColor = getVertexColor(v / (l - 1));

        for (var s = 0; s < numVerticesPerSegment; s++) {
          vertexColorArray.set(_vertexColor, (v * numVerticesPerSegment + s) * numArgs);
        }
      }

      return vertexColorArray;
    }

    function calcVertexRelDistances(numSegments) {
      var numVerticesPerSegment = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var invert = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var numVerticesGroup = numSegments + 1; // one between every two segments and two at the ends

      var arrLen = numVerticesGroup * numVerticesPerSegment;
      var vertexDistanceArray = new THREE$7.Float32BufferAttribute(arrLen, 1);

      for (var v = 0, l = numVerticesGroup; v < l; v++) {
        var relDistance = v / (l - 1);

        for (var s = 0; s < numVerticesPerSegment; s++) {
          var idx = v * numVerticesPerSegment + s;
          var pos = invert ? arrLen - 1 - idx : idx;
          vertexDistanceArray.setX(pos, relDistance);
        }
      }

      return vertexDistanceArray;
    }
  }
});

var glyphs={"0":{x_min:73,x_max:715,ha:792,o:"m 394 -29 q 153 129 242 -29 q 73 479 73 272 q 152 829 73 687 q 394 989 241 989 q 634 829 545 989 q 715 479 715 684 q 635 129 715 270 q 394 -29 546 -29 m 394 89 q 546 211 489 89 q 598 479 598 322 q 548 748 598 640 q 394 871 491 871 q 241 748 298 871 q 190 479 190 637 q 239 211 190 319 q 394 89 296 89 "},"1":{x_min:215.671875,x_max:574,ha:792,o:"m 574 0 l 442 0 l 442 697 l 215 697 l 215 796 q 386 833 330 796 q 475 986 447 875 l 574 986 l 574 0 "},"2":{x_min:59,x_max:731,ha:792,o:"m 731 0 l 59 0 q 197 314 59 188 q 457 487 199 315 q 598 691 598 580 q 543 819 598 772 q 411 867 488 867 q 272 811 328 867 q 209 630 209 747 l 81 630 q 182 901 81 805 q 408 986 271 986 q 629 909 536 986 q 731 694 731 826 q 613 449 731 541 q 378 316 495 383 q 201 122 235 234 l 731 122 l 731 0 "},"3":{x_min:54,x_max:737,ha:792,o:"m 737 284 q 635 55 737 141 q 399 -25 541 -25 q 156 52 248 -25 q 54 308 54 140 l 185 308 q 245 147 185 202 q 395 96 302 96 q 539 140 484 96 q 602 280 602 190 q 510 429 602 390 q 324 454 451 454 l 324 565 q 487 584 441 565 q 565 719 565 617 q 515 835 565 791 q 395 879 466 879 q 255 824 307 879 q 203 661 203 769 l 78 661 q 166 909 78 822 q 387 992 250 992 q 603 921 513 992 q 701 723 701 844 q 669 607 701 656 q 578 524 637 558 q 696 434 655 499 q 737 284 737 369 "},"4":{x_min:48,x_max:742.453125,ha:792,o:"m 742 243 l 602 243 l 602 0 l 476 0 l 476 243 l 48 243 l 48 368 l 476 958 l 602 958 l 602 354 l 742 354 l 742 243 m 476 354 l 476 792 l 162 354 l 476 354 "},"5":{x_min:54.171875,x_max:738,ha:792,o:"m 738 314 q 626 60 738 153 q 382 -23 526 -23 q 155 47 248 -23 q 54 256 54 125 l 183 256 q 259 132 204 174 q 382 91 314 91 q 533 149 471 91 q 602 314 602 213 q 538 469 602 411 q 386 528 475 528 q 284 506 332 528 q 197 439 237 484 l 81 439 l 159 958 l 684 958 l 684 840 l 254 840 l 214 579 q 306 627 258 612 q 407 643 354 643 q 636 552 540 643 q 738 314 738 457 "},"6":{x_min:53,x_max:739,ha:792,o:"m 739 312 q 633 62 739 162 q 400 -31 534 -31 q 162 78 257 -31 q 53 439 53 206 q 178 859 53 712 q 441 986 284 986 q 643 912 559 986 q 732 713 732 833 l 601 713 q 544 830 594 786 q 426 875 494 875 q 268 793 331 875 q 193 517 193 697 q 301 597 240 570 q 427 624 362 624 q 643 540 552 624 q 739 312 739 451 m 603 298 q 540 461 603 400 q 404 516 484 516 q 268 461 323 516 q 207 300 207 401 q 269 137 207 198 q 405 83 325 83 q 541 137 486 83 q 603 298 603 197 "},"7":{x_min:58.71875,x_max:730.953125,ha:792,o:"m 730 839 q 469 448 560 641 q 335 0 378 255 l 192 0 q 328 441 235 252 q 593 830 421 630 l 58 830 l 58 958 l 730 958 l 730 839 "},"8":{x_min:55,x_max:736,ha:792,o:"m 571 527 q 694 424 652 491 q 736 280 736 358 q 648 71 736 158 q 395 -26 551 -26 q 142 69 238 -26 q 55 279 55 157 q 96 425 55 359 q 220 527 138 491 q 120 615 153 562 q 88 726 88 668 q 171 904 88 827 q 395 986 261 986 q 618 905 529 986 q 702 727 702 830 q 670 616 702 667 q 571 527 638 565 m 394 565 q 519 610 475 565 q 563 717 563 655 q 521 823 563 781 q 392 872 474 872 q 265 824 312 872 q 224 720 224 783 q 265 613 224 656 q 394 565 312 565 m 395 91 q 545 150 488 91 q 597 280 597 204 q 546 408 597 355 q 395 465 492 465 q 244 408 299 465 q 194 280 194 356 q 244 150 194 203 q 395 91 299 91 "},"9":{x_min:53,x_max:739,ha:792,o:"m 739 524 q 619 94 739 241 q 362 -32 516 -32 q 150 47 242 -32 q 59 244 59 126 l 191 244 q 246 129 191 176 q 373 82 301 82 q 526 161 466 82 q 597 440 597 255 q 363 334 501 334 q 130 432 216 334 q 53 650 53 521 q 134 880 53 786 q 383 986 226 986 q 659 841 566 986 q 739 524 739 719 m 388 449 q 535 514 480 449 q 585 658 585 573 q 535 805 585 744 q 388 873 480 873 q 242 809 294 873 q 191 658 191 745 q 239 514 191 572 q 388 449 292 449 "},"ο":{x_min:0,x_max:712,ha:815,o:"m 356 -25 q 96 88 192 -25 q 0 368 0 201 q 92 642 0 533 q 356 761 192 761 q 617 644 517 761 q 712 368 712 533 q 619 91 712 201 q 356 -25 520 -25 m 356 85 q 527 175 465 85 q 583 369 583 255 q 528 562 583 484 q 356 651 466 651 q 189 560 250 651 q 135 369 135 481 q 187 177 135 257 q 356 85 250 85 "},S:{x_min:0,x_max:788,ha:890,o:"m 788 291 q 662 54 788 144 q 397 -26 550 -26 q 116 68 226 -26 q 0 337 0 168 l 131 337 q 200 152 131 220 q 384 85 269 85 q 557 129 479 85 q 650 270 650 183 q 490 429 650 379 q 194 513 341 470 q 33 739 33 584 q 142 964 33 881 q 388 1041 242 1041 q 644 957 543 1041 q 756 716 756 867 l 625 716 q 561 874 625 816 q 395 933 497 933 q 243 891 309 933 q 164 759 164 841 q 325 609 164 656 q 625 526 475 568 q 788 291 788 454 "},"¦":{x_min:343,x_max:449,ha:792,o:"m 449 462 l 343 462 l 343 986 l 449 986 l 449 462 m 449 -242 l 343 -242 l 343 280 l 449 280 l 449 -242 "},"/":{x_min:183.25,x_max:608.328125,ha:792,o:"m 608 1041 l 266 -129 l 183 -129 l 520 1041 l 608 1041 "},"Τ":{x_min:-0.4375,x_max:777.453125,ha:839,o:"m 777 893 l 458 893 l 458 0 l 319 0 l 319 892 l 0 892 l 0 1013 l 777 1013 l 777 893 "},y:{x_min:0,x_max:684.78125,ha:771,o:"m 684 738 l 388 -83 q 311 -216 356 -167 q 173 -279 252 -279 q 97 -266 133 -279 l 97 -149 q 132 -155 109 -151 q 168 -160 155 -160 q 240 -114 213 -160 q 274 -26 248 -98 l 0 738 l 137 737 l 341 139 l 548 737 l 684 738 "},"Π":{x_min:0,x_max:803,ha:917,o:"m 803 0 l 667 0 l 667 886 l 140 886 l 140 0 l 0 0 l 0 1012 l 803 1012 l 803 0 "},"ΐ":{x_min:-111,x_max:339,ha:361,o:"m 339 800 l 229 800 l 229 925 l 339 925 l 339 800 m -1 800 l -111 800 l -111 925 l -1 925 l -1 800 m 284 3 q 233 -10 258 -5 q 182 -15 207 -15 q 85 26 119 -15 q 42 200 42 79 l 42 737 l 167 737 l 168 215 q 172 141 168 157 q 226 101 183 101 q 248 103 239 101 q 284 112 257 104 l 284 3 m 302 1040 l 113 819 l 30 819 l 165 1040 l 302 1040 "},g:{x_min:0,x_max:686,ha:838,o:"m 686 34 q 586 -213 686 -121 q 331 -306 487 -306 q 131 -252 216 -306 q 31 -84 31 -190 l 155 -84 q 228 -174 166 -138 q 345 -207 284 -207 q 514 -109 454 -207 q 564 89 564 -27 q 461 6 521 36 q 335 -23 401 -23 q 88 100 184 -23 q 0 370 0 215 q 87 634 0 522 q 330 758 183 758 q 457 728 398 758 q 564 644 515 699 l 564 737 l 686 737 l 686 34 m 582 367 q 529 560 582 481 q 358 652 468 652 q 189 561 250 652 q 135 369 135 482 q 189 176 135 255 q 361 85 251 85 q 529 176 468 85 q 582 367 582 255 "},"²":{x_min:0,x_max:442,ha:539,o:"m 442 383 l 0 383 q 91 566 0 492 q 260 668 176 617 q 354 798 354 727 q 315 875 354 845 q 227 905 277 905 q 136 869 173 905 q 99 761 99 833 l 14 761 q 82 922 14 864 q 232 974 141 974 q 379 926 316 974 q 442 797 442 878 q 351 635 442 704 q 183 539 321 611 q 92 455 92 491 l 442 455 l 442 383 "},"–":{x_min:0,x_max:705.5625,ha:803,o:"m 705 334 l 0 334 l 0 410 l 705 410 l 705 334 "},"Κ":{x_min:0,x_max:819.5625,ha:893,o:"m 819 0 l 650 0 l 294 509 l 139 356 l 139 0 l 0 0 l 0 1013 l 139 1013 l 139 526 l 626 1013 l 809 1013 l 395 600 l 819 0 "},"ƒ":{x_min:-46.265625,x_max:392,ha:513,o:"m 392 651 l 259 651 l 79 -279 l -46 -278 l 134 651 l 14 651 l 14 751 l 135 751 q 151 948 135 900 q 304 1041 185 1041 q 334 1040 319 1041 q 392 1034 348 1039 l 392 922 q 337 931 360 931 q 271 883 287 931 q 260 793 260 853 l 260 751 l 392 751 l 392 651 "},e:{x_min:0,x_max:714,ha:813,o:"m 714 326 l 140 326 q 200 157 140 227 q 359 87 260 87 q 488 130 431 87 q 561 245 545 174 l 697 245 q 577 48 670 123 q 358 -26 484 -26 q 97 85 195 -26 q 0 363 0 197 q 94 642 0 529 q 358 765 195 765 q 626 627 529 765 q 714 326 714 503 m 576 429 q 507 583 564 522 q 355 650 445 650 q 206 583 266 650 q 140 429 152 522 l 576 429 "},"ό":{x_min:0,x_max:712,ha:815,o:"m 356 -25 q 94 91 194 -25 q 0 368 0 202 q 92 642 0 533 q 356 761 192 761 q 617 644 517 761 q 712 368 712 533 q 619 91 712 201 q 356 -25 520 -25 m 356 85 q 527 175 465 85 q 583 369 583 255 q 528 562 583 484 q 356 651 466 651 q 189 560 250 651 q 135 369 135 481 q 187 177 135 257 q 356 85 250 85 m 576 1040 l 387 819 l 303 819 l 438 1040 l 576 1040 "},J:{x_min:0,x_max:588,ha:699,o:"m 588 279 q 287 -26 588 -26 q 58 73 126 -26 q 0 327 0 158 l 133 327 q 160 172 133 227 q 288 96 198 96 q 426 171 391 96 q 449 336 449 219 l 449 1013 l 588 1013 l 588 279 "},"»":{x_min:-1,x_max:503,ha:601,o:"m 503 302 l 280 136 l 281 256 l 429 373 l 281 486 l 280 608 l 503 440 l 503 302 m 221 302 l 0 136 l 0 255 l 145 372 l 0 486 l -1 608 l 221 440 l 221 302 "},"©":{x_min:-3,x_max:1008,ha:1106,o:"m 502 -7 q 123 151 263 -7 q -3 501 -3 294 q 123 851 -3 706 q 502 1011 263 1011 q 881 851 739 1011 q 1008 501 1008 708 q 883 151 1008 292 q 502 -7 744 -7 m 502 60 q 830 197 709 60 q 940 501 940 322 q 831 805 940 681 q 502 944 709 944 q 174 805 296 944 q 65 501 65 680 q 173 197 65 320 q 502 60 294 60 m 741 394 q 661 246 731 302 q 496 190 591 190 q 294 285 369 190 q 228 497 228 370 q 295 714 228 625 q 499 813 370 813 q 656 762 588 813 q 733 625 724 711 l 634 625 q 589 704 629 673 q 498 735 550 735 q 377 666 421 735 q 334 504 334 597 q 374 340 334 408 q 490 272 415 272 q 589 304 549 272 q 638 394 628 337 l 741 394 "},"ώ":{x_min:0,x_max:922,ha:1030,o:"m 687 1040 l 498 819 l 415 819 l 549 1040 l 687 1040 m 922 339 q 856 97 922 203 q 650 -26 780 -26 q 538 9 587 -26 q 461 103 489 44 q 387 12 436 46 q 277 -22 339 -22 q 69 97 147 -22 q 0 338 0 202 q 45 551 0 444 q 161 737 84 643 l 302 737 q 175 552 219 647 q 124 336 124 446 q 155 179 124 248 q 275 88 197 88 q 375 163 341 88 q 400 294 400 219 l 400 572 l 524 572 l 524 294 q 561 135 524 192 q 643 88 591 88 q 762 182 719 88 q 797 341 797 257 q 745 555 797 450 q 619 737 705 637 l 760 737 q 874 551 835 640 q 922 339 922 444 "},"^":{x_min:193.0625,x_max:598.609375,ha:792,o:"m 598 772 l 515 772 l 395 931 l 277 772 l 193 772 l 326 1013 l 462 1013 l 598 772 "},"«":{x_min:0,x_max:507.203125,ha:604,o:"m 506 136 l 284 302 l 284 440 l 506 608 l 507 485 l 360 371 l 506 255 l 506 136 m 222 136 l 0 302 l 0 440 l 222 608 l 221 486 l 73 373 l 222 256 l 222 136 "},D:{x_min:0,x_max:828,ha:935,o:"m 389 1013 q 714 867 593 1013 q 828 521 828 729 q 712 161 828 309 q 382 0 587 0 l 0 0 l 0 1013 l 389 1013 m 376 124 q 607 247 523 124 q 681 510 681 355 q 607 771 681 662 q 376 896 522 896 l 139 896 l 139 124 l 376 124 "},"∙":{x_min:0,x_max:142,ha:239,o:"m 142 585 l 0 585 l 0 738 l 142 738 l 142 585 "},"ÿ":{x_min:0,x_max:47,ha:125,o:"m 47 3 q 37 -7 47 -7 q 28 0 30 -7 q 39 -4 32 -4 q 45 3 45 -1 l 37 0 q 28 9 28 0 q 39 19 28 19 l 47 16 l 47 19 l 47 3 m 37 1 q 44 8 44 1 q 37 16 44 16 q 30 8 30 16 q 37 1 30 1 m 26 1 l 23 22 l 14 0 l 3 22 l 3 3 l 0 25 l 13 1 l 22 25 l 26 1 "},w:{x_min:0,x_max:1009.71875,ha:1100,o:"m 1009 738 l 783 0 l 658 0 l 501 567 l 345 0 l 222 0 l 0 738 l 130 738 l 284 174 l 432 737 l 576 738 l 721 173 l 881 737 l 1009 738 "},$:{x_min:0,x_max:700,ha:793,o:"m 664 717 l 542 717 q 490 825 531 785 q 381 872 450 865 l 381 551 q 620 446 540 522 q 700 241 700 370 q 618 45 700 116 q 381 -25 536 -25 l 381 -152 l 307 -152 l 307 -25 q 81 62 162 -25 q 0 297 0 149 l 124 297 q 169 146 124 204 q 307 81 215 89 l 307 441 q 80 536 148 469 q 13 725 13 603 q 96 910 13 839 q 307 982 180 982 l 307 1077 l 381 1077 l 381 982 q 574 917 494 982 q 664 717 664 845 m 307 565 l 307 872 q 187 831 233 872 q 142 724 142 791 q 180 618 142 656 q 307 565 218 580 m 381 76 q 562 237 562 96 q 517 361 562 313 q 381 423 472 409 l 381 76 "},"\\":{x_min:-0.015625,x_max:425.0625,ha:522,o:"m 425 -129 l 337 -129 l 0 1041 l 83 1041 l 425 -129 "},"µ":{x_min:0,x_max:697.21875,ha:747,o:"m 697 -4 q 629 -14 658 -14 q 498 97 513 -14 q 422 9 470 41 q 313 -23 374 -23 q 207 4 258 -23 q 119 81 156 32 l 119 -278 l 0 -278 l 0 738 l 124 738 l 124 343 q 165 173 124 246 q 308 83 216 83 q 452 178 402 83 q 493 359 493 255 l 493 738 l 617 738 l 617 214 q 623 136 617 160 q 673 92 637 92 q 697 96 684 92 l 697 -4 "},"Ι":{x_min:42,x_max:181,ha:297,o:"m 181 0 l 42 0 l 42 1013 l 181 1013 l 181 0 "},"Ύ":{x_min:0,x_max:1144.5,ha:1214,o:"m 1144 1012 l 807 416 l 807 0 l 667 0 l 667 416 l 325 1012 l 465 1012 l 736 533 l 1004 1012 l 1144 1012 m 277 1040 l 83 799 l 0 799 l 140 1040 l 277 1040 "},"’":{x_min:0,x_max:139,ha:236,o:"m 139 851 q 102 737 139 784 q 0 669 65 690 l 0 734 q 59 787 42 741 q 72 873 72 821 l 0 873 l 0 1013 l 139 1013 l 139 851 "},"Ν":{x_min:0,x_max:801,ha:915,o:"m 801 0 l 651 0 l 131 822 l 131 0 l 0 0 l 0 1013 l 151 1013 l 670 191 l 670 1013 l 801 1013 l 801 0 "},"-":{x_min:8.71875,x_max:350.390625,ha:478,o:"m 350 317 l 8 317 l 8 428 l 350 428 l 350 317 "},Q:{x_min:0,x_max:968,ha:1072,o:"m 954 5 l 887 -79 l 744 35 q 622 -11 687 2 q 483 -26 556 -26 q 127 130 262 -26 q 0 504 0 279 q 127 880 0 728 q 484 1041 262 1041 q 841 884 708 1041 q 968 507 968 735 q 933 293 968 398 q 832 104 899 188 l 954 5 m 723 191 q 802 330 777 248 q 828 499 828 412 q 744 790 828 673 q 483 922 650 922 q 228 791 322 922 q 142 505 142 673 q 227 221 142 337 q 487 91 323 91 q 632 123 566 91 l 520 215 l 587 301 l 723 191 "},"ς":{x_min:1,x_max:676.28125,ha:740,o:"m 676 460 l 551 460 q 498 595 542 546 q 365 651 448 651 q 199 578 263 651 q 136 401 136 505 q 266 178 136 241 q 508 106 387 142 q 640 -50 640 62 q 625 -158 640 -105 q 583 -278 611 -211 l 465 -278 q 498 -182 490 -211 q 515 -80 515 -126 q 381 12 515 -15 q 134 91 197 51 q 1 388 1 179 q 100 651 1 542 q 354 761 199 761 q 587 680 498 761 q 676 460 676 599 "},M:{x_min:0,x_max:954,ha:1067,o:"m 954 0 l 819 0 l 819 869 l 537 0 l 405 0 l 128 866 l 128 0 l 0 0 l 0 1013 l 200 1013 l 472 160 l 757 1013 l 954 1013 l 954 0 "},"Ψ":{x_min:0,x_max:1006,ha:1094,o:"m 1006 678 q 914 319 1006 429 q 571 200 814 200 l 571 0 l 433 0 l 433 200 q 92 319 194 200 q 0 678 0 429 l 0 1013 l 139 1013 l 139 679 q 191 417 139 492 q 433 326 255 326 l 433 1013 l 571 1013 l 571 326 l 580 326 q 813 423 747 326 q 868 679 868 502 l 868 1013 l 1006 1013 l 1006 678 "},C:{x_min:0,x_max:886,ha:944,o:"m 886 379 q 760 87 886 201 q 455 -26 634 -26 q 112 136 236 -26 q 0 509 0 283 q 118 882 0 737 q 469 1041 245 1041 q 748 955 630 1041 q 879 708 879 859 l 745 708 q 649 862 724 805 q 473 920 573 920 q 219 791 312 920 q 136 509 136 675 q 217 229 136 344 q 470 99 311 99 q 672 179 591 99 q 753 379 753 259 l 886 379 "},"!":{x_min:0,x_max:138,ha:236,o:"m 138 684 q 116 409 138 629 q 105 244 105 299 l 33 244 q 16 465 33 313 q 0 684 0 616 l 0 1013 l 138 1013 l 138 684 m 138 0 l 0 0 l 0 151 l 138 151 l 138 0 "},"{":{x_min:0,x_max:480.5625,ha:578,o:"m 480 -286 q 237 -213 303 -286 q 187 -45 187 -159 q 194 48 187 -15 q 201 141 201 112 q 164 264 201 225 q 0 314 118 314 l 0 417 q 164 471 119 417 q 201 605 201 514 q 199 665 201 644 q 193 772 193 769 q 241 941 193 887 q 480 1015 308 1015 l 480 915 q 336 866 375 915 q 306 742 306 828 q 310 662 306 717 q 314 577 314 606 q 288 452 314 500 q 176 365 256 391 q 289 275 257 337 q 314 143 314 226 q 313 84 314 107 q 310 -11 310 -5 q 339 -131 310 -94 q 480 -182 377 -182 l 480 -286 "},X:{x_min:-0.015625,x_max:854.15625,ha:940,o:"m 854 0 l 683 0 l 423 409 l 166 0 l 0 0 l 347 519 l 18 1013 l 186 1013 l 428 637 l 675 1013 l 836 1013 l 504 520 l 854 0 "},"#":{x_min:0,x_max:963.890625,ha:1061,o:"m 963 690 l 927 590 l 719 590 l 655 410 l 876 410 l 840 310 l 618 310 l 508 -3 l 393 -2 l 506 309 l 329 310 l 215 -2 l 102 -3 l 212 310 l 0 310 l 36 410 l 248 409 l 312 590 l 86 590 l 120 690 l 347 690 l 459 1006 l 573 1006 l 462 690 l 640 690 l 751 1006 l 865 1006 l 754 690 l 963 690 m 606 590 l 425 590 l 362 410 l 543 410 l 606 590 "},"ι":{x_min:42,x_max:284,ha:361,o:"m 284 3 q 233 -10 258 -5 q 182 -15 207 -15 q 85 26 119 -15 q 42 200 42 79 l 42 738 l 167 738 l 168 215 q 172 141 168 157 q 226 101 183 101 q 248 103 239 101 q 284 112 257 104 l 284 3 "},"Ά":{x_min:0,x_max:906.953125,ha:982,o:"m 283 1040 l 88 799 l 5 799 l 145 1040 l 283 1040 m 906 0 l 756 0 l 650 303 l 251 303 l 143 0 l 0 0 l 376 1012 l 529 1012 l 906 0 m 609 421 l 452 866 l 293 421 l 609 421 "},")":{x_min:0,x_max:318,ha:415,o:"m 318 365 q 257 25 318 191 q 87 -290 197 -141 l 0 -290 q 140 21 93 -128 q 193 360 193 189 q 141 704 193 537 q 0 1024 97 850 l 87 1024 q 257 706 197 871 q 318 365 318 542 "},"ε":{x_min:0,x_max:634.71875,ha:714,o:"m 634 234 q 527 38 634 110 q 300 -25 433 -25 q 98 29 183 -25 q 0 204 0 93 q 37 314 0 265 q 128 390 67 353 q 56 460 82 419 q 26 555 26 505 q 114 712 26 654 q 295 763 191 763 q 499 700 416 763 q 589 515 589 631 l 478 515 q 419 618 464 580 q 307 657 374 657 q 207 630 253 657 q 151 547 151 598 q 238 445 151 469 q 389 434 280 434 l 389 331 l 349 331 q 206 315 255 331 q 125 210 125 287 q 183 107 125 145 q 302 76 233 76 q 436 117 379 76 q 509 234 493 159 l 634 234 "},"Δ":{x_min:0,x_max:952.78125,ha:1028,o:"m 952 0 l 0 0 l 400 1013 l 551 1013 l 952 0 m 762 124 l 476 867 l 187 124 l 762 124 "},"}":{x_min:0,x_max:481,ha:578,o:"m 481 314 q 318 262 364 314 q 282 136 282 222 q 284 65 282 97 q 293 -58 293 -48 q 241 -217 293 -166 q 0 -286 174 -286 l 0 -182 q 143 -130 105 -182 q 171 -2 171 -93 q 168 81 171 22 q 165 144 165 140 q 188 275 165 229 q 306 365 220 339 q 191 455 224 391 q 165 588 165 505 q 168 681 165 624 q 171 742 171 737 q 141 865 171 827 q 0 915 102 915 l 0 1015 q 243 942 176 1015 q 293 773 293 888 q 287 675 293 741 q 282 590 282 608 q 318 466 282 505 q 481 417 364 417 l 481 314 "},"‰":{x_min:-3,x_max:1672,ha:1821,o:"m 846 0 q 664 76 732 0 q 603 244 603 145 q 662 412 603 344 q 846 489 729 489 q 1027 412 959 489 q 1089 244 1089 343 q 1029 76 1089 144 q 846 0 962 0 m 845 103 q 945 143 910 103 q 981 243 981 184 q 947 340 981 301 q 845 385 910 385 q 745 342 782 385 q 709 243 709 300 q 742 147 709 186 q 845 103 781 103 m 888 986 l 284 -25 l 199 -25 l 803 986 l 888 986 m 241 468 q 58 545 126 468 q -3 715 -3 615 q 56 881 -3 813 q 238 958 124 958 q 421 881 353 958 q 483 712 483 813 q 423 544 483 612 q 241 468 356 468 m 241 855 q 137 811 175 855 q 100 710 100 768 q 136 612 100 653 q 240 572 172 572 q 344 614 306 572 q 382 713 382 656 q 347 810 382 771 q 241 855 308 855 m 1428 0 q 1246 76 1314 0 q 1185 244 1185 145 q 1244 412 1185 344 q 1428 489 1311 489 q 1610 412 1542 489 q 1672 244 1672 343 q 1612 76 1672 144 q 1428 0 1545 0 m 1427 103 q 1528 143 1492 103 q 1564 243 1564 184 q 1530 340 1564 301 q 1427 385 1492 385 q 1327 342 1364 385 q 1291 243 1291 300 q 1324 147 1291 186 q 1427 103 1363 103 "},a:{x_min:0,x_max:698.609375,ha:794,o:"m 698 0 q 661 -12 679 -7 q 615 -17 643 -17 q 536 12 564 -17 q 500 96 508 41 q 384 6 456 37 q 236 -25 312 -25 q 65 31 130 -25 q 0 194 0 88 q 118 390 0 334 q 328 435 180 420 q 488 483 476 451 q 495 523 495 504 q 442 619 495 584 q 325 654 389 654 q 209 617 257 654 q 152 513 161 580 l 33 513 q 123 705 33 633 q 332 772 207 772 q 528 712 448 772 q 617 531 617 645 l 617 163 q 624 108 617 126 q 664 90 632 90 l 698 94 l 698 0 m 491 262 l 491 372 q 272 329 350 347 q 128 201 128 294 q 166 113 128 144 q 264 83 205 83 q 414 130 346 83 q 491 262 491 183 "},"—":{x_min:0,x_max:941.671875,ha:1039,o:"m 941 334 l 0 334 l 0 410 l 941 410 l 941 334 "},"=":{x_min:8.71875,x_max:780.953125,ha:792,o:"m 780 510 l 8 510 l 8 606 l 780 606 l 780 510 m 780 235 l 8 235 l 8 332 l 780 332 l 780 235 "},N:{x_min:0,x_max:801,ha:914,o:"m 801 0 l 651 0 l 131 823 l 131 0 l 0 0 l 0 1013 l 151 1013 l 670 193 l 670 1013 l 801 1013 l 801 0 "},"ρ":{x_min:0,x_max:712,ha:797,o:"m 712 369 q 620 94 712 207 q 362 -26 521 -26 q 230 2 292 -26 q 119 83 167 30 l 119 -278 l 0 -278 l 0 362 q 91 643 0 531 q 355 764 190 764 q 617 647 517 764 q 712 369 712 536 m 583 366 q 530 559 583 480 q 359 651 469 651 q 190 562 252 651 q 135 370 135 483 q 189 176 135 257 q 359 85 250 85 q 528 175 466 85 q 583 366 583 254 "},"¯":{x_min:0,x_max:941.671875,ha:938,o:"m 941 1033 l 0 1033 l 0 1109 l 941 1109 l 941 1033 "},Z:{x_min:0,x_max:779,ha:849,o:"m 779 0 l 0 0 l 0 113 l 621 896 l 40 896 l 40 1013 l 779 1013 l 778 887 l 171 124 l 779 124 l 779 0 "},u:{x_min:0,x_max:617,ha:729,o:"m 617 0 l 499 0 l 499 110 q 391 10 460 45 q 246 -25 322 -25 q 61 58 127 -25 q 0 258 0 136 l 0 738 l 125 738 l 125 284 q 156 148 125 202 q 273 82 197 82 q 433 165 369 82 q 493 340 493 243 l 493 738 l 617 738 l 617 0 "},k:{x_min:0,x_max:612.484375,ha:697,o:"m 612 738 l 338 465 l 608 0 l 469 0 l 251 382 l 121 251 l 121 0 l 0 0 l 0 1013 l 121 1013 l 121 402 l 456 738 l 612 738 "},"Η":{x_min:0,x_max:803,ha:917,o:"m 803 0 l 667 0 l 667 475 l 140 475 l 140 0 l 0 0 l 0 1013 l 140 1013 l 140 599 l 667 599 l 667 1013 l 803 1013 l 803 0 "},"Α":{x_min:0,x_max:906.953125,ha:985,o:"m 906 0 l 756 0 l 650 303 l 251 303 l 143 0 l 0 0 l 376 1013 l 529 1013 l 906 0 m 609 421 l 452 866 l 293 421 l 609 421 "},s:{x_min:0,x_max:604,ha:697,o:"m 604 217 q 501 36 604 104 q 292 -23 411 -23 q 86 43 166 -23 q 0 238 0 114 l 121 237 q 175 122 121 164 q 300 85 223 85 q 415 112 363 85 q 479 207 479 147 q 361 309 479 276 q 140 372 141 370 q 21 544 21 426 q 111 708 21 647 q 298 761 190 761 q 492 705 413 761 q 583 531 583 643 l 462 531 q 412 625 462 594 q 298 657 363 657 q 199 636 242 657 q 143 558 143 608 q 262 454 143 486 q 484 394 479 397 q 604 217 604 341 "},B:{x_min:0,x_max:778,ha:876,o:"m 580 546 q 724 469 670 535 q 778 311 778 403 q 673 83 778 171 q 432 0 575 0 l 0 0 l 0 1013 l 411 1013 q 629 957 541 1013 q 732 768 732 892 q 691 633 732 693 q 580 546 650 572 m 393 899 l 139 899 l 139 588 l 379 588 q 521 624 462 588 q 592 744 592 667 q 531 859 592 819 q 393 899 471 899 m 419 124 q 566 169 504 124 q 635 303 635 219 q 559 436 635 389 q 402 477 494 477 l 139 477 l 139 124 l 419 124 "},"…":{x_min:0,x_max:614,ha:708,o:"m 142 0 l 0 0 l 0 151 l 142 151 l 142 0 m 378 0 l 236 0 l 236 151 l 378 151 l 378 0 m 614 0 l 472 0 l 472 151 l 614 151 l 614 0 "},"?":{x_min:0,x_max:607,ha:704,o:"m 607 777 q 543 599 607 674 q 422 474 482 537 q 357 272 357 391 l 236 272 q 297 487 236 395 q 411 619 298 490 q 474 762 474 691 q 422 885 474 838 q 301 933 371 933 q 179 880 228 933 q 124 706 124 819 l 0 706 q 94 963 0 872 q 302 1044 177 1044 q 511 973 423 1044 q 607 777 607 895 m 370 0 l 230 0 l 230 151 l 370 151 l 370 0 "},H:{x_min:0,x_max:803,ha:915,o:"m 803 0 l 667 0 l 667 475 l 140 475 l 140 0 l 0 0 l 0 1013 l 140 1013 l 140 599 l 667 599 l 667 1013 l 803 1013 l 803 0 "},"ν":{x_min:0,x_max:675,ha:761,o:"m 675 738 l 404 0 l 272 0 l 0 738 l 133 738 l 340 147 l 541 738 l 675 738 "},c:{x_min:1,x_max:701.390625,ha:775,o:"m 701 264 q 584 53 681 133 q 353 -26 487 -26 q 91 91 188 -26 q 1 370 1 201 q 92 645 1 537 q 353 761 190 761 q 572 688 479 761 q 690 493 666 615 l 556 493 q 487 606 545 562 q 356 650 428 650 q 186 563 246 650 q 134 372 134 487 q 188 179 134 258 q 359 88 250 88 q 492 136 437 88 q 566 264 548 185 l 701 264 "},"¶":{x_min:0,x_max:566.671875,ha:678,o:"m 21 892 l 52 892 l 98 761 l 145 892 l 176 892 l 178 741 l 157 741 l 157 867 l 108 741 l 88 741 l 40 871 l 40 741 l 21 741 l 21 892 m 308 854 l 308 731 q 252 691 308 691 q 227 691 240 691 q 207 696 213 695 l 207 712 l 253 706 q 288 733 288 706 l 288 763 q 244 741 279 741 q 193 797 193 741 q 261 860 193 860 q 287 860 273 860 q 308 854 302 855 m 288 842 l 263 843 q 213 796 213 843 q 248 756 213 756 q 288 796 288 756 l 288 842 m 566 988 l 502 988 l 502 -1 l 439 -1 l 439 988 l 317 988 l 317 -1 l 252 -1 l 252 602 q 81 653 155 602 q 0 805 0 711 q 101 989 0 918 q 309 1053 194 1053 l 566 1053 l 566 988 "},"β":{x_min:0,x_max:660,ha:745,o:"m 471 550 q 610 450 561 522 q 660 280 660 378 q 578 64 660 151 q 367 -22 497 -22 q 239 5 299 -22 q 126 82 178 32 l 126 -278 l 0 -278 l 0 593 q 54 903 0 801 q 318 1042 127 1042 q 519 964 436 1042 q 603 771 603 887 q 567 644 603 701 q 471 550 532 586 m 337 79 q 476 138 418 79 q 535 279 535 198 q 427 437 535 386 q 226 477 344 477 l 226 583 q 398 620 329 583 q 486 762 486 668 q 435 884 486 833 q 312 935 384 935 q 169 861 219 935 q 126 698 126 797 l 126 362 q 170 169 126 242 q 337 79 224 79 "},"Μ":{x_min:0,x_max:954,ha:1068,o:"m 954 0 l 819 0 l 819 868 l 537 0 l 405 0 l 128 865 l 128 0 l 0 0 l 0 1013 l 199 1013 l 472 158 l 758 1013 l 954 1013 l 954 0 "},"Ό":{x_min:0.109375,x_max:1120,ha:1217,o:"m 1120 505 q 994 132 1120 282 q 642 -29 861 -29 q 290 130 422 -29 q 167 505 167 280 q 294 883 167 730 q 650 1046 430 1046 q 999 882 868 1046 q 1120 505 1120 730 m 977 504 q 896 784 977 669 q 644 915 804 915 q 391 785 484 915 q 307 504 307 669 q 391 224 307 339 q 644 95 486 95 q 894 224 803 95 q 977 504 977 339 m 277 1040 l 83 799 l 0 799 l 140 1040 l 277 1040 "},"Ή":{x_min:0,x_max:1158,ha:1275,o:"m 1158 0 l 1022 0 l 1022 475 l 496 475 l 496 0 l 356 0 l 356 1012 l 496 1012 l 496 599 l 1022 599 l 1022 1012 l 1158 1012 l 1158 0 m 277 1040 l 83 799 l 0 799 l 140 1040 l 277 1040 "},"•":{x_min:0,x_max:663.890625,ha:775,o:"m 663 529 q 566 293 663 391 q 331 196 469 196 q 97 294 194 196 q 0 529 0 393 q 96 763 0 665 q 331 861 193 861 q 566 763 469 861 q 663 529 663 665 "},"¥":{x_min:0.1875,x_max:819.546875,ha:886,o:"m 563 561 l 697 561 l 696 487 l 520 487 l 482 416 l 482 380 l 697 380 l 695 308 l 482 308 l 482 0 l 342 0 l 342 308 l 125 308 l 125 380 l 342 380 l 342 417 l 303 487 l 125 487 l 125 561 l 258 561 l 0 1013 l 140 1013 l 411 533 l 679 1013 l 819 1013 l 563 561 "},"(":{x_min:0,x_max:318.0625,ha:415,o:"m 318 -290 l 230 -290 q 61 23 122 -142 q 0 365 0 190 q 62 712 0 540 q 230 1024 119 869 l 318 1024 q 175 705 219 853 q 125 360 125 542 q 176 22 125 187 q 318 -290 223 -127 "},U:{x_min:0,x_max:796,ha:904,o:"m 796 393 q 681 93 796 212 q 386 -25 566 -25 q 101 95 208 -25 q 0 393 0 211 l 0 1013 l 138 1013 l 138 391 q 204 191 138 270 q 394 107 276 107 q 586 191 512 107 q 656 391 656 270 l 656 1013 l 796 1013 l 796 393 "},"γ":{x_min:0.5,x_max:744.953125,ha:822,o:"m 744 737 l 463 54 l 463 -278 l 338 -278 l 338 54 l 154 495 q 104 597 124 569 q 13 651 67 651 l 0 651 l 0 751 l 39 753 q 168 711 121 753 q 242 594 207 676 l 403 208 l 617 737 l 744 737 "},"α":{x_min:0,x_max:765.5625,ha:809,o:"m 765 -4 q 698 -14 726 -14 q 564 97 586 -14 q 466 7 525 40 q 337 -26 407 -26 q 88 98 186 -26 q 0 369 0 212 q 88 637 0 525 q 337 760 184 760 q 465 728 407 760 q 563 637 524 696 l 563 739 l 685 739 l 685 222 q 693 141 685 168 q 748 94 708 94 q 765 96 760 94 l 765 -4 m 584 371 q 531 562 584 485 q 360 653 470 653 q 192 566 254 653 q 135 379 135 489 q 186 181 135 261 q 358 84 247 84 q 528 176 465 84 q 584 371 584 260 "},F:{x_min:0,x_max:683.328125,ha:717,o:"m 683 888 l 140 888 l 140 583 l 613 583 l 613 458 l 140 458 l 140 0 l 0 0 l 0 1013 l 683 1013 l 683 888 "},"­":{x_min:0,x_max:705.5625,ha:803,o:"m 705 334 l 0 334 l 0 410 l 705 410 l 705 334 "},":":{x_min:0,x_max:142,ha:239,o:"m 142 585 l 0 585 l 0 738 l 142 738 l 142 585 m 142 0 l 0 0 l 0 151 l 142 151 l 142 0 "},"Χ":{x_min:0,x_max:854.171875,ha:935,o:"m 854 0 l 683 0 l 423 409 l 166 0 l 0 0 l 347 519 l 18 1013 l 186 1013 l 427 637 l 675 1013 l 836 1013 l 504 521 l 854 0 "},"*":{x_min:116,x_max:674,ha:792,o:"m 674 768 l 475 713 l 610 544 l 517 477 l 394 652 l 272 478 l 178 544 l 314 713 l 116 766 l 153 876 l 341 812 l 342 1013 l 446 1013 l 446 811 l 635 874 l 674 768 "},"†":{x_min:0,x_max:777,ha:835,o:"m 458 804 l 777 804 l 777 683 l 458 683 l 458 0 l 319 0 l 319 681 l 0 683 l 0 804 l 319 804 l 319 1015 l 458 1013 l 458 804 "},"°":{x_min:0,x_max:347,ha:444,o:"m 173 802 q 43 856 91 802 q 0 977 0 905 q 45 1101 0 1049 q 173 1153 90 1153 q 303 1098 255 1153 q 347 977 347 1049 q 303 856 347 905 q 173 802 256 802 m 173 884 q 238 910 214 884 q 262 973 262 937 q 239 1038 262 1012 q 173 1064 217 1064 q 108 1037 132 1064 q 85 973 85 1010 q 108 910 85 937 q 173 884 132 884 "},V:{x_min:0,x_max:862.71875,ha:940,o:"m 862 1013 l 505 0 l 361 0 l 0 1013 l 143 1013 l 434 165 l 718 1012 l 862 1013 "},"Ξ":{x_min:0,x_max:734.71875,ha:763,o:"m 723 889 l 9 889 l 9 1013 l 723 1013 l 723 889 m 673 463 l 61 463 l 61 589 l 673 589 l 673 463 m 734 0 l 0 0 l 0 124 l 734 124 l 734 0 "}," ":{x_min:0,x_max:0,ha:853},"Ϋ":{x_min:0.328125,x_max:819.515625,ha:889,o:"m 588 1046 l 460 1046 l 460 1189 l 588 1189 l 588 1046 m 360 1046 l 232 1046 l 232 1189 l 360 1189 l 360 1046 m 819 1012 l 482 416 l 482 0 l 342 0 l 342 416 l 0 1012 l 140 1012 l 411 533 l 679 1012 l 819 1012 "},"”":{x_min:0,x_max:347,ha:454,o:"m 139 851 q 102 737 139 784 q 0 669 65 690 l 0 734 q 59 787 42 741 q 72 873 72 821 l 0 873 l 0 1013 l 139 1013 l 139 851 m 347 851 q 310 737 347 784 q 208 669 273 690 l 208 734 q 267 787 250 741 q 280 873 280 821 l 208 873 l 208 1013 l 347 1013 l 347 851 "},"@":{x_min:0,x_max:1260,ha:1357,o:"m 1098 -45 q 877 -160 1001 -117 q 633 -203 752 -203 q 155 -29 327 -203 q 0 360 0 127 q 176 802 0 616 q 687 1008 372 1008 q 1123 854 969 1008 q 1260 517 1260 718 q 1155 216 1260 341 q 868 82 1044 82 q 772 106 801 82 q 737 202 737 135 q 647 113 700 144 q 527 82 594 82 q 367 147 420 82 q 314 312 314 212 q 401 565 314 452 q 639 690 498 690 q 810 588 760 690 l 849 668 l 938 668 q 877 441 900 532 q 833 226 833 268 q 853 182 833 198 q 902 167 873 167 q 1088 272 1012 167 q 1159 512 1159 372 q 1051 793 1159 681 q 687 925 925 925 q 248 747 415 925 q 97 361 97 586 q 226 26 97 159 q 627 -122 370 -122 q 856 -87 737 -122 q 1061 8 976 -53 l 1098 -45 m 786 488 q 738 580 777 545 q 643 615 700 615 q 483 517 548 615 q 425 322 425 430 q 457 203 425 250 q 552 156 490 156 q 722 273 665 156 q 786 488 738 309 "},"Ί":{x_min:0,x_max:499,ha:613,o:"m 277 1040 l 83 799 l 0 799 l 140 1040 l 277 1040 m 499 0 l 360 0 l 360 1012 l 499 1012 l 499 0 "},i:{x_min:14,x_max:136,ha:275,o:"m 136 873 l 14 873 l 14 1013 l 136 1013 l 136 873 m 136 0 l 14 0 l 14 737 l 136 737 l 136 0 "},"Β":{x_min:0,x_max:778,ha:877,o:"m 580 545 q 724 468 671 534 q 778 310 778 402 q 673 83 778 170 q 432 0 575 0 l 0 0 l 0 1013 l 411 1013 q 629 957 541 1013 q 732 768 732 891 q 691 632 732 692 q 580 545 650 571 m 393 899 l 139 899 l 139 587 l 379 587 q 521 623 462 587 q 592 744 592 666 q 531 859 592 819 q 393 899 471 899 m 419 124 q 566 169 504 124 q 635 302 635 219 q 559 435 635 388 q 402 476 494 476 l 139 476 l 139 124 l 419 124 "},"υ":{x_min:0,x_max:617,ha:725,o:"m 617 352 q 540 94 617 199 q 308 -24 455 -24 q 76 94 161 -24 q 0 352 0 199 l 0 739 l 126 739 l 126 355 q 169 185 126 257 q 312 98 220 98 q 451 185 402 98 q 492 355 492 257 l 492 739 l 617 739 l 617 352 "},"]":{x_min:0,x_max:275,ha:372,o:"m 275 -281 l 0 -281 l 0 -187 l 151 -187 l 151 920 l 0 920 l 0 1013 l 275 1013 l 275 -281 "},m:{x_min:0,x_max:1019,ha:1128,o:"m 1019 0 l 897 0 l 897 454 q 860 591 897 536 q 739 660 816 660 q 613 586 659 660 q 573 436 573 522 l 573 0 l 447 0 l 447 455 q 412 591 447 535 q 294 657 372 657 q 165 586 213 657 q 122 437 122 521 l 122 0 l 0 0 l 0 738 l 117 738 l 117 640 q 202 730 150 697 q 316 763 254 763 q 437 730 381 763 q 525 642 494 697 q 621 731 559 700 q 753 763 682 763 q 943 694 867 763 q 1019 512 1019 625 l 1019 0 "},"χ":{x_min:8.328125,x_max:780.5625,ha:815,o:"m 780 -278 q 715 -294 747 -294 q 616 -257 663 -294 q 548 -175 576 -227 l 379 133 l 143 -277 l 9 -277 l 313 254 l 163 522 q 127 586 131 580 q 36 640 91 640 q 8 637 27 640 l 8 752 l 52 757 q 162 719 113 757 q 236 627 200 690 l 383 372 l 594 737 l 726 737 l 448 250 l 625 -69 q 670 -153 647 -110 q 743 -188 695 -188 q 780 -184 759 -188 l 780 -278 "},"ί":{x_min:42,x_max:326.71875,ha:361,o:"m 284 3 q 233 -10 258 -5 q 182 -15 207 -15 q 85 26 119 -15 q 42 200 42 79 l 42 737 l 167 737 l 168 215 q 172 141 168 157 q 226 101 183 101 q 248 102 239 101 q 284 112 257 104 l 284 3 m 326 1040 l 137 819 l 54 819 l 189 1040 l 326 1040 "},"Ζ":{x_min:0,x_max:779.171875,ha:850,o:"m 779 0 l 0 0 l 0 113 l 620 896 l 40 896 l 40 1013 l 779 1013 l 779 887 l 170 124 l 779 124 l 779 0 "},R:{x_min:0,x_max:781.953125,ha:907,o:"m 781 0 l 623 0 q 587 242 590 52 q 407 433 585 433 l 138 433 l 138 0 l 0 0 l 0 1013 l 396 1013 q 636 946 539 1013 q 749 731 749 868 q 711 597 749 659 q 608 502 674 534 q 718 370 696 474 q 729 207 722 352 q 781 26 736 62 l 781 0 m 373 551 q 533 594 465 551 q 614 731 614 645 q 532 859 614 815 q 373 896 465 896 l 138 896 l 138 551 l 373 551 "},o:{x_min:0,x_max:713,ha:821,o:"m 357 -25 q 94 91 194 -25 q 0 368 0 202 q 93 642 0 533 q 357 761 193 761 q 618 644 518 761 q 713 368 713 533 q 619 91 713 201 q 357 -25 521 -25 m 357 85 q 528 175 465 85 q 584 369 584 255 q 529 562 584 484 q 357 651 467 651 q 189 560 250 651 q 135 369 135 481 q 187 177 135 257 q 357 85 250 85 "},K:{x_min:0,x_max:819.46875,ha:906,o:"m 819 0 l 649 0 l 294 509 l 139 355 l 139 0 l 0 0 l 0 1013 l 139 1013 l 139 526 l 626 1013 l 809 1013 l 395 600 l 819 0 "},",":{x_min:0,x_max:142,ha:239,o:"m 142 -12 q 105 -132 142 -82 q 0 -205 68 -182 l 0 -138 q 57 -82 40 -124 q 70 0 70 -51 l 0 0 l 0 151 l 142 151 l 142 -12 "},d:{x_min:0,x_max:683,ha:796,o:"m 683 0 l 564 0 l 564 93 q 456 6 516 38 q 327 -25 395 -25 q 87 100 181 -25 q 0 365 0 215 q 90 639 0 525 q 343 763 187 763 q 564 647 486 763 l 564 1013 l 683 1013 l 683 0 m 582 373 q 529 562 582 484 q 361 653 468 653 q 190 561 253 653 q 135 365 135 479 q 189 175 135 254 q 358 85 251 85 q 529 178 468 85 q 582 373 582 258 "},"¨":{x_min:-109,x_max:247,ha:232,o:"m 247 1046 l 119 1046 l 119 1189 l 247 1189 l 247 1046 m 19 1046 l -109 1046 l -109 1189 l 19 1189 l 19 1046 "},E:{x_min:0,x_max:736.109375,ha:789,o:"m 736 0 l 0 0 l 0 1013 l 725 1013 l 725 889 l 139 889 l 139 585 l 677 585 l 677 467 l 139 467 l 139 125 l 736 125 l 736 0 "},Y:{x_min:0,x_max:820,ha:886,o:"m 820 1013 l 482 416 l 482 0 l 342 0 l 342 416 l 0 1013 l 140 1013 l 411 534 l 679 1012 l 820 1013 "},"\"":{x_min:0,x_max:299,ha:396,o:"m 299 606 l 203 606 l 203 988 l 299 988 l 299 606 m 96 606 l 0 606 l 0 988 l 96 988 l 96 606 "},"‹":{x_min:17.984375,x_max:773.609375,ha:792,o:"m 773 40 l 18 376 l 17 465 l 773 799 l 773 692 l 159 420 l 773 149 l 773 40 "},"„":{x_min:0,x_max:364,ha:467,o:"m 141 -12 q 104 -132 141 -82 q 0 -205 67 -182 l 0 -138 q 56 -82 40 -124 q 69 0 69 -51 l 0 0 l 0 151 l 141 151 l 141 -12 m 364 -12 q 327 -132 364 -82 q 222 -205 290 -182 l 222 -138 q 279 -82 262 -124 q 292 0 292 -51 l 222 0 l 222 151 l 364 151 l 364 -12 "},"δ":{x_min:1,x_max:710,ha:810,o:"m 710 360 q 616 87 710 196 q 356 -28 518 -28 q 99 82 197 -28 q 1 356 1 192 q 100 606 1 509 q 355 703 199 703 q 180 829 288 754 q 70 903 124 866 l 70 1012 l 643 1012 l 643 901 l 258 901 q 462 763 422 794 q 636 592 577 677 q 710 360 710 485 m 584 365 q 552 501 584 447 q 451 602 521 555 q 372 611 411 611 q 197 541 258 611 q 136 355 136 472 q 190 171 136 245 q 358 85 252 85 q 528 173 465 85 q 584 365 584 252 "},"έ":{x_min:0,x_max:634.71875,ha:714,o:"m 634 234 q 527 38 634 110 q 300 -25 433 -25 q 98 29 183 -25 q 0 204 0 93 q 37 313 0 265 q 128 390 67 352 q 56 459 82 419 q 26 555 26 505 q 114 712 26 654 q 295 763 191 763 q 499 700 416 763 q 589 515 589 631 l 478 515 q 419 618 464 580 q 307 657 374 657 q 207 630 253 657 q 151 547 151 598 q 238 445 151 469 q 389 434 280 434 l 389 331 l 349 331 q 206 315 255 331 q 125 210 125 287 q 183 107 125 145 q 302 76 233 76 q 436 117 379 76 q 509 234 493 159 l 634 234 m 520 1040 l 331 819 l 248 819 l 383 1040 l 520 1040 "},"ω":{x_min:0,x_max:922,ha:1031,o:"m 922 339 q 856 97 922 203 q 650 -26 780 -26 q 538 9 587 -26 q 461 103 489 44 q 387 12 436 46 q 277 -22 339 -22 q 69 97 147 -22 q 0 339 0 203 q 45 551 0 444 q 161 738 84 643 l 302 738 q 175 553 219 647 q 124 336 124 446 q 155 179 124 249 q 275 88 197 88 q 375 163 341 88 q 400 294 400 219 l 400 572 l 524 572 l 524 294 q 561 135 524 192 q 643 88 591 88 q 762 182 719 88 q 797 342 797 257 q 745 556 797 450 q 619 738 705 638 l 760 738 q 874 551 835 640 q 922 339 922 444 "},"´":{x_min:0,x_max:96,ha:251,o:"m 96 606 l 0 606 l 0 988 l 96 988 l 96 606 "},"±":{x_min:11,x_max:781,ha:792,o:"m 781 490 l 446 490 l 446 255 l 349 255 l 349 490 l 11 490 l 11 586 l 349 586 l 349 819 l 446 819 l 446 586 l 781 586 l 781 490 m 781 21 l 11 21 l 11 115 l 781 115 l 781 21 "},"|":{x_min:343,x_max:449,ha:792,o:"m 449 462 l 343 462 l 343 986 l 449 986 l 449 462 m 449 -242 l 343 -242 l 343 280 l 449 280 l 449 -242 "},"ϋ":{x_min:0,x_max:617,ha:725,o:"m 482 800 l 372 800 l 372 925 l 482 925 l 482 800 m 239 800 l 129 800 l 129 925 l 239 925 l 239 800 m 617 352 q 540 93 617 199 q 308 -24 455 -24 q 76 93 161 -24 q 0 352 0 199 l 0 738 l 126 738 l 126 354 q 169 185 126 257 q 312 98 220 98 q 451 185 402 98 q 492 354 492 257 l 492 738 l 617 738 l 617 352 "},"§":{x_min:0,x_max:593,ha:690,o:"m 593 425 q 554 312 593 369 q 467 233 516 254 q 537 83 537 172 q 459 -74 537 -12 q 288 -133 387 -133 q 115 -69 184 -133 q 47 96 47 -6 l 166 96 q 199 7 166 40 q 288 -26 232 -26 q 371 -5 332 -26 q 420 60 420 21 q 311 201 420 139 q 108 309 210 255 q 0 490 0 383 q 33 602 0 551 q 124 687 66 654 q 75 743 93 712 q 58 812 58 773 q 133 984 58 920 q 300 1043 201 1043 q 458 987 394 1043 q 529 814 529 925 l 411 814 q 370 908 404 877 q 289 939 336 939 q 213 911 246 939 q 180 841 180 883 q 286 720 180 779 q 484 612 480 615 q 593 425 593 534 m 467 409 q 355 544 467 473 q 196 630 228 612 q 146 587 162 609 q 124 525 124 558 q 239 387 124 462 q 398 298 369 315 q 448 345 429 316 q 467 409 467 375 "},b:{x_min:0,x_max:685,ha:783,o:"m 685 372 q 597 99 685 213 q 347 -25 501 -25 q 219 5 277 -25 q 121 93 161 36 l 121 0 l 0 0 l 0 1013 l 121 1013 l 121 634 q 214 723 157 692 q 341 754 272 754 q 591 637 493 754 q 685 372 685 526 m 554 356 q 499 550 554 470 q 328 644 437 644 q 162 556 223 644 q 108 369 108 478 q 160 176 108 256 q 330 83 221 83 q 498 169 435 83 q 554 356 554 245 "},q:{x_min:0,x_max:683,ha:876,o:"m 683 -278 l 564 -278 l 564 97 q 474 8 533 39 q 345 -23 415 -23 q 91 93 188 -23 q 0 364 0 203 q 87 635 0 522 q 337 760 184 760 q 466 727 408 760 q 564 637 523 695 l 564 737 l 683 737 l 683 -278 m 582 375 q 527 564 582 488 q 358 652 466 652 q 190 565 253 652 q 135 377 135 488 q 189 179 135 261 q 361 84 251 84 q 530 179 469 84 q 582 375 582 260 "},"Ω":{x_min:-0.171875,x_max:969.5625,ha:1068,o:"m 969 0 l 555 0 l 555 123 q 744 308 675 194 q 814 558 814 423 q 726 812 814 709 q 484 922 633 922 q 244 820 334 922 q 154 567 154 719 q 223 316 154 433 q 412 123 292 199 l 412 0 l 0 0 l 0 124 l 217 124 q 68 327 122 210 q 15 572 15 444 q 144 911 15 781 q 484 1041 274 1041 q 822 909 691 1041 q 953 569 953 777 q 899 326 953 443 q 750 124 846 210 l 969 124 l 969 0 "},"ύ":{x_min:0,x_max:617,ha:725,o:"m 617 352 q 540 93 617 199 q 308 -24 455 -24 q 76 93 161 -24 q 0 352 0 199 l 0 738 l 126 738 l 126 354 q 169 185 126 257 q 312 98 220 98 q 451 185 402 98 q 492 354 492 257 l 492 738 l 617 738 l 617 352 m 535 1040 l 346 819 l 262 819 l 397 1040 l 535 1040 "},z:{x_min:-0.015625,x_max:613.890625,ha:697,o:"m 613 0 l 0 0 l 0 100 l 433 630 l 20 630 l 20 738 l 594 738 l 593 636 l 163 110 l 613 110 l 613 0 "},"™":{x_min:0,x_max:894,ha:1000,o:"m 389 951 l 229 951 l 229 503 l 160 503 l 160 951 l 0 951 l 0 1011 l 389 1011 l 389 951 m 894 503 l 827 503 l 827 939 l 685 503 l 620 503 l 481 937 l 481 503 l 417 503 l 417 1011 l 517 1011 l 653 580 l 796 1010 l 894 1011 l 894 503 "},"ή":{x_min:0.78125,x_max:697,ha:810,o:"m 697 -278 l 572 -278 l 572 454 q 540 587 572 536 q 425 650 501 650 q 271 579 337 650 q 206 420 206 509 l 206 0 l 81 0 l 81 489 q 73 588 81 562 q 0 644 56 644 l 0 741 q 68 755 38 755 q 158 721 124 755 q 200 630 193 687 q 297 726 234 692 q 434 761 359 761 q 620 692 544 761 q 697 516 697 624 l 697 -278 m 479 1040 l 290 819 l 207 819 l 341 1040 l 479 1040 "},"Θ":{x_min:0,x_max:960,ha:1056,o:"m 960 507 q 833 129 960 280 q 476 -32 698 -32 q 123 129 255 -32 q 0 507 0 280 q 123 883 0 732 q 476 1045 255 1045 q 832 883 696 1045 q 960 507 960 732 m 817 500 q 733 789 817 669 q 476 924 639 924 q 223 792 317 924 q 142 507 142 675 q 222 222 142 339 q 476 89 315 89 q 730 218 636 89 q 817 500 817 334 m 716 449 l 243 449 l 243 571 l 716 571 l 716 449 "},"®":{x_min:-3,x_max:1008,ha:1106,o:"m 503 532 q 614 562 566 532 q 672 658 672 598 q 614 747 672 716 q 503 772 569 772 l 338 772 l 338 532 l 503 532 m 502 -7 q 123 151 263 -7 q -3 501 -3 294 q 123 851 -3 706 q 502 1011 263 1011 q 881 851 739 1011 q 1008 501 1008 708 q 883 151 1008 292 q 502 -7 744 -7 m 502 60 q 830 197 709 60 q 940 501 940 322 q 831 805 940 681 q 502 944 709 944 q 174 805 296 944 q 65 501 65 680 q 173 197 65 320 q 502 60 294 60 m 788 146 l 678 146 q 653 316 655 183 q 527 449 652 449 l 338 449 l 338 146 l 241 146 l 241 854 l 518 854 q 688 808 621 854 q 766 658 766 755 q 739 563 766 607 q 668 497 713 519 q 751 331 747 472 q 788 164 756 190 l 788 146 "},"~":{x_min:0,x_max:833,ha:931,o:"m 833 958 q 778 753 833 831 q 594 665 716 665 q 402 761 502 665 q 240 857 302 857 q 131 795 166 857 q 104 665 104 745 l 0 665 q 54 867 0 789 q 237 958 116 958 q 429 861 331 958 q 594 765 527 765 q 704 827 670 765 q 729 958 729 874 l 833 958 "},"Ε":{x_min:0,x_max:736.21875,ha:778,o:"m 736 0 l 0 0 l 0 1013 l 725 1013 l 725 889 l 139 889 l 139 585 l 677 585 l 677 467 l 139 467 l 139 125 l 736 125 l 736 0 "},"³":{x_min:0,x_max:450,ha:547,o:"m 450 552 q 379 413 450 464 q 220 366 313 366 q 69 414 130 366 q 0 567 0 470 l 85 567 q 126 470 85 504 q 225 437 168 437 q 320 467 280 437 q 360 552 360 498 q 318 632 360 608 q 213 657 276 657 q 195 657 203 657 q 176 657 181 657 l 176 722 q 279 733 249 722 q 334 815 334 752 q 300 881 334 856 q 220 907 267 907 q 133 875 169 907 q 97 781 97 844 l 15 781 q 78 926 15 875 q 220 972 135 972 q 364 930 303 972 q 426 817 426 888 q 344 697 426 733 q 421 642 392 681 q 450 552 450 603 "},"[":{x_min:0,x_max:273.609375,ha:371,o:"m 273 -281 l 0 -281 l 0 1013 l 273 1013 l 273 920 l 124 920 l 124 -187 l 273 -187 l 273 -281 "},L:{x_min:0,x_max:645.828125,ha:696,o:"m 645 0 l 0 0 l 0 1013 l 140 1013 l 140 126 l 645 126 l 645 0 "},"σ":{x_min:0,x_max:803.390625,ha:894,o:"m 803 628 l 633 628 q 713 368 713 512 q 618 93 713 204 q 357 -25 518 -25 q 94 91 194 -25 q 0 368 0 201 q 94 644 0 533 q 356 761 194 761 q 481 750 398 761 q 608 739 564 739 l 803 739 l 803 628 m 360 85 q 529 180 467 85 q 584 374 584 262 q 527 566 584 490 q 352 651 463 651 q 187 559 247 651 q 135 368 135 478 q 189 175 135 254 q 360 85 251 85 "},"ζ":{x_min:0,x_max:573,ha:642,o:"m 573 -40 q 553 -162 573 -97 q 510 -278 543 -193 l 400 -278 q 441 -187 428 -219 q 462 -90 462 -132 q 378 -14 462 -14 q 108 45 197 -14 q 0 290 0 117 q 108 631 0 462 q 353 901 194 767 l 55 901 l 55 1012 l 561 1012 l 561 924 q 261 669 382 831 q 128 301 128 489 q 243 117 128 149 q 458 98 350 108 q 573 -40 573 80 "},"θ":{x_min:0,x_max:674,ha:778,o:"m 674 496 q 601 160 674 304 q 336 -26 508 -26 q 73 153 165 -26 q 0 485 0 296 q 72 840 0 683 q 343 1045 166 1045 q 605 844 516 1045 q 674 496 674 692 m 546 579 q 498 798 546 691 q 336 935 437 935 q 178 798 237 935 q 126 579 137 701 l 546 579 m 546 475 l 126 475 q 170 233 126 348 q 338 80 230 80 q 504 233 447 80 q 546 475 546 346 "},"Ο":{x_min:0,x_max:958,ha:1054,o:"m 485 1042 q 834 883 703 1042 q 958 511 958 735 q 834 136 958 287 q 481 -26 701 -26 q 126 130 261 -26 q 0 504 0 279 q 127 880 0 729 q 485 1042 263 1042 m 480 98 q 731 225 638 98 q 815 504 815 340 q 733 783 815 670 q 480 913 640 913 q 226 785 321 913 q 142 504 142 671 q 226 224 142 339 q 480 98 319 98 "},"Γ":{x_min:0,x_max:705.28125,ha:749,o:"m 705 886 l 140 886 l 140 0 l 0 0 l 0 1012 l 705 1012 l 705 886 "}," ":{x_min:0,x_max:0,ha:375},"%":{x_min:-3,x_max:1089,ha:1186,o:"m 845 0 q 663 76 731 0 q 602 244 602 145 q 661 412 602 344 q 845 489 728 489 q 1027 412 959 489 q 1089 244 1089 343 q 1029 76 1089 144 q 845 0 962 0 m 844 103 q 945 143 909 103 q 981 243 981 184 q 947 340 981 301 q 844 385 909 385 q 744 342 781 385 q 708 243 708 300 q 741 147 708 186 q 844 103 780 103 m 888 986 l 284 -25 l 199 -25 l 803 986 l 888 986 m 241 468 q 58 545 126 468 q -3 715 -3 615 q 56 881 -3 813 q 238 958 124 958 q 421 881 353 958 q 483 712 483 813 q 423 544 483 612 q 241 468 356 468 m 241 855 q 137 811 175 855 q 100 710 100 768 q 136 612 100 653 q 240 572 172 572 q 344 614 306 572 q 382 713 382 656 q 347 810 382 771 q 241 855 308 855 "},P:{x_min:0,x_max:726,ha:806,o:"m 424 1013 q 640 931 555 1013 q 726 719 726 850 q 637 506 726 587 q 413 426 548 426 l 140 426 l 140 0 l 0 0 l 0 1013 l 424 1013 m 379 889 l 140 889 l 140 548 l 372 548 q 522 589 459 548 q 593 720 593 637 q 528 845 593 801 q 379 889 463 889 "},"Έ":{x_min:0,x_max:1078.21875,ha:1118,o:"m 1078 0 l 342 0 l 342 1013 l 1067 1013 l 1067 889 l 481 889 l 481 585 l 1019 585 l 1019 467 l 481 467 l 481 125 l 1078 125 l 1078 0 m 277 1040 l 83 799 l 0 799 l 140 1040 l 277 1040 "},"Ώ":{x_min:0.125,x_max:1136.546875,ha:1235,o:"m 1136 0 l 722 0 l 722 123 q 911 309 842 194 q 981 558 981 423 q 893 813 981 710 q 651 923 800 923 q 411 821 501 923 q 321 568 321 720 q 390 316 321 433 q 579 123 459 200 l 579 0 l 166 0 l 166 124 l 384 124 q 235 327 289 210 q 182 572 182 444 q 311 912 182 782 q 651 1042 441 1042 q 989 910 858 1042 q 1120 569 1120 778 q 1066 326 1120 443 q 917 124 1013 210 l 1136 124 l 1136 0 m 277 1040 l 83 800 l 0 800 l 140 1041 l 277 1040 "},_:{x_min:0,x_max:705.5625,ha:803,o:"m 705 -334 l 0 -334 l 0 -234 l 705 -234 l 705 -334 "},"Ϊ":{x_min:-110,x_max:246,ha:275,o:"m 246 1046 l 118 1046 l 118 1189 l 246 1189 l 246 1046 m 18 1046 l -110 1046 l -110 1189 l 18 1189 l 18 1046 m 136 0 l 0 0 l 0 1012 l 136 1012 l 136 0 "},"+":{x_min:23,x_max:768,ha:792,o:"m 768 372 l 444 372 l 444 0 l 347 0 l 347 372 l 23 372 l 23 468 l 347 468 l 347 840 l 444 840 l 444 468 l 768 468 l 768 372 "},"½":{x_min:0,x_max:1050,ha:1149,o:"m 1050 0 l 625 0 q 712 178 625 108 q 878 277 722 187 q 967 385 967 328 q 932 456 967 429 q 850 484 897 484 q 759 450 798 484 q 721 352 721 416 l 640 352 q 706 502 640 448 q 851 551 766 551 q 987 509 931 551 q 1050 385 1050 462 q 976 251 1050 301 q 829 179 902 215 q 717 68 740 133 l 1050 68 l 1050 0 m 834 985 l 215 -28 l 130 -28 l 750 984 l 834 985 m 224 422 l 142 422 l 142 811 l 0 811 l 0 867 q 104 889 62 867 q 164 973 157 916 l 224 973 l 224 422 "},"Ρ":{x_min:0,x_max:720,ha:783,o:"m 424 1013 q 637 933 554 1013 q 720 723 720 853 q 633 508 720 591 q 413 426 546 426 l 140 426 l 140 0 l 0 0 l 0 1013 l 424 1013 m 378 889 l 140 889 l 140 548 l 371 548 q 521 589 458 548 q 592 720 592 637 q 527 845 592 801 q 378 889 463 889 "},"'":{x_min:0,x_max:139,ha:236,o:"m 139 851 q 102 737 139 784 q 0 669 65 690 l 0 734 q 59 787 42 741 q 72 873 72 821 l 0 873 l 0 1013 l 139 1013 l 139 851 "},"ª":{x_min:0,x_max:350,ha:397,o:"m 350 625 q 307 616 328 616 q 266 631 281 616 q 247 673 251 645 q 190 628 225 644 q 116 613 156 613 q 32 641 64 613 q 0 722 0 669 q 72 826 0 800 q 247 866 159 846 l 247 887 q 220 934 247 916 q 162 953 194 953 q 104 934 129 953 q 76 882 80 915 l 16 882 q 60 976 16 941 q 166 1011 104 1011 q 266 979 224 1011 q 308 891 308 948 l 308 706 q 311 679 308 688 q 331 670 315 670 l 350 672 l 350 625 m 247 757 l 247 811 q 136 790 175 798 q 64 726 64 773 q 83 682 64 697 q 132 667 103 667 q 207 690 174 667 q 247 757 247 718 "},"΅":{x_min:0,x_max:450,ha:553,o:"m 450 800 l 340 800 l 340 925 l 450 925 l 450 800 m 406 1040 l 212 800 l 129 800 l 269 1040 l 406 1040 m 110 800 l 0 800 l 0 925 l 110 925 l 110 800 "},T:{x_min:0,x_max:777,ha:835,o:"m 777 894 l 458 894 l 458 0 l 319 0 l 319 894 l 0 894 l 0 1013 l 777 1013 l 777 894 "},"Φ":{x_min:0,x_max:915,ha:997,o:"m 527 0 l 389 0 l 389 122 q 110 231 220 122 q 0 509 0 340 q 110 785 0 677 q 389 893 220 893 l 389 1013 l 527 1013 l 527 893 q 804 786 693 893 q 915 509 915 679 q 805 231 915 341 q 527 122 696 122 l 527 0 m 527 226 q 712 310 641 226 q 779 507 779 389 q 712 705 779 627 q 527 787 641 787 l 527 226 m 389 226 l 389 787 q 205 698 275 775 q 136 505 136 620 q 206 308 136 391 q 389 226 276 226 "},"⁋":{x_min:0,x_max:0,ha:694},j:{x_min:-77.78125,x_max:167,ha:349,o:"m 167 871 l 42 871 l 42 1013 l 167 1013 l 167 871 m 167 -80 q 121 -231 167 -184 q -26 -278 76 -278 l -77 -278 l -77 -164 l -41 -164 q 26 -143 11 -164 q 42 -65 42 -122 l 42 737 l 167 737 l 167 -80 "},"Σ":{x_min:0,x_max:756.953125,ha:819,o:"m 756 0 l 0 0 l 0 107 l 395 523 l 22 904 l 22 1013 l 745 1013 l 745 889 l 209 889 l 566 523 l 187 125 l 756 125 l 756 0 "},"›":{x_min:18.0625,x_max:774,ha:792,o:"m 774 376 l 18 40 l 18 149 l 631 421 l 18 692 l 18 799 l 774 465 l 774 376 "},"<":{x_min:17.984375,x_max:773.609375,ha:792,o:"m 773 40 l 18 376 l 17 465 l 773 799 l 773 692 l 159 420 l 773 149 l 773 40 "},"£":{x_min:0,x_max:704.484375,ha:801,o:"m 704 41 q 623 -10 664 5 q 543 -26 583 -26 q 359 15 501 -26 q 243 36 288 36 q 158 23 197 36 q 73 -21 119 10 l 6 76 q 125 195 90 150 q 175 331 175 262 q 147 443 175 383 l 0 443 l 0 512 l 108 512 q 43 734 43 623 q 120 929 43 854 q 358 1010 204 1010 q 579 936 487 1010 q 678 729 678 857 l 678 684 l 552 684 q 504 838 552 780 q 362 896 457 896 q 216 852 263 896 q 176 747 176 815 q 199 627 176 697 q 248 512 217 574 l 468 512 l 468 443 l 279 443 q 297 356 297 398 q 230 194 297 279 q 153 107 211 170 q 227 133 190 125 q 293 142 264 142 q 410 119 339 142 q 516 96 482 96 q 579 105 550 96 q 648 142 608 115 l 704 41 "},t:{x_min:0,x_max:367,ha:458,o:"m 367 0 q 312 -5 339 -2 q 262 -8 284 -8 q 145 28 183 -8 q 108 143 108 64 l 108 638 l 0 638 l 0 738 l 108 738 l 108 944 l 232 944 l 232 738 l 367 738 l 367 638 l 232 638 l 232 185 q 248 121 232 140 q 307 102 264 102 q 345 104 330 102 q 367 107 360 107 l 367 0 "},"¬":{x_min:0,x_max:706,ha:803,o:"m 706 411 l 706 158 l 630 158 l 630 335 l 0 335 l 0 411 l 706 411 "},"λ":{x_min:0,x_max:750,ha:803,o:"m 750 -7 q 679 -15 716 -15 q 538 59 591 -15 q 466 214 512 97 l 336 551 l 126 0 l 0 0 l 270 705 q 223 837 247 770 q 116 899 190 899 q 90 898 100 899 l 90 1004 q 152 1011 125 1011 q 298 938 244 1011 q 373 783 326 901 l 605 192 q 649 115 629 136 q 716 95 669 95 l 736 95 q 750 97 745 97 l 750 -7 "},W:{x_min:0,x_max:1263.890625,ha:1351,o:"m 1263 1013 l 995 0 l 859 0 l 627 837 l 405 0 l 265 0 l 0 1013 l 136 1013 l 342 202 l 556 1013 l 701 1013 l 921 207 l 1133 1012 l 1263 1013 "},">":{x_min:18.0625,x_max:774,ha:792,o:"m 774 376 l 18 40 l 18 149 l 631 421 l 18 692 l 18 799 l 774 465 l 774 376 "},v:{x_min:0,x_max:675.15625,ha:761,o:"m 675 738 l 404 0 l 272 0 l 0 738 l 133 737 l 340 147 l 541 737 l 675 738 "},"τ":{x_min:0.28125,x_max:644.5,ha:703,o:"m 644 628 l 382 628 l 382 179 q 388 120 382 137 q 436 91 401 91 q 474 94 447 91 q 504 97 501 97 l 504 0 q 454 -9 482 -5 q 401 -14 426 -14 q 278 67 308 -14 q 260 233 260 118 l 260 628 l 0 628 l 0 739 l 644 739 l 644 628 "},"ξ":{x_min:0,x_max:624.9375,ha:699,o:"m 624 -37 q 608 -153 624 -96 q 563 -278 593 -211 l 454 -278 q 491 -183 486 -200 q 511 -83 511 -126 q 484 -23 511 -44 q 370 1 452 1 q 323 0 354 1 q 283 -1 293 -1 q 84 76 169 -1 q 0 266 0 154 q 56 431 0 358 q 197 538 108 498 q 94 613 134 562 q 54 730 54 665 q 77 823 54 780 q 143 901 101 867 l 27 901 l 27 1012 l 576 1012 l 576 901 l 380 901 q 244 863 303 901 q 178 745 178 820 q 312 600 178 636 q 532 582 380 582 l 532 479 q 276 455 361 479 q 118 281 118 410 q 165 173 118 217 q 274 120 208 133 q 494 101 384 110 q 624 -37 624 76 "},"&":{x_min:-3,x_max:894.25,ha:992,o:"m 894 0 l 725 0 l 624 123 q 471 0 553 40 q 306 -41 390 -41 q 168 -7 231 -41 q 62 92 105 26 q 14 187 31 139 q -3 276 -3 235 q 55 433 -3 358 q 248 581 114 508 q 170 689 196 640 q 137 817 137 751 q 214 985 137 922 q 384 1041 284 1041 q 548 988 483 1041 q 622 824 622 928 q 563 666 622 739 q 431 556 516 608 l 621 326 q 649 407 639 361 q 663 493 653 426 l 781 493 q 703 229 781 352 l 894 0 m 504 818 q 468 908 504 877 q 384 940 433 940 q 293 907 331 940 q 255 818 255 875 q 289 714 255 767 q 363 628 313 678 q 477 729 446 682 q 504 818 504 771 m 556 209 l 314 499 q 179 395 223 449 q 135 283 135 341 q 146 222 135 253 q 183 158 158 192 q 333 80 241 80 q 556 209 448 80 "},"Λ":{x_min:0,x_max:862.5,ha:942,o:"m 862 0 l 719 0 l 426 847 l 143 0 l 0 0 l 356 1013 l 501 1013 l 862 0 "},I:{x_min:41,x_max:180,ha:293,o:"m 180 0 l 41 0 l 41 1013 l 180 1013 l 180 0 "},G:{x_min:0,x_max:921,ha:1011,o:"m 921 0 l 832 0 l 801 136 q 655 15 741 58 q 470 -28 568 -28 q 126 133 259 -28 q 0 499 0 284 q 125 881 0 731 q 486 1043 259 1043 q 763 957 647 1043 q 905 709 890 864 l 772 709 q 668 866 747 807 q 486 926 589 926 q 228 795 322 926 q 142 507 142 677 q 228 224 142 342 q 483 94 323 94 q 712 195 625 94 q 796 435 796 291 l 477 435 l 477 549 l 921 549 l 921 0 "},"ΰ":{x_min:0,x_max:617,ha:725,o:"m 524 800 l 414 800 l 414 925 l 524 925 l 524 800 m 183 800 l 73 800 l 73 925 l 183 925 l 183 800 m 617 352 q 540 93 617 199 q 308 -24 455 -24 q 76 93 161 -24 q 0 352 0 199 l 0 738 l 126 738 l 126 354 q 169 185 126 257 q 312 98 220 98 q 451 185 402 98 q 492 354 492 257 l 492 738 l 617 738 l 617 352 m 489 1040 l 300 819 l 216 819 l 351 1040 l 489 1040 "},"`":{x_min:0,x_max:138.890625,ha:236,o:"m 138 699 l 0 699 l 0 861 q 36 974 0 929 q 138 1041 72 1020 l 138 977 q 82 931 95 969 q 69 839 69 893 l 138 839 l 138 699 "},"·":{x_min:0,x_max:142,ha:239,o:"m 142 585 l 0 585 l 0 738 l 142 738 l 142 585 "},"Υ":{x_min:0.328125,x_max:819.515625,ha:889,o:"m 819 1013 l 482 416 l 482 0 l 342 0 l 342 416 l 0 1013 l 140 1013 l 411 533 l 679 1013 l 819 1013 "},r:{x_min:0,x_max:355.5625,ha:432,o:"m 355 621 l 343 621 q 179 569 236 621 q 122 411 122 518 l 122 0 l 0 0 l 0 737 l 117 737 l 117 604 q 204 719 146 686 q 355 753 262 753 l 355 621 "},x:{x_min:0,x_max:675,ha:764,o:"m 675 0 l 525 0 l 331 286 l 144 0 l 0 0 l 256 379 l 12 738 l 157 737 l 336 473 l 516 738 l 661 738 l 412 380 l 675 0 "},"μ":{x_min:0,x_max:696.609375,ha:747,o:"m 696 -4 q 628 -14 657 -14 q 498 97 513 -14 q 422 8 470 41 q 313 -24 374 -24 q 207 3 258 -24 q 120 80 157 31 l 120 -278 l 0 -278 l 0 738 l 124 738 l 124 343 q 165 172 124 246 q 308 82 216 82 q 451 177 402 82 q 492 358 492 254 l 492 738 l 616 738 l 616 214 q 623 136 616 160 q 673 92 636 92 q 696 95 684 92 l 696 -4 "},h:{x_min:0,x_max:615,ha:724,o:"m 615 472 l 615 0 l 490 0 l 490 454 q 456 590 490 535 q 338 654 416 654 q 186 588 251 654 q 122 436 122 522 l 122 0 l 0 0 l 0 1013 l 122 1013 l 122 633 q 218 727 149 694 q 362 760 287 760 q 552 676 484 760 q 615 472 615 600 "},".":{x_min:0,x_max:142,ha:239,o:"m 142 0 l 0 0 l 0 151 l 142 151 l 142 0 "},"φ":{x_min:-2,x_max:878,ha:974,o:"m 496 -279 l 378 -279 l 378 -17 q 101 88 204 -17 q -2 367 -2 194 q 68 626 -2 510 q 283 758 151 758 l 283 646 q 167 537 209 626 q 133 373 133 462 q 192 177 133 254 q 378 93 259 93 l 378 758 q 445 764 426 763 q 476 765 464 765 q 765 659 653 765 q 878 377 878 553 q 771 96 878 209 q 496 -17 665 -17 l 496 -279 m 496 93 l 514 93 q 687 183 623 93 q 746 380 746 265 q 691 569 746 491 q 522 658 629 658 l 496 656 l 496 93 "},";":{x_min:0,x_max:142,ha:239,o:"m 142 585 l 0 585 l 0 738 l 142 738 l 142 585 m 142 -12 q 105 -132 142 -82 q 0 -206 68 -182 l 0 -138 q 58 -82 43 -123 q 68 0 68 -56 l 0 0 l 0 151 l 142 151 l 142 -12 "},f:{x_min:0,x_max:378,ha:472,o:"m 378 638 l 246 638 l 246 0 l 121 0 l 121 638 l 0 638 l 0 738 l 121 738 q 137 935 121 887 q 290 1028 171 1028 q 320 1027 305 1028 q 378 1021 334 1026 l 378 908 q 323 918 346 918 q 257 870 273 918 q 246 780 246 840 l 246 738 l 378 738 l 378 638 "},"“":{x_min:1,x_max:348.21875,ha:454,o:"m 140 670 l 1 670 l 1 830 q 37 943 1 897 q 140 1011 74 990 l 140 947 q 82 900 97 940 q 68 810 68 861 l 140 810 l 140 670 m 348 670 l 209 670 l 209 830 q 245 943 209 897 q 348 1011 282 990 l 348 947 q 290 900 305 940 q 276 810 276 861 l 348 810 l 348 670 "},A:{x_min:0.03125,x_max:906.953125,ha:1008,o:"m 906 0 l 756 0 l 648 303 l 251 303 l 142 0 l 0 0 l 376 1013 l 529 1013 l 906 0 m 610 421 l 452 867 l 293 421 l 610 421 "},"‘":{x_min:1,x_max:139.890625,ha:236,o:"m 139 670 l 1 670 l 1 830 q 37 943 1 897 q 139 1011 74 990 l 139 947 q 82 900 97 940 q 68 810 68 861 l 139 810 l 139 670 "},"ϊ":{x_min:-70,x_max:283,ha:361,o:"m 283 800 l 173 800 l 173 925 l 283 925 l 283 800 m 40 800 l -70 800 l -70 925 l 40 925 l 40 800 m 283 3 q 232 -10 257 -5 q 181 -15 206 -15 q 84 26 118 -15 q 41 200 41 79 l 41 737 l 166 737 l 167 215 q 171 141 167 157 q 225 101 182 101 q 247 103 238 101 q 283 112 256 104 l 283 3 "},"π":{x_min:-0.21875,x_max:773.21875,ha:857,o:"m 773 -7 l 707 -11 q 575 40 607 -11 q 552 174 552 77 l 552 226 l 552 626 l 222 626 l 222 0 l 97 0 l 97 626 l 0 626 l 0 737 l 773 737 l 773 626 l 676 626 l 676 171 q 695 103 676 117 q 773 90 714 90 l 773 -7 "},"ά":{x_min:0,x_max:765.5625,ha:809,o:"m 765 -4 q 698 -14 726 -14 q 564 97 586 -14 q 466 7 525 40 q 337 -26 407 -26 q 88 98 186 -26 q 0 369 0 212 q 88 637 0 525 q 337 760 184 760 q 465 727 407 760 q 563 637 524 695 l 563 738 l 685 738 l 685 222 q 693 141 685 168 q 748 94 708 94 q 765 95 760 94 l 765 -4 m 584 371 q 531 562 584 485 q 360 653 470 653 q 192 566 254 653 q 135 379 135 489 q 186 181 135 261 q 358 84 247 84 q 528 176 465 84 q 584 371 584 260 m 604 1040 l 415 819 l 332 819 l 466 1040 l 604 1040 "},O:{x_min:0,x_max:958,ha:1057,o:"m 485 1041 q 834 882 702 1041 q 958 512 958 734 q 834 136 958 287 q 481 -26 702 -26 q 126 130 261 -26 q 0 504 0 279 q 127 880 0 728 q 485 1041 263 1041 m 480 98 q 731 225 638 98 q 815 504 815 340 q 733 783 815 669 q 480 912 640 912 q 226 784 321 912 q 142 504 142 670 q 226 224 142 339 q 480 98 319 98 "},n:{x_min:0,x_max:615,ha:724,o:"m 615 463 l 615 0 l 490 0 l 490 454 q 453 592 490 537 q 331 656 410 656 q 178 585 240 656 q 117 421 117 514 l 117 0 l 0 0 l 0 738 l 117 738 l 117 630 q 218 728 150 693 q 359 764 286 764 q 552 675 484 764 q 615 463 615 593 "},l:{x_min:41,x_max:166,ha:279,o:"m 166 0 l 41 0 l 41 1013 l 166 1013 l 166 0 "},"¤":{x_min:40.09375,x_max:728.796875,ha:825,o:"m 728 304 l 649 224 l 512 363 q 383 331 458 331 q 256 363 310 331 l 119 224 l 40 304 l 177 441 q 150 553 150 493 q 184 673 150 621 l 40 818 l 119 898 l 267 749 q 321 766 291 759 q 384 773 351 773 q 447 766 417 773 q 501 749 477 759 l 649 898 l 728 818 l 585 675 q 612 618 604 648 q 621 553 621 587 q 591 441 621 491 l 728 304 m 384 682 q 280 643 318 682 q 243 551 243 604 q 279 461 243 499 q 383 423 316 423 q 487 461 449 423 q 525 553 525 500 q 490 641 525 605 q 384 682 451 682 "},"κ":{x_min:0,x_max:632.328125,ha:679,o:"m 632 0 l 482 0 l 225 384 l 124 288 l 124 0 l 0 0 l 0 738 l 124 738 l 124 446 l 433 738 l 596 738 l 312 466 l 632 0 "},p:{x_min:0,x_max:685,ha:786,o:"m 685 364 q 598 96 685 205 q 350 -23 504 -23 q 121 89 205 -23 l 121 -278 l 0 -278 l 0 738 l 121 738 l 121 633 q 220 726 159 691 q 351 761 280 761 q 598 636 504 761 q 685 364 685 522 m 557 371 q 501 560 557 481 q 330 651 437 651 q 162 559 223 651 q 108 366 108 479 q 162 177 108 254 q 333 87 224 87 q 502 178 441 87 q 557 371 557 258 "},"‡":{x_min:0,x_max:777,ha:835,o:"m 458 238 l 458 0 l 319 0 l 319 238 l 0 238 l 0 360 l 319 360 l 319 681 l 0 683 l 0 804 l 319 804 l 319 1015 l 458 1013 l 458 804 l 777 804 l 777 683 l 458 683 l 458 360 l 777 360 l 777 238 l 458 238 "},"ψ":{x_min:0,x_max:808,ha:907,o:"m 465 -278 l 341 -278 l 341 -15 q 87 102 180 -15 q 0 378 0 210 l 0 739 l 133 739 l 133 379 q 182 195 133 275 q 341 98 242 98 l 341 922 l 465 922 l 465 98 q 623 195 563 98 q 675 382 675 278 l 675 742 l 808 742 l 808 381 q 720 104 808 213 q 466 -13 627 -13 l 465 -278 "},"η":{x_min:0.78125,x_max:697,ha:810,o:"m 697 -278 l 572 -278 l 572 454 q 540 587 572 536 q 425 650 501 650 q 271 579 337 650 q 206 420 206 509 l 206 0 l 81 0 l 81 489 q 73 588 81 562 q 0 644 56 644 l 0 741 q 68 755 38 755 q 158 720 124 755 q 200 630 193 686 q 297 726 234 692 q 434 761 359 761 q 620 692 544 761 q 697 516 697 624 l 697 -278 "}};var cssFontWeight="normal";var ascender=1189;var underlinePosition=-100;var cssFontStyle="normal";var boundingBox={yMin:-334,xMin:-111,yMax:1189,xMax:1672};var resolution=1000;var original_font_information={postscript_name:"Helvetiker-Regular",version_string:"Version 1.00 2004 initial release",vendor_url:"http://www.magenta.gr/",full_font_name:"Helvetiker",font_family_name:"Helvetiker",copyright:"Copyright (c) Μagenta ltd, 2004",description:"",trademark:"",designer:"",designer_url:"",unique_font_identifier:"Μagenta ltd:Helvetiker:22-10-104",license_url:"http://www.ellak.gr/fonts/MgOpen/license.html",license_description:"Copyright (c) 2004 by MAGENTA Ltd. All Rights Reserved.\r\n\r\nPermission is hereby granted, free of charge, to any person obtaining a copy of the fonts accompanying this license (\"Fonts\") and associated documentation files (the \"Font Software\"), to reproduce and distribute the Font Software, including without limitation the rights to use, copy, merge, publish, distribute, and/or sell copies of the Font Software, and to permit persons to whom the Font Software is furnished to do so, subject to the following conditions: \r\n\r\nThe above copyright and this permission notice shall be included in all copies of one or more of the Font Software typefaces.\r\n\r\nThe Font Software may be modified, altered, or added to, and in particular the designs of glyphs or characters in the Fonts may be modified and additional glyphs or characters may be added to the Fonts, only if the fonts are renamed to names not containing the word \"MgOpen\", or if the modifications are accepted for inclusion in the Font Software itself by the each appointed Administrator.\r\n\r\nThis License becomes null and void to the extent applicable to Fonts or Font Software that has been modified and is distributed under the \"MgOpen\" name.\r\n\r\nThe Font Software may be sold as part of a larger software package but no copy of one or more of the Font Software typefaces may be sold by itself. \r\n\r\nTHE FONT SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL MAGENTA OR PERSONS OR BODIES IN CHARGE OF ADMINISTRATION AND MAINTENANCE OF THE FONT SOFTWARE BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM OTHER DEALINGS IN THE FONT SOFTWARE.",manufacturer_name:"Μagenta ltd",font_sub_family_name:"Regular"};var descender=-334;var familyName="Helvetiker";var lineHeight=1522;var underlineThickness=50;var defaultTypeFace = {glyphs:glyphs,cssFontWeight:cssFontWeight,ascender:ascender,underlinePosition:underlinePosition,cssFontStyle:cssFontStyle,boundingBox:boundingBox,resolution:resolution,original_font_information:original_font_information,descender:descender,familyName:familyName,lineHeight:lineHeight,underlineThickness:underlineThickness};

var THREE$8 = window.THREE ? window.THREE // Prefer consumption from global THREE, if exists
: {
  CircleBufferGeometry: three__WEBPACK_IMPORTED_MODULE_0__["CircleBufferGeometry"],
  Font: three__WEBPACK_IMPORTED_MODULE_0__["Font"],
  Group: three__WEBPACK_IMPORTED_MODULE_0__["Group"],
  Mesh: three__WEBPACK_IMPORTED_MODULE_0__["Mesh"],
  MeshLambertMaterial: three__WEBPACK_IMPORTED_MODULE_0__["MeshLambertMaterial"],
  TextBufferGeometry: three__WEBPACK_IMPORTED_MODULE_0__["TextBufferGeometry"],
  Vector3: three__WEBPACK_IMPORTED_MODULE_0__["Vector3"]
};

var LabelsLayerKapsule = Object(kapsule__WEBPACK_IMPORTED_MODULE_1__["default"])({
  props: {
    labelsData: {
      "default": []
    },
    labelLat: {
      "default": 'lat'
    },
    labelLng: {
      "default": 'lng'
    },
    labelAltitude: {
      "default": 0
    },
    // in units of globe radius
    labelText: {
      "default": 'text'
    },
    labelSize: {
      "default": 0.5
    },
    // text height in deg
    labelTypeFace: {
      "default": defaultTypeFace,
      onChange: function onChange(tf, state) {
        state.font = new three__WEBPACK_IMPORTED_MODULE_0__["Font"](tf);
      }
    },
    labelColor: {
      "default": function _default() {
        return 'lightgrey';
      }
    },
    labelRotation: {
      "default": 0
    },
    // clockwise degrees, relative to the latitute parallel plane
    labelResolution: {
      "default": 3
    },
    // how many segments in the text's curves
    labelIncludeDot: {
      "default": true
    },
    labelDotRadius: {
      "default": 0.1
    },
    // in deg
    labelDotOrientation: {
      "default": function _default() {
        return 'bottom';
      }
    },
    // right, top, bottom
    labelsTransitionDuration: {
      "default": 1000,
      triggerUpdate: false
    } // ms

  },
  init: function init(threeObj, state) {
    // Clear the scene
    emptyObject(threeObj); // Main three object to manipulate

    state.scene = threeObj;
  },
  update: function update(state) {
    // Data accessors
    var latAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.labelLat);
    var lngAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.labelLng);
    var altitudeAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.labelAltitude);
    var textAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.labelText);
    var sizeAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.labelSize);
    var rotationAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.labelRotation);
    var colorAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.labelColor);
    var includeDotAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.labelIncludeDot);
    var dotRadiusAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.labelDotRadius);
    var dotOrientationAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.labelDotOrientation);
    var orientations = new Set(['right', 'top', 'bottom']);
    var pxPerDeg = 2 * Math.PI * GLOBE_RADIUS / 360;
    var circleGeometry = new three__WEBPACK_IMPORTED_MODULE_0__["CircleBufferGeometry"](1, 16);
    threeDigest(state.labelsData, state.scene, {
      createObj: function createObj() {
        var material = new three__WEBPACK_IMPORTED_MODULE_0__["MeshLambertMaterial"]();
        var obj = new THREE$8.Group(); // container

        obj.add(new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](circleGeometry, material)); // dot

        obj.add(new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](undefined, material)); // text

        obj.__globeObjType = 'label'; // Add object type

        return obj;
      },
      updateObj: function updateObj(obj, d) {
        var _obj$children = _slicedToArray(obj.children, 2),
            dotObj = _obj$children[0],
            textObj = _obj$children[1]; // update color


        var color = colorAccessor(d);
        var opacity = colorAlpha(color);
        textObj.material.color.set(colorStr2Hex(color));
        textObj.material.transparent = opacity < 1;
        textObj.material.opacity = opacity; // update dot

        var includeDot = includeDotAccessor(d);
        var dotOrient = dotOrientationAccessor(d);
        !includeDot || !orientations.has(dotOrient) && (dotOrient = 'bottom'); // size dot

        var dotR = includeDot ? +dotRadiusAccessor(d) * pxPerDeg : 1e-12;
        dotObj.scale.x = dotObj.scale.y = dotR; // create text geometry

        var textHeight = +sizeAccessor(d) * pxPerDeg;
        textObj.geometry = new three__WEBPACK_IMPORTED_MODULE_0__["TextBufferGeometry"](textAccessor(d), {
          font: state.font,
          size: textHeight,
          height: 0,
          curveSegments: state.labelResolution
        }); // center text (otherwise anchor is on bottom-left)

        dotOrient !== 'right' && textObj.geometry.center();

        if (includeDot) {
          // translate text
          var padding = dotR + textHeight / 2;
          dotOrient === 'right' && (textObj.position.x = padding);
          textObj.position.y = {
            right: -textHeight / 2,
            // center vertically
            top: padding + textHeight / 2,
            bottom: -padding - textHeight / 2
          }[dotOrient];
        } // animations


        var applyPosition = function applyPosition(td) {
          var _obj$__currentTargetD = obj.__currentTargetD = td,
              lat = _obj$__currentTargetD.lat,
              lng = _obj$__currentTargetD.lng,
              alt = _obj$__currentTargetD.alt,
              rot = _obj$__currentTargetD.rot,
              scale = _obj$__currentTargetD.scale; // position center


          Object.assign(obj.position, polar2Cartesian(lat, lng, alt)); // rotate

          obj.lookAt(state.scene.localToWorld(new THREE$8.Vector3(0, 0, 0))); // face globe (local) center

          obj.rotateY(Math.PI); // face outwards
          // rotate clockwise relative to lat parallel

          obj.rotateZ(-rot * Math.PI / 180); // scale it

          obj.scale.x = obj.scale.y = obj.scale.z = scale;
        };

        var targetD = {
          lat: +latAccessor(d),
          lng: +lngAccessor(d),
          alt: +altitudeAccessor(d),
          rot: +rotationAccessor(d),
          scale: 1
        };
        var currentTargetD = obj.__currentTargetD || Object.assign({}, targetD, {
          scale: 1e-12
        });

        if (Object.keys(targetD).some(function (k) {
          return currentTargetD[k] !== targetD[k];
        })) {
          if (!state.labelsTransitionDuration || state.labelsTransitionDuration < 0) {
            // set final position
            applyPosition(targetD);
          } else {
            // animate
            new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].Tween(currentTargetD).to(targetD, state.labelsTransitionDuration).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].Easing.Quadratic.InOut).onUpdate(applyPosition).start();
          }
        }
      }
    });
  }
});

var CustomLayerKapsule = Object(kapsule__WEBPACK_IMPORTED_MODULE_1__["default"])({
  props: {
    customLayerData: {
      "default": []
    },
    customThreeObject: {},
    customThreeObjectUpdate: {
      triggerUpdate: false
    }
  },
  init: function init(threeObj, state) {
    // Clear the scene
    emptyObject(threeObj); // Main three object to manipulate

    state.scene = threeObj;
  },
  update: function update(state) {
    if (!state.customThreeObjectUpdate) {
      emptyObject(state.scene);
    } // Clear the existing objects to create all new, if there's no update method (brute-force)


    var customObjectAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.customThreeObject);
    var customObjectUpdateAccessor = Object(accessor_fn__WEBPACK_IMPORTED_MODULE_6__["default"])(state.customThreeObjectUpdate);
    threeDigest(state.customLayerData, state.scene, {
      createObj: function createObj(d) {
        var obj = customObjectAccessor(d, GLOBE_RADIUS);

        if (obj) {
          if (state.customThreeObject === obj) {
            // clone object if it's a shared object among all points
            obj = obj.clone();
          }

          obj.__globeObjType = 'custom'; // Add object type
        }

        return obj;
      },
      updateObj: function updateObj(obj, d) {
        return customObjectUpdateAccessor(obj, d, GLOBE_RADIUS);
      }
    });
  }
});

var THREE$9 = window.THREE ? window.THREE // Prefer consumption from global THREE, if exists
: {
  Group: three__WEBPACK_IMPORTED_MODULE_0__["Group"],
  Vector2: three__WEBPACK_IMPORTED_MODULE_0__["Vector2"],
  Vector3: three__WEBPACK_IMPORTED_MODULE_0__["Vector3"]
};

var layers = ['globeLayer', 'pointsLayer', 'arcsLayer', 'hexBinLayer', 'polygonsLayer', 'hexedPolygonsLayer', 'pathsLayer', 'labelsLayer', 'customLayer']; // Expose config from layers

var bindGlobeLayer = linkKapsule('globeLayer', GlobeLayerKapsule);
var linkedGlobeLayerProps = Object.assign.apply(Object, _toConsumableArray(['globeImageUrl', 'bumpImageUrl', 'showAtmosphere', 'showGraticules'].map(function (p) {
  return _defineProperty({}, p, bindGlobeLayer.linkProp(p));
})));
var linkedGlobeLayerMethods = Object.assign.apply(Object, _toConsumableArray(['globeMaterial'].map(function (p) {
  return _defineProperty({}, p, bindGlobeLayer.linkMethod(p));
})));
var bindPointsLayer = linkKapsule('pointsLayer', PointsLayerKapsule);
var linkedPointsLayerProps = Object.assign.apply(Object, _toConsumableArray(['pointsData', 'pointLat', 'pointLng', 'pointColor', 'pointAltitude', 'pointRadius', 'pointResolution', 'pointsMerge', 'pointsTransitionDuration'].map(function (p) {
  return _defineProperty({}, p, bindPointsLayer.linkProp(p));
})));
var bindArcsLayer = linkKapsule('arcsLayer', ArcsLayerKapsule);
var linkedArcsLayerProps = Object.assign.apply(Object, _toConsumableArray(['arcsData', 'arcStartLat', 'arcStartLng', 'arcEndLat', 'arcEndLng', 'arcColor', 'arcAltitude', 'arcAltitudeAutoScale', 'arcStroke', 'arcCurveResolution', 'arcCircularResolution', 'arcDashLength', 'arcDashGap', 'arcDashInitialGap', 'arcDashAnimateTime', 'arcsTransitionDuration'].map(function (p) {
  return _defineProperty({}, p, bindArcsLayer.linkProp(p));
})));
var bindHexBinLayer = linkKapsule('hexBinLayer', HexBinLayerKapsule);
var linkedHexBinLayerProps = Object.assign.apply(Object, _toConsumableArray(['hexBinPointsData', 'hexBinPointLat', 'hexBinPointLng', 'hexBinPointWeight', 'hexBinResolution', 'hexMargin', 'hexTopCurvatureResolution', 'hexTopColor', 'hexSideColor', 'hexAltitude', 'hexBinMerge', 'hexTransitionDuration'].map(function (p) {
  return _defineProperty({}, p, bindHexBinLayer.linkProp(p));
})));
var bindHexedPolygonsLayer = linkKapsule('hexedPolygonsLayer', HexedPolygonsLayerKapsule);
var linkedHexedPolygonsLayerProps = Object.assign.apply(Object, _toConsumableArray(['hexPolygonsData', 'hexPolygonGeoJsonGeometry', 'hexPolygonColor', 'hexPolygonAltitude', 'hexPolygonResolution', 'hexPolygonMargin', 'hexPolygonCurvatureResolution', 'hexPolygonsTransitionDuration'].map(function (p) {
  return _defineProperty({}, p, bindHexedPolygonsLayer.linkProp(p));
})));
var bindPolygonsLayer = linkKapsule('polygonsLayer', PolygonsLayerKapsule);
var linkedPolygonsLayerProps = Object.assign.apply(Object, _toConsumableArray(['polygonsData', 'polygonGeoJsonGeometry', 'polygonCapColor', 'polygonSideColor', 'polygonStrokeColor', 'polygonAltitude', 'polygonCapCurvatureResolution', 'polygonsTransitionDuration'].map(function (p) {
  return _defineProperty({}, p, bindPolygonsLayer.linkProp(p));
})));
var bindPathsLayer = linkKapsule('pathsLayer', PathsLayerKapsule);
var linkedPathsLayerProps = Object.assign.apply(Object, _toConsumableArray(['pathsData', 'pathPoints', 'pathPointLat', 'pathPointLng', 'pathPointAlt', 'pathResolution', 'pathColor', 'pathStroke', 'pathDashLength', 'pathDashGap', 'pathDashInitialGap', 'pathDashAnimateTime', 'pathTransitionDuration'].map(function (p) {
  return _defineProperty({}, p, bindPathsLayer.linkProp(p));
})));
var bindLabelsLayer = linkKapsule('labelsLayer', LabelsLayerKapsule);
var linkedLabelsLayerProps = Object.assign.apply(Object, _toConsumableArray(['labelsData', 'labelLat', 'labelLng', 'labelAltitude', 'labelRotation', 'labelText', 'labelSize', 'labelTypeFace', 'labelColor', 'labelResolution', 'labelIncludeDot', 'labelDotRadius', 'labelDotOrientation', 'labelsTransitionDuration'].map(function (p) {
  return _defineProperty({}, p, bindLabelsLayer.linkProp(p));
})));
var bindCustomLayer = linkKapsule('customLayer', CustomLayerKapsule);
var linkedCustomLayerProps = Object.assign.apply(Object, _toConsumableArray(['customLayerData', 'customThreeObject', 'customThreeObjectUpdate'].map(function (p) {
  return _defineProperty({}, p, bindCustomLayer.linkProp(p));
}))); //

var Globe = Object(kapsule__WEBPACK_IMPORTED_MODULE_1__["default"])({
  props: _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({
    rendererSize: {
      "default": new THREE$9.Vector2(window.innerWidth, window.innerHeight),
      onChange: function onChange(rendererSize, state) {
        state.pathsLayer.rendererSize(rendererSize);
      },
      triggerUpdate: false
    }
  }, linkedGlobeLayerProps), linkedPointsLayerProps), linkedArcsLayerProps), linkedHexBinLayerProps), linkedPolygonsLayerProps), linkedHexedPolygonsLayerProps), linkedPathsLayerProps), linkedLabelsLayerProps), linkedCustomLayerProps),
  methods: _objectSpread2({
    getCoords: function getCoords(state) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return polar2Cartesian.apply(void 0, args);
    },
    toGeoCoords: function toGeoCoords(state) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return cartesian2Polar.apply(void 0, args);
    }
  }, linkedGlobeLayerMethods),
  stateInit: function stateInit() {
    return {
      globeLayer: GlobeLayerKapsule(),
      pointsLayer: PointsLayerKapsule(),
      arcsLayer: ArcsLayerKapsule(),
      hexBinLayer: HexBinLayerKapsule(),
      polygonsLayer: PolygonsLayerKapsule(),
      hexedPolygonsLayer: HexedPolygonsLayerKapsule(),
      pathsLayer: PathsLayerKapsule(),
      labelsLayer: LabelsLayerKapsule(),
      customLayer: CustomLayerKapsule()
    };
  },
  init: function init(threeObj, state, _ref11) {
    var _ref11$animateIn = _ref11.animateIn,
        animateIn = _ref11$animateIn === void 0 ? true : _ref11$animateIn,
        _ref11$waitForGlobeRe = _ref11.waitForGlobeReady,
        waitForGlobeReady = _ref11$waitForGlobeRe === void 0 ? true : _ref11$waitForGlobeRe;
    // Clear the scene
    emptyObject(threeObj); // Main three object to manipulate

    threeObj.add(state.scene = new THREE$9.Group());
    state.scene.visible = false; // hide scene before globe initialization
    // Add all layers groups

    layers.forEach(function (layer) {
      var g = new THREE$9.Group();
      state.scene.add(g);
      state[layer](g);
    });

    var initGlobe = function initGlobe() {
      if (animateIn) {
        // Animate build-in just once
        state.scene.scale.set(1e-6, 1e-6, 1e-6);
        new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].Tween({
          k: 1e-6
        }).to({
          k: 1
        }, 600).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].Easing.Quadratic.Out).onUpdate(function (_ref12) {
          var k = _ref12.k;
          return state.scene.scale.set(k, k, k);
        }).start();
        var rotAxis = new THREE$9.Vector3(0, 1, 0);
        new _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].Tween({
          rot: Math.PI * 2
        }).to({
          rot: 0
        }, 1200).easing(_tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].Easing.Quintic.Out).onUpdate(function (_ref13) {
          var rot = _ref13.rot;
          return state.scene.setRotationFromAxisAngle(rotAxis, rot);
        }).start();
      }

      state.scene.visible = true;
    };

    waitForGlobeReady ? state.globeLayer.onReady(initGlobe) : initGlobe(); // run tween updates

    (function onFrame() {
      requestAnimationFrame(onFrame);
      _tweenjs_tween_js__WEBPACK_IMPORTED_MODULE_2__["default"].update();
    })(); // IIFE

  },
  update: function update(state) {}
});

function fromKapsule (kapsule) {
  var baseClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object;
  var initKapsuleWithSelf = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var FromKapsule = /*#__PURE__*/function (_baseClass) {
    _inherits(FromKapsule, _baseClass);

    var _super = _createSuper(FromKapsule);

    function FromKapsule() {
      var _this;

      _classCallCheck(this, FromKapsule);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));
      _this.__kapsuleInstance = kapsule.apply(void 0, args).apply(void 0, [].concat(_toConsumableArray(initKapsuleWithSelf ? [_assertThisInitialized(_this)] : []), args));
      return _this;
    }

    return FromKapsule;
  }(baseClass); // attach kapsule props/methods to class prototype


  Object.keys(kapsule()).forEach(function (m) {
    return FromKapsule.prototype[m] = function () {
      var _this$__kapsuleInstan;

      var returnVal = (_this$__kapsuleInstan = this.__kapsuleInstance)[m].apply(_this$__kapsuleInstan, arguments);

      return returnVal === this.__kapsuleInstance ? this // chain based on this class, not the kapsule obj
      : returnVal;
    };
  });
  return FromKapsule;
}

var threeGlobe = fromKapsule(Globe, three__WEBPACK_IMPORTED_MODULE_0__["Group"], true);

/* harmony default export */ __webpack_exports__["default"] = (threeGlobe);


/***/ }),

/***/ "./node_modules/three-glow-mesh/dist/index.module.js":
/*!***********************************************************!*\
  !*** ./node_modules/three-glow-mesh/dist/index.module.js ***!
  \***********************************************************/
/*! exports provided: createGlowGeometry, createGlowMaterial, createGlowMesh, defaultOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createGlowGeometry", function() { return c; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createGlowMaterial", function() { return a; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createGlowMesh", function() { return v; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultOptions", function() { return t; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
var t={backside:!0,coefficient:.5,color:"gold",size:2,power:1};function a(o,n,i){return new three__WEBPACK_IMPORTED_MODULE_0__["ShaderMaterial"]({depthWrite:!1,fragmentShader:"\nuniform vec3 color;\nuniform float coefficient;\nuniform float power;\nvarying vec3 vVertexNormal;\nvarying vec3 vVertexWorldPosition;\nvoid main() {\n  vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;\n  vec3 viewCameraToVertex\t= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;\n  viewCameraToVertex = normalize(viewCameraToVertex);\n  float intensity\t= pow(\n    coefficient + dot(vVertexNormal, viewCameraToVertex),\n    power\n  );\n  gl_FragColor = vec4(color, intensity);\n}",transparent:!0,uniforms:{coefficient:{value:o},color:{value:new three__WEBPACK_IMPORTED_MODULE_0__["Color"](n)},power:{value:i}},vertexShader:"\nvarying vec3 vVertexWorldPosition;\nvarying vec3 vVertexNormal;\nvoid main() {\n  vVertexNormal\t= normalize(normalMatrix * normal);\n  vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;\n  gl_Position\t= projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n"})}function c(e,r){var n=e.clone(),i=new Array(n.vertices.length);return n.faces.forEach(function(e){e instanceof three__WEBPACK_IMPORTED_MODULE_0__["Face3"]?(i[e.a]=e.vertexNormals[0],i[e.b]=e.vertexNormals[1],i[e.c]=e.vertexNormals[2]):console.error("Face needs to be an instance of THREE.Face3.")}),n.vertices.forEach(function(e,o){var n=i[o],t=n.y,a=n.z;e.x+=n.x*r,e.y+=t*r,e.z+=a*r}),n}function v(e,r){void 0===r&&(r=t);var o=r.backside,v=r.coefficient,l=r.color,f=r.power,m=c(e,r.size),x=a(v,l,f);return o&&(x.side=three__WEBPACK_IMPORTED_MODULE_0__["BackSide"]),new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](m,x)}
//# sourceMappingURL=index.module.js.map


/***/ }),

/***/ "./src/app/common/enums/colors.enum.ts":
/*!*********************************************!*\
  !*** ./src/app/common/enums/colors.enum.ts ***!
  \*********************************************/
/*! exports provided: Colors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Colors", function() { return Colors; });
var Colors;
(function (Colors) {
    Colors["red"] = "#F97664";
    Colors["green"] = "#C8FF67";
    Colors["canvasBackground"] = "#ECFCF9";
    Colors["yellow"] = "#F9E764";
})(Colors || (Colors = {}));


/***/ }),

/***/ "./src/app/three/services/three.service.ts":
/*!*************************************************!*\
  !*** ./src/app/three/services/three.service.ts ***!
  \*************************************************/
/*! exports provided: ThreeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThreeService", function() { return ThreeService; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var src_app_common_enums_colors_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/common/enums/colors.enum */ "./src/app/common/enums/colors.enum.ts");
/* harmony import */ var three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls */ "./node_modules/three/examples/jsm/controls/OrbitControls.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");




var ThreeService = /** @class */ (function () {
    function ThreeService() {
    }
    ThreeService.prototype.getThreeCommon = function (canvasEl, directionalLight) {
        if (directionalLight === void 0) { directionalLight = false; }
        var common = {
            scene: new three__WEBPACK_IMPORTED_MODULE_0__["Scene"](),
            renderer: new three__WEBPACK_IMPORTED_MODULE_0__["WebGLRenderer"]({ canvas: canvasEl, antialias: true }),
            camera: new three__WEBPACK_IMPORTED_MODULE_0__["PerspectiveCamera"](75, 2),
            controls: {},
        };
        common.renderer.setSize(canvasEl.offsetWidth, canvasEl.offsetHeight);
        common.scene.add(directionalLight
            ? new three__WEBPACK_IMPORTED_MODULE_0__["DirectionalLight"](0xffffff, 1)
            : new three__WEBPACK_IMPORTED_MODULE_0__["AmbientLight"](0xffffff, 1));
        common.controls = this.configureViewSettings(common.scene, common.camera, common.renderer);
        return common;
    };
    ThreeService.prototype.getThreeCommonWindow = function () {
        var common = {
            scene: new three__WEBPACK_IMPORTED_MODULE_0__["Scene"](),
            renderer: new three__WEBPACK_IMPORTED_MODULE_0__["WebGLRenderer"](),
            camera: new three__WEBPACK_IMPORTED_MODULE_0__["PerspectiveCamera"](),
        };
        common.scene.background = new three__WEBPACK_IMPORTED_MODULE_0__["Color"](src_app_common_enums_colors_enum__WEBPACK_IMPORTED_MODULE_1__["Colors"].canvasBackground);
        common.renderer.setSize(window.innerWidth, window.innerHeight);
        common.camera.position.z = 100;
        return common;
    };
    ThreeService.prototype.configureViewSettings = function (scene, camera, renderer) {
        scene.background = new three__WEBPACK_IMPORTED_MODULE_0__["Color"](0xffffff);
        var light = new three__WEBPACK_IMPORTED_MODULE_0__["AmbientLight"](0x404040); // soft white light
        scene.add(light);
        var controls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_2__["OrbitControls"](camera, renderer.domElement);
        camera.position.set(0, 0, 100);
        // controls.autoRotate =true;
        // controls.autoRotateSpeed =1;
        return controls;
    };
    ThreeService.prototype.getRendererCallCount = function (renderer) {
        return renderer.info.render.calls;
    };
    ThreeService.prototype.cleanScene = function (threeCommon) {
        var meshes = [];
        threeCommon.scene.traverse(function (object) {
            if (object.isMesh)
                meshes.push(object);
        });
        for (var i = 0; i < meshes.length; i++) {
            var mesh = meshes[i];
            mesh.material.dispose();
            mesh.geometry.dispose();
            threeCommon.scene.remove(mesh);
        }
    };
    ThreeService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ factory: function ThreeService_Factory() { return new ThreeService(); }, token: ThreeService, providedIn: "root" });
    return ThreeService;
}());



/***/ })

}]);
//# sourceMappingURL=default~ct-visualization-ct-visualization-module-ngfactory~three-three-module-ngfactory-es5.js.map