(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["network-graph-network-graph-module-ngfactory"],{

/***/ "./node_modules/three/examples/jsm/lines/LineMaterial.js":
/*!***************************************************************!*\
  !*** ./node_modules/three/examples/jsm/lines/LineMaterial.js ***!
  \***************************************************************/
/*! exports provided: LineMaterial */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineMaterial", function() { return LineMaterial; });
/* harmony import */ var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../build/three.module.js */ "./node_modules/three/build/three.module.js");


/**
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

_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["UniformsLib"].line = {

	linewidth: { value: 1 },
	resolution: { value: new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector2"]( 1, 1 ) },
	dashScale: { value: 1 },
	dashSize: { value: 1 },
	gapSize: { value: 1 }, // todo FIX - maybe change to totalSize
	opacity: { value: 1 }

};

_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["ShaderLib"][ 'line' ] = {

	uniforms: _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["UniformsUtils"].merge( [
		_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["UniformsLib"].common,
		_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["UniformsLib"].fog,
		_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["UniformsLib"].line
	] ),

	vertexShader:
		`
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

	fragmentShader:
		`
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

			#include <tonemapping_fragment>
			#include <encodings_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`
};

var LineMaterial = function ( parameters ) {

	_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["ShaderMaterial"].call( this, {

		type: 'LineMaterial',

		uniforms: _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["UniformsUtils"].clone( _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["ShaderLib"][ 'line' ].uniforms ),

		vertexShader: _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["ShaderLib"][ 'line' ].vertexShader,
		fragmentShader: _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["ShaderLib"][ 'line' ].fragmentShader,

		clipping: true // required for clipping support

	} );

	this.dashed = false;

	Object.defineProperties( this, {

		color: {

			enumerable: true,

			get: function () {

				return this.uniforms.diffuse.value;

			},

			set: function ( value ) {

				this.uniforms.diffuse.value = value;

			}

		},

		linewidth: {

			enumerable: true,

			get: function () {

				return this.uniforms.linewidth.value;

			},

			set: function ( value ) {

				this.uniforms.linewidth.value = value;

			}

		},

		dashScale: {

			enumerable: true,

			get: function () {

				return this.uniforms.dashScale.value;

			},

			set: function ( value ) {

				this.uniforms.dashScale.value = value;

			}

		},

		dashSize: {

			enumerable: true,

			get: function () {

				return this.uniforms.dashSize.value;

			},

			set: function ( value ) {

				this.uniforms.dashSize.value = value;

			}

		},

		gapSize: {

			enumerable: true,

			get: function () {

				return this.uniforms.gapSize.value;

			},

			set: function ( value ) {

				this.uniforms.gapSize.value = value;

			}

		},

		opacity: {

			enumerable: true,

			get: function () {

				return this.uniforms.opacity.value;

			},

			set: function ( value ) {

				this.uniforms.opacity.value = value;

			}

		},

		resolution: {

			enumerable: true,

			get: function () {

				return this.uniforms.resolution.value;

			},

			set: function ( value ) {

				this.uniforms.resolution.value.copy( value );

			}

		}

	} );

	this.setValues( parameters );

};

LineMaterial.prototype = Object.create( _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["ShaderMaterial"].prototype );
LineMaterial.prototype.constructor = LineMaterial;

LineMaterial.prototype.isLineMaterial = true;




/***/ }),

/***/ "./node_modules/three/examples/jsm/lines/LineSegments2.js":
/*!****************************************************************!*\
  !*** ./node_modules/three/examples/jsm/lines/LineSegments2.js ***!
  \****************************************************************/
/*! exports provided: LineSegments2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineSegments2", function() { return LineSegments2; });
/* harmony import */ var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../build/three.module.js */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _lines_LineSegmentsGeometry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../lines/LineSegmentsGeometry.js */ "./node_modules/three/examples/jsm/lines/LineSegmentsGeometry.js");
/* harmony import */ var _lines_LineMaterial_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lines/LineMaterial.js */ "./node_modules/three/examples/jsm/lines/LineMaterial.js");




var LineSegments2 = function ( geometry, material ) {

	if ( geometry === undefined ) geometry = new _lines_LineSegmentsGeometry_js__WEBPACK_IMPORTED_MODULE_1__["LineSegmentsGeometry"]();
	if ( material === undefined ) material = new _lines_LineMaterial_js__WEBPACK_IMPORTED_MODULE_2__["LineMaterial"]( { color: Math.random() * 0xffffff } );

	_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Mesh"].call( this, geometry, material );

	this.type = 'LineSegments2';

};

