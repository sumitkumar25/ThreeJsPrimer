(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~network-graph-network-graph-module-ngfactory~three-optimized-three-optimized-module-ngfactory"],{

/***/ "./node_modules/stats.js/build/stats.min.js":
/*!**************************************************!*\
  !*** ./node_modules/stats.js/build/stats.min.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// stats.js - http://github.com/mrdoob/stats.js
(function(f,e){ true?module.exports=e():undefined})(this,function(){var f=function(){function e(a){c.appendChild(a.dom);return a}function u(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();
u(++l%c.children.length)},!1);var k=(performance||Date).now(),g=k,a=0,r=e(new f.Panel("FPS","#0ff","#002")),h=e(new f.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var t=e(new f.Panel("MB","#f08","#201"));u(0);return{REVISION:16,dom:c,addPanel:e,showPanel:u,begin:function(){k=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();h.update(c-k,200);if(c>g+1E3&&(r.update(1E3*a/(c-g),100),g=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/
1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){k=this.end()},domElement:c,setMode:u}};f.Panel=function(e,f,l){var c=Infinity,k=0,g=Math.round,a=g(window.devicePixelRatio||1),r=80*a,h=48*a,t=3*a,v=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=h;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,h);b.fillStyle=f;b.fillText(e,t,v);
b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(h,w){c=Math.min(c,h);k=Math.max(k,h);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=f;b.fillText(g(h)+" "+e+" ("+g(c)+"-"+g(k)+")",t,v);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,g((1-h/w)*p))}}};return f});


/***/ }),

/***/ "./node_modules/three/examples/jsm/loaders/OBJLoader.js":
/*!**************************************************************!*\
  !*** ./node_modules/three/examples/jsm/loaders/OBJLoader.js ***!
  \**************************************************************/
/*! exports provided: OBJLoader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OBJLoader", function() { return OBJLoader; });
/* harmony import */ var _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../build/three.module.js */ "./node_modules/three/build/three.module.js");