LineSegments2.prototype = Object.assign( Object.create( _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Mesh"].prototype ), {

	constructor: LineSegments2,

	isLineSegments2: true,

	computeLineDistances: ( function () { // for backwards-compatability, but could be a method of LineSegmentsGeometry...

		var start = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
		var end = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();

		return function computeLineDistances() {

			var geometry = this.geometry;

			var instanceStart = geometry.attributes.instanceStart;
			var instanceEnd = geometry.attributes.instanceEnd;
			var lineDistances = new Float32Array( 2 * instanceStart.data.count );

			for ( var i = 0, j = 0, l = instanceStart.data.count; i < l; i ++, j += 2 ) {

				start.fromBufferAttribute( instanceStart, i );
				end.fromBufferAttribute( instanceEnd, i );

				lineDistances[ j ] = ( j === 0 ) ? 0 : lineDistances[ j - 1 ];
				lineDistances[ j + 1 ] = lineDistances[ j ] + start.distanceTo( end );

			}

			var instanceDistanceBuffer = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["InstancedInterleavedBuffer"]( lineDistances, 2, 1 ); // d0, d1

			geometry.setAttribute( 'instanceDistanceStart', new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["InterleavedBufferAttribute"]( instanceDistanceBuffer, 1, 0 ) ); // d0
			geometry.setAttribute( 'instanceDistanceEnd', new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["InterleavedBufferAttribute"]( instanceDistanceBuffer, 1, 1 ) ); // d1

			return this;

		};

	}() ),

	raycast: ( function () {

		var start = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector4"]();
		var end = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector4"]();

		var ssOrigin = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector4"]();
		var ssOrigin3 = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
		var mvMatrix = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Matrix4"]();
		var line = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Line3"]();
		var closestPoint = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();

		return function raycast( raycaster, intersects ) {

			if ( raycaster.camera === null ) {

				console.error( 'LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2.' );

			}

			var threshold = ( raycaster.params.Line2 !== undefined ) ? raycaster.params.Line2.threshold || 0 : 0;

			var ray = raycaster.ray;
			var camera = raycaster.camera;
			var projectionMatrix = camera.projectionMatrix;

			var geometry = this.geometry;
			var material = this.material;
			var resolution = material.resolution;
			var lineWidth = material.linewidth + threshold;

			var instanceStart = geometry.attributes.instanceStart;
			var instanceEnd = geometry.attributes.instanceEnd;

			// pick a point 1 unit out along the ray to avoid the ray origin
			// sitting at the camera origin which will cause "w" to be 0 when
			// applying the projection matrix.
			ray.at( 1, ssOrigin );

			// ndc space [ - 1.0, 1.0 ]
			ssOrigin.w = 1;
			ssOrigin.applyMatrix4( camera.matrixWorldInverse );
			ssOrigin.applyMatrix4( projectionMatrix );
			ssOrigin.multiplyScalar( 1 / ssOrigin.w );

			// screen space
			ssOrigin.x *= resolution.x / 2;
			ssOrigin.y *= resolution.y / 2;
			ssOrigin.z = 0;

			ssOrigin3.copy( ssOrigin );

			var matrixWorld = this.matrixWorld;
			mvMatrix.multiplyMatrices( camera.matrixWorldInverse, matrixWorld );

			for ( var i = 0, l = instanceStart.count; i < l; i ++ ) {

				start.fromBufferAttribute( instanceStart, i );
				end.fromBufferAttribute( instanceEnd, i );

				start.w = 1;
				end.w = 1;

				// camera space
				start.applyMatrix4( mvMatrix );
				end.applyMatrix4( mvMatrix );

				// clip space
				start.applyMatrix4( projectionMatrix );
				end.applyMatrix4( projectionMatrix );

				// ndc space [ - 1.0, 1.0 ]
				start.multiplyScalar( 1 / start.w );
				end.multiplyScalar( 1 / end.w );

				// skip the segment if it's outside the camera near and far planes
				var isBehindCameraNear = start.z < - 1 && end.z < - 1;
				var isPastCameraFar = start.z > 1 && end.z > 1;
				if ( isBehindCameraNear || isPastCameraFar ) {

					continue;

				}

				// screen space
				start.x *= resolution.x / 2;
				start.y *= resolution.y / 2;

				end.x *= resolution.x / 2;
				end.y *= resolution.y / 2;

				// create 2d segment
				line.start.copy( start );
				line.start.z = 0;

				line.end.copy( end );
				line.end.z = 0;

				// get closest point on ray to segment
				var param = line.closestPointToPointParameter( ssOrigin3, true );
				line.at( param, closestPoint );

				// check if the intersection point is within clip space
				var zPos = _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["MathUtils"].lerp( start.z, end.z, param );
				var isInClipSpace = zPos >= - 1 && zPos <= 1;

				var isInside = ssOrigin3.distanceTo( closestPoint ) < lineWidth * 0.5;

				if ( isInClipSpace && isInside ) {

					line.start.fromBufferAttribute( instanceStart, i );
					line.end.fromBufferAttribute( instanceEnd, i );

					line.start.applyMatrix4( matrixWorld );
					line.end.applyMatrix4( matrixWorld );

					var pointOnLine = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
					var point = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();

					ray.distanceSqToSegment( line.start, line.end, point, pointOnLine );

					intersects.push( {

						point: point,
						pointOnLine: pointOnLine,
						distance: ray.origin.distanceTo( point ),

						object: this,
						face: null,
						faceIndex: i,
						uv: null,
						uv2: null,

					} );

				}

			}

		};

	}() )

} );




/***/ }),

/***/ "./node_modules/three/examples/jsm/lines/LineSegmentsGeometry.js":
/*!***********************************************************************!*\
  !*** ./node_modules/three/examples/jsm/lines/LineSegmentsGeometry.js ***!
  \***********************************************************************/
/*! exports provided: LineSegmentsGeometry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineSegmentsGeometry", function() { return LineSegmentsGeometry; });
/* harmony import */ var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../build/three.module.js */ "./node_modules/three/build/three.module.js");


var LineSegmentsGeometry = function () {

	_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["InstancedBufferGeometry"].call( this );

	this.type = 'LineSegmentsGeometry';

	var positions = [ - 1, 2, 0, 1, 2, 0, - 1, 1, 0, 1, 1, 0, - 1, 0, 0, 1, 0, 0, - 1, - 1, 0, 1, - 1, 0 ];
	var uvs = [ - 1, 2, 1, 2, - 1, 1, 1, 1, - 1, - 1, 1, - 1, - 1, - 2, 1, - 2 ];
	var index = [ 0, 2, 1, 2, 3, 1, 2, 4, 3, 4, 5, 3, 4, 6, 5, 6, 7, 5 ];

	this.setIndex( index );
	this.setAttribute( 'position', new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Float32BufferAttribute"]( positions, 3 ) );
	this.setAttribute( 'uv', new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Float32BufferAttribute"]( uvs, 2 ) );

};

LineSegmentsGeometry.prototype = Object.assign( Object.create( _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["InstancedBufferGeometry"].prototype ), {

	constructor: LineSegmentsGeometry,

	isLineSegmentsGeometry: true,

	applyMatrix4: function ( matrix ) {

		var start = this.attributes.instanceStart;
		var end = this.attributes.instanceEnd;

		if ( start !== undefined ) {

			start.applyMatrix4( matrix );

			end.applyMatrix4( matrix );

			start.needsUpdate = true;

		}

		if ( this.boundingBox !== null ) {

			this.computeBoundingBox();

		}

		if ( this.boundingSphere !== null ) {

			this.computeBoundingSphere();

		}

		return this;

	},

	setPositions: function ( array ) {

		var lineSegments;

		if ( array instanceof Float32Array ) {

			lineSegments = array;

		} else if ( Array.isArray( array ) ) {

			lineSegments = new Float32Array( array );

		}

		var instanceBuffer = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["InstancedInterleavedBuffer"]( lineSegments, 6, 1 ); // xyz, xyz

		this.setAttribute( 'instanceStart', new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["InterleavedBufferAttribute"]( instanceBuffer, 3, 0 ) ); // xyz
		this.setAttribute( 'instanceEnd', new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["InterleavedBufferAttribute"]( instanceBuffer, 3, 3 ) ); // xyz

		//

		this.computeBoundingBox();
		this.computeBoundingSphere();

		return this;

	},

	setColors: function ( array ) {

		var colors;

		if ( array instanceof Float32Array ) {

			colors = array;

		} else if ( Array.isArray( array ) ) {

			colors = new Float32Array( array );

		}

		var instanceColorBuffer = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["InstancedInterleavedBuffer"]( colors, 6, 1 ); // rgb, rgb

		this.setAttribute( 'instanceColorStart', new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["InterleavedBufferAttribute"]( instanceColorBuffer, 3, 0 ) ); // rgb
		this.setAttribute( 'instanceColorEnd', new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["InterleavedBufferAttribute"]( instanceColorBuffer, 3, 3 ) ); // rgb

		return this;

	},

	fromWireframeGeometry: function ( geometry ) {

		this.setPositions( geometry.attributes.position.array );

		return this;

	},

	fromEdgesGeometry: function ( geometry ) {

		this.setPositions( geometry.attributes.position.array );

		return this;

	},

	fromMesh: function ( mesh ) {

		this.fromWireframeGeometry( new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["WireframeGeometry"]( mesh.geometry ) );

		// set colors, maybe

		return this;

	},

	fromLineSegments: function ( lineSegments ) {

		var geometry = lineSegments.geometry;

		if ( geometry.isGeometry ) {

			this.setPositions( geometry.vertices );

		} else if ( geometry.isBufferGeometry ) {

			this.setPositions( geometry.attributes.position.array ); // assumes non-indexed

		}

		// set colors, maybe

		return this;

	},

	computeBoundingBox: function () {

		var box = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Box3"]();

		return function computeBoundingBox() {

			if ( this.boundingBox === null ) {

				this.boundingBox = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Box3"]();

			}

			var start = this.attributes.instanceStart;
			var end = this.attributes.instanceEnd;

			if ( start !== undefined && end !== undefined ) {

				this.boundingBox.setFromBufferAttribute( start );

				box.setFromBufferAttribute( end );

				this.boundingBox.union( box );

			}

		};

	}(),

	computeBoundingSphere: function () {

		var vector = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();

		return function computeBoundingSphere() {

			if ( this.boundingSphere === null ) {

				this.boundingSphere = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Sphere"]();

			}

			if ( this.boundingBox === null ) {

				this.computeBoundingBox();

			}

			var start = this.attributes.instanceStart;
			var end = this.attributes.instanceEnd;

			if ( start !== undefined && end !== undefined ) {

				var center = this.boundingSphere.center;

				this.boundingBox.getCenter( center );

				var maxRadiusSq = 0;

				for ( var i = 0, il = start.count; i < il; i ++ ) {

					vector.fromBufferAttribute( start, i );
					maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( vector ) );

					vector.fromBufferAttribute( end, i );
					maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( vector ) );

				}

				this.boundingSphere.radius = Math.sqrt( maxRadiusSq );

				if ( isNaN( this.boundingSphere.radius ) ) {

					console.error( 'THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.', this );

				}

			}

		};

	}(),

	toJSON: function () {

		// todo

	},

	applyMatrix: function ( matrix ) {

		console.warn( 'THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4().' );

		return this.applyMatrix4( matrix );

	}

} );




/***/ }),

/***/ "./src/app/network-graph/components/group-layout/group-layout.component.ngfactory.js":
/*!*******************************************************************************************!*\
  !*** ./src/app/network-graph/components/group-layout/group-layout.component.ngfactory.js ***!
  \*******************************************************************************************/
/*! exports provided: RenderType_GroupLayoutComponent, View_GroupLayoutComponent_0, View_GroupLayoutComponent_Host_0, GroupLayoutComponentNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderType_GroupLayoutComponent", function() { return RenderType_GroupLayoutComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_GroupLayoutComponent_0", function() { return View_GroupLayoutComponent_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "View_GroupLayoutComponent_Host_0", function() { return View_GroupLayoutComponent_Host_0; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupLayoutComponentNgFactory", function() { return GroupLayoutComponentNgFactory; });
/* harmony import */ var _group_layout_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./group-layout.component.scss.shim.ngstyle */ "./src/app/network-graph/components/group-layout/group-layout.component.scss.shim.ngstyle.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _group_layout_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./group-layout.component */ "./src/app/network-graph/components/group-layout/group-layout.component.ts");
/* harmony import */ var _three_services_three_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../three/services/three.service */ "./src/app/three/services/three.service.ts");
/* harmony import */ var _services_network_graph_request_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/network-graph-request.service */ "./src/app/network-graph/services/network-graph-request.service.ts");
/* harmony import */ var _services_three_factory_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/three-factory.service */ "./src/app/network-graph/services/three-factory.service.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 