var OBJLoader = ( function () {

	// o object_name | g group_name
	var object_pattern = /^[og]\s*(.+)?/;
	// mtllib file_reference
	var material_library_pattern = /^mtllib /;
	// usemtl material_name
	var material_use_pattern = /^usemtl /;
	// usemap map_name
	var map_use_pattern = /^usemap /;

	var vA = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
	var vB = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
	var vC = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();

	var ab = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();
	var cb = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Vector3"]();

	function ParserState() {

		var state = {
			objects: [],
			object: {},

			vertices: [],
			normals: [],
			colors: [],
			uvs: [],

			materials: {},
			materialLibraries: [],

			startObject: function ( name, fromDeclaration ) {

				// If the current object (initial from reset) is not from a g/o declaration in the parsed
				// file. We need to use it for the first parsed g/o to keep things in sync.
				if ( this.object && this.object.fromDeclaration === false ) {

					this.object.name = name;
					this.object.fromDeclaration = ( fromDeclaration !== false );
					return;

				}

				var previousMaterial = ( this.object && typeof this.object.currentMaterial === 'function' ? this.object.currentMaterial() : undefined );

				if ( this.object && typeof this.object._finalize === 'function' ) {

					this.object._finalize( true );

				}

				this.object = {
					name: name || '',
					fromDeclaration: ( fromDeclaration !== false ),

					geometry: {
						vertices: [],
						normals: [],
						colors: [],
						uvs: [],
						hasUVIndices: false
					},
					materials: [],
					smooth: true,

					startMaterial: function ( name, libraries ) {

						var previous = this._finalize( false );

						// New usemtl declaration overwrites an inherited material, except if faces were declared
						// after the material, then it must be preserved for proper MultiMaterial continuation.
						if ( previous && ( previous.inherited || previous.groupCount <= 0 ) ) {

							this.materials.splice( previous.index, 1 );

						}

						var material = {
							index: this.materials.length,
							name: name || '',
							mtllib: ( Array.isArray( libraries ) && libraries.length > 0 ? libraries[ libraries.length - 1 ] : '' ),
							smooth: ( previous !== undefined ? previous.smooth : this.smooth ),
							groupStart: ( previous !== undefined ? previous.groupEnd : 0 ),
							groupEnd: - 1,
							groupCount: - 1,
							inherited: false,

							clone: function ( index ) {

								var cloned = {
									index: ( typeof index === 'number' ? index : this.index ),
									name: this.name,
									mtllib: this.mtllib,
									smooth: this.smooth,
									groupStart: 0,
									groupEnd: - 1,
									groupCount: - 1,
									inherited: false
								};
								cloned.clone = this.clone.bind( cloned );
								return cloned;

							}
						};

						this.materials.push( material );

						return material;

					},

					currentMaterial: function () {

						if ( this.materials.length > 0 ) {

							return this.materials[ this.materials.length - 1 ];

						}

						return undefined;

					},

					_finalize: function ( end ) {

						var lastMultiMaterial = this.currentMaterial();
						if ( lastMultiMaterial && lastMultiMaterial.groupEnd === - 1 ) {

							lastMultiMaterial.groupEnd = this.geometry.vertices.length / 3;
							lastMultiMaterial.groupCount = lastMultiMaterial.groupEnd - lastMultiMaterial.groupStart;
							lastMultiMaterial.inherited = false;

						}

						// Ignore objects tail materials if no face declarations followed them before a new o/g started.
						if ( end && this.materials.length > 1 ) {

							for ( var mi = this.materials.length - 1; mi >= 0; mi -- ) {

								if ( this.materials[ mi ].groupCount <= 0 ) {

									this.materials.splice( mi, 1 );

								}

							}

						}

						// Guarantee at least one empty material, this makes the creation later more straight forward.
						if ( end && this.materials.length === 0 ) {

							this.materials.push( {
								name: '',
								smooth: this.smooth
							} );

						}

						return lastMultiMaterial;

					}
				};

				// Inherit previous objects material.
				// Spec tells us that a declared material must be set to all objects until a new material is declared.
				// If a usemtl declaration is encountered while this new object is being parsed, it will
				// overwrite the inherited material. Exception being that there was already face declarations
				// to the inherited material, then it will be preserved for proper MultiMaterial continuation.

				if ( previousMaterial && previousMaterial.name && typeof previousMaterial.clone === 'function' ) {

					var declared = previousMaterial.clone( 0 );
					declared.inherited = true;
					this.object.materials.push( declared );

				}

				this.objects.push( this.object );

			},

			finalize: function () {

				if ( this.object && typeof this.object._finalize === 'function' ) {

					this.object._finalize( true );

				}

			},

			parseVertexIndex: function ( value, len ) {

				var index = parseInt( value, 10 );
				return ( index >= 0 ? index - 1 : index + len / 3 ) * 3;

			},

			parseNormalIndex: function ( value, len ) {

				var index = parseInt( value, 10 );
				return ( index >= 0 ? index - 1 : index + len / 3 ) * 3;

			},

			parseUVIndex: function ( value, len ) {

				var index = parseInt( value, 10 );
				return ( index >= 0 ? index - 1 : index + len / 2 ) * 2;

			},

			addVertex: function ( a, b, c ) {

				var src = this.vertices;
				var dst = this.object.geometry.vertices;

				dst.push( src[ a + 0 ], src[ a + 1 ], src[ a + 2 ] );
				dst.push( src[ b + 0 ], src[ b + 1 ], src[ b + 2 ] );
				dst.push( src[ c + 0 ], src[ c + 1 ], src[ c + 2 ] );

			},

			addVertexPoint: function ( a ) {

				var src = this.vertices;
				var dst = this.object.geometry.vertices;

				dst.push( src[ a + 0 ], src[ a + 1 ], src[ a + 2 ] );

			},

			addVertexLine: function ( a ) {

				var src = this.vertices;
				var dst = this.object.geometry.vertices;

				dst.push( src[ a + 0 ], src[ a + 1 ], src[ a + 2 ] );

			},

			addNormal: function ( a, b, c ) {

				var src = this.normals;
				var dst = this.object.geometry.normals;

				dst.push( src[ a + 0 ], src[ a + 1 ], src[ a + 2 ] );
				dst.push( src[ b + 0 ], src[ b + 1 ], src[ b + 2 ] );
				dst.push( src[ c + 0 ], src[ c + 1 ], src[ c + 2 ] );

			},

			addFaceNormal: function ( a, b, c ) {

				var src = this.vertices;
				var dst = this.object.geometry.normals;

				vA.fromArray( src, a );
				vB.fromArray( src, b );
				vC.fromArray( src, c );

				cb.subVectors( vC, vB );
				ab.subVectors( vA, vB );
				cb.cross( ab );

				cb.normalize();

				dst.push( cb.x, cb.y, cb.z );
				dst.push( cb.x, cb.y, cb.z );
				dst.push( cb.x, cb.y, cb.z );

			},

			addColor: function ( a, b, c ) {

				var src = this.colors;
				var dst = this.object.geometry.colors;

				if ( src[ a ] !== undefined ) dst.push( src[ a + 0 ], src[ a + 1 ], src[ a + 2 ] );
				if ( src[ b ] !== undefined ) dst.push( src[ b + 0 ], src[ b + 1 ], src[ b + 2 ] );
				if ( src[ c ] !== undefined ) dst.push( src[ c + 0 ], src[ c + 1 ], src[ c + 2 ] );

			},

			addUV: function ( a, b, c ) {

				var src = this.uvs;
				var dst = this.object.geometry.uvs;

				dst.push( src[ a + 0 ], src[ a + 1 ] );
				dst.push( src[ b + 0 ], src[ b + 1 ] );
				dst.push( src[ c + 0 ], src[ c + 1 ] );

			},

			addDefaultUV: function () {

				var dst = this.object.geometry.uvs;

				dst.push( 0, 0 );
				dst.push( 0, 0 );
				dst.push( 0, 0 );

			},

			addUVLine: function ( a ) {

				var src = this.uvs;
				var dst = this.object.geometry.uvs;

				dst.push( src[ a + 0 ], src[ a + 1 ] );

			},

			addFace: function ( a, b, c, ua, ub, uc, na, nb, nc ) {

				var vLen = this.vertices.length;

				var ia = this.parseVertexIndex( a, vLen );
				var ib = this.parseVertexIndex( b, vLen );
				var ic = this.parseVertexIndex( c, vLen );

				this.addVertex( ia, ib, ic );
				this.addColor( ia, ib, ic );

				// normals

				if ( na !== undefined && na !== '' ) {

					var nLen = this.normals.length;

					ia = this.parseNormalIndex( na, nLen );
					ib = this.parseNormalIndex( nb, nLen );
					ic = this.parseNormalIndex( nc, nLen );

					this.addNormal( ia, ib, ic );

				} else {

					this.addFaceNormal( ia, ib, ic );

				}

				// uvs

				if ( ua !== undefined && ua !== '' ) {

					var uvLen = this.uvs.length;

					ia = this.parseUVIndex( ua, uvLen );
					ib = this.parseUVIndex( ub, uvLen );
					ic = this.parseUVIndex( uc, uvLen );

					this.addUV( ia, ib, ic );

					this.object.geometry.hasUVIndices = true;

				} else {

					// add placeholder values (for inconsistent face definitions)

					this.addDefaultUV();

				}

			},

			addPointGeometry: function ( vertices ) {

				this.object.geometry.type = 'Points';

				var vLen = this.vertices.length;

				for ( var vi = 0, l = vertices.length; vi < l; vi ++ ) {

					this.addVertexPoint( this.parseVertexIndex( vertices[ vi ], vLen ) );

				}

			},

			addLineGeometry: function ( vertices, uvs ) {

				this.object.geometry.type = 'Line';

				var vLen = this.vertices.length;
				var uvLen = this.uvs.length;

				for ( var vi = 0, l = vertices.length; vi < l; vi ++ ) {

					this.addVertexLine( this.parseVertexIndex( vertices[ vi ], vLen ) );

				}

				for ( var uvi = 0, l = uvs.length; uvi < l; uvi ++ ) {

					this.addUVLine( this.parseUVIndex( uvs[ uvi ], uvLen ) );

				}

			}

		};

		state.startObject( '', false );

		return state;

	}

	//

	function OBJLoader( manager ) {

		_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Loader"].call( this, manager );

		this.materials = null;

	}

	OBJLoader.prototype = Object.assign( Object.create( _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Loader"].prototype ), {

		constructor: OBJLoader,

		load: function ( url, onLoad, onProgress, onError ) {

			var scope = this;

			var loader = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["FileLoader"]( this.manager );
			loader.setPath( this.path );
			loader.setRequestHeader( this.requestHeader );
			loader.setWithCredentials( this.withCredentials );
			loader.load( url, function ( text ) {

				try {

					onLoad( scope.parse( text ) );

				} catch ( e ) {

					if ( onError ) {

						onError( e );

					} else {

						console.error( e );

					}

					scope.manager.itemError( url );

				}

			}, onProgress, onError );

		},

		setMaterials: function ( materials ) {

			this.materials = materials;

			return this;

		},

		parse: function ( text ) {

			var state = new ParserState();

			if ( text.indexOf( '\r\n' ) !== - 1 ) {

				// This is faster than String.split with regex that splits on both
				text = text.replace( /\r\n/g, '\n' );

			}

			if ( text.indexOf( '\\\n' ) !== - 1 ) {

				// join lines separated by a line continuation character (\)
				text = text.replace( /\\\n/g, '' );

			}

			var lines = text.split( '\n' );
			var line = '', lineFirstChar = '';
			var lineLength = 0;
			var result = [];

			// Faster to just trim left side of the line. Use if available.
			var trimLeft = ( typeof ''.trimLeft === 'function' );

			for ( var i = 0, l = lines.length; i < l; i ++ ) {

				line = lines[ i ];

				line = trimLeft ? line.trimLeft() : line.trim();

				lineLength = line.length;

				if ( lineLength === 0 ) continue;

				lineFirstChar = line.charAt( 0 );

				// @todo invoke passed in handler if any
				if ( lineFirstChar === '#' ) continue;

				if ( lineFirstChar === 'v' ) {

					var data = line.split( /\s+/ );

					switch ( data[ 0 ] ) {

						case 'v':
							state.vertices.push(
								parseFloat( data[ 1 ] ),
								parseFloat( data[ 2 ] ),
								parseFloat( data[ 3 ] )
							);
							if ( data.length >= 7 ) {

								state.colors.push(
									parseFloat( data[ 4 ] ),
									parseFloat( data[ 5 ] ),
									parseFloat( data[ 6 ] )

								);

							} else {

								// if no colors are defined, add placeholders so color and vertex indices match

								state.colors.push( undefined, undefined, undefined );

							}

							break;
						case 'vn':
							state.normals.push(
								parseFloat( data[ 1 ] ),
								parseFloat( data[ 2 ] ),
								parseFloat( data[ 3 ] )
							);
							break;
						case 'vt':
							state.uvs.push(
								parseFloat( data[ 1 ] ),
								parseFloat( data[ 2 ] )
							);
							break;

					}

				} else if ( lineFirstChar === 'f' ) {

					var lineData = line.substr( 1 ).trim();
					var vertexData = lineData.split( /\s+/ );
					var faceVertices = [];

					// Parse the face vertex data into an easy to work with format

					for ( var j = 0, jl = vertexData.length; j < jl; j ++ ) {

						var vertex = vertexData[ j ];

						if ( vertex.length > 0 ) {

							var vertexParts = vertex.split( '/' );
							faceVertices.push( vertexParts );

						}

					}

					// Draw an edge between the first vertex and all subsequent vertices to form an n-gon

					var v1 = faceVertices[ 0 ];

					for ( var j = 1, jl = faceVertices.length - 1; j < jl; j ++ ) {

						var v2 = faceVertices[ j ];
						var v3 = faceVertices[ j + 1 ];

						state.addFace(
							v1[ 0 ], v2[ 0 ], v3[ 0 ],
							v1[ 1 ], v2[ 1 ], v3[ 1 ],
							v1[ 2 ], v2[ 2 ], v3[ 2 ]
						);

					}

				} else if ( lineFirstChar === 'l' ) {

					var lineParts = line.substring( 1 ).trim().split( " " );
					var lineVertices = [], lineUVs = [];

					if ( line.indexOf( "/" ) === - 1 ) {

						lineVertices = lineParts;

					} else {

						for ( var li = 0, llen = lineParts.length; li < llen; li ++ ) {

							var parts = lineParts[ li ].split( "/" );

							if ( parts[ 0 ] !== "" ) lineVertices.push( parts[ 0 ] );
							if ( parts[ 1 ] !== "" ) lineUVs.push( parts[ 1 ] );

						}

					}

					state.addLineGeometry( lineVertices, lineUVs );

				} else if ( lineFirstChar === 'p' ) {

					var lineData = line.substr( 1 ).trim();
					var pointData = lineData.split( " " );

					state.addPointGeometry( pointData );

				} else if ( ( result = object_pattern.exec( line ) ) !== null ) {

					// o object_name
					// or
					// g group_name

					// WORKAROUND: https://bugs.chromium.org/p/v8/issues/detail?id=2869
					// var name = result[ 0 ].substr( 1 ).trim();
					var name = ( " " + result[ 0 ].substr( 1 ).trim() ).substr( 1 );

					state.startObject( name );

				} else if ( material_use_pattern.test( line ) ) {

					// material

					state.object.startMaterial( line.substring( 7 ).trim(), state.materialLibraries );

				} else if ( material_library_pattern.test( line ) ) {

					// mtl file

					state.materialLibraries.push( line.substring( 7 ).trim() );

				} else if ( map_use_pattern.test( line ) ) {

					// the line is parsed but ignored since the loader assumes textures are defined MTL files
					// (according to https://www.okino.com/conv/imp_wave.htm, 'usemap' is the old-style Wavefront texture reference method)

					console.warn( 'THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.' );

				} else if ( lineFirstChar === 's' ) {

					result = line.split( ' ' );

					// smooth shading

					// @todo Handle files that have varying smooth values for a set of faces inside one geometry,
					// but does not define a usemtl for each face set.
					// This should be detected and a dummy material created (later MultiMaterial and geometry groups).
					// This requires some care to not create extra material on each smooth value for "normal" obj files.
					// where explicit usemtl defines geometry groups.
					// Example asset: examples/models/obj/cerberus/Cerberus.obj

					/*
					 * http://paulbourke.net/dataformats/obj/
					 * or
					 * http://www.cs.utah.edu/~boulos/cs3505/obj_spec.pdf
					 *
					 * From chapter "Grouping" Syntax explanation "s group_number":
					 * "group_number is the smoothing group number. To turn off smoothing groups, use a value of 0 or off.
					 * Polygonal elements use group numbers to put elements in different smoothing groups. For free-form
					 * surfaces, smoothing groups are either turned on or off; there is no difference between values greater
					 * than 0."
					 */
					if ( result.length > 1 ) {

						var value = result[ 1 ].trim().toLowerCase();
						state.object.smooth = ( value !== '0' && value !== 'off' );

					} else {

						// ZBrush can produce "s" lines #11707
						state.object.smooth = true;

					}

					var material = state.object.currentMaterial();
					if ( material ) material.smooth = state.object.smooth;

				} else {

					// Handle null terminated files without exception
					if ( line === '\0' ) continue;

					console.warn( 'THREE.OBJLoader: Unexpected line: "' + line + '"' );

				}

			}

			state.finalize();

			var container = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Group"]();
			container.materialLibraries = [].concat( state.materialLibraries );

			for ( var i = 0, l = state.objects.length; i < l; i ++ ) {

				var object = state.objects[ i ];
				var geometry = object.geometry;
				var materials = object.materials;
				var isLine = ( geometry.type === 'Line' );
				var isPoints = ( geometry.type === 'Points' );
				var hasVertexColors = false;

				// Skip o/g line declarations that did not follow with any faces
				if ( geometry.vertices.length === 0 ) continue;

				var buffergeometry = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["BufferGeometry"]();

				buffergeometry.setAttribute( 'position', new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Float32BufferAttribute"]( geometry.vertices, 3 ) );

				buffergeometry.setAttribute( 'normal', new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Float32BufferAttribute"]( geometry.normals, 3 ) );

				if ( geometry.colors.length > 0 ) {

					hasVertexColors = true;
					buffergeometry.setAttribute( 'color', new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Float32BufferAttribute"]( geometry.colors, 3 ) );

				}

				if ( geometry.hasUVIndices === true ) {

					buffergeometry.setAttribute( 'uv', new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Float32BufferAttribute"]( geometry.uvs, 2 ) );

				}

				// Create materials

				var createdMaterials = [];

				for ( var mi = 0, miLen = materials.length; mi < miLen; mi ++ ) {

					var sourceMaterial = materials[ mi ];
					var materialHash = sourceMaterial.name + '_' + sourceMaterial.smooth + '_' + hasVertexColors;
					var material = state.materials[ materialHash ];

					if ( this.materials !== null ) {

						material = this.materials.create( sourceMaterial.name );

						// mtl etc. loaders probably can't create line materials correctly, copy properties to a line material.
						if ( isLine && material && ! ( material instanceof _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["LineBasicMaterial"] ) ) {

							var materialLine = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["LineBasicMaterial"]();
							_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Material"].prototype.copy.call( materialLine, material );
							materialLine.color.copy( material.color );
							material = materialLine;

						} else if ( isPoints && material && ! ( material instanceof _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["PointsMaterial"] ) ) {

							var materialPoints = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["PointsMaterial"]( { size: 10, sizeAttenuation: false } );
							_build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Material"].prototype.copy.call( materialPoints, material );
							materialPoints.color.copy( material.color );
							materialPoints.map = material.map;
							material = materialPoints;

						}

					}

					if ( material === undefined ) {

						if ( isLine ) {

							material = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["LineBasicMaterial"]();

						} else if ( isPoints ) {

							material = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["PointsMaterial"]( { size: 1, sizeAttenuation: false } );

						} else {

							material = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["MeshPhongMaterial"]();

						}

						material.name = sourceMaterial.name;
						material.flatShading = sourceMaterial.smooth ? false : true;
						material.vertexColors = hasVertexColors;

						state.materials[ materialHash ] = material;

					}

					createdMaterials.push( material );

				}

				// Create mesh

				var mesh;

				if ( createdMaterials.length > 1 ) {

					for ( var mi = 0, miLen = materials.length; mi < miLen; mi ++ ) {

						var sourceMaterial = materials[ mi ];
						buffergeometry.addGroup( sourceMaterial.groupStart, sourceMaterial.groupCount, mi );

					}

					if ( isLine ) {

						mesh = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["LineSegments"]( buffergeometry, createdMaterials );

					} else if ( isPoints ) {

						mesh = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Points"]( buffergeometry, createdMaterials );

					} else {

						mesh = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Mesh"]( buffergeometry, createdMaterials );

					}

				} else {

					if ( isLine ) {

						mesh = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["LineSegments"]( buffergeometry, createdMaterials[ 0 ] );

					} else if ( isPoints ) {

						mesh = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Points"]( buffergeometry, createdMaterials[ 0 ] );

					} else {

						mesh = new _build_three_module_js__WEBPACK_IMPORTED_MODULE_0__["Mesh"]( buffergeometry, createdMaterials[ 0 ] );

					}

				}

				mesh.name = object.name;

				container.add( mesh );

			}

			return container;

		}

	} );

	return OBJLoader;

} )();




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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");




class ThreeService {
    constructor() { }
    getThreeCommon(canvasEl, directionalLight = false) {
        const common = {
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
    }
    getThreeCommonWindow() {
        const common = {
            scene: new three__WEBPACK_IMPORTED_MODULE_0__["Scene"](),
            renderer: new three__WEBPACK_IMPORTED_MODULE_0__["WebGLRenderer"](),
            camera: new three__WEBPACK_IMPORTED_MODULE_0__["PerspectiveCamera"](),
        };
        common.scene.background = new three__WEBPACK_IMPORTED_MODULE_0__["Color"](src_app_common_enums_colors_enum__WEBPACK_IMPORTED_MODULE_1__["Colors"].canvasBackground);
        common.renderer.setSize(window.innerWidth, window.innerHeight);
        common.camera.position.z = 100;
        return common;
    }
    configureViewSettings(scene, camera, renderer) {
        scene.background = new three__WEBPACK_IMPORTED_MODULE_0__["Color"](0xffffff);
        const light = new three__WEBPACK_IMPORTED_MODULE_0__["AmbientLight"](0x404040); // soft white light
        scene.add(light);
        const controls = new three_examples_jsm_controls_OrbitControls__WEBPACK_IMPORTED_MODULE_2__["OrbitControls"](camera, renderer.domElement);
        camera.position.set(0, 0, 100);
        // controls.autoRotate =true;
        // controls.autoRotateSpeed =1;
        return controls;
    }
    getRendererCallCount(renderer) {
        return renderer.info.render.calls;
    }
    configureHelpers(scene) {
        scene.add(new three__WEBPACK_IMPORTED_MODULE_0__["AxesHelper"](5));
    }
    cleanScene(threeCommon) {
        var meshes = [];
        var sprites = [];
        document.querySelector("#labels").innerHTML = '';
        threeCommon.scene.traverse(function (object) {
            if ((object.isMesh && !object.isInstancedMesh) || object.type === "Sprite") {
                if (object.type === "Sprite") {
                    console.log('disposing sprite');
                }
                meshes.push(object);
            }
        });
        for (var i = 0; i < meshes.length; i++) {
            var mesh = meshes[i];
            mesh.material.dispose();
            mesh.geometry.dispose();
            threeCommon.scene.remove(mesh);
        }
    }
}
ThreeService.ngInjectableDef = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ factory: function ThreeService_Factory() { return new ThreeService(); }, token: ThreeService, providedIn: "root" });


/***/ })

}]);
//# sourceMappingURL=default~network-graph-network-graph-module-ngfactory~three-optimized-three-optimized-module-ngfactory-es2015.js.map