var styles_GroupLayoutComponent = [_group_layout_component_scss_shim_ngstyle__WEBPACK_IMPORTED_MODULE_0__["styles"]];
var RenderType_GroupLayoutComponent = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵcrt"]({ encapsulation: 0, styles: styles_GroupLayoutComponent, data: {} });

function View_GroupLayoutComponent_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](671088640, 1, { canvasEl: 0 }), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵqud"](671088640, 2, { statsEl: 0 }), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](2, 0, [[2, 0], ["stats", 1]], null, 35, "section", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](3, 0, null, null, 1, "h5", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Group Layout"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](5, 0, null, null, 1, "h5", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](6, null, ["Render Calls: ", ""])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](7, 0, null, null, 29, "section", [["style", "display: flex; border: solid 1px; padding: 10px; margin: 10px"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](8, 0, null, null, 16, "div", [["style", "flex: 1 0 0; padding: 10px; border: solid 1px"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](9, 0, null, null, 1, "h5", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Node Metrics"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](11, 0, null, null, 6, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](12, 0, null, null, 2, "label", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](13, 0, null, null, 0, "input", [["name", "nodeGeometryType"], ["type", "radio"], ["value", "obj"]], null, [[null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("change" === en)) {
        var pd_0 = (_co.nodeGeometryChangeHandler($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Obj file "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](15, 0, null, null, 2, "label", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](16, 0, null, null, 0, "input", [["name", "nodeGeometryType"], ["type", "radio"], ["value", "buffer"]], null, [[null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("change" === en)) {
        var pd_0 = (_co.nodeGeometryChangeHandler($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Buffer geometry "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](18, 0, null, null, 2, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](19, 0, null, null, 1, "h5", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](20, null, ["Object Count: ", ""])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](21, 0, null, null, 3, "div", [["class", "app--margin__vertical object-range"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](22, 0, null, null, 2, "label", [["for", "points"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Node Count "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](24, 0, null, null, 0, "input", [["id", "points"], ["max", "10000"], ["min", "2"], ["name", "points"], ["step", "1"], ["type", "range"]], [[8, "value", 0]], [[null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("change" === en)) {
        var pd_0 = (_co.objectCountChangeHandler($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](25, 0, null, null, 11, "div", [["style", "flex: 1 0 0; padding: 10px; border: solid 1px"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](26, 0, null, null, 1, "h5", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, ["Connection Metric"])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](28, 0, null, null, 4, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](29, 0, null, null, 1, "h5", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](30, null, ["Max Connections (N * N) : ", ""])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](31, 0, null, null, 1, "h5", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](32, null, ["Connection Count: ", ""])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](33, 0, null, null, 3, "div", [], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](34, 0, null, null, 2, "label", [["for", "enable"]], null, null, null, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](35, 0, null, null, 0, "input", [["id", "enable"], ["name", "enable"], ["type", "checkbox"]], [[8, "checked", 0]], [[null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("change" === en)) {
        var pd_0 = (_co.connectionStateHandler($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵted"](-1, null, [" Enable connections. "])), (_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](37, 0, [[1, 0], ["canvasEl", 1]], null, 0, "canvas", [["height", "500"], ["width", "1000"]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.clickHandler($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.renderCalls; _ck(_v, 6, 0, currVal_0); var currVal_1 = _co.objectCount; _ck(_v, 20, 0, currVal_1); var currVal_2 = _co.objectCount; _ck(_v, 24, 0, currVal_2); var currVal_3 = (_co.objectCount * _co.objectCount); _ck(_v, 30, 0, currVal_3); var currVal_4 = _co.connectionCount; _ck(_v, 32, 0, currVal_4); var currVal_5 = _co.enableConnections; _ck(_v, 35, 0, currVal_5); }); }
function View_GroupLayoutComponent_Host_0(_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵvid"](0, [(_l()(), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵeld"](0, 0, null, null, 1, "app-group-layout", [], null, null, null, View_GroupLayoutComponent_0, RenderType_GroupLayoutComponent)), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵdid"](1, 4308992, null, 0, _group_layout_component__WEBPACK_IMPORTED_MODULE_2__["GroupLayoutComponent"], [_three_services_three_service__WEBPACK_IMPORTED_MODULE_3__["ThreeService"], _services_network_graph_request_service__WEBPACK_IMPORTED_MODULE_4__["NetworkGraphRequestService"], _services_three_factory_service__WEBPACK_IMPORTED_MODULE_5__["ThreeFactoryService"]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var GroupLayoutComponentNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵccf"]("app-group-layout", _group_layout_component__WEBPACK_IMPORTED_MODULE_2__["GroupLayoutComponent"], View_GroupLayoutComponent_Host_0, {}, {}, []);



/***/ }),

/***/ "./src/app/network-graph/components/group-layout/group-layout.component.scss.shim.ngstyle.js":
/*!***************************************************************************************************!*\
  !*** ./src/app/network-graph/components/group-layout/group-layout.component.scss.shim.ngstyle.js ***!
  \***************************************************************************************************/
/*! exports provided: styles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "styles", function() { return styles; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
var styles = ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL25ldHdvcmstZ3JhcGgvY29tcG9uZW50cy9ncm91cC1sYXlvdXQvZ3JvdXAtbGF5b3V0LmNvbXBvbmVudC5zY3NzIn0= */"];



/***/ }),

/***/ "./src/app/network-graph/components/group-layout/group-layout.component.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/network-graph/components/group-layout/group-layout.component.ts ***!
  \*********************************************************************************/
/*! exports provided: GroupLayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupLayoutComponent", function() { return GroupLayoutComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var three_examples_jsm_lines_LineSegments2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! three/examples/jsm/lines/LineSegments2 */ "./node_modules/three/examples/jsm/lines/LineSegments2.js");
/* harmony import */ var three_examples_jsm_lines_LineSegmentsGeometry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three/examples/jsm/lines/LineSegmentsGeometry */ "./node_modules/three/examples/jsm/lines/LineSegmentsGeometry.js");
/* harmony import */ var _node_modules_stats_js_build_stats_min_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../node_modules/stats.js/build/stats.min.js */ "./node_modules/stats.js/build/stats.min.js");
/* harmony import */ var _node_modules_stats_js_build_stats_min_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_node_modules_stats_js_build_stats_min_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _node_modules_three_examples_jsm_lines_LineMaterial_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../../../../node_modules/three/examples/jsm/lines/LineMaterial.js */ "./node_modules/three/examples/jsm/lines/LineMaterial.js");

/**
 * TODO: check if other possibilities are there for loaded mesh. current 'Group'.
 * TODO: Groups Texture.
 */







var GroupLayoutComponent = /** @class */ (function () {
    function GroupLayoutComponent(threeService, graphRequestService, threeFactory) {
        this.threeService = threeService;
        this.graphRequestService = graphRequestService;
        this.threeFactory = threeFactory;
        this.objectCount = 3;
        this.previousObjectCount = 0;
        this.nodePositionCollection = [];
        this.connectionStep = 1;
        this.connectionCount = "not specified";
        this.enableConnections = false;
        this.noConnectionMesh = false;
        this.raycaster = new three__WEBPACK_IMPORTED_MODULE_3__["Raycaster"]();
        this.traffic = {};
        this.trafficColor = 0x378ef0;
    }
    GroupLayoutComponent.prototype.ngOnInit = function () {
        this.initRequests();
    };
    GroupLayoutComponent.prototype.ngAfterViewInit = function () {
        this.threeCommon = this.threeService.getThreeCommon(this.canvasEl.nativeElement, true);
        this.setUpStats();
        this.threeCommon.camera.position.z = 10;
        this.threeCommon.camera.aspect =
            this.canvasEl.nativeElement.offsetWidth /
                this.canvasEl.nativeElement.offsetHeight;
        this.threeCommon.renderer.setPixelRatio(2);
        this.threeCommon.scene.background = "black";
        this.threeCommon.camera.updateProjectionMatrix();
        this.threeCommon.controls.addEventListener("change", this.requestRenderIfNotRequested.bind(this));
        window.addEventListener("resize", this.requestRenderIfNotRequested.bind(this));
    };
    GroupLayoutComponent.prototype.initRequests = function () {
        var _this = this;
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["forkJoin"])(this.graphRequestService.getGroups(), this.graphRequestService.getNodeMesh()).subscribe(function (_a) {
            var _b = tslib__WEBPACK_IMPORTED_MODULE_0__["__read"](_a, 2), groupData = _b[0], mesh = _b[1];
            _this.nodeMeshResponseHandler(mesh);
            _this.groupsResponseHandler(groupData);
        });
    };
    GroupLayoutComponent.prototype.nodeMeshResponseHandler = function (mesh) {
        this.nodeMeshBuffer = {
            geometry: new three__WEBPACK_IMPORTED_MODULE_3__["SphereBufferGeometry"](1, 10, 10),
            material: new three__WEBPACK_IMPORTED_MODULE_3__["MeshPhongMaterial"]({ color: 0xefefef }),
        };
        if (mesh.type && mesh.type === "Group") {
            this.nodeMesh = mesh.children[0];
        }
        else {
            this.nodeMesh = mesh;
        }
    };
    GroupLayoutComponent.prototype.groupsResponseHandler = function (groupData) {
        this.sceneController();
    };
    GroupLayoutComponent.prototype.constructNodes = function (forceNewMesh) {
        var newMesh = forceNewMesh || !this.instancedNodeMesh;
        if (newMesh) {
            if (this.instancedNodeMesh) {
                this.instancedNodeMesh.geometry.dispose();
                this.instancedNodeMesh.material.dispose();
                this.threeCommon.scene.remove(this.instancedNodeMesh);
            }
            var attrObj = this.loadObjModel ? this.nodeMesh : this.nodeMeshBuffer;
            this.instancedNodeMesh = new three__WEBPACK_IMPORTED_MODULE_3__["InstancedMesh"](attrObj.geometry, attrObj.material, 10000);
        }
        else {
            this.instancedNodeMesh.instanceMatrix.needsUpdate = true;
        }
        for (var i = 0; i < this.objectCount; i++) {
            this.instancedNodeMesh.setMatrixAt(i, this.setPositionFromLayout(i));
        }
        if (this.previousObjectCount > this.objectCount) {
            for (var i = this.objectCount; i < this.previousObjectCount; i++) {
                //using indexes as id.
                var mat = new three__WEBPACK_IMPORTED_MODULE_3__["Matrix4"]();
                this.instancedNodeMesh.setMatrixAt(i, mat);
            }
        }
        this.threeCommon.scene.add(this.instancedNodeMesh);
    };
    GroupLayoutComponent.prototype.setPositionFromTraffic = function (trafficLink) {
        var source = trafficLink.source.position;
        var target = trafficLink.target.position;
        var axis = new three__WEBPACK_IMPORTED_MODULE_3__["Vector3"](0, 1, 0);
        var matrix = new three__WEBPACK_IMPORTED_MODULE_3__["Matrix4"]();
        var quaternion = new three__WEBPACK_IMPORTED_MODULE_3__["Quaternion"]();
        var position = new three__WEBPACK_IMPORTED_MODULE_3__["Vector3"]((source.x + target.x) / 2, (source.y + target.y) / 2, (source.z + target.z) / 2);
        var scale = new three__WEBPACK_IMPORTED_MODULE_3__["Vector3"](1, 1, 1);
        quaternion.setFromUnitVectors(axis, target.clone().sub(source.clone()).normalize());
        matrix.compose(position, quaternion, scale);
        return matrix;
    };
    GroupLayoutComponent.prototype.setPositionFromLayout = function (i) {
        var matrix = new three__WEBPACK_IMPORTED_MODULE_3__["Matrix4"]();
        var rotation = new three__WEBPACK_IMPORTED_MODULE_3__["Euler"]();
        var quaternion = new three__WEBPACK_IMPORTED_MODULE_3__["Quaternion"]();
        var position = new three__WEBPACK_IMPORTED_MODULE_3__["Vector3"]();
        var offset = i * 5;
        position.x = (offset * Math.sin(i)) / Math.sqrt(i + 1);
        position.y = (offset * Math.cos(i)) / Math.sqrt(i + 1);
        position.z = i / 10;
        this.nodePositionCollection.push({ position: position, nodeIndex: i });
        var scale = new three__WEBPACK_IMPORTED_MODULE_3__["Vector3"]();
        quaternion.setFromEuler(rotation);
        scale.x = scale.y = scale.z = 1;
        matrix.compose(position, quaternion, scale);
        return matrix;
    };
    GroupLayoutComponent.prototype.sceneController = function (newMesh) {
        this.constructNodes(!!newMesh);
        if (this.enableConnections) {
            this.configureLineSegmentConnections();
            this.configureDirectionalArrows();
        }
        this.renderView();
    };
    GroupLayoutComponent.prototype.configureDirectionalArrows = function () {
        var _this = this;
        var newMesh = !this.directionInstanceMesh;
        if (newMesh) {
            var geometry = new three__WEBPACK_IMPORTED_MODULE_3__["ConeBufferGeometry"](0.3, 0.8);
            var material = new three__WEBPACK_IMPORTED_MODULE_3__["MeshBasicMaterial"]({
                color: this.trafficColor,
            });
            this.directionInstanceMesh = new three__WEBPACK_IMPORTED_MODULE_3__["InstancedMesh"](geometry, material, 10000);
        }
        else {
            this.directionInstanceMesh.instanceMatrix.needsUpdate = true;
        }
        console.log(this.directionInstanceMesh.countx);
        for (var index = 0; index < this.directionInstanceMesh.count; index++) {
            this.directionInstanceMesh.setMatrixAt(index, new three__WEBPACK_IMPORTED_MODULE_3__["Matrix4"]());
        }
        Object.keys(this.traffic).forEach(function (key, index) {
            _this.directionInstanceMesh.setMatrixAt(index, _this.setPositionFromTraffic(_this.traffic[key]));
        });
        this.threeCommon.scene.add(this.directionInstanceMesh);
        //     const geometry = new THREE.ConeGeometry(0.2, 0.6);
        //  const material = new THREE.MeshPhongMaterial({
        //   color: 0x2984cf,
        //  emissive: 0x2984cf
        //  });
        //  const cone = new THREE.Mesh(geometry, material);
        //  cone.position.y = target.distanceTo(source) / 2;
        //  cone.scale.set(0.5, 0.5, 0.5);
        //  target.sub(source).normalize();
        //  this.arrowHelper = new THREE.ArrowHelper(target, source, 0);
        //  this.arrowHelper.cone.copy(cone);
        //  this.threeCommon.scene.add(this.arrowHelper);
    };
    GroupLayoutComponent.prototype.configureLineSegmentConnections = function () {
        this.connectionCount = 0;
        this.traffic = {};
        var lineGeometry = new three_examples_jsm_lines_LineSegmentsGeometry__WEBPACK_IMPORTED_MODULE_5__["LineSegmentsGeometry"]();
        var positions = [];
        var colors = [];
        var matLine = new _node_modules_three_examples_jsm_lines_LineMaterial_js__WEBPACK_IMPORTED_MODULE_7__["LineMaterial"]({
            color: this.trafficColor,
            vertexColors: true,
            dashed: false,
            linewidth: 3,
        });
        matLine.resolution.set(this.canvasEl.nativeElement.offsetWidth, this.canvasEl.nativeElement.offsetHeight);
        var colorRGB = new three__WEBPACK_IMPORTED_MODULE_3__["Color"](this.trafficColor).convertLinearToSRGB();
        for (var index = 0; index < this.nodePositionCollection.length - 1; index++) {
            var source = this.nodePositionCollection[index];
            var target = this.nodePositionCollection[index + 1];
            this.traffic[index] = { source: source, target: target };
            positions.push(source.position.x, source.position.y, source.position.z, target.position.x, target.position.y, target.position.z);
            colors.push(colorRGB.r, colorRGB.g, colorRGB.b, colorRGB.r, colorRGB.g, colorRGB.b);
            this.connectionCount++;
        }
        lineGeometry.setPositions(new Float32Array(positions));
        lineGeometry.setColors(colors);
        this.line = new three_examples_jsm_lines_LineSegments2__WEBPACK_IMPORTED_MODULE_4__["LineSegments2"](lineGeometry, matLine);
        this.line.userData = { __graphObj: "connection" };
        this.threeCommon.scene.add(this.line);
    };
    GroupLayoutComponent.prototype.lineClickHandler = function (raycastObj) {
        var _connection = this.traffic[raycastObj.faceIndex];
        console.log("faceIndex", raycastObj.faceIndex, _connection);
    };
    GroupLayoutComponent.prototype.setUpStats = function () {
        this.stats = new _node_modules_stats_js_build_stats_min_js__WEBPACK_IMPORTED_MODULE_6__();
        this.stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
        this.statsEl.nativeElement.appendChild(this.stats.dom);
        this.updateStats();
    };
    GroupLayoutComponent.prototype.updateStats = function () {
        this.stats.update();
        window.requestAnimationFrame(this.updateStats.bind(this));
    };
    // event handlers
    GroupLayoutComponent.prototype.clickHandler = function (event) {
        event.preventDefault();
        var canvasBounds = this.threeCommon.renderer.context.canvas.getBoundingClientRect();
        this.mouse = this.mouse || new three__WEBPACK_IMPORTED_MODULE_3__["Vector3"]();
        this.mouse.x =
            ((event.clientX - canvasBounds.left) /
                (canvasBounds.right - canvasBounds.left)) *
                2 -
                1;
        this.mouse.y =
            -((event.clientY - canvasBounds.top) /
                (canvasBounds.bottom - canvasBounds.top)) *
                2 +
                1;
        this.renderView();
    };
    GroupLayoutComponent.prototype.objectCountChangeHandler = function ($event) {
        this.threeService.cleanScene(this.threeCommon);
        this.nodePositionCollection = [];
        this.previousObjectCount = this.objectCount;
        this.objectCount = Number.parseInt($event.target.value, 10);
        this.connectionStep = this.objectCount;
        this.sceneController();
    };
    GroupLayoutComponent.prototype.connectionStepHandler = function ($event) {
        this.threeService.cleanScene(this.threeCommon);
        this.nodePositionCollection = [];
        this.connectionStep = Number.parseInt($event.target.value, 10);
        this.sceneController();
    };
    GroupLayoutComponent.prototype.connectionStateHandler = function ($event) {
        this.threeService.cleanScene(this.threeCommon);
        this.nodePositionCollection = [];
        this.enableConnections = $event.target.checked;
        this.sceneController();
    };
    GroupLayoutComponent.prototype.meshTypeStateHandler = function ($event) {
        this.threeService.cleanScene(this.threeCommon);
        this.nodePositionCollection = [];
        this.noConnectionMesh = $event.target.checked;
        this.sceneController();
    };
    GroupLayoutComponent.prototype.nodeGeometryChangeHandler = function ($event) {
        this.threeService.cleanScene(this.threeCommon);
        this.loadObjModel = $event.target.value === "obj";
        this.sceneController(true);
    };
    GroupLayoutComponent.prototype.renderView = function () {
        // this.configureRaycast();
        this.renderRequested = false;
        if (this.resizeRendererToDisplaySize(this.threeCommon.renderer)) {
            var canvas = this.threeCommon.renderer.domElement;
            this.threeCommon.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.threeCommon.camera.updateProjectionMatrix();
        }
        this.threeCommon.renderer.render(this.threeCommon.scene, this.threeCommon.camera);
        this.renderCalls = this.threeService.getRendererCallCount(this.threeCommon.renderer);
    };
    GroupLayoutComponent.prototype.resizeRendererToDisplaySize = function (renderer) {
        var canvas = renderer.domElement;
        var width = canvas.clientWidth;
        var height = canvas.clientHeight;
        var needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    };
    GroupLayoutComponent.prototype.requestRenderIfNotRequested = function () {
        if (!this.renderRequested) {
            this.renderRequested = true;
            window.requestAnimationFrame(this.renderView.bind(this));
        }
    };
    GroupLayoutComponent.prototype.configureRaycast = function () {
        // if (this.mouse) {
        //   this.raycaster.setFromCamera(this.mouse, this.threeCommon.camera);
        //   // const intersects = this.raycaster.intersectObjects(
        //   //   this.threeCommon.scene.children
        //   // );
        //   // console.log(intersects);
        //   const lineRaycast = this.raycaster.intersectObjects([this.line]);
        //   if (
        //     lineRaycast &&
        //     lineRaycast[0] &&
        //     lineRaycast[0].object &&
        //     lineRaycast[0].object.userData &&
        //     lineRaycast[0].object.userData.__graphObj === "connection"
        //   ) {
        //     this.lineClickHandler(lineRaycast[0]);
        //   }
        // }
    };
    return GroupLayoutComponent;
}());



/***/ }),

/***/ "./src/app/network-graph/network-graph-routing.module.ts":
/*!***************************************************************!*\
  !*** ./src/app/network-graph/network-graph-routing.module.ts ***!
  \***************************************************************/
/*! exports provided: NetworkGraphRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkGraphRoutingModule", function() { return NetworkGraphRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _common_enums_network_graph_routes_enum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/enums/network-graph-routes.enum */ "./src/app/common/enums/network-graph-routes.enum.ts");
/* harmony import */ var _components_group_layout_group_layout_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/group-layout/group-layout.component */ "./src/app/network-graph/components/group-layout/group-layout.component.ts");



var routes = [
    {
        path: "" + _common_enums_network_graph_routes_enum__WEBPACK_IMPORTED_MODULE_1__["NetworkGraphRoutes"].groupLayout,
        component: _components_group_layout_group_layout_component__WEBPACK_IMPORTED_MODULE_2__["GroupLayoutComponent"],
    },
    {
        path: "",
        component: _components_group_layout_group_layout_component__WEBPACK_IMPORTED_MODULE_2__["GroupLayoutComponent"],
    },
];
var NetworkGraphRoutingModule = /** @class */ (function () {
    function NetworkGraphRoutingModule() {
    }
    return NetworkGraphRoutingModule;
}());



/***/ }),

/***/ "./src/app/network-graph/network-graph.module.ngfactory.js":
/*!*****************************************************************!*\
  !*** ./src/app/network-graph/network-graph.module.ngfactory.js ***!
  \*****************************************************************/
/*! exports provided: NetworkGraphModuleNgFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkGraphModuleNgFactory", function() { return NetworkGraphModuleNgFactory; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _network_graph_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./network-graph.module */ "./src/app/network-graph/network-graph.module.ts");
/* harmony import */ var _node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/@angular/router/router.ngfactory */ "./node_modules/@angular/router/router.ngfactory.js");
/* harmony import */ var _components_group_layout_group_layout_component_ngfactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/group-layout/group-layout.component.ngfactory */ "./src/app/network-graph/components/group-layout/group-layout.component.ngfactory.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _network_graph_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./network-graph-routing.module */ "./src/app/network-graph/network-graph-routing.module.ts");
/* harmony import */ var _components_group_layout_group_layout_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/group-layout/group-layout.component */ "./src/app/network-graph/components/group-layout/group-layout.component.ts");
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 








var NetworkGraphModuleNgFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵcmf"](_network_graph_module__WEBPACK_IMPORTED_MODULE_1__["NetworkGraphModule"], [], function (_l) { return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmod"]([_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](512, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵCodegenComponentFactoryResolver"], [[8, [_node_modules_angular_router_router_ngfactory__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_router_router_lNgFactory"], _components_group_layout_group_layout_component_ngfactory__WEBPACK_IMPORTED_MODULE_3__["GroupLayoutComponentNgFactory"]]], [3, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"]], _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModuleRef"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](4608, _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgLocalization"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgLocaleLocalization"], [_angular_core__WEBPACK_IMPORTED_MODULE_0__["LOCALE_ID"], [2, _angular_common__WEBPACK_IMPORTED_MODULE_4__["ɵangular_packages_common_common_a"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"], [[2, _angular_router__WEBPACK_IMPORTED_MODULE_5__["ɵangular_packages_router_router_a"]], [2, _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _network_graph_routing_module__WEBPACK_IMPORTED_MODULE_6__["NetworkGraphRoutingModule"], _network_graph_routing_module__WEBPACK_IMPORTED_MODULE_6__["NetworkGraphRoutingModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1073742336, _network_graph_module__WEBPACK_IMPORTED_MODULE_1__["NetworkGraphModule"], _network_graph_module__WEBPACK_IMPORTED_MODULE_1__["NetworkGraphModule"], []), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵmpd"](1024, _angular_router__WEBPACK_IMPORTED_MODULE_5__["ROUTES"], function () { return [[{ path: "group-layout", component: _components_group_layout_group_layout_component__WEBPACK_IMPORTED_MODULE_7__["GroupLayoutComponent"] }, { path: "", component: _components_group_layout_group_layout_component__WEBPACK_IMPORTED_MODULE_7__["GroupLayoutComponent"] }]]; }, [])]); });



/***/ }),

/***/ "./src/app/network-graph/network-graph.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/network-graph/network-graph.module.ts ***!
  \*******************************************************/
/*! exports provided: NetworkGraphModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkGraphModule", function() { return NetworkGraphModule; });
var NetworkGraphModule = /** @class */ (function () {
    function NetworkGraphModule() {
    }
    return NetworkGraphModule;
}());



/***/ }),

/***/ "./src/app/network-graph/services/network-graph-request.service.ts":
/*!*************************************************************************!*\
  !*** ./src/app/network-graph/services/network-graph-request.service.ts ***!
  \*************************************************************************/
/*! exports provided: NetworkGraphRequestService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NetworkGraphRequestService", function() { return NetworkGraphRequestService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _node_modules_three_examples_jsm_loaders_OBJLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../../node_modules/three/examples/jsm/loaders/OBJLoader */ "./node_modules/three/examples/jsm/loaders/OBJLoader.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");




var NetworkGraphRequestService = /** @class */ (function () {
    function NetworkGraphRequestService(httpClient) {
        this.httpClient = httpClient;
        this.GEOMETRY_URL = "assets/network-graph/geometry/node.obj";
        this.MOCK_GROUPS_URL = "assets/network-graph/server/groups.json";
        this.MOCK_CONNECTIONS_URL = "assets/network-graph/server/connections.json";
    }
    NetworkGraphRequestService.prototype.getNodeMesh = function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["from"])(new _node_modules_three_examples_jsm_loaders_OBJLoader__WEBPACK_IMPORTED_MODULE_1__["OBJLoader"]().loadAsync(this.GEOMETRY_URL));
    };
    NetworkGraphRequestService.prototype.getGroups = function () {
        return this.httpClient.get(this.MOCK_GROUPS_URL);
    };
    NetworkGraphRequestService.prototype.getTrafficConnections = function () {
        return this.httpClient.get(this.MOCK_CONNECTIONS_URL);
    };
    NetworkGraphRequestService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ factory: function NetworkGraphRequestService_Factory() { return new NetworkGraphRequestService(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"])); }, token: NetworkGraphRequestService, providedIn: "root" });
    return NetworkGraphRequestService;
}());



/***/ }),

/***/ "./src/app/network-graph/services/three-factory.service.ts":
/*!*****************************************************************!*\
  !*** ./src/app/network-graph/services/three-factory.service.ts ***!
  \*****************************************************************/
/*! exports provided: ThreeFactoryService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThreeFactoryService", function() { return ThreeFactoryService; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ThreeFactoryService = /** @class */ (function () {
    function ThreeFactoryService() {
    }
    ThreeFactoryService.prototype.getLine = function () {
        var lineMaterial = new three__WEBPACK_IMPORTED_MODULE_0__["LineBasicMaterial"]({ color: 0x216491 });
        var lineGeometry = new three__WEBPACK_IMPORTED_MODULE_0__["BufferGeometry"]();
        return new three__WEBPACK_IMPORTED_MODULE_0__["Line"](lineGeometry, lineMaterial);
    };
    ThreeFactoryService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ factory: function ThreeFactoryService_Factory() { return new ThreeFactoryService(); }, token: ThreeFactoryService, providedIn: "root" });
    return ThreeFactoryService;
}());



/***/ })

}]);
//# sourceMappingURL=network-graph-network-graph-module-ngfactory-es5.js.map